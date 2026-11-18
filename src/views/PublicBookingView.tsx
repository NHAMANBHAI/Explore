'use client';

import React, { useState } from 'react';
import {
  CalendarCheck2,
  Clock,
  User,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Stethoscope,
  Scissors,
  Wrench,
  Dog,
  Activity,
  MapPin,
  Calendar,
  Send,
  ExternalLink,
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

interface SpecialistItem {
  id: string;
  name: string;
  title: string;
  category: 'CLINIC' | 'SALON' | 'AUTO_SERVICE' | 'PET_CARE' | 'FITNESS';
  storeName: string;
  rating: number;
  services: { name: string; duration: number; price: number }[];
}

const AVAILABLE_SPECIALISTS: SpecialistItem[] = [
  {
    id: 'sp-01',
    name: 'Dr. Vivek Singhania',
    title: 'Chief Dental Surgeon',
    category: 'CLINIC',
    storeName: 'Apollo 24/7 Super Clinic',
    rating: 4.9,
    services: [
      { name: 'Dental Scaling & Fluoride Coating', duration: 45, price: 1800 },
      { name: 'Root Canal Consultation (RCT)', duration: 60, price: 4500 },
      { name: 'Orthodontic Teeth Aligners Checkup', duration: 30, price: 1200 },
    ],
  },
  {
    id: 'sp-02',
    name: 'Vikram Sethi',
    title: 'Master Hair Stylist & Colorist',
    category: 'SALON',
    storeName: 'Enrich Luxury Salon & Spa',
    rating: 4.9,
    services: [
      { name: 'Balayage Hair Color & Olaplex Spa', duration: 90, price: 6500 },
      { name: 'Hydra-Facial & Glow Therapy', duration: 60, price: 3200 },
      { name: 'Executive Keratin Hair Therapy', duration: 75, price: 4500 },
    ],
  },
  {
    id: 'sp-03',
    name: 'Amitabh Sharma',
    title: 'Head Diagnostic Mechanic',
    category: 'AUTO_SERVICE',
    storeName: 'SpeedWheels Bosch Auto Care',
    rating: 4.8,
    services: [
      { name: 'Full Periodic Service & Synthetic Oil', duration: 90, price: 5400 },
      { name: 'Front & Rear Brake Pad Replacement', duration: 60, price: 2800 },
      { name: 'Complete 40-Point Car Health Scan', duration: 45, price: 1500 },
    ],
  },
  {
    id: 'sp-04',
    name: 'Dr. Radhika Nair',
    title: 'Senior Veterinary Surgeon',
    category: 'PET_CARE',
    storeName: 'Paws & Claws Veterinary Hospital',
    rating: 5.0,
    services: [
      { name: 'Annual DHPPiL + Anti-Rabies Booster', duration: 30, price: 1500 },
      { name: 'General Puppy Wellness & Diet Consultation', duration: 30, price: 900 },
      { name: 'Pet Dental Cleaning & Scaling', duration: 45, price: 2200 },
    ],
  },
  {
    id: 'sp-05',
    name: 'Coach Ritu Arya',
    title: 'Certified Rehab & Pilates Coach',
    category: 'FITNESS',
    storeName: 'FitPulse Strength & Yoga Studio',
    rating: 4.9,
    services: [
      { name: '1-on-1 Posture Rehab & Lumbar Care', duration: 60, price: 2000 },
      { name: 'Private Pilates Core Strength Session', duration: 60, price: 2200 },
      { name: 'Athletic Flexibility & Mobility Audit', duration: 45, price: 1600 },
    ],
  },
];

const TIME_SLOTS = [
  '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

export const PublicBookingView: React.FC = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Selections
  const [selectedCategory, setSelectedCategory] = useState<'CLINIC' | 'SALON' | 'AUTO_SERVICE' | 'PET_CARE' | 'FITNESS'>('CLINIC');
  const [selectedSpecialist, setSelectedSpecialist] = useState<SpecialistItem>(AVAILABLE_SPECIALISTS[0]);
  const [selectedService, setSelectedService] = useState(AVAILABLE_SPECIALISTS[0].services[0]);
  const [bookingDate, setBookingDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [bookingTime, setBookingTime] = useState('11:00');

  // Customer Details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [whatsappConsent, setWhatsappConsent] = useState(true);

  // Confirmed State
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Category change handler
  const handleCategorySelect = (cat: 'CLINIC' | 'SALON' | 'AUTO_SERVICE' | 'PET_CARE' | 'FITNESS') => {
    setSelectedCategory(cat);
    const spec = AVAILABLE_SPECIALISTS.find((s) => s.category === cat) || AVAILABLE_SPECIALISTS[0];
    setSelectedSpecialist(spec);
    setSelectedService(spec.services[0]);
    setStep(2);
  };

  // Submit Booking
  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      toast.error('Required Fields', 'Please enter your name and WhatsApp phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId: selectedSpecialist.id,
          storeName: selectedSpecialist.storeName,
          businessCategory: selectedCategory,
          customerName,
          customerPhone,
          customerEmail,
          providerName: selectedSpecialist.name,
          providerTitle: selectedSpecialist.title,
          serviceName: selectedService.name,
          serviceCategory: selectedCategory,
          bookingDate,
          bookingTime,
          durationMinutes: selectedService.duration,
          amountTotal: selectedService.price,
          whatsappConsent,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error('Slot Conflict', data.message || 'Slot clash detected. Please pick another time.');
        setIsSubmitting(false);
        return;
      }

      setConfirmedBooking(data.booking);
      toast.success(
        'Appointment Confirmed!',
        `Your slot with ${selectedSpecialist.name} is verified. Ref: ${data.booking.bookingNumber}`
      );
      setStep(4);
    } catch (err: any) {
      toast.error('Booking Error', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 px-4 sm:px-6 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-400 border border-orange-200 dark:border-orange-800 text-[11px] font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            Instant Online Slot Reservation
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
            Book Your Appointment
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-xl mx-auto">
            Reserve certified doctors, master hair stylists, certified mechanics, veterinarians, and fitness coaches with real-time clash check.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between max-w-md mx-auto p-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs text-xs font-semibold">
          {[
            { num: 1, label: 'Vertical' },
            { num: 2, label: 'Specialist' },
            { num: 3, label: 'Slot & Details' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => step < 4 && setStep(s.num as any)}
              disabled={step === 4}
              className={`flex-1 py-1.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                step === s.num
                  ? 'bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-zinc-200 dark:bg-zinc-800 text-[10px] flex items-center justify-center font-mono">
                {s.num}
              </span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: SELECT BUSINESS VERTICAL */}
        {/* ========================================================================= */}
        {step === 1 && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-zinc-950 dark:text-zinc-50">
                1. Select Service Category
              </h2>
              <p className="text-xs text-zinc-500">
                Choose the business type you want to schedule with.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                {
                  id: 'CLINIC' as const,
                  title: 'Dental & Medical Clinics',
                  desc: 'Root canals, tooth scaling, pediatric & general OPD',
                  icon: <Stethoscope className="w-5 h-5 text-blue-500" />,
                },
                {
                  id: 'SALON' as const,
                  title: 'Salons, Spas & Wellness',
                  desc: 'Hair artistry, balayage, hydra-facials & beauty spa',
                  icon: <Scissors className="w-5 h-5 text-amber-500" />,
                },
                {
                  id: 'AUTO_SERVICE' as const,
                  title: 'Auto Care & Garages',
                  desc: 'Periodic car maintenance, synthetic oil & brake checks',
                  icon: <Wrench className="w-5 h-5 text-zinc-400" />,
                },
                {
                  id: 'PET_CARE' as const,
                  title: 'Pet Care & Veterinary Hospital',
                  desc: 'Puppy vaccinations, health checkups & pet dental',
                  icon: <Dog className="w-5 h-5 text-emerald-500" />,
                },
                {
                  id: 'FITNESS' as const,
                  title: 'Fitness, Yoga & Rehab Pilates',
                  desc: 'Posture alignment, core strength & 1-on-1 coaching',
                  icon: <Activity className="w-5 h-5 text-purple-500" />,
                },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleCategorySelect(item.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 group cursor-pointer ${
                    selectedCategory === item.id
                      ? 'border-orange-500 bg-orange-50/40 dark:bg-orange-950/20 shadow-xs'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/40'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
                      <span>{item.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-[11px] text-zinc-500 leading-snug">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: CHOOSE SPECIALIST & SERVICE */}
        {/* ========================================================================= */}
        {step === 2 && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-zinc-950 dark:text-zinc-50">
                  2. Choose Specialist & Procedure
                </h2>
                <p className="text-xs text-zinc-500">
                  Select your practitioner and specific service package.
                </p>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            </div>

            {/* Specialist Card */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200/80 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                  {selectedSpecialist.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
                    {selectedSpecialist.name}
                  </h3>
                  <p className="text-xs text-zinc-500">{selectedSpecialist.title}</p>
                  <p className="text-[11px] text-orange-600 font-semibold">{selectedSpecialist.storeName}</p>
                </div>
              </div>
              <Badge variant="success" size="sm" dot>
                ★ {selectedSpecialist.rating} Verified Specialist
              </Badge>
            </div>

            {/* Services List */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                Select Service Package:
              </label>
              <div className="space-y-2">
                {selectedSpecialist.services.map((serv) => (
                  <label
                    key={serv.name}
                    onClick={() => setSelectedService(serv)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      selectedService.name === serv.name
                        ? 'border-orange-500 bg-orange-50/40 dark:bg-orange-950/30'
                        : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {serv.name}
                      </p>
                      <p className="text-[11px] text-zinc-500 flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-zinc-400" />
                          {serv.duration} Minutes
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-sm font-black text-zinc-950 dark:text-zinc-50">
                        ₹{serv.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Date & Slot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: PICK DATE, SLOT & CONTACT DETAILS */}
        {/* ========================================================================= */}
        {step === 3 && (
          <form onSubmit={handleConfirmBooking} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-zinc-950 dark:text-zinc-50">
                  3. Select Date & Slot Time
                </h2>
                <p className="text-xs text-zinc-500">
                  {selectedService.name} with {selectedSpecialist.name} (₹{selectedService.price})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            </div>

            {/* Date Picker */}
            <div>
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                Preferred Appointment Date:
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Time Slot Pills */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                Available Time Slots on {bookingDate}:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setBookingTime(slot)}
                    className={`py-2 px-3 rounded-xl border font-mono text-xs font-bold text-center transition-all cursor-pointer ${
                      bookingTime === slot
                        ? 'border-orange-500 bg-orange-600 text-white shadow-xs'
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Details */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                Your Contact Information:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                    Full Name: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arjun Kapoor"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                    WhatsApp Phone Number: *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                  Email (Optional for e-Invoice):
                </label>
                <input
                  type="email"
                  placeholder="arjun.k@gmail.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={whatsappConsent}
                  onChange={(e) => setWhatsappConsent(e.target.checked)}
                  className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                />
                <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
                  Send me instant appointment confirmation & 18:00 reminder on WhatsApp
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isSubmitting ? 'Validating Slot...' : 'Confirm & Reserve Slot'}</span>
              </button>
            </div>
          </form>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: INSTANT APPOINTMENT CONFIRMATION CARD */}
        {/* ========================================================================= */}
        {step === 4 && confirmedBooking && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <Badge variant="success" size="sm" dot>
                Slot Reserved with Zero Conflict
              </Badge>
              <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">
                You're All Set, {confirmedBooking.customerName}!
              </h2>
              <p className="text-xs text-zinc-500">
                Your appointment reference has been booked. A confirmation has been queued for your WhatsApp.
              </p>
            </div>

            {/* Pass / Receipt Card */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-left space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2.5">
                <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                  Booking Reference
                </span>
                <span className="font-bold text-orange-600 dark:text-orange-400 text-sm">
                  {confirmedBooking.bookingNumber}
                </span>
              </div>

              <div className="space-y-1.5 text-zinc-700 dark:text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Specialist:</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{confirmedBooking.providerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Service:</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{confirmedBooking.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Date:</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{confirmedBooking.bookingDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Time:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{confirmedBooking.bookingTime} ({confirmedBooking.durationMinutes}m)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Fee:</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">₹{confirmedBooking.amountTotal} (Pay at Center)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2 text-[11px] text-zinc-500">
                <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span className="truncate">Main Center, 1st Floor, High Street Mall</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setStep(1);
                  setConfirmedBooking(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                Book Another Appointment
              </button>
              <a
                href="/"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Return to Storefront</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
