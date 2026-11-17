import React, { useState } from 'react';
import { industryTemplates, IndustryTemplate } from '../data/storefrontData';
import { Check, Star, ShoppingBag, Eye, Sparkles, ArrowRight } from 'lucide-react';

export const IndustryTemplateShowcase: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('fashion');

  const currentTemplate = industryTemplates.find((t) => t.id === selectedTemplateId) || industryTemplates[0];

  return (
    <section id="templates" className="py-20 bg-[#FBF7F2] border-b border-[#F1E7DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <p className="text-xs uppercase font-extrabold tracking-wider text-[#FF5722]">
            Industry Tailored Blueprints
          </p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Pick a template. Or build from zero.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Every category has unique buying habits. FlexiCommerce templates come pre-loaded with industry-standard product pages, filters, and checkout workflows.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {industryTemplates.map((template) => {
            const isActive = template.id === selectedTemplateId;
            return (
              <button
                key={template.id}
                onClick={() => setSelectedTemplateId(template.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-heading font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                    : 'bg-white text-slate-600 border-[#F1E7DD] hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{template.title}</span>
                {template.badge && (
                  <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-[#FF5722] text-white' : 'bg-orange-100 text-[#FF5722]'
                  }`}>
                    {template.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive Template Preview Display */}
        <div className="bg-white rounded-3xl border border-[#F1E7DD] shadow-xl overflow-hidden grid lg:grid-cols-12">
          {/* Left Column: Template Features & Highlights */}
          <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#F1E7DD] bg-gradient-to-b from-white to-slate-50/50">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-orange-100 text-[#FF5722] uppercase tracking-wider">
                  {currentTemplate.title} Blueprint
                </span>
                <span className="text-xs text-slate-400 font-medium">Ready in 20 Mins</span>
              </div>

              <h3 className="font-heading font-extrabold text-2xl text-slate-900 mb-2">
                {currentTemplate.tagline}
              </h3>

              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                {currentTemplate.description}
              </p>

              <div className="space-y-3 mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Included Industry Features:
                </p>
                {currentTemplate.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/80 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Includes Web + Apps + Admin</p>
                <p className="text-sm font-extrabold text-slate-900">100% Fully Customizable</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#FF5722] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm">
                <span>Use This Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Live Mock Store Showcase */}
          <div className="lg:col-span-7 p-6 lg:p-8 bg-slate-50/70 space-y-6">
            {/* Banner preview */}
            <div className="rounded-2xl p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-[#101418] text-white flex flex-col justify-between shadow-md relative overflow-hidden">
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-bold tracking-widest text-[#FF8A65] uppercase">
                  Featured Collection
                </span>
                <h4 className="font-heading font-extrabold text-lg sm:text-xl">
                  {currentTemplate.previewHeroText}
                </h4>
                <p className="text-xs text-slate-300">Live inventory syncing with Hyperlocal dispatch network</p>
              </div>
              <div className="pt-4 relative z-10 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#FF5722] text-white text-xs font-bold">
                  Explore Catalog
                </span>
                <span className="text-xs text-slate-300">0% Commission</span>
              </div>
            </div>

            {/* Products Row Preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Catalog Preview ({currentTemplate.mockProducts.length} items)</span>
                <span className="text-slate-400">Drag & Drop editable in Theme Studio</span>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                {currentTemplate.mockProducts.map((prod, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-[#F1E7DD] rounded-2xl p-3.5 shadow-2xs hover:shadow-md transition-shadow group flex flex-col justify-between"
                  >
                    <div>
                      {/* Product Header / Tag */}
                      <div className="h-24 rounded-xl bg-slate-100 flex items-center justify-center relative mb-2.5 overflow-hidden">
                        <ShoppingBag className="w-8 h-8 text-slate-400 group-hover:scale-110 transition-transform" />
                        {prod.tag && (
                          <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#FF5722] text-white">
                            {prod.tag}
                          </span>
                        )}
                        <div className="absolute bottom-1.5 right-1.5 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded text-[10px] font-bold text-amber-500 flex items-center gap-0.5 shadow-2xs">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          <span>{prod.rating}</span>
                        </div>
                      </div>

                      <p className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug mb-1">
                        {prod.name}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-extrabold text-slate-900">{prod.price}</span>
                        {prod.oldPrice && (
                          <s className="text-[10px] text-slate-400 ml-1">{prod.oldPrice}</s>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-[#FF5722] bg-orange-50 px-2 py-0.5 rounded-lg group-hover:bg-[#FF5722] group-hover:text-white transition-colors">
                        Add
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
