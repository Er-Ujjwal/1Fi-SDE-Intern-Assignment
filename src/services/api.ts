import { ApiResponse, CategoryId, EMIPlan, MutualFundPortfolio, Product, SortOption } from '@/types';

export interface FetchProductsParams {
  category?: CategoryId;
  search?: string;
  sortBy?: SortOption;
  simulateError?: boolean;
  delay?: number;
}

export const apiService = {
  /**
   * Fetch product catalog with filters, search query, sorting
   */
  async getProducts(params: FetchProductsParams = {}): Promise<Product[]> {
    const searchParams = new URLSearchParams();
    if (params.category && params.category !== 'all') searchParams.set('category', params.category);
    if (params.search) searchParams.set('search', params.search);
    if (params.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params.simulateError) searchParams.set('simulateError', 'true');
    if (params.delay) searchParams.set('delay', params.delay.toString());

    const queryString = searchParams.toString();
    const url = `/api/products${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(url, { cache: 'no-store' });
    const json: ApiResponse<Product[]> = await res.json();

    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Failed to fetch products');
    }

    return json.data;
  },

  /**
   * Fetch single product by ID
   */
  async getProductById(id: string, simulateError = false): Promise<Product> {
    const url = `/api/products/${id}${simulateError ? '?simulateError=true' : ''}`;
    const res = await fetch(url, { cache: 'no-store' });
    const json: ApiResponse<Product> = await res.json();

    if (!res.ok || !json.success) {
      throw new Error(json.error || `Failed to fetch product ${id}`);
    }

    return json.data;
  },

  /**
   * Fetch dynamic 0% EMI plans for a specific product and variant price
   */
  async getEMIPlans(productId: string, price?: number, simulateError = false): Promise<EMIPlan[]> {
    const searchParams = new URLSearchParams();
    if (price) searchParams.set('price', price.toString());
    if (simulateError) searchParams.set('simulateError', 'true');

    const queryString = searchParams.toString();
    const url = `/api/products/${productId}/emi-plans${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(url, { cache: 'no-store' });
    const json: ApiResponse<EMIPlan[]> = await res.json();

    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Failed to calculate EMI plans');
    }

    return json.data;
  },

  /**
   * Fetch user's mutual fund credit limit and eligible holdings
   */
  async getPortfolio(): Promise<MutualFundPortfolio> {
    const res = await fetch('/api/portfolio', { cache: 'no-store' });
    const json: ApiResponse<MutualFundPortfolio> = await res.json();

    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Failed to fetch portfolio');
    }

    return json.data;
  },
};
