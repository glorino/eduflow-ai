import prisma from './prisma';

export class WebsiteCMSService {
  // News
  static async getPublishedNews(limit = 10) {
    return prisma.websiteNews.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });
  }

  static async createNews(data: { title: string; content: string; excerpt?: string; imageUrl?: string; author: string }) {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return prisma.websiteNews.create({ data: { ...data, slug } });
  }

  static async getAllNews() {
    return prisma.websiteNews.findMany({ orderBy: { createdAt: 'desc' } });
  }

  // Events
  static async getUpcomingEvents(limit = 10) {
    return prisma.websiteEvent.findMany({
      where: { published: true, startDate: { gte: new Date() } },
      orderBy: { startDate: 'asc' },
      take: limit,
    });
  }

  static async createEvent(data: { title: string; description: string; location?: string; startDate: Date; endDate?: Date; imageUrl?: string }) {
    return prisma.websiteEvent.create({ data });
  }

  // Gallery
  static async getGallery(category?: string, limit = 20) {
    return prisma.websiteGallery.findMany({
      where: category ? { category } : {},
      orderBy: { sortOrder: 'asc' },
      take: limit,
    });
  }

  static async addGalleryItem(data: { title: string; description?: string; imageUrl: string; category?: string }) {
    return prisma.websiteGallery.create({ data });
  }

  // Testimonials
  static async getApprovedTestimonials(limit = 10) {
    return prisma.websiteTestimonial.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  static async submitTestimonial(data: { name: string; role: string; content: string; rating?: number }) {
    return prisma.websiteTestimonial.create({ data });
  }

  // Contact
  static async submitContact(data: { name: string; email: string; phone?: string; subject: string; message: string }) {
    return prisma.websiteContact.create({ data });
  }

  static async getContacts(unreadOnly = false) {
    return prisma.websiteContact.findMany({
      where: unreadOnly ? { read: false } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  // Settings
  static async getSetting(key: string) {
    const setting = await prisma.websiteSetting.findUnique({ where: { key } });
    return setting?.value;
  }

  static async setSetting(key: string, value: string) {
    return prisma.websiteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
}
