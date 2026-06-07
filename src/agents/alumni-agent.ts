import { z } from 'zod';
import { BaseAgent, type AIAgentResult } from './orchestrator';
import prisma from '@/lib/prisma';
import { sendEmail, buildEmailTemplate } from '@/lib/email';

const WAECMigrationSchema = z.object({
  eligible: z.boolean(),
  requirements: z.array(z.string()),
  missingRequirements: z.array(z.string()),
  migrationStatus: z.enum(['READY', 'PENDING', 'INCOMPLETE']),
  estimatedCompletion: z.string(),
});

export class AlumniAgent extends BaseAgent {
  name = 'AlumniAgent';
  config = {
    name: 'Alumni Agent',
    model: 'gpt-4o',
    temperature: 0.3,
    maxTokens: 1500,
    systemPrompt: `You are an AI alumni management agent for a school management system.
    Manage alumni records, WAEC migration, engagement, and tracking.
    Focus on maintaining long-term relationships and facilitating alumni contributions.`,
  };

  async execute(action: string, input: Record<string, unknown>, context?: { organizationId: string; campusId?: string; userId: string }): Promise<AIAgentResult> {
    switch (action) {
      case 'migrateToAlumni':
        return this.migrateToAlumni(input);
      case 'migrateToWAEC':
        return this.migrateToWAEC(input);
      case 'verifyEligibility':
        return this.verifyEligibility(input);
      case 'updateRecords':
        return this.updateRecords(input);
      case 'getAlumniStats':
        return this.getAlumniStats(input);
      case 'trackAlumni':
        return this.trackAlumni(input);
      default:
        return { success: false, error: `Unknown action: ${action}` };
    }
  }

  async migrateToAlumni(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { studentId, graduationYear, university, program } = input as {
      studentId: string;
      graduationYear: number;
      university?: string;
      program?: string;
    };

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { user: true },
    });

    if (!student) return { success: false, error: 'Student not found' };

    // Deactivate student
    await prisma.student.update({
      where: { id: studentId },
      data: { isActive: false },
    });

    // Create alumni record
    const alumni = await prisma.alumni.create({
      data: {
        studentId,
        graduationYear,
        currentUniversity: university,
        currentProgram: program,
      },
    });

    // Send welcome email
    if (student.user?.email) {
      await sendEmail({
        to: student.user.email,
        subject: 'Welcome to EduFlow AI Alumni Network!',
        html: buildEmailTemplate(
          'Welcome to Our Alumni Community',
          `<p>Dear ${student.user.firstName},</p>
           <p>Congratulations on your graduation! You are now part of our alumni community.</p>
           <p>We would love to stay connected and hear about your future endeavors.</p>
           <p>Please keep your contact information updated so we can share exciting opportunities and events with you.</p>
           <p>Best wishes for your future!</p>`
        ),
      });
    }

    return {
      success: true,
      data: {
        alumniId: alumni.id,
        studentName: `${student.user?.firstName} ${student.user?.lastName}`,
        graduationYear,
      },
    };
  }

  async migrateToWAEC(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { alumniId } = input as { alumniId: string };

    const alumni = await prisma.alumni.findUnique({
      where: { id: alumniId },
      include: { student: { include: { user: true, assessments: { include: { assessment: { include: { subject: true } } } } } } },
    });

    if (!alumni) return { success: false, error: 'Alumni record not found' };

    // Verify eligibility
    const eligibility = await this.verifyEligibility({ alumniId });

    if (!(eligibility.data as Record<string, boolean>)?.eligible) {
      return { success: false, error: 'Not eligible for WAEC migration', data: eligibility.data };
    }

    // Prepare WAEC data
    const assessments = alumni.student.assessments.map(ar => ({
      subject: ar.assessment?.subject?.name || 'Unknown',
      score: ar.score,
      grade: this.calculateGrade(ar.score),
    }));

    // Mark as migrated
    await prisma.alumni.update({
      where: { id: alumniId },
      data: { isMigratedToWAEC: true },
    });

    return {
      success: true,
      data: {
        alumniId,
        studentName: `${alumni.student.user?.firstName} ${alumni.student.user?.lastName}`,
        graduationYear: alumni.graduationYear,
        subjects: assessments,
        migrationDate: new Date(),
      },
    };
  }

  async verifyEligibility(input: Record<string, unknown>): Promise<AIAgentResult> {
    const alumniId = input.alumniId as string;

    const alumni = await prisma.alumni.findUnique({
      where: { id: alumniId },
      include: {
        student: {
          include: {
            assessments: { include: { assessment: true } },
            attendance: true,
          },
        },
      },
    });

    if (!alumni) return { success: false, error: 'Alumni not found' };

    const totalAssessments = alumni.student.assessments.length;
    const totalAttendance = alumni.student.attendance.length;
    const presentDays = alumni.student.attendance.filter(a => a.status === 'PRESENT').length;
    const attendanceRate = totalAttendance > 0 ? (presentDays / totalAttendance) * 100 : 0;

    const requirements = [
      'Completed all required assessments',
      'Minimum 75% attendance',
      'No outstanding disciplinary issues',
      'Cleared all financial obligations',
    ];

    const missing: string[] = [];
    if (totalAssessments < 1) missing.push('Completed all required assessments');
    if (attendanceRate < 75) missing.push('Minimum 75% attendance');

    return {
      success: true,
      data: {
        eligible: missing.length === 0,
        requirements,
        missingRequirements: missing,
        migrationStatus: missing.length === 0 ? 'READY' : 'INCOMPLETE',
        totalAssessments,
        attendanceRate: attendanceRate.toFixed(1),
      },
    };
  }

  async updateRecords(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { alumniId, updates } = input as {
      alumniId: string;
      updates: { currentUniversity?: string; currentProgram?: string; achievements?: Record<string, unknown> };
    };

    const alumni = await prisma.alumni.update({
      where: { id: alumniId },
      data: {
        currentUniversity: updates.currentUniversity,
        currentProgram: updates.currentProgram,
        achievements: updates.achievements as never,
      },
      include: { student: { include: { user: true } } },
    });

    return {
      success: true,
      data: alumni,
    };
  }

  async getAlumniStats(input: Record<string, unknown>): Promise<AIAgentResult> {
    const campusId = input.campusId as string;

    const alumni = await prisma.alumni.findMany({
      where: { student: { campusId } },
      include: { student: true },
    });

    const stats = {
      totalAlumni: alumni.length,
      migratedToWAEC: alumni.filter(a => a.isMigratedToWAEC).length,
      byGraduationYear: alumni.reduce((acc, a) => {
        acc[a.graduationYear] = (acc[a.graduationYear] || 0) + 1;
        return acc;
      }, {} as Record<number, number>),
      withUniversity: alumni.filter(a => a.currentUniversity).length,
      withProgram: alumni.filter(a => a.currentProgram).length,
    };

    return {
      success: true,
      data: stats,
    };
  }

  async trackAlumni(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { campusId, graduationYear } = input as {
      campusId: string;
      graduationYear?: number;
    };

    const where: Record<string, unknown> = { student: { campusId } };
    if (graduationYear) where.graduationYear = graduationYear;

    const alumni = await prisma.alumni.findMany({
      where,
      include: { student: { include: { user: true } } },
      orderBy: { graduationYear: 'desc' },
    });

    return {
      success: true,
      data: {
        total: alumni.length,
        alumni: alumni.map(a => ({
          id: a.id,
          name: `${a.student.user?.firstName} ${a.student.user?.lastName}`,
          graduationYear: a.graduationYear,
          university: a.currentUniversity,
          program: a.currentProgram,
          waecMigrated: a.isMigratedToWAEC,
        })),
      },
    };
  }

  private calculateGrade(score: number): string {
    if (score >= 90) return 'A1';
    if (score >= 80) return 'B2';
    if (score >= 70) return 'B3';
    if (score >= 60) return 'C4';
    if (score >= 50) return 'C5';
    if (score >= 40) return 'C6';
    if (score >= 30) return 'D7';
    if (score >= 20) return 'E8';
    return 'F9';
  }
}
