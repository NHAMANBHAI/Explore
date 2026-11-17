import React, { useState } from 'react';
import { Truck, Bike, MapPin, Clock, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

export const DispatchPage: React.FC = () => {
  const [selectedOrderToAssign, setSelectedOrderToAssign] = useState<string | null>(null);

  const zones = [
    { name: 'Noida Central (Zone 1)', activeRiders: 14, busyRiders: 9, ordersInFlight: 12, health: 'optimal' },
    { name: 'Downtown Express Hub', activeRiders: 8, busyRiders: 7, ordersInFlight: 9, health: 'high_demand' },
    { name: 'West Sector Suburbs', activeRiders: 5, busyRiders: 2, ordersInFlight: 3, health: 'optimal' },
  ];

  const pendingAssignments = [
    {
      id: 'ord-11195',
      orderNumber: '4847',
      store: "Amit's Grocery Hub",
      customer: 'Demo Customer',
      zone: 'Noida Central (Zone 1)',
      elapsed: '14 mins',
      rush: false
    },
    {
      id: 'ord-11196',
      orderNumber: '4848',
      store: 'Organic Harvest Market',
      customer: 'John Doe',
      zone: 'Downtown Express Hub',
      elapsed: '6 mins',
      rush: true
    }
  ];

  const availableRiders = [
    { id: 'r-1', name: 'Rajesh Kumar', phone: '9810012345', distance: '0.8 km away', vehicle: 'EV Bike' },
    { id: 'r-2', name: 'Vikas Sharma', phone: '9820054321', distance: '1.2 km away', vehicle: 'Motorcycle' },
    { id: 'r-3', name: 'Manoj Tiwari', phone: '9830098765', distance: '2.1 km away', vehicle: 'EV Scooter' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Dispatch Operations Console
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time rider fleet allocation, delivery zone capacity, and manual order dispatching.
          </p>
        </div>
      </div>

      {/* Zone Capacity & Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {zones.map((z, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                {z.name}
              </span>
              <Badge variant={z.health === 'optimal' ? 'success' : 'warning'} size="sm">
                {z.health === 'optimal' ? 'Optimal' : 'High Demand'}
              </Badge>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 block">{z.activeRiders}</span>
                <span className="text-[10px] text-slate-400">Total Riders</span>
              </div>
              <div>
                <span className="text-lg font-bold text-amber-600 dark:text-amber-400 block">{z.busyRiders}</span>
                <span className="text-[10px] text-slate-400">On Delivery</span>
              </div>
              <div>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400 block">{z.ordersInFlight}</span>
                <span className="text-[10px] text-slate-400">Orders Active</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Unassigned Orders Queue */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Orders Awaiting Rider Assignment</h3>
          </div>
          <Badge variant="warning">{pendingAssignments.length} Pending</Badge>
        </div>

        <div className="space-y-3">
          {pendingAssignments.map(ord => (
            <div
              key={ord.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold font-mono text-blue-600 dark:text-blue-400">
                    Order #{ord.orderNumber}
                  </span>
                  {ord.rush && <Badge variant="danger" size="sm">RUSH PRIORITY</Badge>}
                  <span className="text-slate-400 font-mono text-[11px]">Waiting: {ord.elapsed}</span>
                </div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Store: {ord.store} → Deliver to: {ord.customer}
                </p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {ord.zone}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrderToAssign(ord.orderNumber)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors shrink-0"
              >
                <UserCheck className="w-4 h-4" />
                Assign Available Rider
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Rider Assignment Modal */}
      <Modal
        isOpen={!!selectedOrderToAssign}
        onClose={() => setSelectedOrderToAssign(null)}
        title={`Assign Rider for Order #${selectedOrderToAssign}`}
        subtitle="Select an available rider located near the merchant store"
      >
        <div className="space-y-3">
          {availableRiders.map(rider => (
            <div
              key={rider.id}
              onClick={() => {
                alert(`Assigned ${rider.name} to Order #${selectedOrderToAssign}`);
                setSelectedOrderToAssign(null);
              }}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-blue-950/30 cursor-pointer flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <Bike className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">{rider.name}</h5>
                  <p className="text-[11px] text-slate-400">{rider.vehicle} • {rider.phone}</p>
                </div>
              </div>
              <div className="text-right text-xs">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">{rider.distance}</span>
                <span className="text-[10px] text-slate-400">Ready for pickup</span>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};
