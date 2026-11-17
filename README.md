# Explore — FlexiCommerce & HyperLocal Commerce Platform

> **The Complete Indian Multi-Channel Commerce OS**  
> Website Storefront • iOS & Android Customer Apps • Delivery Fleet Rider App • Hyperlocal Admin Console

![Platform Status](https://img.shields.io/badge/Status-Production%20Ready-emerald)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![React](https://img.shields.io/badge/React-19.2-cyan)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8)
![Commission](https://img.shields.io/badge/Commission-0%25-orange)

---

## 🌟 Overview

**Explore** is an all-in-one multi-channel commerce platform engineered for Indian merchants, D2C brands, and hyperlocal delivery businesses. It provides both the customer-facing storefront inspired by [FlexiCommerce](https://flexicommerce.in/) and an enterprise-grade [Hyperlocal Admin Panel](https://hyperlocal-backend.eshopweb.store/admin) with real-time operations, dispatch, and CRM.

---

## 🚀 Key Modules & Architecture

### 1. FlexiCommerce Public Storefront (`/`)
- **Modern Design System**: Clean typography with `Sora` (geometric headings) and `DM Sans` (body), flame orange gradients (`#FF5722` to `#F5A623`), and dark luxury glassmorphism.
- **Hero & Live Device Mockup**: Social proof counters ("10+ store owners are already selling here", 4.9★), interactive dual desktop/mobile viewport mockup, and live real-time order alerts.
- **Live Stores Ticker**: Active merchant brands across Ahmedabad, Mumbai, Surat, Delhi NCR, and Jaipur.
- **4-in-1 Platform Ecosystem**: Web Storefront (PWA), Native Android & iOS Customer App, Delivery Boy Fleet App, and Hyperlocal Admin Panel.
- **India-First Bento Grid**:
  - 💳 **Payments**: UPI QR codes, PhonePe, Google Pay, Razorpay, Cashfree, and COD with OTP verification.
  - 📦 **17+ Couriers**: Shiprocket, Shipway, Delhivery, BlueDart integration with NDR reduction.
  - 🧾 **100% GST Ready**: Automated CGST/SGST/IGST breakdown, HSN/SAC codes, and GSTR-1 export.
  - 🗣️ **9+ Regional Languages**: Hindi, Gujarati, Tamil, Marathi, Bengali, Telugu, Kannada, Malayalam, and English with instant toggle.
  - 🎨 **Visual Theme Engine**: 109+ pre-built drag-and-drop sections.
  - 🤝 **B2B Wholesale**: Tiered volume pricing, MOQs, and vendor commissions.
  - 🎡 **Marketing & Retention**: Spin the wheel, scratch cards, customer wallet cashbacks, and WhatsApp abandoned cart recovery.
  - 🤖 **AI Commerce Suite**: Automated SEO product descriptions, photo background remover, and smart cataloging.
- **Interactive Industry Templates**: Tailored blueprints for Fashion & Apparel, Grocery & Quick Commerce, Electronics & Gadgets, Luxury & Jewelry, and Multi-Category Superstores.
- **Transparent Indian Pricing**: Starter (₹799/mo), Business (₹1,499/mo), and Enterprise with annual 20% discount toggle.

---

### 2. Hyperlocal Admin Console (`/admin`)
- **Customer 360° Profile**: Search, filter, export, view wallet ledger, loyalty points ledger, order history, addresses, and account status toggles.
- **Wallet & Loyalty Adjustments**: Secure audit modals with reason validation, credit/debit toggles, and overdraft protection.
- **Live Order Management**: Acceptance countdown timers, status pipeline (Received → Preparing → Dispatched → Delivered), and invoice generation.
- **Dispatch Matrix**: Delivery zones polygon viewer, unassigned order queue, and rider assignment modal.
- **System Settings**: Payment gateways, Google Maps/OpenStreetMap coordinates, Pusher WebSockets, and WhatsApp triggers.
- **Full Authentication Flow**: Firebase Authentication with Google OAuth ("Continue with Google"), email/password login, demo auto-fill, password recovery, and automatic session expired modals.
- **Error Simulation Dev Tool**: Header toggle to simulate 500 server errors and test error boundary & toast handling in real time.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript 5.9, Vite 8
- **Styling**: Tailwind CSS v4, Lucide Icons, Glassmorphism
- **Design Tokens**: `Sora`, `DM Sans`, `Plus Jakarta Sans`
- **Authentication**: Firebase Auth v11, Google Identity Provider
- **State & Error Handling**: React Context API, Custom Error Boundaries, Toast Notifications

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 🔑 Demo Credentials

To access the Hyperlocal Admin Console directly:
- **Email**: `hyperlocaladmin@gmail.com`
- **Password**: `12345678` (or use the 1-click **Auto-fill Demo Credentials** button)

---

## 📁 Repository Structure

```
explore/
├── src/
│   ├── components/
│   │   ├── auth/          # SessionExpiredModal, etc.
│   │   ├── customers/     # CustomerProfileCard, AdjustWalletModal, AdjustLoyaltyModal, etc.
│   │   ├── layout/        # Header, Sidebar, AdminLayout, CommandPalette
│   │   └── ui/            # Button, Card, Badge, Alert, Skeleton, EmptyState, ErrorBoundary
│   ├── config/            # Firebase and environment configuration
│   ├── context/           # AuthContext, CustomerContext, ThemeContext, ToastContext
│   ├── data/              # Mock customer data, orders, navigation, zones
│   ├── pages/
│   │   ├── auth/          # LoginPage, ForgotPasswordPage
│   │   ├── storefront/    # FlexiCommerce landing page, components & templates
│   │   ├── CustomersPage.tsx
│   │   ├── CustomerDetailPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── DispatchPage.tsx
│   │   ├── SettingsPage.tsx
│   │   └── PlatformGuidePage.tsx
│   ├── services/          # apiClient, authService, customerService
│   ├── types/             # TypeScript data contracts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── HOW_TO_USE.md          # Comprehensive user manual
├── .env.example           # Environment template
└── package.json
```

---

## 📄 License

MIT © 2026 FlexiCommerce & HyperLocal Platform.
