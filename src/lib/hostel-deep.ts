import prisma from './prisma';
import crypto from 'crypto';

export class HostelDeepService {
  // Visitor Management
  static async logVisitor(data: { studentId: string; visitorName: string; visitorPhone?: string; relationship: string; purpose: string; idDocument?: string }) {
    return prisma.hostelVisitor.create({ data: { ...data, checkInTime: new Date(), status: 'checked_in' } });
  }

  static async checkoutVisitor(id: string) {
    return prisma.hostelVisitor.update({ where: { id }, data: { checkOutTime: new Date(), status: 'checked_out' } });
  }

  static async getVisitors(studentId?: string) {
    return prisma.hostelVisitor.findMany({
      where: studentId ? { studentId } : {},
      orderBy: { visitDate: 'desc' },
    });
  }

  // Incident Reporting
  static async reportIncident(data: { reportedBy: string; category: string; severity: string; description: string; location?: string }) {
    return prisma.hostelIncident.create({ data });
  }

  static async resolveIncident(id: string, resolvedBy: string) {
    return prisma.hostelIncident.update({
      where: { id },
      data: { status: 'resolved', resolvedBy, resolvedAt: new Date() },
    });
  }

  static async getIncidents(status?: string) {
    return prisma.hostelIncident.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  // Maintenance
  static async reportMaintenance(data: { reportedBy: string; category: string; description: string; location: string; priority?: string }) {
    return prisma.hostelMaintenance.create({ data });
  }

  static async getMaintenanceRequests(status?: string) {
    return prisma.hostelMaintenance.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  // Parcel Tracking
  static async receiveParcel(data: { studentId: string; senderName: string; description: string; receivedBy: string }) {
    const trackingCode = `PCL-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    return prisma.hostelParcel.create({ data: { ...data, trackingCode } });
  }

  static async claimParcel(trackingCode: string) {
    return prisma.hostelParcel.update({
      where: { trackingCode },
      data: { status: 'claimed', claimedAt: new Date() },
    });
  }

  static async getParcles(studentId?: string) {
    return prisma.hostelParcel.findMany({
      where: studentId ? { studentId } : {},
      orderBy: { receivedAt: 'desc' },
    });
  }

  // CCTV Events
  static async logCCTVEvent(data: { cameraId: string; eventType: string; severity?: string; description?: string; imageUrl?: string }) {
    return prisma.cCTVEvent.create({ data });
  }

  static async getCCTVEvents(cameraId?: string, limit = 50) {
    return prisma.cCTVEvent.findMany({
      where: cameraId ? { cameraId } : {},
      orderBy: { recordedAt: 'desc' },
      take: limit,
    });
  }
}