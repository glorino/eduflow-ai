import { z } from 'zod';
import { BaseAgent, type AIAgentResult } from './orchestrator';
import prisma from '@/lib/prisma';
import { calculateGrade, calculateGPA, getRiskLevel } from '@/lib/utils';

const PerformanceAnalysisSchema = z.object({
  average: z.number(),
  grade: z.string(),
  trend: z.enum(['IMPROVING', 'DECLINING', 'STABLE']),
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  recommendations: z.array(z.string()),
  interventionNeeded: z.boolean(),
  predictedGrade: z.string(),
});

const InterventionSchema = z.object({
  interventions: z.array(z.object({
    type: z.string(),
    description: z.string(),
    priority: z.enum(['HIGH', 'MEDIUM', 'LOW']),
    timeframe: z.string(),
    responsible: z.string(),
  })),
  parentAction: z.string(),
  teacherAction: z.string(),
  studentAction: z.string(),
});

export class AcademicAgent extends BaseAgent {
  name = 'AcademicAgent';
  config = {
    name: 'Academic Agent',
    model: 'gpt-4o',
    temperature: 0.3,
    maxTokens: 2000,
    systemPrompt: `You are an AI academic advisor for a school management system.
    Analyze student performance, identify trends, predict outcomes, and recommend interventions.
    Consider historical data, attendance patterns, and assessment results.`,
  };

  async execute(action: string, input: Record<string, unknown>, context?: { organizationId: string; campusId?: string; userId: string }): Promise<AIAgentResult> {
    switch (action) {
      case 'analyzePerformance':
        return this.analyzePerformance(input);
      case 'predictRisk':
        return this.predictRisk(input);
      case 'recommendIntervention':
        return this.recommendIntervention(input);
      case 'generateReportCard':
        return this.generateReportCard(input);
      case 'comparePerformance':
        return this.comparePerformance(input);
      case 'classAnalysis':
        return this.classAnalysis(input);
      default:
        return { success: false, error: `Unknown action: ${action}` };
    }
  }

  async analyzePerformance(input: Record<string, unknown>): Promise<AIAgentResult> {
    const studentId = input.studentId as string;
    const termId = input.termId as string;

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        assessments: {
          where: { assessment: { termId } },
          include: { assessment: true },
        },
        attendance: {
          where: { termId },
        },
        class: true,
      },
    });

    if (!student) {
      return { success: false, error: 'Student not found' };
    }

    const scores = student.assessments.map(ar => ar.score);
    const average = calculateGPA(scores);
    const grade = calculateGrade(average);
    
    const totalDays = student.attendance.length;
    const presentDays = student.attendance.filter(a => a.status === 'PRESENT').length;
    const attendanceRate = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

    const riskLevel = getRiskLevel(average, attendanceRate);

    const prompt = `Analyze this student's academic performance:
    
    Student: ${student.admissionNumber}
    Class: ${student.class?.name || 'N/A'}
    Assessment Scores: ${scores.join(', ')}
    Average: ${average}%
    Attendance Rate: ${attendanceRate}%
    
    Provide:
    1. Trend analysis (IMPROVING, DECLINING, or STABLE)
    2. Key strengths
    3. Areas of weakness
    4. Specific recommendations for improvement
    5. Predicted end-of-term grade`;

    const result = await this.generateWithSchema(prompt, PerformanceAnalysisSchema);

    return {
      success: true,
      data: {
        studentId,
        studentName: `${student.user?.firstName || ''} ${student.user?.lastName || ''}`,
        className: student.class?.name,
        scores,
        attendanceRate,
        ...result,
      },
    };
  }

  async predictRisk(input: Record<string, unknown>): Promise<AIAgentResult> {
    const classId = input.classId as string;
    const termId = input.termId as string;

    const students = await prisma.student.findMany({
      where: { classId },
      include: {
        assessments: {
          where: { assessment: { termId } },
          include: { assessment: true },
        },
        attendance: { where: { termId } },
        user: true,
      },
    });

    const riskAnalysis = students.map(student => {
      const scores = student.assessments.map(ar => ar.score);
      const average = calculateGPA(scores);
      const totalDays = student.attendance.length;
      const presentDays = student.attendance.filter(a => a.status === 'PRESENT').length;
      const attendanceRate = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;
      const riskLevel = getRiskLevel(average, attendanceRate);

      return {
        studentId: student.id,
        studentName: `${student.user?.firstName || ''} ${student.user?.lastName || ''}`,
        average,
        attendanceRate,
        riskLevel,
        factors: {
          lowScores: average < 50,
          poorAttendance: attendanceRate < 75,
          decliningPerformance: false,
        },
      };
    });

    const highRisk = riskAnalysis.filter(r => r.riskLevel === 'HIGH');
    const mediumRisk = riskAnalysis.filter(r => r.riskLevel === 'MEDIUM');

    return {
      success: true,
      data: {
        classId,
        totalStudents: students.length,
        highRisk: highRisk.length,
        mediumRisk: mediumRisk.length,
        lowRisk: riskAnalysis.length - highRisk.length - mediumRisk.length,
        students: riskAnalysis,
      },
    };
  }

  async recommendIntervention(input: Record<string, unknown>): Promise<AIAgentResult> {
    const studentId = input.studentId as string;
    const riskData = input.riskData as Record<string, unknown>;

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { user: true, class: true },
    });

    if (!student) {
      return { success: false, error: 'Student not found' };
    }

    const prompt = `Recommend interventions for this at-risk student:
    
    Student: ${student.user?.firstName} ${student.user?.lastName}
    Class: ${student.class?.name}
    Average: ${(riskData as Record<string, number>).average || 0}%
    Attendance: ${(riskData as Record<string, number>).attendanceRate || 0}%
    Risk Level: ${(riskData as Record<string, string>).riskLevel || 'HIGH'}
    
    Provide specific, actionable interventions.`;

    const result = await this.generateWithSchema(prompt, InterventionSchema);

    return {
      success: true,
      data: {
        studentId,
        studentName: `${student.user?.firstName} ${student.user?.lastName}`,
        ...result,
      },
    };
  }

  async generateReportCard(input: Record<string, unknown>): Promise<AIAgentResult> {
    const studentId = input.studentId as string;
    const termId = input.termId as string;

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        assessments: {
          where: { assessment: { termId } },
          include: { assessment: { include: { subject: true } } },
        },
        attendance: { where: { termId } },
        class: true,
        user: true,
      },
    });

    if (!student) {
      return { success: false, error: 'Student not found' };
    }

    const subjectScores = student.assessments.reduce((acc, ar) => {
      const subjectName = ar.assessment?.subject?.name || 'Unknown';
      if (!acc[subjectName]) acc[subjectName] = [];
      acc[subjectName].push(ar.score);
      return acc;
    }, {} as Record<string, number[]>);

    const subjectAverages = Object.entries(subjectScores).map(([subject, scores]) => ({
      subject,
      scores,
      average: calculateGPA(scores as number[]),
      grade: calculateGrade(calculateGPA(scores as number[])),
    }));

    const allScores = student.assessments.map(ar => ar.score);
    const totalAverage = calculateGPA(allScores);

    return {
      success: true,
      data: {
        studentId,
        studentName: `${student.user?.firstName} ${student.user?.lastName}`,
        className: student.class?.name,
        termId,
        subjects: subjectAverages,
        totalAverage,
        overallGrade: calculateGrade(totalAverage),
        attendance: this.calculateAttendanceSummary(student.attendance),
      },
    };
  }

  async comparePerformance(input: Record<string, unknown>): Promise<AIAgentResult> {
    const classId = input.classId as string;
    const termId = input.termId as string;

    const students = await prisma.student.findMany({
      where: { classId },
      include: {
        assessments: {
          where: { assessment: { termId } },
          include: { assessment: true },
        },
        user: true,
      },
    });

    const performance = students.map(student => {
      const scores = student.assessments.map(ar => ar.score);
      return {
        studentId: student.id,
        studentName: `${student.user?.firstName || ''} ${student.user?.lastName || ''}`,
        average: calculateGPA(scores),
        grade: calculateGrade(calculateGPA(scores)),
      };
    }).sort((a, b) => b.average - a.average);

    const classAverage = calculateGPA(performance.map(p => p.average));

    return {
      success: true,
      data: {
        classId,
        termId,
        classAverage,
        students: performance,
        topPerformers: performance.slice(0, 5),
        needsImprovement: performance.filter(p => p.average < 50),
      },
    };
  }

  async classAnalysis(input: Record<string, unknown>): Promise<AIAgentResult> {
    const classId = input.classId as string;

    const classData = await prisma.schoolClass.findUnique({
      where: { id: classId },
      include: {
        students: {
          include: {
            assessments: { include: { assessment: true } },
            attendance: true,
            user: true,
          },
        },
      },
    });

    if (!classData) {
      return { success: false, error: 'Class not found' };
    }

    const analysis = classData.students.map(student => {
      const scores = student.assessments.map(ar => ar.score);
      const totalDays = student.attendance.length;
      const presentDays = student.attendance.filter(a => a.status === 'PRESENT').length;

      return {
        studentId: student.id,
        name: `${student.user?.firstName || ''} ${student.user?.lastName || ''}`,
        average: calculateGPA(scores),
        attendanceRate: totalDays > 0 ? (presentDays / totalDays) * 100 : 100,
      };
    });

    return {
      success: true,
      data: {
        className: classData.name,
        totalStudents: classData.students.length,
        classAverage: calculateGPA(analysis.map(a => a.average)),
        students: analysis,
      },
    };
  }

  private calculateAttendanceSummary(attendance: Array<{ status: string }>) {
    const total = attendance.length;
    const present = attendance.filter(a => a.status === 'PRESENT').length;
    const absent = attendance.filter(a => a.status === 'ABSENT').length;
    const late = attendance.filter(a => a.status === 'LATE').length;

    return {
      total,
      present,
      absent,
      late,
      rate: total > 0 ? (present / total) * 100 : 100,
    };
  }
}
