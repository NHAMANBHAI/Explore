export interface OrderItem {
  id: string;
  name: string;
  sku: string;
  variant: string;
  price: number;
  quantity: number;
  subtotal: number;
  storeName: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  orderDate: string;
  timeAgo: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  storeName: string;
  isRushDelivery: boolean;
  paymentMethod: 'cod' | 'stripe' | 'wallet' | 'razorpay';
  status: 'awaiting_store_response' | 'confirmed' | 'preparing' | 'ready_for_pickup' | 'out_for_delivery' | 'delivered' | 'cancelled';
  acceptanceDeadline?: string;
  total: number;
  items: OrderItem[];
  deliveryBoy?: {
    id: string;
    name: string;
    phone: string;
  };
  deliveryZone: string;
}
