import { NextRequest, NextResponse } from 'next/server';
import { MOCK_PRODUCTS } from '@/services/mockData';
import { ApiResponse, Product } from '@/types';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const searchParams = request.nextUrl.searchParams;
  const simulateError = searchParams.get('simulateError') === 'true';
  const delayMs = parseInt(searchParams.get('delay') || '200', 10);

  if (delayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  if (simulateError) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      data: null,
      error: `Failed to fetch product with ID "${id}". Simulated error for testing.`,
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    const notFoundResponse: ApiResponse<null> = {
      success: false,
      data: null,
      error: `Product with ID "${id}" was not found.`,
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(notFoundResponse, { status: 404 });
  }

  const response: ApiResponse<Product> = {
    success: true,
    data: product,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response);
}
