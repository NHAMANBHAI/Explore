'use client';

import React, { useState } from 'react';
import { Store, Search, ShieldCheck, CheckCircle2, TrendingUp, AlertTriangle, ExternalLink } from 'lucide-react';
import { mockStores } from '../data/mockSellers';
import { useToast } from '../context/ToastContext';

export const SellersStoresView: React.FC = () => {
  const { toast } = useToast();
  const [stores, setStores] = useState(mockStores);
  const [search, setSearch] = useState('');

  const filtered = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.sellerName.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStoreStatus = (id: string) => {
    setStores((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const next = s.visibilityStatus === 'active' ? 'suspended' : 'active';
          toast.info(next === 'active' ? 'Store Approved & Live' : 'Store Suspended', `${s.name} visibility updated.`);
          return { ...s, visibilityStatus: next as any };
        }
        return s;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Store className="w-6 h-6 text-orange-600" />
            Sellers & Physical Stores Directory
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Merchant onboarding, FSSAI verification, 0% commission monitoring, and settlement ledger.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Search stores by business name, owner name, city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-orange-500 outline-none"
        />
      </div>

      {/* Stores Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((store) => (
          <div
            key={store.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={store.logo}
                  alt={store.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-100 dark:border-slate-800 shadow-2xs"
                />
                <div className="flex-1 truncate">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{store.name}</h3>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">Owner: {store.sellerName}</p>
                  <p className="text-[10px] text-slate-400 truncate">{store.city} • {store.zone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 mb-3 text-xs">
                <div>
                  <p className="text-[10px] text-slate-400">Total Sales</p>
                  <p className="font-extrabold text-slate-900 dark:text-slate-100">₹{store.totalSales.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Commission Rate</p>
                  <p className="font-extrabold text-emerald-600">0% (Flexi)</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {store.categories.map((cat, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  store.visibilityStatus === 'active'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                {store.visibilityStatus === 'active' ? 'Active Store' : 'Suspended'}
              </span>
              <button
                onClick={() => toggleStoreStatus(store.id)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 cursor-pointer"
              >
                {store.visibilityStatus === 'active' ? 'Suspend' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
