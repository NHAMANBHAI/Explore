import React, { useState } from 'react';
import { ArrowRight, Star, CheckCircle2, ShieldCheck, Zap, Smartphone, ShoppingBag, Eye, TrendingUp, Sparkles, Heart } from 'lucide-react';

interface HeroSectionProps {
  onNavigateToAdmin: () => void;
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToAdmin,
  onGetStarted,
}) => {
  const [activeCartCount, setActiveCartCount] = useState(2);
  const [liked, setLiked] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF9F5] via-[#FFFDFB] to-[#FBF7F2] border-b border-[#F1E7DD] pt-12 lg:pt-20 pb-16 lg:pb-24">
      {/* Decorative gradient glow orbs in background */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-orange-400/15 via-amber-300/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Compelling Pitch & Trust */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Social Proof Pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white border border-[#F1E7DD] shadow-xs">
              <div className="flex -space-x-2">
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-2xs">
                  FS
                </span>
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-2xs">
                  MO
                </span>
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-2xs">
                  KF
                </span>
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-2xs">
                  UC
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-700">
                <span className="text-slate-900 font-extrabold">10+ store owners</span> are already selling here
              </p>
              <div className="hidden sm:flex items-center gap-0.5 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-[11px] font-bold text-slate-700">4.9/5</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] tracking-tight text-[#101418]">
              The next big store<br />
              <span className="bg-gradient-to-r from-[#FF5722] via-[#FF7043] to-[#F5A623] bg-clip-text text-transparent">
                will be yours.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Website, mobile apps, and admin — your complete online business for under{' '}
              <span className="font-semibold text-slate-900">₹27 a day (₹799/month)</span>.
              Live in 20 minutes, 0% commission, crafted specifically for India.
            </p>

            {/* Dual CTAs & Live Demo */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-[#FF5722] to-[#F5A623] hover:opacity-95 shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Start Selling Today</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateToAdmin}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-slate-800 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch Live Admin Demo</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-700">
                  Interactive
                </span>
              </button>
            </div>

            {/* 3 Indian Commerce Trust Pillars */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#F1E7DD]/80">
              <div className="flex items-center gap-2 text-left">
                <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#FF5722] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">0% Commission</p>
                  <p className="text-[11px] text-slate-500">Every rupee is yours</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">GST Ready</p>
                  <p className="text-[11px] text-slate-500">Auto HSN & E-Way</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">UPI & 17+ Couriers</p>
                  <p className="text-[11px] text-slate-500">Shiprocket & PhonePe</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Multi-Device Mockup */}
          <div className="lg:col-span-6 relative">
            {/* Desktop Storefront Window Frame */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-300/40 overflow-hidden transition-all duration-300">
              {/* Browser Top Window Bar */}
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="bg-white px-3 py-1 rounded-md text-[11px] font-mono text-slate-500 border border-slate-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  https://yourstore.flexicommerce.in
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  <ShoppingBag className="w-3.5 h-3.5 text-orange-500" />
                  <span className="font-bold text-slate-700">{activeCartCount}</span>
                </div>
              </div>

              {/* Storefront Header Inside Mockup */}
              <div className="p-4 bg-gradient-to-r from-orange-500 via-[#FF5722] to-amber-500 text-white rounded-b-xl mx-2 mt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-heading font-extrabold text-sm tracking-wide">DESI BOUTIQUE</span>
                  <span className="bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-semibold">
                    10-30 Min Delivery
                  </span>
                </div>
                <p className="text-xs font-medium text-white/90 mt-1">Festive Handcrafted Kurtis & Sarees</p>
              </div>

              {/* Storefront Products Grid Inside Mockup */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-800">Trending Right Now</p>
                  <span className="text-[11px] text-[#FF5722] font-semibold">View All 42 items</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Mock Product 1 */}
                  <div className="border border-slate-100 rounded-xl p-2.5 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all group">
                    <div className="h-28 rounded-lg bg-gradient-to-tr from-amber-100 to-orange-100 flex items-center justify-center relative overflow-hidden">
                      <span className="text-2xl">👗</span>
                      <button
                        onClick={() => setLiked(!liked)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-white/80 text-rose-500 hover:bg-white cursor-pointer"
                      >
                        <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-rose-500' : ''}`} />
                      </button>
                      <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#FF5722] text-white">
                        40% OFF
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 mt-2 truncate">Chanderi Silk Anarkali</p>
                    <div className="flex items-center justify-between mt-1">
                      <div>
                        <span className="text-xs font-extrabold text-slate-900">₹2,499</span>
                        <s className="text-[10px] text-slate-400 ml-1">₹3,999</s>
                      </div>
                      <button
                        onClick={() => setActiveCartCount(c => c + 1)}
                        className="px-2 py-1 rounded bg-[#101418] hover:bg-[#FF5722] text-white text-[10px] font-bold transition-colors cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>
                  </div>

                  {/* Mock Product 2 */}
                  <div className="border border-slate-100 rounded-xl p-2.5 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all group">
                    <div className="h-28 rounded-lg bg-gradient-to-tr from-emerald-100 to-teal-100 flex items-center justify-center relative overflow-hidden">
                      <span className="text-2xl">✨</span>
                      <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-600 text-white">
                        Pure 22K
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 mt-2 truncate">Polki Heritage Jhumkas</p>
                    <div className="flex items-center justify-between mt-1">
                      <div>
                        <span className="text-xs font-extrabold text-slate-900">₹1,850</span>
                        <s className="text-[10px] text-slate-400 ml-1">₹2,400</s>
                      </div>
                      <button
                        onClick={() => setActiveCartCount(c => c + 1)}
                        className="px-2 py-1 rounded bg-[#101418] hover:bg-[#FF5722] text-white text-[10px] font-bold transition-colors cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Instant 1-Click Checkout bar inside mockup */}
                <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] font-bold">
                      ₹
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900">UPI Instant 1-Click Checkout</p>
                      <p className="text-[10px] text-slate-500">GPay, PhonePe, Paytm, COD</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-colors cursor-pointer">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>

            {/* Overlapping Mobile Customer App Mockup (Floating Bottom Right) */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-56 bg-[#0a0f1a] rounded-3xl p-2 shadow-2xl border-4 border-slate-900 shadow-orange-950/40 transform hover:-translate-y-1 transition-transform">
              <div className="bg-slate-900 rounded-2xl p-3 text-white space-y-2">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-emerald-400" />
                    <span>Customer App</span>
                  </div>
                  <span className="text-emerald-400 font-bold">LIVE</span>
                </div>

                <div className="bg-slate-800 rounded-lg p-2 space-y-1">
                  <p className="text-[11px] font-bold text-slate-200 truncate">Live Order #HYP-9841</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Rider: Ramesh K.</span>
                    <span className="text-amber-400 font-semibold">On the way</span>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-3/4 rounded-full" />
                  </div>
                </div>

                <p className="text-[9px] text-center text-slate-400">
                  Push Notifications • OTP Login
                </p>
              </div>
            </div>

            {/* Floating Live Sales Badge (Floating Top Left) */}
            <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-slate-200/80 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <p className="text-xs font-extrabold text-slate-900">New Order: ₹2,450</p>
                </div>
                <p className="text-[10px] text-slate-500">Paid via UPI • Ahmedabad, GJ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
