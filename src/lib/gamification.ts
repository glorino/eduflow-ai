import prisma from './prisma';

// Rank thresholds based on total XP
const RANK_THRESHOLDS = [
  { minXP: 5000, title: 'Elite Scholar', color: '#7c3aed', icon: '👑' },
  { minXP: 3000, title: 'Academic Champion', color: '#2563eb', icon: '🏆' },
  { minXP: 1500, title: 'Rising Star', color: '#059669', icon: '⭐' },
  { minXP: 500, title: 'Fast Learner', color: '#d97706', icon: '🚀' },
  { minXP: 0, title: 'Beginner', color: '#64748b', icon: '🌱' },
];

// Default badge definitions
const DEFAULT_BADGES = [
  { name: 'First Steps', description: 'Earn your first 10 XP', icon: '🎯', category: 'achievement', xpRequired: 10, color: 'blue' },
  { name: 'Getting Started', description: 'Earn 50 XP', icon: '📚', category: 'achievement', xpRequired: 50, color: 'blue' },
  { name: 'Knowledge Seeker', description: 'Earn 100 XP', icon: '🔍', category: 'academic', xpRequired: 100, color: 'violet' },
  { name: 'Study Master', description: 'Earn 250 XP', icon: '🎓', category: 'academic', xpRequired: 250, color: 'violet' },
  { name: 'Perfect Attendance', description: 'Earn 500 XP', icon: '📋', category: 'attendance', xpRequired: 500, color: 'green' },
  { name: 'Academic Star', description: 'Earn 1000 XP', icon: '⭐', category: 'academic', xpRequired: 1000, color: 'amber' },
  { name: 'Honor Roll', description: 'Earn 1500 XP', icon: '🏅', category: 'achievement', xpRequired: 1500, color: 'amber' },
  { name: 'Dean\'s List', description: 'Earn 2500 XP', icon: '📜', category: 'academic', xpRequired: 2500, color: 'rose' },
  { name: 'Scholar Elite', description: 'Earn 3500 XP', icon: '🏆', category: 'achievement', xpRequired: 3500, color: 'violet' },
  { name: 'Legend', description: 'Earn 5000 XP', icon: '👑', category: 'special', xpRequired: 5000, color: 'violet' },
  { name: 'Quiz Whiz', description: 'Complete 5 CBT exams', icon: '💻', category: 'academic', xpRequired: 0, color: 'cyan' },
  { name: 'Bookworm', description: 'Borrow 10 library books', icon: '📖', category: 'achievement', xpRequired: 0, color: 'emerald' },
  { name: 'Early Bird', description: '7-day attendance streak', icon: '🌅', category: 'attendance', xpRequired: 0, color: 'amber' },
  { name: 'Study Champion', description: '14-day study streak', icon: '🔥', category: 'special', xpRequired: 0, color: 'rose' },
  { name: 'Assignment Ace', description: 'Submit 10 assignments on time', icon: '✍️', category: 'academic', xpRequired: 0, color: 'blue' },
];

export class GamificationService {
  static async awardXP(studentId: string, points: number, source: string, metadata?: Record<string, unknown>) {
    const xp = await prisma.studentXP.create({
      data: { studentId, xpPoints: points, source, metadata },
    });

    // Check and award badges after XP award
    const newBadges = await this.checkAndAwardBadges(studentId);
    
    return { xp, newBadges };
  }

  static async getTotalXP(studentId: string): Promise<number> {
    const result = await prisma.studentXP.aggregate({
      _sum: { xpPoints: true },
      where: { studentId },
    });
    return Number(result._sum.xpPoints || 0);
  }

  static async getRankInfo(studentId: string) {
    const totalXP = await this.getTotalXP(studentId);
    const rank = RANK_THRESHOLDS.find(r => totalXP >= r.minXP) || RANK_THRESHOLDS[RANK_THRESHOLDS.length - 1];
    
    // Calculate progress to next rank
    const currentRankIndex = RANK_THRESHOLDS.indexOf(rank);
    const nextRank = currentRankIndex > 0 ? RANK_THRESHOLDS[currentRankIndex - 1] : null;
    const progress = nextRank 
      ? Math.min(100, ((totalXP - rank.minXP) / (nextRank.minXP - rank.minXP)) * 100)
      : 100;

    return {
      totalXP,
      title: rank.title,
      color: rank.color,
      icon: rank.icon,
      progress: Math.round(progress),
      nextRank: nextRank ? { title: nextRank.title, xpNeeded: nextRank.minXP - totalXP } : null,
    };
  }

  static async checkAndAwardBadges(studentId: string) {
    const totalXP = await this.getTotalXP(studentId);
    const badges = await prisma.badgeDefinition.findMany({ where: { isActive: true } });
    const awardedBadges = await prisma.studentBadge.findMany({
      where: { studentId },
      select: { badgeId: true },
    });
    const awardedBadgeIds = new Set(awardedBadges.map(b => b.badgeId));

    const newBadges = [];
    for (const badge of badges) {
      if (badge.xpRequired > 0 && totalXP >= badge.xpRequired && !awardedBadgeIds.has(badge.id)) {
        const awarded = await prisma.studentBadge.create({
          data: { studentId, badgeId: badge.id },
          include: { badge: true },
        });
        newBadges.push(awarded);
      }
    }
    return newBadges;
  }

  static async awardBadge(studentId: string, badgeName: string) {
    const badge = await prisma.badgeDefinition.findUnique({ where: { name: badgeName } });
    if (!badge) return null;

    const existing = await prisma.studentBadge.findUnique({
      where: { studentId_badgeId: { studentId, badgeId: badge.id } },
    });
    if (existing) return null;

    return prisma.studentBadge.create({
      data: { studentId, badgeId: badge.id },
      include: { badge: true },
    });
  }

  static async getLeaderboard(studentId: string, limit = 20) {
    const results = await prisma.studentXP.groupBy({
      by: ['studentId'],
      _sum: { xpPoints: true },
      orderBy: { _sum: { xpPoints: 'desc' } },
      take: limit,
    });

    const leaderboard = await Promise.all(
      results.map(async (r, index) => {
        const student = await prisma.student.findUnique({
          where: { id: r.studentId },
          select: { id: true, firstName: true, lastName: true, classId: true },
        });
        const rank = RANK_THRESHOLDS.find(t => (r._sum.xpPoints || 0) >= t.minXP) || RANK_THRESHOLDS[RANK_THRESHOLDS.length - 1];
        return {
          rank: index + 1,
          studentId: r.studentId,
          name: student ? `${student.firstName} ${student.lastName}` : 'Unknown',
          classId: student?.classId,
          totalXP: Number(r._sum.xpPoints || 0),
          rankTitle: rank.title,
          rankIcon: rank.icon,
          isCurrentUser: r.studentId === studentId,
        };
      })
    );

    // Ensure current user is in the list
    const currentUserInList = leaderboard.find(l => l.isCurrentUser);
    if (!currentUserInList) {
      const userTotalXP = await this.getTotalXP(studentId);
      const userRank = RANK_THRESHOLDS.find(t => userTotalXP >= t.minXP) || RANK_THRESHOLDS[RANK_THRESHOLDS.length - 1];
      const student = await prisma.student.findUnique({
        where: { id: studentId },
        select: { id: true, firstName: true, lastName: true, classId: true },
      });
      if (student) {
        const userPosition = results.findIndex(r => {
          const prevXP = results.indexOf(r);
          return prevXP === -1;
        });
        leaderboard.push({
          rank: userPosition > -1 ? userPosition + 1 : leaderboard.length + 1,
          studentId,
          name: `${student.firstName} ${student.lastName}`,
          classId: student.classId,
          totalXP: userTotalXP,
          rankTitle: userRank.title,
          rankIcon: userRank.icon,
          isCurrentUser: true,
        });
      }
    }

    return leaderboard;
  }

  static async getStudentBadges(studentId: string) {
    return prisma.studentBadge.findMany({
      where: { studentId },
      include: { badge: true },
      orderBy: { awardedAt: 'desc' },
    });
  }

  static async getAllBadges() {
    return prisma.badgeDefinition.findMany({
      where: { isActive: true },
      orderBy: { xpRequired: 'asc' },
    });
  }

  static async getStudyStreak(studentId: string) {
    let streak = await prisma.studyStreak.findUnique({ where: { studentId } });
    if (!streak) {
      streak = await prisma.studyStreak.create({ data: { studentId } });
    }
    return streak;
  }

  static async updateStudyStreak(studentId: string) {
    const streak = await this.getStudyStreak(studentId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastActive = streak.lastActiveDate ? new Date(streak.lastActiveDate) : null;
    lastActive?.setHours(0, 0, 0, 0);

    const diffDays = lastActive ? Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)) : -1;

    let newStreak = streak.currentStreak;
    if (diffDays === 1) {
      newStreak = streak.currentStreak + 1;
    } else if (diffDays > 1 || diffDays === -1) {
      newStreak = 1;
    }
    // diffDays === 0 means same day, no change

    return prisma.studyStreak.update({
      where: { studentId },
      data: {
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, streak.longestStreak),
        lastActiveDate: today,
        totalStudyDays: diffDays !== 0 ? streak.totalStudyDays + 1 : streak.totalStudyDays,
      },
    });
  }

  static async seedBadges() {
    for (const badge of DEFAULT_BADGES) {
      await prisma.badgeDefinition.upsert({
        where: { name: badge.name },
        update: {},
        create: badge,
      });
    }
  }
}
