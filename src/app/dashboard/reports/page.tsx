'use client';

import { useState } from 'react';
import { PageHeader, Badge, Button, StatCard } from '@/components/ui';
import { BarChart, DonutChart, HorizontalBarChart } from '@/components/charts';
import { Toast } from '@/components/interactive';

const reportTypes = [
  { id: 'academic', title: 'Academic Performance', icon: '📊', description: 'Student grades, pass rates, subject analysis', lastGenerated: '2 hours ago', gradient: 'from-blue-500 to-blue-600' },
  { id: 'attendance', title: 'Attendance Summary', icon: '📋', description: 'Daily, weekly, monthly attendance reports', lastGenerated: '5 hours ago', gradient: 'from-indigo-500 to-indigo-600' },
  { id: 'finance', title: 'Financial Report', icon: '💰', description: 'Revenue, collections, outstanding, forecasts', lastGenerated: '1 day ago', gradient: 'from-cyan-500 to-cyan-600' },
  { id: 'enrollment', title: 'Enrollment Analytics', icon: '🎓', description: 'Admission trends, demographics, retention', lastGenerated: '3 days ago', gradient: 'from-sky-500 to-sky-600' },
  { id: 'discipline', title: 'Discipline Report', icon: '⚖️', description: 'Incidents, trends, interventions', lastGenerated: '1 week ago', gradient: 'from-blue-400 to-blue-500' },
  { id: 'teacher', title: 'Teacher Performance', icon: '👩‍🏫', description: 'Ratings, workload, student feedback', lastGenerated: '2 days ago', gradient: 'from-indigo-400 to-indigo-500' },
];

const topSubjects = [
  { label: 'Mathematics', value: 82 },
  { label: 'English', value: 78 },
  { label: 'Physics', value: 75 },
  { label: 'Chemistry', value: 72 },
  { label: 'Biology', value: 70 },
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader title="Reports" subtitle="Analytics, insights, and report generation" icon="📈" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Reports' }]} actions={<Button>📥 Export All</Button>} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Reports Generated" value="156" change="+18" changeType="positive" icon="📄" color="blue" />
        <StatCard title="AI Insights" value="42" icon="🤖" color="violet" />
        <StatCard title="This Month" value="24" change="+6" changeType="positive" icon="📅" color="green" />
        <StatCard title="Shared" value="12" icon="🔗" color="amber" />
      </div>

      {/* Overview Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 relative overflow-hidden p-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
          <h3 className="text-base font-bold text-slate-900 mb-1">Performance Overview</h3>
          <p className="text-sm text-slate-500 mb-6">Average scores by term</p>
          <BarChart
            data={[
              { label: 'Term 1', value: 72, color: '#3b82f6' },
              { label: 'Term 2', value: 76, color: '#3b82f6' },
              { label: 'Term 3', value: 78, color: '#059669' },
              { label: 'This Term', value: 81, color: '#059669' },
            ]}
            height={180}
          />
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 relative overflow-hidden p-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
          <h3 className="text-base font-bold text-slate-900 mb-1">Pass Rate</h3>
          <p className="text-sm text-slate-500 mb-6">Overall this term</p>
          <div className="flex justify-center">
            <DonutChart value={84} size={150} strokeWidth={14} color="#059669" label="84%" sublabel="Pass Rate" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 relative overflow-hidden p-6">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
        <h3 className="text-base font-bold text-slate-900 mb-5">Top Performing Subjects</h3>
        <HorizontalBarChart data={topSubjects} height={28} />
      </div>

      {/* Report Types Grid */}
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map(report => (
            <div key={report.id} className="bg-white rounded-2xl border border-slate-200/80 relative overflow-hidden p-6 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all cursor-pointer group" onClick={() => setSelectedReport(report.id)}>
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${report.gradient}`} />
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{report.icon}</div>
              <h4 className="text-base font-bold text-slate-900 mb-1">{report.title}</h4>
              <p className="text-sm text-slate-500 mb-4">{report.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Last: {report.lastGenerated}</span>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Generate →</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🤖</span>
            <h3 className="text-lg font-bold">AI-Powered Insights</h3>
          </div>
          <p className="text-white/80 mb-4 max-w-lg">Our AI agents analyze your data and generate actionable insights automatically. 42 insights generated this month.</p>
          <Button onClick={() => setToast({ message: 'AI analysis started', type: 'success' })}>Run AI Analysis</Button>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
