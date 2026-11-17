import React from 'react';
import { Store, ArrowRight, ShieldCheck, Mail, Phone, MapPin, Heart, Sparkles, LayoutDashboard } from 'lucide-react';

interface StorefrontFooterProps {
  onNavigateToAdmin: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const StorefrontFooter: React.FC<StorefrontFooterProps> = ({
  onNavigateToAdmin,
  onScrollToSection,
}) => {
  return (
    <footer className="bg-[#0a0f1a] text-white border-t border-white/10">
      {/* Top Conversion CTA Banner */}
      <div className="border-b border-white/10 py-16 bg-gradient-to-b from-[#101418] to-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-[#FF8A65] border border-orange-500/20 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Start Your 14-Day Free Trial
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white max-w-2xl mx-auto">
            Ready to open your store? <br />
            <span className="bg-gradient-to-r from-[#FF5722] to-[#F5A623] bg-clip-text text-transparent">
              Do it today.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Join hundreds of ambitious Indian brands. Launch your web store, mobile apps and admin console in under 20 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onScrollToSection('pricing')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-[#FF5722] to-[#F5A623] hover:opacity-95 shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToAdmin}
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-heading font-bold text-sm text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4 text-[#FF5722]" />
              <span>Launch Live Admin Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sitemap & Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Details */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF5722] to-[#F5A623] flex items-center justify-center shadow-lg shadow-orange-500/25">
                <Store className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                  Flexi<span className="text-[#FF5722]">Commerce</span>
                </span>
                <p className="text-[10px] text-slate-400 font-medium">The Indian Multi-Channel Commerce OS</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering Indian retailers, D2C brands, and local merchants with high-converting web stores, iOS & Android customer apps, delivery fleet tracking, and hyper-intuitive admin management.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <span className="text-base">🇮🇳</span>
              <span>Proudly built in India for Indian Businesses</span>
            </div>
          </div>

          {/* Col 2: Platform */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Platform
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onScrollToSection('ecosystem')} className="hover:text-white transition-colors cursor-pointer">
                  Web Storefront (PWA)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('ecosystem')} className="hover:text-white transition-colors cursor-pointer">
                  iOS & Android App
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('ecosystem')} className="hover:text-white transition-colors cursor-pointer">
                  Delivery Fleet App
                </button>
              </li>
              <li>
                <button onClick={onNavigateToAdmin} className="text-[#FF8A65] font-semibold hover:underline flex items-center gap-1 cursor-pointer">
                  <span>Hyperlocal Admin</span>
                  <span className="text-[9px] bg-orange-500/20 px-1 py-0.2 rounded">Live</span>
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('features')} className="hover:text-white transition-colors cursor-pointer">
                  Drag & Drop Theme Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Integrations */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
              India Integrations
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Razorpay & UPI QR</li>
              <li>PhonePe & Paytm</li>
              <li>Shiprocket & Delhivery</li>
              <li>GST Invoicing & E-Way</li>
              <li>WhatsApp Commerce API</li>
              <li>Tally & ERP Sync</li>
            </ul>
          </div>

          {/* Col 4: Solutions & Support */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Company & Help
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onScrollToSection('pricing')} className="hover:text-white transition-colors cursor-pointer">
                  Pricing Plans
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('faq')} className="hover:text-white transition-colors cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={onNavigateToAdmin} className="hover:text-white transition-colors cursor-pointer">
                  Admin Login
                </button>
              </li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>support@flexicommerce.in</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Security */}
        <div className="pt-10 mt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 FlexiCommerce Technologies India Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Secure SSL & ISO Certified
            </span>
            <span>•</span>
            <span>0% Commission</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
