import React from 'react';

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col justify-between animate-pulse">
      <div>
        <div className="w-full aspect-square bg-slate-100 rounded-xl mb-3" />
        <div className="h-3 w-16 bg-slate-200 rounded-full mb-2" />
        <div className="h-4 w-3/4 bg-slate-200 rounded-md mb-2" />
        <div className="h-3 w-1/2 bg-slate-100 rounded-md mb-3" />
      </div>
      <div>
        <div className="h-5 w-24 bg-slate-200 rounded-md mb-2" />
        <div className="h-7 w-full bg-brand-50 rounded-lg" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm animate-pulse space-y-6">
      {/* Image Gallery Skeleton */}
      <div className="w-full aspect-square max-h-72 bg-slate-100 rounded-2xl" />

      {/* Title & Brand Skeleton */}
      <div className="space-y-2">
        <div className="h-3 w-20 bg-slate-200 rounded-full" />
        <div className="h-6 w-4/5 bg-slate-200 rounded-md" />
        <div className="h-4 w-1/3 bg-slate-100 rounded-md" />
      </div>

      {/* Price skeleton */}
      <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
        <div className="h-6 w-32 bg-slate-200 rounded-md" />
        <div className="h-4 w-48 bg-slate-100 rounded-md" />
      </div>

      {/* Variants skeleton */}
      <div className="space-y-4">
        <div className="h-4 w-28 bg-slate-200 rounded-md" />
        <div className="flex gap-2">
          <div className="h-10 w-24 bg-slate-100 rounded-xl" />
          <div className="h-10 w-24 bg-slate-100 rounded-xl" />
          <div className="h-10 w-24 bg-slate-100 rounded-xl" />
        </div>
      </div>

      {/* EMI Plans skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-36 bg-slate-200 rounded-md" />
        <div className="grid grid-cols-2 gap-2.5">
          <div className="h-20 bg-slate-100 rounded-xl" />
          <div className="h-20 bg-slate-100 rounded-xl" />
          <div className="h-20 bg-slate-100 rounded-xl" />
          <div className="h-20 bg-slate-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function EMIPlanSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-2.5 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-20 bg-slate-100 rounded-xl border border-slate-200" />
      ))}
    </div>
  );
}
