'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { ShoppingBag, PieChart, Home, ReceiptText, User } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();
  const { setIsEmisModalOpen } = useShop();
  const isShopActive = pathname.startsWith('/shop') || pathname === '/';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 sm:hidden">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <Link
          href="/shop"
          className="flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-slate-600 transition-colors"
          title="Home"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>

        <button
          onClick={() => setIsEmisModalOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-brand-600 transition-colors cursor-pointer"
          title="Portfolio"
        >
          <PieChart className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">Portfolio</span>
        </button>

        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center py-1 px-3 transition-colors ${
            isShopActive
              ? 'text-brand-600 font-bold'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <div className={`relative ${isShopActive ? 'text-brand-600' : ''}`}>
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {isShopActive && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-500 rounded-full ring-2 ring-white" />
            )}
          </div>
          <span className="text-[10px]">Shop</span>
        </Link>

        <button
          onClick={() => setIsEmisModalOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-brand-600 transition-colors cursor-pointer"
          title="EMIs"
        >
          <ReceiptText className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">EMIs</span>
        </button>

        <button
          onClick={() => setIsEmisModalOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          title="Profile"
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
}
