'use client';

import React from 'react';
import { Product, ProductVariant, VariantColor } from '@/types';
import { Check } from 'lucide-react';

interface VariantSelectorProps {
  product: Product;
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
  selectedColor?: VariantColor;
  onSelectColor?: (color: VariantColor) => void;
  selectedStorage?: string;
  onSelectStorage?: (storage: string) => void;
}

export function VariantSelector({
  product,
  selectedVariant,
  onSelectVariant,
  selectedColor,
  onSelectColor,
  selectedStorage,
  onSelectStorage,
}: VariantSelectorProps) {
  const hasColors = product.availableColors && product.availableColors.length > 0;
  const hasStorages = product.availableStorages && product.availableStorages.length > 0;

  if (!hasColors && !hasStorages && product.variants.length <= 1) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Color Selection */}
      {hasColors && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Select Color</span>
            <span className="font-semibold text-brand-600">
              {selectedVariant.colorName || selectedColor?.name || 'Default'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {product.availableColors!.map((color) => {
              const isSelected =
                (selectedVariant.colorName && selectedVariant.colorName === color.name) ||
                (selectedColor && selectedColor.name === color.name);

              return (
                <button
                  key={color.name}
                  onClick={() => {
                    if (onSelectColor) onSelectColor(color);
                    // Match corresponding variant if present
                    const matchedVariant = product.variants.find((v) =>
                      v.colorName === color.name &&
                      (!selectedStorage || v.storage === selectedStorage)
                    ) || product.variants.find((v) => v.colorName === color.name);

                    if (matchedVariant) onSelectVariant(matchedVariant);
                  }}
                  className={`relative flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/50 shadow-xs ring-2 ring-brand-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-slate-300 shadow-inner flex items-center justify-center"
                    style={{ backgroundColor: color.hex }}
                  >
                    {isSelected && (
                      <Check
                        className={`w-2.5 h-2.5 ${
                          color.hex === '#FFFFFF' || color.hex === '#E2E4E1' || color.hex === '#EBE5D8'
                            ? 'text-slate-900'
                            : 'text-white'
                        }`}
                      />
                    )}
                  </span>
                  <span className="text-xs font-semibold text-slate-800">{color.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Storage / Configuration Selection */}
      {hasStorages && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Select Storage</span>
            <span className="font-semibold text-brand-600">
              {selectedVariant.storage || selectedStorage || 'Default'}
            </span>
          </div>

          <div className="grid grid-cols-2 xs:grid-cols-4 gap-2">
            {product.availableStorages!.map((storage) => {
              const isSelected =
                (selectedVariant.storage && selectedVariant.storage === storage) ||
                selectedStorage === storage;

              // Find price for this storage
              const storageVariant = product.variants.find((v) => v.storage === storage);
              const priceText = storageVariant
                ? `₹${storageVariant.price.toLocaleString('en-IN')}`
                : undefined;

              return (
                <button
                  key={storage}
                  onClick={() => {
                    if (onSelectStorage) onSelectStorage(storage);
                    const matchedVariant = product.variants.find((v) =>
                      v.storage === storage &&
                      (!selectedColor || v.colorName === selectedColor.name)
                    ) || product.variants.find((v) => v.storage === storage);

                    if (matchedVariant) onSelectVariant(matchedVariant);
                  }}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/60 shadow-xs ring-2 ring-brand-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`text-xs font-bold ${
                      isSelected ? 'text-brand-800' : 'text-slate-800'
                    }`}
                  >
                    {storage}
                  </span>
                  {priceText && (
                    <span className="text-[10px] text-slate-500 mt-0.5 font-medium">
                      {priceText}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
