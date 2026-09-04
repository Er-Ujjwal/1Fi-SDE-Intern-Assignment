import { NextResponse } from 'next/server';
import { backendStore } from '@/lib/backendStore';
import { ApiResponse, CategoryId } from '@/types';

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  count: number;
  description: string;
}

export async function GET() {
  const products = backendStore.getProducts();

  const categories: CategoryInfo[] = [
    {
      id: 'all',
      label: 'All Devices',
      count: products.length,
      description: 'Browse all zero-interest mutual fund backed gadgets',
    },
    {
      id: 'smartphones',
      label: 'Smartphones',
      count: products.filter((p) => p.category === 'smartphones').length,
      description: 'Apple iPhone, Samsung Galaxy & OnePlus flagships',
    },
    {
      id: 'laptops',
      label: 'Laptops',
      count: products.filter((p) => p.category === 'laptops').length,
      description: 'Apple MacBook Air, MacBook Pro & ultraportables',
    },
    {
      id: 'audio',
      label: 'Audio',
      count: products.filter((p) => p.category === 'audio').length,
      description: 'Sony ANC headphones, Apple AirPods Pro & speakers',
    },
    {
      id: 'tablets',
      label: 'Tablets',
      count: products.filter((p) => p.category === 'tablets').length,
      description: 'Apple iPad Air, iPad Pro with stylus support',
    },
    {
      id: 'wearables',
      label: 'Watches',
      count: products.filter((p) => p.category === 'wearables').length,
      description: 'Apple Watch Ultra, smart fitness wearables',
    },
  ];

  const response: ApiResponse<CategoryInfo[]> = {
    success: true,
    data: categories,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response);
}
