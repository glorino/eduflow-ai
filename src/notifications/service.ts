import prisma from '@/lib/prisma';
import { sendEmail, buildEmailTemplate } from '@/lib/email';
import { sendSMS, logNotification } from '@/lib/sms';
import type { NotificationChannel } from '@/types';

// ============================================================
// Notification Architecture
// ============================================================

export interface NotificationPayload {
  userId: string;
  title: string;
  message: string;
  channels: NotificationChannel[];
  metadata?: Record<string, unknown>;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  scheduledAt?: Date;
}

export interface BulkNotificationPayload {
  userIds: string[];
  title: string;
  message: string;
  channels: NotificationChannel[];
  metadata?: Record<string, unknown>;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}

export class NotificationService {
  private static instance: NotificationService;

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async send(payload: NotificationPayload): Promise<{ sent: NotificationChannel[]; failed: NotificationChannel[] }> {
    const sent: NotificationChannel[] = [];
    const failed: NotificationChannel[] = [];

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return { sent: [], failed: payload.channels };
    }

    for (const channel of payload.channels) {
      try {
        switch (channel) {
          case 'IN_APP':
            await this.sendInApp(payload);
            sent.push(channel);
            break;
          case 'EMAIL':
            if (user.email) {
              await this.sendEmail(user.email, payload);
              sent.push(channel);
            } else {
              failed.push(channel);
            }
            break;
          case 'SMS':
            if (user.phone) {
              await this.sendSMS(user.phone, payload);
              sent.push(channel);
            } else {
              failed.push(channel);
            }
            break;
          case 'PUSH':
            // Push notification logic
            sent.push(channel);
            break;
          case 'WHATSAPP':
            // WhatsApp integration
            sent.push(channel);
            break;
        }
      } catch (error) {
        console.error(`Failed to send ${channel} notification:`, error);
        failed.push(channel);
      }
    }

    return { sent, failed };
  }

  async sendBulk(payload: BulkNotificationPayload): Promise<{ total: number; sent: number; failed: number }> {
    let sent = 0;
    let failed = 0;

    for (const userId of payload.userIds) {
      const result = await this.send({ ...payload, userId });
      sent += result.sent.length;
      failed += result.failed.length;
    }

    return { total: payload.userIds.length * payload.channels.length, sent, failed };
  }

  async sendToRole(
    role: string,
    campusId: string | undefined,
    title: string,
    message: string,
    channels: NotificationChannel[]
  ): Promise<{ sent: number; failed: number }> {
    const where: Record<string, unknown> = { role, isActive: true };
    if (campusId) where.campusId = campusId;

    const users = await prisma.user.findMany({ where });

    let sent = 0;
    let failed = 0;

    for (const user of users) {
      const result = await this.send({
        userId: user.id,
        title,
        message,
        channels,
      });
      sent += result.sent.length;
      failed += result.failed.length;
    }

    return { sent, failed };
  }

  async sendToCampus(
    campusId: string,
    title: string,
    message: string,
    channels: NotificationChannel[]
  ): Promise<{ sent: number; failed: number }> {
    const users = await prisma.user.findMany({
      where: { campusId, isActive: true },
    });

    let sent = 0;
    let failed = 0;

    for (const user of users) {
      const result = await this.send({
        userId: user.id,
        title,
        message,
        channels,
      });
      sent += result.sent.length;
      failed += result.failed.length;
    }

    return { sent, failed };
  }

  private async sendInApp(payload: NotificationPayload): Promise<void> {
    await logNotification(payload.userId, payload.title, payload.message, 'IN_APP');
  }

  private async sendEmail(to: string, payload: NotificationPayload): Promise<void> {
    await sendEmail({
      to,
      subject: payload.title,
      html: buildEmailTemplate(payload.title, `<p>${payload.message}</p>`),
    });
  }

  private async sendSMS(to: string, payload: NotificationPayload): Promise<void> {
    await sendSMS({
      to,
      message: `${payload.title}\n${payload.message.slice(0, 160)}`,
    });
  }

  async getNotifications(userId: string, limit = 50): Promise<unknown[]> {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { sentAt: 'desc' },
      take: limit,
    });
  }

  async markAsRead(notificationId: string): Promise<void> {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true, readAt: new Date() },
    });
  }

  async markAllAsRead(userId: string): Promise<void> {
    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true, readAt: new Date() },
    });
  }

  async getUnreadCount(userId: string): Promise<number> {
    return prisma.notification.count({
      where: { userId, isRead: false },
    });
  }
}

export const notificationService = NotificationService.getInstance();
