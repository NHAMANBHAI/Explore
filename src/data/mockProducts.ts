import { Product } from '../types/product';

export const mockProducts: Product[] = [
  {
    id: 'prod-228',
    name: 'Happilo Premium Seedless Green Raisins',
    image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=200&q=80',
    category: 'Dry Fruits',
    storeName: "Amit's Grocery Hub",
    storeId: 'store-1',
    price: 350.00,
    specialPrice: 310.00,
    totalStock: 85,
    adminApprovalStatus: 'approved',
    status: 'active',
    rating: 4.8,
    reviewsCount: 42,
    badges: ['Bestseller', 'Top Rated'],
    variants: [
      { id: 'v-1', sku: 'HAPP-GREEN-RAISIN-250G', title: '250g Pouch', price: 180.00, stock: 40 },
      { id: 'v-2', sku: 'HAPP-GREEN-RAISIN-500G', title: '500g Jar', price: 350.00, stock: 45 }
    ],
    createdAt: '2026-02-15'
  },
  {
    id: 'prod-619',
    name: 'Radha Govind 100% Pure Cow Ghee',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=200&q=80',
    category: 'Dairy',
    storeName: 'Organic Harvest Market',
    storeId: 'store-2',
    price: 650.00,
    totalStock: 30,
    adminApprovalStatus: 'approved',
    status: 'active',
    rating: 4.9,
    reviewsCount: 88,
    badges: ['Organic Certified'],
    variants: [
      { id: 'v-3', sku: 'RG-GHEE-1L', title: '1 Litre Glass Jar', price: 650.00, stock: 30 }
    ],
    createdAt: '2026-03-10'
  },
  {
    id: 'prod-618',
    name: 'Fresh Hydroponic Strawberries Box',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=200&q=80',
    category: 'Fruits & Vegetables',
    storeName: 'Organic Harvest Market',
    storeId: 'store-2',
    price: 450.00,
    specialPrice: 399.00,
    totalStock: 18,
    adminApprovalStatus: 'approved',
    status: 'active',
    rating: 4.7,
    reviewsCount: 19,
    badges: ['Fresh Harvest'],
    variants: [
      { id: 'v-4', sku: 'BERRY-HYD-250G', title: '250g Box', price: 450.00, stock: 18 }
    ],
    createdAt: '2026-04-01'
  },
  {
    id: 'prod-788',
    name: 'Gluten-Free Artisanal Sourdough Loaf',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80',
    category: 'Bakery',
    storeName: 'Artisan Gourmet Bakery & Desserts',
    storeId: 'store-4',
    price: 280.00,
    totalStock: 12,
    adminApprovalStatus: 'pending_verification',
    status: 'inactive',
    rating: 0,
    reviewsCount: 0,
    badges: ['New Product'],
    variants: [
      { id: 'v-5', sku: 'SOUR-GF-400G', title: '400g Baked Loaf', price: 280.00, stock: 12 }
    ],
    createdAt: '2026-11-16'
  }
];
