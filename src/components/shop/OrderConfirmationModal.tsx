'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { EMIPlan, Order, Product, ProductVariant } from '@/types';
import { usePortfolio } from '@/hooks/usePortfolio';
import { apiService } from '@/services/api';
import {
  CheckCircle,
  ShieldCheck,
  X,
  ArrowRight,
  CreditCard,
  Building,
  Lock,
  FileCheck2,
  AlertCircle,
} from 'lucide-react';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  selectedVariant: ProductVariant;
  selectedPlan: EMIPlan;
  onSuccess?: (createdOrder: Order) => void;
}

export function OrderConfirmationModal({
  isOpen,
  onClose,
  product,
  selectedVariant,
  selectedPlan,
  onSuccess,
}: OrderConfirmationModalProps) {
  const { portfolio } = usePortfolio();
  const [step, setStep] = useState<'review' | 'success'>('review');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep('review');
      setIsAuthorizing(false);
      setErrorMessage(null);
      setCreatedOrder(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const eligibleSchemes = portfolio?.eligibleSchemes || [];
  const selectedScheme = eligibleSchemes[0] || {
    name: 'Parag Parikh Flexi Cap Fund - Direct (Growth)',
    amc: 'PPFAS Mutual Fund',
    currentValue: 185000,
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(selectedVariant.price);

  const formattedMonthly = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(selectedPlan.monthlyAmount);

  const formattedCollateral = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(selectedPlan.mfCollateralRequired);

  const handleConfirmPledge = async () => {
    setIsAuthorizing(true);
    setErrorMessage(null);

    try {
      // Real backend POST /api/orders request
      const order = await apiService.createOrder({
        product,
        variant: selectedVariant,
        emiPlan: selectedPlan,
        schemeName: selectedScheme.name,
      });

      setCreatedOrder(order);
      setStep('success');

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#712CDC', '#10B981', '#F59E0B', '#3B82F6'],
        });
      } catch {
        // fallback
      }

      if (onSuccess) {
        onSuccess(order);
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to place 1Fi order');
    } finally {
      setIsAuthorizing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-100 shadow-2xl relative flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-1fi-gradient flex items-center justify-center text-white font-black text-sm">
              1
            </div>
            <span className="font-bold text-slate-900 text-sm">
              {step === 'review' ? 'Review 1Fi 0% EMI Pledge' : 'Order Placed Successfully!'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'review' ? (
          <div className="p-4 sm:p-5 space-y-4">
            {/* Error callout if any */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Product & Variant Mini Card */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
              <div className="w-14 h-14 bg-white rounded-xl p-1.5 border border-slate-200 shrink-0 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedVariant.image || product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  {product.brand}
                </span>
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-0.5">
                  {selectedVariant.colorName && (
                    <span>{selectedVariant.colorName}</span>
                  )}
                  {selectedVariant.storage && (
                    <span>• {selectedVariant.storage}</span>
                  )}
                  <span className="font-extrabold text-slate-900 ml-auto">
                    {formattedPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Step 1: Mutual Fund Pledge Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-600" />
                  Mutual Fund Lien Collateral
                </span>
                <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-200/60">
                  {formattedCollateral} Hold
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-brand-50/60 border border-brand-200/80 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-brand-950 block">
                      {selectedScheme.name}
                    </span>
                    <span className="text-[10px] text-brand-700 font-medium">
                      {selectedScheme.amc} • Verified with CAMS / KFintech
                    </span>
                  </div>
                  <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                </div>
                <div className="text-[10px] text-slate-600 bg-white/80 p-2 rounded-xl border border-brand-100 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-brand-500 shrink-0" />
                  <span>
                    Your units remain in your demat folio and continue earning full daily NAV returns.
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2: Auto-Debit Mandate Setup */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-slate-700" />
                Monthly EMI Auto-Debit Setup
              </span>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-700">
                  <span>Monthly EMI</span>
                  <span className="font-extrabold text-slate-900">{formattedMonthly}</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span>Tenure</span>
                  <span className="font-bold text-slate-900">{selectedPlan.tenureMonths} Months (0% Interest)</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span>1st EMI Due Date</span>
                  <span className="font-bold text-slate-900">05th of next month</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span>Linked Mandate Bank</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-500" />
                    HDFC Bank •••• 4192
                  </span>
                </div>
              </div>
            </div>

            {/* Total Today */}
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider block">
                  Amount Due Today
                </span>
                <span className="text-xl font-black text-emerald-900">
                  ₹0.00
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 shadow-2xs">
                Zero Down Payment
              </span>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleConfirmPledge}
              disabled={isAuthorizing}
              className="w-full py-3.5 rounded-2xl bg-1fi-gradient hover:opacity-95 active:scale-98 text-white font-bold text-sm shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isAuthorizing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Connecting to CAMS & Authorizing Lien...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize Pledge & Place Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        ) : (
          /* Step 2: Order Confirmed Success State */
          <div className="p-5 sm:p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider">
                Lien Placed & Order Confirmed!
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Welcome to 0% Interest Shopping
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Your order has been recorded in the backend. Your mutual funds are securely pledged and will continue compounding!
              </p>
            </div>

            {/* Order Receipt Details */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-500">
                <span>Order Reference</span>
                <span className="font-mono font-bold text-slate-900">
                  {createdOrder?.orderNumber || '1FI-SUCCESS'}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Monthly Auto-Debit</span>
                <span className="font-extrabold text-brand-700">{formattedMonthly} / mo</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Tenure</span>
                <span className="font-bold text-slate-800">{selectedPlan.tenureMonths} Months (0% Interest)</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Pledged Mutual Fund</span>
                <span className="font-semibold text-slate-800">{selectedScheme.name.split('-')[0]}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Lien Reference</span>
                <span className="font-mono text-slate-700">{createdOrder?.pledgedScheme.lienReferenceId || 'LIEN-ACTIVE'}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Back to 1Fi Marketplace
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
