import { NextRequest, NextResponse } from 'next/server';
import { calculateEMIPlans, MOCK_PRODUCTS } from '@/services/mockData';
import { ApiResponse, EMIPlan } from '@/types';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const searchParams = request.nextUrl.searchParams;
  const priceParam = searchParams.get('price');
  const simulateError = searchParams.get('simulateError') === 'true';

  if (simulateError) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to calculate 1Fi 0% EMI plans. Network simulation error.',
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  let price = product ? product.basePrice : 50000;

  if (priceParam) {
    const parsed = parseInt(priceParam, 10);
    if (!isNaN(parsed) && parsed > 0) {
      price = parsed;
    }
  }

  const plans = calculateEMIPlans(price);

  const response: ApiResponse<EMIPlan[]> = {
    success: true,
    data: plans,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response);
}
