import { NavGroup } from '../types/navigation';

export const navigationMenuData: NavGroup[] = [
  {
    groupTitle: 'Overview',
    items: [
      {
        id: 'dashboard',
        title: 'Executive Dashboard',
        icon: 'LayoutDashboard',
        route: 'dashboard',
      },
      {
        id: 'pos_dashboard',
        title: 'POS Dashboard',
        icon: 'Calculator',
        route: 'pos_dashboard',
      }
    ]
  },
  {
    groupTitle: 'Multi-Business Appointments & Recalls',
    items: [
      {
        id: 'bookings',
        title: 'Appointments & Slots',
        icon: 'CalendarCheck2',
        badge: 'Universal',
        badgeVariant: 'success',
        route: 'bookings',
        children: [
          { id: 'bookings_calendar', title: 'Live Slot Roster', route: 'bookings' },
          { id: 'bookings_followups', title: 'Follow-Up Recalls (7/15/30d)', route: 'bookings' },
          { id: 'bookings_eod', title: '21:00 EOD Reports', route: 'bookings' },
          { id: 'bookings_reminders', title: '18:00 WhatsApp Reminders', route: 'bookings' },
        ]
      }
    ]
  },
  {
    groupTitle: 'Order Fulfillment & Logistics',
    items: [
      {
        id: 'orders',
        title: 'Orders',
        icon: 'ShoppingBag',
        badge: '12 Live',
        badgeVariant: 'warning',
        route: 'orders',
        children: [
          { id: 'all_orders', title: 'All Orders', route: 'orders' },
          { id: 'scheduled_orders', title: 'Scheduled Orders', route: 'orders' },
          { id: 'return_requests', title: 'Return Requests', route: 'orders' },
          { id: 'return_disputes', title: 'Return Disputes', route: 'orders' },
        ]
      },
      {
        id: 'dispatch',
        title: 'Dispatch Management',
        icon: 'Truck',
        badge: 'Active',
        badgeVariant: 'primary',
        route: 'dispatch',
      },
      {
        id: 'delivery_zones',
        title: 'Delivery Zones',
        icon: 'MapPin',
        route: 'zones',
        children: [
          { id: 'zones_list', title: 'Zones Management', route: 'zones' },
          { id: 'country_management', title: 'Country Management', route: 'zones' },
          { id: 'zones_preview', title: 'Zone Map Preview', route: 'zones' },
        ]
      },
      {
        id: 'delivery_boys',
        title: 'Delivery Fleet',
        icon: 'Bike',
        route: 'delivery_boys',
        children: [
          { id: 'all_riders', title: 'Riders Roster', route: 'delivery_boys' },
          { id: 'live_tracking', title: 'Live GPS Tracking', route: 'delivery_boys' },
          { id: 'rider_earnings', title: 'Rider Earnings', route: 'delivery_boys' },
          { id: 'cod_collections', title: 'Cash Collections (COD)', route: 'delivery_boys' },
          { id: 'rider_withdrawals', title: 'Withdrawals', route: 'delivery_boys' },
        ]
      }
    ]
  },
  {
    groupTitle: 'User & Community Relations',
    items: [
      {
        id: 'customers',
        title: 'Customer Management',
        icon: 'Users',
        badge: '739',
        badgeVariant: 'primary',
        route: 'customers',
        children: [
          { id: 'customers_list', title: 'All Customers', route: 'customers' },
          { id: 'wallets', title: 'Wallet Balances', route: 'customers' },
          { id: 'loyalty', title: 'Loyalty Reward Points', route: 'customers' },
        ]
      },
      {
        id: 'chat',
        title: 'Live Chat & Support',
        icon: 'MessageSquare',
        badge: 'Live Socket',
        badgeVariant: 'success',
        route: 'chat',
      }
    ]
  },
  {
    groupTitle: 'Merchants, Stores & Finance',
    items: [
      {
        id: 'sellers',
        title: 'Sellers & Stores',
        icon: 'Store',
        route: 'sellers',
        children: [
          { id: 'sellers_list', title: 'Merchant Directory', route: 'sellers' },
          { id: 'seller_requests', title: 'Onboarding Applications', route: 'sellers' },
          { id: 'seller_settlements', title: 'Settlement Ledger', route: 'sellers' },
        ]
      },
      {
        id: 'payment_requests',
        title: 'Payout Requests',
        icon: 'CreditCard',
        route: 'payment_requests',
      }
    ]
  },
  {
    groupTitle: 'Catalog & Inventory Control',
    items: [
      {
        id: 'products',
        title: 'Product Catalog',
        icon: 'Package',
        route: 'products',
        children: [
          { id: 'all_products', title: 'Products List', route: 'products' },
          { id: 'bulk_upload', title: 'Bulk CSV / Excel Import', route: 'products' },
          { id: 'inventory_alerts', title: 'Low Stock Alerts', route: 'products' },
        ]
      },
      {
        id: 'categories',
        title: 'Category Hierarchy',
        icon: 'FolderTree',
        route: 'categories',
      },
      {
        id: 'watch_and_buy',
        title: 'Video Commerce',
        icon: 'Video',
        badge: 'New',
        badgeVariant: 'success',
        route: 'watch_and_buy',
      }
    ]
  },
  {
    groupTitle: 'Marketing & App Customization',
    items: [
      {
        id: 'promos',
        title: 'Coupons & Promos',
        icon: 'Tag',
        route: 'promos',
      },
      {
        id: 'ad_campaigns',
        title: 'Sponsored Ads',
        icon: 'Megaphone',
        route: 'ad_campaigns',
      },
      {
        id: 'layout_builder',
        title: 'App & Web Builders',
        icon: 'Palette',
        route: 'builder',
        children: [
          { id: 'home_builder', title: 'Home Page Builder', route: 'builder' },
          { id: 'landing_page', title: 'Landing Page Builder', route: 'builder' },
          { id: 'onboarding_screens', title: 'Onboarding Screens', route: 'builder' },
          { id: 'invoice_builder', title: 'Invoice Builder', route: 'builder' },
        ]
      }
    ]
  },
  {
    groupTitle: 'System & Governance',
    items: [
      {
        id: 'roles',
        title: 'Staff Roles & RBAC',
        icon: 'ShieldCheck',
        route: 'roles',
      },
      {
        id: 'languages',
        title: 'Translations & Locales',
        icon: 'Languages',
        route: 'languages',
      },
      {
        id: 'settings',
        title: 'System Settings',
        icon: 'Settings',
        route: 'settings',
      },
      {
        id: 'guide',
        title: 'Platform Guide & Tours',
        icon: 'HelpCircle',
        badge: 'Docs',
        badgeVariant: 'primary',
        route: 'guide',
      }
    ]
  }
];
