'use client';

import { useState } from 'react';
import { PageHeader, Badge, Table, Button, StatCard } from '@/components/ui';
import { Timeline } from '@/components/charts';
import { Modal, FormInput, FormSelect, Toast } from '@/components/interactive';

const mockParents = [
  { id: 'P001', name: 'Mr. Okonkwo Emeka', email: 'okonkwo@email.com', phone: '+234 801 234 5678', children: ['Emeka Okonkwo (SS2A)'], campus: 'Main Campus', lastContact: '2 hours ago' },
  { id: 'P002', name: 'Mrs. Bello Fatima', email: 'bello.f@email.com', phone: '+234 802 345 6789', children: ['Aisha Bello (JSS1B)'], campus: 'Main Campus', lastContact: '1 day ago' },
  { id: 'P003', name: 'Mr. Williams Tunde', email: 'twilliams@email.com', phone: '+234 803 456 7890', children: ['Tunde Williams Jr (SS3A)'], campus: 'North Campus', lastContact: '3 days ago' },
  { id: 'P004', name: 'Dr. Nwosu Chioma', email: 'dr.nwosu@email.com', phone: '+234 804 567 8901', children: ['Chioma Nwosu (JSS3A)'], campus: 'Main Campus', lastContact: '5 hours ago' },
  { id: 'P005', name: 'Mr. Abdullahi Yusuf', email: 'abdullahi.y@email.com', phone: '+234 805 678 9012', children: ['Yusuf Abdullahi (SS1B)'], campus: 'South Campus', lastContact: '2 days ago' },
];

const recentMessages = [
  { icon: '💬', title: 'Fee reminder sent to 42 parents', description: 'Term 2 fee deadline: June 30', time: '1 hour ago', color: 'blue' as const },
  { icon: '📊', title: 'Progress reports distributed', description: 'Second term report cards', time: '3 hours ago', color: 'green' as const },
  { icon: '⚠️', title: 'Attendance alert sent', description: 'Absence notification to Mr. Eze', time: '5 hours ago', color: 'amber' as const },
  { icon: '🤖', title: 'AI generated 12 messages', description: 'Parent communication agent', time: '1 day ago', color: 'violet' as const },
];

export default function ParentsPage() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const columns = [
    { key: 'name', header: 'Parent', render: (row: typeof mockParents[0]) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">{row.name.split(' ').filter(n => !['Mr.', 'Mrs.', 'Dr.'].includes(n)).map(n => n[0]).join('').slice(0,2)}</div>
        <div><div className="font-semibold text-slate-900">{row.name}</div><div className="text-xs text-slate-500">{row.email}</div></div>
      </div>
    )},
    { key: 'phone', header: 'Phone', render: (row: typeof mockParents[0]) => <span className="text-slate-600">{row.phone}</span> },
    { key: 'children', header: 'Children', render: (row: typeof mockParents[0]) => <div>{row.children.map((c, i) => <Badge key={i} variant="blue">{c}</Badge>)}</div> },
    { key: 'campus', header: 'Campus', render: (row: typeof mockParents[0]) => <span className="text-slate-600">{row.campus}</span> },
    { key: 'lastContact', header: 'Last Contact', render: (row: typeof mockParents[0]) => <span className="text-slate-500 text-sm">{row.lastContact}</span> },
    { key: 'actions', header: '', className: 'w-24', render: () => <div className="flex gap-1" onClick={e => e.stopPropagation()}><button className="px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100">Message</button></div> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Parents" subtitle="Parent communication and engagement hub" icon="👨‍👩‍👧" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Parents' }]} actions={<Button onClick={() => setShowMessage(true)}>+ Send Message</Button>} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Parents" value="1,923" change="+8%" changeType="positive" icon="👨‍👩‍👧" color="blue" />
        <StatCard title="Messages Sent" value="456" change="+23%" changeType="positive" icon="📨" color="green" />
        <StatCard title="Unread" value="12" icon="📬" color="amber" />
        <StatCard title="AI Messages" value="89" change="+45%" changeType="positive" icon="🤖" color="violet" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-base font-bold text-slate-900">Parents Directory</h3></div>
          <Table columns={columns} data={mockParents as unknown as Record<string, unknown>[]} rowKey="id" emptyIcon="👨‍👩‍👧" />
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-5">Recent Communications</h3>
          <Timeline items={recentMessages} />
        </div>
      </div>

      <Modal open={showMessage} onClose={() => setShowMessage(false)} title="Send Parent Message" size="lg" footer={<><Button variant="secondary" onClick={() => setShowMessage(false)}>Cancel</Button><Button onClick={() => { setShowMessage(false); setToast({ message: 'Message sent', type: 'success' }); }}>Send Message</Button></>}>
        <div className="space-y-4">
          <FormSelect label="Recipient" options={mockParents.map(p => ({ value: p.id, label: p.name }))} required />
          <FormSelect label="Channel" options={[{ value: 'email', label: 'Email' }, { value: 'sms', label: 'SMS' }, { value: 'whatsapp', label: 'WhatsApp' }, { value: 'in_app', label: 'In-App' }]} required />
          <FormSelect label="Template" options={[{ value: 'fee', label: 'Fee Reminder' }, { value: 'attendance', label: 'Attendance Alert' }, { value: 'progress', label: 'Progress Report' }, { value: 'meeting', label: 'Meeting Invite' }, { value: 'custom', label: 'Custom Message' }]} />
          <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label><textarea rows={4} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" placeholder="Type your message..." /></div>
        </div>
      </Modal>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
