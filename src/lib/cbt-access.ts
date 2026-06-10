import prisma from './prisma';

export class CBTAccessGuard {
  static async hasAccess(studentId: string, examId: string): Promise<boolean> {
    const access = await prisma.cBTExamAccess.findUnique({
      where: { studentId_examId: { studentId, examId } },
    });
    return access?.hasPaid ?? false;
  }

  static async grantAccess(studentId: string, examId: string, paymentRef: string) {
    return prisma.cBTExamAccess.upsert({
      where: { studentId_examId: { studentId, examId } },
      update: { hasPaid: true, paymentRef, paidAt: new Date() },
      create: { studentId, examId, hasPaid: true, paymentRef, paidAt: new Date() },
    });
  }

  static async getAccessList(examId: string) {
    return prisma.cBTExamAccess.findMany({
      where: { examId },
      include: { student: true },
    });
  }

  static async getExamAccessStats(examId: string) {
    const [total, paid] = await Promise.all([
      prisma.student.count({ where: { isActive: true } }),
      prisma.cBTExamAccess.count({ where: { examId, hasPaid: true } }),
    ]);
    return { total, paid, unpaid: total - paid };
  }
}
