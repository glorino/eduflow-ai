'use client';

import { useState } from 'react';
import { PageHeader, Badge, Table, Button, StatCard, ProgressBar } from '@/components/ui';
import { Modal, FormInput, FormSelect, Toast } from '@/components/interactive';

const mockStudents = [
  { id: 'STU001', name: 'Emeka Okonkwo', class: 'SS2A', campus: 'Main Campus', attendance: 95, gpa: 3.8, status: 'Active', parent: 'Mr. Okonkwo' },
  { id: 'STU002', name: 'Aisha Bello', class: 'JSS1B', campus: 'Main Campus', attendance: 88, gpa: 3.5, status: 'Active', parent: 'Mrs. Bello' },
  { id: 'STU003', name: 'Tunde Williams', class: 'SS3A', campus: 'North Campus', attendance: 92, gpa: 3.9, status: 'Active', parent: 'Mr. Williams' },
  { id: 'STU004', name: 'Ngozi Eze', class: 'JSS2A', campus: 'Main Campus', attendance: 78, gpa: 2.8, status: 'At Risk', parent: 'Mrs. Eze' },
  { id: 'STU005', name: 'Yusuf Abdullahi', class: 'SS1B', campus: 'South Campus', attendance: 96, gpa: 3.7, status: 'Active', parent: 'Mr. Abdullahi' },
  { id: 'STU006', name: 'Chioma Nwosu', class: 'JSS3A', campus: 'Main Campus', attendance: 91, gpa: 3.6, status: 'Active', parent: 'Dr. Nwosu' },
  { id: 'STU007', name: 'Kemi Adeyemi', class: 'SS2B', campus: 'North Campus', attendance: 85, gpa: 3.2, status: 'Active', parent: 'Mrs. Adeyemi' },
  { id: 'STU008', name: 'Femi Okafor', class: 'JSS1A', campus: 'Main Campus', attendance: 73, gpa: 2.5, status: 'At Risk', parent: 'Mr. Okafor' },
];

const statusColors: Record<string, 'green' | 'red'> = {
  Active: 'green',
  'At Risk': 'red',
};

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<typeof mockStudents[0] | null>(null);

  const filtered = mockStudents.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: 'id',
      header: 'ID',
      render: (row: typeof mockStudents[0]) => <span className="font-mono text-xs text-slate-500">{row.id}</span>,
    },
    {
      key: 'name',
      header: 'Student',
      render: (row: typeof mockStudents[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
            {row.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-semibold text-slate-900">{row.name}</div>
            <div className="text-xs text-slate-500">{row.parent}</div>
          </div>
        </div>
      ),
    },
    { key: 'class', header: 'Class', render: (row: typeof mockStudents[0]) => <Badge variant="blue">{row.class}</Badge> },
    { key: 'campus', header: 'Campus', render: (row: typeof mockStudents[0]) => <span className="text-slate-600">{row.campus}</span> },
    {
      key: 'attendance',
      header: 'Attendance',
      render: (row: typeof mockStudents[0]) => (
        <div className="w-24">
          <ProgressBar value={row.attendance} color={row.attendance >= 90 ? 'green' : row.attendance >= 80 ? 'amber' : 'rose'} size="sm" showLabel />
        </div>
      ),
    },
    {
      key: 'gpa',
      header: 'GPA',
      render: (row: typeof mockStudents[0]) => (
        <span className={`font-bold ${row.gpa >= 3.5 ? 'text-emerald-600' : row.gpa >= 3.0 ? 'text-amber-600' : 'text-rose-600'}`}>
          {row.gpa.toFixed(1)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: typeof mockStudents[0]) => <Badge variant={statusColors[row.status]} dot>{row.status}</Badge>,
    },
    {
      key: 'actions',
      header: '',
      className: 'w-20',
      render: (row: typeof mockStudents[0]) => (
        <button
          onClick={(e) => { e.stopPropagation(); setSelectedStudent(row); }}
          className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students"
        subtitle="Manage student records and performance"
        icon="🎓"
        breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Students' }]}
        actions={<Button onClick={() => setShowAddStudent(true)}>+ Add Student</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Students" value="2,847" change="+12.5%" changeType="positive" icon="🎓" color="blue" />
        <StatCard title="Active" value="2,703" change="+10.2%" changeType="positive" icon="✅" color="green" />
        <StatCard title="At Risk" value="89" change="-5.1%" changeType="negative" icon="⚠️" color="rose" />
        <StatCard title="Avg Attendance" value="91.2%" change="+2.3%" changeType="positive" icon="📋" color="amber" />
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Search by name, ID, or class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <Button variant="secondary" size="sm">Export</Button>
      </div>

      {/* Table */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        <Table
          columns={columns}
          data={filtered as unknown as Record<string, unknown>[]}
          rowKey="id"
          onRowClick={(row) => setSelectedStudent(row as unknown as typeof mockStudents[0])}
          emptyMessage="No students found"
          emptyIcon="🎓"
        />
      </div>

      {/* Student Detail Modal */}
      <Modal
        open={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        title={selectedStudent?.name || 'Student Detail'}
        description={`ID: ${selectedStudent?.id} — ${selectedStudent?.class}`}
        size="lg"
      >
        {selectedStudent && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-1">Class</div>
                <div className="font-bold text-slate-900">{selectedStudent.class}</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-1">Campus</div>
                <div className="font-bold text-slate-900">{selectedStudent.campus}</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-1">GPA</div>
                <div className="font-bold text-slate-900">{selectedStudent.gpa.toFixed(1)}</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-1">Attendance</div>
                <div className="font-bold text-slate-900">{selectedStudent.attendance}%</div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3">Performance Trend</h4>
              <div className="flex items-end gap-1.5 h-24">
                {[65, 72, 68, 80, 75, 85, 78, 82, 88, 84, 90, 87].map((v, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" style={{ height: `${v}%` }} />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-slate-400">
                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Student Modal */}
      <Modal
        open={showAddStudent}
        onClose={() => setShowAddStudent(false)}
        title="Add New Student"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowAddStudent(false)}>Cancel</Button>
            <Button onClick={() => { setShowAddStudent(false); setToast({ message: 'Student added successfully', type: 'success' }); }}>Add Student</Button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput label="First Name" placeholder="Enter first name" required />
          <FormInput label="Last Name" placeholder="Enter last name" required />
          <FormSelect label="Campus" options={[{ value: 'main', label: 'Main Campus' }, { value: 'north', label: 'North Campus' }, { value: 'south', label: 'South Campus' }]} required />
          <FormSelect label="Class" options={[{ value: 'jss1', label: 'JSS1' }, { value: 'jss2', label: 'JSS2' }, { value: 'ss1', label: 'SS1' }, { value: 'ss2', label: 'SS2' }]} required />
          <FormInput label="Date of Birth" type="date" required />
          <FormSelect label="Gender" options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} required />
          <FormInput label="Parent/Guardian" placeholder="Parent name" required />
          <FormInput label="Parent Phone" type="tel" placeholder="+234 XXX XXX XXXX" required />
        </div>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
