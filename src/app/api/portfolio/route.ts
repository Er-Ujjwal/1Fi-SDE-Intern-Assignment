import { NextResponse } from 'next/server';
import { MOCK_USER_PORTFOLIO } from '@/services/mockData';
import { ApiResponse, MutualFundPortfolio } from '@/types';

export async function GET() {
  const response: ApiResponse<MutualFundPortfolio> = {
    success: true,
    data: MOCK_USER_PORTFOLIO,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response);
}
