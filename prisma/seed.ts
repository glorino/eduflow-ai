import { PrismaClient, SchoolLevel, SchoolType, UserRole, TeacherModel, AdmissionStatus, AttendanceStatus, PaymentStatus, BookStatus, SessionStatus, TermType, DisciplineSeverity, NotificationChannel, Gender } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Organization
  const org = await prisma.organization.create({
    data: {
      name: 'EduFlow Academy',
      code: 'EFA',
      email: 'admin@eduflow.ai',
      address: '123 Education Lane, Lagos, Nigeria',
      phone: '+234-801-234-5678',
    },
  });

  // Create Campuses
  const mainCampus = await prisma.campus.create({
    data: {
      organizationId: org.id,
      name: 'EduFlow Main Campus',
      code: 'EFM',
      address: '45 School Road, Lagos',
      email: 'main@eduflow.ai',
      level: [SchoolLevel.PRIMARY, SchoolLevel.SECONDARY],
      type: SchoolType.MIXED,
    },
  });

  const nurseryCampus = await prisma.campus.create({
    data: {
      organizationId: org.id,
      name: 'EduFlow Nursery Campus',
      code: 'EFN',
      address: '67 Early Years Ave, Lagos',
      email: 'nursery@eduflow.ai',
      level: [SchoolLevel.NURSERY],
      type: SchoolType.DAY,
    },
  });

  const collegeCampus = await prisma.campus.create({
    data: {
      organizationId: org.id,
      name: 'EduFlow College',
      code: 'EFC',
      address: '89 College Road, Lagos',
      email: 'college@eduflow.ai',
      level: [SchoolLevel.COLLEGE],
      type: SchoolType.BOARDING,
    },
  });

  // Create Academic Session
  const session = await prisma.academicSession.create({
    data: {
      organizationId: org.id,
      name: '2025/2026',
      startDate: new Date('2025-09-01'),
      endDate: new Date('2026-07-31'),
      status: SessionStatus.ACTIVE,
    },
  });

  // Create Terms
  const firstTerm = await prisma.academicTerm.create({
    data: {
      sessionId: session.id,
      name: 'First Term',
      type: TermType.FIRST,
      startDate: new Date('2025-09-01'),
      endDate: new Date('2025-12-15'),
      status: SessionStatus.ACTIVE,
    },
  });

  const secondTerm = await prisma.academicTerm.create({
    data: {
      sessionId: session.id,
      name: 'Second Term',
      type: TermType.SECOND,
      startDate: new Date('2026-01-05'),
      endDate: new Date('2026-04-02'),
      status: SessionStatus.INACTIVE,
    },
  });

  // Create Departments
  const scienceDept = await prisma.department.create({
    data: { campusId: mainCampus.id, name: 'Science Department', code: 'SCI' },
  });

  const artsDept = await prisma.department.create({
    data: { campusId: mainCampus.id, name: 'Arts Department', code: 'ARTS' },
  });

  // Create Classes
  const js1a = await prisma.schoolClass.create({
    data: { campusId: mainCampus.id, departmentId: scienceDept.id, name: 'JSS1A', code: 'JS1A', level: SchoolLevel.SECONDARY, capacity: 40 },
  });

  const js2a = await prisma.schoolClass.create({
    data: { campusId: mainCampus.id, departmentId: scienceDept.id, name: 'JSS2A', code: 'JS2A', level: SchoolLevel.SECONDARY, capacity: 40 },
  });

  const ss1a = await prisma.schoolClass.create({
    data: { campusId: mainCampus.id, departmentId: scienceDept.id, name: 'SS1A', code: 'SS1A', level: SchoolLevel.SECONDARY, capacity: 35 },
  });

  const ss2a = await prisma.schoolClass.create({
    data: { campusId: mainCampus.id, departmentId: scienceDept.id, name: 'SS2A', code: 'SS2A', level: SchoolLevel.SECONDARY, capacity: 35 },
  });

  const p4 = await prisma.schoolClass.create({
    data: { campusId: mainCampus.id, name: 'Primary 4', code: 'P4', level: SchoolLevel.PRIMARY, capacity: 30 },
  });

  const nursery1 = await prisma.schoolClass.create({
    data: { campusId: nurseryCampus.id, name: 'Nursery 1', code: 'N1', level: SchoolLevel.NURSERY, capacity: 20 },
  });

  // Create Subjects
  const math = await prisma.subject.create({
    data: { campusId: mainCampus.id, departmentId: scienceDept.id, name: 'Mathematics', code: 'MTH', level: SchoolLevel.SECONDARY, isCompulsory: true },
  });

  const english = await prisma.subject.create({
    data: { campusId: mainCampus.id, departmentId: artsDept.id, name: 'English Language', code: 'ENG', level: SchoolLevel.SECONDARY, isCompulsory: true },
  });

  const physics = await prisma.subject.create({
    data: { campusId: mainCampus.id, departmentId: scienceDept.id, name: 'Physics', code: 'PHY', level: SchoolLevel.SECONDARY, isCompulsory: false },
  });

  const chemistry = await prisma.subject.create({
    data: { campusId: mainCampus.id, departmentId: scienceDept.id, name: 'Chemistry', code: 'CHM', level: SchoolLevel.SECONDARY, isCompulsory: false },
  });

  const biology = await prisma.subject.create({
    data: { campusId: mainCampus.id, departmentId: scienceDept.id, name: 'Biology', code: 'BIO', level: SchoolLevel.SECONDARY, isCompulsory: false },
  });

  // Create Users
  const passwordHash = await hash('password123', 12);

  const superAdmin = await prisma.user.create({
    data: {
      organizationId: org.id,
      email: 'admin@eduflow.ai',
      passwordHash,
      firstName: 'Super',
      lastName: 'Admin',
      phone: '+234-801-234-5678',
      role: UserRole.SUPER_ADMIN,
    },
  });

  const principal = await prisma.user.create({
    data: {
      organizationId: org.id,
      campusId: mainCampus.id,
      email: 'principal@eduflow.ai',
      passwordHash,
      firstName: 'Dr. Adebayo',
      lastName: 'Johnson',
      phone: '+234-802-345-6789',
      role: UserRole.PRINCIPAL,
    },
  });

  const vicePrincipal = await prisma.user.create({
    data: {
      organizationId: org.id,
      campusId: mainCampus.id,
      email: 'vp@eduflow.ai',
      passwordHash,
      firstName: 'Mrs. Folake',
      lastName: 'Williams',
      phone: '+234-803-456-7890',
      role: UserRole.VICE_PRINCIPAL,
    },
  });

  // Create Teachers
  const teacher1User = await prisma.user.create({
    data: {
      organizationId: org.id,
      campusId: mainCampus.id,
      email: 'teacher1@eduflow.ai',
      passwordHash,
      firstName: 'Mr. Chinedu',
      lastName: 'Okafor',
      phone: '+234-804-567-8901',
      role: UserRole.TEACHER,
    },
  });

  const teacher1 = await prisma.teacher.create({
    data: {
      userId: teacher1User.id,
      campusId: mainCampus.id,
      employeeId: 'TCH001',
      qualification: 'B.Sc Mathematics, PGDE',
      specialization: 'Mathematics',
      teacherModel: TeacherModel.SUBJECT_SPECIALIST,
      hireDate: new Date('2020-09-01'),
    },
  });

  const teacher2User = await prisma.user.create({
    data: {
      organizationId: org.id,
      campusId: mainCampus.id,
      email: 'teacher2@eduflow.ai',
      passwordHash,
      firstName: 'Mrs. Ngozi',
      lastName: 'Adeyemi',
      phone: '+234-805-678-9012',
      role: UserRole.FORM_TEACHER,
    },
  });

  const teacher2 = await prisma.teacher.create({
    data: {
      userId: teacher2User.id,
      campusId: mainCampus.id,
      employeeId: 'TCH002',
      qualification: 'B.A English, M.Ed',
      specialization: 'English Language',
      teacherModel: TeacherModel.FORM_TEACHER,
      hireDate: new Date('2019-01-15'),
    },
  });

  const teacher3User = await prisma.user.create({
    data: {
      organizationId: org.id,
      campusId: mainCampus.id,
      email: 'teacher3@eduflow.ai',
      passwordHash,
      firstName: 'Mr. Emeka',
      lastName: 'Nwosu',
      phone: '+234-806-789-0123',
      role: UserRole.TEACHER,
    },
  });

  const teacher3 = await prisma.teacher.create({
    data: {
      userId: teacher3UserUser.id,
      campusId: mainCampus.id,
      employeeId: 'TCH003',
      qualification: 'B.Sc Physics, M.Sc',
      specialization: 'Physics',
      teacherModel: TeacherModel.HYBRID,
      hireDate: new Date('2021-03-01'),
    },
  });

  // Create Form Teacher Assignments
  await prisma.formTeacher.create({
    data: { teacherId: teacher2.id, classId: js1a.id, academicYear: '2025/2026' },
  });

  // Create Subject Assignments
  await prisma.subjectAssignment.create({
    data: { teacherId: teacher1.id, subjectId: math.id, termId: firstTerm.id, academicYear: '2025/2026' },
  });

  await prisma.subjectAssignment.create({
    data: { teacherId: teacher2.id, subjectId: english.id, termId: firstTerm.id, academicYear: '2025/2026' },
  });

  await prisma.subjectAssignment.create({
    data: { teacherId: teacher3.id, subjectId: physics.id, termId: firstTerm.id, academicYear: '2025/2026' },
  });

  // Create Students
  const students = [];
  for (let i = 1; i <= 20; i++) {
    const studentUser = await prisma.user.create({
      data: {
        organizationId: org.id,
        campusId: mainCampus.id,
        email: `student${i}@eduflow.ai`,
        passwordHash,
        firstName: `Student`,
        lastName: `${String(i).padStart(3, '0')}`,
        phone: `+234-81${String(i).padStart(2, '0')}-000-0000`,
        role: UserRole.STUDENT,
      },
    });

    const student = await prisma.student.create({
      data: {
        userId: studentUser.id,
        campusId: mainCampus.id,
        admissionNumber: `EFM/STU/2025/${String(i).padStart(4, '0')}`,
        classId: i <= 10 ? js1a.id : js2a.id,
        enrollmentDate: new Date('2025-09-01'),
        dateOfBirth: new Date(`2010-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`),
        gender: i % 2 === 0 ? Gender.MALE : Gender.FEMALE,
        guardianName: `Parent ${i}`,
        guardianPhone: `+234-82${String(i).padStart(2, '0')}-000-0000`,
        guardianEmail: `parent${i}@email.com`,
      },
    });
    students.push(student);
  }

  // Create Parents
  for (let i = 1; i <= 10; i++) {
    const parentUser = await prisma.user.create({
      data: {
        organizationId: org.id,
        campusId: mainCampus.id,
        email: `parent${i}@eduflow.ai`,
        passwordHash,
        firstName: `Parent`,
        lastName: `${i}`,
        phone: `+234-83${String(i).padStart(2, '0')}-000-0000`,
        role: UserRole.PARENT,
      },
    });

    const parent = await prisma.parent.create({
      data: {
        userId: parentUser.id,
        campusId: mainCampus.id,
        occupation: 'Business',
        relationship: 'Father',
      },
    });

    // Link parent to students
    if (students[i - 1]) {
      await prisma.parentStudent.create({
        data: { parentId: parent.id, studentId: students[i - 1].id },
      });
    }
  }

  // Create Admissions
  for (let i = 1; i <= 5; i++) {
    await prisma.admission.create({
      data: {
        campusId: mainCampus.id,
        applicationNumber: `EFM/ADM/2026/${String(i).padStart(4, '0')}`,
        firstName: `Applicant`,
        lastName: `${String(i).padStart(3, '0')}`,
        dateOfBirth: new Date(`2012-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`),
        gender: i % 2 === 0 ? Gender.MALE : Gender.FEMALE,
        previousSchool: `Previous School ${i}`,
        previousClass: 'JSS1',
        desiredClass: 'JSS2',
        parentName: `Parent of Applicant ${i}`,
        parentPhone: `+234-84${String(i).padStart(2, '0')}-000-0000`,
        parentEmail: `applicant${i}@email.com`,
        status: AdmissionStatus.APPLIED,
      },
    });
  }

  // Create Financial Accounts
  const mainAccount = await prisma.financialAccount.create({
    data: {
      campusId: mainCampus.id,
      name: 'Main School Account',
      accountNumber: 'EFA-ACC-001',
      accountType: 'REVENUE',
      balance: 0,
    },
  });

  // Create Fee Structures
  const tuitionFee = await prisma.feeStructure.create({
    data: {
      accountId: mainAccount.id,
      termId: firstTerm.id,
      name: 'Tuition Fee',
      amount: 150000,
      isCompulsory: true,
    },
  });

  const developmentFee = await prisma.feeStructure.create({
    data: {
      accountId: mainAccount.id,
      termId: firstTerm.id,
      name: 'Development Fee',
      amount: 50000,
      isCompulsory: true,
    },
  });

  // Create Fee Payments
  for (let i = 0; i < 15; i++) {
    if (students[i]) {
      await prisma.feePayment.create({
        data: {
          studentId: students[i].id,
          structureId: tuitionFee.id,
          amount: 150000,
          paidAmount: i < 10 ? 150000 : 75000,
          status: i < 10 ? PaymentStatus.COMPLETED : PaymentStatus.PARTIAL,
          paymentMethod: 'BANK_TRANSFER',
          paidAt: i < 10 ? new Date() : undefined,
        },
      });
    }
  }

  // Create Attendance Records
  for (let day = 1; day <= 20; day++) {
    const date = new Date(`2026-05-${String(day).padStart(2, '0')}`);
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    for (const student of students.slice(0, 10)) {
      await prisma.attendance.create({
        data: {
          studentId: student.id,
          classId: js1a.id,
          termId: firstTerm.id,
          date,
          status: Math.random() > 0.15 ? AttendanceStatus.PRESENT : 
                  Math.random() > 0.5 ? AttendanceStatus.ABSENT : AttendanceStatus.LATE,
          markedBy: teacher2User.id,
        },
      });
    }
  }

  // Create Library Books
  const books = [];
  const bookData = [
    { title: 'Mathematics for Junior Secondary', author: 'Oluwaseun Adebayo', category: 'Textbook', isbn: '978-1234567890' },
    { title: 'English Composition', author: 'Ngozi Adeyemi', category: 'Textbook', isbn: '978-1234567891' },
    { title: 'Introduction to Physics', author: 'Emeka Nwosu', category: 'Textbook', isbn: '978-1234567892' },
    { title: 'Chemistry Practical Guide', author: 'Chinedu Okafor', category: 'Textbook', isbn: '978-1234567893' },
    { title: 'The African Child', author: 'Chinua Achebe', category: 'Literature', isbn: '978-1234567894' },
    { title: 'Things Fall Apart', author: 'Chinua Achebe', category: 'Literature', isbn: '978-1234567895' },
    { title: 'Purple Hibiscus', author: 'Chimamanda Ngozi Adichie', category: 'Literature', isbn: '978-1234567896' },
    { title: 'Science for Primary Schools', author: 'Folake Williams', category: 'Textbook', isbn: '978-1234567897' },
    { title: 'Nigerian History', author: 'Adebayo Johnson', category: 'History', isbn: '978-1234567898' },
    { title: 'Computer Studies', author: 'Emeka Nwosu', category: 'Technology', isbn: '978-1234567899' },
  ];

  for (const book of bookData) {
    const b = await prisma.libraryBook.create({
      data: {
        campusId: mainCampus.id,
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        category: book.category,
        quantity: 5,
        availableQty: Math.floor(Math.random() * 5) + 1,
        penaltyPerDay: 100,
      },
    });
    books.push(b);
  }

  // Create Library Transactions
  for (let i = 0; i < 5; i++) {
    if (students[i] && books[i]) {
      await prisma.libraryTransaction.create({
        data: {
          bookId: books[i].id,
          studentId: students[i].id,
          borrowDate: new Date(`2026-05-${String(i + 1).padStart(2, '0')}`),
          dueDate: new Date(`2026-05-${String(i + 15).padStart(2, '0')}`),
          status: 'BORROWED',
        },
      });
    }
  }

  // Create Discipline Records
  for (let i = 0; i < 3; i++) {
    if (students[i]) {
      await prisma.disciplineRecord.create({
        data: {
          studentId: students[i].id,
          teacherId: teacher1.id,
          category: ['LATENESS', 'UNIFORM', 'HOMEWORK'][i],
          description: `Discipline incident ${i + 1}`,
          severity: [DisciplineSeverity.LOW, DisciplineSeverity.MEDIUM, DisciplineSeverity.HIGH][i],
          actionTaken: ['Warning', 'Parent Called', 'Detention'][i],
          parentNotified: true,
        },
      });
    }
  }

  // Create System Configurations
  await prisma.systemConfiguration.create({
    data: {
      organizationId: org.id,
      key: 'SCHOOL_SETTINGS',
      value: {
        schoolName: 'EduFlow Academy',
        schoolMotto: 'Excellence in Education',
        gradingSystem: 'WAEC',
        maxStudentsPerClass: 40,
        attendanceThreshold: 75,
      },
      description: 'Global school settings',
    },
  });

  console.log('Database seeded successfully!');
  console.log(`Organization: ${org.name} (${org.code})`);
  console.log(`Campuses: ${mainCampus.name}, ${nurseryCampus.name}, ${collegeCampus.name}`);
  console.log(`Session: ${session.name}`);
  console.log(`Terms: ${firstTerm.name}, ${secondTerm.name}`);
  console.log(`Teachers: ${teacher1.user?.firstName}, ${teacher2.user?.firstName}, ${teacher3.user?.firstName}`);
  console.log(`Students: ${students.length}`);
  console.log(`Books: ${books.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
