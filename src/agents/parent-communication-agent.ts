import { z } from 'zod';
import { BaseAgent, type AIAgentResult } from './orchestrator';
import prisma from '@/lib/prisma';
import { sendEmail, buildEmailTemplate } from '@/lib/email';
import { sendSMS, logNotification } from '@/lib/sms';

const MessageTemplateSchema = z.object({
  subject: z.string(),
  message: z.string(),
  tone: z.enum(['FORMAL', 'FRIENDLY', 'URGENT', 'INFORMATIVE']),
  language: z.string(),
});

export class ParentCommunicationAgent extends BaseAgent {
  name = 'ParentCommunicationAgent';
  config = {
    name: 'Parent Communication Agent',
    model: 'gpt-4o',
    temperature: 0.4,
    maxTokens: 1500,
    systemPrompt: `You are an AI parent communication agent for a school management system.
    Facilitate clear, professional, and empathetic communication between school and parents.
    Adapt tone based on context - from routine updates to urgent alerts.`,
  };

  async execute(action: string, input: Record<string, unknown>, context?: { organizationId: string; campusId?: string; userId: string }): Promise<AIAgentResult> {
    switch (action) {
      case 'sendRiskAlert':
        return this.sendRiskAlert(input);
      case 'sendProgressReport':
        return this.sendProgressReport(input);
      case 'sendMeetingInvite':
        return this.sendMeetingInvite(input);
      case 'sendFeeReminder':
        return this.sendFeeReminder(input);
      case 'sendGeneralNotification':
        return this.sendGeneralNotification(input);
      case 'generateMessage':
        return this.generateMessage(input);
      case 'sendDisciplineNotice':
        return this.sendDisciplineNotice(input);
      case 'sendPenaltyNotice':
        return this.sendPenaltyNotice(input);
      default:
        return { success: false, error: `Unknown action: ${action}` };
    }
  }

  async sendRiskAlert(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { studentId, riskType, riskData } = input as {
      studentId: string;
      riskType: 'ATTENDANCE' | 'ACADEMIC' | 'DISCIPLINE';
      riskData: Record<string, unknown>;
    };

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: true,
        parentStudents: {
          include: { parent: { include: { user: true } } },
        },
      },
    });

    if (!student) {
      return { success: false, error: 'Student not found' };
    }

    const prompt = `Generate a ${riskType.toLowerCase()} risk alert for a parent:
    Student: ${student.user?.firstName} ${student.user?.lastName}
    Risk Type: ${riskType}
    Details: ${JSON.stringify(riskData)}
    
    Write a professional, empathetic message that:
    1. States the concern clearly
    2. Provides specific data
    3. Suggests next steps
    4. Invites communication`;

    const result = await this.generateWithSchema(prompt, MessageTemplateSchema);

    const sentTo: string[] = [];

    for (const ps of student.parentStudents) {
      const parentUser = ps.parent.user;
      if (!parentUser) continue;

      // Send in-app notification
      await logNotification(
        parentUser.id,
        `${riskType} Alert - ${student.user?.firstName}`,
        result.message,
        'IN_APP'
      );

      // Send email
      if (parentUser.email) {
        await sendEmail({
          to: parentUser.email,
          subject: result.subject,
          html: buildEmailTemplate(result.subject, `<p>${result.message}</p>`),
        });
        sentTo.push(parentUser.email);
      }

      // Send SMS
      if (parentUser.phone) {
        await sendSMS({
          to: parentUser.phone,
          message: `EduFlow AI: ${result.subject}\n${result.message.slice(0, 160)}`,
        });
        sentTo.push(parentUser.phone);
      }
    }

    return {
      success: true,
      data: {
        studentName: `${student.user?.firstName} ${student.user?.lastName}`,
        riskType,
        sentTo,
        message: result.message,
      },
    };
  }

  async sendProgressReport(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { studentId, termId } = input as { studentId: string; termId: string };

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: true,
        class: true,
        assessments: {
          where: { assessment: { termId } },
          include: { assessment: { include: { subject: true } } },
        },
        parentStudents: {
          include: { parent: { include: { user: true } } },
        },
      },
    });

    if (!student) {
      return { success: false, error: 'Student not found' };
    }

    const scores = student.assessments.map(ar => ({
      subject: ar.assessment?.subject?.name || 'Unknown',
      score: ar.score,
    }));

    const average = scores.length > 0
      ? scores.reduce((a, b) => a + b.score, 0) / scores.length
      : 0;

    const prompt = `Generate a progress report summary for parent:
    Student: ${student.user?.firstName} ${student.user?.lastName}
    Class: ${student.class?.name}
    Term: ${termId}
    Scores: ${JSON.stringify(scores)}
    Average: ${average.toFixed(1)}%
    
    Write a concise, encouraging progress update.`;

    const result = await this.generateWithSchema(prompt, MessageTemplateSchema);

    for (const ps of student.parentStudents) {
      if (ps.parent.user?.email) {
        await sendEmail({
          to: ps.parent.user.email,
          subject: `Progress Report - ${student.user?.firstName} ${student.user?.lastName}`,
          html: buildEmailTemplate(
            'Student Progress Report',
            `<p>${result.message}</p>
             <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
               <tr style="background: #f0f0f0;"><th style="padding: 10px; text-align: left;">Subject</th><th style="padding: 10px;">Score</th></tr>
               ${scores.map(s => `<tr><td style="padding: 10px;">${s.subject}</td><td style="padding: 10px; text-align: center;">${s.score}%</td></tr>`).join('')}
             </table>
             <p><strong>Overall Average: ${average.toFixed(1)}%</strong></p>`
          ),
        });
      }
    }

    return {
      success: true,
      data: { studentName: `${student.user?.firstName} ${student.user?.lastName}`, average, scores },
    };
  }

  async sendMeetingInvite(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { parentUserId, meetingDetails } = input as {
      parentUserId: string;
      meetingDetails: { date: Date; time: string; purpose: string; teacherName: string };
    };

    const user = await prisma.user.findUnique({ where: { id: parentUserId } });
    if (!user) return { success: false, error: 'Parent not found' };

    const prompt = `Generate a meeting invitation:
    Date: ${meetingDetails.date}
    Time: ${meetingDetails.time}
    Purpose: ${meetingDetails.purpose}
    Teacher: ${meetingDetails.teacherName}
    
    Write a professional invitation message.`;

    const result = await this.generateWithSchema(prompt, MessageTemplateSchema);

    if (user.email) {
      await sendEmail({
        to: user.email,
        subject: `Meeting Invitation - ${meetingDetails.purpose}`,
        html: buildEmailTemplate(
          'Meeting Invitation',
          `<p>${result.message}</p>
           <div style="background: #f0f7ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
             <p><strong>Date:</strong> ${new Date(meetingDetails.date).toLocaleDateString()}</p>
             <p><strong>Time:</strong> ${meetingDetails.time}</p>
             <p><strong>Purpose:</strong> ${meetingDetails.purpose}</p>
             <p><strong>With:</strong> ${meetingDetails.teacherName}</p>
           </div>`
        ),
      });
    }

    return { success: true, data: { sent: true } };
  }

  async sendFeeReminder(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { studentId, paymentId } = input as { studentId: string; paymentId: string };

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { user: true, parentStudents: { include: { parent: { include: { user: true } } } } },
    });

    const payment = await prisma.feePayment.findUnique({
      where: { id: paymentId },
      include: { structure: true },
    });

    if (!student || !payment) {
      return { success: false, error: 'Student or payment not found' };
    }

    const outstanding = Number(payment.amount) - Number(payment.paidAmount);

    for (const ps of student.parentStudents) {
      if (ps.parent.user?.email) {
        await sendEmail({
          to: ps.parent.user.email,
          subject: `Fee Reminder - ${payment.structure.name}`,
          html: buildEmailTemplate(
            'Fee Payment Reminder',
            `<p>Dear Parent/Guardian,</p>
             <p>This is a friendly reminder about the outstanding fee:</p>
             <p><strong>Fee:</strong> ${payment.structure.name}</p>
             <p><strong>Outstanding Amount:</strong> ₦${outstanding.toLocaleString()}</p>
             <p><strong>Student:</strong> ${student.user?.firstName} ${student.user?.lastName}</p>
             <p>Please make payment at your earliest convenience.</p>`
          ),
        });
      }
    }

    return { success: true, data: { outstanding } };
  }

  async sendGeneralNotification(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { campusId, title, message, channels } = input as {
      campusId: string;
      title: string;
      message: string;
      channels: string[];
    };

    const parents = await prisma.parent.findMany({
      where: { campusId },
      include: { user: true },
    });

    let sent = 0;
    for (const parent of parents) {
      if (channels.includes('EMAIL') && parent.user?.email) {
        await sendEmail({
          to: parent.user.email,
          subject: title,
          html: buildEmailTemplate(title, `<p>${message}</p>`),
        });
        sent++;
      }
      if (channels.includes('SMS') && parent.user?.phone) {
        await sendSMS({ to: parent.user.phone, message: `${title}\n${message.slice(0, 160)}` });
        sent++;
      }
      if (channels.includes('IN_APP')) {
        await logNotification(parent.userId, title, message, 'IN_APP');
        sent++;
      }
    }

    return { success: true, data: { totalParents: parents.length, notificationsSent: sent } };
  }

  async generateMessage(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { context, purpose, tone } = input as {
      context: string;
      purpose: string;
      tone?: string;
    };

    const prompt = `Generate a parent communication message:
    Context: ${context}
    Purpose: ${purpose}
    Tone: ${tone || 'FORMAL'}
    
    Write a clear, professional message.`;

    const result = await this.generateWithSchema(prompt, MessageTemplateSchema);

    return { success: true, data: result };
  }

  async sendDisciplineNotice(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { studentId, disciplineRecord } = input as {
      studentId: string;
      disciplineRecord: { category: string; description: string; severity: string; actionTaken: string };
    };

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { user: true, parentStudents: { include: { parent: { include: { user: true } } } } },
    });

    if (!student) return { success: false, error: 'Student not found' };

    for (const ps of student.parentStudents) {
      if (ps.parent.user?.email) {
        await sendEmail({
          to: ps.parent.user.email,
          subject: `Discipline Notice - ${student.user?.firstName} ${student.user?.lastName}`,
          html: buildEmailTemplate(
            'Discipline Notification',
            `<p>Dear Parent/Guardian,</p>
             <p>We are writing to inform you of a discipline incident involving your child.</p>
             <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 15px 0;">
               <p><strong>Student:</strong> ${student.user?.firstName} ${student.user?.lastName}</p>
               <p><strong>Category:</strong> ${disciplineRecord.category}</p>
               <p><strong>Severity:</strong> ${disciplineRecord.severity}</p>
               <p><strong>Description:</strong> ${disciplineRecord.description}</p>
               <p><strong>Action Taken:</strong> ${disciplineRecord.actionTaken}</p>
             </div>
             <p>Please contact the school if you have any questions.</p>`
          ),
        });
      }
    }

    return { success: true, data: { notified: true } };
  }

  async sendPenaltyNotice(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { studentId, penaltyDetails } = input as {
      studentId: string;
      penaltyDetails: { amount: number; reason: string; dueDate: Date };
    };

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { user: true, parentStudents: { include: { parent: { include: { user: true } } } } },
    });

    if (!student) return { success: false, error: 'Student not found' };

    for (const ps of student.parentStudents) {
      if (ps.parent.user?.email) {
        await sendEmail({
          to: ps.parent.user.email,
          subject: `Library Penalty Notice - ${student.user?.firstName}`,
          html: buildEmailTemplate(
            'Library Penalty Notice',
            `<p>Dear Parent/Guardian,</p>
             <p>A library penalty has been applied to your child's account.</p>
             <p><strong>Amount:</strong> ₦${penaltyDetails.amount.toLocaleString()}</p>
             <p><strong>Reason:</strong> ${penaltyDetails.reason}</p>
             <p><strong>Due Date:</strong> ${new Date(penaltyDetails.dueDate).toLocaleDateString()}</p>
             <p>Please ensure timely payment to avoid additional charges.</p>`
          ),
        });
      }
    }

    return { success: true, data: { notified: true } };
  }
}
