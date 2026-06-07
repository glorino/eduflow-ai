# EduFlow AI - Enterprise Education ERP Architecture

## Complete System Architecture for 5,000 Schools & 5 Million Students

---

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                                 │
├─────────────────┬─────────────────┬─────────────────────────────────┤
│   Next.js 15    │  React Native   │      Third-Party Integrations   │
│   Web App       │  Expo Mobile    │      (WhatsApp, Paystack, etc)  │
└────────┬────────┴────────┬────────┴──────────────┬──────────────────┘
         │                 │                       │
┌────────▼─────────────────▼───────────────────────▼──────────────────┐
│                        API LAYER                                    │
├─────────────────────────────────────────────────────────────────────┤
│                    Next.js API Routes                               │
│            ┌──────────┬──────────┬──────────┐                      │
│            │ REST API │ WebSocket│ GraphQL  │                      │
│            └──────────┴──────────┴──────────┘                      │
├─────────────────────────────────────────────────────────────────────┤
│                      MIDDLEWARE LAYER                                │
├─────────────┬─────────────┬─────────────┬───────────────────────────┤
│   Auth      │   Rate      │   Tenant    │   Validation              │
│   (JWT)     │   Limiting  │   Isolation │   (Zod)                   │
└─────────────┴─────────────┴─────────────┴───────────────────────────┘
         │
┌────────▼────────────────────────────────────────────────────────────┐
│                      AI ORCHESTRATION LAYER                         │
├─────────────────────────────────────────────────────────────────────┤
│                      AI Orchestrator                                 │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐         │
│  │Admission │Academic  │Attendance│ Finance  │   CBT    │         │
│  │ Agent    │ Agent    │ Agent    │  Agent   │  Agent   │         │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘         │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐         │
│  │ Parent   │ Library  │Discipline│ Alumni   │Reporting │         │
│  │ Comm     │  Agent   │  Agent   │  Agent   │  Agent   │         │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘         │
├─────────────────────────────────────────────────────────────────────┤
│                      WORKFLOW ENGINE                                 │
│  ┌─────────────┬─────────────┬─────────────┬───────────────────┐   │
│  │  Admission   │  Attendance  │  Performance│  Library Penalty  │   │
│  │  Workflow    │  Workflow    │  Workflow   │  Workflow         │   │
│  └─────────────┴─────────────┴─────────────┴───────────────────┘   │
├─────────────────────────────────────────────────────────────────────┤
│                      NOTIFICATION SERVICE                           │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐         │
│  │ In-App   │  Email   │   SMS    │  Push    │WhatsApp  │         │
│  │          │(Nodemailer)│(Twilio)│(FCM)     │(API)     │         │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘         │
└────────────────────────────┬────────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────────┐
│                      DATA LAYER                                     │
├─────────────────────────────────────────────────────────────────────┤
│                      Neon PostgreSQL                                │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Multi-tenant Database with Row-Level Security               │  │
│  │  Tables: 40+ │ Relationships: 60+ │ Indexes: 80+            │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│                      Redis Cache                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Session Cache │ API Cache │ Rate Limiting │ Real-time       │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Database Architecture

### 2.1 Entity Relationship Overview

```
Organization (1) ──── (N) Campus
Campus (1) ──── (N) Department
Campus (1) ──── (N) SchoolClass
Campus (1) ──── (N) Subject
Campus (1) ──── (N) User
Campus (1) ──── (N) Student
Campus (1) ──── (N) Teacher
Campus (1) ──── (N) Parent
Campus (1) ──── (N) LibraryBook
Campus (1) ──── (N) FinancialAccount
Campus (1) ──── (N) Hostel
Campus (1) ──── (N) Transport

User (1) ──── (0..1) Teacher
User (1) ──── (0..1) Student
User (1) ──── (0..1) Parent
User (1) ──── (N) Notification
User (1) ──── (N) AuditLog

Student (N) ──── (N) Parent (via ParentStudent)
Student (1) ──── (0..1) Alumni
Student (N) ──── (N) Attendance
Student (N) ──── (N) AssessmentResult
Student (N) ──── (N) FeePayment
Student (N) ──── (N) LibraryTransaction
Student (N) ──── (N) DisciplineRecord
Student (N) ──── (N) CBTExamResult
Student (N) ──── (N) ReportCard

Teacher (1) ──── (N) SubjectAssignment
Teacher (1) ──── (N) FormTeacher
Teacher (1) ──── (N) CBTExamScheduler

Subject (N) ──── (N) Teacher (via SubjectAssignment)
Subject (N) ──── (N) SchoolClass
Subject (1) ──── (N) Assessment
Subject (1) ──── (N) CBTExam

AcademicSession (1) ──── (N) AcademicTerm
AcademicTerm (1) ──── (N) Assessment
AcademicTerm (1) ──── (N) Attendance
AcademicTerm (1) ──── (N) ReportCard
AcademicTerm (1) ──── (N) FeeStructure

FinancialAccount (1) ──── (N) FeeStructure
FinancialAccount (1) ──── (N) FinancialTransaction
FeeStructure (1) ──── (N) FeePayment

CBTExam (1) ──── (N) CBTQuestion
CBTExam (1) ──── (N) CBTExamResult

LibraryBook (1) ──── (N) LibraryTransaction
LibraryTransaction (N) ──── (1) Student
```

### 2.2 Multi-Tenancy Strategy

```
┌─────────────────────────────────────────────────┐
│              Organization                        │
│  ┌─────────────────────────────────────────┐    │
│  │  id, name, code, configurations         │    │
│  └─────────────────────────────────────────┘    │
│         │                                        │
│    ┌────┴────┬─────────┬──────────┐             │
│    ▼         ▼         ▼          ▼             │
│  Campus1   Campus2   Campus3   CampusN          │
│    │         │         │          │              │
│  Users     Users     Users      Users           │
│  Students  Students  Students   Students        │
│  Classes   Classes   Classes    Classes         │
│  ...       ...       ...        ...             │
└─────────────────────────────────────────────────┘

Row-Level Security: Every table has campusId for isolation
API Middleware: Automatic tenant context injection
```

### 2.3 Key Tables (40+)

| Table | Purpose | Key Relationships |
|-------|---------|-------------------|
| Organization | Multi-school management | Campuses, Users |
| Campus | Individual school location | All campus-specific data |
| AcademicSession | Academic year grouping | Terms |
| AcademicTerm | Term/semester | Assessments, Attendance |
| Department | Academic department | Classes, Subjects |
| SchoolClass | Class/section | Students, Attendance |
| Subject | Academic subject | Teachers, Assessments |
| User | All system users | Role-specific tables |
| Teacher | Teacher profiles | Subject assignments |
| Student | Student profiles | All academic data |
| Parent | Parent profiles | Student links |
| Admission | Application tracking | Campus, Status workflow |
| Attendance | Daily attendance | Student, Class, Term |
| Assessment | Tests/exams | Subject, Results |
| CBTExam | Computer-based tests | Questions, Results |
| FinancialAccount | School accounts | Transactions |
| FeeStructure | Fee definitions | Payments |
| FeePayment | Student payments | Status tracking |
| LibraryBook | Book inventory | Transactions |
| LibraryTransaction | Borrowing records | Penalty workflow |
| Hostel | Accommodation | Rooms |
| Transport | Route management | Assignments |
| Inventory | Asset tracking | Campus-specific |
| Discipline | Incident records | Student, Teacher |
| ReportCard | Term reports | Student, Class |
| Alumni | Graduate tracking | WAEC migration |
| Notification | In-app messages | User, Channel |
| AuditLog | System audit trail | User actions |
| AIAgentLog | AI execution logs | Agent monitoring |

---

## 3. AI Architecture

### 3.1 AI Agents (10 Agents)

```
┌─────────────────────────────────────────────────────────────────────┐
│                      AI ORCHESTRATOR                                 │
│                                                                     │
│  Central coordinator for all AI agents and workflows                │
│  - Agent registration and discovery                                 │
│  - Workflow execution engine                                        │
│  - Logging and monitoring                                           │
│  - Error handling and retry logic                                   │
└────────────────────────────┬────────────────────────────────────────┘
                             │
    ┌────────────────────────┼────────────────────────┐
    │                        │                        │
┌───▼───────────┐   ┌───────▼────────┐   ┌──────────▼──────────┐
│  ADMISSION    │   │   ACADEMIC     │   │   ATTENDANCE        │
│  AGENT        │   │   AGENT        │   │   AGENT             │
├───────────────┤   ├────────────────┤   ├─────────────────────┤
│ • Review Apps │   │ • Analyze Perf │   │ • Mark Attendance   │
│ • Score Apps  │   │ • Predict Risk │   │ • Analyze Patterns  │
│ • Recommend   │   │ • Interventions│   │ • Detect Risk       │
│ • Verify Docs │   │ • Report Cards │   │ • Daily Reports     │
│ • Bulk Review │   │ • Compare      │   │ • Monthly Reports   │
└───────────────┘   └────────────────┘   └─────────────────────┘

┌───────────────┐   ┌────────────────┐   ┌─────────────────────┐
│  FINANCE      │   │   CBT          │   │   PARENT COMM       │
│  AGENT        │   │   AGENT        │   │   AGENT             │
├───────────────┤   ├────────────────┤   ├─────────────────────┤
│ • Gen Invoice │   │ • Create Exam  │   │ • Risk Alerts       │
│ • Process Pay │   │ • Add Question │   │ • Progress Reports  │
│ • Analyze     │   │ • Submit Exam  │   │ • Meeting Invites   │
│ • Reminders   │   │ • Analyze      │   │ • Fee Reminders     │
│ • Apply Penal │   │ • Schedule     │   │ • Discipline Notice │
│ • Forecast    │   │ • Generate Qs  │   │ • General Notify    │
└───────────────┘   └────────────────┘   └─────────────────────┘

┌───────────────┐   ┌────────────────┐   ┌─────────────────────┐
│  LIBRARY      │   │  DISCIPLINE    │   │   ALUMNI            │
│  AGENT        │   │  AGENT         │   │   AGENT             │
├───────────────┤   ├────────────────┤   ├─────────────────────┤
│ • Borrow Book │   │ • Record Event │   │ • Migrate to Alumni │
│ • Return Book │   │ • Analyze      │   │ • WAEC Migration    │
│ • Calc Penal  │   │ • History      │   │ • Verify Eligibility│
│ • Recommend   │   │ • Report       │   │ • Update Records    │
│ • Inventory   │   │ • Track Pattern│   │ • Alumni Stats      │
│ • Overdue     │   │ • Report Gen   │   │ • Track Alumni      │
└───────────────┘   └────────────────┘   └─────────────────────┘

┌───────────────┐
│  REPORTING    │
│  AGENT        │
├───────────────┤
│ • Student Rpt │
│ • Class Rpt   │
│ • School Rpt  │
│ • Financial   │
│ • Attendance  │
│ • Executive   │
│ • Custom Rpt  │
└───────────────┘
```

### 3.2 AI Model Configuration

```typescript
// Agent Model Configuration
{
  "model": "gpt-4o",
  "temperature": 0.2-0.4,  // Low for accuracy
  "maxTokens": 1500-2000,
  "systemPrompt": "Role-specific prompts",
  "schema": "Zod validation schemas"
}
```

### 3.3 AI Workflows

```
ADMISSION REVIEW WORKFLOW:
Application → Document Verification → AI Scoring → Recommendation → Human Approval → Enrollment

ATTENDANCE ANALYSIS WORKFLOW:
Daily Data → Pattern Analysis → Risk Detection → Parent Notification

PERFORMANCE PREDICTION WORKFLOW:
Assessment Data → Performance Analysis → Risk Prediction → Intervention Recommendation

LIBRARY PENALTY WORKFLOW:
Overdue Book → Penalty Calculation → Financial Charge → Student Notification

WAEC MIGRATION WORKFLOW:
Graduation → Eligibility Check → WAEC Migration → Record Update
```

---

## 4. Mobile Architecture

### 4.1 React Native Expo Structure

```
mobile/
├── app/
│   ├── _layout.tsx          # Root layout with providers
│   ├── index.tsx            # Landing screen
│   ├── login.tsx            # Authentication
│   └── (tabs)/
│       ├── _layout.tsx      # Tab navigation
│       ├── index.tsx        # Dashboard
│       ├── attendance.tsx   # Attendance view
│       ├── cbt.tsx          # CBT exams
│       ├── messages.tsx     # Notifications
│       └── profile.tsx      # User profile
├── components/
│   ├── ui/                  # Shared UI components
│   ├── forms/               # Form components
│   └── screens/             # Screen components
├── services/
│   ├── api.ts               # API client
│   ├── auth.ts              # Authentication
│   └── notifications.ts     # Push notifications
├── store/                   # Zustand state management
├── hooks/                   # Custom hooks
└── utils/                   # Utility functions
```

### 4.2 Mobile Features

| Feature | Implementation |
|---------|---------------|
| Authentication | SecureStore + JWT |
| API Communication | Axios + React Query |
| State Management | Zustand |
| Push Notifications | Expo Notifications |
| Image Handling | Expo ImagePicker |
| Navigation | Expo Router |
| Charts | react-native-chart-kit |

---

## 5. Reporting Architecture

### 5.1 Report Types

```
┌─────────────────────────────────────────────────────────────────┐
│                    REPORTING ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Student      │  │  Class       │  │  School      │         │
│  │  Reports      │  │  Reports     │  │  Reports     │         │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤         │
│  │ • Progress   │  │ • Class Avg  │  │ • Executive  │         │
│  │ • Report Card│  │ • Comparison │  │ • Enrollment │         │
│  │ • Attendance │  │ • Performance│  │ • Financial  │         │
│  │ • Discipline │  │ • Attendance │  │ • Discipline │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Financial   │  │  Attendance  │  │  Custom      │         │
│  │  Reports     │  │  Reports     │  │  Reports     │         │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤         │
│  │ • Revenue    │  │ • Daily      │  │ • AI-Generated│        │
│  │ • Outstanding│  │ • Monthly    │  │ • Query-Based │        │
│  │ • Collection │  │ • By Class   │  │ • Scheduled   │        │
│  │ • Forecast   │  │ • Trends     │  │ • Exportable  │        │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│  EXPORT FORMATS: PDF │ Excel │ CSV │ JSON                       │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Reporting Pipeline

```
Data Collection → Aggregation → Analysis → AI Insights → Visualization → Export
       │              │            │            │              │            │
   Raw Data      Grouped      Statistical   LLM          Charts/     PDF/Excel
   (DB)          (SQL)        (Math)       Generated     Graphs      Documents
```

---

## 6. Workflow Engine

### 6.1 Workflow Components

```typescript
interface WorkflowStep {
  id: string;
  name: string;
  agentName: string;        // Which AI agent handles this step
  action: string;           // Agent action to execute
  inputMapping: Record<string, string>;  // Map context to input
  outputMapping: Record<string, string>; // Map output to context
  condition?: string;       // Conditional execution
  errorHandling: 'STOP' | 'CONTINUE' | 'RETRY';
  maxRetries: number;
}

interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'PAUSED';
  currentStepId: string | null;
  context: Record<string, unknown>;
  results: WorkflowStepResult[];
}
```

### 6.2 Built-in Workflows

| Workflow | Trigger | Steps |
|----------|---------|-------|
| Admission Review | APPLICATION | Verify → Score → Recommend |
| Attendance Analysis | DAILY | Analyze → Detect → Notify |
| Performance Prediction | TERM_END | Analyze → Predict → Intervene |
| Library Penalty | BOOK_OVERDUE | Calculate → Charge → Notify |
| WAEC Migration | GRADUATION | Verify → Migrate → Update |

---

## 7. Notification Architecture

### 7.1 Multi-Channel Notifications

```
┌─────────────────────────────────────────────────────────────────┐
│                NOTIFICATION SERVICE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    NotificationService                   │   │
│  │  • Single recipient dispatch                            │   │
│  │  • Bulk notifications                                   │   │
│  │  • Role-based distribution                              │   │
│  │  • Campus-wide announcements                            │   │
│  └────────────────────────┬────────────────────────────────┘   │
│                           │                                     │
│  ┌──────────┬─────────────┼─────────────┬──────────┐           │
│  │          │             │             │          │           │
│  ▼          ▼             ▼             ▼          ▼           │
│ ┌────┐   ┌────┐        ┌────┐       ┌────┐     ┌────┐        │
│ │In  │   │Email│       │SMS │       │Push│     │WA  │        │
│ │App │   │    │        │    │       │    │     │App │        │
│ └────┘   └────┘        └────┘       └────┘     └────┘        │
│   │        │              │            │          │            │
│   │        │              │            │          │            │
│ DB    Nodemailer      Twilio       FCM/Expo   WhatsApp API   │
│ Store  SMTP          SMS API      Push API    Business API   │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 Notification Triggers

| Event | Channel | Recipients |
|-------|---------|------------|
| Admission Status Change | Email + In-App | Parents |
| Attendance Alert (3+ absences) | Email + SMS + In-App | Parents |
| Fee Reminder | Email + SMS | Parents |
| CBT Exam Scheduled | In-App | Students |
| Book Overdue | Email + In-App | Students |
| Discipline Incident | Email | Parents |
| Report Card Ready | Email + In-App | Parents |
| AI Risk Detection | Email + SMS + In-App | Principals |

---

## 8. Business Rules Implementation

### 8.1 Hybrid Teacher Model

```
┌─────────────────────────────────────────────────────────────┐
│                    TEACHER MODELS                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HYBRID (Default)                                          │
│  ├── Teaches subjects                                       │
│  ├── Manages a class (form teacher duties)                  │
│  └── Handles both academic and pastoral care                │
│                                                             │
│  FORM_TEACHER                                               │
│  ├── Primary responsibility: Class management               │
│  ├── Attendance marking                                     │
│  ├── Parent communication                                   │
│  └── May teach 1-2 subjects                                 │
│                                                             │
│  SUBJECT_SPECIALIST                                         │
│  ├── Teaches only their subject(s)                          │
│  ├── Rotates across multiple classes                        │
│  └── No form teacher responsibilities                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 Principal Notifications

```
PRINCIPAL NOTIFICATION TRIGGERS:
├── Daily attendance summary (>90% rate = green, <80% = red)
├── Financial collection report
├── Discipline incidents (HIGH/CRITICAL severity)
├── AI risk predictions (HIGH risk students)
├── Admission pipeline summary
├── CBT exam results summary
└── System anomalies and alerts
```

### 8.3 WAEC Alumni Migration

```
WAEC MIGRATION WORKFLOW:
1. Student graduates → Auto-create Alumni record
2. Alumni record created with:
   ├── Graduation year
   ├── All assessment scores
   ├── Attendance record
   └── Discipline history
3. WAEC Migration trigger:
   ├── Verify eligibility (scores, attendance, clearance)
   ├── Format results to WAEC standard
   ├── Generate WAEC-ready document
   └── Mark as migrated
```

### 8.4 Library Penalty Workflow

```
LIBRARY PENALTY WORKFLOW:
1. Book borrowed → Due date set (default 14 days)
2. Daily check for overdue books
3. If overdue:
   ├── Calculate penalty: overdueDays × penaltyPerDay
   ├── Create financial record
   ├── Notify student
   └── Notify parent (if 5+ days overdue)
4. Penalty payment:
   ├── Process payment
   ├── Update transaction record
   └── Clear penalty flag
```

---

## 9. Scale Architecture

### 9.1 Performance Targets

| Metric | Target | Implementation |
|--------|--------|----------------|
| Schools | 5,000 | Multi-tenant architecture |
| Students | 5,000,000 | Horizontal scaling |
| Concurrent Users | 100,000 | Redis caching + CDN |
| API Response Time | <200ms | Query optimization |
| AI Response Time | <5s | Async processing |
| Uptime | 99.9% | Vercel + Neon redundancy |

### 9.2 Scaling Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                    SCALING ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Vercel Edge Network                                            │
│  ├── Automatic scaling (serverless)                            │
│  ├── Edge functions for authentication                         │
│  └── CDN for static assets                                     │
│                                                                 │
│  Neon PostgreSQL                                                │
│  ├── Auto-scaling compute                                      │
│  ├── Branching for development                                  │
│  ├── Connection pooling                                        │
│  └── Read replicas for reporting                               │
│                                                                 │
│  Redis                                                          │
│  ├── Session management                                        │
│  ├── API response caching                                      │
│  ├── Rate limiting                                             │
│  └── Real-time presence                                        │
│                                                                 │
│  Database Sharding (Future)                                     │
│  ├── Shard by organization_id                                  │
│  └── Cross-shard queries for analytics                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 9.3 Multi-Tenant Data Isolation

```
TENANT ISOLATION STRATEGY:
1. Row-Level Security (RLS) on all tables
2. API middleware enforces campus_id filtering
3. Database queries include tenant context
4. Cache keys prefixed with tenant_id
5. File storage partitioned by tenant
```

---

## 10. Deployment Architecture

### 10.1 Vercel Deployment

```
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL DEPLOYMENT                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Build Process                                                  │
│  ├── Next.js 15 compilation                                    │
│  ├── TypeScript type checking                                  │
│  ├── TailwindCSS optimization                                  │
│  └── Bundle analysis                                           │
│                                                                 │
│  Deployment                                                     │
│  ├── Automatic preview deployments                             │
│  ├── Production deployment on main branch                      │
│  ├── Environment variables per environment                     │
│  └── Custom domains per organization                           │
│                                                                 │
│  Runtime                                                        │
│  ├── Edge functions (auth, middleware)                          │
│  ├── Serverless functions (API routes)                          │
│  ├── Static generation (marketing pages)                       │
│  └── ISR (dashboard pages)                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 10.2 CI/CD Pipeline

```
CI/CD WORKFLOW:
├── Code Push
├── GitHub Actions
│   ├── Lint (ESLint)
│   ├── Type Check (TypeScript)
│   ├── Unit Tests (Vitest)
│   └── Build Test
├── Preview Deployment (Vercel)
├── Integration Tests
└── Production Deployment (Vercel)
```

---

## 11. Security Architecture

### 11.1 Security Measures

```
SECURITY LAYERS:
├── Authentication
│   ├── JWT tokens (24h expiry)
│   ├── Bcrypt password hashing (12 rounds)
│   └── Secure cookie storage
├── Authorization
│   ├── Role-based access control (RBAC)
│   ├── Permission matrix per role
│   └── API endpoint protection
├── Data Protection
│   ├── HTTPS everywhere
│   ├── SQL injection prevention (Prisma)
│   ├── XSS protection (React + CSP)
│   └── CSRF protection
├── API Security
│   ├── Rate limiting
│   ├── Input validation (Zod)
│   └── Request size limits
└── Monitoring
    ├── Audit logging
    ├── Error tracking
    └── Performance monitoring
```

### 11.2 Role Permissions

| Role | Permissions |
|------|-------------|
| SUPER_ADMIN | All permissions |
| CAMPUS_ADMIN | Campus-level management |
| PRINCIPAL | Academic, attendance, discipline, reports |
| VICE_PRINCIPAL | Academic, attendance, discipline |
| HOD | Department management |
| FORM_TEACHER | Class management, attendance |
| TEACHER | Subject, assessment, attendance |
| LIBRARIAN | Library management |
| BURSAR | Finance, payments |
| PARENT | Child information, communication |
| STUDENT | Self-service, library |

---

## 12. Module Architecture

### 12.1 Module Structure

```
src/modules/
├── admissions/
│   ├── service.ts          # Business logic
│   ├── validators.ts       # Zod schemas
│   └── types.ts            # TypeScript types
├── academics/
├── cbt/
├── attendance/
├── finance/
├── library/
├── hostel/
├── transport/
├── inventory/
├── parents/
├── teachers/
├── students/
└── alumni/
```

### 12.2 Module Features

| Module | Key Features |
|--------|-------------|
| **Admissions** | Application tracking, AI review, enrollment workflow |
| **Academics** | Curriculum management, assessment, grading |
| **CBT** | Exam creation, scheduling, auto-grading |
| **Attendance** | Daily marking, pattern analysis, alerts |
| **Finance** | Fee management, invoicing, collections |
| **Library** | Book management, borrowing, penalties |
| **Hostel** | Room allocation, occupancy tracking |
| **Transport** | Route management, student assignment |
| **Inventory** | Asset tracking, stock management |
| **Parents** | Communication, progress tracking |
| **Teachers** | Assignment, scheduling, performance |
| **Students** | Profiles, academic records, discipline |
| **Alumni** | Graduate tracking, WAEC migration |

---

## 13. API Architecture

### 13.1 API Routes Structure

```
/api/
├── auth/
│   ├── login              # POST - User login
│   ├── register           # POST - User registration
│   └── logout             # POST - User logout
├── admissions/
│   ├── GET /              # List admissions
│   ├── POST /             # Create admission
│   └── [id]/
│       ├── GET /          # Get admission
│       ├── PUT /          # Update admission
│       └── DELETE /       # Delete admission
├── academics/
├── cbt/
├── attendance/
├── finance/
├── library/
├── students/
├── teachers/
├── parents/
├── alumni/
├── ai/
│   ├── POST /             # Execute AI agent
│   └── GET /              # Get agent logs
└── reports/
```

### 13.2 API Response Format

```typescript
interface APIResponse<T> {
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
```

---

## 14. Environment Configuration

### 14.1 Required Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="..."
JWT_SECRET="..."

# AI
OPENAI_API_KEY="sk-..."
OPENAI_ORG_ID="org-..."

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="..."
SMTP_PASS="..."

# SMS
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+..."

# Cache
REDIS_URL="redis://localhost:6379"

# Storage
AWS_S3_BUCKET="eduflow-assets"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."

# Monitoring
SENTRY_DSN="..."
```

---

## 15. Quick Start Guide

### 15.1 Setup Commands

```bash
# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push
npx prisma db seed

# Start development
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### 15.2 Mobile Setup

```bash
cd mobile
npm install
npx expo start
```

---

## 16. File Structure Summary

```
SchoolAdministration/
├── prisma/
│   ├── schema.prisma      # Database schema (40+ tables)
│   └── seed.ts            # Database seeder
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Landing page
│   │   ├── dashboard/     # Dashboard pages
│   │   └── api/           # API routes
│   ├── agents/            # AI Agents (10 agents)
│   │   ├── orchestrator.ts
│   │   ├── admission-agent.ts
│   │   ├── academic-agent.ts
│   │   ├── attendance-agent.ts
│   │   ├── finance-agent.ts
│   │   ├── cbt-agent.ts
│   │   ├── parent-communication-agent.ts
│   │   ├── library-agent.ts
│   │   ├── discipline-agent.ts
│   │   ├── alumni-agent.ts
│   │   └── reporting-agent.ts
│   ├── modules/           # Business modules (13 modules)
│   ├── workflows/         # Workflow engine
│   ├── notifications/     # Notification service
│   ├── reports/           # Reporting engine
│   ├── lib/               # Shared utilities
│   │   ├── prisma.ts      # Database client
│   │   ├── auth.ts        # Authentication
│   │   ├── utils.ts       # Utility functions
│   │   ├── email.ts       # Email service
│   │   ├── sms.ts         # SMS service
│   │   └── redis.ts       # Cache service
│   ├── types/             # TypeScript types
│   └── middleware.ts      # Next.js middleware
├── mobile/                # React Native Expo app
├── docs/                  # Documentation
└── scripts/               # Build/deploy scripts
```

---

## Conclusion

EduFlow AI is a comprehensive, enterprise-grade Education ERP system designed to scale to 5,000 schools and 5 million students. The architecture leverages:

- **Next.js 15** for the web application with App Router
- **TypeScript** for type safety across the entire codebase
- **TailwindCSS** for consistent, responsive UI
- **Neon PostgreSQL** for scalable, serverless database
- **React Native Expo** for cross-platform mobile apps
- **OpenAI Agents SDK** for intelligent automation
- **Vercel** for seamless deployment and scaling

The system includes 10 AI agents, 13 business modules, a workflow engine, multi-channel notifications, and comprehensive reporting - all designed with multi-campus, multi-session, and multi-term support.
