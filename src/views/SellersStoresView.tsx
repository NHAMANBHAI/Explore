'use client';

import React, { useState } from 'react';
import {
  Store as StoreIcon,
  Search,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Sliders,
  CalendarCheck2,
  MessageSquare,
  Repeat,
  FileText,
  X,
  Sparkles,
  Check,
} from 'lucide-react';
import { mockStores } from '../data/mockSellers';
import { Store } from '../types/seller';
import { useToast } from '../context/ToastContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

// Enhanced initial store states with multi-business vertical features
const initialStoresWithModules: Store[] = mockStores.map((s, idx) => {
  if (idx === 0) {
    return {
      ...s,
      businessCategory: 'RETAIL',
      enableAppointments: false,
      slotDurationMinutes: 30,
      autoWhatsAppReminders: false,
      autoFollowUps: false,
      autoEODReport: true,
      providerLabel: 'Store Manager',
      serviceLabel: 'Express Order Delivery',
    };
  } else if (idx === 1) {
    return {
      ...s,
      businessCategory: 'SALON',
      enableAppointments: true,
      slotDurationMinutes: 60,
      autoWhatsAppReminders: true,
      autoFollowUps: true,
      autoEODReport: true,
      providerLabel: 'Master Stylist',
      serviceLabel: 'Organic Hair & Skin Spa',
    };
  } else {
    return {
      ...s,
      businessCategory: 'CLINIC',
      enableAppointments: true,
      slotDurationMinutes: 30,
      autoWhatsAppReminders: true,
      autoFollowUps: true,
      autoEODReport: true,
      providerLabel: 'Doctor / Specialist',
      serviceLabel: 'OPD Consultation / Health Check',
    };
  }
});

export const SellersStoresView: React.FC = () => {
  const { toast } = useToast();
  const [stores, setStores] = useState<Store[]>(initialStoresWithModules);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [editingStore, setEditingStore] = useState<Store | null>(null);

  const filtered = stores.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.sellerName.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === 'ALL' || (s.businessCategory || 'RETAIL') === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleStoreStatus = (id: string) => {
    setStores((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const next = s.visibilityStatus === 'active' ? 'inactive' : 'active';
          toast.info(
            next === 'active' ? 'Store Approved & Live' : 'Store Suspended',
            `${s.name} visibility updated.`
          );
          return { ...s, visibilityStatus: next as any };
        }
        return s;
      })
    );
  };

  const saveStoreModules = (updated: Store) => {
    setStores((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    toast.success(
      'Module Feature Access Updated',
      `Automation & appointment controls saved for ${updated.name}.`
    );
    setEditingStore(null);
  };

  const getCategoryBadge = (cat?: string) => {
    switch (cat) {
      case 'CLINIC':
        return { label: '🏥 Clinic & OPD', variant: 'primary' as const };
      case 'SALON':
        return { label: '💇 Salon & Spa', variant: 'warning' as const };
      case 'AUTO_SERVICE':
        return { label: '🚗 Auto Garage', variant: 'neutral' as const };
      case 'PET_CARE':
        return { label: '🐾 Pet Care & Vet', variant: 'success' as const };
      case 'FITNESS':
        return { label: '🧘 Fitness Studio', variant: 'primary' as const };
      default:
        return { label: '🛒 Retail Store', variant: 'neutral' as const };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 flex items-center gap-2.5">
            <StoreIcon className="w-6 h-6 text-orange-600" />
            Sellers, Merchants & Multi-Business Access
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Super Admin access governance: assign Appointments, WhatsApp Reminders, 7-30d Follow-Ups & EOD Reports per vendor.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Strip */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'ALL', label: 'All Businesses' },
            { id: 'CLINIC', label: '🏥 Clinics' },
            { id: 'SALON', label: '💇 Salons' },
            { id: 'AUTO_SERVICE', label: '🚗 Auto' },
            { id: 'PET_CARE', label: '🐾 Pet Care' },
            { id: 'RETAIL', label: '🛒 Retail' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                categoryFilter === tab.id
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
          <input
            type="text"
            placeholder="Search stores by business name, owner name, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-zinc-100"
          />
        </div>
      </div>

      {/* Stores Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((store) => {
          const catMeta = getCategoryBadge(store.businessCategory);
          return (
            <div
              key={store.id}
              className="bg-white dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
            >
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={store.logo}
                    alt={store.name}
                    className="w-12 h-12 rounded-xl object-cover border border-zinc-200/80 dark:border-zinc-800 shadow-2xs"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-50 truncate">
                        {store.name}
                      </h3>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    </div>
                    <p className="text-[11px] text-zinc-500 truncate">Owner: {store.sellerName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={catMeta.variant} size="sm">
                        {catMeta.label}
                      </Badge>
                      <span className="text-[10px] text-zinc-400">{store.city}</span>
                    </div>
                  </div>
                </div>

                {/* Assigned Modules Strip */}
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200/60 dark:border-zinc-800/60 mb-3 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium">
                      <CalendarCheck2 className="w-3.5 h-3.5 text-orange-500" />
                      Slot Bookings:
                    </span>
                    <span
                      className={`font-semibold ${
                        store.enableAppointments ? 'text-emerald-600' : 'text-zinc-400'
                      }`}
                    >
                      {store.enableAppointments ? `Active (${store.slotDurationMinutes || 30}m slots)` : 'Disabled'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                      18:00 WhatsApp Reminders:
                    </span>
                    <span
                      className={`font-semibold ${
                        store.autoWhatsAppReminders ? 'text-emerald-600' : 'text-zinc-400'
                      }`}
                    >
                      {store.autoWhatsAppReminders ? 'Automated' : 'Off'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium">
                      <Repeat className="w-3.5 h-3.5 text-purple-500" />
                      7/15/30d Recalls:
                    </span>
                    <span
                      className={`font-semibold ${
                        store.autoFollowUps ? 'text-emerald-600' : 'text-zinc-400'
                      }`}
                    >
                      {store.autoFollowUps ? 'Active' : 'Off'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/40 mb-3 text-xs">
                  <div>
                    <p className="text-[10px] text-zinc-400">Total Sales</p>
                    <p className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                      ₹{store.totalSales.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-400">Specialist Label</p>
                    <p className="font-semibold text-zinc-700 dark:text-zinc-300 truncate">
                      {store.providerLabel || 'Specialist'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <button
                  onClick={() => setEditingStore({ ...store })}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 hover:opacity-90 transition-all cursor-pointer"
                >
                  <Sliders className="w-3 h-3 text-orange-400 dark:text-orange-600" />
                  Feature Access
                </button>

                <button
                  onClick={() => toggleStoreStatus(store.id)}
                  className={`text-xs font-semibold cursor-pointer ${
                    store.visibilityStatus === 'active'
                      ? 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                      : 'text-emerald-600 hover:text-emerald-700'
                  }`}
                >
                  {store.visibilityStatus === 'active' ? 'Suspend' : 'Activate'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Access & Module Assignment Modal */}
      {editingStore && (
        <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold">
                  Super Admin Module Governance
                </span>
                <h2 className="text-lg font-black text-zinc-950 dark:text-zinc-50 mt-0.5">
                  Configure Modules for {editingStore.name}
                </h2>
                <p className="text-xs text-zinc-500">
                  Assign business vertical and enable/disable booking and recall automation.
                </p>
              </div>
              <button
                onClick={() => setEditingStore(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Vertical Selector */}
              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1.5">
                  Business Vertical Category:
                </label>
                <select
                  value={editingStore.businessCategory || 'RETAIL'}
                  onChange={(e) =>
                    setEditingStore({
                      ...editingStore,
                      businessCategory: e.target.value as any,
                      providerLabel:
                        e.target.value === 'CLINIC'
                          ? 'Doctor / Specialist'
                          : e.target.value === 'SALON'
                          ? 'Stylist / Therapist'
                          : e.target.value === 'AUTO_SERVICE'
                          ? 'Technician / Mechanic'
                          : e.target.value === 'PET_CARE'
                          ? 'Veterinarian'
                          : e.target.value === 'FITNESS'
                          ? 'Trainer / Coach'
                          : 'Store Specialist',
                      serviceLabel:
                        e.target.value === 'CLINIC'
                          ? 'Consultation / OPD'
                          : e.target.value === 'SALON'
                          ? 'Hair / Skin Spa'
                          : e.target.value === 'AUTO_SERVICE'
                          ? 'Vehicle Service'
                          : e.target.value === 'PET_CARE'
                          ? 'Pet Checkup'
                          : e.target.value === 'FITNESS'
                          ? 'Workout Session'
                          : 'Product Purchase',
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-semibold outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="RETAIL">🛒 Retail E-Commerce Only</option>
                  <option value="CLINIC">🏥 Dental & Medical Clinic</option>
                  <option value="SALON">💇 Salon, Spa & Beauty Wellness</option>
                  <option value="AUTO_SERVICE">🚗 Auto Garage & Vehicle Service</option>
                  <option value="PET_CARE">🐾 Pet Care & Veterinary Hospital</option>
                  <option value="FITNESS">🧘 Fitness, Yoga & Personal Training</option>
                  <option value="GENERAL_SERVICE">⚡ General Multi-Service</option>
                </select>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <label className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 cursor-pointer">
                  <div className="space-y-0.5">
                    <p className="font-bold text-zinc-900 dark:text-zinc-100">
                      Enable Slot Booking & Appointments
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      Enables real-time slot calendar and anti-double-booking clash prevention.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={Boolean(editingStore.enableAppointments)}
                    onChange={(e) =>
                      setEditingStore({ ...editingStore, enableAppointments: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 cursor-pointer">
                  <div className="space-y-0.5">
                    <p className="font-bold text-zinc-900 dark:text-zinc-100">
                      18:00 Automated WhatsApp Reminders
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      Sends day-before appointment reminders with location & specialist details.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={Boolean(editingStore.autoWhatsAppReminders)}
                    onChange={(e) =>
                      setEditingStore({
                        ...editingStore,
                        autoWhatsAppReminders: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 cursor-pointer">
                  <div className="space-y-0.5">
                    <p className="font-bold text-zinc-900 dark:text-zinc-100">
                      7 / 15 / 30 / 90-Day Follow-Up Recalls
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      Automatically schedules post-service recall alerts for customer retention.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={Boolean(editingStore.autoFollowUps)}
                    onChange={(e) =>
                      setEditingStore({ ...editingStore, autoFollowUps: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 cursor-pointer">
                  <div className="space-y-0.5">
                    <p className="font-bold text-zinc-900 dark:text-zinc-100">
                      21:00 Daily EOD Revenue & Operations Report
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      Sends daily digest of visits, cash/UPI revenue & follow-ups to store owner.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={Boolean(editingStore.autoEODReport)}
                    onChange={(e) =>
                      setEditingStore({ ...editingStore, autoEODReport: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                  />
                </label>
              </div>

              {/* Slot Duration & Custom Labels */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Slot Duration:
                  </label>
                  <select
                    value={editingStore.slotDurationMinutes || 30}
                    onChange={(e) =>
                      setEditingStore({
                        ...editingStore,
                        slotDurationMinutes: Number(e.target.value),
                      })
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 font-semibold"
                  >
                    <option value={15}>15 Minutes</option>
                    <option value={30}>30 Minutes</option>
                    <option value={45}>45 Minutes</option>
                    <option value={60}>60 Minutes</option>
                    <option value={90}>90 Minutes</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Specialist Title:
                  </label>
                  <input
                    type="text"
                    value={editingStore.providerLabel || ''}
                    onChange={(e) =>
                      setEditingStore({ ...editingStore, providerLabel: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs"
                    placeholder="e.g. Doctor, Stylist"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <button
                onClick={() => setEditingStore(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => saveStoreModules(editingStore)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                Save Module Access
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
