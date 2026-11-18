'use client';

import React, { useState } from 'react';
import { MapPin, Plus, Navigation, ShieldCheck, DollarSign, Clock, Check, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface DeliveryZoneItem {
  id: string;
  name: string;
  code: string;
  baseFee: number;
  perKmFee: number;
  minOrderValue: number;
  maxRadiusKm: number;
  avgDeliveryMinutes: number;
  activeRidersCount: number;
  totalOrdersToday: number;
  isActive: boolean;
}

const initialZones: DeliveryZoneItem[] = [
  {
    id: 'zone-1',
    name: 'Downtown & SG Highway Express Hub',
    code: 'ZONE-AMD-01',
    baseFee: 30,
    perKmFee: 8,
    minOrderValue: 199,
    maxRadiusKm: 12.5,
    avgDeliveryMinutes: 22,
    activeRidersCount: 14,
    totalOrdersToday: 184,
    isActive: true,
  },
  {
    id: 'zone-2',
    name: 'Old City & Heritage Commerce Ring',
    code: 'ZONE-AMD-02',
    baseFee: 35,
    perKmFee: 10,
    minOrderValue: 149,
    maxRadiusKm: 8.0,
    avgDeliveryMinutes: 18,
    activeRidersCount: 9,
    totalOrdersToday: 96,
    isActive: true,
  },
  {
    id: 'zone-3',
    name: 'Satellite & Prahlad Nagar High Street',
    code: 'ZONE-AMD-03',
    baseFee: 25,
    perKmFee: 7,
    minOrderValue: 249,
    maxRadiusKm: 15.0,
    avgDeliveryMinutes: 28,
    activeRidersCount: 18,
    totalOrdersToday: 242,
    isActive: true,
  },
  {
    id: 'zone-4',
    name: 'GIFT City & Gandhinagar Fast Corridor',
    code: 'ZONE-GNR-01',
    baseFee: 50,
    perKmFee: 12,
    minOrderValue: 399,
    maxRadiusKm: 25.0,
    avgDeliveryMinutes: 38,
    activeRidersCount: 6,
    totalOrdersToday: 48,
    isActive: false,
  },
];

export const ZonesManagementView: React.FC = () => {
  const { toast } = useToast();
  const [zones, setZones] = useState(initialZones);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newZoneName, setNewZoneName] = useState('');
  const [newZoneCode, setNewZoneCode] = useState('');

  const toggleZone = (id: string) => {
    setZones((prev) =>
      prev.map((z) => {
        if (z.id === id) {
          const next = !z.isActive;
          toast.info(next ? 'Zone Activated' : 'Zone Paused', `${z.name} dispatch rules updated.`);
          return { ...z, isActive: next };
        }
        return z;
      })
    );
  };

  const handleCreateZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newZoneName || !newZoneCode) return;
    const newZone: DeliveryZoneItem = {
      id: `zone-${Date.now()}`,
      name: newZoneName,
      code: newZoneCode.toUpperCase(),
      baseFee: 30,
      perKmFee: 8,
      minOrderValue: 199,
      maxRadiusKm: 10,
      avgDeliveryMinutes: 25,
      activeRidersCount: 0,
      totalOrdersToday: 0,
      isActive: true,
    };
    setZones([newZone, ...zones]);
    toast.success('Delivery Zone Created', `${newZone.name} polygon saved.`);
    setIsModalOpen(false);
    setNewZoneName('');
    setNewZoneCode('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <MapPin className="w-6 h-6 text-emerald-600" />
            Delivery Zones & Geofencing
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure polygon geo-boundaries, rate calculation cards, and dispatch rules.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Delivery Zone
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {zones.map((zone) => (
          <div
            key={zone.id}
            className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 transition-all shadow-xs ${
              zone.isActive
                ? 'border-slate-200 dark:border-slate-800'
                : 'border-slate-200/50 dark:border-slate-800/50 opacity-70'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-bold text-slate-600 dark:text-slate-300">
                  {zone.code}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">{zone.name}</h3>
              </div>
              <button
                onClick={() => toggleZone(zone.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  zone.isActive
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800'
                }`}
              >
                {zone.isActive ? 'Active' : 'Disabled'}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 mb-4 text-xs">
              <div>
                <p className="text-[10px] text-slate-400">Base Delivery</p>
                <p className="font-extrabold text-slate-900 dark:text-slate-100">₹{zone.baseFee}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400">Per Km Charge</p>
                <p className="font-extrabold text-slate-900 dark:text-slate-100">+₹{zone.perKmFee}/km</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400">Min Order</p>
                <p className="font-extrabold text-slate-900 dark:text-slate-100">₹{zone.minOrderValue}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-blue-500" /> Max Radius: {zone.maxRadiusKm} km
              </span>
              <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-amber-500" /> Avg: {zone.avgDeliveryMinutes} mins
              </span>
              <span className="font-bold text-emerald-600">{zone.activeRidersCount} Riders Active</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Zone */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form onSubmit={handleCreateZone} className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Add Delivery Zone</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Zone Name</label>
              <input
                type="text"
                placeholder="e.g. Navrangpura & Ashram Road Hub"
                value={newZoneName}
                onChange={(e) => setNewZoneName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Zone Code (Unique)</label>
              <input
                type="text"
                placeholder="e.g. ZONE-AMD-05"
                value={newZoneCode}
                onChange={(e) => setNewZoneCode(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs uppercase outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm cursor-pointer"
              >
                Save Zone
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
