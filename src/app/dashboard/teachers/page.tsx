'use client';

import { useState } from 'react';
import { PageHeader, Badge, Table, Button, StatCard, ProgressBar } from '@/components/ui';
import { Modal, FormInput, FormSelect, Toast } from '@/components/interactive';

const mockTeachers = [
  { id: 'TCH001', name: 'Dr. Chukwuemeka Obi', subject: 'Mathematics', department: 'Science', campus: 'Main Campus', classes: 4, students: 120, rating: 4.8, status: 'Active' },
  { id: 'TCH002', name: 'Mrs. Fatima Al-Hassan', subject: 'English Language', department: 'Arts', campus: 'Main Campus', classes: 3, students: 95, rating: 4.9, status: 'Active' },
  { id: 'TCH003', name: 'Mr. Adebayo Johnson', subject: 'Physics', department: 'Science', campus: 'North Campus', classes: 3, students: 88, rating: 4.6, status: 'Active' },
  { id: 'TCH004', name: 'Mrs. Ngozi Eze', subject: 'Biology', department: 'Science', campus: 'Main Campus', classes: 2, students: 65, rating: 4.3, status: 'Active' },
  { id: 'TCH005', name: 'Mr. Yusuf Abdullahi', subject: 'Computer Science', department: 'ICT', campus: 'South Campus', classes: 4, students: 110, rating: 4.7, status: 'Active' },
  { id: 'TCH006', name: 'Mrs. Kemi Adeyemi', subject: 'Chemistry', department: 'Science', campus: 'North Campus', classes: 3, students: 82, rating: 4.5, status: 'On Leave' },
  { id: 'TCH007', name: 'Mr. Tunde Williams', subject: 'History', department: 'Arts', campus: 'Main Campus', classes: 2, students: 58, rating: 4.2, status: 'Active' },
  { id: 'TCH008', name: 'Mrs. Chioma Nwosu', subject: 'Economics', department: 'Commercial', campus: 'South Campus', classes: 3, students: 90, rating: 4.4, status: 'Active' },
];

const statusColors: Record<string, 'green' | 'amber'> = {
  Active: 'green',
  'On Leave': 'amber',
};

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<typeof mockTeachers[0] | null>(null);

  const filtered = mockTeachers.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: 'id',
      header: 'ID',
      render: (row: typeof mockTeachers[0]) => <span className="font-mono text-xs text-slate-500">{row.id}</span>,
    },
    {
      key: 'name',
      header: 'Teacher',
      render: (row: typeof mockTeachers[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
            {row.name.split(' ').filter(n => !['Dr.', 'Mrs.', 'Mr.'].includes(n)).map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div className="font-semibold text-slate-900">{row.name}</div>
            <div className="text-xs text-slate-500">{row.department}</div>
          </div>
        </div>
      ),
    },
    { key: 'subject', header: 'Subject', render: (row: typeof mockTeachers[0]) => <Badge variant="blue">{row.subject}</Badge> },
    { key: 'campus', header: 'Campus', render: (row: typeof mockTeachers[0]) => <span className="text-slate-600">{row.campus}</span> },
    {
      key: 'classes',
      header: 'Classes',
      render: (row: typeof mockTeachers[0]) => <span className="font-semibold">{row.classes}</span>,
    },
    {
      key: 'students',
      header: 'Students',
      render: (row: typeof mockTeachers[0]) => <span className="font-semibold">{row.students}</span>,
    },
    {
      key: 'rating',
      header: 'Rating',
      render: (row: typeof mockTeachers[0]) => (
        <div className="flex items-center gap-1.5">
          <span className="text-amber-400">★</span>
          <span className="font-semibold text-slate-900">{row.rating}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: typeof mockTeachers[0]) => <Badge variant={statusColors[row.status]} dot>{row.status}</Badge>,
    },
    {
      key: 'actions',
      header: '',
      className: 'w-20',
      render: (row: typeof mockTeachers[0]) => (
        <button
          onClick={(e) => { e.stopPropagation(); setSelectedTeacher(row); }}
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
        title="Teachers"
        subtitle="Staff management, assignments, and performance"
        icon="👩‍🏫"
        breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Teachers' }]}
        actions={<Button onClick={() => setShowAddTeacher(true)}>+ Add Teacher</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Teachers" value="156" change="+5.2%" changeType="positive" icon="👩‍🏫" color="blue" />
        <StatCard title="Active" value="148" icon="✅" color="green" />
        <StatCard title="On Leave" value="8" icon="🏖️" color="amber" />
        <StatCard title="Avg Rating" value="4.6" change="+0.2" changeType="positive" icon="⭐" color="violet" />
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Search by name, subject, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <Button variant="secondary" size="sm">Export</Button>
      </div>

      {/* Table */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-600"></div>
        <Table
          columns={columns}
          data={filtered as unknown as Record<string, unknown>[]}
          rowKey="id"
          onRowClick={(row) => setSelectedTeacher(row as unknown as typeof mockTeachers[0])}
          emptyMessage="No teachers found"
          emptyIcon="👩‍🏫"
        />
      </div>

      {/* Teacher Detail Modal */}
      <Modal
        open={!!selectedTeacher}
        onClose={() => setSelectedTeacher(null)}
        title={selectedTeacher?.name || 'Teacher Detail'}
        description={`ID: ${selectedTeacher?.id} — ${selectedTeacher?.subject}`}
        size="lg"
      >
        {selectedTeacher && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-violet-50 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-1">Department</div>
                <div className="font-bold text-slate-900">{selectedTeacher.department}</div>
              </div>
              <div className="bg-violet-50 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-1">Campus</div>
                <div className="font-bold text-slate-900">{selectedTeacher.campus}</div>
              </div>
              <div className="bg-violet-50 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-1">Classes</div>
                <div className="font-bold text-slate-900">{selectedTeacher.classes}</div>
              </div>
              <div className="bg-violet-50 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-1">Students</div>
                <div className="font-bold text-slate-900">{selectedTeacher.students}</div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3">Teaching Load</h4>
              <div className="space-y-3">
                {[
                  { label: 'SS2A — Mathematics', hours: 8, max: 10 },
                  { label: 'SS1B — Mathematics', hours: 6, max: 10 },
                  { label: 'JSS3A — Further Math', hours: 4, max: 10 },
                ].map(c => (
                  <div key={c.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700">{c.label}</span>
                      <span className="text-slate-500">{c.hours}h/week</span>
                    </div>
                    <ProgressBar value={c.hours} max={c.max} color="blue" size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Teacher Modal */}
      <Modal
        open={showAddTeacher}
        onClose={() => setShowAddTeacher(false)}
        title="Add New Teacher"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowAddTeacher(false)}>Cancel</Button>
            <Button onClick={() => { setShowAddTeacher(false); setToast({ message: 'Teacher added successfully', type: 'success' }); }}>Add Teacher</Button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput label="First Name" placeholder="Enter first name" required />
          <FormInput label="Last Name" placeholder="Enter last name" required />
          <FormInput label="Email" type="email" placeholder="teacher@email.com" required />
          <FormInput label="Phone" type="tel" placeholder="+234 XXX XXX XXXX" required />
          <FormSelect label="Subject" options={[{ value: 'math', label: 'Mathematics' }, { value: 'english', label: 'English' }, { value: 'physics', label: 'Physics' }, { value: 'chemistry', label: 'Chemistry' }, { value: 'biology', label: 'Biology' }, { value: 'cs', label: 'Computer Science' }]} required />
          <FormSelect label="Department" options={[{ value: 'science', label: 'Science' }, { value: 'arts', label: 'Arts' }, { value: 'commercial', label: 'Commercial' }, { value: 'ict', label: 'ICT' }]} required />
          <FormSelect label="Campus" options={[{ value: 'main', label: 'Main Campus' }, { value: 'north', label: 'North Campus' }, { value: 'south', label: 'South Campus' }]} required />
          <FormInput label="Employee ID" placeholder="Auto-generated" disabled />
        </div>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
