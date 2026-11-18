'use client';

import React, { useState } from 'react';
import { Tag, Plus, Check, Copy, Percent, Calendar } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const PromosView: React.FC = () => {
  const { toast } = useToast();

  const coupons = [
    { code: 'FIRST50', discount: 'Flat ₹50 OFF', minOrder: '₹299', usage: '412 used', expiry: '31 Dec 2026', type: 'FLAT', active: true },
    { code: 'FESTIVE20', discount: '20% OFF up to ₹150', minOrder: '₹499', usage: '890 used', expiry: '15 Nov 2026', type: 'PERCENT', active: true },
    { code: 'FREESHIP', discount: 'Free Delivery', minOrder: '₹199', usage: '1,420 used', expiry: '31 Dec 2026', type: 'SHIPPING', active: true },
    { code: 'GOLDENHOUR', discount: 'Flat ₹100 OFF', minOrder: '₹999', usage: '180 used', expiry: 'Expired', type: 'FLAT', active: false },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Copied to Clipboard', `Coupon code "${code}" copied.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Tag className="w-6 h-6 text-amber-500" />
            Coupons, Promo Codes & Discounts
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Create coupon campaigns, minimum order constraints, maximum discount ceilings, and referral vouchers.
          </p>
        </div>
        <button
          onClick={() => toast.info('Create Coupon', 'Coupon creator opened.')}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {coupons.map((coupon, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-sm px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60">
                  {coupon.code}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${coupon.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                  {coupon.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div>
                <p className="text-base font-extrabold text-slate-900 dark:text-slate-100">{coupon.discount}</p>
                <p className="text-xs text-slate-500">Min Order: {coupon.minOrder}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>{coupon.usage}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {coupon.expiry}</span>
              </div>
            </div>

            <button
              onClick={() => handleCopy(coupon.code)}
              className="mt-4 w-full py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-3 h-3" /> Copy Code
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
