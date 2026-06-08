'use client';

import { useState } from 'react';
import { PageHeader, Badge, Table, Button, StatCard, ProgressBar } from '@/components/ui';
import { BarChart, DonutChart, MetricCard } from '@/components/charts';
import { Modal, FormInput, FormSelect, Toast } from '@/components/interactive';

const mockPayments = [
  { id: 'PAY001', student: 'Emeka Okonkwo', class: 'SS2A', amount: 125000, paid: 125000, status: 'COMPLETED', date: '2026-06-01', method: 'Bank Transfer' },
  { id: 'PAY002', student: 'Aisha Bello', class: 'JSS1B', amount: 95000, paid: 50000, status: 'PARTIAL', date: '2026-06-02', method: 'Card' },
  { id: 'PAY003', student: 'Tunde Williams', class: 'SS3A', amount: 125000, paid: 125000, status: 'COMPLETED', date: '2026-06-02', method: 'Bank Transfer' },
  { id: 'PAY004', student: 'Ngozi Eze', class: 'JSS2A', amount: 95000, paid: 0, status: 'PENDING', date: '2026-06-03', method: '-' },
  { id: 'PAY005', student: 'Yusuf Abdullahi', class: 'SS1B', amount: 125000, paid: 125000, status: 'COMPLETED', date: '2026-06-04', method: 'USSD' },
  { id: 'PAY006', student: 'Chioma Nwosu', class: 'JSS3A', amount: 95000, paid: 95000, status: 'COMPLETED', date: '2026-06-05', method: 'Bank Transfer' },
  { id: 'PAY007', student: 'Kemi Adeyemi', class: 'SS2B', amount: 125000, paid: 30000, status: 'PARTIAL', date: '2026-06-05', method: 'Cash' },
  { id: 'PAY008', student: 'Femi Okafor', class: 'JSS1A', amount: 95000, paid: 0, status: 'OVERDUE', date: '2026-05-15', method: '-' },
];

const statusColors: Record<string, 'green' | 'amber' | 'red' | 'slate'> = {
  COMPLETED: 'green',
  PARTIAL: 'amber',
  PENDING: 'slate',
  OVERDUE: 'red',
};

const fmt = (n: number) => `₦${n.toLocaleString()}`;

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState('all');
  const [showNewPayment, setShowNewPayment] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const filtered = activeTab === 'all'
    ? mockPayments
    : mockPayments.filter(p => p.status === activeTab);

  const totalExpected = mockPayments.reduce((s, p) => s + p.amount, 0);
  const totalCollected = mockPayments.reduce((s, p) => s + p.paid, 0);
  const collectionRate = totalExpected > 0 ? Math.round((totalCollected / totalExpected) * 100) : 0;

  const columns = [
    {
      key: 'id',
      header: 'Invoice',
      render: (row: typeof mockPayments[0]) => <span className="font-mono text-xs text-slate-500">{row.id}</span>,
    },
    {
      key: 'student',
      header: 'Student',
      render: (row: typeof mockPayments[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
            {row.student.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-semibold text-slate-900">{row.student}</div>
            <div className="text-xs text-slate-500">{row.class}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (row: typeof mockPayments[0]) => <span className="font-semibold text-slate-900">{fmt(row.amount)}</span>,
    },
    {
      key: 'paid',
      header: 'Paid',
      render: (row: typeof mockPayments[0]) => <span className={row.paid === row.amount ? 'text-emerald-600 font-semibold' : 'text-slate-600'}>{fmt(row.paid)}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: typeof mockPayments[0]) => <Badge variant={statusColors[row.status]} dot>{row.status}</Badge>,
    },
    { key: 'date', header: 'Date', render: (row: typeof mockPayments[0]) => <span className="text-slate-600">{row.date}</span> },
    { key: 'method', header: 'Method', render: (row: typeof mockPayments[0]) => <span className="text-slate-500 text-sm">{row.method}</span> },
    {
      key: 'actions',
      header: '',
      className: 'w-20',
      render: (row: typeof mockPayments[0]) => (
        <button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          Receipt
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Finance"
        subtitle="Fee management, invoicing, and collections"
        icon="💰"
        breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Finance' }]}
        actions={<Button onClick={() => setShowNewPayment(true)}>+ New Invoice</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Expected" value={fmt(totalExpected)} icon="💰" color="blue" subtitle="This term" />
        <StatCard title="Collected" value={fmt(totalCollected)} change={`+${collectionRate}%`} changeType="positive" icon="✅" color="green" />
        <StatCard title="Outstanding" value={fmt(totalExpected - totalCollected)} change="-15.2%" changeType="negative" icon="⏳" color="amber" />
        <StatCard title="Overdue" value={fmt(95000)} icon="🚨" color="rose" subtitle="1 invoice" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-1">Monthly Collections</h3>
          <p className="text-sm text-slate-500 mb-6">Fee collection trend</p>
          <BarChart
            data={[
              { label: 'Jan', value: 4200000, color: '#3b82f6' },
              { label: 'Feb', value: 3800000, color: '#3b82f6' },
              { label: 'Mar', value: 5100000, color: '#3b82f6' },
              { label: 'Apr', value: 4600000, color: '#3b82f6' },
              { label: 'May', value: 5400000, color: '#3b82f6' },
              { label: 'Jun', value: 3200000, color: '#059669' },
            ]}
            height={180}
            showValues={false}
          />
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-1">Collection Status</h3>
          <p className="text-sm text-slate-500 mb-6">Payment distribution</p>
          <div className="flex justify-center">
            <DonutChart
              value={collectionRate}
              size={150}
              strokeWidth={14}
              color="#059669"
              label={`${collectionRate}%`}
              sublabel="Collected"
            />
          </div>
          <div className="space-y-2 mt-6">
            {[
              { label: 'Completed', count: 4, color: 'bg-emerald-500' },
              { label: 'Partial', count: 2, color: 'bg-amber-500' },
              { label: 'Pending', count: 1, color: 'bg-slate-400' },
              { label: 'Overdue', count: 1, color: 'bg-rose-500' },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                  <span className="text-slate-600">{s.label}</span>
                </div>
                <span className="font-semibold text-slate-900">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard title="Avg Payment" value="₦98,750" sparklineData={[85, 92, 88, 95, 91, 99, 98]} change="+5% vs last term" changeType="positive" color="#3b82f6" />
        <MetricCard title="Payment Rate" value="87%" sparklineData={[80, 82, 85, 83, 88, 86, 87]} change="+3% vs last term" changeType="positive" color="#059669" />
        <MetricCard title="Refunds" value="₦45,000" sparklineData={[60, 30, 45, 20, 35, 50, 45]} change="-12% vs last term" changeType="negative" color="#e11d48" />
        <MetricCard title="Late Fees" value="₦12,500" sparklineData={[15, 10, 8, 12, 9, 11, 12]} change="+2% vs last term" changeType="positive" color="#d97706" />
      </div>

      {/* Tabs & Table */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
          {[
            { id: 'all', label: 'All' },
            { id: 'COMPLETED', label: 'Completed' },
            { id: 'PARTIAL', label: 'Partial' },
            { id: 'PENDING', label: 'Pending' },
            { id: 'OVERDUE', label: 'Overdue' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
        <Table columns={columns} data={filtered as unknown as Record<string, unknown>[]} rowKey="id" emptyMessage="No payments found" emptyIcon="💰" />
      </div>

      {/* New Invoice Modal */}
      <Modal
        open={showNewPayment}
        onClose={() => setShowNewPayment(false)}
        title="Create Invoice"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowNewPayment(false)}>Cancel</Button>
            <Button onClick={() => { setShowNewPayment(false); setToast({ message: 'Invoice created successfully', type: 'success' }); }}>Create Invoice</Button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput label="Student ID" placeholder="STU001" required />
          <FormSelect label="Fee Type" options={[{ value: 'tuition', label: 'Tuition' }, { value: 'boarding', label: 'Boarding' }, { value: 'uniform', label: 'Uniform' }, { value: 'exam', label: 'Exam Fee' }]} required />
          <FormInput label="Amount" type="number" placeholder="₦0.00" required />
          <FormSelect label="Term" options={[{ value: 'term1', label: 'Term 1' }, { value: 'term2', label: 'Term 2' }, { value: 'term3', label: 'Term 3' }]} required />
          <FormInput label="Due Date" type="date" required />
          <FormSelect label="Campus" options={[{ value: 'main', label: 'Main Campus' }, { value: 'north', label: 'North Campus' }, { value: 'south', label: 'South Campus' }]} required />
        </div>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
