import prisma from './prisma';

export class BoardroomService {
  static async getTotalRevenue() {
    const result = await prisma.feePayment.aggregate({
      _sum: { paidAmount: true },
      where: { status: 'COMPLETED' },
    });
    return Number(result._sum.paidAmount || 0);
  }

  static async getMonthlyRevenue(year: number, month: number) {
    const result = await prisma.feePayment.aggregate({
      _sum: { paidAmount: true },
      where: {
        status: 'COMPLETED',
        paymentDate: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
    });
    return Number(result._sum.paidAmount || 0);
  }

  static async getRevenueGrowth() {
    const now = new Date();
    const currentMonth = await this.getMonthlyRevenue(now.getFullYear(), now.getMonth() + 1);
    const lastMonth = await this.getMonthlyRevenue(now.getFullYear(), now.getMonth());
    if (lastMonth === 0) return 0;
    return Math.round(((currentMonth - lastMonth) / lastMonth) * 100);
  }

  static async getCollectionEfficiency() {
    const totalPaid = await this.getTotalRevenue();
    // Estimate total expected (mock: assume ₦50M total expected)
    const totalExpected = 50000000;
    return Math.min(100, Math.round((totalPaid / totalExpected) * 100));
  }

  static async getDropoutRiskCount() {
    // Students with more than 10 absences
    const result = await prisma.$queryRawUnsafe<{ student_id: string; count: bigint }[]>(
      `SELECT "studentId" as student_id, COUNT(*) as count 
       FROM "AttendanceRecord" 
       WHERE status = 'ABSENT' 
       GROUP BY "studentId" 
       HAVING COUNT(*) > 10`
    );
    return result.length;
  }

  static async getRevenueStability() {
    const now = new Date();
    const monthlyTotals: number[] = [];
    
    for (let m = 1; m <= now.getMonth() + 1; m++) {
      const revenue = await this.getMonthlyRevenue(now.getFullYear(), m);
      monthlyTotals.push(revenue);
    }

    if (monthlyTotals.length < 2) return 100;
    
    const avg = monthlyTotals.reduce((s, v) => s + v, 0) / monthlyTotals.length;
    const variance = monthlyTotals.reduce((s, v) => s + Math.pow(v - avg, 2), 0) / monthlyTotals.length;
    return Math.max(0, Math.round(100 - Math.sqrt(variance) / 1000));
  }

  static async getExecutiveHealthScore() {
    const [revenueGrowth, collectionEfficiency, revenueStability, dropoutCount] = await Promise.all([
      this.getRevenueGrowth(),
      this.getCollectionEfficiency(),
      this.getRevenueStability(),
      this.getDropoutRiskCount(),
    ]);

    const dropoutScore = Math.max(0, 100 - dropoutCount * 5);
    const score = (revenueGrowth * 0.3) + (collectionEfficiency * 0.3) + (revenueStability * 0.2) + (dropoutScore * 0.2);
    return Math.min(100, Math.round(score));
  }

  static async getBoardroomData() {
    const [totalRevenue, revenueGrowth, collectionEfficiency, dropoutRiskCount, executiveHealthScore, revenueStability] = 
      await Promise.all([
        this.getTotalRevenue(),
        this.getRevenueGrowth(),
        this.getCollectionEfficiency(),
        this.getDropoutRiskCount(),
        this.getExecutiveHealthScore(),
        this.getRevenueStability(),
      ]);

    // Monthly revenue for chart
    const now = new Date();
    const monthlyRevenue = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let m = 1; m <= 12; m++) {
      const revenue = await this.getMonthlyRevenue(now.getFullYear(), m);
      monthlyRevenue.push({ month: monthNames[m - 1], revenue });
    }

    // Student stats
    const totalStudents = await prisma.student.count({ where: { isActive: true } });
    const totalTeachers = await prisma.teacher.count({ where: { isActive: true } });

    return {
      totalRevenue,
      revenueGrowth,
      collectionEfficiency,
      dropoutRiskCount,
      executiveHealthScore,
      revenueStability,
      monthlyRevenue,
      totalStudents,
      totalTeachers,
    };
  }
}
