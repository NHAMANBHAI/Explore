export interface ProductVariant {
  id: string;
  sku: string;
  title: string;
  price: number;
  specialPrice?: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  storeName: string;
  storeId: string;
  price: number;
  specialPrice?: number;
  totalStock: number;
  adminApprovalStatus: 'approved' | 'pending_verification' | 'rejected';
  status: 'active' | 'inactive';
  rating: number;
  reviewsCount: number;
  variants: ProductVariant[];
  badges: string[];
  createdAt: string;
}
