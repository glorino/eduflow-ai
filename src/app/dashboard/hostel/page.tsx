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

const mockVisitors = [
  { id: 'V1', studentId: 'STU001', visitorName: 'Mr. Adebayo', visitorPhone: '08012345678', relationship: 'Father', purpose: 'Parent visit', visitDate: '2026-06-09', checkInTime: '10:00', checkOutTime: '12:00', status: 'checked_out' },
  { id: 'V2', studentId: 'STU003', visitorName: 'Mrs. Okafor', visitorPhone: '08098765432', relationship: 'Mother', purpose: 'Bring supplies', visitDate: '2026-06-10', checkInTime: '14:00', checkOutTime: null, status: 'checked_in' },
];

const mockIncidents = [
  { id: 'I1', reportedBy: 'Mr. Chukwu Obi', category: 'noise', severity: 'low', description: 'Late night noise from Block A', location: 'Block A, Room A101', status: 'resolved', resolvedBy: 'Mr. Chukwu Obi', createdAt: '2026-06-08' },
  { id: 'I2', reportedBy: 'Mrs. Ngozi Eze', category: 'fighting', severity: 'high', description: 'Physical altercation between two students', location: 'Block C, Common Area', status: 'open', resolvedBy: null, createdAt: '2026-06-10' },
];

const mockMaintenance = [
  { id: 'M1', reportedBy: 'Student STU005', category: 'plumbing', description: 'Leaking faucet in bathroom', location: 'Block B, Room B102', priority: 'medium', status: 'in_progress', assignedTo: 'Mr. Okonkwo', createdAt: '2026-06-07' },
  { id: 'M2', reportedBy: 'Mrs. Kemi Adeyemi', category: 'electrical', description: 'Faulty light switch', location: 'Block D, Corridor', priority: 'high', status: 'pending', assignedTo: null, createdAt: '2026-06-09' },
];

const mockParcels = [
  { id: 'P1', studentId: 'STU002', senderName: 'Amazon Delivery', description: 'Textbooks and notebook set', receivedBy: 'Mrs. Okafor', receivedAt: '2026-06-08', status: 'claimed', trackingCode: 'PCL-ABC12345' },
  { id: 'P2', studentId: 'STU001', senderName: 'Uncle Tunde', description: 'Clothes and food items', receivedBy: 'Mr. Chukwu Obi', receivedAt: '2026-06-10', status: 'received', trackingCode: 'PCL-DEF67890' },
];

const statusColors: Record<string, 'green' | 'red' | 'amber'> = { Full: 'red', Available: 'green', Maintenance: 'amber' };
const incidentStatusColors: Record<string, 'green' | 'red' | 'amber' | 'blue'> = { open: 'red', investigating: 'amber', resolved: 'green', closed: 'slate' };
const maintenanceStatusColors: Record<string, 'green' | 'red' | 'amber' | 'blue'> = { pending: 'red', in_progress: 'amber', completed: 'green' };
const parcelStatusColors: Record<string, 'green' | 'red'> = { received: 'red', claimed: 'green' };

const tabs = ['Rooms', 'Visitors', 'Incidents', 'Maintenance', 'Parcels'] as const;
type Tab = typeof tabs[number];

export default function HostelPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Rooms');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showAssign, setShowAssign] = useState(false);
  const [showVisitorModal, setShowVisitorModal] = useState(false);
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showParcelModal, setShowParcelModal] = useState(false);

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

  const visitorColumns = [
    { key: 'visitorName', header: 'Visitor', render: (row: typeof mockVisitors[0]) => <div><div className="font-semibold text-slate-900">{row.visitorName}</div><div className="text-xs text-slate-500">{row.relationship}</div></div> },
    { key: 'studentId', header: 'Student', render: (row: typeof mockVisitors[0]) => <span className="font-mono">{row.studentId}</span> },
    { key: 'purpose', header: 'Purpose', render: (row: typeof mockVisitors[0]) => <span className="text-slate-600">{row.purpose}</span> },
    { key: 'checkInTime', header: 'Check In', render: (row: typeof mockVisitors[0]) => <span className="text-slate-600">{row.checkInTime}</span> },
    { key: 'checkOutTime', header: 'Check Out', render: (row: typeof mockVisitors[0]) => <span className="text-slate-600">{row.checkOutTime || '—'}</span> },
    { key: 'status', header: 'Status', render: (row: typeof mockVisitors[0]) => <Badge variant={row.status === 'checked_in' ? 'green' : 'slate'} dot>{row.status === 'checked_in' ? 'In' : 'Out'}</Badge> },
  ];

  const incidentColumns = [
    { key: 'category', header: 'Category', render: (row: typeof mockIncidents[0]) => <Badge variant="blue">{row.category}</Badge> },
    { key: 'severity', header: 'Severity', render: (row: typeof mockIncidents[0]) => <Badge variant={row.severity === 'high' ? 'red' : row.severity === 'medium' ? 'amber' : 'green'}>{row.severity}</Badge> },
    { key: 'description', header: 'Description', render: (row: typeof mockIncidents[0]) => <span className="text-slate-600 text-sm">{row.description}</span> },
    { key: 'location', header: 'Location', render: (row: typeof mockIncidents[0]) => <span className="text-slate-600">{row.location}</span> },
    { key: 'status', header: 'Status', render: (row: typeof mockIncidents[0]) => <Badge variant={incidentStatusColors[row.status]} dot>{row.status}</Badge> },
    { key: 'createdAt', header: 'Date', render: (row: typeof mockIncidents[0]) => <span className="text-slate-500">{row.createdAt}</span> },
  ];

  const maintenanceColumns = [
    { key: 'category', header: 'Category', render: (row: typeof mockMaintenance[0]) => <Badge variant="amber">{row.category}</Badge> },
    { key: 'priority', header: 'Priority', render: (row: typeof mockMaintenance[0]) => <Badge variant={row.priority === 'high' || row.priority === 'urgent' ? 'red' : row.priority === 'medium' ? 'amber' : 'green'}>{row.priority}</Badge> },
    { key: 'description', header: 'Description', render: (row: typeof mockMaintenance[0]) => <span className="text-slate-600 text-sm">{row.description}</span> },
    { key: 'location', header: 'Location', render: (row: typeof mockMaintenance[0]) => <span className="text-slate-600">{row.location}</span> },
    { key: 'assignedTo', header: 'Assigned To', render: (row: typeof mockMaintenance[0]) => <span className="text-slate-600">{row.assignedTo || '—'}</span> },
    { key: 'status', header: 'Status', render: (row: typeof mockMaintenance[0]) => <Badge variant={maintenanceStatusColors[row.status]} dot>{row.status.replace('_', ' ')}</Badge> },
  ];

  const parcelColumns = [
    { key: 'trackingCode', header: 'Tracking Code', render: (row: typeof mockParcels[0]) => <span className="font-mono font-semibold">{row.trackingCode}</span> },
    { key: 'studentId', header: 'Student', render: (row: typeof mockParcels[0]) => <span className="font-mono">{row.studentId}</span> },
    { key: 'senderName', header: 'Sender', render: (row: typeof mockParcels[0]) => <span className="text-slate-600">{row.senderName}</span> },
    { key: 'description', header: 'Description', render: (row: typeof mockParcels[0]) => <span className="text-slate-600 text-sm">{row.description}</span> },
    { key: 'receivedAt', header: 'Received', render: (row: typeof mockParcels[0]) => <span className="text-slate-500">{row.receivedAt}</span> },
    { key: 'status', header: 'Status', render: (row: typeof mockParcels[0]) => <Badge variant={parcelStatusColors[row.status]} dot>{row.status}</Badge> },
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

      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'Rooms' && (
        <>
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
        </>
      )}

      {activeTab === 'Visitors' && (
        <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Visitor Log</h3>
            <Button size="sm" onClick={() => setShowVisitorModal(true)}>+ Log Visitor</Button>
          </div>
          <Table columns={visitorColumns} data={mockVisitors as unknown as Record<string, unknown>[]} rowKey="id" emptyIcon="👥" />
        </div>
      )}

      {activeTab === 'Incidents' && (
        <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-red-500" />
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Incident Reports</h3>
            <Button size="sm" onClick={() => setShowIncidentModal(true)}>+ Report Incident</Button>
          </div>
          <Table columns={incidentColumns} data={mockIncidents as unknown as Record<string, unknown>[]} rowKey="id" emptyIcon="⚠️" />
        </div>
      )}

      {activeTab === 'Maintenance' && (
        <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-500" />
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Maintenance Requests</h3>
            <Button size="sm" onClick={() => setShowMaintenanceModal(true)}>+ Request Maintenance</Button>
          </div>
          <Table columns={maintenanceColumns} data={mockMaintenance as unknown as Record<string, unknown>[]} rowKey="id" emptyIcon="🔧" />
        </div>
      )}

      {activeTab === 'Parcels' && (
        <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500" />
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Parcel Tracking</h3>
            <Button size="sm" onClick={() => setShowParcelModal(true)}>+ Receive Parcel</Button>
          </div>
          <Table columns={parcelColumns} data={mockParcels as unknown as Record<string, unknown>[]} rowKey="id" emptyIcon="📦" />
        </div>
      )}

      <Modal open={showAssign} onClose={() => setShowAssign(false)} title="Assign Room" size="md" footer={<><Button variant="secondary" onClick={() => setShowAssign(false)}>Cancel</Button><Button onClick={() => { setShowAssign(false); setToast({ message: 'Room assigned', type: 'success' }); }}>Assign</Button></>}>
        <div className="space-y-4">
          <FormInput label="Student ID" placeholder="STU001" required />
          <FormSelect label="Hostel" options={mockHostels.map(h => ({ value: h.id, label: h.name }))} required />
          <FormSelect label="Room" options={mockRooms.filter(r => r.status === 'Available').map(r => ({ value: r.id, label: `${r.id} (${r.bedSpaces - r.occupied} beds free)` }))} required />
        </div>
      </Modal>

      <Modal open={showVisitorModal} onClose={() => setShowVisitorModal(false)} title="Log Visitor" size="md" footer={<><Button variant="secondary" onClick={() => setShowVisitorModal(false)}>Cancel</Button><Button onClick={() => { setShowVisitorModal(false); setToast({ message: 'Visitor logged', type: 'success' }); }}>Log Visit</Button></>}>
        <div className="space-y-4">
          <FormInput label="Student ID" placeholder="STU001" required />
          <FormInput label="Visitor Name" placeholder="Full name" required />
          <FormInput label="Phone" placeholder="08012345678" />
          <FormSelect label="Relationship" options={[{ value: 'Father', label: 'Father' }, { value: 'Mother', label: 'Mother' }, { value: 'Sibling', label: 'Sibling' }, { value: 'Guardian', label: 'Guardian' }, { value: 'Other', label: 'Other' }]} required />
          <FormInput label="Purpose" placeholder="e.g., Parent visit, Bring supplies" required />
          <FormInput label="ID Document Type" placeholder="e.g., National ID, Driver's License" />
        </div>
      </Modal>

      <Modal open={showIncidentModal} onClose={() => setShowIncidentModal(false)} title="Report Incident" size="md" footer={<><Button variant="secondary" onClick={() => setShowIncidentModal(false)}>Cancel</Button><Button onClick={() => { setShowIncidentModal(false); setToast({ message: 'Incident reported', type: 'success' }); }}>Submit Report</Button></>}>
        <div className="space-y-4">
          <FormInput label="Reported By" placeholder="Your name" required />
          <FormSelect label="Category" options={[{ value: 'theft', label: 'Theft' }, { value: 'fighting', label: 'Fighting' }, { value: 'noise', label: 'Noise' }, { value: 'property_damage', label: 'Property Damage' }, { value: 'health', label: 'Health' }, { value: 'other', label: 'Other' }]} required />
          <FormSelect label="Severity" options={[{ value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' }, { value: 'high', label: 'High' }, { value: 'critical', label: 'Critical' }]} required />
          <FormInput label="Location" placeholder="e.g., Block A, Room A101" />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Description</label>
            <textarea className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Describe the incident..." />
          </div>
        </div>
      </Modal>

      <Modal open={showMaintenanceModal} onClose={() => setShowMaintenanceModal(false)} title="Request Maintenance" size="md" footer={<><Button variant="secondary" onClick={() => setShowMaintenanceModal(false)}>Cancel</Button><Button onClick={() => { setShowMaintenanceModal(false); setToast({ message: 'Maintenance request submitted', type: 'success' }); }}>Submit Request</Button></>}>
        <div className="space-y-4">
          <FormInput label="Reported By" placeholder="Your name or Student ID" required />
          <FormSelect label="Category" options={[{ value: 'plumbing', label: 'Plumbing' }, { value: 'electrical', label: 'Electrical' }, { value: 'furniture', label: 'Furniture' }, { value: 'structural', label: 'Structural' }, { value: 'other', label: 'Other' }]} required />
          <FormInput label="Location" placeholder="e.g., Block B, Room B102" required />
          <FormSelect label="Priority" options={[{ value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' }, { value: 'high', label: 'High' }, { value: 'urgent', label: 'Urgent' }]} required />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Description</label>
            <textarea className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Describe the issue..." />
          </div>
        </div>
      </Modal>

      <Modal open={showParcelModal} onClose={() => setShowParcelModal(false)} title="Receive Parcel" size="md" footer={<><Button variant="secondary" onClick={() => setShowParcelModal(false)}>Cancel</Button><Button onClick={() => { setShowParcelModal(false); setToast({ message: 'Parcel received and tracking code generated', type: 'success' }); }}>Receive Parcel</Button></>}>
        <div className="space-y-4">
          <FormInput label="Student ID" placeholder="STU001" required />
          <FormInput label="Sender Name" placeholder="e.g., Amazon Delivery" required />
          <FormInput label="Description" placeholder="e.g., Textbooks and notebook set" required />
          <FormInput label="Received By" placeholder="Staff name" required />
        </div>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}