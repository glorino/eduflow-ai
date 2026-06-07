import { z } from 'zod';
import { BaseAgent, type AIAgentResult } from '../orchestrator';
import prisma from '@/lib/prisma';
import { sendEmail, buildEmailTemplate } from '@/lib/email';
import { logNotification } from '@/lib/sms';

const BookRecommendationSchema = z.object({
  recommendations: z.array(z.object({
    title: z.string(),
    author: z.string(),
    reason: z.string(),
    category: z.string(),
  })),
  readingLevel: z.string(),
  interests: z.array(z.string()),
});

export class LibraryAgent extends BaseAgent {
  name = 'LibraryAgent';
  config = {
    name: 'Library Agent',
    model: 'gpt-4o',
    temperature: 0.4,
    maxTokens: 1500,
    systemPrompt: `You are an AI library management agent for a school management system.
    Manage book inventory, handle borrow/return, calculate penalties, and recommend books.
    Focus on promoting reading culture and efficient resource management.`,
  };

  async execute(action: string, input: Record<string, unknown>, context?): Promise<AIAgentResult> {
    switch (action) {
      case 'borrowBook':
        return this.borrowBook(input);
      case 'returnBook':
        return this.returnBook(input);
      case 'calculatePenalty':
        return this.calculatePenalty(input);
      case 'recommendBooks':
        return this.recommendBooks(input);
      case 'inventoryCheck':
        return this.inventoryCheck(input);
      case 'overdueReport':
        return this.overdueReport(input);
      default:
        return { success: false, error: `Unknown action: ${action}` };
    }
  }

  async borrowBook(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { bookId, studentId, days } = input as {
      bookId: string;
      studentId: string;
      days?: number;
    };

    const book = await prisma.libraryBook.findUnique({ where: { id: bookId } });
    if (!book) return { success: false, error: 'Book not found' };
    if (book.availableQty <= 0) return { success: false, error: 'Book not available' };

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { user: true },
    });
    if (!student) return { success: false, error: 'Student not found' };

    const borrowDays = days || 14;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + borrowDays);

    const transaction = await prisma.libraryTransaction.create({
      data: {
        bookId,
        studentId,
        borrowDate: new Date(),
        dueDate,
        status: 'BORROWED',
      },
    });

    await prisma.libraryBook.update({
      where: { id: bookId },
      data: { availableQty: book.availableQty - 1 },
    });

    return {
      success: true,
      data: {
        transactionId: transaction.id,
        bookTitle: book.title,
        studentName: `${student.user?.firstName} ${student.user?.lastName}`,
        borrowDate: transaction.borrowDate,
        dueDate: transaction.dueDate,
      },
    };
  }

  async returnBook(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { transactionId } = input as { transactionId: string };

    const transaction = await prisma.libraryTransaction.findUnique({
      where: { id: transactionId },
      include: { book: true, student: { include: { user: true } } },
    });

    if (!transaction) return { success: false, error: 'Transaction not found' };

    const now = new Date();
    const overdueDays = Math.max(0, Math.floor((now.getTime() - transaction.dueDate.getTime()) / (1000 * 60 * 60 * 24)));
    const penalty = overdueDays * Number(transaction.book.penaltyPerDay);

    await prisma.libraryTransaction.update({
      where: { id: transactionId },
      data: {
        returnDate: now,
        penalty,
        status: 'RETURNED',
      },
    });

    await prisma.libraryBook.update({
      where: { id: transaction.bookId },
      data: { availableQty: transaction.book.availableQty + 1 },
    });

    return {
      success: true,
      data: {
        bookTitle: transaction.book.title,
        studentName: `${transaction.student.user?.firstName} ${transaction.student.user?.lastName}`,
        overdueDays,
        penalty,
        returnedOnTime: overdueDays === 0,
      },
    };
  }

  async calculatePenalty(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { transactionId } = input as { transactionId: string };

    const transaction = await prisma.libraryTransaction.findUnique({
      where: { id: transactionId },
      include: { book: true },
    });

    if (!transaction) return { success: false, error: 'Transaction not found' };

    const now = new Date();
    const overdueDays = Math.max(0, Math.floor((now.getTime() - transaction.dueDate.getTime()) / (1000 * 60 * 60 * 24)));
    const penalty = overdueDays * Number(transaction.book.penaltyPerDay);

    await prisma.libraryTransaction.update({
      where: { id: transactionId },
      data: { penalty },
    });

    return {
      success: true,
      data: {
        transactionId,
        overdueDays,
        penaltyPerDay: Number(transaction.book.penaltyPerDay),
        totalPenalty: penalty,
      },
    };
  }

  async recommendBooks(input: Record<string, unknown>): Promise<AIAgentResult> {
    const { studentId } = input as { studentId: string };

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: true,
        class: true,
        libraryTransactions: {
          include: { book: true },
          orderBy: { borrowDate: 'desc' },
          take: 10,
        },
      },
    });

    if (!student) return { success: false, error: 'Student not found' };

    const borrowedCategories = student.libraryTransactions.map(t => t.book.category);
    const prompt = `Recommend books for a student:
    Name: ${student.user?.firstName} ${student.user?.lastName}
    Class: ${student.class?.name || 'N/A'}
    Previously borrowed: ${borrowedCategories.join(', ') || 'None'}
    
    Recommend 5 books that would interest this student and expand their reading.`;

    const result = await this.generateWithSchema(prompt, BookRecommendationSchema);

    return {
      success: true,
      data: {
        studentName: `${student.user?.firstName} ${student.user?.lastName}`,
        ...result,
      },
    };
  }

  async inventoryCheck(input: Record<string, unknown>): Promise<AIAgentResult> {
    const campusId = input.campusId as string;

    const books = await prisma.libraryBook.findMany({
      where: { campusId },
    });

    const totalBooks = books.reduce((sum, b) => sum + b.quantity, 0);
    const availableBooks = books.reduce((sum, b) => sum + b.availableQty, 0);
    const borrowedBooks = totalBooks - availableBooks;
    const lowStock = books.filter(b => b.availableQty <= 2);
    const damaged = books.filter(b => b.status === 'DAMAGED');

    return {
      success: true,
      data: {
        totalTitles: books.length,
        totalBooks,
        availableBooks,
        borrowedBooks,
        lowStock: lowStock.length,
        damaged: damaged.length,
        lowStockBooks: lowStock.map(b => ({ title: b.title, available: b.availableQty })),
      },
    };
  }

  async overdueReport(input: Record<string, unknown>): Promise<AIAgentResult> {
    const campusId = input.campusId as string;

    const overdueTransactions = await prisma.libraryTransaction.findMany({
      where: {
        status: 'BORROWED',
        dueDate: { lt: new Date() },
        book: { campusId },
      },
      include: { book: true, student: { include: { user: true } } },
    });

    const report = overdueTransactions.map(t => ({
      bookTitle: t.book.title,
      studentName: `${t.student.user?.firstName || ''} ${t.student.user?.lastName || ''}`,
      borrowDate: t.borrowDate,
      dueDate: t.dueDate,
      overdueDays: Math.floor((Date.now() - t.dueDate.getTime()) / (1000 * 60 * 60 * 24)),
      penalty: Number(t.book.penaltyPerDay) * Math.floor((Date.now() - t.dueDate.getTime()) / (1000 * 60 * 60 * 24)),
    }));

    // Send reminders
    for (const t of overdueTransactions) {
      if (t.student.user?.email) {
        await sendEmail({
          to: t.student.user.email,
          subject: `Overdue Book: ${t.book.title}`,
          html: buildEmailTemplate(
            'Overdue Library Book',
            `<p>Dear ${t.student.user?.firstName},</p>
             <p>You have an overdue library book:</p>
             <p><strong>Book:</strong> ${t.book.title}</p>
             <p><strong>Due Date:</strong> ${t.dueDate.toLocaleDateString()}</p>
             <p>Please return the book as soon as possible to avoid additional penalties.</p>`
          ),
        });
      }
    }

    return {
      success: true,
      data: {
        totalOverdue: report.length,
        totalPenalty: report.reduce((sum, r) => sum + r.penalty, 0),
        books: report,
      },
    };
  }
}
