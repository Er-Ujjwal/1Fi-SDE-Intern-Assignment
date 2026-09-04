import { NextRequest, NextResponse } from 'next/server';
import { backendStore } from '@/lib/backendStore';
import { ApiResponse, Order } from '@/types';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const order = backendStore.getOrderById(id);

  if (!order) {
    return NextResponse.json(
      {
        success: false,
        error: `Order with ID or Number "${id}" was not found.`,
        timestamp: new Date().toISOString(),
      },
      { status: 404 }
    );
  }

  const response: ApiResponse<Order> = {
    success: true,
    data: order,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response);
}
