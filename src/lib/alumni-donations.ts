import prisma from './prisma';
import crypto from 'crypto';

export class AlumniDonationsService {
  static async createDonation(data: { alumniId: string; amount: number; purpose: string; anonymous?: boolean; message?: string }) {
    const paymentRef = `DON-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    return prisma.alumniDonation.create({
      data: { ...data, paymentRef, status: 'pending' },
    });
  }

  static async verifyDonation(paymentRef: string, flutterwaveRef: string) {
    return prisma.alumniDonation.update({
      where: { paymentRef },
      data: { status: 'completed', flutterwaveRef },
    });
  }

  static async getDonations(alumniId?: string) {
    return prisma.alumniDonation.findMany({
      where: alumniId ? { alumniId } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getDonationStats() {
    const [total, completed, totalAmount] = await Promise.all([
      prisma.alumniDonation.count(),
      prisma.alumniDonation.count({ where: { status: 'completed' } }),
      prisma.alumniDonation.aggregate({ _sum: { amount: true }, where: { status: 'completed' } }),
    ]);
    return { total, completed, totalAmount: Number(totalAmount._sum.amount || 0) };
  }

  // Spotlight
  static async getFeaturedSpotlights() {
    return prisma.alumniSpotlight.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
  }

  static async createSpotlight(data: { alumniId: string; title: string; story: string; imageUrl?: string; yearOfGrad?: string; currentRole?: string; company?: string }) {
    return prisma.alumniSpotlight.create({ data });
  }
}