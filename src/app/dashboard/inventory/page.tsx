'use client';

import { useState } from 'react';
import { PageHeader, Badge, Table, Button, StatCard, ProgressBar } from '@/components/ui';
import { BarChart } from '@/components/charts';
import { Modal, FormInput, FormSelect, Toast } from '@/components/interactive';

const mockItems = [
  { id: 'INV001', name: 'Mathematics Textbooks', category: 'Books', quantity: 500, minStock: 100, location: 'Library Store', unitPrice: 3500, status: 'In Stock' },
  { id: 'INV002', name: 'Science Lab Equipment', category: 'Lab', quantity: 45, minStock: 20, location: 'Science Lab', unitPrice: 25000, status: 'In Stock' },
  { id: 'INV003', name: 'Computer Systems', category: 'ICT', quantity: 60, minStock: 30, location: 'Computer Lab', unitPrice: 180000, status: 'In Stock' },
  { id: 'INV004', name: 'Student Uniforms', category: 'Uniforms', quantity: 80, minStock: 150, location: 'Store Room', unitPrice: 8500, status: 'Low Stock' },
  { id: 'INV005', name: 'Chairs (Student)', category: 'Furniture', quantity: 280, minStock: 100, location: 'Various', unitPrice: 15000, status: 'In Stock' },
  { id: 'INV006', name: 'Projectors', category: 'ICT', quantity: 8, minStock: 5, location: 'Staff Room', unitPrice: 95000, status: 'In Stock' },
  { id: 'INV007', name: 'Whiteboard Markers', category: 'Stationery', quantity: 25, minStock: 50, location: 'Store Room', unitPrice: 200, status: 'Low Stock' },
  { id: 'INV008', name: 'First Aid Kits', category: 'Medical', quantity: 12, minStock: 10, location: 'Sick Bay', unitPrice: 5000, status: 'In Stock' },
];

const statusColors: Record<string, 'green' | 'red'> = { 'In Stock': 'green', 'Low Stock': 'red' };
const fmt = (n: number) => `₦${n.toLocaleString()}`;

export default function InventoryPage() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const totalValue = mockItems.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const lowStock = mockItems.filter(i => i.status === 'Low Stock').length;

  const columns = [
    { key: 'id', header: 'ID', render: (row: typeof mockItems[0]) => <span className="font-mono text-xs text-slate-500">{row.id}</span> },
    { key: 'name', header: 'Item', render: (row: typeof mockItems[0]) => <div><div className="font-semibold text-slate-900">{row.name}</div><div className="text-xs text-slate-500">{row.location}</div></div> },
    { key: 'category', header: 'Category', render: (row: typeof mockItems[0]) => <Badge variant="blue">{row.category}</Badge> },
    { key: 'quantity', header: 'Qty', render: (row: typeof mockItems[0]) => <span className="font-semibold">{row.quantity}</span> },
    { key: 'minStock', header: 'Min Stock', render: (row: typeof mockItems[0]) => <span className="text-slate-500">{row.minStock}</span> },
    { key: 'unitPrice', header: 'Unit Price', render: (row: typeof mockItems[0]) => <span className="text-slate-600">{fmt(row.unitPrice)}</span> },
    { key: 'status', header: 'Status', render: (row: typeof mockItems[0]) => <Badge variant={statusColors[row.status]} dot>{row.status}</Badge> },
    { key: 'actions', header: '', className: 'w-20', render: () => <button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">Edit</button> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Inventory" subtitle="Asset tracking and stock management" icon="📦" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Inventory' }]} actions={<Button onClick={() => setShowAdd(true)}>+ Add Item</Button>} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Items" value={mockItems.reduce((s, i) => s + i.quantity, 0).toLocaleString()} icon="📦" color="blue" />
        <StatCard title="Total Value" value={`₦${(totalValue / 1000000).toFixed(1)}M`} icon="💰" color="violet" />
        <StatCard title="Categories" value={new Set(mockItems.map(i => i.category)).size} icon="🏷️" color="green" />
        <StatCard title="Low Stock" value={lowStock} change={lowStock > 0 ? 'Needs attention' : 'All good'} changeType={lowStock > 0 ? 'negative' : 'positive'} icon="⚠️" color="rose" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-1">Stock by Category</h3>
        <p className="text-sm text-slate-500 mb-6">Item distribution</p>
        <BarChart
          data={[
            { label: 'Books', value: 500, color: '#3b82f6' },
            { label: 'ICT', value: 68, color: '#8b5cf6' },
            { label: 'Furniture', value: 280, color: '#059669' },
            { label: 'Uniforms', value: 80, color: '#d97706' },
            { label: 'Stationery', value: 25, color: '#e11d48' },
            { label: 'Lab', value: 45, color: '#06b6d4' },
          ]}
          height={180}
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-base font-bold text-slate-900">All Items</h3></div>
        <Table columns={columns} data={mockItems as unknown as Record<string, unknown>[]} rowKey="id" emptyIcon="📦" />
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add Inventory Item" size="lg" footer={<><Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button><Button onClick={() => { setShowAdd(false); setToast({ message: 'Item added', type: 'success' }); }}>Add Item</Button></>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput label="Item Name" placeholder="e.g. Science Textbooks" required />
          <FormSelect label="Category" options={[{ value: 'books', label: 'Books' }, { value: 'ict', label: 'ICT' }, { value: 'furniture', label: 'Furniture' }, { value: 'uniforms', label: 'Uniforms' }, { value: 'stationery', label: 'Stationery' }, { value: 'lab', label: 'Lab' }, { value: 'medical', label: 'Medical' }]} required />
          <FormInput label="Quantity" type="number" placeholder="100" required />
          <FormInput label="Min Stock Level" type="number" placeholder="20" required />
          <FormInput label="Unit Price (₦)" type="number" placeholder="3500" required />
          <FormInput label="Location" placeholder="e.g. Library Store" required />
        </div>
      </Modal>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
