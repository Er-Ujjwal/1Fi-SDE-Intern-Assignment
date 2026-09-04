'use client';

import React from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/hooks/usePortfolio';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface AppHeaderProps {
  showSearch?: boolean;
}

export function AppHeader({ showSearch = false }: AppHeaderProps) {
  const { portfolio } = usePortfolio();

  const creditLimit = portfolio
    ? `₹${(portfolio.availableCreditLimit / 100000).toFixed(2)}L`
    : '₹2.40L';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between gap-3 max-w-5xl mx-auto">
        {/* 1Fi Brand Logo */}
        <Link href="/shop" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-xl bg-1fi-gradient flex items-center justify-center text-white font-black text-lg shadow-sm shadow-brand-500/20 group-hover:scale-105 transition-transform">
            1
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
              1Fi<span className="text-brand-500">.</span>
            </span>
            <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">
              MF EMIs
            </span>
          </div>
        </Link>

        {/* 1Fi LAMF Credit Limit Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-800 text-xs font-semibold shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="hidden xs:inline text-slate-500 font-medium">Limit:</span>
            <span className="font-bold text-brand-900">{creditLimit}</span>
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600 ml-0.5" />
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            0% Interest
          </div>
        </div>
      </div>
    </header>
  );
}
