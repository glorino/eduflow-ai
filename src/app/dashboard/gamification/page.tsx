'use client';

import { useState } from 'react';
import { PageHeader, Badge, Table, StatCard, Card, ProgressBar } from '@/components/ui';

// ============================================================
// MOCK DATA (to be replaced with real API calls)
// ============================================================

const MOCK_XP_SUMMARY = {
  totalXP: 2340,
  rank: {
    title: 'Rising Star',
    icon: '⭐',
    color: '#059669',
    progress: 56,
    nextRank: { title: 'Academic Champion', xpNeeded: 660 },
  },
  thisWeekXP: 280,
  streak: { current: 12, longest: 18, totalDays: 47 },
};

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Emeka Okonkwo', class: 'SS3A', totalXP: 4850, rankTitle: 'Elite Scholar', rankIcon: '👑', isCurrentUser: false },
  { rank: 2, name: 'Aisha Bello', class: 'SS2B', totalXP: 3920, rankTitle: 'Academic Champion', rankIcon: '🏆', isCurrentUser: false },
  { rank: 3, name: 'Tunde Williams', class: 'SS3A', totalXP: 3150, rankTitle: 'Academic Champion', rankIcon: '🏆', isCurrentUser: false },
  { rank: 4, name: 'Ngozi Eze', class: 'SS1A', totalXP: 2780, rankTitle: 'Rising Star', rankIcon: '⭐', isCurrentUser: false },
  { rank: 5, name: 'Yusuf Abdullahi', class: 'JSS3A', totalXP: 2540, rankTitle: 'Rising Star', rankIcon: '⭐', isCurrentUser: false },
  { rank: 6, name: 'Chioma Nwosu', class: 'SS2A', totalXP: 2340, rankTitle: 'Rising Star', rankIcon: '⭐', isCurrentUser: true },
  { rank: 7, name: 'Fatima Hassan', class: 'JSS2B', totalXP: 2100, rankTitle: 'Rising Star', rankIcon: '⭐', isCurrentUser: false },
  { rank: 8, name: 'Olumide Adeyemi', class: 'SS1B', totalXP: 1890, rankTitle: 'Rising Star', rankIcon: '⭐', isCurrentUser: false },
  { rank: 9, name: 'Zainab Mohammed', class: 'JSS3B', totalXP: 1650, rankTitle: 'Rising Star', rankIcon: '⭐', isCurrentUser: false },
  { rank: 10, name: 'Chidi Okoro', class: 'SS3B', totalXP: 1420, rankTitle: 'Fast Learner', rankIcon: '🚀', isCurrentUser: false },
];

const MOCK_BADGES = [
  { name: 'First Steps', description: 'Earn your first 10 XP', icon: '🎯', category: 'achievement', color: 'blue', earned: true },
  { name: 'Getting Started', description: 'Earn 50 XP', icon: '📚', category: 'achievement', color: 'blue', earned: true },
  { name: 'Knowledge Seeker', description: 'Earn 100 XP', icon: '🔍', category: 'academic', color: 'violet', earned: true },
  { name: 'Study Master', description: 'Earn 250 XP', icon: '🎓', category: 'academic', color: 'violet', earned: true },
  { name: 'Perfect Attendance', description: 'Earn 500 XP', icon: '📋', category: 'attendance', color: 'green', earned: true },
  { name: 'Academic Star', description: 'Earn 1000 XP', icon: '⭐', category: 'academic', color: 'amber', earned: true },
  { name: 'Honor Roll', description: 'Earn 1500 XP', icon: '🏅', category: 'achievement', color: 'amber', earned: true },
  { name: "Dean's List", description: 'Earn 2500 XP', icon: '📜', category: 'academic', color: 'rose', earned: false },
  { name: 'Scholar Elite', description: 'Earn 3500 XP', icon: '🏆', category: 'achievement', color: 'violet', earned: false },
  { name: 'Legend', description: 'Earn 5000 XP', icon: '👑', category: 'special', color: 'violet', earned: false },
  { name: 'Quiz Whiz', description: 'Complete 5 CBT exams', icon: '💻', category: 'academic', color: 'cyan', earned: true },
  { name: 'Bookworm', description: 'Borrow 10 library books', icon: '📖', category: 'achievement', color: 'emerald', earned: false },
  { name: 'Early Bird', description: '7-day attendance streak', icon: '🌅', category: 'attendance', color: 'amber', earned: true },
  { name: 'Study Champion', description: '14-day study streak', icon: '🔥', category: 'special', color: 'rose', earned: false },
  { name: 'Assignment Ace', description: 'Submit 10 assignments on time', icon: '✍️', category: 'academic', color: 'blue', earned: false },
];

const MOCK_XP_HISTORY = [
  { date: '2026-06-10', source: 'CBT Exam - Physics Quiz', points: 50, icon: '💻' },
  { date: '2026-06-09', source: 'Attendance - Present', points: 10, icon: '📋' },
  { date: '2026-06-09', source: 'Assignment Submitted', points: 25, icon: '✍️' },
  { date: '2026-06-08', source: 'Library Book Borrowed', points: 5, icon: '📖' },
  { date: '2026-06-08', source: 'Attendance - Present', points: 10, icon: '📋' },
  { date: '2026-06-07', source: 'CBT Exam - Chemistry Test', points: 45, icon: '💻' },
  { date: '2026-06-07', source: 'Attendance - Present', points: 10, icon: '📋' },
  { date: '2026-06-06', source: 'Study Streak Bonus (7 days)', points: 100, icon: '🔥' },
  { date: '2026-06-06', source: 'Attendance - Present', points: 10, icon: '📋' },
  { date: '2026-06-05', source: 'Attendance - Present', points: 10, icon: '📋' },
];

const badgeColorMap: Record<string, 'blue' | 'green' | 'amber' | 'red' | 'violet' | 'slate' | 'cyan'> = {
  blue: 'blue', green: 'green', amber: 'amber', red: 'red', violet: 'violet', slate: 'slate', cyan: 'cyan',
  emerald: 'green', rose: 'red',
};

const rankBadgeColors: Record<string, 'blue' | 'green' | 'amber' | 'red' | 'violet' | 'slate' | 'cyan'> = {
  'Elite Scholar': 'violet',
  'Academic Champion': 'blue',
  'Rising Star': 'green',
  'Fast Learner': 'amber',
  'Beginner': 'slate',
};

export default function GamificationPage() {
  const [activeTab, setActiveTab] = useState<'badges' | 'leaderboard' | 'history'>('badges');

  const earnedCount = MOCK_BADGES.filter(b => b.earned).length;
  const totalCount = MOCK_BADGES.length;

  const leaderboardColumns = [
    {
      key: 'rank',
      header: '#',
      className: 'w-16',
      render: (row: typeof MOCK_LEADERBOARD[0]) => {
        if (row.rank === 1) return <span className="text-xl">🥇</span>;
        if (row.rank === 2) return <span className="text-xl">🥈</span>;
        if (row.rank === 3) return <span className="text-xl">🥉</span>;
        return <span className="font-bold text-slate-500">{row.rank}</span>;
      },
    },
    {
      key: 'name',
      header: 'Student',
      render: (row: typeof MOCK_LEADERBOARD[0]) => (
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs ${row.isCurrentUser ? 'bg-gradient-to-br from-violet-500 to-purple-600 ring-2 ring-violet-300' : 'bg-gradient-to-br from-slate-400 to-slate-500'}`}>
            {row.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div className={`font-semibold ${row.isCurrentUser ? 'text-violet-700' : 'text-slate-900'}`}>
              {row.name} {row.isCurrentUser && <span className="text-[10px] bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded-full ml-1">You</span>}
            </div>
            <div className="text-xs text-slate-500">{row.class}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'totalXP',
      header: 'Total XP',
      render: (row: typeof MOCK_LEADERBOARD[0]) => (
        <span className="font-bold text-slate-900">{row.totalXP.toLocaleString()}</span>
      ),
    },
    {
      key: 'rankTitle',
      header: 'Rank',
      render: (row: typeof MOCK_LEADERBOARD[0]) => (
        <Badge variant={rankBadgeColors[row.rankTitle] || 'slate'}>{row.rankIcon} {row.rankTitle}</Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gamification"
        subtitle="Track your progress, earn XP, collect badges, and climb the leaderboard"
        icon="🎮"
        breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Gamification' }]}
      />

      {/* XP Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total XP" value={MOCK_XP_SUMMARY.totalXP.toLocaleString()} change={`+${MOCK_XP_SUMMARY.thisWeekXP}`} changeType="positive" icon="⚡" color="violet" subtitle="Lifetime experience points" />
        <StatCard title="Current Rank" value={MOCK_XP_SUMMARY.rank.title} icon={MOCK_XP_SUMMARY.rank.icon} color="green" subtitle={`${MOCK_XP_SUMMARY.rank.progress}% to next rank`} />
        <StatCard title="Study Streak" value={`${MOCK_XP_SUMMARY.streak.current} days`} change={`Best: ${MOCK_XP_SUMMARY.streak.longest}`} changeType="positive" icon="🔥" color="rose" subtitle={`${MOCK_XP_SUMMARY.streak.totalDays} total active days`} />
        <StatCard title="Badges Earned" value={`${earnedCount}/${totalCount}`} change={`${totalCount - earnedCount} remaining`} changeType="neutral" icon="🏅" color="amber" subtitle="Keep earning to unlock more" />
      </div>

      {/* Rank Progress */}
      <Card elevated className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500" />
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 pt-2">
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-4xl shadow-lg shadow-emerald-500/30">
              {MOCK_XP_SUMMARY.rank.icon}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Current Rank</div>
              <div className="text-2xl font-extrabold text-slate-900">{MOCK_XP_SUMMARY.rank.title}</div>
              <div className="text-sm text-slate-500">{MOCK_XP_SUMMARY.totalXP.toLocaleString()} XP earned</div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-600">{MOCK_XP_SUMMARY.rank.title}</span>
              <span className="text-sm font-semibold text-violet-600">{MOCK_XP_SUMMARY.rank.nextRank.title}</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-500 transition-all duration-1000 ease-out"
                style={{ width: `${MOCK_XP_SUMMARY.rank.progress}%` }}
              />
            </div>
            <div className="text-xs text-slate-500 mt-1.5">{MOCK_XP_SUMMARY.rank.nextRank.xpNeeded} XP to next rank</div>
          </div>
          <div className="hidden lg:flex flex-col items-end gap-1 text-right">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Next Rank</div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <span className="text-lg font-bold text-slate-900">{MOCK_XP_SUMMARY.rank.nextRank.title}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {[
          { key: 'badges' as const, label: 'Badges', icon: '🏅' },
          { key: 'leaderboard' as const, label: 'Leaderboard', icon: '🏆' },
          { key: 'history' as const, label: 'XP History', icon: '📊' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Badges Tab */}
      {activeTab === 'badges' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Badge Collection</h3>
              <p className="text-sm text-slate-500">{earnedCount} of {totalCount} badges earned</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {MOCK_BADGES.map((badge, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-5 text-center transition-all duration-300 ${
                  badge.earned
                    ? 'bg-white border-2 border-slate-200 hover:shadow-xl hover:-translate-y-1 hover:border-violet-200'
                    : 'bg-slate-50 border-2 border-dashed border-slate-200 opacity-60 grayscale hover:opacity-80 hover:grayscale-0'
                }`}
              >
                {badge.earned && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg">
                    ✓
                  </div>
                )}
                <div className="text-4xl mb-3">{badge.icon}</div>
                <div className="text-sm font-bold text-slate-900 mb-1">{badge.name}</div>
                <div className="text-xs text-slate-500 mb-3 leading-relaxed">{badge.description}</div>
                <Badge variant={badgeColorMap[badge.color] || 'slate'}>{badge.category}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-4">
          <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">🏆 Top 20 Leaderboard</h3>
            </div>
            <Table columns={leaderboardColumns} data={MOCK_LEADERBOARD as unknown as Record<string, unknown>[]} rowKey="rank" emptyIcon="🏆" />
          </div>
        </div>
      )}

      {/* XP History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-600" />
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">📊 Recent XP Activity</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {MOCK_XP_HISTORY.map((item, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center text-lg">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{item.source}</div>
                      <div className="text-xs text-slate-500">{item.date}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-emerald-600">+{item.points} XP</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
