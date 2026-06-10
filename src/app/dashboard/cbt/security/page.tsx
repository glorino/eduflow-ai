'use client';

import { useState } from 'react';
import { PageHeader, Badge, Table, Button, StatCard } from '@/components/ui';
import { Modal, Toast } from '@/components/interactive';

const mockSecurityFlags = [
  { id: 1, student: 'Emeka Okonkwo', studentId: 'STU001', exam: 'JSS3 Mathematics', flagType: 'tab_switch', severity: 2, time: '2 min ago', status: 'active' },
  { id: 2, student: 'Aisha Bello', studentId: 'STU002', exam: 'SS2 Physics', flagType: 'fullscreen_exit', severity: 3, time: '5 min ago', status: 'active' },
  { id: 3, student: 'Tunde Williams', studentId: 'STU003', exam: 'SS2 Physics', flagType: 'devtools_open', severity: 4, time: '8 min ago', status: 'active' },
  { id: 4, student: 'Ngozi Eze', studentId: 'STU004', exam: 'JSS3 Mathematics', flagType: 'copy_paste', severity: 3, time: '12 min ago', status: 'resolved' },
  { id: 5, student: 'Yusuf Abdullahi', studentId: 'STU005', exam: 'SS1 Computer Science', flagType: 'camera_blocked', severity: 3, time: '15 min ago', status: 'active' },
  { id: 6, student: 'Fatima Aliyu', studentId: 'STU006', exam: 'SS2 Physics', flagType: 'ip_change', severity: 4, time: '18 min ago', status: 'active' },
  { id: 7, student: 'Chidi Nnamdi', studentId: 'STU007', exam: 'JSS3 Mathematics', flagType: 'rapid_answering', severity: 2, time: '22 min ago', status: 'resolved' },
  { id: 8, student: 'Blessing Okafor', studentId: 'STU008', exam: 'SS1 Computer Science', flagType: 'tab_switch', severity: 2, time: '25 min ago', status: 'active' },
];

const mockStudentSessions = [
  { id: 'STU001', name: 'Emeka Okonkwo', exam: 'JSS3 Mathematics', status: 'active', riskScore: 45, flags: 3, lastPing: '2s ago', heartbeat: 'healthy', color: 'blue' },
  { id: 'STU002', name: 'Aisha Bello', exam: 'SS2 Physics', status: 'active', riskScore: 62, flags: 4, lastPing: '5s ago', heartbeat: 'warning', color: 'amber' },
  { id: 'STU003', name: 'Tunde Williams', exam: 'SS2 Physics', status: 'active', riskScore: 78, flags: 5, lastPing: '3s ago', heartbeat: 'critical', color: 'red' },
  { id: 'STU004', name: 'Ngozi Eze', exam: 'JSS3 Mathematics', status: 'completed', riskScore: 30, flags: 2, lastPing: 'N/A', heartbeat: 'inactive', color: 'green' },
  { id: 'STU005', name: 'Yusuf Abdullahi', exam: 'SS1 Computer Science', status: 'active', riskScore: 55, flags: 3, lastPing: '8s ago', heartbeat: 'healthy', color: 'blue' },
  { id: 'STU006', name: 'Fatima Aliyu', exam: 'SS2 Physics', status: 'active', riskScore: 85, flags: 6, lastPing: '1s ago', heartbeat: 'critical', color: 'red' },
  { id: 'STU007', name: 'Chidi Nnamdi', exam: 'JSS3 Mathematics', status: 'active', riskScore: 20, flags: 1, lastPing: '4s ago', heartbeat: 'healthy', color: 'green' },
  { id: 'STU008', name: 'Blessing Okafor', exam: 'SS1 Computer Science', status: 'active', riskScore: 40, flags: 2, lastPing: '6s ago', heartbeat: 'healthy', color: 'blue' },
];

const flagTypeColors: Record<string, string> = {
  tab_switch: 'bg-amber-100 text-amber-800',
  fullscreen_exit: 'bg-orange-100 text-orange-800',
  devtools_open: 'bg-red-100 text-red-800',
  copy_paste: 'bg-purple-100 text-purple-800',
  rapid_answering: 'bg-blue-100 text-blue-800',
  ip_change: 'bg-pink-100 text-pink-800',
  camera_blocked: 'bg-rose-100 text-rose-800',
};

const severityColors: Record<number, string> = {
  1: 'bg-green-100 text-green-800',
  2: 'bg-amber-100 text-amber-800',
  3: 'bg-orange-100 text-orange-800',
  4: 'bg-red-100 text-red-800',
  5: 'bg-rose-100 text-rose-800',
};

const heartbeatColors: Record<string, string> = {
  healthy: 'bg-green-500',
  warning: 'bg-amber-500',
  critical: 'bg-red-500',
  inactive: 'bg-slate-300',
};

const riskScoreColors: Record<string, { bg: string; text: string; bar: string }> = {
  LOW: { bg: 'bg-green-50', text: 'text-green-700', bar: 'bg-green-500' },
  MODERATE: { bg: 'bg-amber-50', text: 'text-amber-700', bar: 'bg-amber-500' },
  HIGH: { bg: 'bg-orange-50', text: 'text-orange-700', bar: 'bg-orange-500' },
  CRITICAL: { bg: 'bg-red-50', text: 'text-red-700', bar: 'bg-red-500' },
};

function getRiskLevel(score: number) {
  if (score >= 80) return 'CRITICAL';
  if (score >= 60) return 'HIGH';
  if (score >= 40) return 'MODERATE';
  return 'LOW';
}

export default function CBTSecurityPage() {
  const [selectedFlag, setSelectedFlag] = useState<typeof mockSecurityFlags[0] | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const activeSessions = mockStudentSessions.filter(s => s.status === 'active');
  const totalFlags = mockSecurityFlags.filter(f => f.status === 'active').length;
  const criticalStudents = mockStudentSessions.filter(s => getRiskLevel(s.riskScore) === 'CRITICAL').length;
  const avgRiskScore = Math.round(mockStudentSessions.reduce((sum, s) => sum + s.riskScore, 0) / mockStudentSessions.length);

  const flagColumns = [
    {
      key: 'student',
      header: 'Student',
      render: (row: typeof mockSecurityFlags[0]) => (
        <div>
          <div className="font-semibold text-slate-900">{row.student}</div>
          <div className="text-xs text-slate-500">{row.studentId}</div>
        </div>
      ),
    },
    { key: 'exam', header: 'Exam', render: (row: typeof mockSecurityFlags[0]) => <span className="text-slate-600">{row.exam}</span> },
    { 
      key: 'flagType', 
      header: 'Flag', 
      render: (row: typeof mockSecurityFlags[0]) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${flagTypeColors[row.flagType] || 'bg-slate-100 text-slate-800'}`}>
          {row.flagType.replace('_', ' ')}
        </span>
      )
    },
    { 
      key: 'severity', 
      header: 'Severity', 
      render: (row: typeof mockSecurityFlags[0]) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${severityColors[row.severity] ? severityColors[row.severity].replace('text-', 'bg-').replace('-100', '-500') : 'bg-slate-400'}`}
              style={{ width: `${(row.severity / 5) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-slate-700">{row.severity}/5</span>
        </div>
      )
    },
    { key: 'time', header: 'Time', render: (row: typeof mockSecurityFlags[0]) => <span className="text-slate-500 text-sm">{row.time}</span> },
    { 
      key: 'status', 
      header: 'Status', 
      render: (row: typeof mockSecurityFlags[0]) => (
        <Badge variant={row.status === 'active' ? 'red' : 'green'} dot>
          {row.status}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: '',
      className: 'w-32',
      render: (row: typeof mockSecurityFlags[0]) => (
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <button 
            className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 rounded-lg hover:bg-slate-100"
            onClick={() => setSelectedFlag(row)}
          >
            Details
          </button>
          <button 
            className="px-2.5 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100"
            onClick={() => setToast({ message: `Force submitted ${row.student}'s exam`, type: 'success' })}
          >
            Force Submit
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="CBT Security & Proctor Mode"
        subtitle="Real-time exam monitoring and anti-cheat system"
        icon="🛡️"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'CBT', href: '/dashboard/cbt' },
          { label: 'Security' },
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="secondary">Export Report</Button>
            <Button className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white">
              Lock All Exams
            </Button>
          </div>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 p-5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-600" />
          <StatCard title="Active Sessions" value={activeSessions.length.toString()} icon="👥" color="blue" />
        </div>
        <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 p-5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600" />
          <StatCard title="Active Flags" value={totalFlags.toString()} change="+3" changeType="negative" icon="⚠️" color="amber" />
        </div>
        <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 p-5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-600" />
          <StatCard title="Critical Students" value={criticalStudents.toString()} icon="🚨" color="red" />
        </div>
        <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 p-5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-600" />
          <StatCard title="Avg Risk Score" value={`${avgRiskScore}%`} icon="📊" color="violet" />
        </div>
      </div>

      {/* Real-time Monitoring Grid */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Live Student Monitoring</h3>
              <p className="text-sm text-slate-500">{activeSessions.length} active sessions • Real-time heartbeats</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Healthy
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Warning
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-red-500" /> Critical
              </span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockStudentSessions.map((student) => {
              const riskLevel = getRiskLevel(student.riskScore);
              const colors = riskScoreColors[riskLevel];
              return (
                <div
                  key={student.id}
                  className={`relative p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                    riskLevel === 'CRITICAL' ? 'border-red-300 bg-red-50/50' :
                    riskLevel === 'HIGH' ? 'border-orange-300 bg-orange-50/50' :
                    riskLevel === 'MODERATE' ? 'border-amber-300 bg-amber-50/50' :
                    'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                          {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${heartbeatColors[student.heartbeat]}`} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{student.name}</div>
                        <div className="text-xs text-slate-500">{student.id}</div>
                      </div>
                    </div>
                    <Badge variant={riskLevel === 'CRITICAL' ? 'red' : riskLevel === 'HIGH' ? 'amber' : riskLevel === 'MODERATE' ? 'amber' : 'green'} dot>
                      {student.status}
                    </Badge>
                  </div>
                  
                  <div className="text-xs text-slate-500 mb-2">{student.exam}</div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500">Risk Score</span>
                      <span className={`font-semibold ${colors.text}`}>{student.riskScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${colors.bar}`}
                        style={{ width: `${student.riskScore}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Flags: <span className="font-semibold text-slate-700">{student.flags}</span></span>
                    <span className="text-slate-500">Ping: <span className={`font-semibold ${student.heartbeat === 'critical' ? 'text-red-600' : 'text-slate-700'}`}>{student.lastPing}</span></span>
                  </div>
                  
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                      View
                    </button>
                    <button 
                      className="flex-1 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                      onClick={() => setToast({ message: `Force submitted ${student.name}'s exam`, type: 'success' })}
                    >
                      Force Submit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Security Flags Table */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-600" />
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Security Flags</h3>
              <p className="text-sm text-slate-500">All detected suspicious activities</p>
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Flags</option>
                <option>Tab Switch</option>
                <option>Fullscreen Exit</option>
                <option>DevTools Open</option>
                <option>Copy Paste</option>
                <option>Camera Blocked</option>
              </select>
              <select className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Status</option>
                <option>Active</option>
                <option>Resolved</option>
              </select>
            </div>
          </div>
        </div>
        <Table columns={flagColumns} data={mockSecurityFlags as unknown as Record<string, unknown>[]} rowKey="id" emptyIcon="🛡️" />
      </div>

      {/* Risk Score Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 p-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
          <h3 className="text-base font-bold text-slate-900 mb-4">Risk Score Distribution</h3>
          <div className="space-y-3">
            {Object.entries(riskScoreColors).map(([level, colors]) => {
              const count = mockStudentSessions.filter(s => getRiskLevel(s.riskScore) === level).length;
              const percentage = Math.round((count / mockStudentSessions.length) * 100);
              return (
                <div key={level}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{level}</span>
                    <span className="text-slate-500">{count} students ({percentage}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${colors.bar} transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 p-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600" />
          <h3 className="text-base font-bold text-slate-900 mb-4">Flag Types</h3>
          <div className="space-y-3">
            {Object.entries(flagTypeColors).map(([type, color]) => {
              const count = mockSecurityFlags.filter(f => f.flagType === type).length;
              return (
                <div key={type} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
                      {type.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-slate-900">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 p-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-600" />
          <h3 className="text-base font-bold text-slate-900 mb-4">Heartbeat Status</h3>
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="8" 
                  strokeDasharray={`${(6 / 8) * 251.2} 251.2`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-900">75%</span>
                <span className="text-xs text-slate-500">Healthy</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-green-50">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-slate-700">Healthy</span>
              </div>
              <span className="text-sm font-bold text-green-700">6</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm font-medium text-slate-700">Warning</span>
              </div>
              <span className="text-sm font-bold text-amber-700">1</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-red-50">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm font-medium text-slate-700">Critical</span>
              </div>
              <span className="text-sm font-bold text-red-700">1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flag Details Modal */}
      <Modal
        open={!!selectedFlag}
        onClose={() => setSelectedFlag(null)}
        title="Security Flag Details"
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setSelectedFlag(null)}>Close</Button>
            <Button 
              className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white"
              onClick={() => {
                setToast({ message: `Force submitted ${selectedFlag?.student}'s exam`, type: 'success' });
                setSelectedFlag(null);
              }}
            >
              Force Submit Exam
            </Button>
          </>
        }
      >
        {selectedFlag && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-500">Student</label>
                <p className="text-slate-900 font-semibold">{selectedFlag.student}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500">Student ID</label>
                <p className="text-slate-900">{selectedFlag.studentId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500">Exam</label>
                <p className="text-slate-900">{selectedFlag.exam}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500">Time</label>
                <p className="text-slate-900">{selectedFlag.time}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-500">Flag Type</label>
              <div className="mt-1">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${flagTypeColors[selectedFlag.flagType]}`}>
                  {selectedFlag.flagType.replace('_', ' ')}
                </span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-500">Severity Level</label>
              <div className="mt-2">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full"
                      style={{ width: `${(selectedFlag.severity / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{selectedFlag.severity}/5</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedFlag.severity >= 4 ? 'High severity - immediate action recommended' :
                   selectedFlag.severity >= 2 ? 'Medium severity - monitor closely' :
                   'Low severity - record for pattern analysis'}
                </p>
              </div>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-start gap-3">
                <span className="text-amber-500 text-lg">⚠️</span>
                <div>
                  <h4 className="text-sm font-semibold text-amber-800">Risk Assessment</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    This flag contributes to the student&apos;s overall risk score. Multiple flags of this type may indicate systematic cheating behavior.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}