import { NextResponse } from 'next/server';
import { backendStore } from '@/lib/backendStore';
import { ApiResponse, BrandPartner } from '@/types';

export async function GET() {
  const brands = backendStore.getBrands();

  const response: ApiResponse<BrandPartner[]> = {
    success: true,
    data: brands,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response);
}
