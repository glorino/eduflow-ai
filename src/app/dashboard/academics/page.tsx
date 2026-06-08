'use client';

import { useState } from 'react';

const classes = [
  { name: 'JSS 1A', students: 42, teacher: 'Mrs. Adebayo', arm: 'Science', termAvg: 72 },
  { name: 'JSS 1B', students: 38, teacher: 'Mr. Obi', arm: 'Arts', termAvg: 68 },
  { name: 'JSS 2A', students: 45, teacher: 'Mrs. Fatima', arm: 'Science', termAvg: 75 },
  { name: 'JSS 2B', students: 40, teacher: 'Mr. Chidi', arm: 'Commercial', termAvg: 70 },
  { name: 'SS 1A', students: 35, teacher: 'Mr. Yusuf', arm: 'Science', termAvg: 78 },
  { name: 'SS 1B', students: 32, teacher: 'Mrs. Aisha', arm: 'Arts', termAvg: 65 },
  { name: 'SS 2A', students: 30, teacher: 'Mr. Tunde', arm: 'Science', termAvg: 82 },
  { name: 'SS 2B', students: 28, teacher: 'Mrs. Ngozi', arm: 'Commercial', termAvg: 71 },
  { name: 'SS 3A', students: 26, teacher: 'Mr. Emeka', arm: 'Science', termAvg: 85 },
  { name: 'SS 3B', students: 24, teacher: 'Mrs. Bola', arm: 'Arts', termAvg: 79 },
];

const subjects = [
  { code: 'MTH', name: 'Mathematics', teachers: 4, classes: 10, avgScore: 72, trend: '+3.2' },
  { code: 'ENG', name: 'English Language', teachers: 3, classes: 10, avgScore: 68, trend: '+1.8' },
  { code: 'PHY', name: 'Physics', teachers: 2, classes: 6, avgScore: 74, trend: '+4.1' },
  { code: 'CHM', name: 'Chemistry', teachers: 2, classes: 6, avgScore: 71, trend: '+2.5' },
  { code: 'BIO', name: 'Biology', teachers: 2, classes: 6, avgScore: 69, trend: '-0.3' },
  { code: 'CIV', name: 'Civic Education', teachers: 2, classes: 10, avgScore: 76, trend: '+5.2' },
  { code: 'LIT', name: 'Literature', teachers: 1, classes: 4, avgScore: 73, trend: '+1.1' },
  { code: 'AGR', name: 'Agricultural Science', teachers: 1, classes: 4, avgScore: 80, trend: '+6.3' },
  { code: 'FMT', name: 'Further Mathematics', teachers: 1, classes: 3, avgScore: 68, trend: '-1.2' },
  { code: 'ECO', name: 'Economics', teachers: 2, classes: 6, avgScore: 70, trend: '+2.0' },
];

const terms = ['2025/2026 First Term', '2025/2026 Second Term', '2025/2026 Third Term'];

export default function AcademicsPage() {
  const [activeTab, setActiveTab] = useState<'classes' | 'subjects' | 'curriculum' | 'results'>('classes');
  const [selectedTerm, setSelectedTerm] = useState(terms[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Academics</h1>
          <p className="text-sm text-slate-500 mt-1">Manage classes, subjects, curriculum and results</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)} className="px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            {terms.map(t => <option key={t}>{t}</option>)}
          </select>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all">+ New Class</button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Classes', value: '10', icon: '🏫', change: '+2 this term', color: 'from-blue-500 to-blue-600' },
          { label: 'Active Subjects', value: '10', icon: '📚', change: '24 teachers', color: 'from-violet-500 to-purple-600' },
          { label: 'Avg. Score', value: '73%', icon: '📊', change: '+2.8 from last', color: 'from-emerald-500 to-teal-600' },
          { label: 'Pass Rate', value: '89%', icon: '✅', change: '+1.5 this term', color: 'from-amber-500 to-orange-600' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-lg text-white shadow-lg group-hover:scale-110 transition-transform`}>{card.icon}</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{card.value}</div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">{card.label}</div>
            <div className="text-xs text-emerald-600 font-semibold mt-2">{card.change}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100/80 p-1 rounded-2xl w-fit">
        {(['classes', 'subjects', 'curriculum', 'results'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Classes Tab */}
      {activeTab === 'classes' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Class</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Arm</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Students</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Class Teacher</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Avg. Score</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Performance</th>
                </tr>
              </thead>
              <tbody>
                {classes.map(cls => (
                  <tr key={cls.name} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">{cls.name.slice(0, 2)}</div>
                        <span className="font-bold text-slate-900">{cls.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600">{cls.arm}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-700">{cls.students}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{cls.teacher}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${cls.termAvg >= 75 ? 'text-emerald-600' : cls.termAvg >= 65 ? 'text-amber-600' : 'text-rose-600'}`}>{cls.termAvg}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${cls.termAvg >= 75 ? 'bg-emerald-500' : cls.termAvg >= 65 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${cls.termAvg}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subjects Tab */}
      {activeTab === 'subjects' && (
        <div className="grid md:grid-cols-2 gap-4">
          {subjects.map((sub, i) => (
            <div key={sub.code} className={`bg-white rounded-2xl border border-slate-200/80 p-5 hover:shadow-lg transition-all group animate-fadeInUp stagger-${Math.min(i + 1, 6)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold shadow-md">{sub.code}</div>
                  <div>
                    <h4 className="font-bold text-slate-900">{sub.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{sub.teachers} teachers · {sub.classes} classes</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${parseFloat(sub.trend) >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {parseFloat(sub.trend) >= 0 ? '↑' : '↓'} {sub.trend}%
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-500">Average Score</span>
                  <span className="font-bold text-slate-900">{sub.avgScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style={{ width: `${sub.avgScore}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Curriculum Tab */}
      {activeTab === 'curriculum' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8">
          <div className="text-center">
            <span className="text-4xl mb-4 block">📋</span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Curriculum Management</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">Upload and manage your school&apos;s curriculum, lesson plans, and scheme of work for each term.</p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all">Upload Curriculum</button>
              <button className="border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all">View Templates</button>
            </div>
          </div>
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8">
          <div className="text-center">
            <span className="text-4xl mb-4 block">📊</span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Results & Report Cards</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">Generate report cards, view class rankings, and export results for all classes.</p>
            <div className="mt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { label: 'Class Reports', icon: '📄', count: '10 ready' },
                { label: 'Report Cards', icon: '🎓', count: '340 generated' },
                { label: 'Exports', icon: '📥', count: '5 this week' },
              ].map(item => (
                <div key={item.label} className="bg-slate-50 rounded-2xl p-4 text-center">
                  <span className="text-2xl block mb-2">{item.icon}</span>
                  <div className="text-sm font-bold text-slate-900">{item.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
