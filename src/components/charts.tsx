'use client';

import { cn } from '@/lib/utils';

// ============================================================
// Mini Chart (Sparkline) - No external deps
// ============================================================

interface SparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function Sparkline({ data, color = '#3b82f6', width = 120, height = 32, className }: SparklineProps) {
  if (!data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width={width} height={height} className={className}>
      <defs>
        <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon
        points={areaPoints}
        fill={`url(#gradient-${color.replace('#', '')})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ============================================================
// Donut Chart - No external deps
// ============================================================

interface DonutChartProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  label?: string;
  sublabel?: string;
  className?: string;
}

export function DonutChart({ value, max = 100, size = 120, strokeWidth = 10, color = '#3b82f6', bgColor = '#e2e8f0', label, sublabel, className }: DonutChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(value / max, 1);
  const offset = circumference - percentage * circumference;

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={bgColor}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {label && <span className="text-2xl font-bold text-slate-900">{label}</span>}
          {sublabel && <span className="text-xs text-slate-500">{sublabel}</span>}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Bar Chart - No external deps
// ============================================================

interface BarChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  height?: number;
  showLabels?: boolean;
  showValues?: boolean;
  className?: string;
}

export function BarChart({ data, height = 200, showLabels = true, showValues = true, className }: BarChartProps) {
  const max = Math.max(...data.map(d => d.value));
  const barWidth = Math.min(100 / data.length, 40);

  return (
    <div className={cn('flex items-end justify-between gap-2', className)} style={{ height }}>
      {data.map((item, i) => {
        const barHeight = max > 0 ? (item.value / max) * 100 : 0;
        const color = item.color || '#3b82f6';
        return (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
            {showValues && (
              <span className="text-xs font-semibold text-slate-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.value}
              </span>
            )}
            <div
              className="w-full max-w-[48px] rounded-t-lg transition-all duration-500 ease-out group-hover:opacity-80"
              style={{
                height: `${Math.max(barHeight, 4)}%`,
                background: `linear-gradient(180deg, ${color}, ${color}dd)`,
                animationDelay: `${i * 100}ms`,
              }}
            />
            {showLabels && (
              <span className="text-xs text-slate-500 mt-2 truncate w-full text-center">{item.label}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// Horizontal Bar Chart
// ============================================================

interface HorizontalBarProps {
  data: Array<{ label: string; value: number; color?: string }>;
  maxValue?: number;
  height?: number;
  className?: string;
}

export function HorizontalBarChart({ data, maxValue, height = 24, className }: HorizontalBarProps) {
  const max = maxValue || Math.max(...data.map(d => d.value));
  const colors = ['#3b82f6', '#059669', '#d97706', '#e11d48', '#7c3aed', '#0891b2'];

  return (
    <div className={cn('space-y-3', className)}>
      {data.map((item, i) => {
        const percentage = max > 0 ? (item.value / max) * 100 : 0;
        const color = item.color || colors[i % colors.length];
        return (
          <div key={i}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-slate-700">{item.label}</span>
              <span className="text-sm font-semibold text-slate-900">{item.value}</span>
            </div>
            <div className="bg-slate-100 rounded-full overflow-hidden" style={{ height }}>
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.max(percentage, 2)}%`, backgroundColor: color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// Activity Timeline
// ============================================================

interface TimelineItem {
  icon: string;
  title: string;
  description?: string;
  time: string;
  color?: 'blue' | 'green' | 'amber' | 'rose' | 'violet';
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const timelineColors = {
  blue: 'bg-blue-100 text-blue-600 ring-blue-200',
  green: 'bg-emerald-100 text-emerald-600 ring-emerald-200',
  amber: 'bg-amber-100 text-amber-600 ring-amber-200',
  rose: 'bg-rose-100 text-rose-600 ring-rose-200',
  violet: 'bg-violet-100 text-violet-600 ring-violet-200',
};

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('flow-root', className)}>
      <ul className="-mb-8">
        {items.map((item, i) => (
          <li key={i}>
            <div className="relative pb-8">
              {i < items.length - 1 && (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
              )}
              <div className="relative flex items-start gap-3">
                <div className={cn('relative flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white text-sm', timelineColors[item.color || 'blue'])}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.title}</p>
                    {item.description && <p className="text-sm text-slate-500 mt-0.5">{item.description}</p>}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================
// Metric Card with Mini Chart
// ============================================================

interface MetricCardProps {
  title: string;
  value: string | number;
  sparklineData: number[];
  change: string;
  changeType: 'positive' | 'negative';
  color?: string;
  className?: string;
}

export function MetricCard({ title, value, sparklineData, change, changeType, color = '#3b82f6', className }: MetricCardProps) {
  return (
    <div className={cn('card p-5', className)}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        <Sparkline data={sparklineData} color={color} width={80} height={24} />
      </div>
      <div className="flex items-end gap-3">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        <span className={cn('text-sm font-semibold mb-0.5', changeType === 'positive' ? 'text-emerald-600' : 'text-rose-600')}>
          {changeType === 'positive' ? '↑' : '↓'} {change}
        </span>
      </div>
    </div>
  );
}
