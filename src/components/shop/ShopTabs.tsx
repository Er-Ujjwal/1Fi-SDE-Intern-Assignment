'use client';

import React from 'react';
import { ShopTabId } from '@/types';
import { Sparkles, Store, Building2 } from 'lucide-react';

interface ShopTabsProps {
  activeTab: ShopTabId;
  onChange: (tab: ShopTabId) => void;
}

export function ShopTabs({ activeTab, onChange }: ShopTabsProps) {
  const tabs: { id: ShopTabId; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    {
      id: 'brands',
      label: 'Top Brands',
      icon: Building2,
    },
    {
      id: 'stores',
      label: 'Nearby Stores',
      icon: Store,
    },
    {
      id: 'marketplace',
      label: '1Fi Marketplace',
      icon: Sparkles,
      badge: '0% EMI',
    },
  ];

  return (
    <div className="w-full bg-slate-100/80 p-1 rounded-2xl flex items-center gap-1 border border-slate-200/60 shadow-inner">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-white text-brand-700 shadow-sm shadow-slate-200 font-bold'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
            }`}
          >
            <Icon
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-colors ${
                isActive ? 'text-brand-500' : 'text-slate-400'
              }`}
            />
            <span className="truncate">{tab.label}</span>
            {tab.badge && (
              <span
                className={`hidden xs:inline-block text-[10px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 border border-brand-200/60'
                    : 'bg-slate-200/70 text-slate-500'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
