'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services/api';
import { Product } from '@/types';

interface UseProductDetailResult {
  product: Product | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  simulateErrorState: () => void;
  resetErrorSimulation: () => void;
}

export function useProductDetail(id: string): UseProductDetailResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [forceSimulateError, setForceSimulateError] = useState<boolean>(false);

  const fetchDetail = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const data = await apiService.getProductById(id, forceSimulateError);
      setProduct(data);
    } catch (err: unknown) {
      setIsError(true);
      setError(err instanceof Error ? err.message : `Failed to load product ${id}`);
    } finally {
      setIsLoading(false);
    }
  }, [id, forceSimulateError]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const simulateErrorState = useCallback(() => {
    setForceSimulateError(true);
  }, []);

  const resetErrorSimulation = useCallback(() => {
    setForceSimulateError(false);
  }, []);

  return {
    product,
    isLoading,
    isError,
    error,
    refetch: fetchDetail,
    simulateErrorState,
    resetErrorSimulation,
  };
}
