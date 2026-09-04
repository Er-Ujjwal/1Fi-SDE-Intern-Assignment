import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'emerald' | 'amber' | 'slate' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'brand',
  size = 'sm',
  className = '',
}: BadgeProps) {
  const variantStyles = {
    brand: 'bg-brand-50 text-brand-700 border-brand-200/60',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/70',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    outline: 'bg-transparent text-slate-600 border-slate-200',
  }[variant];

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-semibold rounded-md border',
    md: 'text-xs px-2.5 py-1 font-semibold rounded-lg border',
  }[size];

  return (
    <span className={`inline-flex items-center gap-1 leading-none ${variantStyles} ${sizeStyles} ${className}`}>
      {children}
    </span>
  );
}
