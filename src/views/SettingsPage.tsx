import React from 'react';
import {
  Settings,
  CreditCard,
  MapPin,
  Sparkles,
  Award,
  Bell,
  Mail,
  Shield,
  Smartphone,
  Check
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const SettingsPage: React.FC = () => {
  const settingModules = [
    {
      title: 'Payment Gateways',
      icon: CreditCard,
      description: 'Configure Razorpay, Stripe, PhonePe, and Cash On Delivery (COD) payment rules.',
      status: 'Active (3 Enabled)',
      badge: 'success' as const
    },
    {
      title: 'Google Maps & Geofencing GIS',
      icon: MapPin,
      description: 'API keys for Google Places autocomplete, directions routing, and distance matrix.',
      status: 'Configured',
      badge: 'success' as const
    },
    {
      title: 'Multi-Provider AI Copywriter',
      icon: Sparkles,
      description: 'Connect Google Gemini, OpenAI, Claude, or DeepSeek for auto-generating product listings.',
      status: 'Gemini 2.5 Flash',
      badge: 'primary' as const
    },
    {
      title: 'Loyalty Points & Rewards Engine',
      icon: Award,
      description: 'Set customer points earn ratios (e.g. 1 pt per ₹50 spent) and checkout redemption caps.',
      status: 'Active',
      badge: 'success' as const
    },
    {
      title: 'WhatsApp Cloud API & SMS',
      icon: Smartphone,
      description: 'Meta Business Cloud API credentials for automated WhatsApp order invoice delivery.',
      status: 'Connected',
      badge: 'success' as const
    },
    {
      title: 'Push Notifications (FCM)',
      icon: Bell,
      description: 'Firebase service account JSON for sending live alerts to Customer, Store, and Rider apps.',
      status: 'Connected',
      badge: 'success' as const
    },
    {
      title: 'SMTP Mail Server',
      icon: Mail,
      description: 'SMTP host, port, TLS security, and sender branding for transactional email receipts.',
      status: 'Configured',
      badge: 'secondary' as const
    },
    {
      title: 'Staff Security & 2FA Auth',
      icon: Shield,
      description: 'Enforce two-factor authentication, session timeouts, and IP whitelisting for admin portal.',
      status: 'Enforced',
      badge: 'success' as const
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Global Platform Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Master integration console for payments, maps, communication channels, AI models, and loyalty rules.
        </p>
      </div>

      {/* Grid of Settings Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingModules.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-blue-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge variant={item.badge} size="sm">
                    {item.status}
                  </Badge>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Operational
                </span>
                <button
                  onClick={() => alert(`Configure ${item.title}`)}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Configure →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
