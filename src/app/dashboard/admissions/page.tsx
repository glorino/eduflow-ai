'use client';

import { useState } from 'react';
import { PageHeader, Badge, Table, Button, StatCard, EmptyState } from '@/components/ui';
import { Modal, FormInput, FormSelect, ConfirmDialog, Toast } from '@/components/interactive';

const mockApplications = [
  { id: '1', name: 'Emeka Okonkwo', class: 'SS1', campus: 'Main Campus', date: '2026-06-01', status: 'APPLIED', score: 85, parent: 'Mr. Okonkwo' },
  { id: '2', name: 'Aisha Bello', class: 'JSS2', campus: 'Main Campus', date: '2026-06-02', status: 'APPLIED', score: 92, parent: 'Mrs. Bello' },
  { id: '3', name: 'Tunde Williams', class: 'SS2', campus: 'North Campus', date: '2026-06-03', status: 'APPROVED', score: 78, parent: 'Mr. Williams' },
  { id: '4', name: 'Ngozi Eze', class: 'JSS1', campus: 'Main Campus', date: '2026-06-03', status: 'REJECTED', score: 45, parent: 'Mrs. Eze' },
  { id: '5', name: 'Yusuf Abdullahi', class: 'SS3', campus: 'South Campus', date: '2026-06-04', status: 'APPLIED', score: 88, parent: 'Mr. Abdullahi' },
  { id: '6', name: 'Chioma Nwosu', class: 'JSS3', campus: 'Main Campus', date: '2026-06-05', status: 'APPROVED', score: 91, parent: 'Dr. Nwosu' },
  { id: '7', name: 'Kemi Adeyemi', class: 'SS1', campus: 'North Campus', date: '2026-06-05', status: 'APPLIED', score: 76, parent: 'Mrs. Adeyemi' },
  { id: '8', name: 'Femi Okafor', class: 'JSS2', campus: 'Main Campus', date: '2026-06-06', status: 'APPLIED', score: 83, parent: 'Mr. Okafor' },
];

const statusColors: Record<string, 'amber' | 'green' | 'red'> = {
  APPLIED: 'amber',
  APPROVED: 'green',
  REJECTED: 'red',
};

export default function AdmissionsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [showNewApplication, setShowNewApplication] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ id: string; action: string } | null>(null);

  const filteredApps = activeTab === 'all'
    ? mockApplications
    : mockApplications.filter(a => a.status === activeTab);

  const columns = [
    {
      key: 'name',
      header: 'Applicant',
      render: (row: typeof mockApplications[0]) => (
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
    { key: 'class', header: 'Class', render: (row: typeof mockApplications[0]) => <span className="font-medium">{row.class}</span> },
    { key: 'campus', header: 'Campus', render: (row: typeof mockApplications[0]) => <span className="text-slate-600">{row.campus}</span> },
    {
      key: 'score',
      header: 'AI Score',
      render: (row: typeof mockApplications[0]) => (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
            {row.score}
          </div>
          <span className="text-xs text-slate-500">/ 100</span>
        </div>
      ),
    },
    { key: 'date', header: 'Date', render: (row: typeof mockApplications[0]) => <span className="text-slate-600">{row.date}</span> },
    {
      key: 'status',
      header: 'Status',
      render: (row: typeof mockApplications[0]) => (
        <Badge variant={statusColors[row.status]} dot>
          {row.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'w-24',
      render: (row: typeof mockApplications[0]) => (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {row.status === 'APPLIED' && (
            <>
              <button
                onClick={() => setConfirmAction({ id: row.id, action: 'approve' })}
                className="px-2.5 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => setConfirmAction({ id: row.id, action: 'reject' })}
                className="px-2.5 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
              >
                Reject
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admissions"
        subtitle="AI-powered application review and scoring"
        icon="📝"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Admissions' },
        ]}
        actions={
          <Button onClick={() => setShowNewApplication(true)}>
            + New Application
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Pending Review" value={42} change="-8%" changeType="negative" icon="📋" color="amber" />
        <StatCard title="Approved" value={156} change="+15%" changeType="positive" icon="✅" color="green" />
        <StatCard title="Rejected" value={23} change="+2%" changeType="positive" icon="❌" color="rose" />
        <StatCard title="AI Accuracy" value="94.2%" change="+1.3%" changeType="positive" icon="🤖" color="blue" />
      </div>

      {/* Tabs & Filters */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
          {[
            { id: 'all', label: 'All', count: mockApplications.length },
            { id: 'APPLIED', label: 'Pending', count: mockApplications.filter(a => a.status === 'APPLIED').length },
            { id: 'APPROVED', label: 'Approved', count: mockApplications.filter(a => a.status === 'APPROVED').length },
            { id: 'REJECTED', label: 'Rejected', count: mockApplications.filter(a => a.status === 'REJECTED').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs text-slate-400">({tab.count})</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {selectedRows.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">{selectedRows.size} selected</span>
              <Button size="sm" variant="success">Bulk Approve</Button>
              <Button size="sm" variant="danger">Bulk Reject</Button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        <Table
          columns={columns}
          data={filteredApps as unknown as Record<string, unknown>[]}
          rowKey="id"
          selectedRows={selectedRows}
          onToggleRow={(id) => {
            const next = new Set(selectedRows);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            setSelectedRows(next);
          }}
          emptyMessage="No applications found"
          emptyIcon="📝"
        />
      </div>

      {/* New Application Modal */}
      <Modal
        open={showNewApplication}
        onClose={() => setShowNewApplication(false)}
        title="New Admission Application"
        description="Submit a new student application for AI review"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowNewApplication(false)}>Cancel</Button>
            <Button onClick={() => { setShowNewApplication(false); setToast({ message: 'Application submitted for AI review', type: 'success' }); }}>
              Submit Application
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput label="Student Name" placeholder="Enter full name" required />
          <FormSelect label="Campus" options={[{ value: 'main', label: 'Main Campus' }, { value: 'north', label: 'North Campus' }, { value: 'south', label: 'South Campus' }]} required />
          <FormSelect label="Class Applying For" options={[{ value: 'jss1', label: 'JSS1' }, { value: 'jss2', label: 'JSS2' }, { value: 'jss3', label: 'JSS3' }, { value: 'ss1', label: 'SS1' }, { value: 'ss2', label: 'SS2' }, { value: 'ss3', label: 'SS3' }]} required />
          <FormInput label="Date of Birth" type="date" required />
          <FormInput label="Parent/Guardian Name" placeholder="Enter parent name" required />
          <FormInput label="Parent Email" type="email" placeholder="parent@email.com" required />
          <FormInput label="Parent Phone" type="tel" placeholder="+234 XXX XXX XXXX" required />
          <FormSelect label="Gender" options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} required />
          <div className="md:col-span-2">
            <FormInput label="Previous School" placeholder="Enter previous school name" />
          </div>
        </div>
      </Modal>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => {
          setToast({
            message: confirmAction?.action === 'approve' ? 'Application approved' : 'Application rejected',
            type: confirmAction?.action === 'approve' ? 'success' : 'error',
          });
          setConfirmAction(null);
        }}
        title={confirmAction?.action === 'approve' ? 'Approve Application?' : 'Reject Application?'}
        message={confirmAction?.action === 'approve' ? 'The student will be enrolled and a notification sent to the parent.' : 'This application will be rejected and the parent notified.'}
        confirmLabel={confirmAction?.action === 'approve' ? 'Approve' : 'Reject'}
        variant={confirmAction?.action === 'approve' ? 'info' : 'danger'}
      />

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
