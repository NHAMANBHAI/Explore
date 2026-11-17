import { Order } from '../types/order';

export const mockOrders: Order[] = [
  {
    id: '11195',
    orderNumber: '4847',
    orderDate: '2026-11-16 09:47:49',
    timeAgo: '1 day ago',
    buyerName: 'Demo Customer',
    buyerEmail: 'demo1@gmail.com',
    buyerPhone: '9106446725',
    storeName: "Amit's Grocery Hub",
    isRushDelivery: false,
    paymentMethod: 'cod',
    status: 'awaiting_store_response',
    acceptanceDeadline: '2026-11-16T09:57:49+05:30',
    total: 350.00,
    deliveryZone: 'Noida Central (Zone 1)',
    items: [
      {
        id: 'item-1',
        name: 'Happilo Premium Seedless Green Raisins',
        sku: 'HAPP-GREEN-RAISIN-500G',
        variant: '500g',
        price: 350.00,
        quantity: 1,
        subtotal: 350.00,
        storeName: "Amit's Grocery Hub",
        image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=150&q=80'
      }
    ]
  },
  {
    id: '11194',
    orderNumber: '4846',
    orderDate: '2026-11-17 11:20:15',
    timeAgo: '4 hours ago',
    buyerName: 'Sarah Jenkins',
    buyerEmail: 'sarah.j@outlook.com',
    buyerPhone: '9876543210',
    storeName: 'Organic Harvest Market',
    isRushDelivery: true,
    paymentMethod: 'stripe',
    status: 'out_for_delivery',
    total: 1250.00,
    deliveryZone: 'Downtown Express Zone',
    deliveryBoy: {
      id: 'db-10',
      name: 'Rajesh Kumar',
      phone: '9810012345'
    },
    items: [
      {
        id: 'item-2',
        name: 'Fresh Hydroponic Strawberries',
        sku: 'BERRY-HYD-250G',
        variant: '250g Box',
        price: 450.00,
        quantity: 2,
        subtotal: 900.00,
        storeName: 'Organic Harvest Market',
        image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 'item-3',
        name: 'Almond Breeze Unsweetened Milk',
        sku: 'ALM-MILK-1L',
        variant: '1 Litre',
        price: 350.00,
        quantity: 1,
        subtotal: 350.00,
        storeName: 'Organic Harvest Market',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=150&q=80'
      }
    ]
  },
  {
    id: '11193',
    orderNumber: '4845',
    orderDate: '2026-11-17 13:10:00',
    timeAgo: '2 hours ago',
    buyerName: 'Amit Patel',
    buyerEmail: 'amit.patel@techcorp.in',
    buyerPhone: '9820198201',
    storeName: 'Apollo 24/7 Local Pharmacy',
    isRushDelivery: false,
    paymentMethod: 'wallet',
    status: 'preparing',
    total: 480.00,
    deliveryZone: 'Tech Zone Hub',
    items: [
      {
        id: 'item-4',
        name: 'Multivitamin Immuno Booster Tablets',
        sku: 'MED-MULTI-60TAB',
        variant: '60 Tablets',
        price: 480.00,
        quantity: 1,
        subtotal: 480.00,
        storeName: 'Apollo 24/7 Local Pharmacy',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=150&q=80'
      }
    ]
  }
];
