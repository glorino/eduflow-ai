import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const campusId = searchParams.get('campusId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: Record<string, unknown> = {};
    if (campusId) where.campusId = campusId;
    if (status) where.status = status;

    const [admissions, total] = await Promise.all([
      prisma.admission.findMany({
        where,
        include: { campus: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.admission.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: admissions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch admissions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      campusId, firstName, lastName, dateOfBirth, gender,
      email, phone, previousSchool, previousClass, desiredClass,
      parentName, parentPhone, parentEmail, documents,
    } = body;

    if (!campusId || !firstName || !lastName || !desiredClass || !parentName || !parentPhone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate application number
    const count = await prisma.admission.count({ where: { campusId } });
    const year = new Date().getFullYear();
    const campus = await prisma.campus.findUnique({ where: { id: campusId } });
    const applicationNumber = `${campus?.code || 'GEN'}/ADM/${year}/${String(count + 1).padStart(4, '0')}`;

    const admission = await prisma.admission.create({
      data: {
        campusId,
        applicationNumber,
        firstName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        email,
        phone,
        previousSchool,
        previousClass,
        desiredClass,
        parentName,
        parentPhone,
        parentEmail,
        documents: documents || {},
        status: 'APPLIED',
      },
    });

    return NextResponse.json({
      success: true,
      data: admission,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to create admission' },
      { status: 500 }
    );
  }
}
