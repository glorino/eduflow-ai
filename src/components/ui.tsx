import { cn } from '@/lib/utils';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

// ============================================================
// Button Component
// ============================================================

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, icon, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]';
    const variants = {
      primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500',
      secondary: 'bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:shadow-md focus:ring-slate-400',
      success: 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl focus:ring-emerald-500',
      danger: 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-lg shadow-rose-500/25 hover:shadow-xl focus:ring-rose-500',
      warning: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl focus:ring-amber-500',
      ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400',
      glass: 'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20',
    };
    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-lg',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-7 py-3.5 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// ============================================================
// Badge Component
// ============================================================

interface BadgeProps {
  variant?: 'blue' | 'green' | 'amber' | 'red' | 'violet' | 'slate' | 'cyan';
  solid?: boolean;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'blue', solid, dot, children, className }: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full';
  const variants = {
    blue: solid ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' : 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/10',
    green: solid ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/20' : 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10',
    amber: solid ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/20' : 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/10',
    red: solid ? 'bg-rose-600 text-white shadow-sm shadow-rose-500/20' : 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/10',
    violet: solid ? 'bg-violet-600 text-white shadow-sm shadow-violet-500/20' : 'bg-violet-50 text-violet-700 ring-1 ring-violet-600/10',
    slate: solid ? 'bg-slate-600 text-white' : 'bg-slate-100 text-slate-600 ring-1 ring-slate-500/10',
    cyan: solid ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-500/20' : 'bg-cyan-50 text-cyan-700 ring-1 ring-cyan-600/10',
  };
  const dotColors = {
    blue: 'bg-blue-500', green: 'bg-emerald-500', amber: 'bg-amber-500',
    red: 'bg-rose-500', violet: 'bg-violet-500', slate: 'bg-slate-500', cyan: 'bg-cyan-500',
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
}

// ============================================================
// Avatar Component
// ============================================================

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'green' | 'amber' | 'violet' | 'rose' | 'cyan';
  className?: string;
}

const avatarGradients = {
  blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
  green: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
  amber: 'bg-gradient-to-br from-amber-400 to-amber-500',
  violet: 'bg-gradient-to-br from-violet-500 to-purple-600',
  rose: 'bg-gradient-to-br from-rose-500 to-pink-500',
  cyan: 'bg-gradient-to-br from-cyan-500 to-blue-500',
};

const sizeMap = {
  xs: 'w-6 h-6 text-[9px]',
  sm: 'w-8 h-8 text-[10px]',
  md: 'w-10 h-10 text-xs',
  lg: 'w-12 h-12 text-sm',
  xl: 'w-16 h-16 text-base',
};

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function getColorFromName(name: string): 'blue' | 'green' | 'amber' | 'violet' {
  const colors: ('blue' | 'green' | 'amber' | 'violet')[] = ['blue', 'green', 'amber', 'violet'];
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

export function Avatar({ name, src, size = 'md', color, className }: AvatarProps) {
  const resolvedColor = color || getColorFromName(name);
  return (
    <div className={cn('inline-flex items-center justify-center rounded-full font-bold text-white relative shadow-sm', sizeMap[size], avatarGradients[resolvedColor], className)}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full rounded-full object-cover" />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}

// ============================================================
// Card Component
// ============================================================

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  interactive?: boolean;
  glow?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className, elevated, interactive, glow, padding = 'md' }: CardProps) {
  const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };
  return (
    <div className={cn(
      'bg-white rounded-2xl border transition-all duration-300',
      elevated ? 'border-slate-200/50 shadow-lg shadow-slate-200/50' : 'border-slate-200/80 shadow-sm',
      interactive && 'cursor-pointer hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 hover:-translate-y-0.5',
      glow && 'hover:shadow-blue-500/10 hover:shadow-xl',
      paddings[padding],
      className
    )}>
      {children}
    </div>
  );
}

// ============================================================
// Stat Card Component
// ============================================================

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
  color?: 'blue' | 'green' | 'amber' | 'rose' | 'violet' | 'cyan';
  subtitle?: string;
  className?: string;
}

const statGradients = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-emerald-500 to-emerald-600',
  amber: 'from-amber-400 to-amber-500',
  rose: 'from-rose-500 to-rose-600',
  violet: 'from-violet-500 to-purple-600',
  cyan: 'from-cyan-500 to-blue-500',
};

export function StatCard({ title, value, change, changeType = 'positive', icon, color = 'blue', subtitle, className }: StatCardProps) {
  const changeColors = {
    positive: 'text-emerald-600 bg-emerald-50',
    negative: 'text-rose-600 bg-rose-50',
    neutral: 'text-slate-500 bg-slate-50',
  };

  return (
    <div className={cn('bg-white rounded-2xl border border-slate-200/60 p-6 relative overflow-hidden group hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-0.5', className)}>
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-[0.07] -translate-y-1/3 translate-x-1/3 group-hover:scale-150 group-hover:opacity-[0.12] transition-all duration-500" style={{ background: `linear-gradient(135deg, ${color === 'blue' ? '#3b82f6' : color === 'green' ? '#059669' : color === 'amber' ? '#d97706' : color === 'rose' ? '#e11d48' : color === 'cyan' ? '#0891b2' : '#7c3aed'}, transparent)` }} />
      <div className="flex items-start justify-between mb-4">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{title}</span>
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${statGradients[color]} flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">{value}</div>
      {change && (
        <div className="flex items-center gap-2 mt-2">
          <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full', changeColors[changeType])}>
            {changeType === 'positive' ? '↑' : changeType === 'negative' ? '↓' : '→'} {change}
          </span>
          <span className="text-[11px] text-slate-400">vs last month</span>
        </div>
      )}
      {subtitle && <div className="text-[11px] text-slate-400 mt-1.5">{subtitle}</div>}
    </div>
  );
}

// ============================================================
// Table Component
// ============================================================

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
  sortable?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  selectedRows?: Set<string>;
  onToggleRow?: (id: string) => void;
  rowKey: keyof T;
  emptyMessage?: string;
  emptyIcon?: string;
}

export function Table<T extends Record<string, unknown>>({
  columns, data, onRowClick, selectedRows, onToggleRow, rowKey,
  emptyMessage = 'No data found', emptyIcon = '📭',
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="empty-state py-16">
        <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center text-4xl mb-4">{emptyIcon}</div>
        <p className="text-lg font-bold text-slate-900 mb-1">{emptyMessage}</p>
        <p className="text-sm text-slate-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50/80 border-b border-slate-200/80">
            {selectedRows && (
              <th className="px-5 py-3.5 w-12">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" onChange={() => {}} />
              </th>
            )}
            {columns.map((col) => (
              <th key={col.key} className={cn('px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest', col.className)}>
                <span className={cn(col.sortable && 'cursor-pointer hover:text-slate-600 select-none')}>{col.header}{col.sortable && <span className="ml-1 text-slate-300">↕</span>}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={String(row[rowKey])}
              className={cn('border-b border-slate-100/80 last:border-0 transition-colors duration-150', onRowClick && 'cursor-pointer hover:bg-blue-50/20', selectedRows?.has(String(row[rowKey])) && 'bg-blue-50/50')}
              onClick={() => onRowClick?.(row)}
            >
              {selectedRows && (
                <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" checked={selectedRows.has(String(row[rowKey]))} onChange={() => onToggleRow?.(String(row[rowKey]))} />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className={cn('px-5 py-4', col.className)}>
                  {col.render ? col.render(row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// Progress Bar Component
// ============================================================

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'blue' | 'green' | 'amber' | 'rose';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ value, max = 100, color = 'blue', size = 'md', showLabel, className }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const heights = { sm: 'h-1.5', md: 'h-2', lg: 'h-3' };
  const barColors = {
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
    green: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
    amber: 'bg-gradient-to-r from-amber-500 to-amber-600',
    rose: 'bg-gradient-to-r from-rose-500 to-rose-600',
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-medium text-slate-600">{value}/{max}</span>
          <span className="text-xs font-bold text-slate-700">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn('bg-slate-100 rounded-full overflow-hidden', heights[size])}>
        <div className={cn('h-full rounded-full transition-all duration-700 ease-out', barColors[color])} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

// ============================================================
// Skeleton Component
// ============================================================

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({ className, count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={cn('skeleton', className)} />
      ))}
    </>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="h-3 w-24 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
      <Skeleton className="h-8 w-32 rounded-lg mb-2" />
      <Skeleton className="h-3 w-20 rounded-full" />
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <Skeleton className="h-5 w-40 rounded-lg" />
      </div>
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="px-6 py-4 flex items-center gap-4">
            {Array.from({ length: cols }).map((_, j) => (
              <Skeleton key={j} className="h-4 rounded-lg" style={{ width: j === 0 ? '120px' : j === 1 ? '80px' : '60px' }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Empty State Component
// ============================================================

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center text-4xl mb-5">{icon}</div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">{description}</p>
      {action}
    </div>
  );
}

// ============================================================
// Page Header Component
// ============================================================

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  actions?: React.ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function PageHeader({ title, subtitle, icon, actions, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-sm text-slate-400 mb-4">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-slate-300">/</span>}
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-slate-600 transition-colors font-medium">{crumb.label}</a>
              ) : (
                <span className="text-slate-700 font-semibold">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {icon && <span className="text-4xl">{icon}</span>}
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}

// ============================================================
// Section Header Component
// ============================================================

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
