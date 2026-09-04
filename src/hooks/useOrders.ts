'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services/api';
import { Order, Product, ProductVariant, EMIPlan } from '@/types';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const data = await apiService.getOrders();
      setOrders(data);
    } catch (err: unknown) {
      setIsError(true);
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const placeOrder = async (payload: {
    product: Product;
    variant: ProductVariant;
    emiPlan: EMIPlan;
    schemeName?: string;
  }): Promise<Order> => {
    const createdOrder = await apiService.createOrder(payload);
    setOrders((prev) => [createdOrder, ...prev]);
    return createdOrder;
  };

  return {
    orders,
    isLoading,
    isError,
    error,
    refetch: fetchOrders,
    placeOrder,
  };
}
