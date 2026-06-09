'use client';

import { useState } from 'react';
import { PageHeader, Badge, Table, Button, StatCard, ProgressBar } from '@/components/ui';
import { BarChart, DonutChart, MetricCard } from '@/components/charts';
import { Toast } from '@/components/interactive';

const mockAttendance = [
  { id: '1', student: 'Emeka Okonkwo', class: 'SS2A', date: '2026-06-07', status: 'Present', timeIn: '07:45', timeOut: '15:30' },
  { id: '2', student: 'Aisha Bello', class: 'JSS1B', date: '2026-06-07', status: 'Present', timeIn: '07:50', timeOut: '15:25' },
  { id: '3', student: 'Tunde Williams', class: 'SS3A', date: '2026-06-07', status: 'Late', timeIn: '08:15', timeOut: '15:30' },
  { id: '4', student: 'Ngozi Eze', class: 'JSS2A', date: '2026-06-07', status: 'Absent', timeIn: '-', timeOut: '-' },
  { id: '5', student: 'Yusuf Abdullahi', class: 'SS1B', date: '2026-06-07', status: 'Present', timeIn: '07:42', timeOut: '15:28' },
  { id: '6', student: 'Chioma Nwosu', class: 'JSS3A', date: '2026-06-07', status: 'Present', timeIn: '07:55', timeOut: '15:30' },
  { id: '7', student: 'Kemi Adeyemi', class: 'SS2B', date: '2026-06-07', status: 'Excused', timeIn: '-', timeOut: '-' },
  { id: '8', student: 'Femi Okafor', class: 'JSS1A', date: '2026-06-07', status: 'Present', timeIn: '07:48', timeOut: '15:20' },
];

const statusColors: Record<string, 'green' | 'red' | 'amber' | 'slate'> = {
  Present: 'green',
  Absent: 'red',
  Late: 'amber',
  Excused: 'slate',
};

const classSummary = [
  { label: 'SS2A', present: 28, total: 30, color: 'green' as const },
  { label: 'JSS1B', present: 25, total: 28, color: 'green' as const },
  { label: 'SS3A', present: 22, total: 25, color: 'amber' as const },
  { label: 'JSS2A', present: 18, total: 26, color: 'rose' as const },
  { label: 'SS1B', present: 27, total: 29, color: 'green' as const },
];

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const filtered = selectedClass === 'all'
    ? mockAttendance
    : mockAttendance.filter(a => a.class === selectedClass);

  const columns = [
    {
      key: 'student',
      header: 'Student',
      render: (row: typeof mockAttendance[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
            {row.student.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="font-semibold text-slate-900">{row.student}</span>
        </div>
      ),
    },
    { key: 'class', header: 'Class', render: (row: typeof mockAttendance[0]) => <Badge variant="blue">{row.class}</Badge> },
    { key: 'date', header: 'Date', render: (row: typeof mockAttendance[0]) => <span className="text-slate-600">{row.date}</span> },
    {
      key: 'status',
      header: 'Status',
      render: (row: typeof mockAttendance[0]) => <Badge variant={statusColors[row.status]} dot>{row.status}</Badge>,
    },
    { key: 'timeIn', header: 'Time In', render: (row: typeof mockAttendance[0]) => <span className="font-mono text-sm text-slate-600">{row.timeIn}</span> },
    { key: 'timeOut', header: 'Time Out', render: (row: typeof mockAttendance[0]) => <span className="font-mono text-sm text-slate-600">{row.timeOut}</span> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        subtitle="Track and analyze student attendance patterns"
        icon="📋"
        breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Attendance' }]}
        actions={
          <Button onClick={() => setToast({ message: 'Attendance marked successfully', type: 'success' })}>
            Mark Attendance
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Present Today" value="2,650" change="93%" changeType="positive" icon="✅" color="green" />
        <StatCard title="Absent" value="147" change="-8%" changeType="negative" icon="❌" color="rose" />
        <StatCard title="Late Arrivals" value="50" change="+3%" changeType="positive" icon="⏰" color="amber" />
        <StatCard title="Avg Attendance" value="93.1%" change="+2.3%" changeType="positive" icon="📊" color="blue" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 p-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />
          <h3 className="text-base font-bold text-slate-900 mb-1">Weekly Trend</h3>
          <p className="text-sm text-slate-500 mb-6">Attendance rate by day</p>
          <BarChart
            data={[
              { label: 'Mon', value: 95, color: '#059669' },
              { label: 'Tue', value: 92, color: '#059669' },
              { label: 'Wed', value: 88, color: '#d97706' },
              { label: 'Thu', value: 91, color: '#059669' },
              { label: 'Fri', value: 85, color: '#d97706' },
            ]}
            height={180}
          />
        </div>
        <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 p-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />
          <h3 className="text-base font-bold text-slate-900 mb-1">Today&apos;s Status</h3>
          <p className="text-sm text-slate-500 mb-6">All campuses</p>
          <div className="flex justify-center">
            <DonutChart value={2650} max={2847} size={150} strokeWidth={14} color="#059669" label="93%" sublabel="Present" />
          </div>
        </div>
      </div>

      {/* Class Summary */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 p-6">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />
        <h3 className="text-base font-bold text-slate-900 mb-5">Class Summary</h3>
        <div className="space-y-3">
          {classSummary.map(c => (
            <div key={c.label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-slate-700">{c.label}</span>
                <span className="text-slate-500">{c.present}/{c.total} present</span>
              </div>
              <ProgressBar value={c.present} max={c.total} color={c.color} size="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Filter & Table */}
      <div className="flex items-center gap-3">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        >
          <option value="all">All Classes</option>
          <option value="SS2A">SS2A</option>
          <option value="JSS1B">JSS1B</option>
          <option value="SS3A">SS3A</option>
          <option value="JSS2A">JSS2A</option>
        </select>
      </div>

      <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />
        <Table columns={columns} data={filtered as unknown as Record<string, unknown>[]} rowKey="id" emptyMessage="No attendance records" emptyIcon="📋" />
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
