// ============================================================
// EduFlow AI - Core Type Definitions
// ============================================================

export type SchoolLevel = 'NURSERY' | 'PRIMARY' | 'SECONDARY' | 'COLLEGE';
export type SchoolType = 'DAY' | 'BOARDING' | 'MIXED';
export type SessionStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
export type TermType = 'FIRST' | 'SECOND' | 'THIRD';
export type AdmissionStatus = 'APPLIED' | 'UNDER_REVIEW' | 'RECOMMENDED' | 'APPROVED' | 'REJECTED' | 'ENROLLED' | 'WAITLISTED';
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED' | 'HALF_DAY';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type PaymentStatus = 'PENDING' | 'PARTIAL' | 'COMPLETED' | 'OVERDUE' | 'REFUNDED' | 'WAIVED';
export type BookStatus = 'AVAILABLE' | 'BORROWED' | 'RESERVED' | 'DAMAGED' | 'LOST';
export type DisciplineSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type NotificationChannel = 'IN_APP' | 'EMAIL' | 'SMS' | 'PUSH' | 'WHATSAPP';
export type UserRole = 'SUPER_ADMIN' | 'CAMPUS_ADMIN' | 'PRINCIPAL' | 'VICE_PRINCIPAL' | 'HOD' | 'FORM_TEACHER' | 'TEACHER' | 'LIBRARIAN' | 'BURSAR' | 'ADMIN_OFFICER' | 'PARENT' | 'STUDENT' | 'ALUMNI';
export type TeacherModel = 'HYBRID' | 'FORM_TEACHER' | 'SUBJECT_SPECIALIST';

// ============================================================
// Organization & Campus
// ============================================================

export interface Organization {
  id: string;
  name: string;
  code: string;
  logo?: string;
  address?: string;
  phone?: string;
  email: string;
  website?: string;
  establishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Campus {
  id: string;
  organizationId: string;
  name: string;
  code: string;
  address?: string;
  phone?: string;
  email: string;
  level: SchoolLevel[];
  type: SchoolType;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// Academic Structure
// ============================================================

export interface AcademicSession {
  id: string;
  organizationId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: SessionStatus;
  terms: AcademicTerm[];
}

export interface AcademicTerm {
  id: string;
  sessionId: string;
  name: string;
  type: TermType;
  startDate: Date;
  endDate: Date;
  status: SessionStatus;
}

export interface Department {
  id: string;
  campusId: string;
  name: string;
  code: string;
  headId?: string;
}

export interface SchoolClass {
  id: string;
  campusId: string;
  departmentId?: string;
  name: string;
  code: string;
  level: SchoolLevel;
  section?: string;
  capacity: number;
}

export interface Subject {
  id: string;
  campusId: string;
  departmentId?: string;
  classId?: string;
  name: string;
  code: string;
  level: SchoolLevel;
  isCompulsory: boolean;
}

// ============================================================
// Users & Roles
// ============================================================

export interface User {
  id: string;
  organizationId: string;
  campusId?: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: Date;
}

export interface Teacher {
  id: string;
  userId: string;
  campusId: string;
  employeeId: string;
  qualification?: string;
  specialization?: string;
  teacherModel: TeacherModel;
  hireDate: Date;
}

export interface Student {
  id: string;
  userId: string;
  campusId: string;
  admissionNumber: string;
  classId?: string;
  enrollmentDate: Date;
  dateOfBirth: Date;
  gender: Gender;
  address?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  bloodGroup?: string;
  medicalInfo?: string;
  isActive: boolean;
}

export interface Parent {
  id: string;
  userId: string;
  campusId: string;
  occupation?: string;
  relationship: string;
}

// ============================================================
// Admission
// ============================================================

export interface Admission {
  id: string;
  campusId: string;
  applicationNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
  email?: string;
  phone?: string;
  previousSchool?: string;
  previousClass?: string;
  desiredClass: string;
  parentName: string;
  parentPhone: string;
  parentEmail?: string;
  documents?: Record<string, unknown>;
  status: AdmissionStatus;
  aiScore?: number;
  aiRecommendation?: string;
  reviewedBy?: string;
  reviewedAt?: Date;
  approvedBy?: string;
  approvedAt?: Date;
  notes?: string;
}

// ============================================================
// Attendance
// ============================================================

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  termId: string;
  date: Date;
  status: AttendanceStatus;
  remark?: string;
  markedBy: string;
}

export interface AttendanceSummary {
  studentId: string;
  totalDays: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  percentage: number;
}

// ============================================================
// Assessment & CBT
// ============================================================

export interface Assessment {
  id: string;
  subjectId: string;
  classId: string;
  termId: string;
  title: string;
  type: string;
  totalMarks: number;
  weight: number;
  date: Date;
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  studentId: string;
  score: number;
  grade?: string;
  remark?: string;
}

export interface CBTExam {
  id: string;
  subjectId: string;
  title: string;
  description?: string;
  duration: number;
  totalMarks: number;
  passMark: number;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
}

export interface CBTQuestion {
  id: string;
  examId: string;
  question: string;
  type: string;
  options?: Record<string, string>;
  correctAnswer: string;
  marks: number;
  order: number;
}

export interface CBTExamResult {
  id: string;
  examId: string;
  studentId: string;
  score: number;
  grade: string;
  timeSpent: number;
  submittedAt: Date;
}

// ============================================================
// Finance
// ============================================================

export interface FinancialAccount {
  id: string;
  campusId: string;
  name: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  isActive: boolean;
}

export interface FeeStructure {
  id: string;
  accountId: string;
  termId: string;
  name: string;
  amount: number;
  dueDate?: Date;
  isCompulsory: boolean;
}

export interface FeePayment {
  id: string;
  studentId: string;
  structureId: string;
  amount: number;
  paidAmount: number;
  status: PaymentStatus;
  paymentMethod?: string;
  transactionRef?: string;
  paidAt?: Date;
  dueDate?: Date;
}

// ============================================================
// Library
// ============================================================

export interface LibraryBook {
  id: string;
  campusId: string;
  title: string;
  author: string;
  isbn?: string;
  category: string;
  subjectId?: string;
  quantity: number;
  availableQty: number;
  location?: string;
  status: BookStatus;
  penaltyPerDay: number;
}

export interface LibraryTransaction {
  id: string;
  bookId: string;
  studentId: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  penalty: number;
  isPenaltyPaid: boolean;
  status: string;
}

// ============================================================
// Hostel & Transport
// ============================================================

export interface Hostel {
  id: string;
  campusId: string;
  name: string;
  type: SchoolType;
  capacity: number;
  wardenId?: string;
  isActive: boolean;
}

export interface HostelRoom {
  id: string;
  hostelId: string;
  roomNumber: string;
  capacity: number;
  occupied: number;
  isActive: boolean;
}

export interface Transport {
  id: string;
  campusId: string;
  routeName: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  capacity: number;
  isActive: boolean;
}

// ============================================================
// Discipline
// ============================================================

export interface DisciplineRecord {
  id: string;
  studentId: string;
  teacherId: string;
  category: string;
  description: string;
  severity: DisciplineSeverity;
  actionTaken?: string;
  parentNotified: boolean;
  date: Date;
}

// ============================================================
// Notification
// ============================================================

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  channel: NotificationChannel;
  isRead: boolean;
  metadata?: Record<string, unknown>;
  sentAt: Date;
  readAt?: Date;
}

// ============================================================
// Report
// ============================================================

export interface ReportCard {
  id: string;
  studentId: string;
  classId: string;
  termId: string;
  totalScore: number;
  average: number;
  grade: string;
  position?: number;
  remarks?: string;
  generatedAt: Date;
}

// ============================================================
// AI Agent Types
// ============================================================

export interface AIAgentConfig {
  name: string;
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
}

export interface AIAgentResult {
  success: boolean;
  data?: unknown;
  error?: string;
  confidence?: number;
  reasoning?: string;
}

export interface AIWorkflowStep {
  id: string;
  name: string;
  agentName: string;
  action: string;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  nextStepId?: string;
  condition?: string;
}

export interface AIWorkflow {
  id: string;
  name: string;
  description: string;
  steps: AIWorkflowStep[];
  triggerEvent: string;
}

// ============================================================
// Dashboard & Analytics
// ============================================================

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  attendanceRate: number;
  revenue: number;
  pendingPayments: number;
  activeAdmissions: number;
  disciplineIssues: number;
}

export interface StudentPerformance {
  studentId: string;
  studentName: string;
  className: string;
  average: number;
  grade: string;
  trend: 'IMPROVING' | 'DECLINING' | 'STABLE';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface AttendanceAnalytics {
  classId: string;
  className: string;
  date: Date;
  present: number;
  absent: number;
  late: number;
  percentage: number;
}

// ============================================================
// Multi-tenancy
// ============================================================

export interface TenantContext {
  organizationId: string;
  campusId?: string;
  userId: string;
  role: UserRole;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
