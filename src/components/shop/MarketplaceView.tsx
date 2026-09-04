'use client';

import React, { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from './ProductCard';
import { FilterBar } from './FilterBar';
import { LAMFInfoBanner } from './LAMFInfoBanner';
import { ProductDetailModal } from './ProductDetailModal';
import { ProductGridSkeleton } from '@/components/ui/LoadingSkeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { CategoryId, Product, SortOption } from '@/types';
import { Sparkles, ShieldCheck, SearchX } from 'lucide-react';

export function MarketplaceView() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    products,
    isLoading,
    isError,
    error,
    refetch,
    simulateErrorState,
    resetErrorSimulation,
  } = useProducts({
    category: selectedCategory,
    search: searchQuery,
    sortBy,
    delay: 350,
  });

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    resetErrorSimulation();
    refetch();
  };

  return (
    <div className="space-y-4 pb-20 sm:pb-8">
      {/* 1Fi LAMF Educational Banner */}
      <LAMFInfoBanner />

      {/* Filter and Search Controls */}
      <FilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onSimulateError={simulateErrorState}
      />

      {/* Results Header */}
      {!isLoading && !isError && (
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span className="font-semibold text-slate-700">
            {products.length} {products.length === 1 ? 'Product' : 'Products'} Available
          </span>
          <span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            100% 0% EMI Eligible
          </span>
        </div>
      )}

      {/* Async State: Loading Skeleton */}
      {isLoading && <ProductGridSkeleton count={6} />}

      {/* Async State: Error State with Retry */}
      {isError && (
        <ErrorState
          title="Unable to load 1Fi Marketplace"
          message={error || 'An error occurred while fetching the catalog. Please try again.'}
          onRetry={refetch}
          onReset={handleResetFilters}
          resetText="Reset Catalog"
        />
      )}

      {/* Async State: Empty Search Results */}
      {!isLoading && !isError && products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white rounded-3xl border border-slate-100 shadow-xs space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
            <SearchX className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">No products match your search</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              We couldn’t find any devices matching &ldquo;{searchQuery}&rdquo;. Try another term or reset your filters.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
          >
            Clear Filters & Search
          </button>
        </div>
      )}

      {/* Async State: Product Grid */}
      {!isLoading && !isError && products.length > 0 && (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={handleOpenProduct}
            />
          ))}
        </div>
      )}

      {/* Interactive Product Details & EMI Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
