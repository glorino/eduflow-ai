// ============================================================
// Premium SVG Illustrations — EduFlow AI
// ============================================================

export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="800" height="600" rx="24" fill="url(#heroGrad)"/>
      {/* Dashboard frame */}
      <rect x="60" y="40" width="680" height="520" rx="20" fill="white" stroke="#e2e8f0" strokeWidth="2"/>
      {/* Title bar */}
      <rect x="60" y="40" width="680" height="52" rx="20" fill="#f8fafc"/>
      <rect x="60" y="72" width="680" height="1" fill="#e2e8f0"/>
      <circle cx="92" cy="66" r="6" fill="#f87171"/>
      <circle cx="112" cy="66" r="6" fill="#fbbf24"/>
      <circle cx="132" cy="66" r="6" fill="#34d399"/>
      <text x="400" y="70" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600">EduFlow AI Dashboard</text>
      {/* Sidebar */}
      <rect x="60" y="92" width="160" height="468" fill="#f8fafc"/>
      <rect x="220" y="92" width="1" fill="#e2e8f0"/>
      {/* Sidebar items */}
      {[0,1,2,3,4,5,6].map(i => (
        <g key={i}>
          <rect x="72" y={108 + i * 36} width={i === 0 ? 136 : 120} height="28" rx="8" fill={i === 0 ? 'url(#sideActive)' : 'transparent'}/>
          <circle cx="92" cy={122 + i * 36} r="6" fill={i === 0 ? '#3b82f6' : ['#94a3b8','#8b5cf6','#f59e0b','#10b981','#ef4444','#06b6d4','#ec4899'][i]}/>
          <rect x="106" y={119 + i * 36} width="60" height="6" rx="3" fill={i === 0 ? '#3b82f6' : '#cbd5e1'}/>
        </g>
      ))}
      {/* Main content area */}
      {/* Stat cards row */}
      {[
        { x: 240, color: '#3b82f6', light: '#eff6ff', label: 'Students', value: '2,847' },
        { x: 410, color: '#8b5cf6', light: '#f5f3ff', label: 'Teachers', value: '156' },
        { x: 580, color: '#10b981', light: '#ecfdf5', label: 'Revenue', value: '₦12.5M' },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y="108" width="150" height="80" rx="12" fill={c.light} stroke={c.color} strokeWidth="1" strokeOpacity="0.3"/>
          <rect x={c.x + 14} y="120" width="32" height="32" rx="8" fill={c.color}/>
          <text x={c.x + 14} y="130" fill="white" fontSize="8" fontWeight="700" x={c.x + 22} y="142" textAnchor="middle">✓</text>
          <rect x={c.x + 14} y="160" width="60" height="8" rx="4" fill={c.color} fillOpacity="0.8"/>
          <text x={c.x + 14} y="180" fill="#64748b" fontSize="9">{c.label}</text>
          <text x={c.x + 80} y="168" fill="#1e293b" fontSize="14" fontWeight="800">{c.value}</text>
        </g>
      ))}
      {/* Chart area */}
      <rect x="240" y="210" width="340" height="200" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="260" y="238" fill="#1e293b" fontSize="12" fontWeight="700">Performance Overview</text>
      {/* Bar chart */}
      {[0,1,2,3,4,5,6].map(i => {
        const heights = [60,85,72,95,68,88,78]
        const colors = ['#3b82f6','#8b5cf6','#10b981','#f59e0b','#ef4444','#06b6d4','#ec4899']
        return (
          <g key={i}>
            <rect x={270 + i * 42} y={390 - heights[i]} width="28" height={heights[i]} rx="6" fill={colors[i]} fillOpacity="0.85"/>
            <text x={284 + i * 42} y={398} textAnchor="middle" fill="#94a3b8" fontSize="8">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</text>
          </g>
        )
      })}
      {/* Donut chart */}
      <circle cx="640" cy="300" r="70" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <circle cx="640" cy="300" r="55" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="140 210" strokeDashoffset="0"/>
      <circle cx="640" cy="300" r="55" fill="none" stroke="#8b5cf6" strokeWidth="12" strokeDasharray="90 210" strokeDashoffset="-140"/>
      <circle cx="640" cy="300" r="55" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="50 210" strokeDashoffset="-230"/>
      <circle cx="640" cy="300" r="35" fill="white"/>
      <text x="640" y="298" textAnchor="middle" fill="#1e293b" fontSize="16" fontWeight="800">89%</text>
      <text x="640" y="312" textAnchor="middle" fill="#94a3b8" fontSize="8">Pass Rate</text>
      {/* Legend */}
      {[0,1,2].map(i => (
        <g key={i}>
          <circle cx={590 + i * 50} cy="385" r="4" fill={['#3b82f6','#8b5cf6','#10b981'][i]}/>
          <text x={598 + i * 50} y="388" fill="#64748b" fontSize="8">{['Present','Late','Absent'][i]}</text>
        </g>
      ))}
      {/* Bottom section - AI Agent status */}
      <rect x="240" y="430" width="500" height="100" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="260" y="458" fill="#1e293b" fontSize="12" fontWeight="700">AI Agents Status</text>
      {[
        { x: 260, icon: '📝', name: 'Admission', status: 'Active', color: '#3b82f6' },
        { x: 380, icon: '💰', name: 'Finance', status: 'Active', color: '#10b981' },
        { x: 500, icon: '📋', name: 'Attendance', status: 'Active', color: '#f59e0b' },
        { x: 620, icon: '🤖', name: 'CBT', status: 'Active', color: '#8b5cf6' },
      ].map((a, i) => (
        <g key={i}>
          <circle cx={a.x + 20} cy="490" r="16" fill={a.color} fillOpacity="0.1"/>
          <text x={a.x + 20} y="495" textAnchor="middle" fontSize="14">{a.icon}</text>
          <text x={a.x + 20} y="515" textAnchor="middle" fill="#1e293b" fontSize="9" fontWeight="600">{a.name}</text>
          <circle cx={a.x + 45} cy="480" r="4" fill="#10b981"/>
          <text x={a.x + 45} y="476" textAnchor="middle" fill="#10b981" fontSize="6">{a.status}</text>
        </g>
      ))}
      <defs>
        <linearGradient id="heroGrad" x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
          <stop stopColor="#eff6ff"/>
          <stop offset="1" stopColor="#f5f3ff"/>
        </linearGradient>
        <linearGradient id="sideActive" x1="0" y1="0" x2="136" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#eff6ff"/>
          <stop offset="1" stopColor="#f5f3ff"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function DashboardPreview({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 400" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="400" rx="16" fill="url(#dashGrad)"/>
      <rect x="8" y="8" width="584" height="384" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="1.5"/>
      {/* Mini sidebar */}
      <rect x="8" y="8" width="120" height="384" rx="12" fill="#f8fafc"/>
      <rect x="8" y="8" width="120" height="44" rx="12" fill="#f1f5f9"/>
      <circle cx="30" cy="30" r="10" fill="url(#logoGrad)"/>
      <text x="30" y="34" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">E</text>
      <text x="48" y="33" fill="#1e293b" fontSize="9" fontWeight="700">EduFlow</text>
      {[0,1,2,3,4].map(i => (
        <rect key={i} x="16" y={62 + i * 32} width={i === 0 ? 104 : 88} height="24" rx="6" fill={i === 0 ? 'url(#sideActive2)' : 'transparent'}/>
      ))}
      {/* Content */}
      <rect x="144" y="24" width="160" height="64" rx="10" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1"/>
      <rect x="160" y="36" width="80" height="8" rx="4" fill="#3b82f6" fillOpacity="0.6"/>
      <rect x="160" y="52" width="50" height="14" rx="4" fill="#1e293b"/>
      <rect x="160" y="70" width="70" height="6" rx="3" fill="#94a3b8"/>
      <rect x="320" y="24" width="160" height="64" rx="10" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1"/>
      <rect x="336" y="36" width="80" height="8" rx="4" fill="#8b5cf6" fillOpacity="0.6"/>
      <rect x="336" y="52" width="50" height="14" rx="4" fill="#1e293b"/>
      <rect x="336" y="70" width="70" height="6" rx="3" fill="#94a3b8"/>
      {/* Chart */}
      <rect x="144" y="100" width="340" height="180" rx="10" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      {[0,1,2,3,4,5,6].map(i => {
        const h = [40,65,52,75,45,70,55][i]
        const c = ['#3b82f6','#8b5cf6','#10b981','#f59e0b','#ef4444','#06b6d4','#ec4899'][i]
        return <rect key={i} x={168 + i * 44} y={260 - h} width="24" height={h} rx="5" fill={c} fillOpacity="0.8"/>
      })}
      {/* Donut */}
      <circle cx="540" cy="190" r="55" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <circle cx="540" cy="190" r="42" fill="none" stroke="#3b82f6" strokeWidth="10" strokeDasharray="110 160"/>
      <circle cx="540" cy="190" r="42" fill="none" stroke="#8b5cf6" strokeWidth="10" strokeDasharray="60 160" strokeDashoffset="-110"/>
      <circle cx="540" cy="190" r="42" fill="none" stroke="#10b981" strokeWidth="10" strokeDasharray="30 160" strokeDashoffset="-170"/>
      <circle cx="540" cy="190" r="28" fill="white"/>
      {/* Bottom cards */}
      {[0,1,2,3].map(i => {
        const colors = ['#3b82f6','#8b5cf6','#10b981','#f59e0b']
        return (
          <rect key={i} x={144 + i * 100} y="300" width="88" height="72" rx="8" fill="white" stroke={colors[i]} strokeWidth="1" strokeOpacity="0.3"/>
        )
      })}
      <defs>
        <linearGradient id="dashGrad" x1="0" y1="0" x2="600" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f8fafc"/><stop offset="1" stopColor="#f1f5f9"/>
        </linearGradient>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="20" y2="20"><stop stopColor="#3b82f6"/><stop offset="1" stopColor="#8b5cf6"/></linearGradient>
        <linearGradient id="sideActive2" x1="0" y1="0" x2="104" y2="0"><stop stopColor="#eff6ff"/><stop offset="1" stopColor="#f5f3ff"/></linearGradient>
      </defs>
    </svg>
  );
}

export function AIBrainIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 400" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="400" rx="24" fill="url(#aiBg)"/>
      {/* Central brain node */}
      <circle cx="250" cy="200" r="60" fill="url(#brainGrad)" stroke="white" strokeWidth="3" strokeOpacity="0.3"/>
      <text x="250" y="195" textAnchor="middle" fill="white" fontSize="28">🧠</text>
      <text x="250" y="215" textAnchor="middle" fill="white" fontSize="9" fontWeight="600" fillOpacity="0.8">AI Core</text>
      {/* Orbital rings */}
      <ellipse cx="250" cy="200" rx="120" ry="80" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="4 4"/>
      <ellipse cx="250" cy="200" rx="170" ry="110" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="4 4"/>
      {/* Agent nodes */}
      {[
        { x: 130, y: 100, icon: '📝', name: 'Admission', color: '#3b82f6' },
        { x: 370, y: 100, icon: '📚', name: 'Academic', color: '#8b5cf6' },
        { x: 100, y: 240, icon: '💰', name: 'Finance', color: '#10b981' },
        { x: 400, y: 240, icon: '📋', name: 'Attendance', color: '#f59e0b' },
        { x: 150, y: 340, icon: '💻', name: 'CBT', color: '#06b6d4' },
        { x: 350, y: 340, icon: '📖', name: 'Library', color: '#ec4899' },
      ].map((node, i) => (
        <g key={i}>
          {/* Connection line */}
          <line x1="250" y1="200" x2={node.x} y2={node.y} stroke="white" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 3"/>
          {/* Glow */}
          <circle cx={node.x} cy={node.y} r="32" fill={node.color} fillOpacity="0.1"/>
          {/* Node */}
          <circle cx={node.x} cy={node.y} r="26" fill={node.color}/>
          <text x={node.x} y={node.y + 5} textAnchor="middle" fill="white" fontSize="18">{node.icon}</text>
          <text x={node.x} y={node.y + 42} textAnchor="middle" fill="white" fontSize="9" fontWeight="600" fillOpacity="0.9">{node.name}</text>
        </g>
      ))}
      {/* Data flow particles */}
      {[0,1,2,3,4,5].map(i => {
        const angle = (i * 60) * Math.PI / 180
        const r = 100 + (i % 2) * 30
        return <circle key={i} cx={250 + Math.cos(angle) * r} cy={200 + Math.sin(angle) * r} r="3" fill="white" fillOpacity="0.4"/>
      })}
      <defs>
        <linearGradient id="aiBg" x1="0" y1="0" x2="500" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e293b"/><stop offset="1" stopColor="#0f172a"/>
        </linearGradient>
        <radialGradient id="brainGrad" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
          <stop stopColor="#8b5cf6"/><stop offset="1" stopColor="#6366f1"/>
        </radialGradient>
      </defs>
    </svg>
  );
}

export function MultiCampusIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 400" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="400" rx="24" fill="url(#mcBg)"/>
      {/* Connection lines */}
      <line x1="250" y1="120" x2="120" y2="280" stroke="white" strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="6 4"/>
      <line x1="250" y1="120" x2="380" y2="280" stroke="white" strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="6 4"/>
      <line x1="120" y1="280" x2="380" y2="280" stroke="white" strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="6 4"/>
      {/* Central hub */}
      <circle cx="250" cy="120" r="50" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="2" strokeOpacity="0.3"/>
      <circle cx="250" cy="120" r="35" fill="url(#hubGrad)"/>
      <text x="250" y="116" textAnchor="middle" fill="white" fontSize="22">🏫</text>
      <text x="250" y="132" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">HQ</text>
      {/* Campus 1 */}
      <circle cx="120" cy="280" r="45" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="2" strokeOpacity="0.3"/>
      <circle cx="120" cy="280" r="30" fill="#3b82f6"/>
      <text x="120" y="276" textAnchor="middle" fill="white" fontSize="18">🏛️</text>
      <text x="120" y="292" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">Campus A</text>
      <text x="120" y="335" textAnchor="middle" fill="white" fontSize="9" fillOpacity="0.7">1,200 students</text>
      {/* Campus 2 */}
      <circle cx="380" cy="280" r="45" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="2" strokeOpacity="0.3"/>
      <circle cx="380" cy="280" r="30" fill="#8b5cf6"/>
      <text x="380" y="276" textAnchor="middle" fill="white" fontSize="18">🏛️</text>
      <text x="380" y="292" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">Campus B</text>
      <text x="380" y="335" textAnchor="middle" fill="white" fontSize="9" fillOpacity="0.7">850 students</text>
      {/* Data sync indicator */}
      <rect x="190" y="180" width="120" height="28" rx="14" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="1" strokeOpacity="0.3"/>
      <text x="250" y="198" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">⚡ Real-time Sync</text>
      {/* Stats */}
      <rect x="30" y="360" width="440" height="30" rx="8" fill="white" fillOpacity="0.08"/>
      {['3 Campuses', '2,050 Students', '156 Teachers', '99.9% Uptime'].map((s, i) => (
        <text key={i} x={100 + i * 110} y="380" textAnchor="middle" fill="white" fontSize="9" fontWeight="600" fillOpacity="0.8">{s}</text>
      ))}
      <defs>
        <linearGradient id="mcBg" x1="0" y1="0" x2="500" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e293b"/><stop offset="1" stopColor="#0f172a"/>
        </linearGradient>
        <radialGradient id="hubGrad" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
          <stop stopColor="#6366f1"/><stop offset="1" stopColor="#4f46e5"/>
        </radialGradient>
      </defs>
    </svg>
  );
}

export function MobileAppIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 500" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Phone frame */}
      <rect x="40" y="20" width="220" height="460" rx="32" fill="url(#phoneGrad)" stroke="#e2e8f0" strokeWidth="2"/>
      <rect x="44" y="24" width="212" height="452" rx="30" fill="#f8fafc"/>
      {/* Notch */}
      <rect x="110" y="24" width="80" height="24" rx="12" fill="#1e293b"/>
      <circle cx="150" cy="36" r="4" fill="#334155"/>
      {/* Status bar */}
      <text x="60" y="40" fill="#94a3b8" fontSize="8">9:41</text>
      <text x="230" y="40" fill="#94a3b8" fontSize="8">100%</text>
      {/* App header */}
      <rect x="60" y="60" width="180" height="40" rx="8" fill="url(#appHeaderGrad)"/>
      <text x="80" y="84" fill="white" fontSize="12" fontWeight="700">EduFlow AI</text>
      <text x="210" y="84" fill="white" fontSize="8" fillOpacity="0.7">Profile</text>
      {/* Welcome card */}
      <rect x="60" y="112" width="180" height="60" rx="10" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="76" y="132" fill="#1e293b" fontSize="10" fontWeight="700">Good morning! 👋</text>
      <text x="76" y="148" fill="#64748b" fontSize="8">Chidera Okonkwo</text>
      <text x="76" y="162" fill="#94a3b8" fontSize="7">SS 2A · Reg: STD-2025-0042</text>
      {/* Stats row */}
      <rect x="60" y="184" width="84" height="48" rx="8" fill="#eff6ff"/>
      <text x="102" y="204" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="800">85%</text>
      <text x="102" y="220" textAnchor="middle" fill="#64748b" fontSize="7">Attendance</text>
      <rect x="156" y="184" width="84" height="48" rx="8" fill="#f5f3ff"/>
      <text x="198" y="204" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="800">A-</text>
      <text x="198" y="220" textAnchor="middle" fill="#64748b" fontSize="7">Grade</text>
      {/* Quick actions */}
      <text x="76" y="256" fill="#1e293b" fontSize="9" fontWeight="700">Quick Actions</text>
      {[
        { x: 60, icon: '💻', label: 'CBT Exam', color: '#eff6ff', text: '#3b82f6' },
        { x: 112, icon: '📖', label: 'Library', color: '#f5f3ff', text: '#8b5cf6' },
        { x: 164, icon: '💰', label: 'Fees', color: '#ecfdf5', text: '#10b981' },
        { x: 216, icon: '📋', label: 'Attend', color: '#fff7ed', text: '#f59e0b' },
      ].map((a, i) => (
        <g key={i}>
          <rect x={a.x} y="264" width="44" height="44" rx="10" fill={a.color}/>
          <text x={a.x + 22} y="284" textAnchor="middle" fontSize="16">{a.icon}</text>
          <text x={a.x + 22} y="300" textAnchor="middle" fill={a.text} fontSize="6" fontWeight="600">{a.label}</text>
        </g>
      ))}
      {/* Recent activity */}
      <text x="76" y="332" fill="#1e293b" fontSize="9" fontWeight="700">Recent Activity</text>
      {[
        { time: '2 min ago', text: 'Attendance marked', color: '#10b981' },
        { time: '1 hr ago', text: 'CBT score: 85%', color: '#3b82f6' },
        { time: '3 hrs ago', text: 'Fee payment ₦50K', color: '#8b5cf6' },
      ].map((a, i) => (
        <g key={i}>
          <circle cx="80" cy={350 + i * 28} r="3" fill={a.color}/>
          <text x="90" y={354 + i * 28} fill="#1e293b" fontSize="8">{a.text}</text>
          <text x="230" y={354 + i * 28} fill="#94a3b8" fontSize="6" textAnchor="end">{a.time}</text>
        </g>
      ))}
      {/* Bottom nav */}
      <rect x="44" y="430" width="212" height="46" rx="0 0 30 30" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      {['🏠', '📊', '💬', '👤'].map((icon, i) => (
        <text key={i} x={90 + i * 44} y="458" textAnchor="middle" fontSize="16" fillOpacity={i === 0 ? 1 : 0.4}>{icon}</text>
      ))}
      <defs>
        <linearGradient id="phoneGrad" x1="40" y1="20" x2="260" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f1f5f9"/><stop offset="1" stopColor="#e2e8f0"/>
        </linearGradient>
        <linearGradient id="appHeaderGrad" x1="60" y1="60" x2="240" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6"/><stop offset="1" stopColor="#6366f1"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function StatsInfographic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 900 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="900" height="200" rx="20" fill="url(#statsBg)"/>
      {[
        { x: 60, icon: '🏫', value: '5,000+', label: 'Schools', color: '#3b82f6', light: '#eff6ff' },
        { x: 270, icon: '👨‍🎓', value: '5M+', label: 'Students', color: '#8b5cf6', light: '#f5f3ff' },
        { x: 480, icon: '🤖', value: '10', label: 'AI Agents', color: '#10b981', light: '#ecfdf5' },
        { x: 690, icon: '📊', value: '13', label: 'Modules', color: '#f59e0b', light: '#fffbeb' },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="30" width="170" height="140" rx="16" fill={s.light} stroke={s.color} strokeWidth="1.5" strokeOpacity="0.2"/>
          <circle cx={s.x + 85} cy="75" r="28" fill={s.color} fillOpacity="0.15"/>
          <text x={s.x + 85} y="84" textAnchor="middle" fontSize="28">{s.icon}</text>
          <text x={s.x + 85} y="125" textAnchor="middle" fill={s.color} fontSize="28" fontWeight="900">{s.value}</text>
          <text x={s.x + 85} y="150" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="600">{s.label}</text>
        </g>
      ))}
      <defs>
        <linearGradient id="statsBg" x1="0" y1="0" x2="900" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f8fafc"/><stop offset="1" stopColor="#f1f5f9"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function WorkflowIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 900 300" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="900" height="300" rx="24" fill="url(#wfBg)"/>
      {[
        { x: 80, icon: '✍️', title: 'Sign Up', desc: 'Create account\nin 2 min', color: '#3b82f6', step: '1' },
        { x: 290, icon: '📤', title: 'Import Data', desc: 'Upload students\n& teachers', color: '#8b5cf6', step: '2' },
        { x: 500, icon: '⚙️', title: 'Configure', desc: 'Set terms &\ncampus', color: '#10b981', step: '3' },
        { x: 710, icon: '🚀', title: 'Go Live', desc: 'AI agents\nactive day 1', color: '#f59e0b', step: '4' },
      ].map((s, i) => (
        <g key={i}>
          {/* Connection arrows */}
          {i < 3 && <line x1={s.x + 150} y1="150" x2={s.x + 210} y2="150" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4"/>}
          {i < 3 && <polygon points={`${s.x + 200},145 ${s.x + 210},150 ${s.x + 200},155`} fill="#cbd5e1"/>}
          {/* Card */}
          <rect x={s.x} y="50" width="160" height="200" rx="16" fill="white" stroke={s.color} strokeWidth="1.5" strokeOpacity="0.2"/>
          {/* Step number */}
          <circle cx={s.x + 80} cy="90" r="24" fill={s.color}/>
          <text x={s.x + 80} y="88" textAnchor="middle" fill="white" fontSize="18" fontWeight="800">{s.icon}</text>
          <text x={s.x + 80} y="100" textAnchor="middle" fill="white" fontSize="7" fontWeight="600" fillOpacity="0.8">Step {s.step}</text>
          {/* Title & desc */}
          <text x={s.x + 80} y="140" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="800">{s.title}</text>
          {s.desc.split('\n').map((line, j) => (
            <text key={j} x={s.x + 80} y={160 + j * 14} textAnchor="middle" fill="#64748b" fontSize="11">{line}</text>
          ))}
          {/* Bottom indicator */}
          <rect x={s.x + 60} y="220" width="40" height="4" rx="2" fill={s.color} fillOpacity="0.3"/>
        </g>
      ))}
      <defs>
        <linearGradient id="wfBg" x1="0" y1="0" x2="900" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f8fafc"/><stop offset="1" stopColor="#f1f5f9"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
