import React, { useState } from 'react';
import { Menu, X, ChevronDown, Sparkles, ShieldCheck, ArrowRight, Store, Smartphone, Truck, LayoutDashboard, ShoppingBag } from 'lucide-react';

interface StorefrontNavbarProps {
  onNavigateToAdmin: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const StorefrontNavbar: React.FC<StorefrontNavbarProps> = ({
  onNavigateToAdmin,
  onScrollToSection,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleNavClick = (sectionId: string) => {
    onScrollToSection(sectionId);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0f1a]/95 backdrop-blur-md border-b border-white/10 text-white transition-all">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-orange-600 via-[#FF5722] to-amber-500 text-white text-[11px] font-medium py-1 px-4 text-center flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 font-bold">
          <Sparkles className="w-3 h-3" /> Special Launch Offer:
        </span>
        <span>Flat 20% off annual plans + Free .in domain & Google Play app setup</span>
        <button
          onClick={() => handleNavClick('pricing')}
          className="underline font-bold hover:text-white/90 cursor-pointer ml-1"
        >
          Claim Now →
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2.5 group text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF5722] to-[#F5A623] flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
                <Store className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                    Flexi<span className="text-[#FF5722]">Commerce</span>
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-500/20 text-[#FF8A65] border border-orange-500/30">
                    India
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium tracking-tight">Website • Apps • Admin</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Products Mega Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('products')}
                className="px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:text-white hover:bg-white/5 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                Products
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180 text-orange-400' : ''}`} />
              </button>

              {activeDropdown === 'products' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-[#101418] border border-white/10 rounded-2xl p-3 shadow-2xl z-50 space-y-1">
                  <button
                    onClick={() => handleNavClick('ecosystem')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors text-left cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-[#FF5722] flex items-center justify-center shrink-0 mt-0.5">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Web Storefront</p>
                      <p className="text-[11px] text-slate-400">High speed PWA e-commerce website</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('ecosystem')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors text-left cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Customer Mobile App</p>
                      <p className="text-[11px] text-slate-400">Native iOS & Android apps with push notifications</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('ecosystem')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors text-left cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Delivery Rider App</p>
                      <p className="text-[11px] text-slate-400">Hyperlocal fleet GPS routing & OTP delivery</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      onNavigateToAdmin();
                    }}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition-colors text-left cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FF5722] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <LayoutDashboard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-white">Hyperlocal Admin Panel</p>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#FF5722] text-white rounded">Live Demo</span>
                      </div>
                      <p className="text-[11px] text-orange-200">Customer 360, orders funnel, dispatch matrix</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('features')}
              className="px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              India Features
            </button>

            <button
              onClick={() => handleNavClick('templates')}
              className="px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Templates
            </button>

            <button
              onClick={() => handleNavClick('pricing')}
              className="px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Pricing
            </button>

            <button
              onClick={() => handleNavClick('faq')}
              className="px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Link to Live Admin Console */}
            <button
              onClick={onNavigateToAdmin}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              title="Launch the Hyperlocal Admin Dashboard"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#FF8A65]" />
              <span>Admin Console</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            {/* Primary Flame CTA */}
            <button
              onClick={() => handleNavClick('pricing')}
              className="px-4 py-2 rounded-xl text-xs font-heading font-bold text-white bg-gradient-to-r from-[#FF5722] to-[#F5A623] hover:opacity-95 transition-all shadow-lg shadow-orange-500/25 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onNavigateToAdmin}
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-slate-300 bg-slate-800 border border-slate-700 flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3 h-3 text-[#FF5722]" />
              Admin
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0d131f] border-b border-white/10 px-4 py-5 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => handleNavClick('hero')}
            className="w-full text-left py-2 text-sm font-semibold text-slate-200 hover:text-white"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('ecosystem')}
            className="w-full text-left py-2 text-sm font-semibold text-slate-200 hover:text-white"
          >
            4-in-1 Ecosystem (Store, Apps, Admin)
          </button>
          <button
            onClick={() => handleNavClick('features')}
            className="w-full text-left py-2 text-sm font-semibold text-slate-200 hover:text-white"
          >
            India Commerce Features (UPI, GST, Shiprocket)
          </button>
          <button
            onClick={() => handleNavClick('templates')}
            className="w-full text-left py-2 text-sm font-semibold text-slate-200 hover:text-white"
          >
            Industry Templates (Fashion, Grocery, Luxury)
          </button>
          <button
            onClick={() => handleNavClick('pricing')}
            className="w-full text-left py-2 text-sm font-semibold text-slate-200 hover:text-white"
          >
            Pricing (from ₹799/mo)
          </button>
          <button
            onClick={() => handleNavClick('faq')}
            className="w-full text-left py-2 text-sm font-semibold text-slate-200 hover:text-white"
          >
            Frequently Asked Questions
          </button>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigateToAdmin();
              }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-slate-800 border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4 text-[#FF5722]" />
              Launch Hyperlocal Admin Console
            </button>

            <button
              onClick={() => handleNavClick('pricing')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-heading font-bold text-white bg-gradient-to-r from-[#FF5722] to-[#F5A623] flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              <span>Start Selling Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
