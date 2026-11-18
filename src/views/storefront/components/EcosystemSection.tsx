import React from 'react';
import { ShoppingBag, Smartphone, Truck, LayoutDashboard, Check, ArrowRight, Zap, ExternalLink } from 'lucide-react';

interface EcosystemSectionProps {
  onNavigateToAdmin: () => void;
}

export const EcosystemSection: React.FC<EcosystemSectionProps> = ({ onNavigateToAdmin }) => {
  const ecosystemItems = [
    {
      id: 'web',
      icon: ShoppingBag,
      title: 'Web Storefront',
      badge: 'Lightning Fast',
      tagline: 'Your high-converting flagship digital store',
      color: 'from-orange-500 to-amber-500',
      textColor: 'text-orange-500',
      bgColor: 'bg-orange-50',
      points: [
        'Under 1-second load time on 4G/5G mobile',
        'Mobile-first responsive design for all screens',
        'Custom domain support (yourbrand.in / .com)',
        'SEO structured schema for Google Shopping',
        'Integrated UPI QR & Netbanking checkout'
      ]
    },
    {
      id: 'customer_app',
      icon: Smartphone,
      title: 'Customer Mobile App',
      badge: 'iOS & Android',
      tagline: 'Direct-to-consumer native mobile presence',
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      points: [
        'Native Google Play Store & Apple App Store builds',
        'Instant 1-tap phone OTP login without passwords',
        'Automated free push notifications for flash sales',
        'Customer digital wallet & loyalty points balance',
        'Real-time live order progress tracker'
      ]
    },
    {
      id: 'delivery_app',
      icon: Truck,
      title: 'Delivery Fleet App',
      badge: 'Hyperlocal Fleet',
      tagline: 'Empower your riders for 15-30 min deliveries',
      color: 'from-blue-600 to-indigo-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      points: [
        'Instant audio ping when a new order is dispatched',
        'Turn-by-turn Google Maps route navigation',
        'Secure 4-digit OTP customer proof of delivery',
        'Cash-on-Delivery (COD) cash collection ledger',
        'Rider daily earnings & tips summary'
      ]
    },
    {
      id: 'admin_panel',
      icon: LayoutDashboard,
      title: 'Hyperlocal Admin Console',
      badge: 'Full Control',
      tagline: 'The nerve center for operations, CRM & analytics',
      color: 'from-[#FF5722] to-rose-600',
      textColor: 'text-[#FF5722]',
      bgColor: 'bg-orange-50',
      highlight: true,
      points: [
        'Customer 360° profile with wallet & loyalty adjustments',
        'Live order status funnel & countdown acceptance',
        'Delivery zones geo-fencing & rider dispatch matrix',
        'Role-based permissions & audit activity logs',
        'Real-time revenue, AOV and GMV analytics'
      ]
    }
  ];

  return (
    <section id="ecosystem" className="py-20 bg-[#FBF7F2] border-b border-[#F1E7DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#FF5722] text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" /> 4-in-1 Complete Architecture
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Here you get website + apps + admin
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Most e-commerce platforms sell you a web store and charge lakhs extra for mobile apps.
            With FlexiCommerce, all four interconnected engines are included from day one.
          </p>
        </div>

        {/* 4 Connected Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystemItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between relative group ${
                  item.highlight
                    ? 'border-[#FF5722] ring-2 ring-[#FF5722]/20 shadow-xl shadow-orange-500/10'
                    : 'border-[#F1E7DD] hover:border-slate-300 hover:shadow-lg'
                }`}
              >
                {item.highlight && (
                  <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#FF5722] text-white text-[10px] font-heading font-extrabold tracking-wider uppercase shadow-xs">
                    Live Demo Ready
                  </span>
                )}

                <div>
                  {/* Card Header with Icon & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.bgColor} ${item.textColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-lg text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-5 leading-normal">
                    {item.tagline}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-2.5 mb-6">
                    {item.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-slate-100">
                  {item.id === 'admin_panel' ? (
                    <button
                      onClick={onNavigateToAdmin}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#F5A623] hover:opacity-95 text-white text-xs font-bold transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Admin Console</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-[#FF5722] transition-colors">
                      <span>Included in ₹799/mo</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
