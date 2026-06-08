import { cn } from '@/lib/utils';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

// ============================================================
// Button Component
// ============================================================

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, icon, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';
    const variants = {
      primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500',
      secondary: 'bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-400',
      success: 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl focus:ring-emerald-500',
      danger: 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-lg shadow-rose-500/25 hover:shadow-xl focus:ring-rose-500',
      warning: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl focus:ring-amber-500',
      ghost: 'text-slate-600 hover:bg-slate-100 focus:ring-slate-400',
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
  variant?: 'blue' | 'green' | 'amber' | 'red' | 'violet' | 'slate';
  solid?: boolean;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'blue', solid, dot, children, className }: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full';
  const variants = {
    blue: solid ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/10',
    green: solid ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10',
    amber: solid ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/10',
    red: solid ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/10',
    violet: solid ? 'bg-violet-600 text-white' : 'bg-violet-50 text-violet-700 ring-1 ring-violet-600/10',
    slate: solid ? 'bg-slate-600 text-white' : 'bg-slate-100 text-slate-600 ring-1 ring-slate-500/10',
  };

  const dotColors = {
    blue: 'bg-blue-500',
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-rose-500',
    violet: 'bg-violet-500',
    slate: 'bg-slate-500',
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
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'green' | 'amber' | 'violet';
  className?: string;
}

const colorMap = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  violet: 'bg-violet-100 text-violet-700',
};

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
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
    <div className={cn('inline-flex items-center justify-center rounded-full font-semibold relative', sizeMap[size], colorMap[resolvedColor], className)}>
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
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className, elevated, interactive, padding = 'md' }: CardProps) {
  const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };
  return (
    <div className={cn(
      'bg-white rounded-2xl border transition-all duration-200',
      elevated ? 'border-slate-200/50 shadow-lg shadow-slate-200/50' : 'border-slate-200/80 shadow-sm',
      interactive && 'cursor-pointer hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50',
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
  color?: 'blue' | 'green' | 'amber' | 'rose' | 'violet';
  subtitle?: string;
}

export function StatCard({ title, value, change, changeType = 'positive', icon, color = 'blue', subtitle }: StatCardProps) {
  const bgColors = {
    blue: 'bg-blue-50',
    green: 'bg-emerald-50',
    amber: 'bg-amber-50',
    rose: 'bg-rose-50',
    violet: 'bg-violet-50',
  };
  const iconColors = {
    blue: 'text-blue-600',
    green: 'text-emerald-600',
    amber: 'text-amber-600',
    rose: 'text-rose-600',
    violet: 'text-violet-600',
  };
  const changeColors = {
    positive: 'text-emerald-600',
    negative: 'text-rose-600',
    neutral: 'text-slate-500',
  };

  return (
    <div className={cn('card p-6 relative overflow-hidden group', `stat-card ${color}`)}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500 truncate">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-1.5 tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
          {change && (
            <div className="flex items-center gap-1.5 mt-2">
              <span className={cn('text-sm font-semibold', changeColors[changeType])}>
                {changeType === 'positive' ? '↑' : changeType === 'negative' ? '↓' : '→'} {change}
              </span>
              <span className="text-xs text-slate-400">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn('flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-110', bgColors[color], iconColors[color])}>
          {icon}
        </div>
      </div>
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
  columns,
  data,
  onRowClick,
  selectedRows,
  onToggleRow,
  rowKey,
  emptyMessage = 'No data found',
  emptyIcon = '📭',
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="empty-state">
        <span className="text-5xl mb-4">{emptyIcon}</span>
        <p className="text-lg font-medium text-slate-900 mb-1">{emptyMessage}</p>
        <p className="text-sm text-slate-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50/80 border-b border-slate-200">
            {selectedRows && (
              <th className="px-5 py-3.5 w-12">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  onChange={() => {}}
                />
              </th>
            )}
            {columns.map((col) => (
              <th key={col.key} className={cn('px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider', col.className)}>
                <span className={cn(col.sortable && 'cursor-pointer hover:text-slate-700 select-none')}>
                  {col.header}
                  {col.sortable && <span className="ml-1 text-slate-400">↕</span>}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={String(row[rowKey])}
              className={cn(
                'border-b border-slate-100 last:border-0 transition-colors',
                onRowClick && 'cursor-pointer hover:bg-blue-50/30',
                selectedRows?.has(String(row[rowKey])) && 'bg-blue-50'
              )}
              onClick={() => onRowClick?.(row)}
              style={{ animationDelay: `${i * 30}ms` }}
            >
              {selectedRows && (
                <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedRows.has(String(row[rowKey]))}
                    onChange={() => onToggleRow?.(String(row[rowKey]))}
                  />
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
          <span className="text-xs font-semibold text-slate-700">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn('bg-slate-100 rounded-full overflow-hidden', heights[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-700 ease-out', barColors[color])}
          style={{ width: `${percentage}%` }}
        />
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
      <span className="text-6xl mb-4">{icon}</span>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
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
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-slate-300">/</span>}
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-slate-700 transition-colors">{crumb.label}</a>
              ) : (
                <span className="text-slate-700 font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {icon && <span className="text-4xl">{icon}</span>}
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
