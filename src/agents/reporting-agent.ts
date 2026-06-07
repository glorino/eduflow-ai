import { z } from 'zod';
import { BaseAgent, type AIAgentResult } from './orchestrator';
import prisma from '@/lib/prisma';
import { calculateGPA, calculateGrade, formatCurrency } from '@/lib/utils';

const ReportSchema = z.object({
  title: z.string(),
  summary: z.string(),
  highlights: z.array(z.string()),
  concerns: z.array(z.string()),
  recommendations: z.array(z.string()),
  generatedInsights: z.array(z.string()),
});

export class ReportingAgent extends BaseAgent {
  name = 'ReportingAgent';
  config = {
    name: 'Reporting Agent',
    model: 'gpt-4o',
    temperature: 0.3,
    maxTokens: 2000,
    systemPrompt: `You are an AI reporting agent for a school management system.
    Generate comprehensive reports, analytics, and insights across all school operations.
    Focus on actionable intelligence and trend analysis.`,
  };

  async execute(action: string, input: Record<string, unknown>, context?: { organizationId: string; campusId?: string; userId: string }): Promise<AIAgentResult> {
    switch (action) {
      case 'studentReport':
        return this.studentReport(input);
      case 'classReport':
        return this.classReport(input);
      case 'schoolReport':
        return this.schoolReport(input);
      case 'financialReport':
        return this.financialReport(input);
      case 'attendanceReport':
        return this.attendanceReport(input);
      case 'executiveSummary':
        return this.executiveSummary(input);
      case 'customReport':
        return this.customReport(input);
      default:
        return { success: false, error: `Unknown action: ${action}` };
    }
  }

  async studentReport(input: Record<string, unknown>): Promise<AIAgentResult> {
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
        attendance: { where: { termId } },
        disciplineRecords: true,
        libraryTransactions: { where: { status: 'BORROWED' } },
      },
    });

    if (!student) return { success: false, error: 'Student not found' };

    const scores = student.assessments.map(ar => ar.score);
    const average = calculateGPA(scores);
    const totalDays = student.attendance.length;
    const presentDays = student.attendance.filter(a => a.status === 'PRESENT').length;
    const attendanceRate = totalDays > 0 ? (presentDays / totalDays) * 100 : 100;

    const prompt = `Generate a comprehensive student report:
    Student: ${student.user?.firstName} ${student.user?.lastName}
    Class: ${student.class?.name || 'N/A'}
    Average: ${average}%
    Grade: ${calculateGrade(average)}
    Attendance: ${attendanceRate.toFixed(1)}%
    Discipline Issues: ${student.disciplineRecords.length}
    Books Borrowed: ${student.libraryTransactions.length}
    
    Provide a comprehensive report with summary, highlights, concerns, and recommendations.`;

    const result = await this.generateWithSchema(prompt, ReportSchema);

    return {
      success: true,
      data: {
        studentName: `${student.user?.firstName} ${student.user?.lastName}`,
        className: student.class?.name,
        termId,
        academicPerformance: {
          scores,
          average,
          grade: calculateGrade(average),
        },
        attendance: {
          totalDays,
          presentDays,
          rate: attendanceRate,
        },
        discipline: {
          totalIssues: student.disciplineRecords.length,
          recentIssues: student.disciplineRecords.slice(0, 3),
        },
        library: {
          booksBorrowed: student.libraryTransactions.length,
        },
        ...result,
      },
    };
  }

  async classReport(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { classId, termId } = input as { classId: string; termId: string };

    const classData = await prisma.schoolClass.findUnique({
      where: { id: classId },
      include: {
        students: {
          include: {
            assessments: {
              where: { assessment: { termId } },
              include: { assessment: true },
            },
            attendance: { where: { termId } },
            user: true,
          },
        },
      },
    });

    if (!classData) return { success: false, error: 'Class not found' };

    const studentPerformance = classData.students.map(student => {
      const scores = student.assessments.map(ar => ar.score);
      const avg = calculateGPA(scores);
      const total = student.attendance.length;
      const present = student.attendance.filter(a => a.status === 'PRESENT').length;
      const attRate = total > 0 ? (present / total) * 100 : 100;

      return {
        studentId: student.id,
        name: `${student.user?.firstName || ''} ${student.user?.lastName || ''}`,
        average: avg,
        grade: calculateGrade(avg),
        attendanceRate: attRate,
      };
    });

    const classAverage = calculateGPA(studentPerformance.map(s => s.average));
    const overallAttendance = studentPerformance.reduce((sum, s) => sum + s.attendanceRate, 0) / studentPerformance.length;

    const prompt = `Generate a class report:
    Class: ${classData.name}
    Total Students: ${classData.students.length}
    Class Average: ${classAverage}%
    Overall Attendance: ${overallAttendance.toFixed(1)}%
    Top Performers: ${studentPerformance.sort((a, b) => b.average - a.average).slice(0, 5).map(s => `${s.name}: ${s.average}%`).join(', ')}
    Needs Improvement: ${studentPerformance.filter(s => s.average < 50).length} students
    
    Provide class performance analysis.`;

    const result = await this.generateWithSchema(prompt, ReportSchema);

    return {
      success: true,
      data: {
        className: classData.name,
        termId,
        totalStudents: classData.students.length,
        classAverage,
        overallAttendance,
        studentPerformance: studentPerformance.sort((a, b) => b.average - a.average),
        ...result,
      },
    };
  }

  async schoolReport(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { campusId, termId } = input as { campusId: string; termId?: string };

    const [students, teachers, admissions, payments, discipline] = await Promise.all([
      prisma.student.count({ where: { campusId, isActive: true } }),
      prisma.teacher.count({ where: { campusId, isActive: true } }),
      prisma.admission.count({ where: { campusId, status: 'APPLIED' } }),
      prisma.feePayment.aggregate({
        where: { student: { campusId } },
        _sum: { paidAmount: true, amount: true },
        _count: true,
      }),
      prisma.disciplineRecord.count({
        where: { student: { campusId } },
      }),
    ]);

    const totalPaid = Number(payments._sum.paidAmount || 0);
    const totalExpected = Number(payments._sum.amount || 0);
    const collectionRate = totalExpected > 0 ? (totalPaid / totalExpected) * 100 : 0;

    const prompt = `Generate a school report:
    Total Students: ${students}
    Total Teachers: ${teachers}
    Pending Admissions: ${admissions}
    Revenue Collected: ${formatCurrency(totalPaid)}
    Expected Revenue: ${formatCurrency(totalExpected)}
    Collection Rate: ${collectionRate.toFixed(1)}%
    Discipline Issues: ${discipline}
    
    Provide school performance summary.`;

    const result = await this.generateWithSchema(prompt, ReportSchema);

    return {
      success: true,
      data: {
        campusId,
        totalStudents: students,
        totalTeachers: teachers,
        pendingAdmissions: admissions,
        financials: {
          totalPaid,
          totalExpected,
          collectionRate,
        },
        disciplineIssues: discipline,
        ...result,
      },
    };
  }

  async financialReport(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { campusId, termId } = input as { campusId: string; termId?: string };

    const payments = await prisma.feePayment.findMany({
      where: {
        student: { campusId },
        ...(termId ? { structure: { termId } } : {}),
      },
      include: { structure: true, student: { include: { user: true } } },
    });

    const totalRevenue = payments.reduce((sum, p) => sum + Number(p.paidAmount), 0);
    const totalExpected = payments.reduce((sum, p) => sum + Number(p.amount), 0);
    const outstanding = totalExpected - totalRevenue;
    const byStatus = {
      completed: payments.filter(p => p.status === 'COMPLETED').length,
      partial: payments.filter(p => p.status === 'PARTIAL').length,
      pending: payments.filter(p => p.status === 'PENDING').length,
      overdue: payments.filter(p => p.status === 'OVERDUE').length,
    };

    return {
      success: true,
      data: {
        totalRevenue,
        totalExpected,
        outstanding,
        collectionRate: totalExpected > 0 ? (totalRevenue / totalExpected) * 100 : 0,
        byStatus,
        totalPayments: payments.length,
      },
    };
  }

  async attendanceReport(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { campusId, termId } = input as { campusId: string; termId?: string };

    const attendance = await prisma.attendance.findMany({
      where: {
        student: { campusId },
        ...(termId ? { termId } : {}),
      },
      include: { student: { include: { user: true } }, class: true },
    });

    const total = attendance.length;
    const present = attendance.filter(a => a.status === 'PRESENT').length;
    const absent = attendance.filter(a => a.status === 'ABSENT').length;
    const late = attendance.filter(a => a.status === 'LATE').length;

    const byClass = attendance.reduce((acc, a) => {
      const className = a.class?.name || 'Unknown';
      if (!acc[className]) acc[className] = { total: 0, present: 0, absent: 0, late: 0 };
      acc[className].total++;
      if (a.status === 'PRESENT') acc[className].present++;
      else if (a.status === 'ABSENT') acc[className].absent++;
      else if (a.status === 'LATE') acc[className].late++;
      return acc;
    }, {} as Record<string, { total: number; present: number; absent: number; late: number }>);

    return {
      success: true,
      data: {
        total,
        present,
        absent,
        late,
        overallRate: total > 0 ? (present / total) * 100 : 100,
        byClass,
      },
    };
  }

  async executiveSummary(input: Record<string, unknown>): Promise<AIAgentResult> {
    const campusId = input.campusId as string;

    const [students, teachers, payments, discipline, attendance] = await Promise.all([
      prisma.student.count({ where: { campusId, isActive: true } }),
      prisma.teacher.count({ where: { campusId, isActive: true } }),
      prisma.feePayment.aggregate({
        where: { student: { campusId } },
        _sum: { paidAmount: true },
      }),
      prisma.disciplineRecord.count({ where: { student: { campusId } } }),
      prisma.attendance.findMany({
        where: { student: { campusId } },
        select: { status: true },
      }),
    ]);

    const totalPaid = Number(payments._sum.paidAmount || 0);
    const present = attendance.filter(a => a.status === 'PRESENT').length;
    const attendanceRate = attendance.length > 0 ? (present / attendance.length) * 100 : 100;

    return {
      success: true,
      data: {
        totalStudents: students,
        totalTeachers: teachers,
        totalRevenue: totalPaid,
        disciplineIssues: discipline,
        attendanceRate,
        keyMetrics: {
          studentTeacherRatio: teachers > 0 ? (students / teachers).toFixed(1) : 'N/A',
          revenuePerStudent: students > 0 ? (totalPaid / students).toFixed(2) : 'N/A',
        },
      },
    };
  }

  async customReport(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { query, parameters } = input as {
      query: string;
      parameters: Record<string, unknown>;
    };

    const prompt = `Generate a custom report based on this query:
    Query: ${query}
    Parameters: ${JSON.stringify(parameters)}
    
    Provide analysis and insights.`;

    const result = await this.generateWithSchema(prompt, ReportSchema);

    return {
      success: true,
      data: result,
    };
  }
}
