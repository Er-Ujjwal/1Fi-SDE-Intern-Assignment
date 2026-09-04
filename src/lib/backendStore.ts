import {
  Product,
  Order,
  MutualFundPortfolio,
  BrandPartner,
  NearbyStore,
  EMIScheduleItem,
  ProductVariant,
  EMIPlan,
} from '@/types';
import { MOCK_PRODUCTS, MOCK_USER_PORTFOLIO } from '@/services/mockData';

// Initialized brand partners
const INITIAL_BRANDS: BrandPartner[] = [
  {
    id: 'brand-apple',
    name: 'Apple',
    category: 'Premium Smartphones, Laptops & Wearables',
    itemCount: 4,
    logo: '🍎',
    status: 'Active Partner',
    discountBanner: 'Up to 24 Months 0% EMI with 1Fi',
  },
  {
    id: 'brand-samsung',
    name: 'Samsung',
    category: 'Galaxy Smartphones, Displays & Audio',
    itemCount: 2,
    logo: '🌌',
    status: 'Active Partner',
    discountBanner: '0 Down Payment on Flagship AI Phones',
  },
  {
    id: 'brand-sony',
    name: 'Sony',
    category: 'Industry-Leading Audio & Cameras',
    itemCount: 1,
    logo: '🎧',
    status: 'Active Partner',
    discountBanner: 'Save ₹3,800 vs Credit Card Interest',
  },
  {
    id: 'brand-oneplus',
    name: 'OnePlus',
    category: 'Flagship Speed & Fast Charging',
    itemCount: 1,
    logo: '⚡',
    status: 'Active Partner',
    discountBanner: '0% Interest from ₹2,708/mo',
  },
  {
    id: 'brand-dell',
    name: 'Dell Technologies',
    category: 'High Performance Laptops & Monitors',
    itemCount: 3,
    logo: '💻',
    status: 'Integration Coming Soon',
    discountBanner: 'Official Brand Store Coming Soon',
  },
];

// Initialized nearby stores with rich geolocation and Indian cities
const INITIAL_NEARBY_STORES: NearbyStore[] = [
  {
    id: 'store-croma-indiranagar',
    name: 'Croma - Indiranagar 100ft Road',
    chain: 'Croma',
    address: '100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    city: 'Bengaluru',
    latitude: 12.9716,
    longitude: 77.6412,
    distanceKm: 0.8,
    pincode: '560038',
    supports1FiQR: true,
    phone: '+91 80 4123 4567',
    timings: '10:30 AM - 9:30 PM (Open Today)',
    popularDeals: ['Apple iPhone 15 Pro', 'MacBook Air M3', 'Sony WH-1000XM5'],
    image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'store-reliance-koramangala',
    name: 'Reliance Digital - Koramangala 80ft Road',
    chain: 'Reliance Digital',
    address: '80 Feet Rd, 4th Block, Koramangala, Bengaluru, Karnataka 560034',
    city: 'Bengaluru',
    latitude: 12.9352,
    longitude: 77.6245,
    distanceKm: 2.3,
    pincode: '560034',
    supports1FiQR: true,
    phone: '+91 80 2552 9876',
    timings: '11:00 AM - 10:00 PM (Open Today)',
    popularDeals: ['Samsung Galaxy S24 Ultra', 'OnePlus 12', 'LG OLED 4K'],
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'store-vijay-sales-mgroad',
    name: 'Vijay Sales - MG Road Flagship',
    chain: 'Vijay Sales',
    address: 'MG Road, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001',
    city: 'Bengaluru',
    latitude: 12.9754,
    longitude: 77.6083,
    distanceKm: 3.5,
    pincode: '560001',
    supports1FiQR: true,
    phone: '+91 80 2221 3456',
    timings: '10:00 AM - 9:00 PM (Open Today)',
    popularDeals: ['iPad Air M2', 'Apple Watch Ultra 2', 'Bose QuietComfort'],
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'store-imagine-phoenix',
    name: 'Imagine Apple Authorised - Phoenix Marketcity',
    chain: 'Apple Premium Reseller',
    address: 'Ground Floor, Phoenix Marketcity, Whitefield Main Rd, Bengaluru 560048',
    city: 'Bengaluru',
    latitude: 12.9959,
    longitude: 77.6964,
    distanceKm: 5.8,
    pincode: '560048',
    supports1FiQR: true,
    phone: '+91 80 6726 6000',
    timings: '10:00 AM - 10:00 PM (Open Today)',
    popularDeals: ['iPhone 15 Series', 'MacBook Pro M3', 'AirPods Pro 2'],
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'store-croma-bandra',
    name: 'Croma - Bandra Linking Road',
    chain: 'Croma',
    address: 'Linking Road, Khar West, Mumbai, Maharashtra 400052',
    city: 'Mumbai',
    latitude: 19.0600,
    longitude: 72.8335,
    distanceKm: 1.1,
    pincode: '400052',
    supports1FiQR: true,
    phone: '+91 22 6123 7890',
    timings: '11:00 AM - 10:00 PM (Open Today)',
    popularDeals: ['MacBook Air M3', 'Sony WH-1000XM5', 'Apple Watch Ultra 2'],
    image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'store-reliance-cp',
    name: 'Reliance Digital - Connaught Place Outer Circle',
    chain: 'Reliance Digital',
    address: 'Connaught Place Outer Circle, New Delhi 110001',
    city: 'Delhi NCR',
    latitude: 28.6315,
    longitude: 77.2167,
    distanceKm: 1.5,
    pincode: '110001',
    supports1FiQR: true,
    phone: '+91 11 4321 8765',
    timings: '10:30 AM - 9:30 PM (Open Today)',
    popularDeals: ['Samsung Galaxy S24 Ultra', 'iPhone 15 Pro', 'OnePlus 12'],
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80',
  },
];

// Initial demo active order
const INITIAL_ORDERS: Order[] = [
  {
    id: 'order-1fi-78921',
    orderNumber: '1FI-789214',
    productId: 'prod-sony-wh1000xm5',
    productName: 'Sony WH-1000XM5 Wireless Headphones',
    productBrand: 'Sony',
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    variant: {
      id: 'var-xm5-blk',
      colorName: 'Black',
      price: 28990,
      mrp: 34990,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      inStock: true,
    },
    emiPlan: {
      tenureMonths: 6,
      monthlyAmount: 4832,
      totalAmount: 28990,
      interestRate: 0,
      processingFee: 0,
      downPayment: 0,
      mfCollateralRequired: 43485,
      creditCardInterestSaved: 1840,
    },
    totalPrice: 28990,
    monthlyEmi: 4832,
    tenureMonths: 6,
    pledgedScheme: {
      schemeName: 'Parag Parikh Flexi Cap Fund - Direct (Growth)',
      amc: 'PPFAS Mutual Fund',
      pledgedValue: 43485,
      lienReferenceId: 'LIEN-CAMS-884102',
    },
    mandateBank: {
      bankName: 'HDFC Bank',
      accountMask: '•••• 4192',
      mandateId: 'UMRN-HDFC-992104',
    },
    status: 'ACTIVE_EMI',
    orderDate: '2026-08-05T10:30:00.000Z',
    estimatedDeliveryDate: 'Delivered on 08 Aug 2026',
    schedule: [
      {
        installmentNumber: 1,
        dueDate: '05 Sep 2026',
        amount: 4832,
        status: 'PAID',
        paymentMode: 'Auto-Debit (e-NACH)',
      },
      {
        installmentNumber: 2,
        dueDate: '05 Oct 2026',
        amount: 4832,
        status: 'UPCOMING',
        paymentMode: 'Auto-Debit (e-NACH)',
      },
      {
        installmentNumber: 3,
        dueDate: '05 Nov 2026',
        amount: 4832,
        status: 'UPCOMING',
        paymentMode: 'Auto-Debit (e-NACH)',
      },
      {
        installmentNumber: 4,
        dueDate: '05 Dec 2026',
        amount: 4832,
        status: 'UPCOMING',
        paymentMode: 'Auto-Debit (e-NACH)',
      },
      {
        installmentNumber: 5,
        dueDate: '05 Jan 2027',
        amount: 4832,
        status: 'UPCOMING',
        paymentMode: 'Auto-Debit (e-NACH)',
      },
      {
        installmentNumber: 6,
        dueDate: '05 Feb 2027',
        amount: 4832,
        status: 'UPCOMING',
        paymentMode: 'Auto-Debit (e-NACH)',
      },
    ],
  },
];

// Helper to calculate Haversine distance in km
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// Helper to format upcoming monthly dates
function generateEMISchedule(tenureMonths: number, monthlyAmount: number): EMIScheduleItem[] {
  const schedule: EMIScheduleItem[] = [];
  const currentDate = new Date();

  for (let i = 1; i <= tenureMonths; i++) {
    const dueDateObj = new Date(currentDate);
    dueDateObj.setMonth(currentDate.getMonth() + i);
    dueDateObj.setDate(5); // Due on 5th of each month

    const dateStr = dueDateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    schedule.push({
      installmentNumber: i,
      dueDate: dateStr,
      amount: monthlyAmount,
      status: 'UPCOMING',
      paymentMode: 'Auto-Debit (e-NACH / UPI)',
    });
  }

  return schedule;
}

// Global in-memory singleton to persist across hot-reloads in development
declare global {
  // eslint-disable-next-line no-var
  var __1fi_backend_store__: {
    products: Product[];
    portfolio: MutualFundPortfolio;
    orders: Order[];
    brands: BrandPartner[];
    nearbyStores: NearbyStore[];
  } | undefined;
}

if (!global.__1fi_backend_store__) {
  global.__1fi_backend_store__ = {
    products: [...MOCK_PRODUCTS],
    portfolio: JSON.parse(JSON.stringify(MOCK_USER_PORTFOLIO)),
    orders: [...INITIAL_ORDERS],
    brands: [...INITIAL_BRANDS],
    nearbyStores: [...INITIAL_NEARBY_STORES],
  };
}

export const backendStore = {
  getProducts(): Product[] {
    return global.__1fi_backend_store__!.products;
  },

  getProductById(id: string): Product | undefined {
    return global.__1fi_backend_store__!.products.find((p) => p.id === id);
  },

  getPortfolio(): MutualFundPortfolio {
    return global.__1fi_backend_store__!.portfolio;
  },

  getOrders(): Order[] {
    return global.__1fi_backend_store__!.orders;
  },

  getOrderById(id: string): Order | undefined {
    return global.__1fi_backend_store__!.orders.find((o) => o.id === id || o.orderNumber === id);
  },

  getBrands(): BrandPartner[] {
    return global.__1fi_backend_store__!.brands;
  },

  getNearbyStores(userLat?: number, userLng?: number, city?: string, chain?: string): NearbyStore[] {
    let list = [...global.__1fi_backend_store__!.nearbyStores];

    if (city && city !== 'All') {
      list = list.filter((s) => s.city.toLowerCase() === city.toLowerCase());
    }

    if (chain && chain !== 'All') {
      list = list.filter((s) => s.chain.toLowerCase().includes(chain.toLowerCase()));
    }

    // Re-calculate real distance if user coordinates provided
    if (userLat !== undefined && userLng !== undefined) {
      list = list.map((store) => ({
        ...store,
        distanceKm: calculateDistance(userLat, userLng, store.latitude, store.longitude),
      }));
    }

    // Sort by nearest distance first
    list.sort((a, b) => a.distanceKm - b.distanceKm);

    return list;
  },

  createOrder(payload: {
    product: Product;
    variant: ProductVariant;
    emiPlan: EMIPlan;
    schemeName?: string;
  }): Order {
    const orderNumber = `1FI-${Math.floor(100000 + Math.random() * 900000)}`;
    const id = `order-${Date.now()}`;
    const schedule = generateEMISchedule(payload.emiPlan.tenureMonths, payload.emiPlan.monthlyAmount);

    const chosenScheme =
      payload.schemeName ||
      global.__1fi_backend_store__!.portfolio.eligibleSchemes[0]?.name ||
      'Parag Parikh Flexi Cap Fund - Direct (Growth)';

    const newOrder: Order = {
      id,
      orderNumber,
      productId: payload.product.id,
      productName: payload.product.name,
      productBrand: payload.product.brand,
      productImage: payload.variant.image || payload.product.image,
      variant: payload.variant,
      emiPlan: payload.emiPlan,
      totalPrice: payload.variant.price,
      monthlyEmi: payload.emiPlan.monthlyAmount,
      tenureMonths: payload.emiPlan.tenureMonths,
      pledgedScheme: {
        schemeName: chosenScheme,
        amc: chosenScheme.includes('Parag Parikh') ? 'PPFAS Mutual Fund' : 'Mutual Fund AMC',
        pledgedValue: payload.emiPlan.mfCollateralRequired,
        lienReferenceId: `LIEN-CAMS-${Math.floor(100000 + Math.random() * 900000)}`,
      },
      mandateBank: {
        bankName: 'HDFC Bank',
        accountMask: '•••• 4192',
        mandateId: `UMRN-HDFC-${Math.floor(100000 + Math.random() * 900000)}`,
      },
      status: 'ACTIVE_EMI',
      orderDate: new Date().toISOString(),
      estimatedDeliveryDate: 'In 2-3 Business Days',
      schedule,
    };

    // Prepend to orders array
    global.__1fi_backend_store__!.orders.unshift(newOrder);

    // Adjust portfolio available credit line
    const currentLimit = global.__1fi_backend_store__!.portfolio.availableCreditLimit;
    const hold = payload.emiPlan.mfCollateralRequired;
    global.__1fi_backend_store__!.portfolio.availableCreditLimit = Math.max(0, currentLimit - hold);
    global.__1fi_backend_store__!.portfolio.currentPledgedValue += hold;

    return newOrder;
  },
};
