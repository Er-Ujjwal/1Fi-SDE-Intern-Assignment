import {
  ApiResponse,
  BrandPartner,
  CategoryId,
  EMIPlan,
  MutualFundPortfolio,
  NearbyStore,
  Order,
  Product,
  ProductVariant,
  SearchSuggestion,
  SortOption,
} from '@/types';

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

  /**
   * Place a new order with digital mutual fund pledge
   */
  async createOrder(payload: {
    product: Product;
    variant: ProductVariant;
    emiPlan: EMIPlan;
    schemeName?: string;
  }): Promise<Order> {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json: ApiResponse<Order> = await res.json();

    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Failed to place 1Fi order');
    }

    return json.data;
  },

  /**
   * Fetch active and past 1Fi orders
   */
  async getOrders(): Promise<Order[]> {
    const res = await fetch('/api/orders', { cache: 'no-store' });
    const json: ApiResponse<Order[]> = await res.json();

    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Failed to fetch orders');
    }

    return json.data;
  },

  /**
   * Fetch single order by ID
   */
  async getOrderById(id: string): Promise<Order> {
    const res = await fetch(`/api/orders/${id}`, { cache: 'no-store' });
    const json: ApiResponse<Order> = await res.json();

    if (!res.ok || !json.success) {
      throw new Error(json.error || `Failed to fetch order ${id}`);
    }

    return json.data;
  },

  /**
   * Search suggestions autocomplete
   */
  async getSearchSuggestions(query: string): Promise<SearchSuggestion[]> {
    if (!query.trim()) return [];
    const res = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`, {
      cache: 'no-store',
    });
    const json: ApiResponse<SearchSuggestion[]> = await res.json();

    if (!res.ok || !json.success) {
      return [];
    }

    return json.data;
  },

  /**
   * Fetch official brand partners
   */
  async getBrands(): Promise<BrandPartner[]> {
    const res = await fetch('/api/brands', { cache: 'no-store' });
    const json: ApiResponse<BrandPartner[]> = await res.json();
    return json.success ? json.data : [];
  },

  /**
   * Fetch nearby partner stores with optional user geolocation & filters
   */
  async getNearbyStores(params: {
    lat?: number;
    lng?: number;
    city?: string;
    chain?: string;
  } = {}): Promise<NearbyStore[]> {
    const searchParams = new URLSearchParams();
    if (params.lat !== undefined) searchParams.set('lat', params.lat.toString());
    if (params.lng !== undefined) searchParams.set('lng', params.lng.toString());
    if (params.city) searchParams.set('city', params.city);
    if (params.chain) searchParams.set('chain', params.chain);

    const queryString = searchParams.toString();
    const url = `/api/nearby-stores${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(url, { cache: 'no-store' });
    const json: ApiResponse<NearbyStore[]> = await res.json();
    return json.success ? json.data : [];
  },
};
