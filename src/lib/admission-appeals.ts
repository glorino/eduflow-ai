import prisma from './prisma';

export class AdmissionAppealsService {
  static async submitAppeal(data: { admissionId: string; applicantName: string; reason: string; supportingDocs?: string }) {
    return prisma.admissionAppeal.create({ data });
  }

  static async getAppeals(status?: string) {
    return prisma.admissionAppeal.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  static async reviewAppeal(id: string, data: { reviewedBy: string; status: string; reviewNotes?: string }) {
    return prisma.admissionAppeal.update({
      where: { id },
      data: { ...data, reviewedAt: new Date() },
    });
  }

  static async getAppealStats() {
    const [pending, approved, rejected] = await Promise.all([
      prisma.admissionAppeal.count({ where: { status: 'pending' } }),
      prisma.admissionAppeal.count({ where: { status: 'approved' } }),
      prisma.admissionAppeal.count({ where: { status: 'rejected' } }),
    ]);
    return { pending, approved, rejected, total: pending + approved + rejected };
  }
}