'use client';

import React, { useState } from 'react';
import { ShopTabs } from '@/components/shop/ShopTabs';
import { MarketplaceView } from '@/components/shop/MarketplaceView';
import { PlaceholderTab } from '@/components/shop/PlaceholderTab';
import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { DeviceFrameToggle } from '@/components/layout/DeviceFrameToggle';
import { ShopTabId } from '@/types';

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<ShopTabId>('marketplace');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Reviewer Desktop Switcher Banner */}
      <DeviceFrameToggle
        isMobileFrame={isMobileFrame}
        onToggle={setIsMobileFrame}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col mx-auto w-full transition-all duration-300 ${
          isMobileFrame
            ? 'max-w-md bg-white min-h-screen shadow-2xl shadow-slate-300/60 border-x border-slate-200/80 my-0 lg:my-6 lg:rounded-[40px] lg:overflow-hidden lg:min-h-[880px]'
            : 'max-w-5xl bg-transparent px-4 sm:px-6'
        }`}
      >
        {/* App Header with 1Fi Logo & Credit Limit Badge */}
        <AppHeader />

        <main className={`flex-1 p-3.5 sm:p-5 space-y-4 ${isMobileFrame ? 'bg-slate-50/50' : ''}`}>
          {/* Shop Page 3 Segments: Top Brands | Nearby Stores | 1Fi Marketplace */}
          <ShopTabs
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {/* Tab 1: Top Brands Placeholder */}
          {activeTab === 'brands' && (
            <PlaceholderTab
              type="brands"
              onSwitchToMarketplace={() => setActiveTab('marketplace')}
            />
          )}

          {/* Tab 2: Nearby Stores Placeholder */}
          {activeTab === 'stores' && (
            <PlaceholderTab
              type="stores"
              onSwitchToMarketplace={() => setActiveTab('marketplace')}
            />
          )}

          {/* Tab 3: 1Fi Marketplace (Core Deliverable) */}
          {activeTab === 'marketplace' && <MarketplaceView />}
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
