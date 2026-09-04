'use client';

import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, Zap, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';

export function LAMFInfoBanner() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-950 text-white rounded-3xl p-4 sm:p-5 shadow-lg shadow-brand-900/10 border border-brand-700/50 overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-brand-200 text-[11px] font-semibold tracking-wide uppercase">
              <Sparkles className="w-3 h-3 text-brand-300" />
              Loan Against Mutual Funds (LAMF)
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              0% Interest Shopping with 1Fi
            </h3>
            <p className="text-xs sm:text-sm text-brand-100/90 leading-relaxed max-w-lg">
              Don’t redeem your investments. Pledge your mutual fund units as collateral and pay in easy, zero-interest monthly EMIs.
            </p>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0 cursor-pointer"
            aria-label={isExpanded ? 'Collapse info' : 'Expand info'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* 3 Quick Benefit Pillars */}
        <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-white/10 text-center">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-bold text-white">0% Interest</span>
            <span className="text-[9px] text-brand-200">Zero hidden fees</span>
          </div>

          <div className="flex flex-col items-center border-x border-white/10">
            <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-bold text-white">Keep Earning</span>
            <span className="text-[9px] text-brand-200">MF NAV grows</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-bold text-white">100% Safe</span>
            <span className="text-[9px] text-brand-200">CAMS / KFintech</span>
          </div>
        </div>

        {/* Expandable How it Works details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-3 text-xs text-brand-100 animate-in fade-in duration-200">
            <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">
              How the 1Fi Flow Works:
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>1. Select your device & tenure:</strong> Choose your favorite product and pick an EMI tenure (3 to 24 months).
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>2. Digital Mutual Fund Pledge:</strong> Mark a temporary lien on eligible mutual fund units via OTP. Your units remain in your folio and continue earning full market returns.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>3. Seamless Auto-Debit EMIs:</strong> Pay zero-interest EMIs monthly via e-NACH/UPI mandate. Once paid off, the lien is automatically released.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
