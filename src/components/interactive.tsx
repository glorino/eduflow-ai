'use client';

import { cn } from '@/lib/utils';
import { useEffect, useCallback, type ReactNode } from 'react';

// ============================================================
// Modal Component
// ============================================================

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  footer?: ReactNode;
}

export function Modal({ open, onClose, title, description, children, size = 'md', footer }: ModalProps) {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, handleEscape]);

  if (!open) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={cn(
        'relative w-full bg-white rounded-2xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col',
        'animate-in fade-in zoom-in-95 duration-200',
        sizes[size]
      )}>
        {(title || description) && (
          <div className="px-6 py-5 border-b border-slate-100">
            {title && <h2 className="text-lg font-bold text-slate-900">{title}</h2>}
            {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
          </div>
        )}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>
        {footer && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Confirm Dialog
// ============================================================

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading,
}: ConfirmDialogProps) {
  const variantStyles = {
    danger: 'bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800',
    warning: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700',
    info: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
  };

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="text-center">
        <div className="text-4xl mb-4">
          {variant === 'danger' ? '🗑️' : variant === 'warning' ? '⚠️' : 'ℹ️'}
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-500">{message}</p>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-medium text-sm hover:bg-slate-50 transition-colors"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className={cn('flex-1 px-4 py-2.5 text-white rounded-xl font-medium text-sm transition-all disabled:opacity-50', variantStyles[variant])}
        >
          {loading ? 'Processing...' : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

// ============================================================
// Toast / Snackbar
// ============================================================

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
}

const toastStyles = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-rose-50 border-rose-200 text-rose-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const toastIcons = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

export function Toast({ message, type = 'info', onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-6 right-6 z-[300] animate-in slide-in-from-bottom-5">
      <div className={cn(
        'flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-lg min-w-[300px]',
        toastStyles[type]
      )}>
        <span className="text-lg font-bold">{toastIcons[type]}</span>
        <span className="text-sm font-medium flex-1">{message}</span>
        <button onClick={onClose} className="text-current opacity-50 hover:opacity-100 transition-opacity">
          ✕
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Form Input Component
// ============================================================

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FormInput({ label, type = 'text', placeholder, value, onChange, error, required, disabled, className }: FormInputProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={cn(
          'w-full px-4 py-2.5 bg-white border rounded-xl text-sm text-slate-900 placeholder:text-slate-400',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all',
          disabled && 'bg-slate-50 cursor-not-allowed',
          error ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500' : 'border-slate-200'
        )}
      />
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
}

// ============================================================
// Form Select Component
// ============================================================

interface FormSelectProps {
  label: string;
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export function FormSelect({ label, options, value, onChange, placeholder, error, required, className }: FormSelectProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={cn(
          'w-full px-4 py-2.5 bg-white border rounded-xl text-sm text-slate-900',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all',
          error ? 'border-rose-300' : 'border-slate-200'
        )}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
}

// ============================================================
// Tabs Component
// ============================================================

interface Tab {
  id: string;
  label: string;
  icon?: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex gap-1 p-1 bg-slate-100 rounded-xl', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
            activeTab === tab.id
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          )}
        >
          {tab.icon && <span>{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
