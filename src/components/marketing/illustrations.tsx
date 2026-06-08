// ============================================================
// Hero Illustration — AI School Dashboard
// ============================================================
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Background shapes */}
      <rect x="100" y="80" width="600" height="420" rx="24" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2"/>
      <rect x="100" y="80" width="600" height="60" rx="24" fill="#f1f5f9"/>
      <rect x="100" y="116" width="600" height="2" fill="#e2e8f0"/>

      {/* Top bar dots */}
      <circle cx="130" cy="110" r="6" fill="#f87171"/>
      <circle cx="152" cy="110" r="6" fill="#fbbf24"/>
      <circle cx="174" cy="110" r="6" fill="#34d399"/>

      {/* Sidebar */}
      <rect x="100" y="140" width="160" height="360" fill="#f1f5f9" rx="0"/>
      <rect x="120" y="160" width="120" height="12" rx="6" fill="#e2e8f0"/>
      <rect x="120" y="190" width="100" height="10" rx="5" fill="#3b82f6"/>
      <rect x="120" y="215" width="110" height="10" rx="5" fill="#e2e8f0"/>
      <rect x="120" y="240" width="90" height="10" rx="5" fill="#e2e8f0"/>
      <rect x="120" y="265" width="105" height="10" rx="5" fill="#e2e8f0"/>
      <rect x="120" y="290" width="95" height="10" rx="5" fill="#e2e8f0"/>
      <rect x="120" y="315" width="100" height="10" rx="5" fill="#e2e8f0"/>

      {/* Main content area — stat cards */}
      <rect x="280" y="155" width="130" height="80" rx="12" fill="white" stroke="#e2e8f0"/>
      <rect x="295" y="170" width="60" height="8" rx="4" fill="#94a3b8"/>
      <rect x="295" y="188" width="80" height="14" rx="4" fill="#1e293b"/>
      <rect x="295" y="210" width="50" height="6" rx="3" fill="#059669"/>
      <rect x="385" y="165" width="28" height="28" rx="8" fill="#eff6ff"/>

      <rect x="425" y="155" width="130" height="80" rx="12" fill="white" stroke="#e2e8f0"/>
      <rect x="440" y="170" width="55" height="8" rx="4" fill="#94a3b8"/>
      <rect x="440" y="188" width="75" height="14" rx="4" fill="#1e293b"/>
      <rect x="440" y="210" width="45" height="6" rx="3" fill="#059669"/>
      <rect x="530" y="165" width="28" height="28" rx="8" fill="#f0fdf4"/>

      <rect x="570" y="155" width="120" height="80" rx="12" fill="white" stroke="#e2e8f0"/>
      <rect x="585" y="170" width="50" height="8" rx="4" fill="#94a3b8"/>
      <rect x="585" y="188" width="70" height="14" rx="4" fill="#1e293b"/>
      <rect x="585" y="210" width="55" height="6" rx="3" fill="#d97706"/>
      <rect x="660" y="165" width="28" height="28" rx="8" fill="#fffbeb"/>

      {/* Chart area */}
      <rect x="280" y="255" width="290" height="180" rx="12" fill="white" stroke="#e2e8f0"/>
      <rect x="295" y="270" width="80" height="8" rx="4" fill="#1e293b"/>
      <rect x="295" y="285" width="120" height="6" rx="3" fill="#94a3b8"/>

      {/* Bar chart */}
      <rect x="310" y="380" width="24" height="40" rx="4" fill="#dbeafe"/>
      <rect x="310" y="360" width="24" height="60" rx="4" fill="#3b82f6"/>
      <rect x="350" y="370" width="24" height="50" rx="4" fill="#dbeafe"/>
      <rect x="350" y="340" width="24" height="80" rx="4" fill="#3b82f6"/>
      <rect x="390" y="375" width="24" height="45" rx="4" fill="#dbeafe"/>
      <rect x="390" y="350" width="24" height="70" rx="4" fill="#3b82f6"/>
      <rect x="430" y="365" width="24" height="55" rx="4" fill="#dbeafe"/>
      <rect x="430" y="330" width="24" height="90" rx="4" fill="#6366f1"/>
      <rect x="470" y="375" width="24" height="45" rx="4" fill="#dbeafe"/>
      <rect x="470" y="345" width="24" height="75" rx="4" fill="#3b82f6"/>
      <rect x="510" y="380" width="24" height="40" rx="4" fill="#dbeafe"/>
      <rect x="510" y="355" width="24" height="65" rx="4" fill="#3b82f6"/>

      {/* Donut chart */}
      <rect x="590" y="255" width="100" height="180" rx="12" fill="white" stroke="#e2e8f0"/>
      <circle cx="640" cy="340" r="35" fill="none" stroke="#e2e8f0" strokeWidth="8"/>
      <circle cx="640" cy="340" r="35" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray="176" strokeDashoffset="30" strokeLinecap="round" transform="rotate(-90 640 340)"/>
      <text x="640" y="344" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="bold">93%</text>
      <rect x="610" y="390" width="60" height="6" rx="3" fill="#e2e8f0"/>
      <rect x="610" y="402" width="40" height="6" rx="3" fill="#e2e8f0"/>

      {/* Floating elements */}
      <rect x="620" y="320" width="40" height="40" rx="10" fill="#3b82f6" opacity="0.1"/>
      <text x="640" y="346" textAnchor="middle" fill="#3b82f6" fontSize="16">📊</text>
    </svg>
  );
}

// ============================================================
// AI Brain Illustration
// ============================================================
export function AIBrainIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="200" r="150" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2"/>
      <circle cx="200" cy="200" r="120" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
      <circle cx="200" cy="200" r="90" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1"/>

      {/* Neural connections */}
      <line x1="200" y1="110" x2="200" y2="290" stroke="#3b82f6" strokeWidth="1" opacity="0.3"/>
      <line x1="110" y1="200" x2="290" y2="200" stroke="#3b82f6" strokeWidth="1" opacity="0.3"/>
      <line x1="140" y1="140" x2="260" y2="260" stroke="#3b82f6" strokeWidth="1" opacity="0.3"/>
      <line x1="260" y1="140" x2="140" y2="260" stroke="#3b82f6" strokeWidth="1" opacity="0.3"/>

      {/* Nodes */}
      <circle cx="200" cy="110" r="10" fill="#3b82f6" stroke="white" strokeWidth="3"/>
      <circle cx="200" cy="290" r="10" fill="#3b82f6" stroke="white" strokeWidth="3"/>
      <circle cx="110" cy="200" r="10" fill="#3b82f6" stroke="white" strokeWidth="3"/>
      <circle cx="290" cy="200" r="10" fill="#3b82f6" stroke="white" strokeWidth="3"/>
      <circle cx="140" cy="140" r="8" fill="#6366f1" stroke="white" strokeWidth="2"/>
      <circle cx="260" cy="140" r="8" fill="#6366f1" stroke="white" strokeWidth="2"/>
      <circle cx="140" cy="260" r="8" fill="#6366f1" stroke="white" strokeWidth="2"/>
      <circle cx="260" cy="260" r="8" fill="#6366f1" stroke="white" strokeWidth="2"/>
      <circle cx="200" cy="200" r="16" fill="url(#brainGrad)" stroke="white" strokeWidth="4"/>

      {/* Floating labels */}
      <rect x="280" y="80" width="80" height="30" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="320" y="100" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">📝 Admission</text>
      <rect x="40" y="120" width="70" height="30" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="75" y="140" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">💰 Finance</text>
      <rect x="290" y="290" width="80" height="30" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="330" y="310" textAnchor="middle" fill="#7c3aed" fontSize="11" fontWeight="bold">📚 Academic</text>
      <rect x="30" y="280" width="80" height="30" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="70" y="300" textAnchor="middle" fill="#d97706" fontSize="11" fontWeight="bold">📋 Attendance</text>

      <defs>
        <linearGradient id="brainGrad" x1="184" y1="184" x2="216" y2="216">
          <stop stopColor="#3b82f6"/>
          <stop offset="1" stopColor="#6366f1"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

// ============================================================
// Dashboard Preview Illustration
// ============================================================
export function DashboardPreview({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 700 460" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <rect x="40" y="50" width="620" height="380" rx="20" fill="#0f172a" opacity="0.08"/>

      {/* Main window */}
      <rect x="30" y="40" width="620" height="380" rx="20" fill="white" stroke="#e2e8f0" strokeWidth="2"/>

      {/* Title bar */}
      <rect x="30" y="40" width="620" height="48" rx="20" fill="#f8fafc"/>
      <rect x="30" y="68" width="620" height="1" fill="#e2e8f0"/>
      <circle cx="60" cy="64" r="5" fill="#f87171"/>
      <circle cx="80" cy="64" r="5" fill="#fbbf24"/>
      <circle cx="100" cy="64" r="5" fill="#34d399"/>
      <rect x="280" y="56" width="140" height="16" rx="4" fill="#e2e8f0"/>
      <text x="350" y="68" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="500">eduflow-ai.vercel.app</text>

      {/* Sidebar */}
      <rect x="30" y="88" width="140" height="332" fill="#f8fafc"/>
      <rect x="30" y="396" width="140" height="24" rx="0" fill="#f8fafc"/>
      <rect x="30" y="88" width="140" height="1" fill="#e2e8f0"/>

      {/* Sidebar items */}
      <rect x="46" y="108" width="108" height="10" rx="3" fill="#3b82f6" opacity="0.15"/>
      <rect x="58" y="111" width="80" height="5" rx="2.5" fill="#3b82f6"/>
      <rect x="46" y="134" width="108" height="10" rx="3" fill="#e2e8f0"/>
      <rect x="46" y="156" width="108" height="10" rx="3" fill="#e2e8f0"/>
      <rect x="46" y="178" width="108" height="10" rx="3" fill="#e2e8f0"/>
      <rect x="46" y="200" width="108" height="10" rx="3" fill="#e2e8f0"/>
      <rect x="46" y="222" width="108" height="10" rx="3" fill="#e2e8f0"/>
      <rect x="46" y="244" width="108" height="10" rx="3" fill="#e2e8f0"/>

      {/* Stat cards row */}
      <rect x="190" y="100" width="135" height="70" rx="10" fill="white" stroke="#e2e8f0"/>
      <rect x="204" y="112" width="50" height="6" rx="3" fill="#94a3b8"/>
      <rect x="204" y="126" width="70" height="12" rx="3" fill="#1e293b"/>
      <rect x="204" y="146" width="40" height="5" rx="2.5" fill="#059669"/>
      <rect x="310" y="108" width="20" height="20" rx="6" fill="#eff6ff"/>

      <rect x="335" y="100" width="135" height="70" rx="10" fill="white" stroke="#e2e8f0"/>
      <rect x="349" y="112" width="45" height="6" rx="3" fill="#94a3b8"/>
      <rect x="349" y="126" width="65" height="12" rx="3" fill="#1e293b"/>
      <rect x="349" y="146" width="35" height="5" rx="2.5" fill="#059669"/>
      <rect x="450" y="108" width="20" height="20" rx="6" fill="#f0fdf4"/>

      <rect x="480" y="100" width="155" height="70" rx="10" fill="white" stroke="#e2e8f0"/>
      <rect x="494" y="112" width="55" height="6" rx="3" fill="#94a3b8"/>
      <rect x="494" y="126" width="80" height="12" rx="3" fill="#1e293b"/>
      <rect x="494" y="146" width="45" height="5" rx="2.5" fill="#d97706"/>
      <rect x="600" y="108" width="20" height="20" rx="6" fill="#fffbeb"/>

      {/* Chart area */}
      <rect x="190" y="185" width="310" height="200" rx="10" fill="white" stroke="#e2e8f0"/>
      <rect x="204" y="198" width="80" height="6" rx="3" fill="#1e293b"/>
      <rect x="204" y="210" width="100" height="5" rx="2.5" fill="#cbd5e1"/>

      {/* Mini bars */}
      <rect x="215" y="340" width="16" height="30" rx="3" fill="#dbeafe"/>
      <rect x="215" y="320" width="16" height="50" rx="3" fill="#3b82f6"/>
      <rect x="245" y="335" width="16" height="35" rx="3" fill="#dbeafe"/>
      <rect x="245" y="310" width="16" height="60" rx="3" fill="#3b82f6"/>
      <rect x="275" y="340" width="16" height="30" rx="3" fill="#dbeafe"/>
      <rect x="275" y="325" width="16" height="45" rx="3" fill="#6366f1"/>
      <rect x="305" y="330" width="16" height="40" rx="3" fill="#dbeafe"/>
      <rect x="305" y="300" width="16" height="70" rx="3" fill="#3b82f6"/>
      <rect x="335" y="338" width="16" height="32" rx="3" fill="#dbeafe"/>
      <rect x="335" y="315" width="16" height="55" rx="3" fill="#3b82f6"/>
      <rect x="365" y="342" width="16" height="28" rx="3" fill="#dbeafe"/>
      <rect x="365" y="325" width="16" height="45" rx="3" fill="#3b82f6"/>
      <rect x="395" y="335" width="16" height="35" rx="3" fill="#dbeafe"/>
      <rect x="395" y="310" width="16" height="60" rx="3" fill="#6366f1"/>
      <rect x="425" y="340" width="16" height="30" rx="3" fill="#dbeafe"/>
      <rect x="425" y="320" width="16" height="50" rx="3" fill="#3b82f6"/>
      <rect x="455" y="342" width="16" height="28" rx="3" fill="#dbeafe"/>
      <rect x="455" y="328" width="16" height="42" rx="3" fill="#3b82f6"/>

      {/* Side panel — attendance donut */}
      <rect x="510" y="185" width="140" height="200" rx="10" fill="white" stroke="#e2e8f0"/>
      <rect x="524" y="198" width="70" height="6" rx="3" fill="#1e293b"/>
      <rect x="524" y="210" width="100" height="5" rx="2.5" fill="#cbd5e1"/>
      <circle cx="580" cy="290" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8"/>
      <circle cx="580" cy="290" r="40" fill="none" stroke="#059669" strokeWidth="8" strokeDasharray="201" strokeDashoffset="20" strokeLinecap="round" transform="rotate(-90 580 290)"/>
      <text x="580" y="286" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="bold">93%</text>
      <text x="580" y="300" textAnchor="middle" fill="#94a3b8" fontSize="7">Present</text>

      <rect x="535" y="345" width="90" height="5" rx="2.5" fill="#059669" opacity="0.3"/>
      <rect x="535" y="355" width="60" height="5" rx="2.5" fill="#e11d48" opacity="0.3"/>
      <rect x="535" y="365" width="70" height="5" rx="2.5" fill="#d97706" opacity="0.3"/>
    </svg>
  );
}

// ============================================================
// Feature Illustration — Multi Campus
// ============================================================
export function MultiCampusIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" className={className}>
      <rect x="40" y="80" width="100" height="140" rx="12" fill="#eff6ff" stroke="#bfdbfe"/>
      <rect x="55" y="95" width="30" height="20" rx="4" fill="#3b82f6" opacity="0.2"/>
      <rect x="95" y="95" width="30" height="20" rx="4" fill="#3b82f6" opacity="0.2"/>
      <rect x="55" y="125" width="30" height="20" rx="4" fill="#3b82f6" opacity="0.2"/>
      <rect x="95" y="125" width="30" height="20" rx="4" fill="#3b82f6" opacity="0.2"/>
      <rect x="55" y="155" width="30" height="20" rx="4" fill="#3b82f6" opacity="0.2"/>
      <rect x="95" y="155" width="30" height="20" rx="4" fill="#3b82f6" opacity="0.2"/>
      <rect x="60" y="190" width="60" height="10" rx="3" fill="#3b82f6"/>
      <text x="90" y="240" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="600">Campus A</text>

      <rect x="160" y="60" width="100" height="160" rx="12" fill="#f0fdf4" stroke="#bbf7d0"/>
      <rect x="175" y="75" width="30" height="20" rx="4" fill="#059669" opacity="0.2"/>
      <rect x="215" y="75" width="30" height="20" rx="4" fill="#059669" opacity="0.2"/>
      <rect x="175" y="105" width="30" height="20" rx="4" fill="#059669" opacity="0.2"/>
      <rect x="215" y="105" width="30" height="20" rx="4" fill="#059669" opacity="0.2"/>
      <rect x="175" y="135" width="30" height="20" rx="4" fill="#059669" opacity="0.2"/>
      <rect x="215" y="135" width="30" height="20" rx="4" fill="#059669" opacity="0.2"/>
      <rect x="180" y="170" width="60" height="10" rx="3" fill="#059669"/>
      <text x="210" y="240" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="600">Campus B</text>

      <rect x="280" y="100" width="100" height="140" rx="12" fill="#fdf4ff" stroke="#e9d5ff"/>
      <rect x="295" y="115" width="30" height="20" rx="4" fill="#7c3aed" opacity="0.2"/>
      <rect x="335" y="115" width="30" height="20" rx="4" fill="#7c3aed" opacity="0.2"/>
      <rect x="295" y="145" width="30" height="20" rx="4" fill="#7c3aed" opacity="0.2"/>
      <rect x="335" y="145" width="30" height="20" rx="4" fill="#7c3aed" opacity="0.2"/>
      <rect x="295" y="175" width="30" height="20" rx="4" fill="#7c3aed" opacity="0.2"/>
      <rect x="335" y="175" width="30" height="20" rx="4" fill="#7c3aed" opacity="0.2"/>
      <rect x="300" y="210" width="60" height="10" rx="3" fill="#7c3aed"/>
      <text x="330" y="240" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="600">Campus C</text>

      {/* Connection lines */}
      <path d="M140 150 Q 150 120 160 140" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" fill="none"/>
      <path d="M260 140 Q 270 110 280 130" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" fill="none"/>

      {/* Center hub */}
      <circle cx="210" cy="40" r="18" fill="#1e293b" stroke="white" strokeWidth="3"/>
      <text x="210" y="44" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">HQ</text>
      <path d="M192 50 L90 80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3"/>
      <path d="M210 58 L210 60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3"/>
      <path d="M228 50 L310 100" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3"/>
    </svg>
  );
}

// ============================================================
// Mobile App Illustration
// ============================================================
export function MobileAppIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 500" fill="none" className={className}>
      {/* Phone frame */}
      <rect x="20" y="20" width="220" height="460" rx="36" fill="#1e293b" stroke="#334155" strokeWidth="3"/>
      <rect x="28" y="40" width="204" height="420" rx="28" fill="white"/>

      {/* Notch */}
      <rect x="90" y="22" width="80" height="24" rx="12" fill="#1e293b"/>

      {/* Status bar */}
      <text x="45" y="56" fill="#94a3b8" fontSize="9" fontWeight="500">9:41</text>
      <rect x="185" y="48" width="24" height="10" rx="3" fill="#e2e8f0"/>
      <rect x="187" y="50" width="18" height="6" rx="2" fill="#34d399"/>

      {/* App header */}
      <rect x="28" y="68" width="204" height="60" fill="#3b82f6"/>
      <text x="48" y="90" fill="white" fontSize="10" fontWeight="600">Good morning 👋</text>
      <text x="48" y="106" fill="white" fontSize="8" opacity="0.7">EduFlow Academy</text>

      {/* Stat cards */}
      <rect x="40" y="140" width="90" height="55" rx="10" fill="white" stroke="#e2e8f0"/>
      <text x="52" y="156" fill="#94a3b8" fontSize="7">Students</text>
      <text x="52" y="172" fill="#1e293b" fontSize="12" fontWeight="bold">2,847</text>

      <rect x="140" y="140" width="82" height="55" rx="10" fill="white" stroke="#e2e8f0"/>
      <text x="152" y="156" fill="#94a3b8" fontSize="7">Attendance</text>
      <text x="152" y="172" fill="#059669" fontSize="12" fontWeight="bold">93%</text>

      {/* Activity list */}
      <rect x="40" y="210" width="182" height="44" rx="8" fill="#f8fafc"/>
      <circle cx="58" cy="232" r="12" fill="#eff6ff"/>
      <text x="58" y="236" textAnchor="middle" fontSize="10">📝</text>
      <text x="78" y="227" fill="#1e293b" fontSize="8" fontWeight="600">New admission</text>
      <text x="78" y="240" fill="#94a3b8" fontSize="7">Emeka applied for SS1</text>

      <rect x="40" y="262" width="182" height="44" rx="8" fill="#f8fafc"/>
      <circle cx="58" cy="284" r="12" fill="#f0fdf4"/>
      <text x="58" y="288" textAnchor="middle" fontSize="10">💰</text>
      <text x="78" y="279" fill="#1e293b" fontSize="8" fontWeight="600">Payment received</text>
      <text x="78" y="292" fill="#94a3b8" fontSize="7">₦125,000 from John</text>

      <rect x="40" y="314" width="182" height="44" rx="8" fill="#f8fafc"/>
      <circle cx="58" cy="336" r="12" fill="#fffbeb"/>
      <text x="58" y="340" textAnchor="middle" fontSize="10">⚠️</text>
      <text x="78" y="331" fill="#1e293b" fontSize="8" fontWeight="600">Attendance alert</text>
      <text x="78" y="344" fill="#94a3b8" fontSize="7">3 students absent today</text>

      {/* Bottom nav */}
      <rect x="28" y="416" width="204" height="44" rx="0" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="60" y="442" textAnchor="middle" fill="#3b82f6" fontSize="8" fontWeight="600">🏠 Home</text>
      <text x="105" y="442" textAnchor="middle" fill="#94a3b8" fontSize="8">📋 Attendance</text>
      <text x="155" y="442" textAnchor="middle" fill="#94a3b8" fontSize="8">💻 CBT</text>
      <text x="198" y="442" textAnchor="middle" fill="#94a3b8" fontSize="8">👤 Profile</text>
    </svg>
  );
}

// ============================================================
// Stats Infographic
// ============================================================
export function StatsInfographic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 200" fill="none" className={className}>
      {/* 5000+ Schools */}
      <rect x="0" y="20" width="130" height="160" rx="16" fill="white" stroke="#e2e8f0" strokeWidth="1.5"/>
      <rect x="30" y="40" width="70" height="70" rx="16" fill="#eff6ff"/>
      <text x="65" y="82" textAnchor="middle" fontSize="28">🏫</text>
      <text x="65" y="130" textAnchor="middle" fill="#1e293b" fontSize="22" fontWeight="bold">5,000+</text>
      <text x="65" y="150" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="500">Schools</text>

      {/* Arrow */}
      <path d="M140 100 L160 100" stroke="#e2e8f0" strokeWidth="2" markerEnd="url(#arrow)"/>

      {/* 5M Students */}
      <rect x="160" y="20" width="130" height="160" rx="16" fill="white" stroke="#e2e8f0" strokeWidth="1.5"/>
      <rect x="190" y="40" width="70" height="70" rx="16" fill="#f0fdf4"/>
      <text x="225" y="82" textAnchor="middle" fontSize="28">🎓</text>
      <text x="225" y="130" textAnchor="middle" fill="#1e293b" fontSize="22" fontWeight="bold">5M+</text>
      <text x="225" y="150" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="500">Students</text>

      <path d="M300 100 L320 100" stroke="#e2e8f0" strokeWidth="2"/>

      {/* 10 AI Agents */}
      <rect x="320" y="20" width="130" height="160" rx="16" fill="white" stroke="#e2e8f0" strokeWidth="1.5"/>
      <rect x="350" y="40" width="70" height="70" rx="16" fill="#fdf4ff"/>
      <text x="385" y="82" textAnchor="middle" fontSize="28">🤖</text>
      <text x="385" y="130" textAnchor="middle" fill="#1e293b" fontSize="22" fontWeight="bold">10</text>
      <text x="385" y="150" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="500">AI Agents</text>

      <path d="M460 100 L480 100" stroke="#e2e8f0" strokeWidth="2"/>

      {/* 99.9% Uptime */}
      <rect x="480" y="20" width="120" height="160" rx="16" fill="white" stroke="#e2e8f0" strokeWidth="1.5"/>
      <rect x="505" y="40" width="70" height="70" rx="16" fill="#fffbeb"/>
      <text x="540" y="82" textAnchor="middle" fontSize="28">⚡</text>
      <text x="540" y="130" textAnchor="middle" fill="#1e293b" fontSize="20" fontWeight="bold">99.9%</text>
      <text x="540" y="150" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="500">Uptime</text>
    </svg>
  );
}

// ============================================================
// Workflow Illustration
// ============================================================
export function WorkflowIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 700 180" fill="none" className={className}>
      {/* Step 1 */}
      <rect x="0" y="30" width="140" height="120" rx="16" fill="white" stroke="#e2e8f0" strokeWidth="1.5"/>
      <circle cx="70" cy="65" r="24" fill="#eff6ff"/>
      <text x="70" y="72" textAnchor="middle" fontSize="20">📝</text>
      <text x="70" y="108" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">Apply Online</text>
      <text x="70" y="124" textAnchor="middle" fill="#94a3b8" fontSize="8">2 minutes</text>

      {/* Arrow */}
      <path d="M148 90 L182 90" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4"/>
      <polygon points="180,85 190,90 180,95" fill="#3b82f6"/>

      {/* Step 2 */}
      <rect x="190" y="30" width="140" height="120" rx="16" fill="white" stroke="#e2e8f0" strokeWidth="1.5"/>
      <circle cx="260" cy="65" r="24" fill="#f0fdf4"/>
      <text x="260" y="72" textAnchor="middle" fontSize="20">🤖</text>
      <text x="260" y="108" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">AI Reviews</text>
      <text x="260" y="124" textAnchor="middle" fill="#94a3b8" fontSize="8">Instant scoring</text>

      <path d="M338 90 L372 90" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4"/>
      <polygon points="370,85 380,90 370,95" fill="#3b82f6"/>

      {/* Step 3 */}
      <rect x="380" y="30" width="140" height="120" rx="16" fill="white" stroke="#e2e8f0" strokeWidth="1.5"/>
      <circle cx="450" cy="65" r="24" fill="#fdf4ff"/>
      <text x="450" y="72" textAnchor="middle" fontSize="20">✅</text>
      <text x="450" y="108" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">Get Approved</text>
      <text x="450" y="124" textAnchor="middle" fill="#94a3b8" fontSize="8">Same day</text>

      <path d="M528 90 L562 90" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4"/>
      <polygon points="560,85 570,90 560,95" fill="#3b82f6"/>

      {/* Step 4 */}
      <rect x="570" y="30" width="130" height="120" rx="16" fill="white" stroke="#e2e8f0" strokeWidth="1.5"/>
      <circle cx="635" cy="65" r="24" fill="#fffbeb"/>
      <text x="635" y="72" textAnchor="middle" fontSize="20">🎉</text>
      <text x="635" y="108" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">Start Learning</text>
      <text x="635" y="124" textAnchor="middle" fill="#94a3b8" fontSize="8">Welcome aboard!</text>
    </svg>
  );
}
