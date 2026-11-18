import React from 'react';
import { liveStoreBrands } from '../data/storefrontData';
import { MapPin, TrendingUp, CheckCircle } from 'lucide-react';

export const LiveStoresMarquee: React.FC = () => {
  return (
    <section className="border-y border-[#F1E7DD] bg-[#FFFDFB] py-8 overflow-hidden" aria-label="Live stores on FlexiCommerce">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-xs uppercase font-extrabold tracking-wider text-[#FF5722]">
              Live Stores. All Real.
            </h2>
          </div>
          <p className="font-heading font-extrabold text-xl text-slate-900">
            Store owners. Just like you.
          </p>
        </div>
        <p className="text-xs text-slate-500 max-w-sm">
          From dry fruits in Ahmedabad to pure organic camphor in Mumbai — Indian merchants grow with FlexiCommerce.
        </p>
      </div>

      {/* Infinite Horizontal Scrolling Ticker */}
      <div className="relative w-full overflow-hidden mask-gradient-x">
        <div className="flex items-center gap-4 animate-marquee hover:pause">
          {/* Duplicate 2x for seamless continuous scroll */}
          {[...liveStoreBrands, ...liveStoreBrands].map((store, idx) => (
            <div
              key={`${store.name}-${idx}`}
              className="flex items-center gap-3.5 bg-white border border-[#F1E7DD] rounded-2xl px-4 py-3 shrink-0 shadow-2xs hover:border-[#FF5722]/50 hover:shadow-md transition-all cursor-pointer min-w-[260px]"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${store.color} text-white font-heading font-extrabold text-xs flex items-center justify-center shadow-xs shrink-0`}
              >
                {store.initials}
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-bold text-slate-900 truncate">{store.name}</p>
                  <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-500 truncate">{store.category}</p>
                <div className="flex items-center gap-2 mt-0.5 text-[10px]">
                  <span className="text-slate-400 flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5" /> {store.location}
                  </span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                    <TrendingUp className="w-2.5 h-2.5" /> {store.metric}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
