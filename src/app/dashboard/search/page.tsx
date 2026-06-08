'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockResults = [
  { type: 'student', name: 'Chidera Okonkwo', detail: 'SS 2A · Reg No: STD-2025-0042', href: '/dashboard/students', color: 'from-blue-500 to-blue-600' },
  { type: 'student', name: 'Amina Bello', detail: 'JSS 1B · Reg No: STD-2025-0187', href: '/dashboard/students', color: 'from-violet-500 to-violet-600' },
  { type: 'teacher', name: 'Mrs. Adebayo Folake', detail: 'Mathematics · JSS 1A Class Teacher', href: '/dashboard/teachers', color: 'from-emerald-500 to-teal-500' },
  { type: 'teacher', name: 'Mr. Obi Chukwuemeka', detail: 'English Language · SS 1B Class Teacher', href: '/dashboard/teachers', color: 'from-amber-500 to-orange-500' },
  { type: 'class', name: 'SS 2A', detail: '30 students · Mr. Yusuf (Class Teacher)', href: '/dashboard/academics', color: 'from-rose-500 to-pink-500' },
  { type: 'class', name: 'JSS 1A', detail: '42 students · Mrs. Adebayo (Class Teacher)', href: '/dashboard/academics', color: 'from-cyan-500 to-blue-500' },
  { type: 'invoice', name: 'INV-2026-0042', detail: 'Chidera Okonkwo · ₦125,000 · Pending', href: '/dashboard/finance', color: 'from-amber-500 to-yellow-500' },
  { type: 'book', name: 'Further Mathematics by A.O.久保', detail: 'Available · 5 copies in stock', href: '/dashboard/library', color: 'from-violet-500 to-purple-500' },
];

const categories = [
  { key: 'all', label: 'All Results', count: mockResults.length },
  { key: 'student', label: 'Students', count: mockResults.filter(r => r.type === 'student').length },
  { key: 'teacher', label: 'Teachers', count: mockResults.filter(r => r.type === 'teacher').length },
  { key: 'class', label: 'Classes', count: mockResults.filter(r => r.type === 'class').length },
  { key: 'invoice', label: 'Invoices', count: mockResults.filter(r => r.type === 'invoice').length },
  { key: 'book', label: 'Books', count: mockResults.filter(r => r.type === 'book').length },
];

const typeIcons: Record<string, string> = {
  student: '👤',
  teacher: '🧑‍🏫',
  class: '🏫',
  invoice: '💰',
  book: '📖',
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const results = mockResults.filter(r => {
    const matchesFilter = activeFilter === 'all' || r.type === activeFilter;
    const matchesQuery = !query || r.name.toLowerCase().includes(query.toLowerCase()) || r.detail.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
          <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search students, teachers, classes, invoices, books..." className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400" />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm font-medium">Clear</button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {categories.map(cat => (
            <button key={cat.key} onClick={() => setActiveFilter(cat.key)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeFilter === cat.key ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {cat.label} <span className="ml-1 text-xs opacity-75">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {!query && activeFilter === 'all' && (
          <p className="text-sm text-slate-500 font-medium px-1">Showing recent results. Type to search across all data.</p>
        )}
        {results.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
            <span className="text-4xl block mb-4">🔍</span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No results found</h3>
            <p className="text-sm text-slate-500">Try a different search term or filter.</p>
          </div>
        ) : (
          results.map((result, i) => (
            <Link key={i} href={result.href} className={`block bg-white rounded-2xl border border-slate-200/80 p-5 hover:shadow-lg hover:border-slate-300 transition-all animate-fadeInUp stagger-${Math.min(i + 1, 6)}`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${result.color} flex items-center justify-center text-xl text-white shadow-md flex-shrink-0`}>
                  {typeIcons[result.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 truncate">{result.name}</h4>
                  <p className="text-sm text-slate-500 truncate mt-0.5">{result.detail}</p>
                </div>
                <span className="inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold capitalize bg-slate-100 text-slate-600 flex-shrink-0">{result.type}</span>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Quick links */}
      {!query && activeFilter === 'all' && (
        <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl border border-blue-100/50 p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Quick Links</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Students', href: '/dashboard/students', icon: '👤', color: 'from-blue-500 to-blue-600' },
              { label: 'Teachers', href: '/dashboard/teachers', icon: '🧑‍🏫', color: 'from-violet-500 to-purple-600' },
              { label: 'Finance', href: '/dashboard/finance', icon: '💰', color: 'from-emerald-500 to-teal-600' },
              { label: 'AI Agents', href: '/dashboard/ai-agents', icon: '🤖', color: 'from-amber-500 to-orange-600' },
            ].map(link => (
              <Link key={link.label} href={link.href} className="flex items-center gap-3 bg-white rounded-xl p-3.5 hover:shadow-md transition-all border border-slate-100">
                <span className={`w-9 h-9 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center text-sm text-white shadow-sm`}>{link.icon}</span>
                <span className="text-sm font-semibold text-slate-700">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
