'use client';

import React from 'react';
import { Megaphone, Plus, TrendingUp, Eye, MousePointerClick, DollarSign } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const AdCampaignsView: React.FC = () => {
  const { toast } = useToast();

  const ads = [
    { id: 'ad-1', title: 'Top Storefront Hero Carousel Banner', merchant: 'Organic Harvest Market', impressions: '184.2K', clicks: '9,410', ctr: '5.1%', budget: '₹12,000', status: 'RUNNING' },
    { id: 'ad-2', title: 'Featured Sponsored Product Badge', merchant: 'Happilo Green Raisins', impressions: '92.6K', clicks: '6,140', ctr: '6.6%', budget: '₹8,500', status: 'RUNNING' },
    { id: 'ad-3', title: 'Delivery App Checkout Upsell Popup', merchant: "Amit's Grocery Hub", impressions: '44.1K', clicks: '1,890', ctr: '4.2%', budget: '₹5,000', status: 'COMPLETED' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Megaphone className="w-6 h-6 text-pink-600" />
            Sponsored Ads & In-App Merchant Placement
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Monetize high-traffic banner slots on the customer mobile app, home carousels, and search result headers.
          </p>
        </div>
        <button
          onClick={() => toast.info('New Campaign', 'Campaign wizard opened.')}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-pink-600 hover:bg-pink-700 shadow-md shadow-pink-500/20 flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> New Ad Campaign
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {ads.map((ad) => (
          <div key={ad.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300">
                  {ad.status}
                </span>
                <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100">{ad.budget}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">{ad.title}</h3>
              <p className="text-xs text-slate-500">Sponsor: {ad.merchant}</p>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-xs">
                <div>
                  <p className="text-[10px] text-slate-400">Views</p>
                  <p className="font-bold text-slate-900 dark:text-slate-100">{ad.impressions}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Clicks</p>
                  <p className="font-bold text-slate-900 dark:text-slate-100">{ad.clicks}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">CTR</p>
                  <p className="font-bold text-emerald-600">{ad.ctr}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => toast.info('Ad Metrics', `Viewing analytics for ${ad.title}`)}
                className="text-xs font-semibold text-pink-600 hover:underline cursor-pointer"
              >
                View Analytics →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
