'use client';

import React, { useState } from 'react';
import { Bike, Navigation, DollarSign, Star, CheckCircle, Search, ShieldCheck, Phone, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface RiderItem {
  id: string;
  name: string;
  phone: string;
  vehicle: 'Bike' | 'EV Scooter' | 'Cycle';
  plateNumber: string;
  status: 'ONLINE' | 'BUSY' | 'OFFLINE';
  rating: number;
  totalTrips: number;
  cashInHand: number;
  currentZone: string;
}

const initialRiders: RiderItem[] = [
  {
    id: 'rd-101',
    name: 'Ramesh Kumar',
    phone: '+91 98250 11223',
    vehicle: 'EV Scooter',
    plateNumber: 'GJ-01-EV-4921',
    status: 'ONLINE',
    rating: 4.9,
    totalTrips: 412,
    cashInHand: 2450.00,
    currentZone: 'Downtown SG Highway',
  },
  {
    id: 'rd-102',
    name: 'Suresh Patel',
    phone: '+91 98790 33445',
    vehicle: 'Bike',
    plateNumber: 'GJ-01-BK-9120',
    status: 'BUSY',
    rating: 4.8,
    totalTrips: 628,
    cashInHand: 4890.00,
    currentZone: 'Satellite Ring',
  },
  {
    id: 'rd-103',
    name: 'Vikramaditya Roy',
    phone: '+91 97120 55667',
    vehicle: 'Bike',
    plateNumber: 'GJ-01-AB-1842',
    status: 'ONLINE',
    rating: 5.0,
    totalTrips: 189,
    cashInHand: 850.00,
    currentZone: 'Old City Commerce Ring',
  },
  {
    id: 'rd-104',
    name: 'Dinesh Yadav',
    phone: '+91 99040 77889',
    vehicle: 'EV Scooter',
    plateNumber: 'GJ-01-EV-8841',
    status: 'OFFLINE',
    rating: 4.7,
    totalTrips: 310,
    cashInHand: 0.00,
    currentZone: 'GIFT City Corridor',
  },
];

export const DeliveryFleetView: React.FC = () => {
  const { toast } = useToast();
  const [riders, setRiders] = useState(initialRiders);
  const [search, setSearch] = useState('');
  const [selectedRider, setSelectedRider] = useState<RiderItem | null>(null);

  const filtered = riders.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search) ||
      r.plateNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handleCollectCash = (riderId: string) => {
    setRiders((prev) =>
      prev.map((r) => {
        if (r.id === riderId) {
          toast.success('COD Cash Deposited', `Received ₹${r.cashInHand.toFixed(2)} from ${r.name}`);
          return { ...r, cashInHand: 0 };
        }
        return r;
      })
    );
    setSelectedRider(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Bike className="w-6 h-6 text-blue-600" />
            Delivery Fleet & Riders Roster
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time GPS status, daily completed trips, Cash-on-Delivery collections, and rider payouts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            {riders.filter((r) => r.status === 'ONLINE').length} Riders Online Now
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Search riders by name, mobile, vehicle plate..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Roster Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Rider</th>
                <th className="py-3 px-4">Vehicle & Plate</th>
                <th className="py-3 px-4">Current Zone</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Total Trips</th>
                <th className="py-3 px-4">COD Cash in Hand</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((rider) => (
                <tr key={rider.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900 dark:text-slate-100">{rider.name}</p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3" /> {rider.phone}
                    </p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block">{rider.vehicle}</span>
                    <span className="font-mono text-[10px] text-slate-400">{rider.plateNumber}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-blue-500" /> {rider.currentZone}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        rider.status === 'ONLINE'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : rider.status === 'BUSY'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {rider.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                    <span className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {rider.rating}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                    {rider.totalTrips} orders
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900 dark:text-slate-100">
                    {rider.cashInHand > 0 ? (
                      <span className="text-rose-600 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-md">
                        ₹{rider.cashInHand.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-slate-400">₹0.00</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {rider.cashInHand > 0 ? (
                      <button
                        onClick={() => handleCollectCash(rider.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white dark:bg-emerald-950/60 dark:text-emerald-300 font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        Deposit Cash
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400">Settled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
