'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { NearbyStore } from '@/types';
import { usePortfolio } from '@/hooks/usePortfolio';
import {
  X,
  QrCode,
  ShieldCheck,
  Zap,
  Building,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Store,
} from 'lucide-react';

interface InStoreQRModalProps {
  store: NearbyStore | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InStoreQRModal({ store, isOpen, onClose }: InStoreQRModalProps) {
  const { portfolio } = usePortfolio();
  const [amount, setAmount] = useState<number>(45000);
  const [selectedTenure, setSelectedTenure] = useState<number>(12);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen || !store) return null;

  const monthlyEmi = Math.ceil(amount / selectedTenure);
  const collateralHold = Math.round(amount * 1.5);
  const creditLimit = portfolio?.availableCreditLimit || 240000;
  const isEligible = creditLimit >= collateralHold;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#712CDC', '#10B981', '#F59E0B'],
        });
      } catch {
        // fallback
      }
    }, 1200);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {isSuccess ? 'Payment Successful!' : 'Pay with 1Fi QR at Store'}
              </h3>
              <p className="text-[10px] text-slate-500 truncate max-w-[200px]">
                {store.name}
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-4 flex-1">
          {!isSuccess ? (
            <>
              {/* Store Identifier Banner */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-brand-600 uppercase">
                    Merchant Verified
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {store.name}
                  </h4>
                  <p className="text-[10px] text-slate-500">{store.city} • {store.chain}</p>
                </div>
              </div>

              {/* Bill Amount Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Enter In-Store Bill Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-extrabold text-slate-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Math.max(1000, Number(e.target.value)))}
                    className="w-full pl-8 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-base font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                    placeholder="Enter store bill amount"
                  />
                </div>

                {/* Quick amount presets */}
                <div className="flex gap-1.5 pt-1">
                  {[25000, 50000, 80000, 120000].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setAmount(preset)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                        amount === preset
                          ? 'border-brand-500 bg-brand-50 text-brand-700'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      ₹{(preset / 1000)}k
                    </button>
                  ))}
                </div>
              </div>

              {/* Tenure Options */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Select 0% EMI Tenure</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    0% Interest
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[3, 6, 12, 24].map((tenure) => {
                    const monthly = Math.ceil(amount / tenure);
                    const isSelected = selectedTenure === tenure;

                    return (
                      <button
                        key={tenure}
                        onClick={() => setSelectedTenure(tenure)}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-brand-500 bg-brand-50/70 shadow-xs ring-2 ring-brand-500/20'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-900 block">
                          {tenure}M
                        </span>
                        <span className="text-[10px] text-brand-700 font-extrabold mt-0.5 block">
                          ₹{monthly.toLocaleString('en-IN')}/mo
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 1Fi LAMF Summary */}
              <div className="p-3.5 bg-brand-50/60 rounded-2xl border border-brand-200/80 space-y-2 text-xs">
                <div className="flex justify-between items-center text-brand-950 font-bold">
                  <span>Down Payment Today</span>
                  <span className="text-emerald-700 font-extrabold">₹0.00 (Zero Down Payment)</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Monthly EMI</span>
                  <span className="font-extrabold text-slate-900">
                    ₹{monthlyEmi.toLocaleString('en-IN')}/mo × {selectedTenure} months
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
                    MF Collateral Lien Hold (1.5x)
                  </span>
                  <span className="font-bold text-brand-900">
                    ₹{collateralHold.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1 border-t border-brand-200/60">
                  <span>Your Available MF Limit</span>
                  <span className="font-bold text-slate-800">
                    ₹{creditLimit.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handlePay}
                disabled={isProcessing || !isEligible}
                className="w-full py-3.5 rounded-2xl bg-1fi-gradient hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authorizing In-Store Lien via 1Fi...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay ₹{amount.toLocaleString('en-IN')} with 0% EMI</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </>
          ) : (
            /* Success State */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  In-Store Payment Authorized!
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Receipt Generated
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Payment of ₹{amount.toLocaleString('en-IN')} to {store.name} was approved with ₹0 down payment.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Merchant</span>
                  <span className="font-bold text-slate-900">{store.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID</span>
                  <span className="font-mono font-bold text-slate-900">
                    TXN-1FI-{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">EMI Schedule</span>
                  <span className="font-bold text-brand-700">
                    ₹{monthlyEmi.toLocaleString('en-IN')}/mo for {selectedTenure} months
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">1st Due Date</span>
                  <span className="font-bold text-slate-900">05th of next month</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
