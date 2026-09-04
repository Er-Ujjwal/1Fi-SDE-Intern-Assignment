'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Building2, Store, Sparkles, ArrowRight, MapPin, QrCode, ShieldCheck } from 'lucide-react';
import { apiService } from '@/services/api';
import { BrandPartner, NearbyStore } from '@/types';

interface PlaceholderTabProps {
  type: 'brands' | 'stores';
  onSwitchToMarketplace: () => void;
}

export function PlaceholderTab({ type, onSwitchToMarketplace }: PlaceholderTabProps) {
  const isBrands = type === 'brands';
  const [brands, setBrands] = useState<BrandPartner[]>([]);
  const [stores, setStores] = useState<NearbyStore[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    if (isBrands) {
      apiService
        .getBrands()
        .then((data) => {
          if (isMounted) setBrands(data);
        })
        .finally(() => {
          if (isMounted) setIsLoading(false);
        });
    } else {
      apiService
        .getNearbyStores()
        .then((data) => {
          if (isMounted) setStores(data);
        })
        .finally(() => {
          if (isMounted) setIsLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [isBrands]);

  return (
    <div className="space-y-4 pb-20 sm:pb-8">
      {/* Hero Banner for Tab */}
      <div className="flex flex-col items-center justify-center py-8 px-6 text-center bg-white rounded-3xl border border-slate-100 shadow-xs space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-500 shadow-sm">
          {isBrands ? <Building2 className="w-7 h-7" /> : <Store className="w-7 h-7" />}
        </div>

        <div className="space-y-1.5 max-w-sm">
          <h2 className="text-lg font-bold text-slate-900">
            {isBrands ? 'Official Brand Stores' : 'Nearby Partner Stores'}
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            {isBrands
              ? 'Direct brand store partnerships with Apple, Samsung, Dell, and Sony are currently under integration.'
              : 'Scan 1Fi QR at offline partner stores to pledge mutual funds and get 0% EMI at checkout instantly.'}
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          Assignment Placeholder (Future Backend Integration)
        </div>

        <div>
          <button
            onClick={onSwitchToMarketplace}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-1fi-gradient text-white text-xs font-bold shadow-md shadow-brand-500/20 hover:opacity-95 active:scale-98 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Explore Active 1Fi Marketplace
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Dynamic Partner Preview List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {isBrands ? 'Partner Brands Pipeline' : 'Available Partner Outlets'}
          </span>
          <span className="text-[11px] text-slate-400">
            Fetched via API
          </span>
        </div>

        {isBrands ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                    {brand.logo}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{brand.name}</h4>
                    <p className="text-[10px] text-slate-500">{brand.category}</p>
                    <span className="text-[10px] text-brand-600 font-semibold block mt-0.5">
                      {brand.discountBanner}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                    brand.status === 'Active Partner'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {brand.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stores.map((store) => (
              <div
                key={store.id}
                className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-brand-600 uppercase">
                      {store.chain}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">{store.name}</h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      {store.distanceKm} km away • {store.pincode}
                    </p>
                  </div>

                  {store.supports1FiQR && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-lg border border-brand-200 shrink-0">
                      <QrCode className="w-3 h-3 text-brand-600" />
                      1Fi QR Ready
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-2 flex items-center justify-between">
                  <span>Physical Store Checkout</span>
                  <span className="font-semibold text-emerald-600">0% Interest Supported</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
