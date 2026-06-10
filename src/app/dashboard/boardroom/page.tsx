'use client';

import { useState } from 'react';

const mockData = {
  totalRevenue: 32500000,
  revenueGrowth: 18,
  collectionEfficiency: 65,
  dropoutRiskCount: 7,
  executiveHealthScore: 78,
  revenueStability: 82,
  totalStudents: 2847,
  totalTeachers: 156,
  monthlyRevenue: [
    { month: 'Jan', revenue: 2100000 },
    { month: 'Feb', revenue: 2800000 },
    { month: 'Mar', revenue: 3200000 },
    { month: 'Apr', revenue: 2900000 },
    { month: 'May', revenue: 3500000 },
    { month: 'Jun', revenue: 2400000 },
    { month: 'Jul', revenue: 1800000 },
    { month: 'Aug', revenue: 3100000 },
    { month: 'Sep', revenue: 3400000 },
    { month: 'Oct', revenue: 2700000 },
    { month: 'Nov', revenue: 3000000 },
    { month: 'Dec', revenue: 1500000 },
  ],
};

function formatCurrency(amount: number) {
  if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `₦${(amount / 1000).toFixed(0)}K`;
  return `₦${amount.toLocaleString()}`;
}

function HealthGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (circumference * score) / 100;
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative w-48 h-48">
      <svg width="192" height="192" className="-rotate-90">
        <circle cx="96" cy="96" r="70" fill="none" stroke="#e2e8f0" strokeWidth="12" />
        <circle
          cx="96"
          cy="96"
          r="70"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold text-slate-900">{score}</span>
        <span className="text-xs text-slate-500 font-medium mt-1">Health Score</span>
      </div>
    </div>
  );
}

export default function BoardroomPage() {
  const [data] = useState(mockData);
  const maxRevenue = Math.max(...data.monthlyRevenue.map(m => m.revenue));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-violet-950 rounded-3xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🏛️</span>
            <span className="text-sm text-white/60 font-medium">Executive Intelligence</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-2">Executive Boardroom</h2>
          <p className="text-white/50 max-w-lg text-sm">
            Real-time school performance metrics and financial intelligence for leadership决策.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {[
          { title: 'Total Revenue', value: formatCurrency(data.totalRevenue), icon: '💰', gradient: 'from-emerald-500 to-teal-600', lightBg: 'bg-emerald-50', change: '+18.3%', positive: true },
          { title: 'Revenue Growth', value: `${data.revenueGrowth}%`, icon: '📈', gradient: 'from-blue-500 to-indigo-600', lightBg: 'bg-blue-50', change: '+5.2%', positive: true },
          { title: 'Collection Rate', value: `${data.collectionEfficiency}%`, icon: '🎯', gradient: 'from-violet-500 to-purple-600', lightBg: 'bg-violet-50', change: '+3.1%', positive: true },
          { title: 'Dropout Risk', value: data.dropoutRiskCount.toString(), icon: '⚠️', gradient: 'from-amber-500 to-orange-500', lightBg: 'bg-amber-50', change: '-2', positive: false },
          { title: 'Health Score', value: `${data.executiveHealthScore}/100`, icon: '🏥', gradient: 'from-rose-500 to-pink-500', lightBg: 'bg-rose-50', change: '+4', positive: true },
        ].map((stat, i) => (
          <div key={stat.title} className={`relative overflow-hidden rounded-2xl border border-slate-200/60 p-5 bg-white group hover:shadow-xl transition-all duration-300`}>
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`} />
            <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-10 ${stat.lightBg} group-hover:scale-150 transition-all duration-500`} />
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</span>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-lg shadow-lg group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{stat.value}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-bold ${stat.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stat.positive ? '↑' : '↓'} {stat.change}
                </span>
                <span className="text-[11px] text-slate-400">vs last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Monthly Revenue</h3>
              <p className="text-xs text-slate-500 mt-0.5">Revenue trend for {new Date().getFullYear()}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Total:</span>
              <span className="text-sm font-bold text-slate-900">{formatCurrency(data.totalRevenue)}</span>
            </div>
          </div>
          <div className="flex items-end gap-2 h-52">
            {data.monthlyRevenue.map((item, i) => {
              const h = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;
              const isMax = item.revenue === maxRevenue;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <span className="text-[10px] font-semibold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {formatCurrency(item.revenue)}
                  </span>
                  <div
                    className="w-full max-w-[40px] rounded-t-lg transition-all duration-500 group-hover:opacity-80"
                    style={{
                      height: `${Math.max(h, 4)}%`,
                      background: isMax
                        ? 'linear-gradient(180deg, #6366f1, #4f46e5)'
                        : 'linear-gradient(180deg, #e2e8f0, #cbd5e1)',
                    }}
                  />
                  <span className="text-[10px] text-slate-400">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Health Gauge + Stats */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-1">School Health</h3>
          <p className="text-xs text-slate-500 mb-6">Executive performance index</p>
          <div className="flex justify-center">
            <HealthGauge score={data.executiveHealthScore} />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-3 bg-slate-50 rounded-xl">
              <div className="text-lg font-bold text-slate-900">{data.revenueStability}%</div>
              <div className="text-[11px] text-slate-500">Revenue Stability</div>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-xl">
              <div className="text-lg font-bold text-slate-900">{data.collectionEfficiency}%</div>
              <div className="text-[11px] text-slate-500">Collection Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Student & Teacher Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: 'Active Students', value: data.totalStudents.toLocaleString(), icon: '🎓', gradient: 'from-blue-500 to-blue-600', lightBg: 'bg-blue-50', subtitle: 'Enrolled this term' },
          { title: 'Active Teachers', value: data.totalTeachers.toLocaleString(), icon: '👩‍🏫', gradient: 'from-violet-500 to-purple-600', lightBg: 'bg-violet-50', subtitle: 'Across all campuses' },
          { title: 'Revenue Target', value: '₦50M', icon: '🎯', gradient: 'from-emerald-500 to-teal-600', lightBg: 'bg-emerald-50', subtitle: `${data.collectionEfficiency}% achieved` },
          { title: 'At-Risk Students', value: data.dropoutRiskCount.toString(), icon: '⚠️', gradient: 'from-amber-500 to-orange-500', lightBg: 'bg-amber-50', subtitle: 'High absence rate' },
        ].map((stat, i) => (
          <div key={stat.title} className={`relative overflow-hidden rounded-2xl border border-slate-200/60 p-5 bg-white group hover:shadow-xl transition-all duration-300`}>
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`} />
            <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-10 ${stat.lightBg} group-hover:scale-150 transition-all duration-500`} />
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</span>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-lg shadow-lg group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">{stat.value}</div>
              <div className="text-[11px] text-slate-400">{stat.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Insights */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">Executive Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '📊', title: 'Revenue Analysis', desc: `Year-to-date revenue stands at ${formatCurrency(data.totalRevenue)} with ${data.revenueGrowth}% growth.`, color: 'from-emerald-500 to-teal-500' },
            { icon: '🎯', title: 'Collection Efficiency', desc: `${data.collectionEfficiency}% of expected fees collected. Focus on outstanding balances.`, color: 'from-blue-500 to-indigo-500' },
            { icon: '⚠️', title: 'Risk Assessment', desc: `${data.dropoutRiskCount} students flagged with high absence rates requiring immediate intervention.`, color: 'from-amber-500 to-orange-500' },
          ].map((insight) => (
            <div key={insight.title} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${insight.color} flex items-center justify-center text-lg flex-shrink-0 shadow-sm`}>
                {insight.icon}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{insight.title}</div>
                <div className="text-xs text-slate-500 mt-1 leading-relaxed">{insight.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
