'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { MutualFundPortfolio } from '@/types';

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<MutualFundPortfolio | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    apiService
      .getPortfolio()
      .then((data) => {
        if (isMounted) setPortfolio(data);
      })
      .catch((err) => {
        console.error('Failed to load portfolio:', err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { portfolio, isLoading };
}
