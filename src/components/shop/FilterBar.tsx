'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CategoryId, SearchSuggestion, SortOption } from '@/types';
import { useSearchSuggestions } from '@/hooks/useSearchSuggestions';
import {
  Search,
  SlidersHorizontal,
  X,
  Smartphone,
  Laptop,
  Headphones,
  Tablet,
  Watch,
  LayoutGrid,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface FilterBarProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onSimulateError?: () => void;
  onSelectSuggestion?: (suggestion: SearchSuggestion) => void;
}

export function FilterBar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onSimulateError,
  onSelectSuggestion,
}: FilterBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { suggestions, isLoading: isSuggestionsLoading } = useSearchSuggestions(searchQuery);

  const categories: { id: CategoryId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', label: 'All Devices', icon: LayoutGrid },
    { id: 'smartphones', label: 'Phones', icon: Smartphone },
    { id: 'laptops', label: 'Laptops', icon: Laptop },
    { id: 'audio', label: 'Audio', icon: Headphones },
    { id: 'tablets', label: 'Tablets', icon: Tablet },
    { id: 'wearables', label: 'Watches', icon: Watch },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onSearchChange(suggestion.title.replace(' Official Store', ''));
    if (suggestion.category) {
      onSelectCategory(suggestion.category);
    }
    setIsFocused(false);
    if (onSelectSuggestion) {
      onSelectSuggestion(suggestion);
    }
  };

  return (
    <div className="space-y-3 relative">
      {/* Search Input & Controls */}
      <div className="flex items-center gap-2">
        <div ref={searchContainerRef} className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search iPhone, MacBook, Sony, Galaxy..."
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setIsFocused(true);
            }}
            onFocus={() => setIsFocused(true)}
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => {
                onSearchChange('');
                setIsFocused(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Real-time Autocomplete Suggestions Dropdown */}
          {isFocused && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-slate-200 shadow-xl z-30 overflow-hidden divide-y divide-slate-100 animate-in fade-in duration-150">
              {isSuggestionsLoading ? (
                <div className="p-3 text-xs text-slate-400 text-center animate-pulse">
                  Searching 1Fi catalog...
                </div>
              ) : suggestions.length > 0 ? (
                <div>
                  <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Instant Matches
                  </div>
                  {suggestions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSuggestionClick(item)}
                      className="p-2.5 flex items-center justify-between hover:bg-brand-50/60 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.image ? (
                          <div className="relative w-8 h-8 rounded-lg bg-slate-50 p-0.5 border border-slate-100 shrink-0">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-contain p-0.5"
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center text-xs font-bold shrink-0">
                            <Sparkles className="w-4 h-4" />
                          </div>
                        )}
                        <div className="truncate">
                          <span className="text-xs font-bold text-slate-900 block truncate">
                            {item.title}
                          </span>
                          {item.price && (
                            <span className="text-[11px] text-brand-700 font-semibold">
                              ₹{item.price.toLocaleString('en-IN')} (0% EMI)
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 text-xs text-slate-500 text-center">
                  No matching gadgets found.
                </div>
              )}
            </div>
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
