'use client';

import React from 'react';
import { CategoryId, SortOption } from '@/types';
import { Search, SlidersHorizontal, X, Smartphone, Laptop, Headphones, Tablet, Watch, LayoutGrid } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onSimulateError?: () => void;
}

export function FilterBar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onSimulateError,
}: FilterBarProps) {
  const categories: { id: CategoryId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', label: 'All', icon: LayoutGrid },
    { id: 'smartphones', label: 'Phones', icon: Smartphone },
    { id: 'laptops', label: 'Laptops', icon: Laptop },
    { id: 'audio', label: 'Audio', icon: Headphones },
    { id: 'tablets', label: 'Tablets', icon: Tablet },
    { id: 'wearables', label: 'Watches', icon: Watch },
  ];

  return (
    <div className="space-y-3">
      {/* Search Input & Controls */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search iPhone, MacBook, Sony..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="relative shrink-0">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="appearance-none pl-8 pr-7 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 shadow-2xs cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Top Discount</option>
            <option value="rating">Highest Rated</option>
          </select>
          <SlidersHorizontal className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Category Pills (Horizontal scrolling) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-brand-300' : 'text-slate-400'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}

        {/* Reviewer error tester pill */}
        {onSimulateError && (
          <button
            onClick={onSimulateError}
            title="Simulate network error to test ErrorState & Retry flow"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200/80 hover:bg-amber-100 transition-colors whitespace-nowrap ml-auto cursor-pointer"
          >
            ⚡ Test Error & Retry
          </button>
        )}
      </div>
    </div>
  );
}
