# HyperLocal Multivendor Admin Platform — Architectural & Operational Manual

Welcome to the **HyperLocal Multivendor Delivery & E-Commerce Admin Platform**. This repository delivers an enterprise-grade admin console combining the design aesthetics of **shadcn/ui**, **Tremor Blocks**, and **TailAdmin**, along with full-stack UI/Backend error handling, audit logging, **Firebase & Google Authentication**, and the comprehensive **Customer 360° Management System**.

---

## 1. Quick Start & In-App Guide URL

### Running the Platform Locally
```bash
# 1. Start the local development server
npm run dev

# 2. Build for production deployment
npm run build

# 3. Preview the production build
npm run preview
```

### In-App Interactive Guide URL
* **Direct Interactive URL**: Click on **"Platform Guide"** in the left sidebar or the top-right header `Guide` button (route: `guide`).
* **Command Palette**: Press `Ctrl + K` anywhere in the app and type `Guide` to open the interactive operations handbook.

---

## 2. Authentication Flow & Firebase Google Auth Integration

### 2.1 Supported Authentication Methods
1. **Google Authentication (Continue with Google)**:
   * Powered by **Firebase GoogleAuthProvider** (`signInWithPopup`).
   * Seamless single-click Google Sign-In with official Google branding.
   * If live Firebase keys are not yet provided in `.env`, the system automatically falls back to an authenticated Google Admin session for zero-friction local development and testing.
2. **Email & Password Authentication**:
   * Pre-configured with the platform's root administrative credentials:
     * **Email**: `hyperlocaladmin@gmail.com`
     * **Password**: `12345678`
   * Includes a **"Quick Demo Auto-Fill"** button to load the credentials instantly.
   * "Show/Hide Password" toggle (`#password-toggle`) matching the live portal.
   * "Remember me on this device" persistent session checkbox.
3. **Password Recovery Flow (`/forgot-password`)**:
   * Dedicated password reset view.
   * Dispatches password recovery links via Firebase `sendPasswordResetEmail`.
4. **Session Expired Re-Login Modal (`#panel-relogin-modal`)**:
   * Prompts the administrator to verify their credentials if a token expires, allowing re-authentication **without losing the current page, form inputs, or navigation state**.
5. **Safe Sign Out**:
   * Accessible via the top-right profile dropdown in the header, safely clearing local storage and revoking the active session token.

### 2.2 Connecting Your Real Firebase Project Credentials
Create a `.env` file in the root directory (based on `.env.example`):
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 3. Design System Architecture (shadcn/ui + Tremor + TailAdmin)

The interface blends the best patterns from leading design frameworks:

| Inspiration Source | Implemented Patterns in this Platform |
| :--- | :--- |
| **shadcn/ui** | Clean, minimalist component primitives (`Card`, `Button`, `Alert`, `Skeleton`, `Modal`, `Badge`) with subtle border tokens (`border-slate-200 dark:border-slate-800`), crisp focus rings, and high accessibility. |
| **Tremor Blocks** | High-density dashboard KPI metrics, trend delta indicators (`↑ 14.2%`), progress funnels, and dashed empty states with intuitive icons and recovery actions. |
| **TailAdmin & Tabler** | Deep dark/light mode surface tokens (`#f8fafc` / `#0b1120`), collapsible multi-level sidebar, mobile drawer offcanvas, and global `Ctrl + K` command palette. |

---

## 4. Comprehensive Error Handling Architecture (UI & Backend)

### 4.1 Backend / Service Layer Error Handling (`src/services/apiClient.ts`)
* **Standard HTTP Status Codes**:
  * `200 OK`: Successful data retrieval and state mutation.
  * `400 Bad Request`: Malformed parameters or invalid transaction types.
  * `404 Not Found`: Customer or order entity does not exist or was archived.
  * `422 Unprocessable Entity`: Detailed form validation failures returned as structured `fieldErrors` (e.g. `{ amount: "Overdraft is not permitted", note: "Minimum 5 characters" }`).
  * `500 Internal Server Error`: Database deadlocks or unhandled exceptions returned as structured `ApiError` payloads.
* **Overdraft Prevention**: Strict rule that wallet balance cannot be debited below ₹0.00.
* **Audit Trail**: Every wallet and loyalty mutation requires an audit note of at least 5 characters.

### 4.2 UI Error Handling Layer
1. **React Error Boundaries (`src/components/ui/ErrorBoundary.tsx`)**:
   * Catches runtime rendering exceptions without crashing the entire browser window.
   * Displays a clean recovery card with error stack inspection and a "Retry Rendering" button.
2. **Global Toast System (`src/context/ToastContext.tsx`)**:
   * Floating notification queue in the bottom-right corner (`toast.success`, `toast.error`, `toast.warning`, `toast.info`).
3. **Field-Level Validation & Inline Alerts (`src/components/ui/Alert.tsx`)**:
   * Modals highlight erroneous inputs with red borders, light-red backgrounds, and contextual helper text.
4. **Loading Skeletons (`src/components/ui/Skeleton.tsx`)**:
   * Animated pulsing skeleton loaders simulate realistic async data fetching for tables and cards.
5. **Empty States (`src/components/ui/EmptyState.tsx`)**:
   * Graceful fallback illustrations when search queries yield 0 results or customer IDs do not exist.
6. **Live Error Simulation Dev Tool**:
   * Click the **"Test Errors"** bug toggle in the top-right header to simulate a `500 Internal Server Error` across all mutations and verify how the UI and toast alerts react.

---

## 5. Clean & Professional Folder Structure

```
e:\Explore/
├── .env.example                       # Firebase environment variables template
├── dist/                              # Compiled production assets (built in 816ms)
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── SessionExpiredModal.tsx# Tabler-style re-login overlay modal
│   │   ├── customers/                 # Customer 360° components
│   │   │   ├── tabs/                  # Overview, Orders, Wallet, Addresses, Notifications, Loyalty
│   │   │   ├── AdjustLoyaltyModal.tsx # Validation, 422/500 error handling, toast feedback
│   │   │   ├── AdjustWalletModal.tsx  # Overdraft prevention, audit note validation, error alerts
│   │   │   └── CustomerProfileCard.tsx# Header card with block/unblock async error handling
│   │   ├── layout/                    # Responsive sidebar, header, and Ctrl+K search palette
│   │   └── ui/                        # Design primitives (shadcn/ui + Tremor + TailAdmin)
│   │       ├── Alert.tsx              # Semantic alerts (destructive, warning, success)
│   │       ├── Badge.tsx              # Soft-toned status badges
│   │       ├── Button.tsx             # shadcn button with loading spinner & variants
│   │       ├── Card.tsx               # shadcn & Tremor card primitives
│   │       ├── DataTable.tsx          # Responsive table with search, sort & pagination
│   │       ├── EmptyState.tsx         # Tremor style empty state with recovery CTA
│   │       ├── ErrorBoundary.tsx      # React error boundary catching render crashes
│   │       ├── Modal.tsx              # Accessible dialog modal
│   │       ├── Skeleton.tsx           # Animated loading skeleton placeholder
│   │       └── StatCard.tsx           # Metric KPI cards with trends & icons
│   ├── config/
│   │   └── firebase.ts                # Firebase App, Auth & GoogleAuthProvider setup
│   ├── context/
│   │   ├── AuthContext.tsx            # Session lifecycle, Google OAuth & re-login state
│   │   ├── CustomerContext.tsx        # Customer state, async services, and error handling
│   │   ├── ThemeContext.tsx           # Dark/Light mode with localStorage persistence
│   │   └── ToastContext.tsx           # Global notification toast provider (shadcn/sonner style)
│   ├── data/                          # Data models and mock services
│   │   ├── mockCustomers.ts           # Realistic customer dataset (matching live API)
│   │   ├── mockOrders.ts              # Orders with countdown deadlines and items
│   │   ├── mockSellers.ts             # Store profiles, KYC status, and commission rates
│   │   ├── mockProducts.ts            # Product master, approval states, and variants
│   │   ├── navigationData.ts          # Complete 16 domains and 90+ routes structure
│   │   └── platformGuideData.ts       # Structured documentation content
│   ├── pages/                         # Core views
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx          # Google Sign-In & Email login with demo auto-fill
│   │   │   └── ForgotPasswordPage.tsx # Password recovery form
│   │   ├── CustomersPage.tsx          # Customer directory with skeletons & error states
│   │   ├── CustomerDetailPage.tsx     # 360° Single Customer View with 6 tabs
│   │   ├── DashboardPage.tsx          # Executive dashboard with funnel and KPIs
│   │   ├── OrdersPage.tsx             # Order fulfillment management
│   │   ├── DispatchPage.tsx           # Live rider dispatch console
│   │   ├── SettingsPage.tsx           # Integrations (Payments, Maps, AI, Loyalty)
│   │   └── PlatformGuidePage.tsx      # Dedicated in-app interactive user manual
│   ├── services/                      # Simulated Backend & API Client Layer
│   │   ├── apiClient.ts               # Universal fetch simulator with latency & HTTP errors
│   │   ├── authService.ts             # Firebase & Google OAuth authentication controllers
│   │   └── customerService.ts         # Customer controllers with business validation rules
│   ├── types/                         # TypeScript interfaces
│   │   ├── auth.ts
│   │   ├── customer.ts
│   │   ├── documentation.ts
│   │   ├── navigation.ts
│   │   ├── order.ts
│   │   ├── product.ts
│   │   └── seller.ts
│   ├── App.tsx                        # Master router wrapped in ErrorBoundary, Auth & Toasts
│   └── index.css                      # Tailwind CSS v4 styling & theme tokens
├── HOW_TO_USE.md                      # Operational & architectural guide
└── package.json
```

---

## 6. Customer 360° Workflows & Verification

### 6.1 Directory & Inspection
* **Search & Filter**: Real-time filtering by name, email, phone number, and referral code.
* **360° Single Customer Profile**:
  * Contact information & registration date.
  * Verification status badges (`Email Verified`, `Mobile Verified`).
  * Instant **Block / Unblock Account** toggle with confirmation toast.
  * 4 KPI Metric Cards: Lifetime Orders, Total Spent, Spendable Wallet Balance, and Active Loyalty Points.

### 6.2 Six Sub-Tabs
1. **Overview Tab**: Personal data, verification timestamps, primary address with GPS coordinates, and order summary.
2. **Orders Tab**: Purchase history with order statuses, amounts, view links, and WhatsApp invoice actions.
3. **Wallet Tab**: Balance card + full transaction ledger (credit/debit/refund/cashback) with the **Adjust Wallet Modal**.
4. **Addresses Tab**: Saved address cards (`Home`, `Work`, `Other`) with landmark details and Google Maps location pins.
5. **Notifications Tab**: Chronological push notification and SMS delivery logs.
6. **Loyalty Points Tab**: Reward points balance with the **Adjust Loyalty Points Modal** (supporting credit/debit with administrative audit notes).
