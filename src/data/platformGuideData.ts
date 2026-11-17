import { GuideSection } from '../types/documentation';

export const platformGuides: GuideSection[] = [
  {
    id: 'getting-started',
    title: 'Platform Overview & Architecture',
    category: 'getting_started',
    summary: 'Master the core multi-stakeholder model connecting Admins, Vendors (Stores), Delivery Riders, and End Customers.',
    steps: [
      {
        title: '1. Platform Roles & Separation',
        description: 'Antigravity Hyperlocal operates on 4 dedicated planes: Admin Panel (system management), Seller Portal (store catalog & order acceptance), Rider App (geofenced pickup & drop), and Customer Frontends (Web & Mobile Apps).',
        badge: 'Architecture'
      },
      {
        title: '2. Responsive Layout & Navigation',
        description: 'Use the left collapsible sidebar for quick navigation. On tablets and mobile phones, toggle the top-left hamburger menu to open the mobile offcanvas drawer. Use Ctrl + K at any time to open the Command Palette.',
        badge: 'Interface'
      },
      {
        title: '3. Dark & Light Theme Modes',
        description: 'Switch between light and high-contrast dark mode seamlessly using the moon/sun icon in the top header. Your preference persists automatically across sessions.',
        badge: 'UI/UX'
      }
    ],
    bestPractices: [
      'Assign granular roles (RBAC) to your operations team instead of sharing root admin credentials.',
      'Configure automated notifications (FCM & WhatsApp) to keep stores and customers informed on order milestones.'
    ]
  },
  {
    id: 'customer-management',
    title: 'Managing Customers & 360° Profiles',
    category: 'customers',
    summary: 'Complete guide on inspecting customer profiles, managing digital wallet balances, adjusting loyalty rewards, and reviewing order histories.',
    steps: [
      {
        title: '1. Searching and Filtering Customers',
        description: 'Navigate to "Customer Management > Customers Directory". Use the search bar to filter by name, email, or mobile number. Click on any customer name to open their 360-degree profile.',
        actionHint: 'Customers Directory'
      },
      {
        title: '2. Customer Profile Header & Status',
        description: 'View verification badges (Email, Mobile, and KYC). Toggle customer account status between "Active" and "Blocked" to prevent fraudulent checkout attempts.',
        actionHint: 'Customer Profile'
      },
      {
        title: '3. Inspecting Saved Delivery Addresses',
        description: 'Switch to the "Addresses" tab to inspect all saved delivery locations (Home, Work, Other), landmark notes, and precise GPS coordinates for delivery verification.',
        actionHint: 'Addresses Tab'
      },
      {
        title: '4. Adjusting Customer Wallet Balance',
        description: 'In the "Wallet" tab or top actions, open the Wallet Adjustment modal. Select Credit or Debit, enter the transaction amount, and provide an audit reason (e.g. "Order compensation").',
        actionHint: 'Adjust Wallet Modal'
      },
      {
        title: '5. Managing Loyalty Reward Points',
        description: 'In the "Loyalty Points" tab, review the customer\'s historical points ledger and click "Adjust Loyalty Points" to credit bonus points or deduct expired points with a reason.',
        actionHint: 'Adjust Loyalty Modal'
      }
    ],
    bestPractices: [
      'Always add clear audit notes when manually crediting customer wallets or loyalty points.',
      'Verify mobile and email before approving large manual wallet deposit slips.'
    ]
  },
  {
    id: 'order-lifecycle',
    title: 'Hyperlocal Order Flow & Live Dispatch',
    category: 'operations',
    summary: 'Understand the multi-stage order workflow from store acceptance countdowns to live rider assignment.',
    steps: [
      {
        title: '1. Order Acceptance Countdown',
        description: 'When a customer places an order, the target store receives an instant push notification with a 10-minute acceptance window countdown. If the store fails to accept in time, the admin is alerted.',
        badge: 'Timeout Engine'
      },
      {
        title: '2. Preparation & Ready for Pickup',
        description: 'Once confirmed, the store transitions the status to "Preparing". When packaging is complete, the store marks "Ready for Pickup", triggering nearby rider dispatching.',
        badge: 'Store Flow'
      },
      {
        title: '3. Live Dispatch Console',
        description: 'Navigate to "Dispatch Management" to monitor hourly delivery velocity, active riders per zone, and manually assign available riders to urgent orders.',
        badge: 'Dispatch'
      },
      {
        title: '4. Delivery & COD Cash Collection',
        description: 'Riders complete the drop-off with OTP verification. For Cash On Delivery (COD) orders, cash handovers are tracked in the Rider Cash Collections module.',
        badge: 'Settlement'
      }
    ],
    bestPractices: [
      'Maintain an average store response time under 3 minutes for true 15-30 minute quick-commerce delivery.',
      'Reconcile rider COD cash balances daily to avoid accumulated liabilities.'
    ]
  },
  {
    id: 'zones-and-geofencing',
    title: 'Setting Up Zones & Delivery Boundaries',
    category: 'dispatch',
    summary: 'Configure polygon-based service areas, delivery speed limits, buffer times, and zone-specific pricing.',
    steps: [
      {
        title: '1. Defining a Delivery Zone',
        description: 'Go to "Delivery Zones > Zones Management". Click "Create Zone", specify the country, zone name, center coordinates, and radius or draw a polygonal boundary.',
        badge: 'Geofencing'
      },
      {
        title: '2. Setting Speed & Buffer Times',
        description: 'Set "Delivery Time per KM" (e.g. 5 minutes/km) and "Buffer Time" (e.g. 15 minutes) to ensure customer delivery ETA calculations remain accurate.',
        badge: 'ETA Calculation'
      },
      {
        title: '3. Assigning Stores & Riders to Zones',
        description: 'Stores and riders are tied to specific zones. When a customer enters their delivery address, the system filters inventory exclusively to stores within the serviceable zone.',
        badge: 'Hyperlocal Isolation'
      }
    ],
    bestPractices: [
      'Keep delivery zones contiguous and account for natural barriers like rivers or highways.',
      'Audit zone health regularly from the Executive Dashboard to detect rider supply shortages.'
    ]
  },
  {
    id: 'system-settings',
    title: 'System Settings & Integration Setup',
    category: 'settings',
    summary: 'Connect payment gateways, SMS & OTP verification, Google Maps, WhatsApp Cloud API, and AI models.',
    steps: [
      {
        title: '1. Payment Gateways',
        description: 'Navigate to "System Settings > Payment Settings". Enable Stripe, Razorpay, PhonePe, or Cash On Delivery (COD) by providing test/live API credentials.',
        badge: 'Finance'
      },
      {
        title: '2. Maps & Navigation',
        description: 'Provide Google Maps API keys (Places, Directions, Geocoding) or configure OpenStreetMap (OSM) tile providers for distance matrix calculations.',
        badge: 'GIS'
      },
      {
        title: '3. AI Feature Configuration',
        description: 'Select your preferred AI engine (Google Gemini, OpenAI, Claude, DeepSeek, Groq) to enable automated product description generation and catalog SEO enhancements.',
        badge: 'AI Engine'
      }
    ],
    bestPractices: [
      'Test payment gateways in sandbox mode before flipping the toggle to live production.',
      'Monitor FCM push notification delivery rates to ensure reliable mobile app communication.'
    ]
  }
];
