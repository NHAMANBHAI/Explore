import React, { useState } from 'react';
import { StorefrontNavbar } from './components/StorefrontNavbar';
import { HeroSection } from './components/HeroSection';
import { LiveStoresMarquee } from './components/LiveStoresMarquee';
import { EcosystemSection } from './components/EcosystemSection';
import { BentoFeaturesSection } from './components/BentoFeaturesSection';
import { IndustryTemplateShowcase } from './components/IndustryTemplateShowcase';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { StorefrontFooter } from './components/StorefrontFooter';
import { useToast } from '../../context/ToastContext';
import { LayoutDashboard, ArrowRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface FlexiStorefrontPageProps {
  onNavigateToAdmin: () => void;
}

export const FlexiStorefrontPage: React.FC<FlexiStorefrontPageProps> = ({ onNavigateToAdmin }) => {
  const { toast } = useToast();
  const [selectedPlanForTrial, setSelectedPlanForTrial] = useState<string | null>(null);

  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanForTrial(planId);
    toast.success(`Selected Plan: ${planId.toUpperCase()}`, '14-Day Free Trial initiated with 0% commission!');
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] text-slate-900 selection:bg-orange-500 selection:text-white font-body">
      {/* Sticky Dark Navbar */}
      <StorefrontNavbar
        onNavigateToAdmin={onNavigateToAdmin}
        onScrollToSection={handleScrollToSection}
      />

      {/* Hero Section */}
      <div id="hero">
        <HeroSection
          onNavigateToAdmin={onNavigateToAdmin}
          onGetStarted={() => handleScrollToSection('pricing')}
        />
      </div>

      {/* Live Active Merchant Stores Marquee */}
      <LiveStoresMarquee />

      {/* 4-in-1 Ecosystem Cards (Web, Customer App, Delivery App, Admin) */}
      <EcosystemSection onNavigateToAdmin={onNavigateToAdmin} />

      {/* India-First Bento Grid Features (UPI, Couriers, GST, 9 Languages, Theme Studio) */}
      <BentoFeaturesSection />

      {/* Industry Blueprint Templates Showcase */}
      <IndustryTemplateShowcase />

      {/* Simple Transparent Pricing */}
      <PricingSection onSelectPlan={handleSelectPlan} />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Storefront Footer */}
      <StorefrontFooter
        onNavigateToAdmin={onNavigateToAdmin}
        onScrollToSection={handleScrollToSection}
      />

      {/* Persistent Floating Quick-Switch Pill to Hyperlocal Admin Panel */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          onClick={onNavigateToAdmin}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#101418] hover:bg-slate-900 text-white text-xs font-semibold shadow-2xl border border-white/20 transition-all hover:scale-105 active:scale-95 group cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#FF5722] to-[#F5A623] flex items-center justify-center text-white shrink-0 shadow-xs">
            <LayoutDashboard className="w-3.5 h-3.5" />
          </div>
          <span>Switch to Hyperlocal Admin</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>

      {/* Quick Plan Trial Confirmation Modal */}
      {selectedPlanForTrial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-50 duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setSelectedPlanForTrial(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#FF5722] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-heading font-extrabold text-2xl text-slate-900 capitalize">
                Start with {selectedPlanForTrial} Plan
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your 14-day free trial includes instant website deployment, mobile apps preview, and full hyperlocal admin access.
              </p>
            </div>

            <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>0% Commission on all sales</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Free custom .in domain setup on annual billing</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Direct UPI & Shiprocket automated integrations</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setSelectedPlanForTrial(null);
                  onNavigateToAdmin();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#F5A623] hover:opacity-95 text-white font-heading font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch Hyperlocal Admin Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSelectedPlanForTrial(null)}
                className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Continue Browsing Storefront
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
