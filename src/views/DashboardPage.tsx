import React from 'react';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import {
  TrendingUp,
  DollarSign,
  Users,
  ShoppingBag,
  Store,
  Bike,
  AlertCircle,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { mockOrders } from '../data/mockOrders';

interface DashboardPageProps {
  onNavigate: (route: string) => void;
  onSelectCustomer: (customerId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, onSelectCustomer }) => {
  return (
    <div className="space-y-6">
      {/* Header Greeting & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            Operations Executive Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time telemetry across multi-vendor stores, customer checkouts, fleet riders, and live dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dispatch')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Bike className="w-4 h-4" />
            Live Dispatch Console
          </button>
          <button
            onClick={() => onNavigate('guide')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 rounded-xl transition-colors shadow-2xs"
          >
            How to Use
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Gross Sales Today"
          value="₹84,920.00"
          subtitle="Across 38 active stores"
          icon={TrendingUp}
          trend={{ value: '14.2% vs yesterday', isPositive: true }}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-950/40"
        />
        <StatCard
          title="Platform Commission"
          value="₹12,738.00"
          subtitle="Net platform revenue (15% avg)"
          icon={DollarSign}
          trend={{ value: '8.5% vs yesterday', isPositive: true }}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/40"
        />
        <StatCard
          title="Active Customers"
          value="739"
          subtitle="38 joined this week"
          icon={Users}
          trend={{ value: '22% monthly growth', isPositive: true }}
          iconColor="text-purple-600 dark:text-purple-400"
          iconBg="bg-purple-50 dark:bg-purple-950/40"
        />
        <StatCard
          title="Live Orders Active"
          value="24"
          subtitle="12 pending store acceptance"
          icon={ShoppingBag}
          iconColor="text-amber-600 dark:text-amber-400"
          iconBg="bg-amber-50 dark:bg-amber-950/40"
        />
      </div>

      {/* Order Status Funnel Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Live Order Fulfillment Funnel</h3>
            <p className="text-xs text-slate-500">Real-time status flow of today's 148 orders</p>
          </div>
          <button
            onClick={() => onNavigate('orders')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            View All Orders <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-xl text-center">
            <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold block uppercase">1. Awaiting Store</span>
            <span className="text-2xl font-black text-amber-900 dark:text-amber-200 mt-1 block">5</span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400">10-min countdown timer</span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 rounded-xl text-center">
            <span className="text-xs text-blue-700 dark:text-blue-400 font-semibold block uppercase">2. Preparing</span>
            <span className="text-2xl font-black text-blue-900 dark:text-blue-200 mt-1 block">9</span>
            <span className="text-[10px] text-blue-600 dark:text-blue-400">Store kitchens & packing</span>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 rounded-xl text-center">
            <span className="text-xs text-purple-700 dark:text-purple-400 font-semibold block uppercase">3. Ready for Pickup</span>
            <span className="text-2xl font-black text-purple-900 dark:text-purple-200 mt-1 block">4</span>
            <span className="text-[10px] text-purple-600 dark:text-purple-400">Awaiting rider arrival</span>
          </div>
          <div className="p-3 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900/50 rounded-xl text-center">
            <span className="text-xs text-cyan-700 dark:text-cyan-400 font-semibold block uppercase">4. Out for Delivery</span>
            <span className="text-2xl font-black text-cyan-900 dark:text-cyan-200 mt-1 block">6</span>
            <span className="text-[10px] text-cyan-600 dark:text-cyan-400">Live GPS tracking</span>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-center col-span-2 sm:col-span-1">
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold block uppercase">5. Delivered</span>
            <span className="text-2xl font-black text-emerald-900 dark:text-emerald-200 mt-1 block">124</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Avg ETA: 24 mins</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Urgent Action Items & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgent Action Items */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Operational Alerts</h3>
            </div>
            <Badge variant="danger" size="sm">3 Items Requiring Attention</Badge>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <span className="font-bold text-amber-900 dark:text-amber-200 block">
                  Store Acceptance Window Expired: Order #4847
                </span>
                <p className="text-amber-700 dark:text-amber-300 mt-0.5">
                  Store "Amit's Grocery Hub" failed to acknowledge order within 10 minutes. Needs manual reassignment.
                </p>
                <button
                  onClick={() => onNavigate('dispatch')}
                  className="mt-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline block"
                >
                  Reassign in Dispatch Console →
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 flex items-start gap-3">
              <Store className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <span className="font-bold text-purple-900 dark:text-purple-200 block">
                  Pending Merchant Verification: 2 Stores
                </span>
                <p className="text-purple-700 dark:text-purple-300 mt-0.5">
                  "Artisan Bakeries" and "Downtown Organic Goods" uploaded business FSSAI licenses awaiting review.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-start gap-3">
              <Users className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <span className="font-bold text-blue-900 dark:text-blue-200 block">
                  Manual Wallet Deposit Slips: 1 Pending
                </span>
                <p className="text-blue-700 dark:text-blue-300 mt-0.5">
                  Customer "Demo Customer" submitted ₹500 bank receipt for wallet verification.
                </p>
                <button
                  onClick={() => {
                    onSelectCustomer('901');
                    onNavigate('customer_detail');
                  }}
                  className="mt-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline block"
                >
                  Review Customer Wallet →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Orders Queue Preview */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Live Orders Telemetry</h3>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Full Orders Table →
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {mockOrders.slice(0, 3).map(ord => (
              <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-blue-600 dark:text-blue-400">
                      #{ord.orderNumber}
                    </span>
                    <Badge
                      variant={
                        ord.status === 'out_for_delivery'
                          ? 'warning'
                          : ord.status === 'delivered'
                          ? 'success'
                          : 'info'
                      }
                      size="sm"
                    >
                      {ord.status.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">{ord.buyerName} • {ord.storeName}</p>
                  <p className="text-[11px] text-slate-400">{ord.timeAgo} • {ord.deliveryZone}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">
                    ₹{ord.total.toFixed(2)}
                  </span>
                  <span className="text-[11px] font-mono uppercase text-slate-400">
                    {ord.paymentMethod}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
