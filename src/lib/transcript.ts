import prisma from './prisma';
import crypto from 'crypto';

const GRADE_SCALE = [
  { min: 75, grade: 'A', gpa: 4.0 },
  { min: 70, grade: 'B', gpa: 3.5 },
  { min: 60, grade: 'C', gpa: 3.0 },
  { min: 50, grade: 'D', gpa: 2.0 },
  { min: 0, grade: 'F', gpa: 0.0 },
];

const CLASSIFICATION = [
  { min: 3.5, title: 'First Class' },
  { min: 3.0, title: 'Second Class Upper' },
  { min: 2.5, title: 'Second Class Lower' },
  { min: 2.0, title: 'Third Class' },
  { min: 0, title: 'Pass' },
];

export class TranscriptService {
  static getGrade(percentage: number) {
    return GRADE_SCALE.find(g => percentage >= g.min) || GRADE_SCALE[GRADE_SCALE.length - 1];
  }

  static getClassification(cgpa: number) {
    return CLASSIFICATION.find(c => cgpa >= c.min) || CLASSIFICATION[CLASSIFICATION.length - 1];
  }

  static generateTranscriptId(studentId: string): string {
    return `TR-${studentId.slice(-6).toUpperCase()}`;
  }

  static generateVerificationHash(transcriptId: string, studentId: string, cgpa: number): string {
    return crypto.createHash('sha256').update(`${transcriptId}:${studentId}:${cgpa}`).digest('hex');
  }

  static async generateTranscript(studentId: string, generatedBy: string) {
    // Get student info
    const student = await prisma.student.findUnique({ where: { id: studentId } });
    if (!student) throw new Error('Student not found');

    // Get all results for this student
    const results = await prisma.result.findMany({
      where: { studentId },
      include: { subject: true },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate CGPA
    let totalGPA = 0;
    let subjectCount = 0;
    const termResults: Record<string, { subjects: Array<{ name: string; score: number; grade: string; gpa: number }>; termGPA: number }> = {};

    for (const result of results) {
      const gradeInfo = this.getGrade(result.score);
      const key = `${result.sessionId}-${result.termId}`;
      if (!termResults[key]) termResults[key] = { subjects: [], termGPA: 0 };
      termResults[key].subjects.push({
        name: result.subject.name,
        score: result.score,
        grade: gradeInfo.grade,
        gpa: gradeInfo.gpa,
      });
      totalGPA += gradeInfo.gpa;
      subjectCount++;
    }

    const cgpa = subjectCount > 0 ? totalGPA / subjectCount : 0;
    const classification = this.getClassification(cgpa);
    const transcriptId = this.generateTranscriptId(studentId);
    const verificationHash = this.generateVerificationHash(transcriptId, studentId, cgpa);

    // Get previous hash for blockchain chain
    const lastTranscript = await prisma.transcriptLog.findFirst({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });

    const blockchainHash = crypto.createHash('sha256')
      .update(`${transcriptId}:${studentId}:${cgpa}:${Date.now()}`)
      .digest('hex');

    // Save transcript log
    const transcript = await prisma.transcriptLog.create({
      data: {
        studentId,
        transcriptId,
        verificationHash,
        generatedBy,
        blockchainHash,
        previousHash: lastTranscript?.blockchainHash || null,
      },
    });

    return {
      transcript,
      student: { firstName: student.firstName, lastName: student.lastName, id: student.id },
      termResults,
      cgpa: Math.round(cgpa * 100) / 100,
      classification: classification.title,
      totalSubjects: subjectCount,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`https://eduflow-ai-gold.vercel.app/verify/${verificationHash}`)}`,
    };
  }

  static async verifyTranscript(verificationHash: string, ipAddress?: string, userAgent?: string) {
    const transcript = await prisma.transcriptLog.findUnique({
      where: { verificationHash },
      include: { student: true },
    });

    let status = 'invalid';
    if (transcript) {
      if (transcript.expiresAt && transcript.expiresAt < new Date()) {
        status = 'expired';
      } else {
        status = 'valid';
      }
    }

    // Log verification attempt
    await prisma.transcriptVerificationLog.create({
      data: { verificationHash, ipAddress, userAgent, status },
    });

    return {
      status,
      transcript: transcript ? {
        transcriptId: transcript.transcriptId,
        studentName: transcript.student ? `${transcript.student.firstName} ${transcript.student.lastName}` : 'Unknown',
        generatedAt: transcript.createdAt,
        expiresAt: transcript.expiresAt,
      } : null,
    };
  }

  static async getStudentTranscripts(studentId: string) {
    return prisma.transcriptLog.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
