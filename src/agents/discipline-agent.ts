import { z } from 'zod';
import { BaseAgent, type AIAgentResult } from './orchestrator';
import prisma from '@/lib/prisma';
import { sendEmail, buildEmailTemplate } from '@/lib/email';
import { logNotification } from '@/lib/sms';

const DisciplineAnalysisSchema = z.object({
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  category: z.string(),
  recommendedAction: z.string(),
  parentNotificationRequired: z.boolean(),
  escalationRequired: z.boolean(),
  followUpDate: z.string(),
  counselingRecommended: z.boolean(),
});

export class DisciplineAgent extends BaseAgent {
  name = 'DisciplineAgent';
  config = {
    name: 'Discipline Agent',
    model: 'gpt-4o',
    temperature: 0.2,
    maxTokens: 1500,
    systemPrompt: `You are an AI discipline management agent for a school management system.
    Analyze incidents, recommend actions, track patterns, and ensure fair enforcement.
    Focus on restorative practices and student growth while maintaining school order.`,
  };

  async execute(action: string, input: Record<string, unknown>, context?: { organizationId: string; campusId?: string; userId: string }): Promise<AIAgentResult> {
    switch (action) {
      case 'recordIncident':
        return this.recordIncident(input);
      case 'analyzeIncident':
        return this.analyzeIncident(input);
      case 'getStudentHistory':
        return this.getStudentHistory(input);
      case 'generateReport':
        return this.generateReport(input);
      case 'trackPatterns':
        return this.trackPatterns(input);
      default:
        return { success: false, error: `Unknown action: ${action}` };
    }
  }

  async recordIncident(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { studentId, teacherId, category, description, severity, actionTaken } = input as {
      studentId: string;
      teacherId: string;
      category: string;
      description: string;
      severity: string;
      actionTaken?: string;
    };

    const record = await prisma.disciplineRecord.create({
      data: {
        studentId,
        teacherId,
        category,
        description,
        severity: severity as never,
        actionTaken,
      },
    });

    // Analyze and notify if needed
    const analysis = await this.analyzeIncident({ recordId: record.id });

    // Check if parent notification is required
    if ((analysis.data as Record<string, boolean>)?.parentNotificationRequired) {
      const student = await prisma.student.findUnique({
        where: { id: studentId },
        include: { user: true, parentStudents: { include: { parent: { include: { user: true } } } } },
      });

      if (student) {
        for (const ps of student.parentStudents) {
          if (ps.parent.user?.email) {
            await sendEmail({
              to: ps.parent.user.email,
              subject: `Discipline Notice - ${student.user?.firstName} ${student.user?.lastName}`,
              html: buildEmailTemplate(
                'Discipline Notification',
                `<p>Dear Parent/Guardian,</p>
                 <p>We are writing to inform you of a discipline incident.</p>
                 <p><strong>Student:</strong> ${student.user?.firstName} ${student.user?.lastName}</p>
                 <p><strong>Category:</strong> ${category}</p>
                 <p><strong>Description:</strong> ${description}</p>
                 <p><strong>Action Taken:</strong> ${actionTaken || 'Pending review'}</p>
                 <p>Please contact the school if you have questions.</p>`
              ),
            });
          }
        }

        await prisma.disciplineRecord.update({
          where: { id: record.id },
          data: { parentNotified: true },
        });
      }
    }

    return {
      success: true,
      data: { recordId: record.id, ...analysis.data },
    };
  }

  async analyzeIncident(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { recordId, category, description, severity } = input as {
      recordId?: string;
      category?: string;
      description?: string;
      severity?: string;
    };

    let incident = null;
    if (recordId) {
      incident = await prisma.disciplineRecord.findUnique({
        where: { id: recordId },
        include: { student: { include: { user: true } } },
      });
    }

    const prompt = `Analyze this discipline incident:
    ${incident ? `Student: ${incident.student?.user?.firstName} ${incident.student?.user?.lastName}` : ''}
    Category: ${category || incident?.category}
    Description: ${description || incident?.description}
    Severity: ${severity || incident?.severity}
    
    Provide:
    1. Severity assessment
    2. Category classification
    3. Recommended action
    4. Whether parent notification is required
    5. Whether escalation is needed
    6. Follow-up date
    7. Whether counseling is recommended`;

    const result = await this.generateWithSchema(prompt, DisciplineAnalysisSchema);

    return {
      success: true,
      data: result,
    };
  }

  async getStudentHistory(input: Record<string, unknown>): Promise<AIAgentResult> {
    const studentId = input.studentId as string;

    const records = await prisma.disciplineRecord.findMany({
      where: { studentId },
      include: { teacher: { include: { user: true } } },
      orderBy: { date: 'desc' },
    });

    const summary = {
      totalIncidents: records.length,
      byCategory: records.reduce((acc, r) => {
        acc[r.category] = (acc[r.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      bySeverity: records.reduce((acc, r) => {
        acc[r.severity] = (acc[r.severity] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      recentIncidents: records.slice(0, 5),
      trend: records.length > 3 ? 'INCREASING' : records.length > 0 ? 'STABLE' : 'NONE',
    };

    return {
      success: true,
      data: summary,
    };
  }

  async generateReport(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { campusId, startDate, endDate } = input as {
      campusId: string;
      startDate?: Date;
      endDate?: Date;
    };

    const where: Record<string, unknown> = {
      student: { campusId },
    };

    if (startDate && endDate) {
      where.date = { gte: new Date(startDate), lte: new Date(endDate) };
    }

    const records = await prisma.disciplineRecord.findMany({
      where,
      include: { student: { include: { user: true } } },
      orderBy: { date: 'desc' },
    });

    const report = {
      totalIncidents: records.length,
      byCategory: records.reduce((acc, r) => {
        acc[r.category] = (acc[r.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      bySeverity: records.reduce((acc, r) => {
        acc[r.severity] = (acc[r.severity] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      topOffenders: this.getTopOffenders(records),
      resolvedCases: records.filter(r => r.actionTaken).length,
      pendingCases: records.filter(r => !r.actionTaken).length,
    };

    return {
      success: true,
      data: report,
    };
  }

  async trackPatterns(input: Record<string, unknown>): Promise<AIAgentResult> {
    const campusId = input.campusId as string;

    const records = await prisma.disciplineRecord.findMany({
      where: { student: { campusId } },
      orderBy: { date: 'desc' },
    });

    const patterns = {
      timePatterns: this.analyzeTimePatterns(records),
      categoryTrends: this.analyzeCategoryTrends(records),
      repeatOffenders: this.getRepeatOffenders(records),
      severityTrend: this.analyzeSeverityTrend(records),
    };

    return {
      success: true,
      data: patterns,
    };
  }

  private getTopOffenders(records: Array<{ studentId: string; student?: { user?: { firstName?: string; lastName?: string } } }>) {
    const counts = records.reduce((acc, r) => {
      acc[r.studentId] = (acc[r.studentId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([id, count]) => ({
        studentId: id,
        count,
        student: records.find(r => r.studentId === id)?.student,
      }));
  }

  private getRepeatOffenders(records: Array<{ studentId: string }>) {
    const counts = records.reduce((acc, r) => {
      acc[r.studentId] = (acc[r.studentId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .filter(([, count]) => count >= 3)
      .map(([id, count]) => ({ studentId: id, incidents: count }));
  }

  private analyzeTimePatterns(records: Array<{ date: Date }>) {
    const byDayOfWeek = records.reduce((acc, r) => {
      const day = new Date(r.date).toLocaleDateString('en-US', { weekday: 'long' });
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { byDayOfWeek };
  }

  private analyzeCategoryTrends(records: Array<{ category: string }>) {
    return records.reduce((acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private analyzeSeverityTrend(records: Array<{ severity: string }>) {
    return records.reduce((acc, r) => {
      acc[r.severity] = (acc[r.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
}
