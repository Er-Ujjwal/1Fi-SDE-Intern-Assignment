'use client';

import React from 'react';
import { Smartphone, Monitor, ShieldCheck, Sparkles } from 'lucide-react';

interface DeviceFrameToggleProps {
  isMobileFrame: boolean;
  onToggle: (mobile: boolean) => void;
}

export function DeviceFrameToggle({ isMobileFrame, onToggle }: DeviceFrameToggleProps) {
  return (
    <div className="hidden lg:flex items-center justify-between px-6 py-2 bg-slate-900 text-white text-xs border-b border-slate-800">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-slate-200">1Fi SDE Intern Assignment:</span>
        <span className="text-slate-400">Marketplace Section (0% LAMF Shopping Experience)</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[11px] text-slate-400">Reviewer View Mode:</span>
        <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
          <button
            onClick={() => onToggle(true)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
              isMobileFrame
                ? 'bg-brand-500 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile App View (390px)</span>
          </button>
          <button
            onClick={() => onToggle(false)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
              !isMobileFrame
                ? 'bg-brand-500 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Full Responsive View</span>
          </button>
        </div>
      </div>
    </div>
  );
}
