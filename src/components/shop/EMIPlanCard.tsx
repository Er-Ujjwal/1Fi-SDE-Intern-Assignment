'use client';

import React from 'react';
import { EMIPlan } from '@/types';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface EMIPlanCardProps {
  plan: EMIPlan;
  isSelected: boolean;
  onSelect: (plan: EMIPlan) => void;
}

export function EMIPlanCard({ plan, isSelected, onSelect }: EMIPlanCardProps) {
  const formattedMonthlyAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(plan.monthlyAmount);

  const formattedTotalAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(plan.totalAmount);

  const formattedCollateral = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(plan.mfCollateralRequired);

  return (
    <div
      onClick={() => onSelect(plan)}
      className={`relative rounded-2xl p-3.5 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'bg-brand-50/60 border-brand-500 shadow-sm ring-2 ring-brand-500/20'
          : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/50'
      }`}
    >
      {/* Top Tag */}
      {plan.tag && (
        <div className="absolute -top-2.5 right-3">
          <span
            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs ${
              plan.isRecommended
                ? 'bg-brand-500 text-white'
                : plan.isPopular
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-white'
            }`}
          >
            {plan.tag}
          </span>
        </div>
      )}

      <div>
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-extrabold text-slate-900">
              {plan.tenureMonths} Months
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
              0% Interest
            </span>
          </div>

          <div className="shrink-0 mt-0.5">
            <CheckCircle2
              className={`w-4 h-4 transition-colors ${
                isSelected ? 'text-brand-600 fill-brand-100' : 'text-slate-300'
              }`}
            />
          </div>
        </div>

        {/* Monthly Installment */}
        <div className="my-1">
          <div className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            {formattedMonthlyAmount}
            <span className="text-xs font-normal text-slate-500"> / month</span>
          </div>
        </div>
      </div>

      {/* Footer Info: Total + MF Pledge */}
      <div className="pt-2 mt-1 border-t border-slate-100 space-y-1 text-[11px]">
        <div className="flex items-center justify-between text-slate-600">
          <span>Total Payable:</span>
          <span className="font-bold text-slate-900">{formattedTotalAmount}</span>
        </div>

        <div className="flex items-center justify-between text-[10px] text-brand-700 font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-brand-500" />
            MF Pledge Hold:
          </span>
          <span className="font-semibold">{formattedCollateral}</span>
        </div>

        {plan.creditCardInterestSaved > 0 && (
          <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5 pt-0.5">
            <Sparkles className="w-2.5 h-2.5 text-emerald-500" />
            Save ₹{plan.creditCardInterestSaved.toLocaleString('en-IN')} vs Credit Card
          </div>
        )}
      </div>
    </div>
  );
}
