import prisma from './prisma';
import crypto from 'crypto';

// Anti-cheat event severity map
const EVENT_SEVERITY: Record<string, number> = {
  tab_switch: 2,
  fullscreen_exit: 3,
  multiple_login: 5,
  devtools_open: 4,
  copy_paste: 3,
  rapid_answering: 2,
  ip_change: 4,
  camera_blocked: 3,
  heartbeat_timeout: 10,
  device_mismatch: 5,
};

const FORCE_SUBMIT_THRESHOLD = 10;
const AUTO_LOCK_THRESHOLD = 85;
const HEARTBEAT_TIMEOUT_SECONDS = 20;

export class CBTSecurityService {
  static async logSecurityFlag(studentId: string, examId: string, flagType: string, details?: string) {
    const severity = EVENT_SEVERITY[flagType] || 1;
    
    const flag = await prisma.cBTSecurityFlag.create({
      data: { studentId, examId, flagType, severity, details },
    });

    // Check if force submit is needed
    const totalSeverity = await this.getTotalSeverity(studentId, examId);
    if (totalSeverity >= FORCE_SUBMIT_THRESHOLD) {
      await this.forceSubmit(examId, studentId, 'Auto-submitted: security threshold exceeded');
    }

    return { flag, totalSeverity, forceSubmit: totalSeverity >= FORCE_SUBMIT_THRESHOLD };
  }

  static async getTotalSeverity(studentId: string, examId: string): Promise<number> {
    const result = await prisma.cBTSecurityFlag.aggregate({
      _sum: { severity: true },
      where: { studentId, examId },
    });
    return Number(result._sum.severity || 0);
  }

  static async getSecurityFlags(examId: string) {
    return prisma.cBTSecurityFlag.findMany({
      where: { examId },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async calculateRiskScore(studentId: string, examId: string) {
    const flags = await prisma.cBTSecurityFlag.findMany({
      where: { studentId, examId },
      orderBy: { createdAt: 'desc' },
    });

    let riskScore = flags.reduce((sum, f) => sum + f.severity, 0);

    // Rapid flag burst: >= 3 flags in last 5 minutes
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentFlags = flags.filter(f => f.createdAt > fiveMinAgo);
    if (recentFlags.length >= 3) riskScore += 20;

    // Cap at 100
    riskScore = Math.min(100, riskScore);

    const level = riskScore >= 80 ? 'CRITICAL' : riskScore >= 60 ? 'HIGH' : riskScore >= 40 ? 'MODERATE' : 'LOW';
    const cheatingProbability = Math.round((1 / (1 + Math.exp(-0.08 * (riskScore - 50)))) * 100);

    return { riskScore, level, cheatingProbability, flagCount: flags.length };
  }

  static async logActivity(examId: string, studentId: string, eventType: string, ipAddress?: string, browserInfo?: string) {
    return prisma.cBTSecurityLog.create({
      data: { examId, studentId, eventType, ipAddress, browserInfo },
    });
  }

  static async updateHeartbeat(sessionToken: string, ipAddress?: string) {
    return prisma.cBTHeartbeat.upsert({
      where: { sessionToken },
      update: { lastPing: new Date(), ipAddress },
      create: { sessionToken, ipAddress },
    });
  }

  static async checkHeartbeat(sessionToken: string) {
    const heartbeat = await prisma.cBTHeartbeat.findUnique({ where: { sessionToken } });
    if (!heartbeat) return { active: false, reason: 'no_heartbeat' };

    const secondsSinceLastPing = (Date.now() - heartbeat.lastPing.getTime()) / 1000;
    if (secondsSinceLastPing > HEARTBEAT_TIMEOUT_SECONDS) {
      return { active: false, reason: 'timeout', secondsSinceLastPing: Math.round(secondsSinceLastPing) };
    }
    return { active: true, secondsSinceLastPing: Math.round(secondsSinceLastPing) };
  }

  static async forceSubmit(examId: string, studentId: string, reason: string) {
    await this.logActivity(examId, studentId, 'force_submit', undefined, reason);
    // The actual exam submission logic would be handled by the CBT service
    return { submitted: true, reason };
  }

  static async saveProctorSnapshot(sessionToken: string, studentId: string, imageUrl: string) {
    return prisma.cBTProctorSnapshot.create({
      data: { sessionToken, studentId, imageUrl },
    });
  }

  static async getProctorData(examId: string) {
    const sessions = await prisma.cBTSecurityFlag.groupBy({
      by: ['studentId'],
      where: { examId },
      _count: true,
      _sum: { severity: true },
    });

    return Promise.all(sessions.map(async (s) => {
      const risk = await this.calculateRiskScore(s.studentId, examId);
      const heartbeat = await prisma.cBTHeartbeat.findFirst({
        where: { sessionToken: { contains: s.studentId } },
        orderBy: { lastPing: 'desc' },
      });
      const isActive = heartbeat ? (Date.now() - heartbeat.lastPing.getTime()) / 1000 < HEARTBEAT_TIMEOUT_SECONDS : false;

      return {
        studentId: s.studentId,
        flagCount: s._count,
        totalSeverity: Number(s._sum.severity || 0),
        ...risk,
        isActive,
        lastPing: heartbeat?.lastPing,
      };
    }));
  }

  static generateSessionToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static generateDeviceFingerprint(ip: string, userAgent: string): string {
    return crypto.createHash('sha256').update(`${ip}:${userAgent}`).digest('hex');
  }
}