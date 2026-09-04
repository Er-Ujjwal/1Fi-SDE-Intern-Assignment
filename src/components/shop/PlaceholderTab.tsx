'use client';

import React from 'react';
import { Building2, Store, Sparkles, ArrowRight } from 'lucide-react';
import { ShopTabId } from '@/types';

interface PlaceholderTabProps {
  type: 'brands' | 'stores';
  onSwitchToMarketplace: () => void;
}

export function PlaceholderTab({ type, onSwitchToMarketplace }: PlaceholderTabProps) {
  const isBrands = type === 'brands';

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white rounded-3xl border border-slate-100 shadow-xs my-4 space-y-5">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-500 shadow-sm">
        {isBrands ? <Building2 className="w-8 h-8" /> : <Store className="w-8 h-8" />}
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h2 className="text-xl font-bold text-slate-900">
          {isBrands ? 'Official Brand Stores' : 'Nearby Partner Stores'}
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          {isBrands
            ? 'Direct brand store partnerships with Apple, Samsung, Dell, and Sony are currently under integration.'
            : 'Scan 1Fi QR at offline retail partners (Croma, Reliance Digital, Vijay Sales) to pledge mutual funds and get 0% EMI instantly.'}
        </p>
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        Section in development (Assignment placeholder)
      </div>

      <div className="pt-2">
        <button
          onClick={onSwitchToMarketplace}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-1fi-gradient text-white text-sm font-bold shadow-md shadow-brand-500/20 hover:opacity-95 active:scale-98 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          Explore 1Fi Marketplace
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
