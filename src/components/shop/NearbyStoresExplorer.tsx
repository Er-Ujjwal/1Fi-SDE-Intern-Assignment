'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { apiService } from '@/services/api';
import { NearbyStore } from '@/types';
import { InStoreQRModal } from './InStoreQRModal';
import {
  MapPin,
  Navigation,
  QrCode,
  Phone,
  Clock,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  Compass,
} from 'lucide-react';

interface NearbyStoresExplorerProps {
  onSwitchToMarketplace?: () => void;
}

export function NearbyStoresExplorer({ onSwitchToMarketplace }: NearbyStoresExplorerProps) {
  const [stores, setStores] = useState<NearbyStore[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locationName, setLocationName] = useState<string>('Indiranagar, Bengaluru');
  const [hasGrantedLocation, setHasGrantedLocation] = useState<boolean>(false);
  const [selectedChain, setSelectedChain] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('Bengaluru');
  const [selectedStoreForQR, setSelectedStoreForQR] = useState<NearbyStore | null>(null);

  // Fetch stores based on user coordinates & filters
  const fetchStores = async (lat?: number, lng?: number, city?: string, chain?: string) => {
    setIsLoading(true);
    try {
      const data = await apiService.getNearbyStores({
        lat: lat ?? userCoords?.lat,
        lng: lng ?? userCoords?.lng,
        city: city ?? selectedCity,
        chain: chain ?? selectedChain,
      });
      setStores(data);
    } catch {
      setStores([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStores(userCoords?.lat, userCoords?.lng, selectedCity, selectedChain);
  }, [selectedCity, selectedChain, userCoords]);

  // Handle browser live location request
  const handleDetectLiveLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ lat: latitude, lng: longitude });
        setLocationName('Live GPS Location Detected');
        setHasGrantedLocation(true);
        setIsLocating(false);
        fetchStores(latitude, longitude, undefined, selectedChain);
      },
      (error) => {
        setIsLocating(false);
        // Fallback gracefully to Bengaluru coordinates if denied/unavailable
        setUserCoords({ lat: 12.9716, lng: 77.6412 });
        setLocationName('Indiranagar, Bengaluru (Default GPS)');
        setHasGrantedLocation(true);
        fetchStores(12.9716, 77.6412, 'Bengaluru', selectedChain);
      },
      { timeout: 8000 }
    );
  };

  const handleSelectCityHub = (city: string, areaName: string, lat: number, lng: number) => {
    setSelectedCity(city);
    setLocationName(areaName);
    setUserCoords({ lat, lng });
    setHasGrantedLocation(true);
    fetchStores(lat, lng, city, selectedChain);
  };

  const chains = ['All', 'Croma', 'Reliance Digital', 'Vijay Sales', 'Apple'];

  return (
    <div className="space-y-4 pb-20 sm:pb-8">
      {/* Location Permission / Selector Card */}
      {!hasGrantedLocation ? (
        <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-brand-700/60 relative overflow-hidden space-y-4">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-200 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-brand-300" />
              1Fi Offline Merchant Network
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              Explore 1Fi Stores Near You
            </h2>
            <p className="text-xs sm:text-sm text-brand-100/90 leading-relaxed max-w-md">
              Enable your location to discover nearby electronics stores where you can scan 1Fi QR and pay in 0% EMIs backed by your mutual funds.
            </p>
          </div>

          <div className="relative z-10 pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleDetectLiveLocation}
              disabled={isLocating}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-brand-900 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
            >
              {isLocating ? (
                <>
                  <div className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                  <span>Accessing Device Location...</span>
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4 text-brand-600 fill-brand-600" />
                  <span>📍 Detect My Live Location</span>
                </>
              )}
            </button>

            <span className="text-xs text-brand-200/80 text-center font-medium sm:hidden">or choose popular city:</span>
          </div>

          {/* Quick Hub Chips */}
          <div className="relative z-10 pt-2 border-t border-white/10">
            <span className="text-[11px] font-bold text-brand-200 block mb-2">
              Popular City Hubs:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSelectCityHub('Bengaluru', 'Indiranagar, Bengaluru', 12.9716, 77.6412)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                📍 Bengaluru (Indiranagar)
              </button>
              <button
                onClick={() => handleSelectCityHub('Mumbai', 'Bandra, Mumbai', 19.0600, 72.8335)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                📍 Mumbai (Bandra)
              </button>
              <button
                onClick={() => handleSelectCityHub('Delhi NCR', 'Connaught Place, Delhi', 28.6315, 77.2167)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                📍 Delhi NCR (CP)
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Active Location Bar */
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Active Location
              </span>
              <span className="text-xs font-bold text-slate-900 truncate block">
                {locationName}
              </span>
            </div>
          </div>

          <button
            onClick={() => setHasGrantedLocation(false)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors shrink-0 cursor-pointer"
          >
            Change
          </button>
        </div>
      )}

      {/* Filter Chips for Retail Chains */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {chains.map((chain) => {
          const isSelected = selectedChain === chain;
          return (
            <button
              key={chain}
              onClick={() => setSelectedChain(chain)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {chain === 'All' ? 'All Partner Chains' : chain}
            </button>
          );
        })}
      </div>

      {/* Stores List Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span className="font-semibold text-slate-700">
          {stores.length} Partner {stores.length === 1 ? 'Store' : 'Stores'} Found
        </span>
        <span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
          <QrCode className="w-3 h-3 text-emerald-600" />
          1Fi QR Enabled
        </span>
      </div>

      {/* Stores List */}
      {isLoading ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-44 bg-white rounded-3xl border border-slate-100" />
          <div className="h-44 bg-white rounded-3xl border border-slate-100" />
        </div>
      ) : stores.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-2">
          <p className="text-xs">No partner stores found for the selected filter.</p>
          <button
            onClick={() => setSelectedChain('All')}
            className="text-xs font-bold text-brand-600"
          >
            Clear Chain Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs hover:border-brand-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Store Chain & Distance Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-extrabold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-200/60">
                    {store.chain}
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                    <Navigation className="w-3 h-3 text-brand-600 fill-brand-600" />
                    {store.distanceKm} km away
                  </span>
                </div>

                {/* Store Name & Address */}
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                  {store.name}
                </h3>
                <p className="text-xs text-slate-500 flex items-start gap-1.5 leading-relaxed mb-3">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{store.address}</span>
                </p>

                {/* Timings & Phone */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    {store.timings.split('(')[0]}
                  </span>
                  <span className="flex items-center gap-1 truncate">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {store.phone}
                  </span>
                </div>

                {/* Available popular deals in store */}
                {store.popularDeals && store.popularDeals.length > 0 && (
                  <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      In Stock:
                    </span>
                    {store.popularDeals.map((deal, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md"
                      >
                        {deal}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button: In-Store 1Fi QR Scanner */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="text-[10px] text-slate-400">
                  <span>Pledge mutual funds at checkout</span>
                </div>

                <button
                  onClick={() => setSelectedStoreForQR(store)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-1fi-gradient hover:opacity-95 text-white text-xs font-bold shadow-sm shadow-brand-500/20 transition-all cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Pay with 1Fi QR</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* In Store QR Payment Simulator Modal */}
      <InStoreQRModal
        store={selectedStoreForQR}
        isOpen={Boolean(selectedStoreForQR)}
        onClose={() => setSelectedStoreForQR(null)}
      />
    </div>
  );
}
