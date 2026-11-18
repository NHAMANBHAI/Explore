export interface StoreBrand {
  name: string;
  category: string;
  location: string;
  metric: string;
  initials: string;
  color: string;
}

export const liveStoreBrands: StoreBrand[] = [
  { name: 'Fal Sarovar', category: 'Dry Fruits & Dates', location: 'Ahmedabad', metric: '₹14.2L/mo', initials: 'FS', color: 'from-amber-500 to-orange-600' },
  { name: 'Mangalam Organics', category: 'Pure Camphor & Puja', location: 'Mumbai', metric: '₹28.5L/mo', initials: 'MO', color: 'from-emerald-500 to-teal-700' },
  { name: 'Khilansh Foods', category: 'Authentic Snacks', location: 'Surat', metric: '₹9.8L/mo', initials: 'KF', color: 'from-rose-500 to-pink-600' },
  { name: 'Urban Cash Car', category: 'Auto Accessories', location: 'Delhi NCR', metric: '₹19.4L/mo', initials: 'UC', color: 'from-blue-600 to-indigo-700' },
  { name: 'Jaipur Handlooms', category: 'Ethnic Wear & Quilts', location: 'Jaipur', metric: '₹22.1L/mo', initials: 'JH', color: 'from-purple-600 to-pink-500' },
  { name: 'Organic Harvest Dairy', category: 'A2 Milk & Ghee', location: 'Pune', metric: '₹34.0L/mo', initials: 'OH', color: 'from-green-600 to-lime-600' },
  { name: 'Saffron Luxe Attars', category: 'Perfumes & Oils', location: 'Hyderabad', metric: '₹12.6L/mo', initials: 'SL', color: 'from-amber-600 to-yellow-600' },
  { name: 'Desi Spices Co.', category: 'Whole Ground Masala', location: 'Kochi', metric: '₹16.8L/mo', initials: 'DS', color: 'from-orange-600 to-red-600' },
];

export interface IndustryTemplate {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  features: string[];
  color: string;
  accentBg: string;
  previewHeroText: string;
  mockProducts: { name: string; price: string; oldPrice?: string; rating: number; tag?: string }[];
}

export const industryTemplates: IndustryTemplate[] = [
  {
    id: 'fashion',
    title: 'Fashion & Apparel',
    badge: 'Most Popular',
    tagline: 'High conversion for clothing, ethnic wear & accessories',
    description: 'Dynamic size charts, color swatch selectors, Instagram lookbook grid, and instant WhatsApp inquiry.',
    features: ['Color & Size Swatches', 'Sticky Add to Cart bar', 'Instagram Feed sync', 'COD with OTP verification'],
    color: '#FF5722',
    accentBg: 'from-rose-500/10 to-orange-500/10',
    previewHeroText: 'Summer Festive Collection 2026',
    mockProducts: [
      { name: 'Handcrafted Chanderi Kurta Set', price: '₹2,499', oldPrice: '₹3,999', rating: 4.9, tag: 'Bestseller' },
      { name: 'Pure Mulmul Block Print Anarkali', price: '₹1,899', oldPrice: '₹2,599', rating: 4.8 },
      { name: 'Raw Silk Nehru Jacket', price: '₹3,199', rating: 5.0, tag: 'New' },
    ]
  },
  {
    id: 'grocery',
    title: 'Grocery & Quick Commerce',
    badge: '10-Min Ready',
    tagline: 'Hyperlocal delivery with weight units and rapid dispatch',
    description: 'Slot-based delivery, instant pincode check, kg/gm unit selector, and automated rider dispatch routing.',
    features: ['10-30 Min Slot Booking', 'Unit selector (250g, 500g, 1kg)', 'Cold storage badges', 'Live GPS Rider Tracking'],
    color: '#10B981',
    accentBg: 'from-emerald-500/10 to-teal-500/10',
    previewHeroText: 'Fresh Farm Produce Delivered in 15 Mins',
    mockProducts: [
      { name: 'Organic Bilona A2 Desi Cow Ghee (500ml)', price: '₹950', oldPrice: '₹1,150', rating: 5.0, tag: 'Pure A2' },
      { name: 'Kashmiri Mogra Saffron (1g Tin)', price: '₹480', oldPrice: '₹550', rating: 4.9 },
      { name: 'California Jumbo Almonds (1kg Pack)', price: '₹899', oldPrice: '₹1,099', rating: 4.9, tag: 'High Protein' },
    ]
  },
  {
    id: 'electronics',
    title: 'Electronics & Gadgets',
    badge: 'High Ticket',
    tagline: 'Structured specs, IMEI tracking, and warranty cards',
    description: 'Detailed technical specification tables, accessory bundle upsells, and serial number barcode scanning.',
    features: ['Variant Spec Comparisons', 'Serial / IMEI Inventory', 'Warranty Registration PDF', 'EMI & Card Offers Calculator'],
    color: '#3B82F6',
    accentBg: 'from-blue-500/10 to-indigo-500/10',
    previewHeroText: 'Next-Gen Wireless Audio & Smart Gear',
    mockProducts: [
      { name: 'AeroPods Pro ANC Wireless Earbuds', price: '₹3,499', oldPrice: '₹5,999', rating: 4.7, tag: '40dB ANC' },
      { name: 'Titanium Smartwatch Ultra with GPS', price: '₹4,999', oldPrice: '₹8,499', rating: 4.9, tag: 'AMOLED' },
      { name: '65W GaN Fast Dual Charger', price: '₹1,499', oldPrice: '₹2,199', rating: 4.8 },
    ]
  },
  {
    id: 'luxury',
    title: 'Luxury & Jewelry',
    badge: 'Premium Gold/Silver',
    tagline: 'High-res macro zoom, BIS hallmark badges, and bespoke design inquiry',
    description: 'Live daily gold rate sync, hallmark certification viewer, insurance options, and concierge appointment booking.',
    features: ['Daily Live Gold/Silver Rate', 'BIS Hallmark Verification', 'High-Res Macro Zoom', 'VIP WhatsApp Concierge'],
    color: '#D97706',
    accentBg: 'from-amber-500/10 to-yellow-500/10',
    previewHeroText: 'Heritage 22K Gold & Solitaire Collection',
    mockProducts: [
      { name: 'Royal Peacock Polki Choker Necklace', price: '₹48,500', rating: 5.0, tag: 'BIS Hallmarked' },
      { name: 'Solitaire Diamond Solitaire Ring (0.75ct)', price: '₹62,000', rating: 4.9, tag: 'IGI Certified' },
      { name: 'Antique Temple Silver Kada (92.5%)', price: '₹8,900', oldPrice: '₹10,500', rating: 4.8 },
    ]
  },
  {
    id: 'multi_vendor',
    title: 'Multi-Category Marketplace',
    badge: 'Enterprise',
    tagline: 'Multi-vendor storefront with vendor micro-stores and split checkout',
    description: 'Supports thousands of categories, vendor rating systems, geo-fenced merchant discovery, and split order fulfillment.',
    features: ['Multi-Seller Split Payouts', 'Geo-located Store Distance', 'Comprehensive Department Mega-Menu', 'Multi-Warehouse Inventory'],
    color: '#8B5CF6',
    accentBg: 'from-purple-500/10 to-indigo-500/10',
    previewHeroText: 'India’s Favorite Neighborhood Marketplace',
    mockProducts: [
      { name: 'Smart Air Fryer Digital 4.5L (Sold by KitchenHub)', price: '₹4,299', oldPrice: '₹6,499', rating: 4.7 },
      { name: 'Hand-woven Jute Rug 5x7ft (Sold by DesiCrafts)', price: '₹2,199', oldPrice: '₹3,200', rating: 4.9 },
      { name: 'Cold Pressed Coconut Oil 1L (Sold by KeralaDirect)', price: '₹340', oldPrice: '₹399', rating: 5.0, tag: 'Locally Sourced' },
    ]
  }
];

export interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  originalPrice: number;
  annualPricePerMonth: number;
  highlight?: boolean;
  badge?: string;
  subtitle: string;
  ctaText: string;
  features: string[];
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 799,
    originalPrice: 999,
    annualPricePerMonth: 639,
    subtitle: 'Under ₹27 a day. Everything to launch your online business with native mobile apps.',
    ctaText: 'Start with Starter',
    features: [
      'Complete Web Storefront (PWA ready)',
      'Native Android & iOS Customer App',
      'Delivery Rider / Fleet App with GPS',
      'Hyperlocal Admin Console & Analytics',
      '0% Commission on all sales',
      'UPI, Cards, Netbanking & COD Gateway',
      '17+ Couriers with Shiprocket & Delhivery',
      'Auto GST & Invoicing with HSN codes',
      'Up to 1,000 Products',
      'Standard Email & Chat Support'
    ]
  },
  {
    id: 'business',
    name: 'Business',
    monthlyPrice: 1499,
    originalPrice: 1999,
    annualPricePerMonth: 1199,
    highlight: true,
    badge: 'Most Popular',
    subtitle: 'For scaling brands needing custom domain, WhatsApp automation and unlimited scale.',
    ctaText: 'Launch Business Plan',
    features: [
      'Everything in Starter, plus:',
      'Custom Domain Connection (yourbrand.in / .com)',
      'Unlimited Products & Digital Catalogs',
      'Automated WhatsApp Cart Recovery & Updates',
      '9+ Indian Regional Languages Switcher',
      'Visual Theme Studio with 109+ drag & drop sections',
      'B2B Wholesale Tiered Pricing & MOQs',
      'Gamified Marketing (Spin the Wheel & Scratch Cards)',
      'AI Product Descriptions & Background Remover',
      'Priority 24/7 Phone & WhatsApp Support'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 3999,
    originalPrice: 4999,
    annualPricePerMonth: 3199,
    badge: 'Full White-label',
    subtitle: 'For multi-vendor marketplaces, franchise chains and high-volume retail enterprises.',
    ctaText: 'Talk to Sales',
    features: [
      'Everything in Business, plus:',
      'Multi-Vendor Marketplace & Seller Portals',
      'Split Payments & Automated Vendor Commissions',
      'Unlimited Delivery Rider Fleet Accounts',
      'Custom ERP & Warehouse API Integrations (SAP/Tally)',
      'Dedicated Cloud Server & 99.99% SLA',
      'Custom Mobile App Store Publisher Account Deployments',
      'Dedicated Account Manager & Growth Consultant',
      'Custom Feature Engineering'
    ]
  }
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'How is FlexiCommerce different from Shopify or Dukaan?',
    answer: 'Unlike Shopify which charges in USD, takes 2% transaction fees, and charges thousands extra for mobile apps, FlexiCommerce includes your web store, Android app, iOS app, delivery fleet app, and admin panel for a flat ₹799/month with 0% commission. It is pre-integrated with UPI, Shiprocket, and Indian GST.'
  },
  {
    question: 'Do I really get Android and iOS mobile apps included?',
    answer: 'Yes! Both Starter and Business plans include customer-facing mobile apps for iOS and Android, plus the dedicated Delivery Fleet app for riders. You can distribute them to your customers via Play Store, App Store, or direct PWA install.'
  },
  {
    question: 'How does the 0% commission work?',
    answer: 'We do not take any percentage of your gross sales. Every single rupee paid by your customers goes directly to your merchant bank account via Razorpay, Cashfree, or PhonePe. You only pay standard gateway processing fees (~1.9% for cards/netbanking, ₹0 for UPI).'
  },
  {
    question: 'Can I connect my own domain like mybrand.com?',
    answer: 'Yes! On the Business plan and above, you can map your custom domain (e.g. www.yourstore.in or .com) with free automatic SSL certificates, global CDN caching, and SEO optimization.'
  },
  {
    question: 'How do deliveries and couriers work?',
    answer: 'FlexiCommerce supports both modes: 1) Hyperlocal on-demand deliveries using your own in-house riders with the Delivery Fleet App (10-30 min delivery), and 2) Pan-India shipping with 17+ automated couriers like Shiprocket, Delhivery, and BlueDart with automated AWB generation and live tracking.'
  },
  {
    question: 'Can I migrate my existing store from Shopify or WooCommerce?',
    answer: 'Absolutely. We offer 1-click CSV catalog import for products, variants, images, and customer databases. Our onboarding team can also migrate your entire database within 24 hours without downtime.'
  }
];
