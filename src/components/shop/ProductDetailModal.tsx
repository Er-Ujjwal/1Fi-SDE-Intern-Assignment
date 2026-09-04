'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product, ProductVariant, VariantColor, EMIPlan } from '@/types';
import { VariantSelector } from './VariantSelector';
import { EMIPlanSelector } from './EMIPlanSelector';
import { PriceSummary } from './PriceSummary';
import { OrderConfirmationModal } from './OrderConfirmationModal';
import { useEMIPlans } from '@/hooks/useEMIPlans';
import { Badge } from '@/components/ui/Badge';
import {
  X,
  Star,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Share2,
  Heart,
  Layers,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedColor, setSelectedColor] = useState<VariantColor | undefined>(undefined);
  const [selectedStorage, setSelectedStorage] = useState<string | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'plans' | 'specs'>('plans');

  // Initialize selected variant and image on product open
  useEffect(() => {
    if (product) {
      const initialVariant = product.variants[0];
      setSelectedVariant(initialVariant);
      setSelectedImage(initialVariant?.image || product.image);
      if (product.availableColors && product.availableColors.length > 0) {
        setSelectedColor(product.availableColors[0]);
      }
      if (product.availableStorages && product.availableStorages.length > 0) {
        setSelectedStorage(product.availableStorages[0]);
      }
      setActiveTab('plans');
    }
  }, [product]);

  const currentPrice = selectedVariant?.price || product?.basePrice || 0;
  const { plans, selectedPlan, setSelectedPlan, isLoading: isPlansLoading } = useEMIPlans(
    product?.id || '',
    currentPrice
  );

  if (!isOpen || !product || !selectedVariant) return null;

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    if (variant.image) {
      setSelectedImage(variant.image);
    }
  };

  const handleColorChange = (color: VariantColor) => {
    setSelectedColor(color);
    if (color.image) {
      setSelectedImage(color.image);
    }
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(selectedVariant.price);

  const formattedMrp = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(selectedVariant.mrp);

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden relative">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {product.brand}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
              0% Interest EMI
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {/* Top Gallery & Title Section */}
          <div className="space-y-4">
            <div className="relative w-full aspect-4/3 sm:aspect-16/9 bg-slate-50 rounded-2xl sm:rounded-3xl p-4 flex items-center justify-center overflow-hidden border border-slate-100">
              <Image
                src={selectedImage || product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 600px"
                className="object-contain p-4 transition-all duration-300"
                priority
              />

              {product.badge && (
                <div className="absolute top-3 left-3">
                  <Badge variant="brand" size="md">
                    <Zap className="w-3 h-3 text-brand-500" />
                    {product.badge}
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail selector if gallery has multiple images */}
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex items-center justify-center gap-2">
                {product.galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-12 h-12 rounded-xl p-1 border transition-all cursor-pointer ${
                      selectedImage === img
                        ? 'border-brand-500 ring-2 ring-brand-500/20 bg-brand-50/50'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`View ${i + 1}`}
                      fill
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Title, Rating & Pricing */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs font-bold text-slate-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">
                    ({product.reviewCount} verified reviews)
                  </span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  {formattedPrice}
                </span>
                {selectedVariant.mrp > selectedVariant.price && (
                  <>
                    <span className="text-sm text-slate-400 line-through">
                      {formattedMrp}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Save {Math.round(((selectedVariant.mrp - selectedVariant.price) / selectedVariant.mrp) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Variant Selector (Colors + Storage) */}
          <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80">
            <VariantSelector
              product={product}
              selectedVariant={selectedVariant}
              onSelectVariant={handleVariantChange}
              selectedColor={selectedColor}
              onSelectColor={handleColorChange}
              selectedStorage={selectedStorage}
              onSelectStorage={setSelectedStorage}
            />
          </div>

          {/* Tab Switcher: EMI Plans vs Technical Specs */}
          <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
            <button
              onClick={() => setActiveTab('plans')}
              className={`pb-2.5 transition-colors relative cursor-pointer ${
                activeTab === 'plans'
                  ? 'text-brand-600 border-b-2 border-brand-500 font-extrabold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              1Fi 0% EMI Plans
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2.5 transition-colors relative cursor-pointer ${
                activeTab === 'specs'
                  ? 'text-brand-600 border-b-2 border-brand-500 font-extrabold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Specifications & Overview
            </button>
          </div>

          {activeTab === 'plans' ? (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* EMI Plan Selector */}
              <EMIPlanSelector
                plans={plans}
                selectedPlan={selectedPlan}
                onSelectPlan={setSelectedPlan}
                isLoading={isPlansLoading}
              />

              {/* Price & Collateral Breakdown */}
              <PriceSummary
                product={product}
                selectedVariant={selectedVariant}
                selectedPlan={selectedPlan}
              />
            </div>
          ) : (
            <div className="space-y-4 text-xs animate-in fade-in duration-150">
              {/* Highlights */}
              <div className="space-y-2">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  Key Highlights
                </span>
                <ul className="space-y-2">
                  {product.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-600 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specs Table */}
              <div className="space-y-2 pt-2">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  Technical Specs
                </span>
                <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="grid grid-cols-3 p-3 bg-white hover:bg-slate-50/60 transition-colors">
                      <span className="font-bold text-slate-700">{key}</span>
                      <span className="col-span-2 text-slate-600">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Bottom Action Drawer */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-100 sticky bottom-0 z-20 flex items-center justify-between gap-4 shadow-lg shadow-slate-900/10">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {selectedPlan ? `${selectedPlan.tenureMonths} Months 0% EMI` : 'Zero Down Payment'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-brand-700">
                {selectedPlan
                  ? `₹${selectedPlan.monthlyAmount.toLocaleString('en-IN')}`
                  : formattedPrice}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {selectedPlan ? '/month' : 'total'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            disabled={!selectedPlan}
            className="flex-1 max-w-xs py-3.5 px-5 rounded-2xl bg-1fi-gradient hover:opacity-95 active:scale-98 text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Proceed with 1Fi EMI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Order Confirmation Modal Sheet */}
        {selectedPlan && (
          <OrderConfirmationModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            product={product}
            selectedVariant={selectedVariant}
            selectedPlan={selectedPlan}
            onSuccess={() => {
              // Can trigger order state or stay on confirmation screen
            }}
          />
        )}
      </div>
    </div>
  );
}
