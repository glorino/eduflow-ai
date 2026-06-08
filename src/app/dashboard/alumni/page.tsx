'use client';

import { useState } from 'react';
import { PageHeader, Badge, Table, Button, StatCard } from '@/components/ui';
import { Toast } from '@/components/interactive';

const mockAlumni = [
  { id: 'AL001', name: 'Adaeze Okolo', graduationYear: 2023, department: 'Science', currentLevel: 'University', occupation: 'Medical Student — UNILAG', verified: true },
  { id: 'AL002', name: 'Babatunde Rhodes', graduationYear: 2022, department: 'Arts', currentLevel: 'University', occupation: 'Law Student — OAU', verified: true },
  { id: 'AL003', name: 'Chidinma Okeke', graduationYear: 2024, department: 'Commercial', currentLevel: 'University', occupation: 'Economics — ABU', verified: true },
  { id: 'AL004', name: 'Daniel Fashola', graduationYear: 2021, department: 'Science', currentLevel: 'Working', occupation: 'Software Engineer — Andela', verified: true },
  { id: 'AL005', name: 'Esther Akinwale', graduationYear: 2023, department: 'ICT', currentLevel: 'University', occupation: 'CS Student — FUTA', verified: false },
  { id: 'AL006', name: 'Folarin Coker', graduationYear: 2020, department: 'Science', currentLevel: 'Working', occupation: 'Data Scientist — Flutterwave', verified: true },
];

const waecPending = [
  { name: 'Chidi Eze', year: 2024, status: 'Pending' },
  { name: 'Fatima Bello', year: 2024, status: 'Processing' },
  { name: 'George Nnamdi', year: 2024, status: 'Pending' },
];

export default function AlumniPage() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const columns = [
    { key: 'name', header: 'Alumni', render: (row: typeof mockAlumni[0]) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">{row.name.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
        <div><div className="font-semibold text-slate-900">{row.name}</div><div className="text-xs text-slate-500">Class of {row.graduationYear}</div></div>
      </div>
    )},
    { key: 'department', header: 'Department', render: (row: typeof mockAlumni[0]) => <Badge variant="blue">{row.department}</Badge> },
    { key: 'currentLevel', header: 'Status', render: (row: typeof mockAlumni[0]) => <Badge variant={row.currentLevel === 'University' ? 'green' : 'violet'}>{row.currentLevel}</Badge> },
    { key: 'occupation', header: 'Current', render: (row: typeof mockAlumni[0]) => <span className="text-slate-600">{row.occupation}</span> },
    { key: 'verified', header: 'WAEC', render: (row: typeof mockAlumni[0]) => <Badge variant={row.verified ? 'green' : 'amber'} dot>{row.verified ? 'Verified' : 'Pending'}</Badge> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Alumni" subtitle="Alumni network and WAEC migration tracking" icon="🏛️" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Alumni' }]} actions={<Button>Export Alumni Data</Button>} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Alumni" value={mockAlumni.length * 50} change="+120" changeType="positive" icon="🏛️" color="blue" />
        <StatCard title="In University" value={mockAlumni.filter(a => a.currentLevel === 'University').length * 30} icon="🎓" color="green" />
        <StatCard title="WAEC Verified" value={mockAlumni.filter(a => a.verified).length * 40} icon="✅" color="violet" />
        <StatCard title="Pending Migration" value={waecPending.length} icon="⏳" color="amber" />
      </div>

      {/* WAEC Migration Queue */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
        <div className="flex items-center justify-between mb-5">
          <div><h3 className="text-base font-bold text-slate-900">WAEC Migration Queue</h3><p className="text-sm text-slate-500 mt-0.5">Students awaiting result migration</p></div>
          <Button size="sm" onClick={() => setToast({ message: 'WAEC migration started for 3 students', type: 'success' })}>Process All</Button>
        </div>
        <div className="space-y-3">
          {waecPending.map((w, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold">{w.name.split(' ').map(n => n[0]).join('')}</div>
                <div><div className="font-semibold text-slate-900">{w.name}</div><div className="text-xs text-slate-500">Graduated {w.year}</div></div>
              </div>
              <Badge variant={w.status === 'Processing' ? 'amber' : 'slate'} dot>{w.status}</Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-base font-bold text-slate-900">Alumni Directory</h3></div>
        <Table columns={columns} data={mockAlumni as unknown as Record<string, unknown>[]} rowKey="id" emptyIcon="🏛️" />
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
