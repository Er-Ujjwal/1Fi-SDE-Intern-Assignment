import { NextRequest, NextResponse } from 'next/server';
import { backendStore } from '@/lib/backendStore';
import { ApiResponse, Order } from '@/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');

  let orders = backendStore.getOrders();

  if (status) {
    orders = orders.filter((o) => o.status === status);
  }

  const response: ApiResponse<Order[]> = {
    success: true,
    data: orders,
    timestamp: new Date().toISOString(),
    meta: {
      total: orders.length,
    },
  };

  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { product, variant, emiPlan, schemeName } = body;

    if (!product || !variant || !emiPlan) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required order fields (product, variant, emiPlan).',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // Validate that user has enough credit limit
    const portfolio = backendStore.getPortfolio();
    if (portfolio.availableCreditLimit < emiPlan.mfCollateralRequired) {
      return NextResponse.json(
        {
          success: false,
          error: `Insufficient available credit limit. Required: ₹${emiPlan.mfCollateralRequired}, Available: ₹${portfolio.availableCreditLimit}`,
          timestamp: new Date().toISOString(),
        },
        { status: 422 }
      );
    }

    const newOrder = backendStore.createOrder({
      product,
      variant,
      emiPlan,
      schemeName,
    });

    const response: ApiResponse<Order> = {
      success: true,
      data: newOrder,
      message: 'Order created successfully and digital mutual fund lien established.',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal Server Error while creating order',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
