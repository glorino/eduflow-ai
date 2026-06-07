import { z } from 'zod';
import { BaseAgent, type AIAgentResult } from './orchestrator';
import prisma from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';
import { sendEmail, buildEmailTemplate } from '@/lib/email';
import { logNotification } from '@/lib/sms';

const FinancialAnalysisSchema = z.object({
  totalRevenue: z.number(),
  totalExpenses: z.number(),
  netIncome: z.number(),
  collectionRate: z.number(),
  outstandingFees: z.number(),
  overdueAccounts: z.number(),
  forecast: z.object({
    nextMonth: z.number(),
    nextQuarter: z.number(),
    risk: z.string(),
  }),
  recommendations: z.array(z.string()),
});

export class FinanceAgent extends BaseAgent {
  name = 'FinanceAgent';
  config = {
    name: 'Finance Agent',
    model: 'gpt-4o',
    temperature: 0.2,
    maxTokens: 2000,
    systemPrompt: `You are an AI financial officer for a school management system.
    Manage fee collections, generate invoices, analyze financial health, and provide insights.
    Focus on maximizing collection efficiency while maintaining good parent relations.`,
  };

  async execute(action: string, input: Record<string, unknown>, context?: { organizationId: string; campusId?: string; userId: string }): Promise<AIAgentResult> {
    switch (action) {
      case 'generateInvoice':
        return this.generateInvoice(input);
      case 'processPayment':
        return this.processPayment(input);
      case 'analyzeFinances':
        return this.analyzeFinances(input);
      case 'sendReminders':
        return this.sendReminders(input);
      case 'applyPenalty':
        return this.applyPenalty(input);
      case 'forecastRevenue':
        return this.forecastRevenue(input);
      default:
        return { success: false, error: `Unknown action: ${action}` };
    }
  }

  async generateInvoice(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { studentId, termId, structureId } = input as {
      studentId: string;
      termId: string;
      structureId: string;
    };

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { user: true, class: true },
    });

    const feeStructure = await prisma.feeStructure.findUnique({
      where: { id: structureId },
      include: { account: true, term: true },
    });

    if (!student || !feeStructure) {
      return { success: false, error: 'Student or fee structure not found' };
    }

    const existingPayment = await prisma.feePayment.findFirst({
      where: { studentId, structureId },
    });

    if (existingPayment) {
      return { success: false, error: 'Invoice already exists for this fee' };
    }

    const payment = await prisma.feePayment.create({
      data: {
        studentId,
        structureId,
        amount: Number(feeStructure.amount),
        status: 'PENDING',
        dueDate: feeStructure.dueDate,
      },
    });

    return {
      success: true,
      data: {
        invoiceId: payment.id,
        studentName: `${student.user?.firstName} ${student.user?.lastName}`,
        feeName: feeStructure.name,
        amount: Number(feeStructure.amount),
        dueDate: feeStructure.dueDate,
      },
    };
  }

  async processPayment(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { paymentId, amount, paymentMethod, transactionRef } = input as {
      paymentId: string;
      amount: number;
      paymentMethod: string;
      transactionRef: string;
    };

    const payment = await prisma.feePayment.findUnique({
      where: { id: paymentId },
      include: { student: { include: { user: true } }, structure: true },
    });

    if (!payment) {
      return { success: false, error: 'Payment not found' };
    }

    const newPaidAmount = Number(payment.paidAmount) + amount;
    const status = newPaidAmount >= Number(payment.amount) ? 'COMPLETED' : 'PARTIAL';

    const updatedPayment = await prisma.feePayment.update({
      where: { id: paymentId },
      data: {
        paidAmount: newPaidAmount,
        status: status as never,
        paymentMethod,
        transactionRef,
        paidAt: status === 'COMPLETED' ? new Date() : undefined,
      },
    });

    // Create transaction record
    await prisma.financialTransaction.create({
      data: {
        accountId: payment.structure.accountId,
        paymentId,
        type: 'CREDIT',
        amount,
        description: `Payment for ${payment.structure.name} - ${payment.student.user?.firstName} ${payment.student.user?.lastName}`,
        reference: transactionRef,
      },
    });

    // Notify parent
    if (payment.student.guardianEmail) {
      await sendEmail({
        to: payment.student.guardianEmail,
        subject: `Payment Confirmation - ${payment.structure.name}`,
        html: buildEmailTemplate(
          'Payment Received',
          `<p>Payment of <strong>${formatCurrency(amount)}</strong> has been received for ${payment.structure.name}.</p>
           <p>Student: ${payment.student.user?.firstName} ${payment.student.user?.lastName}</p>
           <p>Total Paid: ${formatCurrency(newPaidAmount)}</p>
           <p>Status: ${status}</p>`
        ),
      });
    }

    return {
      success: true,
      data: updatedPayment,
    };
  }

  async analyzeFinances(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { campusId, termId } = input as { campusId: string; termId?: string };

    const payments = await prisma.feePayment.findMany({
      where: {
        student: { campusId },
        ...(termId ? { structure: { termId } } : {}),
      },
      include: { structure: true, student: true },
    });

    const totalRevenue = payments.reduce((sum, p) => sum + Number(p.paidAmount), 0);
    const totalExpected = payments.reduce((sum, p) => sum + Number(p.amount), 0);
    const outstanding = totalExpected - totalRevenue;
    const overdue = payments.filter(p => p.status === 'OVERDUE').length;
    const collectionRate = totalExpected > 0 ? (totalRevenue / totalExpected) * 100 : 0;

    const prompt = `Analyze financial data:
    Total Revenue: ${formatCurrency(totalRevenue)}
    Total Expected: ${formatCurrency(totalExpected)}
    Outstanding: ${formatCurrency(outstanding)}
    Overdue Accounts: ${overdue}
    Collection Rate: ${collectionRate.toFixed(1)}%
    
    Provide financial health assessment and recommendations.`;

    const result = await this.generateWithSchema(prompt, FinancialAnalysisSchema);

    return {
      success: true,
      data: {
        totalRevenue,
        totalExpected,
        outstanding,
        overdue,
        collectionRate,
        ...result,
      },
    };
  }

  async sendReminders(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { campusId, daysBeforeDue } = input as { campusId: string; daysBeforeDue?: number };
    const days = daysBeforeDue || 7;

    const pendingPayments = await prisma.feePayment.findMany({
      where: {
        student: { campusId },
        status: { in: ['PENDING', 'PARTIAL', 'OVERDUE'] },
        dueDate: { lte: new Date(Date.now() + days * 24 * 60 * 60 * 1000) },
      },
      include: {
        student: { include: { user: true } },
        structure: true,
      },
    });

    let sent = 0;
    for (const payment of pendingPayments) {
      const email = payment.student.guardianEmail;
      if (email) {
        await sendEmail({
          to: email,
          subject: `Fee Payment Reminder - ${payment.structure.name}`,
          html: buildEmailTemplate(
            'Fee Payment Reminder',
            `<p>Dear Parent/Guardian,</p>
             <p>This is a reminder that the following fee is due:</p>
             <p><strong>Fee:</strong> ${payment.structure.name}</p>
             <p><strong>Amount:</strong> ${formatCurrency(Number(payment.amount) - Number(payment.paidAmount))}</p>
             <p><strong>Due Date:</strong> ${payment.dueDate?.toLocaleDateString()}</p>
             <p><strong>Student:</strong> ${payment.student.user?.firstName} ${payment.student.user?.lastName}</p>
             <p>Please make payment to avoid late fees.</p>`,
          ),
        });
        sent++;
      }
    }

    return {
      success: true,
      data: { remindersSent: sent, totalPending: pendingPayments.length },
    };
  }

  async applyPenalty(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { paymentId, penaltyAmount, reason } = input as {
      paymentId: string;
      penaltyAmount: number;
      reason: string;
    };

    const payment = await prisma.feePayment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      return { success: false, error: 'Payment not found' };
    }

    await prisma.financialTransaction.create({
      data: {
        accountId: payment.structure?.accountId || '',
        paymentId,
        type: 'PENALTY',
        amount: penaltyAmount,
        description: `Penalty: ${reason}`,
      },
    });

    return {
      success: true,
      data: { penaltyApplied: penaltyAmount, reason },
    };
  }

  async forecastRevenue(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { campusId } = input as { campusId: string };

    const payments = await prisma.feePayment.findMany({
      where: { student: { campusId } },
      orderBy: { createdAt: 'asc' },
    });

    const monthlyRevenue = payments.reduce((acc, p) => {
      const month = p.createdAt.toISOString().slice(0, 7);
      acc[month] = (acc[month] || 0) + Number(p.paidAmount);
      return acc;
    }, {} as Record<string, number>);

    return {
      success: true,
      data: {
        historical: monthlyRevenue,
        months: Object.keys(monthlyRevenue),
        values: Object.values(monthlyRevenue),
      },
    };
  }
}
