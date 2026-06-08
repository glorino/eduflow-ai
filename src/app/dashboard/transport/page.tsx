'use client';

import { useState } from 'react';
import { PageHeader, Badge, Table, Button, StatCard } from '@/components/ui';
import { Modal, FormInput, FormSelect, Toast } from '@/components/interactive';

const mockRoutes = [
  { id: 'R1', name: 'Route A — Victoria Island', bus: 'BUS-001', driver: 'Mr. Akin Johnson', capacity: 30, students: 28, pickup: '7:00 AM', dropoff: '3:30 PM', status: 'Active' },
  { id: 'R2', name: 'Route B — Lekki Phase 1', bus: 'BUS-002', driver: 'Mr. Femi Okafor', capacity: 30, students: 25, pickup: '7:15 AM', dropoff: '3:45 PM', status: 'Active' },
  { id: 'R3', name: 'Route C — Ikoyi', bus: 'BUS-003', driver: 'Mr. Yusuf Abubakar', capacity: 25, students: 22, pickup: '6:45 AM', dropoff: '3:15 PM', status: 'Active' },
  { id: 'R4', name: 'Route D — Surulere', bus: 'BUS-004', driver: 'Mr. Chidi Nwosu', capacity: 25, students: 18, pickup: '7:30 AM', dropoff: '4:00 PM', status: 'Active' },
  { id: 'R5', name: 'Route E — Ikeja', bus: 'BUS-005', driver: 'Mr. Tunde Balogun', capacity: 35, students: 0, pickup: '6:30 AM', dropoff: '3:00 PM', status: 'Inactive' },
];

const statusColors: Record<string, 'green' | 'slate'> = { Active: 'green', Inactive: 'slate' };

export default function TransportPage() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showAddRoute, setShowAddRoute] = useState(false);

  const totalCapacity = mockRoutes.reduce((s, r) => s + r.capacity, 0);
  const totalStudents = mockRoutes.reduce((s, r) => s + r.students, 0);

  const columns = [
    { key: 'id', header: 'Route', render: (row: typeof mockRoutes[0]) => <span className="font-mono text-xs text-slate-500">{row.id}</span> },
    { key: 'name', header: 'Route Name', render: (row: typeof mockRoutes[0]) => <div><div className="font-semibold text-slate-900">{row.name}</div><div className="text-xs text-slate-500">Bus: {row.bus}</div></div> },
    { key: 'driver', header: 'Driver', render: (row: typeof mockRoutes[0]) => <span className="text-slate-600">{row.driver}</span> },
    { key: 'students', header: 'Students', render: (row: typeof mockRoutes[0]) => <span className="font-semibold">{row.students}/{row.capacity}</span> },
    { key: 'pickup', header: 'Pickup', render: (row: typeof mockRoutes[0]) => <span className="text-slate-600">{row.pickup}</span> },
    { key: 'dropoff', header: 'Dropoff', render: (row: typeof mockRoutes[0]) => <span className="text-slate-600">{row.dropoff}</span> },
    { key: 'status', header: 'Status', render: (row: typeof mockRoutes[0]) => <Badge variant={statusColors[row.status]} dot>{row.status}</Badge> },
    { key: 'actions', header: '', className: 'w-20', render: () => <button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">Track</button> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Transport" subtitle="Bus routes, drivers, and student tracking" icon="🚌" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Transport' }]} actions={<Button onClick={() => setShowAddRoute(true)}>+ Add Route</Button>} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Routes" value={mockRoutes.filter(r => r.status === 'Active').length} icon="🚌" color="blue" />
        <StatCard title="Students on Bus" value={totalStudents} change={`${Math.round((totalStudents/totalCapacity)*100)}% capacity`} changeType="positive" icon="🎓" color="violet" />
        <StatCard title="Active Buses" value={mockRoutes.filter(r => r.status === 'Active').length} icon="🚗" color="green" />
        <StatCard title="Available Seats" value={totalCapacity - totalStudents} icon="💺" color="amber" />
      </div>

      {/* Route Map Placeholder */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">Live Route Tracking</h3>
        <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl h-64 flex items-center justify-center border border-dashed border-slate-300">
          <div className="text-center">
            <span className="text-4xl">🗺️</span>
            <p className="text-sm text-slate-500 mt-2">Real-time GPS tracking — Connect bus GPS devices to enable live tracking</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-base font-bold text-slate-900">All Routes</h3></div>
        <Table columns={columns} data={mockRoutes as unknown as Record<string, unknown>[]} rowKey="id" emptyIcon="🚌" />
      </div>

      <Modal open={showAddRoute} onClose={() => setShowAddRoute(false)} title="Add Route" size="lg" footer={<><Button variant="secondary" onClick={() => setShowAddRoute(false)}>Cancel</Button><Button onClick={() => { setShowAddRoute(false); setToast({ message: 'Route added', type: 'success' }); }}>Add Route</Button></>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput label="Route Name" placeholder="e.g. Route F — Abuja" required />
          <FormInput label="Bus Number" placeholder="BUS-006" required />
          <FormInput label="Driver Name" placeholder="Driver name" required />
          <FormInput label="Capacity" type="number" placeholder="30" required />
          <FormInput label="Pickup Time" type="time" required />
          <FormInput label="Dropoff Time" type="time" required />
        </div>
      </Modal>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
