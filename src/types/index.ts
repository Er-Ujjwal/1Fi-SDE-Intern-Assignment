export type CategoryId = 'all' | 'smartphones' | 'laptops' | 'audio' | 'tablets' | 'wearables';

export type ShopTabId = 'marketplace' | 'brands' | 'stores';

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'discount' | 'rating';

export interface VariantColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductVariant {
  id: string;
  storage?: string;
  colorName?: string;
  colorHex?: string;
  price: number;
  mrp: number;
  image: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  rating: number;
  reviewCount: number;
  image: string;
  galleryImages: string[];
  basePrice: number;
  baseMrp: number;
  discountPercentage: number;
  badge?: string;
  isTrending?: boolean;
  availableStorages?: string[];
  availableColors?: VariantColor[];
  variants: ProductVariant[];
  minMonthlyEmi: number;
  maxTenureMonths: number;
}

export interface EMIPlan {
  tenureMonths: number;
  monthlyAmount: number;
  totalAmount: number;
  interestRate: number; // Always 0% in 1Fi's model
  processingFee: number; // ₹0 in 1Fi's model
  downPayment: number; // ₹0 upfront
  mfCollateralRequired: number; // Portfolio pledge value (e.g. 1.5x)
  creditCardInterestSaved: number; // Estimated savings vs traditional credit card EMI
  isRecommended?: boolean;
  isPopular?: boolean;
  tag?: string;
}

export interface MutualFundScheme {
  id: string;
  name: string;
  amc: string;
  category: string;
  currentValue: number;
  availableUnits: number;
  nav: number;
  growthPercentage: number;
  isPledged?: boolean;
}

export interface MutualFundPortfolio {
  totalPortfolioValue: number;
  availableCreditLimit: number;
  currentPledgedValue: number;
  eligibleSchemes: MutualFundScheme[];
}

export interface EMIScheduleItem {
  installmentNumber: number;
  dueDate: string;
  amount: number;
  status: 'PAID' | 'UPCOMING' | 'DUE';
  paymentMode: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  productId: string;
  productName: string;
  productBrand: string;
  productImage: string;
  variant: ProductVariant;
  emiPlan: EMIPlan;
  totalPrice: number;
  monthlyEmi: number;
  tenureMonths: number;
  pledgedScheme: {
    schemeName: string;
    amc: string;
    pledgedValue: number;
    lienReferenceId: string;
  };
  mandateBank: {
    bankName: string;
    accountMask: string;
    mandateId: string;
  };
  status: 'ACTIVE_EMI' | 'COMPLETED' | 'PROCESSING';
  orderDate: string;
  estimatedDeliveryDate: string;
  schedule: EMIScheduleItem[];
}

export interface SearchSuggestion {
  id: string;
  title: string;
  type: 'product' | 'brand' | 'category';
  category?: CategoryId;
  price?: number;
  image?: string;
}

export interface BrandPartner {
  id: string;
  name: string;
  category: string;
  itemCount: number;
  logo: string;
  status: 'Active Partner' | 'Integration Coming Soon';
  discountBanner?: string;
}

export interface NearbyStore {
  id: string;
  name: string;
  chain: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  pincode: string;
  supports1FiQR: boolean;
  phone: string;
  timings: string;
  popularDeals: string[];
  image: string;
}

export interface OrderConfirmationData {
  orderId: string;
  product: Product;
  selectedVariant: ProductVariant;
  selectedPlan: EMIPlan;
  timestamp: string;
  pledgedSchemes: string[];
  firstEmiDate: string;
  mandateBank: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}
