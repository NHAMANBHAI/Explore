'use client';

import React from 'react';
import { Video, Play, Eye, ShoppingBag, Plus, Heart } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const WatchAndBuyView: React.FC = () => {
  const { toast } = useToast();

  const reels = [
    { id: 'reel-1', title: 'Handcrafted Kurti Try-on & Styling', store: 'Desi Boutique', views: '14.2K', likes: '1.8K', taggedProduct: 'Chanderi Kurti Set (₹2,499)', thumbnail: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80' },
    { id: 'reel-2', title: 'Fresh Bilona Ghee Preparation Process', store: 'Organic Harvest Dairy', views: '28.5K', likes: '4.2K', taggedProduct: 'A2 Desi Cow Ghee (₹950)', thumbnail: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80' },
    { id: 'reel-3', title: 'Unboxing Noise Canceling ANC Earbuds', store: 'Urban Gadgets Hub', views: '9.4K', likes: '920', taggedProduct: 'AeroPods Pro ANC (₹3,499)', thumbnail: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Video className="w-6 h-6 text-rose-500" />
            Watch & Buy — Shoppable Video Reels
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Instagram-style short videos with 1-click in-video product buy buttons. Boosts mobile checkout conversion by 3.2x.
          </p>
        </div>
        <button
          onClick={() => toast.info('Video Upload', 'Reel uploader opened.')}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-rose-500 hover:bg-rose-600 shadow-md shadow-rose-500/20 flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Upload New Reel
        </button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {reels.map((reel) => (
          <div key={reel.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs group flex flex-col justify-between">
            <div className="h-64 relative overflow-hidden bg-slate-900">
              <img src={reel.thumbnail} alt={reel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4 text-white">
                <div className="flex justify-between items-center text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-xs font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {reel.views}
                  </span>
                  <span className="flex items-center gap-1 text-rose-400 font-bold">
                    <Heart className="w-3.5 h-3.5 fill-rose-500" /> {reel.likes}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto my-auto text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
                <p className="text-xs font-bold line-clamp-1">{reel.title}</p>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/60 flex items-center justify-between">
                <div className="flex items-center gap-2 truncate">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#FF5722] shrink-0" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">{reel.taggedProduct}</span>
                </div>
                <span className="text-[10px] font-bold text-[#FF5722] shrink-0">Tagged</span>
              </div>
              <p className="text-[11px] text-slate-400">Merchant: {reel.store}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
