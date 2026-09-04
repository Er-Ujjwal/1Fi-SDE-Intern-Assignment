import { NextRequest, NextResponse } from 'next/server';
import { backendStore } from '@/lib/backendStore';
import { ApiResponse, NearbyStore } from '@/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const latParam = searchParams.get('lat');
  const lngParam = searchParams.get('lng');
  const city = searchParams.get('city') || undefined;
  const chain = searchParams.get('chain') || undefined;

  let lat: number | undefined;
  let lng: number | undefined;

  if (latParam && lngParam) {
    const parsedLat = parseFloat(latParam);
    const parsedLng = parseFloat(lngParam);
    if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
      lat = parsedLat;
      lng = parsedLng;
    }
  }

  const stores = backendStore.getNearbyStores(lat, lng, city, chain);

  const response: ApiResponse<NearbyStore[]> = {
    success: true,
    data: stores,
    timestamp: new Date().toISOString(),
    meta: {
      total: stores.length,
    },
  };

  return NextResponse.json(response);
}
