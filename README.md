# 1Fi Marketplace — SDE Intern Take-Home Assignment

A high-performance, mobile-first fintech shopping experience built for **1Fi** (India's Loan-Against-Mutual-Funds shopping platform). Users can browse gadgets, configure variants, select zero-interest EMI tenures backed by their mutual fund portfolio, and complete a digital collateral pledge checkout with **zero down payment** and **zero interest**.

---

## 🚀 Quickstart

Run the project locally:

```bash
# 1. Install dependencies
npm install

# 2. Run the Next.js development server
npm run dev

# 3. Open in your browser
# http://localhost:3000
```

To run a production build:
```bash
npm run build
npm run start
```

---

## 🏛️ Architecture & Separation of Concerns

This project follows clean architectural boundaries for maintainability, readability, and scalability:

```
src/
├── app/
│   ├── api/                              # Mock API Route Handlers (Separated API Layer)
│   │   ├── products/route.ts             # GET /api/products (filter, search, sort, error sim)
│   │   ├── products/[id]/route.ts         # GET /api/products/[id]
│   │   ├── products/[id]/emi-plans/      # GET /api/products/[id]/emi-plans (Dynamic 0% EMI math)
│   │   └── portfolio/route.ts            # GET /api/portfolio (User MF credit line & folios)
│   ├── shop/
│   │   ├── page.tsx                      # Shop Page (Segmented tabs: Top Brands, Nearby Stores, 1Fi Marketplace)
│   │   └── product/[id]/page.tsx         # Deep-linkable Product Detail & EMI page
│   ├── globals.css                       # 1Fi Brand Tokens (#712CDC), glassmorphism, animations
│   └── layout.tsx                        # 1Fi metadata, fonts (Geist/Inter), ShopProvider
├── components/
│   ├── layout/
│   │   ├── AppHeader.tsx                 # 1Fi Logo & Real-time MF Credit Line Badge
│   │   ├── BottomNav.tsx                 # Mobile-first fintech bottom navigation
│   │   └── DeviceFrameToggle.tsx         # Desktop preview mode toggle (390px Mobile vs Full Fluid)
│   ├── shop/
│   │   ├── ShopTabs.tsx                  # 3-segment controller (Top Brands | Nearby Stores | 1Fi Marketplace)
│   │   ├── MarketplaceView.tsx           # Catalog container with filter, sort, search & async states
│   │   ├── ProductCard.tsx               # Product card with 0% EMI callout & badge
│   │   ├── VariantSelector.tsx           # Color swatches & storage capacity picker
│   │   ├── EMIPlanSelector.tsx           # 3/6/9/12/18/24-month 0% tenure grid
│   │   ├── EMIPlanCard.tsx               # Individual tenure card with monthly calculation & MF hold
│   │   ├── PriceSummary.tsx              # Financial breakdown (0% discount, ₹0 down payment, MF hold)
│   │   ├── OrderConfirmationModal.tsx    # Digital lien authorization, auto-debit bank, & confetti success
│   │   ├── LAMFInfoBanner.tsx            # Educational banner on 1Fi's Loan Against Mutual Funds model
│   │   └── PlaceholderTab.tsx            # Branded placeholder state for Top Brands & Nearby Stores
│   └── ui/
│       ├── LoadingSkeleton.tsx           # Shimmer loading states for grid, detail, & EMI plans
│       ├── ErrorState.tsx                # Error state with Retry button & error recovery
│       └── Badge.tsx                     # Fintech status tags
├── hooks/
│   ├── useProducts.ts                    # Hook for product catalog with filter/sort & retry
│   ├── useProductDetail.ts               # Hook for single product details with retry
│   ├── useEMIPlans.ts                    # Hook for dynamic 0% EMI tenure calculations
│   └── usePortfolio.ts                   # Hook for user MF credit limit & eligible schemes
├── services/
│   ├── api.ts                            # API service client abstraction
│   └── mockData.ts                       # Curated gadget catalog & 0% EMI financial formulas
├── context/
│   └── ShopContext.tsx                   # Client-side state for shop filters & reviewer toggles
└── types/
    └── index.ts                          # Strict TypeScript domain interfaces
```

---

## 💳 1Fi LAMF (Loan-Against-Mutual-Funds) Model

### Core Value Proposition:
1. **Never Redeem Investments:** Instead of liquidating mutual fund investments (which triggers capital gains tax and breaks compounding growth), the user places a temporary digital lien on mutual fund units via CAMS/KFintech.
2. **0% Interest EMIs:** Unlike credit cards that charge 16–24% p.a. + processing fees, 1Fi provides true 0% interest EMIs with **₹0 upfront down payment** and **₹0 processing fee**.
3. **Collateral Calculation:** `MF Collateral Hold = Product Price × 1.5` (standard 67% LTV ratio for equity mutual funds).
4. **Auto-Debit & Lien Release:** Monthly installments are debited via e-NACH / UPI Autopay. Once the tenure ends, the lien is automatically released.

---

## 🧪 Interactive Testing Guide for Reviewers

1. **Shop Page 3 Segments:**
   - Tap **"Top Brands"** or **"Nearby Stores"** to view the clean placeholder states.
   - Tap **"1Fi Marketplace"** to explore the active product catalog.
2. **Search & Filter:**
   - Filter by categories: **Phones, Laptops, Audio, Tablets, Watches**.
   - Search for **"iPhone"**, **"MacBook"**, or **"Sony"**.
   - Sort by **Price: Low to High**, **Top Discount**, or **Highest Rated**.
3. **Async Error State & Retry Flow:**
   - Click the **"⚡ Test Error & Retry"** button in the filter bar.
   - Observe the `ErrorState` component render with error details.
   - Click **"Try Again"** to trigger `refetch()` and restore catalog.
4. **Interactive Variant Selection:**
   - Click on **Apple iPhone 15 Pro** or **MacBook Air M3**.
   - Switch color (e.g. *Natural Titanium* ➔ *Blue Titanium*) — notice the image and color label update.
   - Switch storage (e.g. *128 GB* ➔ *256 GB* ➔ *512 GB*) — notice the base price, monthly EMI, and mutual fund collateral update dynamically in real time.
5. **EMI Tenure Selection:**
   - Choose between **3, 6, 9, 12, 18, 24 months**.
   - Compare monthly payment amounts and verified credit card interest savings.
6. **Pledge & Checkout Flow:**
   - Click **"Proceed with 1Fi EMI"**.
   - Review the mutual fund folio lien (e.g. *Parag Parikh Flexi Cap Fund*) and linked mandate bank (*HDFC Bank*).
   - Click **"Authorize Pledge & Place Order"** to simulate the digital OTP authorization and celebrate with confetti!
7. **Reviewer Viewport Toggle (Top Desktop Bar):**
   - Switch between **Mobile App View (390px)** (matching 1Fi's mobile-first responsive web app) and **Full Responsive View**.

---

## 🔍 What is Mocked vs. What is Real

| Feature | Current Implementation (Mocked) | Production Implementation (With Backend Access) |
|---|---|---|
| **Product Catalog** | Next.js API Route `/api/products` with simulated latency (350ms) and filter/search/sort query handling | Microservice / Headless Commerce API (e.g. Shopify / Medusa / custom OMS) with Elasticsearch/Algolia |
| **0% EMI Calculation** | Dynamic server & client utility calculating `price / tenure` and `price × 1.5` collateral | 1Fi Rule Engine assessing user credit tier, AMC risk profile, and tenure-specific subvention |
| **Mutual Fund Portfolio** | Mocked user portfolio (`Parag Parikh`, `Mirae Asset`, `ICICI Prudential`) with ₹2.40L limit | Real-time CAMS / KFintech / MFCentral CAS fetch via Account Aggregator (AA) framework |
| **Lien Marking** | Simulated digital OTP authorization modal | SEBI-compliant digital lien marking via CAMS/KFintech API with OTP verification |
| **Mandate Setup** | Mocked linked bank account (HDFC Bank) | NPCI e-NACH / UPI 2.0 Autopay mandate registration via Razorpay / Cashfree / Setu |

---

## 🛠️ What We'd Do Differently with Full Backend Access

1. **Account Aggregator (AA) Integration:** Fetch live live mutual fund portfolios, calculate exact Loan-To-Value (LTV) limits dynamically per fund category (Equity: ~50-67%, Debt: ~80%).
2. **Real-time Inventory & Merchant Webhooks:** Connect with brand partners (Apple, Samsung, Croma) for live pincode delivery ETAs, real-time stock reservations, and automated dispatch tracking.
3. **Idempotent Checkout & Webhook Handlers:** Guarantee exactly-once order creation with database transactions, auto-reversal if mandate setup fails, and automated CAMS lien release triggers on full loan repayment.
4. **Optimistic UI & Cache Revalidation:** Use React Query / SWR with `stale-while-revalidate` caching and Server Actions with selective cache tags (`revalidateTag`).

---

## 🎨 Manual UI Decisions to Double Check Against Live 1Fi App

When comparing this implementation against the live `app.1fi.in` screenshots, please note the following UI decisions:

1. **Brand Purple Palette:** Primary brand color `#712CDC` (Tailwind custom token `--color-brand-500`) with companion gradient `from-[#712CDC] via-[#8c27fc] to-[#5c22a5]`.
2. **Shop Segment Layout:** 3 segments: **"Top Brands"**, **"Nearby Stores"**, and **"1Fi Marketplace"** as styled pill switches.
3. **Fintech Card Aesthetics:** Minimalist rounded cards (`rounded-2xl` / `rounded-3xl`), subtle slate borders (`border-slate-200/80`), emerald green accents (`#10B981`) for 0% interest and savings callouts.
4. **Credit Line Header:** Top header pill displaying real-time available mutual fund credit limit (`Limit: ₹2.40L`) with a green pulse indicator.
5. **Mobile-First Bottom Navigation:** Fixed bottom bar for mobile screens (Home, Portfolio, Shop, EMIs, Profile).
