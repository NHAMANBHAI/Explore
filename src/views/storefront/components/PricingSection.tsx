import React, { useState } from 'react';
import { pricingPlans } from '../data/storefrontData';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (planId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-20 bg-[#FFF9F5] border-b border-[#F1E7DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <p className="text-xs uppercase font-extrabold tracking-wider text-[#FF5722]">
            Simple Transparent Math
          </p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[40px] text-slate-900 tracking-tight">
            A complete business for under ₹27 a day
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Shopify plus custom-built mobile apps can cost lakhs. FlexiCommerce is ₹799/month for the website, iOS/Android apps, delivery fleet app, and admin — with 0% commission.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-bold ${!isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`w-12 h-6.5 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                isAnnual ? 'bg-[#FF5722] justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-4.5 h-4.5 rounded-full bg-white shadow-md" />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-bold ${isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>
                Annual Billing
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 animate-pulse">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => {
            const price = isAnnual ? plan.annualPricePerMonth : plan.monthlyPrice;
            const originalPrice = isAnnual ? Math.round(plan.originalPrice * 0.8) : plan.originalPrice;

            if (plan.highlight) {
              return (
                <div
                  key={plan.id}
                  className="rounded-3xl bg-gradient-to-br from-[#FF5722] via-[#FF7043] to-[#F5A623] text-white p-8 flex flex-col justify-between relative shadow-2xl shadow-orange-500/30 transform md:-translate-y-2 border-2 border-white/20"
                >
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-heading font-extrabold tracking-widest uppercase">
                    {plan.badge || 'Most Popular'}
                  </span>

                  <div>
                    <h3 className="font-heading font-extrabold text-2xl text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-heading font-extrabold text-5xl">₹{price}</span>
                      <span className="text-white/80 text-sm font-medium">/month</span>
                      <s className="text-white/60 text-lg font-semibold">₹{originalPrice}</s>
                    </div>

                    <p className="text-xs text-white/90 leading-relaxed mb-6">
                      {plan.subtitle}
                    </p>

                    <button
                      onClick={() => onSelectPlan(plan.id)}
                      className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-heading font-extrabold text-sm transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2 cursor-pointer mb-8"
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-4 h-4 text-[#FF5722]" />
                    </button>

                    <div className="space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-white/80">
                        Everything included:
                      </p>
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-white font-medium">
                          <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/20 mt-8 text-center text-[11px] text-white/80">
                    <p>Instant Activation • 14-day Money Back Guarantee</p>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={plan.id}
                className="rounded-3xl bg-white border border-[#F1E7DD] p-8 flex flex-col justify-between hover:border-slate-300 hover:shadow-xl transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading font-extrabold text-2xl text-slate-900">
                      {plan.name}
                    </h3>
                    {plan.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-heading font-extrabold text-5xl text-slate-900">₹{price}</span>
                    <span className="text-slate-500 text-sm font-medium">/month</span>
                    <s className="text-slate-400 text-lg font-semibold">₹{originalPrice}</s>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {plan.subtitle}
                  </p>

                  <button
                    onClick={() => onSelectPlan(plan.id)}
                    className="w-full py-3 px-4 rounded-2xl border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-heading font-extrabold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer mb-8"
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      What you get:
                    </p>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-8 text-center text-[11px] text-slate-400">
                  <p>0% Commission Forever • No Hidden Charges</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Guarantee Pill */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#F1E7DD] text-xs font-semibold text-slate-700 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>All plans include free SSL, daily backups, 99.9% uptime and GST compliant invoices.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
