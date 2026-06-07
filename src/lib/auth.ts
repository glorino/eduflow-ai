import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from './prisma';
import type { UserRole } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'eduflow-jwt-secret';
const JWT_EXPIRES_IN = '24h';

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  organizationId: string;
  campusId?: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { campus: true, organization: true },
  });

  if (!user || !user.isActive) {
    throw new Error('Invalid credentials or inactive account');
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    organizationId: user.organizationId,
    campusId: user.campusId ?? undefined,
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      avatar: user.avatar,
      organizationId: user.organizationId,
      campusId: user.campusId,
    },
  };
}

export function authorize(allowedRoles: UserRole[]) {
  return (userRole: UserRole) => allowedRoles.includes(userRole);
}

export const RolePermissions: Record<UserRole, string[]> = {
  SUPER_ADMIN: ['*'],
  CAMPUS_ADMIN: ['campus:*'],
  PRINCIPAL: ['academic:*', 'attendance:*', 'discipline:*', 'report:*'],
  VICE_PRINCIPAL: ['academic:*', 'attendance:*', 'discipline:*'],
  HOD: ['department:*', 'academic:*', 'teacher:*'],
  FORM_TEACHER: ['class:*', 'attendance:*', 'student:read'],
  TEACHER: ['subject:*', 'assessment:*', 'attendance:*'],
  LIBRARIAN: ['library:*'],
  BURSAR: ['finance:*', 'payment:*'],
  ADMIN_OFFICER: ['admission:*', 'student:*'],
  PARENT: ['child:*', 'communication:*'],
  STUDENT: ['self:*', 'library:self'],
  ALUMNI: ['alumni:self'],
};
