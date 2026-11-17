export interface DeliveryZone {
  id: string;
  name: string;
  country: string;
  centerCoordinates: string;
  radiusKm: number;
  deliveryTimePerKm: number; // in minutes
  bufferTime: number; // in minutes
  baseDeliveryFee: number;
  perKmFee: number;
  minOrderValue: number;
  status: 'active' | 'inactive';
  activeStoresCount: number;
  activeRidersCount: number;
  createdAt: string;
}

export interface PromoCoupon {
  id: string;
  code: string;
  title: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  startDate: string;
  endDate: string;
  usageLimitPerUser: number;
  totalUsageLimit: number;
  timesUsed: number;
  status: 'active' | 'expired' | 'disabled';
}
