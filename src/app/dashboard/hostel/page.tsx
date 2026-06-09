'use client';

import { useState } from 'react';
import { PageHeader, Badge, Table, Button, StatCard, ProgressBar } from '@/components/ui';
import { Modal, FormInput, FormSelect, Toast } from '@/components/interactive';

const mockHostels = [
  { id: 'H1', name: 'Block A — Boys', type: 'Male', capacity: 120, occupied: 108, warden: 'Mr. Chukwu Obi', status: 'Full' },
  { id: 'H2', name: 'Block B — Boys', type: 'Male', capacity: 100, occupied: 82, warden: 'Mr. Tunde Williams', status: 'Available' },
  { id: 'H3', name: 'Block C — Girls', type: 'Female', capacity: 120, occupied: 115, warden: 'Mrs. Ngozi Eze', status: 'Full' },
  { id: 'H4', name: 'Block D — Girls', type: 'Female', capacity: 80, occupied: 55, warden: 'Mrs. Kemi Adeyemi', status: 'Available' },
];

const mockRooms = [
  { id: 'A101', hostel: 'Block A', bedSpaces: 4, occupied: 4, floor: 'Ground', status: 'Full' },
  { id: 'A102', hostel: 'Block A', bedSpaces: 4, occupied: 3, floor: 'Ground', status: 'Available' },
  { id: 'A201', hostel: 'Block A', bedSpaces: 6, occupied: 6, floor: 'First', status: 'Full' },
  { id: 'B101', hostel: 'Block B', bedSpaces: 4, occupied: 2, floor: 'Ground', status: 'Available' },
  { id: 'C101', hostel: 'Block C', bedSpaces: 4, occupied: 4, floor: 'Ground', status: 'Full' },
  { id: 'D201', hostel: 'Block D', bedSpaces: 6, occupied: 3, floor: 'First', status: 'Available' },
];

const statusColors: Record<string, 'green' | 'red' | 'amber'> = { Full: 'red', Available: 'green', Maintenance: 'amber' };

export default function HostelPage() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showAssign, setShowAssign] = useState(false);

  const totalCapacity = mockHostels.reduce((s, h) => s + h.capacity, 0);
  const totalOccupied = mockHostels.reduce((s, h) => s + h.occupied, 0);

  const hostelColumns = [
    { key: 'name', header: 'Hostel', render: (row: typeof mockHostels[0]) => <div><div className="font-semibold text-slate-900">{row.name}</div><div className="text-xs text-slate-500">Warden: {row.warden}</div></div> },
    { key: 'type', header: 'Type', render: (row: typeof mockHostels[0]) => <Badge variant={row.type === 'Male' ? 'blue' : 'violet'}>{row.type}</Badge> },
    { key: 'capacity', header: 'Capacity', render: (row: typeof mockHostels[0]) => <span className="font-semibold">{row.capacity}</span> },
    { key: 'occupied', header: 'Occupied', render: (row: typeof mockHostels[0]) => <span className="font-semibold">{row.occupied}</span> },
    { key: 'occupancy', header: 'Occupancy', render: (row: typeof mockHostels[0]) => <div className="w-28"><ProgressBar value={row.occupied} max={row.capacity} color={row.occupied >= row.capacity ? 'rose' : row.occupied >= row.capacity * 0.8 ? 'amber' : 'green'} size="sm" showLabel /></div> },
    { key: 'status', header: 'Status', render: (row: typeof mockHostels[0]) => <Badge variant={statusColors[row.status]} dot>{row.status}</Badge> },
  ];

  const roomColumns = [
    { key: 'id', header: 'Room', render: (row: typeof mockRooms[0]) => <span className="font-mono font-semibold">{row.id}</span> },
    { key: 'hostel', header: 'Hostel', render: (row: typeof mockRooms[0]) => <span className="text-slate-600">{row.hostel}</span> },
    { key: 'floor', header: 'Floor', render: (row: typeof mockRooms[0]) => <span className="text-slate-600">{row.floor}</span> },
    { key: 'bedSpaces', header: 'Beds', render: (row: typeof mockRooms[0]) => <span className="font-semibold">{row.bedSpaces}</span> },
    { key: 'occupied', header: 'Occupied', render: (row: typeof mockRooms[0]) => <span className={row.occupied === row.bedSpaces ? 'text-rose-600 font-semibold' : 'text-emerald-600 font-semibold'}>{row.occupied}/{row.bedSpaces}</span> },
    { key: 'status', header: 'Status', render: (row: typeof mockRooms[0]) => <Badge variant={statusColors[row.status]} dot>{row.status}</Badge> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Hostel" subtitle="Accommodation management and room allocation" icon="🏠" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Hostel' }]} actions={<Button onClick={() => setShowAssign(true)}>+ Assign Room</Button>} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Capacity" value={totalCapacity} icon="🏠" color="blue" />
        <StatCard title="Occupied" value={totalOccupied} change={`${Math.round((totalOccupied/totalCapacity)*100)}%`} changeType="positive" icon="🛏️" color="violet" />
        <StatCard title="Available" value={totalCapacity - totalOccupied} icon="✅" color="green" />
        <StatCard title="Full Blocks" value={mockHostels.filter(h => h.status === 'Full').length} icon="🔴" color="rose" />
      </div>

      <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-base font-bold text-slate-900">Hostel Blocks</h3></div>
        <Table columns={hostelColumns} data={mockHostels as unknown as Record<string, unknown>[]} rowKey="id" emptyIcon="🏠" />
      </div>

      <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500" />
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-base font-bold text-slate-900">Room Overview</h3></div>
        <Table columns={roomColumns} data={mockRooms as unknown as Record<string, unknown>[]} rowKey="id" emptyIcon="🛏️" />
      </div>

      <Modal open={showAssign} onClose={() => setShowAssign(false)} title="Assign Room" size="md" footer={<><Button variant="secondary" onClick={() => setShowAssign(false)}>Cancel</Button><Button onClick={() => { setShowAssign(false); setToast({ message: 'Room assigned', type: 'success' }); }}>Assign</Button></>}>
        <div className="space-y-4">
          <FormInput label="Student ID" placeholder="STU001" required />
          <FormSelect label="Hostel" options={mockHostels.map(h => ({ value: h.id, label: h.name }))} required />
          <FormSelect label="Room" options={mockRooms.filter(r => r.status === 'Available').map(r => ({ value: r.id, label: `${r.id} (${r.bedSpaces - r.occupied} beds free)` }))} required />
        </div>
      </Modal>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
