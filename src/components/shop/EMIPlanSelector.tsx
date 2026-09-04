'use client';

import React from 'react';
import { EMIPlan } from '@/types';
import { EMIPlanCard } from './EMIPlanCard';
import { EMIPlanSkeleton } from '@/components/ui/LoadingSkeleton';
import { ShieldAlert, Zap } from 'lucide-react';

interface EMIPlanSelectorProps {
  plans: EMIPlan[];
  selectedPlan: EMIPlan | null;
  onSelectPlan: (plan: EMIPlan) => void;
  isLoading?: boolean;
}

export function EMIPlanSelector({
  plans,
  selectedPlan,
  onSelectPlan,
  isLoading = false,
}: EMIPlanSelectorProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-4 w-36 bg-slate-200 rounded animate-pulse" />
        </div>
        <EMIPlanSkeleton />
      </div>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <div className="p-4 bg-slate-50 rounded-2xl text-center text-xs text-slate-500">
        No EMI plans available for this configuration.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Choose 1Fi 0% EMI Plan
          </span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.2 rounded">
            ZERO INTEREST
          </span>
        </div>
        <span className="text-[11px] font-semibold text-brand-600">
          {plans.length} Options Available
        </span>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
        {plans.map((plan) => (
          <EMIPlanCard
            key={plan.tenureMonths}
            plan={plan}
            isSelected={selectedPlan?.tenureMonths === plan.tenureMonths}
            onSelect={onSelectPlan}
          />
        ))}
      </div>

      {/* 1Fi Advantage micro-card */}
      <div className="p-3 bg-brand-50/50 border border-brand-100 rounded-2xl flex items-start gap-2.5 text-xs text-brand-950">
        <div className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center shrink-0 mt-0.5">
          <Zap className="w-3 h-3" />
        </div>
        <div className="space-y-0.5">
          <span className="font-bold text-brand-900 block">Why 1Fi 0% EMI?</span>
          <p className="text-[11px] text-brand-800/80 leading-relaxed">
            Traditional credit cards charge 16-24% interest and upfront fees. 1Fi leverages your mutual funds as collateral to deliver true 0% interest and 0 processing fees.
          </p>
        </div>
      </div>
    </div>
  );
}
