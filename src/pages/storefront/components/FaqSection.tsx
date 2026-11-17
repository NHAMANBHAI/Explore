import React, { useState } from 'react';
import { faqItems } from '../data/storefrontData';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[#FBF7F2] border-b border-[#F1E7DD]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#FF5722] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" /> Answers for Indian Retailers
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600">
            Have questions before starting? Here is everything you need to know about pricing, apps, and shipping.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#F1E7DD] rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors cursor-pointer"
                >
                  <span className="font-heading font-bold text-sm sm:text-base text-slate-900">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-orange-100 text-[#FF5722]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in-50 duration-150">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help CTA Box */}
        <div className="mt-10 bg-white border border-[#F1E7DD] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FF5722] flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Need help deciding the right plan?</p>
              <p className="text-[11px] text-slate-500">Our commerce specialists in India are ready on WhatsApp.</p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm">
            <span>Chat on WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
};
