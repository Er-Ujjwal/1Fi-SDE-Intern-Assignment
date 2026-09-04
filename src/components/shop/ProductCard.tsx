'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Star, ShieldCheck, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.basePrice);

  const formattedMrp = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.baseMrp);

  const formattedMonthlyEmi = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.minMonthlyEmi);

  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-brand-200 transition-all duration-200 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-1 mb-2">
          {product.badge ? (
            <Badge variant="brand" size="sm">
              <Sparkles className="w-2.5 h-2.5 text-brand-500" />
              {product.badge}
            </Badge>
          ) : (
            <span className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase">
              {product.brand}
            </span>
          )}

          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-50 px-1.5 py-0.5 rounded-md border border-slate-100">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Product Image Container */}
        <div className="relative w-full aspect-square bg-slate-50/70 rounded-xl sm:rounded-2xl p-2 mb-3 flex items-center justify-center overflow-hidden group-hover:bg-brand-50/30 transition-colors">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Name & Details */}
        <div className="space-y-1 mb-3">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            {product.brand}
          </span>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-brand-600 transition-colors">
            {product.name}
          </h4>
        </div>
      </div>

      {/* Pricing & 1Fi 0% EMI highlight */}
      <div className="pt-2 border-t border-slate-100/80 space-y-2">
        {/* Actual MRP vs Price */}
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-sm sm:text-base font-extrabold text-slate-900">
            {formattedPrice}
          </span>
          {product.baseMrp > product.basePrice && (
            <span className="text-[11px] text-slate-400 line-through">
              {formattedMrp}
            </span>
          )}
        </div>

        {/* 1Fi 0% EMI Banner Pill */}
        <div className="w-full bg-brand-50/80 group-hover:bg-brand-100/80 border border-brand-200/60 rounded-xl p-2 transition-colors">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px]">
            <span className="font-semibold text-brand-900 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-brand-600 shrink-0" />
              0% EMI from
            </span>
            <span className="font-extrabold text-brand-700">
              {formattedMonthlyEmi}/mo
            </span>
          </div>
          <div className="text-[9px] text-brand-600/90 mt-0.5 flex items-center justify-between font-medium">
            <span>Zero down payment</span>
            <span>Up to {product.maxTenureMonths} mos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
