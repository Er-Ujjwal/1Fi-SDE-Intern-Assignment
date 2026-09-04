'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiService, FetchProductsParams } from '@/services/api';
import { Product } from '@/types';

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  simulateErrorState: () => void;
  resetErrorSimulation: () => void;
}

export function useProducts(params: FetchProductsParams = {}): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [forceSimulateError, setForceSimulateError] = useState<boolean>(false);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const data = await apiService.getProducts({
        ...params,
        simulateError: forceSimulateError || params.simulateError,
      });
      setProducts(data);
    } catch (err: unknown) {
      setIsError(true);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred while fetching products.');
    } finally {
      setIsLoading(false);
    }
  }, [params.category, params.search, params.sortBy, forceSimulateError, params.simulateError, params.delay]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const simulateErrorState = useCallback(() => {
    setForceSimulateError(true);
  }, []);

  const resetErrorSimulation = useCallback(() => {
    setForceSimulateError(false);
  }, []);

  return {
    products,
    isLoading,
    isError,
    error,
    refetch: fetchProducts,
    simulateErrorState,
    resetErrorSimulation,
  };
}
