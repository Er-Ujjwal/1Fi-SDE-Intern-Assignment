import { NextRequest, NextResponse } from 'next/server';
import { MOCK_PRODUCTS } from '@/services/mockData';
import { ApiResponse, CategoryId, Product, SortOption } from '@/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = (searchParams.get('category') || 'all') as CategoryId;
  const search = (searchParams.get('search') || '').toLowerCase().trim();
  const sortBy = (searchParams.get('sortBy') || 'featured') as SortOption;
  const simulateError = searchParams.get('simulateError') === 'true';
  const delayMs = parseInt(searchParams.get('delay') || '300', 10);

  // Artificial delay to demonstrate high-polish skeleton states
  if (delayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  // Error simulation for reviewer testing
  if (simulateError) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to fetch 1Fi marketplace catalog. Simulated network/server error.',
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  let filtered: Product[] = [...MOCK_PRODUCTS];

  // Category filter
  if (category !== 'all') {
    filtered = filtered.filter((p) => p.category === category);
  }

  // Search filter
  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.highlights.some((h) => h.toLowerCase().includes(search))
    );
  }

  // Sorting
  switch (sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.basePrice - b.basePrice);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.basePrice - a.basePrice);
      break;
    case 'discount':
      filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'featured':
    default:
      filtered.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
      break;
  }

  const response: ApiResponse<Product[]> = {
    success: true,
    data: filtered,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response);
}
