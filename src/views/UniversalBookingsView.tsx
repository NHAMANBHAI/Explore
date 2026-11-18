'use client';

import React, { useState } from 'react';
import {
  CalendarCheck2,
  Clock,
  User,
  Phone,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Send,
  Repeat,
  FileText,
  Filter,
  Search,
  Plus,
  ArrowUpRight,
  TrendingUp,
  X,
  CreditCard,
  QrCode,
  Check,
  ChevronRight,
  Stethoscope,
  Scissors,
  Wrench,
  Dog,
  Activity,
} from 'lucide-react';
import { mockUniversalBookings, MockBookingItem } from '../data/mockUniversalBookings';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { StatCard } from '../components/ui/StatCard';
import { useToast } from '../context/ToastContext';

export const UniversalBookingsView: React.FC = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<MockBookingItem[]>(mockUniversalBookings);
  const [activeTab, setActiveTab] = useState<'roster' | 'new' | 'followups' | 'eod'>('roster');
  const [selectedVertical, setSelectedVertical] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Modals & Drawers
  const [completingBooking, setCompletingBooking] = useState<MockBookingItem | null>(null);
  const [completionNotes, setCompletionNotes] = useState('');
  const [completionAmount, setCompletionAmount] = useState<number>(0);
  const [completionMode, setCompletionMode] = useState<'UPI' | 'CASH' | 'CARD'>('UPI');
  const [followUpInterval, setFollowUpInterval] = useState<number>(7);
  const [followUpNotes, setFollowUpNotes] = useState('');

  // WhatsApp Preview Modal
  const [whatsappPreview, setWhatsappPreview] = useState<{
    phone: string;
    name: string;
    message: string;
  } | null>(null);

  // New Booking Form State
  const [newBooking, setNewBooking] = useState({
    businessCategory: 'CLINIC' as const,
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    providerName: 'Dr. Vivek Singhania',
    providerTitle: 'Chief Dental Surgeon',
    serviceName: 'Dental Consultation & Scaling',
    serviceCategory: 'Dental Care',
    bookingDate: new Date().toISOString().split('T')[0],
    bookingTime: '12:00',
    durationMinutes: 30,
    amountTotal: 1500,
    whatsappConsent: true,
  });

  // Clash Check Warning
  const [clashWarning, setClashWarning] = useState<string | null>(null);

  // Filter Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesCategory =
      selectedVertical === 'ALL' || b.businessCategory === selectedVertical;
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerPhone.includes(searchQuery) ||
      b.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !dateFilter || b.bookingDate === dateFilter;
    return matchesCategory && matchesSearch && matchesDate;
  });

  // Follow-Up Cohorts
  const followUpQueue = bookings.filter(
    (b) => b.followUpRequired && (selectedVertical === 'ALL' || b.businessCategory === selectedVertical)
  );

  // Revenue & Stats Calculation
  const totalRevenue = bookings
    .filter((b) => b.status === 'COMPLETED')
    .reduce((acc, curr) => acc + (curr.amountPaid || curr.amountTotal || 0), 0);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookingsCount = bookings.filter((b) => b.bookingDate === todayStr).length;
  const followUpsDueTodayCount = bookings.filter(
    (b) => b.followUpRequired && b.followUpDate === todayStr && b.followUpStatus === 'PENDING'
  ).length;

  // Real-Time Slot Availability / Anti-Double Booking Check
  const checkClash = (provider: string, date: string, time: string) => {
    const clash = bookings.find(
      (b) =>
        b.providerName.toLowerCase() === provider.toLowerCase() &&
        b.bookingDate === date &&
        b.bookingTime === time &&
        b.status !== 'CANCELLED'
    );
    if (clash) {
      setClashWarning(
        `⚠️ Slot Clash Alert: ${provider} already has booking ${clash.bookingNumber} at ${time} on ${date}.`
      );
    } else {
      setClashWarning(null);
    }
  };

  // Submit New Booking
  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.customerName || !newBooking.customerPhone) {
      toast.error('Validation Error', 'Customer Name and Phone are required.');
      return;
    }

    // Double check clash
    const clash = bookings.find(
      (b) =>
        b.providerName.toLowerCase() === newBooking.providerName.toLowerCase() &&
        b.bookingDate === newBooking.bookingDate &&
        b.bookingTime === newBooking.bookingTime &&
        b.status !== 'CANCELLED'
    );

    if (clash) {
      toast.error(
        'Double-Booking Prevented',
        `Slot ${newBooking.bookingTime} is already taken by ${clash.customerName} (${clash.bookingNumber}).`
      );
      return;
    }

    const prefix = newBooking.businessCategory.slice(0, 3).toUpperCase();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const created: MockBookingItem = {
      id: `ub-${Date.now()}`,
      bookingNumber: `BK-${prefix}-${randomSuffix}`,
      storeId: 'store-1',
      storeName: 'Explore Integrated Center',
      ...newBooking,
      status: 'CONFIRMED',
      paymentStatus: 'PENDING',
      paymentMode: 'PENDING',
      amountPaid: 0,
      reminderSent: false,
      followUpRequired: false,
      followUpStatus: 'NONE',
    };

    setBookings([created, ...bookings]);
    toast.success(
      'Slot Reserved Successfully',
      `Booking ${created.bookingNumber} confirmed for ${created.customerName}. Double-booking clash check passed.`
    );
    setActiveTab('roster');
    setClashWarning(null);
  };

  // Complete Visit & Record Payment & Auto Follow-Up (Workflow 3)
  const handleCompleteVisit = () => {
    if (!completingBooking) return;

    const followUpDateObj = new Date();
    followUpDateObj.setDate(followUpDateObj.getDate() + followUpInterval);
    const calculatedFollowUpDate = followUpDateObj.toISOString().split('T')[0];

    const updated = bookings.map((b) => {
      if (b.id === completingBooking.id) {
        return {
          ...b,
          status: 'COMPLETED' as const,
          consultationNotes: completionNotes || b.consultationNotes,
          paymentStatus: 'PAID' as const,
          paymentMode: completionMode,
          amountPaid: Number(completionAmount || b.amountTotal),
          followUpRequired: true,
          followUpIntervalDays: followUpInterval,
          followUpDate: calculatedFollowUpDate,
          followUpNotes: followUpNotes || `${followUpInterval}-Day review & follow-up care.`,
          followUpStatus: 'PENDING' as const,
        };
      }
      return b;
    });

    setBookings(updated);
    toast.success(
      'Visit Completed & Follow-Up Scheduled',
      `Payment of ₹${completionAmount || completingBooking.amountTotal} recorded (${completionMode}). Next recall set for ${calculatedFollowUpDate} (${followUpInterval} days).`
    );
    setCompletingBooking(null);
  };

  // Trigger 18:00 WhatsApp Reminders (Workflow 2)
  const handleDispatchTomorrowReminders = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    let count = 0;
    const updated = bookings.map((b) => {
      if (b.bookingDate === tomorrowStr && b.status === 'CONFIRMED' && !b.reminderSent) {
        count++;
        return { ...b, reminderSent: true, reminderSentAt: new Date().toISOString() };
      }
      return b;
    });

    setBookings(updated);
    if (count > 0) {
      toast.success(
        '18:00 WhatsApp Reminders Dispatched',
        `Dispatched ${count} automated reminder messages to customers for tomorrow (${tomorrowStr}).`
      );
    } else {
      toast.info(
        'No Pending Reminders',
        `All appointments for tomorrow (${tomorrowStr}) have already received reminders.`
      );
    }
  };

  // Vertical metadata helper
  const getVerticalIcon = (cat: string) => {
    switch (cat) {
      case 'CLINIC':
        return <Stethoscope className="w-3.5 h-3.5 text-blue-500" />;
      case 'SALON':
        return <Scissors className="w-3.5 h-3.5 text-amber-500" />;
      case 'AUTO_SERVICE':
        return <Wrench className="w-3.5 h-3.5 text-zinc-400" />;
      case 'PET_CARE':
        return <Dog className="w-3.5 h-3.5 text-emerald-500" />;
      case 'FITNESS':
        return <Activity className="w-3.5 h-3.5 text-purple-500" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-orange-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 21st.dev Ambient Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-gradient-to-br from-orange-500/20 to-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/80 text-[11px] font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Universal Multi-Business Booking Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              <CalendarCheck2 className="w-7 h-7 text-orange-400" />
              Appointments, Slots & Automated Recalls
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Anti-double-booking clash checks, automated 18:00 WhatsApp reminders, 7/15/30-day post-visit follow-up recall cohorts, and 21:00 EOD revenue digests.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleDispatchTomorrowReminders}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5 text-orange-400" />
              Dispatch 18:00 Reminders
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white shadow-sm flex items-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              New Appointment Slot
            </button>
          </div>
        </div>
      </div>

      {/* 4 Monospace KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Bookings"
          value={bookings.length}
          change={18.4}
          isIncrease={true}
          description="Across all business verticals"
          icon={<CalendarCheck2 className="w-4 h-4 text-blue-500" />}
        />
        <StatCard
          title="Today's Active Slots"
          value={todayBookingsCount}
          change={12.0}
          isIncrease={true}
          description="Scheduled for today"
          icon={<Clock className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Revenue Collected"
          value={`₹${totalRevenue.toLocaleString('en-IN')}`}
          change={24.8}
          isIncrease={true}
          description="UPI, Cash & Card settled"
          icon={<DollarSign className="w-4 h-4 text-amber-500" />}
        />
        <StatCard
          title="Follow-Ups Due Today"
          value={followUpsDueTodayCount}
          change={-5.2}
          isIncrease={false}
          description="7, 15, 30-day retention recalls"
          icon={<Repeat className="w-4 h-4 text-purple-500" />}
        />
      </div>

      {/* Multi-Business Vertical Selector Strip */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="flex items-center gap-2">
          {[
            { id: 'ALL', label: 'All Businesses', icon: <Sparkles className="w-3.5 h-3.5" /> },
            { id: 'CLINIC', label: 'Clinics & OPD', icon: <Stethoscope className="w-3.5 h-3.5" /> },
            { id: 'SALON', label: 'Salons & Spas', icon: <Scissors className="w-3.5 h-3.5" /> },
            { id: 'AUTO_SERVICE', label: 'Auto Garages', icon: <Wrench className="w-3.5 h-3.5" /> },
            { id: 'PET_CARE', label: 'Pet Care & Vets', icon: <Dog className="w-3.5 h-3.5" /> },
            { id: 'FITNESS', label: 'Fitness & Yoga', icon: <Activity className="w-3.5 h-3.5" /> },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVertical(v.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedVertical === v.id
                  ? 'bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'
              }`}
            >
              {v.icon}
              <span>{v.label}</span>
            </button>
          ))}
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'roster'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            Calendar Roster
          </button>
          <button
            onClick={() => setActiveTab('followups')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'followups'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <span>Recall Queue</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          </button>
          <button
            onClick={() => setActiveTab('eod')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'eod'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            21:00 EOD Report
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: CALENDAR & ROSTER VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'roster' && (
        <div className="space-y-4">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
              <input
                type="text"
                placeholder="Search patient, client, phone, specialist, service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-300 outline-none"
              />
              {dateFilter && (
                <button
                  onClick={() => setDateFilter('')}
                  className="px-2.5 py-2 rounded-xl text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Roster Table */}
          <div className="bg-white dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-200/80 dark:border-zinc-800/80 text-zinc-400 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Booking Ref</th>
                    <th className="py-3 px-4">Client / Patient</th>
                    <th className="py-3 px-4">Vertical & Service</th>
                    <th className="py-3 px-4">Specialist / Provider</th>
                    <th className="py-3 px-4">Date & Slot</th>
                    <th className="py-3 px-4">Billing & Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-zinc-400">
                        No appointments found matching this filter.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr
                        key={b.id}
                        className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                      >
                        {/* Ref */}
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 block">
                            {b.bookingNumber}
                          </span>
                          <span className="text-[10px] text-zinc-400 truncate max-w-[120px] block">
                            {b.storeName}
                          </span>
                        </td>

                        {/* Client */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-zinc-950 dark:text-zinc-50">
                            {b.customerName}
                          </div>
                          <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-1">
                            <Phone className="w-3 h-3 text-zinc-400" />
                            {b.customerPhone}
                          </div>
                        </td>

                        {/* Vertical & Service */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-zinc-100">
                            {getVerticalIcon(b.businessCategory)}
                            <span>{b.serviceName}</span>
                          </div>
                          <div className="text-[10px] text-zinc-400">{b.serviceCategory}</div>
                        </td>

                        {/* Provider */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-zinc-900 dark:text-zinc-100">
                            {b.providerName}
                          </div>
                          <div className="text-[10px] text-zinc-500">{b.providerTitle}</div>
                        </td>

                        {/* Date & Slot */}
                        <td className="py-3.5 px-4">
                          <div className="font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-orange-500" />
                            {b.bookingTime} ({b.durationMinutes}m)
                          </div>
                          <div className="text-[11px] text-zinc-500 font-mono">{b.bookingDate}</div>
                        </td>

                        {/* Billing & Status */}
                        <td className="py-3.5 px-4 space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                b.status === 'COMPLETED'
                                  ? 'success'
                                  : b.status === 'CONFIRMED'
                                  ? 'primary'
                                  : 'neutral'
                              }
                              size="sm"
                              dot={b.status === 'CONFIRMED'}
                            >
                              {b.status}
                            </Badge>
                            {b.reminderSent && (
                              <span
                                className="text-[10px] font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded"
                                title="18:00 WhatsApp Reminder Dispatched"
                              >
                                💬 Sent
                              </span>
                            )}
                          </div>
                          <div className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                            ₹{b.amountPaid || b.amountTotal} • {b.paymentMode}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            {b.status === 'CONFIRMED' && (
                              <button
                                onClick={() => {
                                  setCompletingBooking(b);
                                  setCompletionAmount(b.amountTotal);
                                }}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs cursor-pointer"
                              >
                                Complete Visit
                              </button>
                            )}
                            <button
                              onClick={() =>
                                setWhatsappPreview({
                                  phone: b.customerPhone,
                                  name: b.customerName,
                                  message:
                                    `Hello ${b.customerName}, confirmation for your ${b.serviceName} on ${b.bookingDate} at ${b.bookingTime} with ${b.providerName}. Ref: ${b.bookingNumber}.`,
                                })
                              }
                              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-emerald-600 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                              title="Test WhatsApp Preview"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: NEW APPOINTMENT RESERVATION DRAWER */}
      {/* ========================================================================= */}
      {activeTab === 'new' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto shadow-xl space-y-6">
          <div className="flex items-start justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-orange-600 font-bold">
                Workflow 1: Booking & Anti-Double Booking Check
              </span>
              <h2 className="text-xl font-black text-zinc-950 dark:text-zinc-50 mt-0.5">
                Reserve Appointment Slot
              </h2>
              <p className="text-xs text-zinc-500">
                Clash detection algorithm verifies provider availability before confirming.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('roster')}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {clashWarning && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{clashWarning}</span>
            </div>
          )}

          <form onSubmit={handleCreateBooking} className="space-y-4 text-xs">
            {/* Business Vertical */}
            <div>
              <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                Select Business Vertical:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'CLINIC', label: '🏥 Dental / Clinic', prov: 'Dr. Vivek Singhania', serv: 'Dental Scaling & Fluoride' },
                  { id: 'SALON', label: '💇 Salon & Spa', prov: 'Vikram Sethi', serv: 'Balayage Hair Color' },
                  { id: 'AUTO_SERVICE', label: '🚗 Auto Garage', prov: 'Amitabh Sharma', serv: 'Full Periodic Service' },
                  { id: 'PET_CARE', label: '🐾 Pet Care & Vet', prov: 'Dr. Radhika Nair', serv: 'Annual Pet Vaccination' },
                  { id: 'FITNESS', label: '🧘 Fitness Studio', prov: 'Coach Ritu Arya', serv: '1-on-1 Rehab Pilates' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setNewBooking({
                        ...newBooking,
                        businessCategory: item.id as any,
                        providerName: item.prov,
                        serviceName: item.serv,
                      });
                      checkClash(item.prov, newBooking.bookingDate, newBooking.bookingTime);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      newBooking.businessCategory === item.id
                        ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/30 text-orange-900 dark:text-orange-200 font-bold'
                        : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <div>{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Client / Patient Full Name: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Varma"
                  value={newBooking.customerName}
                  onChange={(e) => setNewBooking({ ...newBooking, customerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  WhatsApp Contact Number: *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={newBooking.customerPhone}
                  onChange={(e) => setNewBooking({ ...newBooking, customerPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Provider & Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Specialist / Provider Name:
                </label>
                <input
                  type="text"
                  value={newBooking.providerName}
                  onChange={(e) => {
                    setNewBooking({ ...newBooking, providerName: e.target.value });
                    checkClash(e.target.value, newBooking.bookingDate, newBooking.bookingTime);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Service / Procedure:
                </label>
                <input
                  type="text"
                  value={newBooking.serviceName}
                  onChange={(e) => setNewBooking({ ...newBooking, serviceName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Date & Slot Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Date:
                </label>
                <input
                  type="date"
                  value={newBooking.bookingDate}
                  onChange={(e) => {
                    setNewBooking({ ...newBooking, bookingDate: e.target.value });
                    checkClash(newBooking.providerName, e.target.value, newBooking.bookingTime);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Slot Time:
                </label>
                <select
                  value={newBooking.bookingTime}
                  onChange={(e) => {
                    setNewBooking({ ...newBooking, bookingTime: e.target.value });
                    checkClash(newBooking.providerName, newBooking.bookingDate, e.target.value);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'].map(
                    (slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Service Fee (₹):
                </label>
                <input
                  type="number"
                  value={newBooking.amountTotal}
                  onChange={(e) =>
                    setNewBooking({ ...newBooking, amountTotal: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* WhatsApp Consent */}
            <label className="flex items-center gap-2 pt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newBooking.whatsappConsent}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, whatsappConsent: e.target.checked })
                }
                className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
              />
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                Customer opted in for 18:00 Day-Before WhatsApp Reminders & Follow-Ups
              </span>
            </label>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setActiveTab('roster')}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={Boolean(clashWarning)}
                className={`px-5 py-2 rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 cursor-pointer ${
                  clashWarning
                    ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                    : 'bg-orange-600 hover:bg-orange-500 text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Validate Slot & Confirm
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 7 / 15 / 30 / 90-DAY FOLLOW-UP RECALL QUEUE */}
      {/* ========================================================================= */}
      {activeTab === 'followups' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Repeat className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="font-extrabold text-sm text-purple-950 dark:text-purple-100">
                  Workflow 3: Post-Visit Automated Follow-Up Recall Engine
                </span>
              </div>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                Patients and clients with scheduled 7, 15, 30, and 90-day retention recalls. Send 1-click WhatsApp recalls to drive repeat visits.
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] uppercase font-mono tracking-wider text-purple-500 block">
                Total Queue
              </span>
              <span className="font-mono text-2xl font-black text-purple-950 dark:text-purple-100">
                {followUpQueue.length} Clients
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Client / Contact</th>
                  <th className="py-3 px-4">Service & Provider</th>
                  <th className="py-3 px-4">Recall Interval</th>
                  <th className="py-3 px-4">Target Recall Date</th>
                  <th className="py-3 px-4">Recall Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {followUpQueue.map((item) => {
                  const isDueToday = item.followUpDate === todayStr;
                  const isOverdue = item.followUpDate && item.followUpDate < todayStr && item.followUpStatus === 'PENDING';
                  return (
                    <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-zinc-950 dark:text-zinc-50">
                          {item.customerName}
                        </div>
                        <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-1">
                          <Phone className="w-3 h-3 text-zinc-400" />
                          {item.customerPhone}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {item.serviceName}
                        </div>
                        <div className="text-[10px] text-zinc-500">
                          {item.providerName} • {item.storeName}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                        {item.followUpIntervalDays || 7} Days Post-Visit
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                          {item.followUpDate}
                          {isDueToday && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold">
                              DUE TODAY
                            </span>
                          )}
                          {isOverdue && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-bold">
                              OVERDUE
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-zinc-400 truncate max-w-[200px]">
                          {item.followUpNotes}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            item.followUpStatus === 'CONVERTED'
                              ? 'success'
                              : item.followUpStatus === 'CONTACTED'
                              ? 'warning'
                              : 'primary'
                          }
                          size="sm"
                        >
                          {item.followUpStatus}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() =>
                              setWhatsappPreview({
                                phone: item.customerPhone,
                                name: item.customerName,
                                message:
                                  `Hi ${item.customerName}, this is a gentle follow-up from ${item.storeName} regarding your recent ${item.serviceName} with ${item.providerName}. How is your recovery and progress? Would you like to schedule your routine review? Reply *BOOK* to reserve.`,
                              })
                            }
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1 cursor-pointer"
                          >
                            <Send className="w-3 h-3" />
                            Send Recall
                          </button>

                          {item.followUpStatus === 'PENDING' && (
                            <button
                              onClick={() => {
                                item.followUpStatus = 'CONVERTED';
                                setBookings([...bookings]);
                                toast.success(
                                  'Customer Converted',
                                  `${item.customerName} re-engaged and booked next review session.`
                                );
                              }}
                              className="p-1 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 cursor-pointer"
                              title="Mark Re-booked / Converted"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: 21:00 EOD DOCTOR & MERCHANT REVENUE DIGEST */}
      {/* ========================================================================= */}
      {activeTab === 'eod' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Summary Metrics */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 space-y-5 shadow-xs">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-orange-600 font-bold">
                Workflow 4: Daily 21:00 EOD Business Summary
              </span>
              <h2 className="text-xl font-black text-zinc-950 dark:text-zinc-50 mt-0.5">
                End-of-Day Operations & Collections
              </h2>
              <p className="text-xs text-zinc-500">
                Automated evening reconciliation delivered to doctors and store owners.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 space-y-1">
                <span className="text-[10px] text-zinc-400 font-mono">Completed Visits Today</span>
                <p className="text-2xl font-mono font-black text-zinc-950 dark:text-zinc-50">
                  {bookings.filter((b) => b.status === 'COMPLETED').length}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 space-y-1">
                <span className="text-[10px] text-zinc-400 font-mono">Gross Collections</span>
                <p className="text-2xl font-mono font-black text-emerald-600 dark:text-emerald-400">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* Payment Mode Split */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
                <span>Collections Breakdown by Mode</span>
                <span className="text-[10px] font-mono text-zinc-400">100% Reconciled</span>
              </h3>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <QrCode className="w-3.5 h-3.5 text-blue-500" />
                    UPI / QR Code:
                  </span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">
                    ₹
                    {bookings
                      .filter((b) => b.status === 'COMPLETED' && b.paymentMode === 'UPI')
                      .reduce((acc, curr) => acc + (curr.amountPaid || curr.amountTotal), 0)
                      .toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                    Cash Counter:
                  </span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">
                    ₹
                    {bookings
                      .filter((b) => b.status === 'COMPLETED' && b.paymentMode === 'CASH')
                      .reduce((acc, curr) => acc + (curr.amountPaid || curr.amountTotal), 0)
                      .toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-purple-500" />
                    Card / POS Terminal:
                  </span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">
                    ₹
                    {bookings
                      .filter((b) => b.status === 'COMPLETED' && b.paymentMode === 'CARD')
                      .reduce((acc, curr) => acc + (curr.amountPaid || curr.amountTotal), 0)
                      .toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: WhatsApp Message Digest Preview */}
          <div className="bg-zinc-950 text-white rounded-3xl p-6 space-y-4 border border-zinc-800 shadow-xl font-mono text-xs">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                Live 21:00 WhatsApp Digest String
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `*DAILY EOD REPORT (${todayStr})*\nTotal Completed: ${
                      bookings.filter((b) => b.status === 'COMPLETED').length
                    }\nTotal Revenue: ₹${totalRevenue.toLocaleString('en-IN')}`
                  );
                  toast.success('Copied', 'EOD report copied to clipboard.');
                }}
                className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold cursor-pointer"
              >
                Copy Text
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 whitespace-pre-line text-zinc-300 text-[11px] leading-relaxed">
              {`📊 *DAILY END-OF-DAY (EOD) BUSINESS REPORT*
📅 *Date:* ${todayStr} | ⏰ *Generated at:* 21:00 IST
---------------------------------------

👥 *PATIENT / CLIENT APPOINTMENTS SUMMARY:*
• Total Scheduled: *${bookings.length}*
• Completed Visits: *${bookings.filter((b) => b.status === 'COMPLETED').length}*
• Active Remaining: *${bookings.filter((b) => b.status === 'CONFIRMED').length}*

💰 *FINANCIAL & BILLING SUMMARY:*
• Total Revenue Collected: *₹${totalRevenue.toLocaleString('en-IN')}*
  - 📲 UPI: *₹${bookings.filter((b) => b.status === 'COMPLETED' && b.paymentMode === 'UPI').reduce((acc, curr) => acc + (curr.amountPaid || curr.amountTotal), 0).toLocaleString('en-IN')}*
  - 💵 Cash: *₹${bookings.filter((b) => b.status === 'COMPLETED' && b.paymentMode === 'CASH').reduce((acc, curr) => acc + (curr.amountPaid || curr.amountTotal), 0).toLocaleString('en-IN')}*
  - 💳 Card: *₹${bookings.filter((b) => b.status === 'COMPLETED' && b.paymentMode === 'CARD').reduce((acc, curr) => acc + (curr.amountPaid || curr.amountTotal), 0).toLocaleString('en-IN')}*

🔁 *RETENTION & FOLLOW-UPS:*
• Follow-ups scheduled: *${followUpQueue.length}*
• 18:00 WhatsApp Reminders for tomorrow: *Dispatched*

_Automated by Explore Hyperlocal Multi-Business Commerce OS_`}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: COMPLETE VISIT & RECORD FOLLOW-UP (WORKFLOW 3) */}
      {/* ========================================================================= */}
      {completingBooking && (
        <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold">
                  Workflow 3: Post-Visit Completion
                </span>
                <h2 className="text-lg font-black text-zinc-950 dark:text-zinc-50 mt-0.5">
                  Complete Session: {completingBooking.customerName}
                </h2>
                <p className="text-xs text-zinc-500">
                  Record consultation notes, payment mode, and automated follow-up interval.
                </p>
              </div>
              <button
                onClick={() => setCompletingBooking(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Consultation / Service Notes */}
              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Clinical / Service Notes & Observations:
                </label>
                <textarea
                  rows={2}
                  value={completionNotes}
                  onChange={(e) => setCompletionNotes(e.target.value)}
                  placeholder="e.g. Scaling complete. Recommended soft bristles and salt water gargle."
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Payment Details */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Amount Paid (₹):
                  </label>
                  <input
                    type="number"
                    value={completionAmount || completingBooking.amountTotal}
                    onChange={(e) => setCompletionAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 font-mono font-bold text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Payment Mode:
                  </label>
                  <select
                    value={completionMode}
                    onChange={(e) => setCompletionMode(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 font-bold text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="UPI">📲 UPI / QR Code</option>
                    <option value="CASH">💵 Cash Counter</option>
                    <option value="CARD">💳 POS Card Swipe</option>
                  </select>
                </div>
              </div>

              {/* Automated Follow-Up Interval */}
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block">
                  Automated Follow-Up Interval (Recall Cohort):
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { days: 7, label: '7 Days' },
                    { days: 15, label: '15 Days' },
                    { days: 30, label: '30 Days' },
                    { days: 90, label: '90 Days' },
                  ].map((cohort) => (
                    <button
                      key={cohort.days}
                      type="button"
                      onClick={() => setFollowUpInterval(cohort.days)}
                      className={`py-2 rounded-xl border text-center font-mono font-bold transition-all cursor-pointer ${
                        followUpInterval === cohort.days
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400'
                          : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {cohort.label}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-zinc-500 block mb-1">
                    Follow-Up Notes / Purpose:
                  </label>
                  <input
                    type="text"
                    value={followUpNotes}
                    onChange={(e) => setFollowUpNotes(e.target.value)}
                    placeholder="e.g. Stitch removal / hair toner / brake inspection"
                    className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <button
                onClick={() => setCompletingBooking(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteVisit}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                Record & Schedule Recall
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: WHATSAPP MESSAGE PREVIEW */}
      {/* ========================================================================= */}
      {whatsappPreview && (
        <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold">
                  WhatsApp Gateway Simulator
                </span>
                <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
                  To: {whatsappPreview.name} ({whatsappPreview.phone})
                </h3>
              </div>
              <button
                onClick={() => setWhatsappPreview(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100 text-xs font-sans leading-relaxed whitespace-pre-line shadow-inner">
              {whatsappPreview.message}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  toast.success(
                    'Simulated WhatsApp Delivered',
                    `Message dispatched to ${whatsappPreview.phone}.`
                  );
                  setWhatsappPreview(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Simulate Direct Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
