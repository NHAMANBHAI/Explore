export interface CustomerAddress {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  mobile: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  status: 'pending' | 'preparing' | 'ready_for_pickup' | 'out_for_delivery' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  paymentMethod: 'cod' | 'stripe' | 'wallet' | 'razorpay';
  total: number;
  createdAt: string;
  storeName: string;
  itemsCount: number;
}

export interface WalletTransaction {
  id: string;
  amount: number;
  type: 'deposit' | 'debit' | 'refund' | 'adjustment' | 'cashback';
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
  reference?: string;
  createdAt: string;
}

export interface LoyaltyTransaction {
  id: string;
  points: number;
  type: 'credit' | 'debit';
  status: 'active' | 'expired' | 'redeemed';
  expiryDays?: number;
  description: string;
  createdAt: string;
}

export interface CustomerNotification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promotion' | 'wallet' | 'system';
  status: 'sent' | 'read' | 'failed';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  mobile: string;
  country: string;
  countryCode: string;
  avatarUrl?: string;
  status: 'active' | 'blocked' | 'inactive';
  emailVerified: boolean;
  mobileVerified: boolean;
  kycVerified: boolean;
  registrationDate: string;
  referralCode: string;
  referredByCode?: string;
  walletBalance: number;
  loyaltyPoints: number;
  totalOrders: number;
  totalSpent: number;
  addresses: CustomerAddress[];
  orders: CustomerOrder[];
  walletTransactions: WalletTransaction[];
  loyaltyTransactions: LoyaltyTransaction[];
  notifications: CustomerNotification[];
}
