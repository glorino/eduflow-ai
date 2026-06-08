'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

const navSections = [
  {
    label: 'Overview',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    ],
  },
  {
    label: 'Management',
    items: [
      { name: 'Admissions', href: '/dashboard/admissions', icon: '📝', badge: '12' },
      { name: 'Students', href: '/dashboard/students', icon: '🎓' },
      { name: 'Teachers', href: '/dashboard/teachers', icon: '👩‍🏫' },
      { name: 'Parents', href: '/dashboard/parents', icon: '👨‍👩‍👧' },
    ],
  },
  {
    label: 'Academic',
    items: [
      { name: 'Academics', href: '/dashboard/academics', icon: '📚' },
      { name: 'CBT', href: '/dashboard/cbt', icon: '💻', badge: '3' },
      { name: 'Attendance', href: '/dashboard/attendance', icon: '📋' },
      { name: 'Reports', href: '/dashboard/reports', icon: '📈' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { name: 'Finance', href: '/dashboard/finance', icon: '💰' },
      { name: 'Library', href: '/dashboard/library', icon: '📖' },
      { name: 'Hostel', href: '/dashboard/hostel', icon: '🏠' },
      { name: 'Transport', href: '/dashboard/transport', icon: '🚌' },
      { name: 'Inventory', href: '/dashboard/inventory', icon: '📦' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { name: 'AI Agents', href: '/dashboard/ai-agents', icon: '🤖', badge: '10' },
      { name: 'Alumni', href: '/dashboard/alumni', icon: '🏛️' },
    ],
  },
  {
    label: 'System',
    items: [
      { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
    ],
  },
];

const allNavItems = navSections.flatMap(s => s.items);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications] = useState(3);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  }, [searchQuery, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredItems = searchQuery
    ? allNavItems.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="flex h-screen bg-[#f0f2f5] overflow-hidden">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed lg:static z-50 h-full bg-white flex flex-col transition-all duration-300 ease-in-out',
        collapsed ? 'w-[72px]' : 'w-[260px]',
        mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0',
        'border-r border-slate-200/60'
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
          <Link href="/dashboard" className="flex items-center gap-3 min-w-0 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-blue-700 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0 group-hover:shadow-blue-500/30 transition-shadow">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <span className="font-bold text-slate-900 tracking-tight whitespace-nowrap block text-sm">EduFlow AI</span>
                <span className="text-[10px] text-slate-400 font-medium">Education ERP</span>
              </div>
            )}
          </Link>
          <button
            onClick={() => { setCollapsed(!collapsed); setMobileOpen(false); }}
            className="hidden lg:flex w-7 h-7 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {/* Search Trigger */}
        {!collapsed && (
          <div className="px-3 pt-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center gap-2.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl text-sm text-slate-400 transition-all"
            >
              <span className="text-sm">🔍</span>
              <span className="flex-1 text-left text-xs">Search modules...</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 rounded">⌘K</kbd>
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 scrollbar-thin">
          {navSections.map((section) => (
            <div key={section.label} className="mb-3">
              {!collapsed && (
                <div className="px-3 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {section.label}
                </div>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                        isActive
                          ? 'bg-blue-50/80 text-blue-700 shadow-sm shadow-blue-500/5'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      )}
                      title={collapsed ? item.name : undefined}
                    >
                      <span className="text-lg flex-shrink-0 w-6 text-center">{item.icon}</span>
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.name}</span>
                          {'badge' in item && item.badge && (
                            <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="border-t border-slate-100 p-3">
          <div className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer', collapsed && 'justify-center px-0')}>
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg shadow-violet-500/20">
              SA
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-900 truncate">Super Admin</div>
                <div className="text-[11px] text-slate-500 truncate">admin@eduflow.ai</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              ☰
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                {allNavItems.find(n => pathname?.startsWith(n.href))?.name || 'Dashboard'}
              </h1>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                {currentTime && `${currentTime} • `}Welcome back, Admin
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl text-sm text-slate-400 transition-all"
            >
              🔍
            </button>
            <button className="relative p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
              🔔
              {notifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm animate-dotPulse">
                  {notifications}
                </span>
              )}
            </button>
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-violet-500/20 cursor-pointer hover:shadow-violet-500/30 transition-shadow">
              SA
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
          <div className="relative w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn">
            <form onSubmit={handleSearch} className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
              <span className="text-slate-400">🔍</span>
              <input
                type="text"
                placeholder="Search modules, students, teachers..."
                className="flex-1 bg-transparent text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <kbd className="px-2 py-1 text-xs font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded-lg">ESC</kbd>
            </form>
            {filteredItems.length > 0 && (
              <div className="py-2 max-h-64 overflow-y-auto">
                {filteredItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-blue-50/50 transition-colors"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium text-slate-700">{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
            {searchQuery && filteredItems.length === 0 && (
              <div className="py-8 text-center text-sm text-slate-500">
                No results for &ldquo;{searchQuery}&rdquo;
              </div>
            )}
            {!searchQuery && (
              <div className="py-6 text-center text-sm text-slate-400">
                Type to search across all modules
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
