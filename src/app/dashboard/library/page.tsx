'use client';

import { useState } from 'react';
import { PageHeader, Badge, Table, Button, StatCard } from '@/components/ui';
import { BarChart, MetricCard } from '@/components/charts';
import { Modal, FormInput, FormSelect, Toast } from '@/components/interactive';

const mockBooks = [
  { id: 'BK001', title: 'Mathematics for WAEC', author: 'J.O. Adesina', category: 'Textbook', copies: 15, available: 12, status: 'Available' },
  { id: 'BK002', title: 'English Grammar & Composition', author: 'A. Banjo', category: 'Textbook', copies: 20, available: 18, status: 'Available' },
  { id: 'BK003', title: 'Chemistry: A Modern Approach', author: 'I.C. Onwuka', category: 'Textbook', copies: 10, available: 8, status: 'Available' },
  { id: 'BK004', title: 'Things Fall Apart', author: 'Chinua Achebe', category: 'Literature', copies: 12, available: 10, status: 'Available' },
  { id: 'BK005', title: 'Physics Made Easy', author: 'F.N. First', category: 'Textbook', copies: 8, available: 0, status: 'All Borrowed' },
  { id: 'BK006', title: 'African Short Stories', author: 'Various', category: 'Literature', copies: 6, available: 5, status: 'Available' },
  { id: 'BK007', title: 'Computer Science for JSS', author: 'M.A. Ogunsola', category: 'Textbook', copies: 14, available: 13, status: 'Available' },
  { id: 'BK008', title: 'Economics for Senior Students', author: 'A.O. Oyebade', category: 'Textbook', copies: 9, available: 7, status: 'Available' },
];

const mockTransactions = [
  { id: 'TX001', student: 'Emeka Okonkwo', book: 'Mathematics for WAEC', borrowed: '2026-05-20', due: '2026-06-03', returned: null, status: 'Overdue', penalty: 2500 },
  { id: 'TX002', student: 'Aisha Bello', book: 'Things Fall Apart', borrowed: '2026-06-01', due: '2026-06-15', returned: '2026-06-06', status: 'Returned', penalty: 0 },
  { id: 'TX003', student: 'Tunde Williams', book: 'Chemistry: A Modern Approach', borrowed: '2026-06-03', due: '2026-06-17', returned: null, status: 'Active', penalty: 0 },
  { id: 'TX004', student: 'Ngozi Eze', book: 'Physics Made Easy', borrowed: '2026-05-15', due: '2026-05-29', returned: null, status: 'Overdue', penalty: 5000 },
  { id: 'TX005', student: 'Yusuf Abdullahi', book: 'English Grammar & Composition', borrowed: '2026-06-05', due: '2026-06-19', returned: null, status: 'Active', penalty: 0 },
];

const statusColors: Record<string, 'green' | 'red' | 'blue' | 'amber'> = {
  Returned: 'green',
  Overdue: 'red',
  Active: 'blue',
  Available: 'green',
  'All Borrowed': 'amber',
};

const fmt = (n: number) => `₦${n.toLocaleString()}`;

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState('books');
  const [showAddBook, setShowAddBook] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const bookColumns = [
    {
      key: 'title',
      header: 'Book',
      render: (row: typeof mockBooks[0]) => (
        <div>
          <div className="font-semibold text-slate-900">{row.title}</div>
          <div className="text-xs text-slate-500">{row.author}</div>
        </div>
      ),
    },
    { key: 'category', header: 'Category', render: (row: typeof mockBooks[0]) => <Badge variant="blue">{row.category}</Badge> },
    { key: 'copies', header: 'Copies', render: (row: typeof mockBooks[0]) => <span className="font-semibold">{row.copies}</span> },
    { key: 'available', header: 'Available', render: (row: typeof mockBooks[0]) => <span className={`font-semibold ${row.available === 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{row.available}</span> },
    { key: 'status', header: 'Status', render: (row: typeof mockBooks[0]) => <Badge variant={statusColors[row.status]} dot>{row.status}</Badge> },
    {
      key: 'actions', header: '', className: 'w-20',
      render: () => <button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">Edit</button>,
    },
  ];

  const txColumns = [
    {
      key: 'student',
      header: 'Student',
      render: (row: typeof mockTransactions[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
            {row.student.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="font-semibold text-slate-900">{row.student}</span>
        </div>
      ),
    },
    { key: 'book', header: 'Book', render: (row: typeof mockTransactions[0]) => <span className="text-slate-700">{row.book}</span> },
    { key: 'borrowed', header: 'Borrowed', render: (row: typeof mockTransactions[0]) => <span className="text-slate-600">{row.borrowed}</span> },
    { key: 'due', header: 'Due Date', render: (row: typeof mockTransactions[0]) => <span className="text-slate-600">{row.due}</span> },
    { key: 'status', header: 'Status', render: (row: typeof mockTransactions[0]) => <Badge variant={statusColors[row.status]} dot>{row.status}</Badge> },
    {
      key: 'penalty', header: 'Penalty',
      render: (row: typeof mockTransactions[0]) => <span className={row.penalty > 0 ? 'font-semibold text-rose-600' : 'text-slate-500'}>{row.penalty > 0 ? fmt(row.penalty) : '-'}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Library"
        subtitle="Book management, transactions, and penalties"
        icon="📖"
        breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Library' }]}
        actions={<Button onClick={() => setShowAddBook(true)}>+ Add Book</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Books" value="2,340" change="+8%" changeType="positive" icon="📚" color="blue" />
        <StatCard title="Active Loans" value="89" icon="📤" color="amber" />
        <StatCard title="Overdue" value="12" icon="⚠️" color="rose" />
        <StatCard title="Penalties Owed" value={fmt(7500)} icon="💰" color="violet" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 p-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-600" />
          <h3 className="text-base font-bold text-slate-900 mb-1">Monthly Transactions</h3>
          <p className="text-sm text-slate-500 mb-6">Borrowing activity</p>
          <BarChart
            data={[
              { label: 'Jan', value: 120 }, { label: 'Feb', value: 95 }, { label: 'Mar', value: 140 },
              { label: 'Apr', value: 110 }, { label: 'May', value: 155 }, { label: 'Jun', value: 89 },
            ]}
            height={160}
          />
        </div>
        <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 p-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-600" />
          <h3 className="text-base font-bold text-slate-900 mb-5">By Category</h3>
          <div className="space-y-3">
            {[
              { label: 'Textbooks', value: 1800, color: '#3b82f6' },
              { label: 'Literature', value: 340, color: '#8b5cf6' },
              { label: 'Reference', value: 120, color: '#059669' },
              { label: 'Journals', value: 80, color: '#d97706' },
            ].map(c => (
              <div key={c.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: c.color }} />
                  <span className="text-sm text-slate-600">{c.label}</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">{c.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs & Tables */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {[
          { id: 'books', label: '📚 Books' },
          { id: 'transactions', label: '🔄 Transactions' },
          { id: 'penalties', label: '⚠️ Penalties' },
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

      <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-600" />
        {activeTab === 'books' && <Table columns={bookColumns} data={mockBooks as unknown as Record<string, unknown>[]} rowKey="id" emptyIcon="📚" />}
        {activeTab === 'transactions' && <Table columns={txColumns} data={mockTransactions as unknown as Record<string, unknown>[]} rowKey="id" emptyIcon="🔄" />}
        {activeTab === 'penalties' && (
          <Table
            columns={txColumns.filter(c => c.key !== 'borrowed')}
            data={mockTransactions.filter(t => t.penalty > 0) as unknown as Record<string, unknown>[]}
            rowKey="id"
            emptyMessage="No pending penalties"
            emptyIcon="✅"
          />
        )}
      </div>

      {/* Add Book Modal */}
      <Modal
        open={showAddBook}
        onClose={() => setShowAddBook(false)}
        title="Add New Book"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowAddBook(false)}>Cancel</Button>
            <Button onClick={() => { setShowAddBook(false); setToast({ message: 'Book added successfully', type: 'success' }); }}>Add Book</Button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput label="Title" placeholder="Book title" required />
          <FormInput label="Author" placeholder="Author name" required />
          <FormSelect label="Category" options={[{ value: 'textbook', label: 'Textbook' }, { value: 'literature', label: 'Literature' }, { value: 'reference', label: 'Reference' }, { value: 'journal', label: 'Journal' }]} required />
          <FormInput label="ISBN" placeholder="978-XXX-XXXX-XX-X" />
          <FormInput label="Total Copies" type="number" placeholder="1" required />
          <FormSelect label="Shelf Location" options={[{ value: 'A1', label: 'Shelf A1' }, { value: 'A2', label: 'Shelf A2' }, { value: 'B1', label: 'Shelf B1' }, { value: 'B2', label: 'Shelf B2' }]} required />
        </div>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
