'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services/api';
import { EMIPlan } from '@/types';

interface UseEMIPlansResult {
  plans: EMIPlan[];
  selectedPlan: EMIPlan | null;
  setSelectedPlan: (plan: EMIPlan) => void;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useEMIPlans(productId: string, price?: number): UseEMIPlansResult {
  const [plans, setPlans] = useState<EMIPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<EMIPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    if (!productId) return;
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const data = await apiService.getEMIPlans(productId, price);
      setPlans(data);
      // Default to the recommended plan (e.g. 12 months) or the first plan
      const defaultPlan = data.find((p) => p.isRecommended) || data[0] || null;
      setSelectedPlan(defaultPlan);
    } catch (err: unknown) {
      setIsError(true);
      setError(err instanceof Error ? err.message : 'Failed to calculate EMI plans');
    } finally {
      setIsLoading(false);
    }
  }, [productId, price]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return {
    plans,
    selectedPlan,
    setSelectedPlan,
    isLoading,
    isError,
    error,
    refetch: fetchPlans,
  };
}
