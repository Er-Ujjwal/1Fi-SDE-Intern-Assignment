import { NextRequest, NextResponse } from 'next/server';
import { backendStore } from '@/lib/backendStore';
import { ApiResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, tenureMonths, schemeName } = body;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Valid collateral amount is required.',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const portfolio = backendStore.getPortfolio();
    if (portfolio.availableCreditLimit < amount) {
      return NextResponse.json(
        {
          success: false,
          error: `Insufficient available credit limit (Requested: ₹${amount}, Available: ₹${portfolio.availableCreditLimit}).`,
          timestamp: new Date().toISOString(),
        },
        { status: 422 }
      );
    }

    const lienReferenceId = `LIEN-CAMS-${Math.floor(100000 + Math.random() * 900000)}`;

    const response: ApiResponse<{
      lienReferenceId: string;
      pledgedAmount: number;
      tenureMonths: number;
      schemeName: string;
      status: string;
      authorizedAt: string;
    }> = {
      success: true,
      data: {
        lienReferenceId,
        pledgedAmount: amount,
        tenureMonths: tenureMonths || 12,
        schemeName: schemeName || portfolio.eligibleSchemes[0]?.name || 'Parag Parikh Flexi Cap Fund',
        status: 'LIEN_MARKED_ACTIVE',
        authorizedAt: new Date().toISOString(),
      },
      message: 'Mutual fund collateral successfully authorized with CAMS/KFintech depository.',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to authorize pledge.',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
