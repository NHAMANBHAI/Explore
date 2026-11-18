import React, { useState } from 'react';
import {
  CreditCard,
  Truck,
  Receipt,
  Languages,
  Palette,
  Users,
  Gift,
  Bot,
  Check,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  QrCode,
  Smartphone
} from 'lucide-react';

export const BentoFeaturesSection: React.FC = () => {
  // Interactive mini-states for bento demos
  const [selectedLang, setSelectedLang] = useState<'en' | 'hi' | 'gu' | 'ta'>('hi');
  const [gstAmount, setGstAmount] = useState<number>(2000);

  const langPreviews: Record<string, { heading: string; cta: string; badge: string }> = {
    en: { heading: 'Shop the Latest Summer Collection', cta: 'Add to Cart • ₹2,499', badge: 'English' },
    hi: { heading: 'नवीनतम समर कलेक्शन अभी खरीदें', cta: 'कार्ट में जोड़ें • ₹2,499', badge: 'हिंदी' },
    gu: { heading: 'નવા સમર કલેક્શનની ખરીદી કરો', cta: 'કાર્ટમાં ઉમેરો • ₹2,499', badge: 'ગુજરાતી' },
    ta: { heading: 'சமீபத்திய கோடைக்கால சேகரிப்பு', cta: 'கூடையில் சேர்க்க • ₹2,499', badge: 'தமிழ்' },
  };

  const calculateGst = (amt: number) => {
    const cgst = (amt * 0.09).toFixed(2);
    const sgst = (amt * 0.09).toFixed(2);
    const total = (amt * 1.18).toFixed(2);
    return { cgst, sgst, total };
  };

  const gstCalc = calculateGst(gstAmount);

  return (
    <section id="features" className="py-20 bg-[#FFFDFB] border-b border-[#F1E7DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs uppercase font-extrabold tracking-wider text-[#FF5722]">
            Built Specifically For India
          </p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Every feature you need. Zero plugins required.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Other platforms force you to install 20 paid plugins for UPI, GST, and Indian couriers.
            FlexiCommerce provides all native integrations out of the box.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Payments Card (UPI & COD) - Wide */}
          <div className="lg:col-span-2 bg-[#FBF7F2] border border-[#F1E7DD] rounded-3xl p-7 flex flex-col justify-between hover:border-orange-300 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-[#FF5722] flex items-center justify-center">
                  <CreditCard className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  Instant Settlements
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-2">
                💳 UPI & Native Indian Payments
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Accept UPI QR code, PhonePe, Google Pay, Paytm, Netbanking, Credit/Debit cards, and Cash on Delivery with SMS OTP verification to prevent fake orders.
              </p>
            </div>

            {/* Interactive Payment Visualizer */}
            <div className="bg-white rounded-2xl p-4 border border-[#F1E7DD] shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Direct Merchant Settlement</p>
                    <p className="text-[10px] text-slate-500">Razorpay • Cashfree • PhonePe</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-orange-50 text-[#FF5722] px-3 py-1.5 rounded-xl font-bold text-xs">
                  <span>COD with OTP Shield</span>
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Couriers & Logistics */}
          <div className="bg-[#FBF7F2] border border-[#F1E7DD] rounded-3xl p-7 flex flex-col justify-between hover:border-orange-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-2">
                📦 17+ Integrated Couriers
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Connect Shiprocket, Shipway, Delhivery, and BlueDart in 1-click. Auto-generate shipping labels, track parcels, and reduce RTO by 38% with automated NDR workflows.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border border-[#F1E7DD] space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Shiprocket AWB: SR-982410</span>
                <span className="text-emerald-600 font-bold">Dispatched</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-4/5 rounded-full" />
              </div>
              <p className="text-[10px] text-slate-400">Delhivery Express • Out for Delivery in Mumbai</p>
            </div>
          </div>

          {/* 3. GST Ready with Interactive Tax Calculator */}
          <div className="bg-[#FBF7F2] border border-[#F1E7DD] rounded-3xl p-7 flex flex-col justify-between hover:border-orange-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                <Receipt className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-2">
                🧾 100% GST & Invoicing
              </h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Automated HSN/SAC codes, state-wise CGST, SGST, and IGST calculations, B2B GSTIN validation, and GSTR-1 audit exports.
              </p>
            </div>

            {/* Interactive GST Breakdown */}
            <div className="bg-white rounded-2xl p-3.5 border border-[#F1E7DD] space-y-2 text-xs">
              <div className="flex items-center justify-between font-medium text-slate-600">
                <span>Taxable Base:</span>
                <span className="font-bold text-slate-900">₹{gstAmount}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500 text-[11px]">
                <span>CGST (9%):</span>
                <span>₹{gstCalc.cgst}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500 text-[11px]">
                <span>SGST (9%):</span>
                <span>₹{gstCalc.sgst}</span>
              </div>
              <div className="border-t border-slate-100 pt-1 flex items-center justify-between font-bold text-slate-900">
                <span>Total with GST:</span>
                <span className="text-[#FF5722]">₹{gstCalc.total}</span>
              </div>
            </div>
          </div>

          {/* 4. 9+ Indian Regional Languages - Interactive Switcher */}
          <div className="bg-[#FBF7F2] border border-[#F1E7DD] rounded-3xl p-7 flex flex-col justify-between hover:border-orange-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-4">
                <Languages className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-2">
                🗣️ 9+ Regional Languages
              </h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Sell in Hindi, Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada, Malayalam, and English. Boost conversion in Tier 2 & 3 cities.
              </p>
            </div>

            {/* Language Switcher Buttons & Preview */}
            <div className="bg-white rounded-2xl p-3.5 border border-[#F1E7DD] space-y-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['hi', 'gu', 'ta', 'en'] as const).map((langKey) => (
                  <button
                    key={langKey}
                    onClick={() => setSelectedLang(langKey)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      selectedLang === langKey
                        ? 'bg-[#FF5722] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {langPreviews[langKey].badge}
                  </button>
                ))}
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {langPreviews[selectedLang].heading}
                </p>
                <p className="text-[11px] text-[#FF5722] font-semibold mt-1">
                  {langPreviews[selectedLang].cta}
                </p>
              </div>
            </div>
          </div>

          {/* 5. Visual Drag & Drop Theme Engine */}
          <div className="bg-[#FBF7F2] border border-[#F1E7DD] rounded-3xl p-7 flex flex-col justify-between hover:border-orange-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-2">
                🎨 Drag & Drop Theme Studio
              </h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                109+ pre-built sections ready for fashion, electronics, food, and grocery. Live instant preview on mobile, tablet, and desktop.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border border-[#F1E7DD] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-bold text-slate-800">109 Pre-built Sections</span>
              </div>
              <span className="text-[#FF5722] font-bold">Zero Code Required</span>
            </div>
          </div>

          {/* 6. B2B Wholesale & Multi-vendor */}
          <div className="bg-[#FBF7F2] border border-[#F1E7DD] rounded-3xl p-7 flex flex-col justify-between hover:border-orange-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-2">
                🤝 B2B Wholesale & MOQs
              </h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Tiered pricing for retail vs wholesale buyers, minimum order quantities (MOQ), custom credit terms, and multi-vendor seller commissions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-3 border border-[#F1E7DD] text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Retail (1-9 pcs):</span>
                <span className="font-bold text-slate-800">₹999 / pc</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Wholesale (50+ pcs):</span>
                <span>₹599 / pc (-40%)</span>
              </div>
            </div>
          </div>

          {/* 7. Marketing, Wheel & WhatsApp - Wide Bottom */}
          <div className="lg:col-span-2 bg-[#FBF7F2] border border-[#F1E7DD] rounded-3xl p-7 flex flex-col justify-between hover:border-orange-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                  <Gift className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
                  +34% Retention
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-2">
                🎡 Gamified Marketing & WhatsApp Recovery
              </h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Turn visitors into buyers with interactive Spin-the-Wheel discount popups, scratch cards, digital wallet cashback, and automated WhatsApp abandoned checkout recovery.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-3.5 border border-[#F1E7DD] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base">
                  💬
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">WhatsApp Automation</p>
                  <p className="text-[10px] text-slate-500">Auto send order tracking & abandoned cart link</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-3.5 border border-[#F1E7DD] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-base">
                  🎯
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Customer Wallet & Points</p>
                  <p className="text-[10px] text-slate-500">Cashback on every purchase for repeat orders</p>
                </div>
              </div>
            </div>
          </div>

          {/* 8. AI Commerce Suite */}
          <div className="bg-gradient-to-br from-[#101418] to-slate-900 text-white rounded-3xl p-7 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-[#FF5722] flex items-center justify-center mb-4">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-white mb-2">
                🤖 AI Commerce Suite
              </h3>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Describe your product in 5 words — our built-in AI writes SEO descriptions, removes messy backgrounds, and tags categories automatically.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-orange-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Prompt Generated</span>
              </div>
              <p className="text-[11px] text-slate-300 italic">
                "Exquisite handcrafted Kanjeevaram silk saree with rich zari border, ideal for royal weddings..."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
