import { NextRequest, NextResponse } from 'next/server';
import { backendStore } from '@/lib/backendStore';
import { ApiResponse, SearchSuggestion } from '@/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = (searchParams.get('q') || '').trim().toLowerCase();

  if (!q) {
    return NextResponse.json({
      success: true,
      data: [],
      timestamp: new Date().toISOString(),
    });
  }

  const products = backendStore.getProducts();
  const suggestions: SearchSuggestion[] = [];

  // Match products
  for (const product of products) {
    if (
      product.name.toLowerCase().includes(q) ||
      product.brand.toLowerCase().includes(q) ||
      product.highlights.some((h) => h.toLowerCase().includes(q))
    ) {
      suggestions.push({
        id: product.id,
        title: product.name,
        type: 'product',
        category: product.category,
        price: product.basePrice,
        image: product.image,
      });
    }
  }

  // Match brand names
  const brands = ['Apple', 'Samsung', 'Sony', 'OnePlus', 'Dell'];
  for (const brand of brands) {
    if (brand.toLowerCase().includes(q) && !suggestions.some((s) => s.title === brand)) {
      suggestions.push({
        id: `brand-${brand.toLowerCase()}`,
        title: `${brand} Official Store`,
        type: 'brand',
      });
    }
  }

  const response: ApiResponse<SearchSuggestion[]> = {
    success: true,
    data: suggestions.slice(0, 6),
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response);
}
