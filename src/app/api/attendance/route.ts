import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const campusId = searchParams.get('campusId');
    const classId = searchParams.get('classId');
    const termId = searchParams.get('termId');
    const date = searchParams.get('date');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: Record<string, unknown> = {};
    if (campusId) where.student = { campusId };
    if (classId) where.classId = classId;
    if (termId) where.termId = termId;
    if (date) {
      const d = new Date(date);
      where.date = {
        gte: new Date(d.setHours(0, 0, 0, 0)),
        lt: new Date(d.setHours(23, 59, 59, 999)),
      };
    }

    const [attendance, total] = await Promise.all([
      prisma.attendance.findMany({
        where,
        include: { student: { include: { user: true } }, class: true },
        orderBy: { date: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.attendance.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: attendance,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch attendance' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { records, classId, termId, date, markedBy } = body;

    if (!records || !classId || !termId || !date) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const results = [];
    for (const record of records) {
      const attendance = await prisma.attendance.upsert({
        where: {
          studentId_classId_date: {
            studentId: record.studentId,
            classId,
            date: new Date(date),
          },
        },
        update: { status: record.status, remark: record.remark, markedBy },
        create: {
          studentId: record.studentId,
          classId,
          termId,
          date: new Date(date),
          status: record.status,
          remark: record.remark,
          markedBy,
        },
      });
      results.push(attendance);
    }

    return NextResponse.json({
      success: true,
      data: {
        marked: results.length,
        records: results,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to mark attendance' },
      { status: 500 }
    );
  }
}
