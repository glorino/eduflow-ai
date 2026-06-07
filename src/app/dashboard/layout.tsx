'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Admissions', href: '/dashboard/admissions', icon: '📝' },
  { name: 'Academics', href: '/dashboard/academics', icon: '📚' },
  { name: 'CBT', href: '/dashboard/cbt', icon: '💻' },
  { name: 'Attendance', href: '/dashboard/attendance', icon: '📋' },
  { name: 'Finance', href: '/dashboard/finance', icon: '💰' },
  { name: 'Library', href: '/dashboard/library', icon: '📖' },
  { name: 'Hostel', href: '/dashboard/hostel', icon: '🏠' },
  { name: 'Transport', href: '/dashboard/transport', icon: '🚌' },
  { name: 'Inventory', href: '/dashboard/inventory', icon: '📦' },
  { name: 'Students', href: '/dashboard/students', icon: '🎓' },
  { name: 'Teachers', href: '/dashboard/teachers', icon: '👨‍🏫' },
  { name: 'Parents', href: '/dashboard/parents', icon: '👨‍👩‍👧' },
  { name: 'Alumni', href: '/dashboard/alumni', icon: '🏛️' },
  { name: 'Reports', href: '/dashboard/reports', icon: '📈' },
  { name: 'AI Agents', href: '/dashboard/ai-agents', icon: '🤖' },
  { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            {sidebarOpen && <span className="font-bold text-gray-900">EduFlow AI</span>}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-gray-600"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                title={item.name}
              >
                <span className="text-lg">{item.icon}</span>
                {sidebarOpen && <span className="text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">SA</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">Super Admin</div>
                <div className="text-xs text-gray-500 truncate">admin@eduflow.ai</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-900">
              {navigation.find(n => pathname?.startsWith(n.href))?.name || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 px-4 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <span className="text-xl">🔔</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">SA</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
