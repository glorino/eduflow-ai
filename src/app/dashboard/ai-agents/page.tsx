'use client';

import { useState } from 'react';
import { PageHeader, Badge, Button, StatCard, Card } from '@/components/ui';
import { Timeline } from '@/components/charts';
import { Modal, Toast } from '@/components/interactive';

const agents = [
  {
    id: 'admission',
    name: 'Admission Agent',
    icon: '📝',
    description: 'Reviews applications, scores candidates, and recommends admissions based on academic history and criteria.',
    status: 'Active',
    tasksToday: 12,
    accuracy: 94.2,
    totalProcessed: 1247,
    avgResponseTime: '2.3s',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'academic',
    name: 'Academic Agent',
    icon: '📚',
    description: 'Analyzes student performance, predicts risks, generates report cards and academic insights.',
    status: 'Active',
    tasksToday: 8,
    accuracy: 91.5,
    totalProcessed: 892,
    avgResponseTime: '1.8s',
    color: 'from-violet-500 to-violet-600',
  },
  {
    id: 'attendance',
    name: 'Attendance Agent',
    icon: '📋',
    description: 'Monitors attendance patterns, flags risks, and sends automated alerts to parents.',
    status: 'Active',
    tasksToday: 15,
    accuracy: 98.1,
    totalProcessed: 3450,
    avgResponseTime: '0.5s',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 'finance',
    name: 'Finance Agent',
    icon: '💰',
    description: 'Manages invoicing, payment tracking, revenue forecasting, and financial reporting.',
    status: 'Active',
    tasksToday: 6,
    accuracy: 99.2,
    totalProcessed: 2100,
    avgResponseTime: '1.2s',
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 'cbt',
    name: 'CBT Agent',
    icon: '💻',
    description: 'Creates exams, grades submissions, generates analytics, and builds question banks.',
    status: 'Active',
    tasksToday: 3,
    accuracy: 97.8,
    totalProcessed: 567,
    avgResponseTime: '3.1s',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    id: 'parent',
    name: 'Parent Communication Agent',
    icon: '👨‍👩‍👧',
    description: 'Drafts personalized messages, sends progress reports, and manages parent engagement.',
    status: 'Active',
    tasksToday: 9,
    accuracy: 93.4,
    totalProcessed: 1890,
    avgResponseTime: '1.5s',
    color: 'from-rose-500 to-rose-600',
  },
  {
    id: 'library',
    name: 'Library Agent',
    icon: '📖',
    description: 'Manages book circulation, calculates penalties, and recommends reading materials.',
    status: 'Active',
    tasksToday: 4,
    accuracy: 96.7,
    totalProcessed: 780,
    avgResponseTime: '0.8s',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 'discipline',
    name: 'Discipline Agent',
    icon: '⚖️',
    description: 'Records incidents, analyzes patterns, and suggests interventions for at-risk students.',
    status: 'Active',
    tasksToday: 2,
    accuracy: 89.3,
    totalProcessed: 234,
    avgResponseTime: '2.0s',
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 'alumni',
    name: 'Alumni Agent',
    icon: '🏛️',
    description: 'Handles WAEC migration, alumni tracking, and maintains alumni network database.',
    status: 'Active',
    tasksToday: 1,
    accuracy: 95.1,
    totalProcessed: 456,
    avgResponseTime: '4.2s',
    color: 'from-teal-500 to-teal-600',
  },
  {
    id: 'reporting',
    name: 'Reporting Agent',
    icon: '📈',
    description: 'Generates automated reports, dashboards, and provides predictive analytics across all modules.',
    status: 'Active',
    tasksToday: 7,
    accuracy: 92.8,
    totalProcessed: 1560,
    avgResponseTime: '2.7s',
    color: 'from-pink-500 to-pink-600',
  },
];

const activityLog = [
  { icon: '📝', title: 'Admission Agent: Reviewed 5 applications', time: '10 min ago', color: 'blue' as const },
  { icon: '🤖', title: 'Finance Agent: Generated 12 invoices', time: '25 min ago', color: 'green' as const },
  { icon: '📋', title: 'Attendance Agent: Flagged 3 at-risk students', time: '1 hour ago', color: 'amber' as const },
  { icon: '📊', title: 'Reporting Agent: Weekly summary generated', time: '2 hours ago', color: 'violet' as const },
  { icon: '👨‍👩‍👧', title: 'Parent Agent: Sent 42 progress reports', time: '3 hours ago', color: 'rose' as const },
  { icon: '⚖️', title: 'Discipline Agent: 1 incident recorded', time: '5 hours ago', color: 'amber' as const },
];

export default function AIAgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const totalTasks = agents.reduce((s, a) => s + a.tasksToday, 0);
  const avgAccuracy = agents.reduce((s, a) => s + a.accuracy, 0) / agents.length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Agents"
        subtitle="10 autonomous agents powering your school"
        icon="🤖"
        breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'AI Agents' }]}
        actions={
          <Button onClick={() => setToast({ message: 'All agents refreshed', type: 'success' })}>
            🔄 Refresh All
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Active Agents" value="10/10" icon="🤖" color="green" subtitle="All systems operational" />
        <StatCard title="Tasks Today" value={totalTasks} change="+15" changeType="positive" icon="⚡" color="blue" />
        <StatCard title="Avg Accuracy" value={`${avgAccuracy.toFixed(1)}%`} change="+1.2%" changeType="positive" icon="🎯" color="violet" />
        <StatCard title="Total Processed" value={agents.reduce((s, a) => s + a.totalProcessed, 0).toLocaleString()} icon="📊" color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agents Grid */}
        <div className="lg:col-span-2">
          <h3 className="text-base font-bold text-slate-900 mb-4">All Agents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map(agent => (
              <div
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    {agent.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{agent.name}</h4>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[11px] font-medium text-emerald-600">{agent.status}</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{agent.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-slate-500">{agent.tasksToday} tasks today</span>
                      <span className="text-xs font-semibold text-slate-700">{agent.accuracy}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-5">Agent Activity</h3>
          <Timeline items={activityLog} />
        </div>
      </div>

      {/* Agent Detail Modal */}
      <Modal
        open={!!selectedAgent}
        onClose={() => setSelectedAgent(null)}
        title={selectedAgent?.name || ''}
        size="lg"
      >
        {selectedAgent && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedAgent.color} flex items-center justify-center text-3xl`}>{selectedAgent.icon}</div>
              <div>
                <p className="text-slate-600">{selectedAgent.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="green" dot>Active</Badge>
                  <span className="text-xs text-slate-500">Uptime: 99.9%</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-slate-900">{selectedAgent.tasksToday}</div><div className="text-xs text-slate-500">Tasks Today</div></div>
              <div className="bg-slate-50 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-emerald-600">{selectedAgent.accuracy}%</div><div className="text-xs text-slate-500">Accuracy</div></div>
              <div className="bg-slate-50 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-slate-900">{selectedAgent.totalProcessed.toLocaleString()}</div><div className="text-xs text-slate-500">Total Processed</div></div>
              <div className="bg-slate-50 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-slate-900">{selectedAgent.avgResponseTime}</div><div className="text-xs text-slate-500">Avg Response</div></div>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setToast({ message: `${selectedAgent.name} refreshed`, type: 'success' })}>Refresh Agent</Button>
              <Button variant="secondary">View Logs</Button>
              <Button variant="ghost">Configuration</Button>
            </div>
          </div>
        )}
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
