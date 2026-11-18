'use client';

import React, { useState } from 'react';
import { Palette, Eye, Smartphone, Monitor, Check, GripVertical, Plus } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface LayoutSection {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
}

const initialSections: LayoutSection[] = [
  { id: 'sec-1', name: 'Header & Search Autocomplete', type: 'Header', enabled: true },
  { id: 'sec-2', name: 'Hero Promotional Slider', type: 'Hero', enabled: true },
  { id: 'sec-3', name: '10-Min Fast Delivery Pincode Checker', type: 'Utility', enabled: true },
  { id: 'sec-4', name: 'Top Categories Circular Grid', type: 'Categories', enabled: true },
  { id: 'sec-5', name: 'Flash Deals Countdown Timer', type: 'Promotions', enabled: true },
  { id: 'sec-6', name: 'Shoppable Video Reels (Watch & Buy)', type: 'Media', enabled: true },
  { id: 'sec-7', name: 'Curated Organic & Festive Bestsellers', type: 'Products', enabled: true },
  { id: 'sec-8', name: 'Customer Reviews & Social Proof Wall', type: 'Social', enabled: true },
  { id: 'sec-9', name: 'Footer & Multi-Language Links', type: 'Footer', enabled: true },
];

export const BuilderView: React.FC = () => {
  const { toast } = useToast();
  const [sections, setSections] = useState(initialSections);
  const [previewDevice, setPreviewDevice] = useState<'MOBILE' | 'DESKTOP'>('DESKTOP');

  const toggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const next = !s.enabled;
          toast.info('Layout Modified', `${s.name} ${next ? 'enabled' : 'hidden'}`);
          return { ...s, enabled: next };
        }
        return s;
      })
    );
  };

  const handleSaveLayout = () => {
    toast.success('Layout Published Live', 'Changes propagated to storefront and mobile apps in 0.2s.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Palette className="w-6 h-6 text-orange-600" />
            Visual App & Storefront Theme Studio
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Reorder homepage widgets, enable/disable flash sale banners, and push live changes without app redeployment.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setPreviewDevice('DESKTOP')}
              className={`p-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                previewDevice === 'DESKTOP' ? 'bg-white dark:bg-slate-900 shadow-xs text-slate-900 dark:text-slate-100' : 'text-slate-500'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice('MOBILE')}
              className={`p-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                previewDevice === 'MOBILE' ? 'bg-white dark:bg-slate-900 shadow-xs text-slate-900 dark:text-slate-100' : 'text-slate-500'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleSaveLayout}
            className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#FF5722] to-[#F5A623] shadow-md shadow-orange-500/20 cursor-pointer"
          >
            Publish Live Layout
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Sections List (Col 7) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Homepage Layout Sections ({sections.filter((s) => s.enabled).length} Active)
            </p>
            <span className="text-[11px] text-slate-400">Drag to reorder hierarchy</span>
          </div>

          {sections.map((section, idx) => (
            <div
              key={section.id}
              className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border transition-all flex items-center justify-between gap-3 shadow-xs ${
                section.enabled
                  ? 'border-slate-200 dark:border-slate-800'
                  : 'border-slate-200/50 dark:border-slate-800/50 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-slate-400 cursor-grab" />
                <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{section.name}</p>
                  <p className="text-[10px] text-slate-400">Component: {section.type}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    section.enabled
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                  }`}
                >
                  {section.enabled ? 'Visible' : 'Hidden'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Live Mockup Viewport (Col 5) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xl">
          <div className="text-center pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Live Viewport Preview</span>
            <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
              Instant Sync
            </span>
          </div>

          <div
            className={`mx-auto mt-4 rounded-2xl border-4 border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 space-y-2 overflow-y-auto max-h-[500px] transition-all ${
              previewDevice === 'MOBILE' ? 'max-w-[280px]' : 'w-full'
            }`}
          >
            {sections
              .filter((s) => s.enabled)
              .map((s, idx) => (
                <div
                  key={s.id}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs text-center"
                >
                  <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">{s.name}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">Section #{idx + 1}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
