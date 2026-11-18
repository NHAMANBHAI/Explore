export interface Store {
  id: string;
  name: string;
  sellerName: string;
  logo: string;
  banner: string;
  city: string;
  zone: string;
  contactNumber: string;
  email: string;
  commissionRate: number; // percentage, e.g. 15%
  verificationStatus: 'approved' | 'pending_verification' | 'rejected';
  visibilityStatus: 'active' | 'inactive';
  rating: number;
  totalOrders: number;
  totalSales: number;
  walletBalance: number;
  categories: string[];
  createdAt: string;

  // Multi-Business Feature Access & Automation Toggles
  businessCategory?: 'RETAIL' | 'CLINIC' | 'SALON' | 'AUTO_SERVICE' | 'PET_CARE' | 'FITNESS' | 'GENERAL_SERVICE';
  enableAppointments?: boolean;
  slotDurationMinutes?: number;
  autoWhatsAppReminders?: boolean;
  autoFollowUps?: boolean;
  autoEODReport?: boolean;
  providerLabel?: string;
  serviceLabel?: string;
}

export interface SellerWithdrawal {
  id: string;
  storeName: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  paymentMethod: string;
  requestedAt: string;
  processedAt?: string;
}
