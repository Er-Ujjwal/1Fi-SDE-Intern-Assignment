'use client';

import React from 'react';
import { EMIPlan, Product, ProductVariant } from '@/types';
import { ShieldCheck, Info, CheckCircle2 } from 'lucide-react';

interface PriceSummaryProps {
  product: Product;
  selectedVariant: ProductVariant;
  selectedPlan: EMIPlan | null;
}

export function PriceSummary({
  product,
  selectedVariant,
  selectedPlan,
}: PriceSummaryProps) {
  const price = selectedVariant.price;
  const mrp = selectedVariant.mrp;
  const upfrontDiscount = Math.max(0, mrp - price);

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

  const formattedMrp = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(mrp);

  const formattedMonthly = selectedPlan
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(selectedPlan.monthlyAmount)
    : '—';

  const formattedCollateral = selectedPlan
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(selectedPlan.mfCollateralRequired)
    : '—';

  return (
    <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Payment Breakdown
        </span>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
          1Fi 0% Benefit Applied
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {/* Product MRP */}
        {upfrontDiscount > 0 && (
          <div className="flex justify-between text-slate-500">
            <span>List MRP</span>
            <span className="line-through">{formattedMrp}</span>
          </div>
        )}

        {/* 1Fi Special Price */}
        <div className="flex justify-between text-slate-700 font-medium">
          <span>Product Price</span>
          <span className="font-bold text-slate-900">{formattedPrice}</span>
        </div>

        {/* Upfront Cash Down Payment */}
        <div className="flex justify-between text-slate-700">
          <span>Upfront Down Payment</span>
          <span className="font-bold text-emerald-600">₹0 (Zero Down Payment)</span>
        </div>

        {/* Processing Fee */}
        <div className="flex justify-between text-slate-700">
          <span>Processing & Documentation Fee</span>
          <span className="font-bold text-emerald-600">₹0 (Free)</span>
        </div>

        {/* Interest Rate */}
        <div className="flex justify-between text-slate-700">
          <span>Annual Interest Rate (APR)</span>
          <span className="font-bold text-emerald-600">0.00% (No Cost EMI)</span>
        </div>

        {/* MF Collateral Hold */}
        {selectedPlan && (
          <div className="flex justify-between text-brand-700 pt-1 border-t border-slate-200/60 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
              MF Lien Collateral Hold (1.5x)
            </span>
            <span className="font-bold">{formattedCollateral}</span>
          </div>
        )}
      </div>

      {/* Final Monthly Installment Callout */}
      {selectedPlan && (
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between bg-white p-3 rounded-xl border border-brand-100 shadow-2xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Monthly Installment
            </span>
            <span className="text-base font-black text-brand-700">
              {formattedMonthly}
              <span className="text-xs font-medium text-slate-500"> / month</span>
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block">Tenure</span>
            <span className="text-xs font-bold text-slate-800">
              {selectedPlan.tenureMonths} Months
            </span>
          </div>
        </div>
      )}

      {/* Safety Notice */}
      <p className="text-[10px] text-slate-400 leading-tight flex items-start gap-1">
        <Info className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
        <span>
          Your mutual funds will not be sold. A temporary electronic lien will be placed via CAMS/KFintech and will release automatically after {selectedPlan?.tenureMonths || 12} monthly payments.
        </span>
      </p>
    </div>
  );
}
