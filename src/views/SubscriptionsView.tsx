'use client';

import React from 'react';
import { CreditCard, Check, Sparkles, TrendingUp, Users } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const SubscriptionsView: React.FC = () => {
  const { toast } = useToast();

  const plans = [
    { name: 'Starter Plan', price: '₹799', billing: '/month', activeVendors: 42, mrr: '₹33,558', features: ['Web Storefront (PWA)', 'iOS & Android App', 'Delivery Fleet App', '0% Commission'] },
    { name: 'Business Pro', price: '₹1,499', billing: '/month', activeVendors: 88, mrr: '₹1,31,912', popular: true, features: ['Everything in Starter', 'Custom Domain (.in/.com)', 'WhatsApp Automation', 'Unlimited Products', 'Theme Studio'] },
    { name: 'Enterprise Market', price: '₹3,999', billing: '/month', activeVendors: 14, mrr: '₹55,986', features: ['Multi-Vendor Payouts', 'Custom ERP/Tally Sync', 'Dedicated SLA Server', 'Dedicated Account Manager'] },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <CreditCard className="w-6 h-6 text-purple-600" />
          Vendor Subscription Plans & MRR
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor merchant recurring subscription tiers, billing cycles, renewals, and platform revenue.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className={`bg-white dark:bg-slate-900 rounded-3xl p-6 border transition-all flex flex-col justify-between shadow-xs ${
              p.popular ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{p.name}</h3>
                {p.popular && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-orange-100 text-[#FF5722]">
                    Most Popular
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-black text-slate-900 dark:text-slate-100">{p.price}</span>
                <span className="text-xs text-slate-400">{p.billing}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 mb-5 text-xs">
                <div>
                  <p className="text-[10px] text-slate-400">Subscribers</p>
                  <p className="font-bold text-slate-900 dark:text-slate-100">{p.activeVendors} Stores</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">MRR</p>
                  <p className="font-bold text-emerald-600">{p.mrr}</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {p.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => toast.success('Plan Settings', `Opening config for ${p.name}`)}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
            >
              Configure Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
