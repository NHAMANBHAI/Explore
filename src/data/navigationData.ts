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
          { id: 'customer_list', title: 'Customers Directory', route: 'customers' },
          { id: 'wallet_transactions', title: 'Wallet Transactions', route: 'customers' },
          { id: 'wallet_deposits', title: 'Pending Deposits', route: 'customers' },
          { id: 'referrals', title: 'Refer & Earn', route: 'customers' },
        ]
      },
      {
        id: 'support',
        title: 'Customer Support Inbox',
        icon: 'MessageSquare',
        badge: '3 Open',
        badgeVariant: 'danger',
        route: 'support',
      }
    ]
  },
  {
    groupTitle: 'Merchant & Store Management',
    items: [
      {
        id: 'sellers',
        title: 'Sellers & Stores',
        icon: 'Store',
        route: 'sellers',
        children: [
          { id: 'seller_directory', title: 'Sellers Roster', route: 'sellers' },
          { id: 'store_directory', title: 'Physical Stores', route: 'sellers' },
          { id: 'store_reviews', title: 'Store Reviews', route: 'sellers' },
          { id: 'commissions', title: 'Settlement Overview', route: 'sellers' },
          { id: 'seller_withdrawals', title: 'Seller Withdrawals', route: 'sellers' },
        ]
      },
      {
        id: 'subscription_plans',
        title: 'Vendor Subscriptions',
        icon: 'CreditCard',
        route: 'subscriptions',
      }
    ]
  },
  {
    groupTitle: 'Catalog & Merchandising',
    items: [
      {
        id: 'products',
        title: 'Products Catalog',
        icon: 'Package',
        route: 'products',
        children: [
          { id: 'all_products', title: 'All Products', route: 'products' },
          { id: 'pending_products', title: 'Pending Approval', route: 'products' },
          { id: 'bulk_upload', title: 'Bulk CSV Upload', route: 'products' },
          { id: 'badges', title: 'Badges & Ribbons', route: 'products' },
          { id: 'attributes', title: 'Attributes & Variants', route: 'products' },
        ]
      },
      {
        id: 'categories',
        title: 'Categories & Brands',
        icon: 'FolderTree',
        route: 'categories',
      },
      {
        id: 'watch_and_buy',
        title: 'Watch & Buy (Reels)',
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
