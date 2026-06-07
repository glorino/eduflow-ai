import { z } from 'zod';
import { BaseAgent, type AIAgentResult } from './orchestrator';
import prisma from '@/lib/prisma';
import { logNotification } from '@/lib/sms';

const AttendancePatternSchema = z.object({
  pattern: z.enum(['REGULAR', 'IRREGULAR', 'DECLINING', 'IMPROVING']),
  riskScore: z.number().min(0).max(100),
  consecutiveAbsences: z.number(),
  trend: z.string(),
  alertLevel: z.enum(['NONE', 'WARNING', 'ALERT', 'CRITICAL']),
  reasons: z.array(z.string()),
});

export class AttendanceAgent extends BaseAgent {
  name = 'AttendanceAgent';
  config = {
    name: 'Attendance Agent',
    model: 'gpt-4o',
    temperature: 0.2,
    maxTokens: 1500,
    systemPrompt: `You are an AI attendance monitoring agent for a school management system.
    Analyze attendance patterns, detect anomalies, predict risks, and trigger notifications.
    Focus on identifying students at risk of chronic absenteeism.`,
  };

  async execute(action: string, input: Record<string, unknown>, context?: { organizationId: string; campusId?: string; userId: string }): Promise<AIAgentResult> {
    switch (action) {
      case 'markAttendance':
        return this.markAttendance(input);
      case 'analyzePatterns':
        return this.analyzePatterns(input);
      case 'detectRisk':
        return this.detectRisk(input);
      case 'dailyReport':
        return this.dailyReport(input);
      case 'monthlyReport':
        return this.monthlyReport(input);
      default:
        return { success: false, error: `Unknown action: ${action}` };
    }
  }

  async markAttendance(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { studentId, classId, termId, date, status, markedBy } = input as {
      studentId: string;
      classId: string;
      termId: string;
      date: Date;
      status: string;
      markedBy: string;
    };

    const attendance = await prisma.attendance.upsert({
      where: {
        studentId_classId_date: {
          studentId,
          classId,
          date: new Date(date),
        },
      },
      update: { status: status as never, markedBy },
      create: {
        studentId,
        classId,
        termId,
        date: new Date(date),
        status: status as never,
        markedBy,
      },
    });

    // Check for consecutive absences
    if (status === 'ABSENT') {
      const consecutiveAbsences = await this.getConsecutiveAbsences(studentId, classId);
      if (consecutiveAbsences >= 3) {
        await this.triggerAbsenteeAlert(studentId, classId, consecutiveAbsences);
      }
    }

    return {
      success: true,
      data: attendance,
    };
  }

  async analyzePatterns(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { studentId, classId, termId } = input as {
      studentId: string;
      classId?: string;
      termId?: string;
    };

    const where: Record<string, unknown> = { studentId };
    if (classId) where.classId = classId;
    if (termId) where.termId = termId;

    const attendance = await prisma.attendance.findMany({
      where,
      orderBy: { date: 'asc' },
    });

    const total = attendance.length;
    const present = attendance.filter(a => a.status === 'PRESENT').length;
    const absent = attendance.filter(a => a.status === 'ABSENT').length;
    const late = attendance.filter(a => a.status === 'LATE').length;
    const rate = total > 0 ? (present / total) * 100 : 100;

    const consecutiveAbsences = await this.getConsecutiveAbsences(studentId, classId || '');

    const prompt = `Analyze attendance pattern:
    Total days: ${total}
    Present: ${present}
    Absent: ${absent}
    Late: ${late}
    Attendance rate: ${rate}%
    Consecutive absences: ${consecutiveAbsences}
    
    Determine the pattern, risk score, and alert level.`;

    const result = await this.generateWithSchema(prompt, AttendancePatternSchema);

    return {
      success: true,
      data: {
        studentId,
        total,
        present,
        absent,
        late,
        rate,
        ...result,
      },
    };
  }

  async detectRisk(input: Record<string, unknown>): Promise<AIAgentResult> {
    const classId = input.classId as string;
    const termId = input.termId as string;

    const students = await prisma.student.findMany({
      where: { classId },
      include: {
        attendance: termId ? { where: { termId } } : true,
        user: true,
      },
    });

    const riskStudents: Array<{ studentId: string; studentName: string; attendanceRate: number; consecutiveAbsences: number; riskLevel: string }> = [];
    for (const student of students) {
      const total = student.attendance.length;
      const present = student.attendance.filter(a => a.status === 'PRESENT').length;
      const rate = total > 0 ? (present / total) * 100 : 100;

      if (rate < 75) {
        const consecutiveAbsences = await this.getConsecutiveAbsences(student.id, classId);
        riskStudents.push({
          studentId: student.id,
          studentName: `${student.user?.firstName || ''} ${student.user?.lastName || ''}`,
          attendanceRate: rate,
          consecutiveAbsences,
          riskLevel: rate < 60 ? 'HIGH' : 'MEDIUM',
        });
      }
    }

    return {
      success: true,
      data: {
        classId,
        totalStudents: students.length,
        atRiskStudents: riskStudents.length,
        students: riskStudents,
      },
    };
  }

  async dailyReport(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { classId, date } = input as { classId: string; date?: Date };
    const reportDate = date ? new Date(date) : new Date();

    const attendance = await prisma.attendance.findMany({
      where: {
        classId,
        date: {
          gte: new Date(reportDate.setHours(0, 0, 0, 0)),
          lt: new Date(reportDate.setHours(23, 59, 59, 999)),
        },
      },
      include: { student: { include: { user: true } } },
    });

    const summary = {
      date: reportDate,
      total: attendance.length,
      present: attendance.filter(a => a.status === 'PRESENT').length,
      absent: attendance.filter(a => a.status === 'ABSENT').length,
      late: attendance.filter(a => a.status === 'LATE').length,
      excused: attendance.filter(a => a.status === 'EXCUSED').length,
    };

    return {
      success: true,
      data: summary,
    };
  }

  async monthlyReport(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { classId, month, year } = input as { classId: string; month: number; year: number };

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const attendance = await prisma.attendance.findMany({
      where: {
        classId,
        date: { gte: startDate, lte: endDate },
      },
      include: { student: { include: { user: true } } },
    });

    const byStudent: Record<string, { name: string; present: number; absent: number; late: number; total: number }> = attendance.reduce((acc: Record<string, { name: string; present: number; absent: number; late: number; total: number }>, a: { studentId: string; status: string; student: { user?: { firstName?: string; lastName?: string } } }) => {
      if (!acc[a.studentId]) {
        acc[a.studentId] = {
          name: `${a.student.user?.firstName || ''} ${a.student.user?.lastName || ''}`,
          present: 0,
          absent: 0,
          late: 0,
          total: 0,
        };
      }
      acc[a.studentId].total++;
      if (a.status === 'PRESENT') acc[a.studentId].present++;
      else if (a.status === 'ABSENT') acc[a.studentId].absent++;
      else if (a.status === 'LATE') acc[a.studentId].late++;
      return acc;
    }, {});

    return {
      success: true,
      data: {
        month,
        year,
        students: Object.entries(byStudent).map(([id, data]) => ({
          studentId: id,
          ...data,
          rate: data.total > 0 ? (data.present / data.total) * 100 : 0,
        })),
      },
    };
  }

  private async getConsecutiveAbsences(studentId: string, classId: string): Promise<number> {
    const recentAttendance = await prisma.attendance.findMany({
      where: { studentId, classId },
      orderBy: { date: 'desc' },
      take: 30,
    });

    let consecutive = 0;
    for (const record of recentAttendance) {
      if (record.status === 'ABSENT') consecutive++;
      else break;
    }
    return consecutive;
  }

  private async triggerAbsenteeAlert(studentId: string, classId: string, days: number) {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { user: true, parentStudents: { include: { parent: { include: { user: true } } } } },
    });

    if (!student) return;

    for (const ps of student.parentStudents) {
      await logNotification(
        ps.parent.userId,
        'Absenteeism Alert',
        `Your child ${student.user?.firstName} has been absent for ${days} consecutive days. Please contact the school.`,
        'IN_APP'
      );
    }
  }
}
