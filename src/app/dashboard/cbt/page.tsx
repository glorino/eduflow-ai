'use client';

import { useState } from 'react';
import { PageHeader, Badge, Table, Button, StatCard, ProgressBar } from '@/components/ui';
import { BarChart, DonutChart, MetricCard } from '@/components/charts';
import { Modal, FormInput, FormSelect, Toast } from '@/components/interactive';

const mockExams = [
  { id: 'EXM001', title: 'JSS3 Mathematics Mid-Term', subject: 'Mathematics', class: 'JSS3', questions: 40, duration: 60, scheduled: '2026-06-10', status: 'Upcoming', submissions: 0 },
  { id: 'EXM002', title: 'SS2 Physics Quiz', subject: 'Physics', class: 'SS2', questions: 20, duration: 30, scheduled: '2026-06-08', status: 'Active', submissions: 18 },
  { id: 'EXM003', title: 'JSS1 English Grammar', subject: 'English', class: 'JSS1', questions: 30, duration: 45, scheduled: '2026-06-05', status: 'Completed', submissions: 25 },
  { id: 'EXM004', title: 'SS3 Chemistry Final', subject: 'Chemistry', class: 'SS3', questions: 50, duration: 90, scheduled: '2026-06-03', status: 'Completed', submissions: 22 },
  { id: 'EXM005', title: 'SS1 Computer Science', subject: 'Computer Science', class: 'SS1', questions: 25, duration: 40, scheduled: '2026-06-01', status: 'Completed', submissions: 20 },
];

const mockResults = [
  { student: 'Emeka Okonkwo', score: 92, grade: 'A1', class: 'SS2', exam: 'Physics Quiz' },
  { student: 'Aisha Bello', score: 85, grade: 'A1', class: 'JSS1', exam: 'English Grammar' },
  { student: 'Tunde Williams', score: 78, grade: 'B2', class: 'SS3', exam: 'Chemistry Final' },
  { student: 'Ngozi Eze', score: 45, grade: 'F9', class: 'JSS2', exam: 'English Grammar' },
  { student: 'Yusuf Abdullahi', score: 88, grade: 'A1', class: 'SS1', exam: 'Computer Science' },
];

const statusColors: Record<string, 'blue' | 'green' | 'amber'> = {
  Upcoming: 'amber',
  Active: 'blue',
  Completed: 'green',
};

export default function CBTPage() {
  const [showCreateExam, setShowCreateExam] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const examColumns = [
    {
      key: 'title',
      header: 'Exam',
      render: (row: typeof mockExams[0]) => (
        <div>
          <div className="font-semibold text-slate-900">{row.title}</div>
          <div className="text-xs text-slate-500">{row.subject} — {row.class}</div>
        </div>
      ),
    },
    { key: 'questions', header: 'Questions', render: (row: typeof mockExams[0]) => <span className="font-semibold">{row.questions}</span> },
    { key: 'duration', header: 'Duration', render: (row: typeof mockExams[0]) => <span className="text-slate-600">{row.duration} min</span> },
    { key: 'scheduled', header: 'Date', render: (row: typeof mockExams[0]) => <span className="text-slate-600">{row.scheduled}</span> },
    { key: 'status', header: 'Status', render: (row: typeof mockExams[0]) => <Badge variant={statusColors[row.status]} dot>{row.status}</Badge> },
    { key: 'submissions', header: 'Submissions', render: (row: typeof mockExams[0]) => <span className="font-semibold">{row.submissions}</span> },
    {
      key: 'actions', header: '', className: 'w-24',
      render: (row: typeof mockExams[0]) => (
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          {row.status === 'Upcoming' && <button className="px-2.5 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100">Start</button>}
          {row.status === 'Active' && <button className="px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100">Monitor</button>}
          {row.status === 'Completed' && <button className="px-2.5 py-1.5 text-xs font-medium text-violet-700 bg-violet-50 rounded-lg hover:bg-violet-100">Results</button>}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="CBT"
        subtitle="Computer-based testing and examinations"
        icon="💻"
        breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'CBT' }]}
        actions={<Button onClick={() => setShowCreateExam(true)}>+ Create Exam</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Exams" value="24" change="+4" changeType="positive" icon="📝" color="blue" />
        <StatCard title="Active Now" value="1" icon="🔴" color="green" />
        <StatCard title="Avg Score" value="76.5%" change="+3.2%" changeType="positive" icon="📊" color="violet" />
        <StatCard title="Total Submissions" value="312" change="+45" changeType="positive" icon="📋" color="amber" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-1">Score Distribution</h3>
          <p className="text-sm text-slate-500 mb-6">Last exam results</p>
          <BarChart
            data={[
              { label: 'A1\n(75-100)', value: 8, color: '#059669' },
              { label: 'B2\n(70-74)', value: 5, color: '#3b82f6' },
              { label: 'C4\n(60-69)', value: 6, color: '#d97706' },
              { label: 'D7\n(50-59)', value: 3, color: '#f97316' },
              { label: 'F9\n(0-49)', value: 2, color: '#e11d48' },
            ]}
            height={180}
          />
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-1">Pass Rate</h3>
          <p className="text-sm text-slate-500 mb-6">Overall performance</p>
          <div className="flex justify-center">
            <DonutChart value={84} size={150} strokeWidth={14} color="#059669" label="84%" sublabel="Pass" />
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-5">Top Performers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {mockResults.map((r, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-4 text-center hover:bg-blue-50 transition-colors">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg mb-3">
                {r.student.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="text-sm font-semibold text-slate-900 truncate">{r.student}</div>
              <div className="text-xs text-slate-500">{r.class} — {r.exam}</div>
              <div className="mt-2">
                <Badge variant={r.score >= 70 ? 'green' : r.score >= 50 ? 'amber' : 'red'}>
                  {r.score}% — {r.grade}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exam Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">All Exams</h3>
        </div>
        <Table columns={examColumns} data={mockExams as unknown as Record<string, unknown>[]} rowKey="id" emptyIcon="📝" />
      </div>

      {/* Create Exam Modal */}
      <Modal
        open={showCreateExam}
        onClose={() => setShowCreateExam(false)}
        title="Create New Exam"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowCreateExam(false)}>Cancel</Button>
            <Button onClick={() => { setShowCreateExam(false); setToast({ message: 'Exam created successfully', type: 'success' }); }}>Create Exam</Button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput label="Exam Title" placeholder="e.g. JSS3 Mathematics Mid-Term" required />
          <FormSelect label="Subject" options={[{ value: 'math', label: 'Mathematics' }, { value: 'english', label: 'English' }, { value: 'physics', label: 'Physics' }, { value: 'chemistry', label: 'Chemistry' }, { value: 'cs', label: 'Computer Science' }]} required />
          <FormSelect label="Class" options={[{ value: 'jss1', label: 'JSS1' }, { value: 'jss2', label: 'JSS2' }, { value: 'jss3', label: 'JSS3' }, { value: 'ss1', label: 'SS1' }, { value: 'ss2', label: 'SS2' }, { value: 'ss3', label: 'SS3' }]} required />
          <FormInput label="Number of Questions" type="number" placeholder="40" required />
          <FormInput label="Duration (minutes)" type="number" placeholder="60" required />
          <FormInput label="Scheduled Date" type="datetime-local" required />
        </div>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
