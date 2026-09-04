'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useEMIPlans } from '@/hooks/useEMIPlans';
import { VariantSelector } from '@/components/shop/VariantSelector';
import { EMIPlanSelector } from '@/components/shop/EMIPlanSelector';
import { PriceSummary } from '@/components/shop/PriceSummary';
import { OrderConfirmationModal } from '@/components/shop/OrderConfirmationModal';
import { ProductDetailSkeleton } from '@/components/ui/LoadingSkeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { Badge } from '@/components/ui/Badge';
import { ProductVariant, VariantColor } from '@/types';
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Share2,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = (params.id as string) || '';

  const { product, isLoading, isError, error, refetch } = useProductDetail(productId);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedColor, setSelectedColor] = useState<VariantColor | undefined>(undefined);
  const [selectedStorage, setSelectedStorage] = useState<string | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'plans' | 'specs'>('plans');

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
    }
  }, [product]);

  const currentPrice = selectedVariant?.price || product?.basePrice || 0;
  const { plans, selectedPlan, setSelectedPlan, isLoading: isPlansLoading } = useEMIPlans(
    productId,
    currentPrice
  );

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

  const formattedPrice = selectedVariant
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(selectedVariant.price)
    : '—';

  const formattedMrp = selectedVariant
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(selectedVariant.mrp)
    : '—';

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full bg-white min-h-screen shadow-2xl border-x border-slate-200/80 my-0 lg:my-6 lg:rounded-[40px] lg:overflow-hidden">
        <AppHeader />

        {/* Subheader Back bar */}
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-white sticky top-[57px] z-20">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>

          <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200/60">
            0% Interest Guaranteed
          </span>
        </div>

        <main className="flex-1 p-4 pb-28 space-y-6">
          {isLoading && <ProductDetailSkeleton />}

          {isError && (
            <ErrorState
              title="Product not found"
              message={error || 'We could not find this product.'}
              onRetry={refetch}
              onReset={() => router.push('/shop')}
              resetText="Return to Marketplace"
            />
          )}

          {!isLoading && !isError && product && selectedVariant && (
            <>
              {/* Product Visuals */}
              <div className="relative w-full aspect-square max-h-72 bg-slate-50 rounded-3xl p-4 flex items-center justify-center border border-slate-100 overflow-hidden">
                <Image
                  src={selectedImage || product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-contain p-4"
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

              {/* Product Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    {product.brand}
                  </span>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/70">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">
                      ({product.reviewCount})
                    </span>
                  </div>
                </div>

                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  {product.name}
                </h1>

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

              {/* Variant Selector */}
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80">
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

              {/* Tab Selector */}
              <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
                <button
                  onClick={() => setActiveTab('plans')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'plans'
                      ? 'text-brand-600 border-b-2 border-brand-500 font-extrabold'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  1Fi 0% EMI Plans
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'specs'
                      ? 'text-brand-600 border-b-2 border-brand-500 font-extrabold'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Product Specs
                </button>
              </div>

              {activeTab === 'plans' ? (
                <div className="space-y-6">
                  <EMIPlanSelector
                    plans={plans}
                    selectedPlan={selectedPlan}
                    onSelectPlan={setSelectedPlan}
                    isLoading={isPlansLoading}
                  />

                  <PriceSummary
                    product={product}
                    selectedVariant={selectedVariant}
                    selectedPlan={selectedPlan}
                  />
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  <div className="space-y-2">
                    <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      Highlights
                    </span>
                    <ul className="space-y-2">
                      {product.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      Specifications
                    </span>
                    <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
                      {Object.entries(product.specs).map(([k, v]) => (
                        <div key={k} className="grid grid-cols-3 p-3 bg-white">
                          <span className="font-bold text-slate-700">{k}</span>
                          <span className="col-span-2 text-slate-600">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        {/* Sticky Bottom Action Drawer */}
        {!isLoading && !isError && product && selectedVariant && (
          <div className="fixed bottom-0 max-w-md w-full p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 flex items-center justify-between gap-4 shadow-xl">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {selectedPlan ? `${selectedPlan.tenureMonths} Mos 0% EMI` : 'Zero Down Payment'}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-brand-700">
                  {selectedPlan
                    ? `₹${selectedPlan.monthlyAmount.toLocaleString('en-IN')}`
                    : formattedPrice}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {selectedPlan ? '/mo' : ''}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              disabled={!selectedPlan}
              className="flex-1 py-3.5 px-4 rounded-2xl bg-1fi-gradient hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Proceed with 1Fi EMI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Order Confirmation Modal Sheet */}
        {product && selectedVariant && selectedPlan && (
          <OrderConfirmationModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            product={product}
            selectedVariant={selectedVariant}
            selectedPlan={selectedPlan}
            onSuccess={() => {}}
          />
        )}

        <BottomNav />
      </div>
    </div>
  );
}
