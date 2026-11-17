import { Store, SellerWithdrawal } from '../types/seller';

export const mockStores: Store[] = [
  {
    id: 'store-1',
    name: "Amit's Grocery Hub",
    sellerName: 'Amit Sharma',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&q=80',
    banner: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80',
    city: 'Noida',
    zone: 'Noida Central (Zone 1)',
    contactNumber: '9811223344',
    email: 'amit.store@groceryhub.in',
    commissionRate: 12.5,
    verificationStatus: 'approved',
    visibilityStatus: 'active',
    rating: 4.8,
    totalOrders: 1420,
    totalSales: 489200.00,
    walletBalance: 24350.00,
    categories: ['Groceries', 'Fruits & Vegetables', 'Dry Fruits'],
    createdAt: '2025-10-12'
  },
  {
    id: 'store-2',
    name: 'Organic Harvest Market',
    sellerName: 'Priya Verma',
    logo: 'https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&w=120&q=80',
    banner: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    city: 'Noida',
    zone: 'Downtown Express Hub',
    contactNumber: '9822334455',
    email: 'priya@organicharvest.com',
    commissionRate: 15.0,
    verificationStatus: 'approved',
    visibilityStatus: 'active',
    rating: 4.9,
    totalOrders: 890,
    totalSales: 312500.00,
    walletBalance: 18400.00,
    categories: ['Organic Produce', 'Dairy', 'Gluten-Free'],
    createdAt: '2025-11-05'
  },
  {
    id: 'store-3',
    name: 'Apollo 24/7 Local Pharmacy',
    sellerName: 'Dr. R. K. Gupta',
    logo: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=120&q=80',
    banner: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    city: 'Noida',
    zone: 'Noida Central (Zone 1)',
    contactNumber: '9833445566',
    email: 'apollo.noida@pharmacy.in',
    commissionRate: 10.0,
    verificationStatus: 'approved',
    visibilityStatus: 'active',
    rating: 4.7,
    totalOrders: 2150,
    totalSales: 640100.00,
    walletBalance: 42100.00,
    categories: ['Medicines', 'Personal Care', 'Baby Wellness'],
    createdAt: '2025-08-20'
  },
  {
    id: 'store-4',
    name: 'Artisan Gourmet Bakery & Desserts',
    sellerName: 'Chef Rahul Kapoor',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=120&q=80',
    banner: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    city: 'Noida',
    zone: 'Downtown Express Hub',
    contactNumber: '9844556677',
    email: 'orders@artisanbakery.in',
    commissionRate: 18.0,
    verificationStatus: 'pending_verification',
    visibilityStatus: 'inactive',
    rating: 4.6,
    totalOrders: 45,
    totalSales: 16500.00,
    walletBalance: 0.00,
    categories: ['Cakes', 'Pastries', 'Sourdough Breads'],
    createdAt: '2026-11-14'
  }
];

export const mockWithdrawals: SellerWithdrawal[] = [
  {
    id: 'w-101',
    storeName: "Amit's Grocery Hub",
    amount: 15000.00,
    status: 'pending',
    paymentMethod: 'Bank Transfer (IMPS)',
    requestedAt: '2026-11-17 10:30:00'
  },
  {
    id: 'w-100',
    storeName: 'Apollo 24/7 Local Pharmacy',
    amount: 30000.00,
    status: 'approved',
    paymentMethod: 'NEFT Direct',
    requestedAt: '2026-11-15 14:00:00',
    processedAt: '2026-11-15 16:20:00'
  }
];
