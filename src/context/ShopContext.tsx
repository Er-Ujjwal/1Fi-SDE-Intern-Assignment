'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CategoryId, OrderConfirmationData, Product, ShopTabId, SortOption } from '@/types';

interface ShopContextType {
  activeTab: ShopTabId;
  setActiveTab: (tab: ShopTabId) => void;
  category: CategoryId;
  setCategory: (category: CategoryId) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isEmisModalOpen: boolean;
  setIsEmisModalOpen: (open: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<ShopTabId>('marketplace');
  const [category, setCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isEmisModalOpen, setIsEmisModalOpen] = useState<boolean>(false);

  return (
    <ShopContext.Provider
      value={{
        activeTab,
        setActiveTab,
        category,
        setCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        isMobileFrame,
        setIsMobileFrame,
        quickViewProduct,
        setQuickViewProduct,
        isEmisModalOpen,
        setIsEmisModalOpen,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
