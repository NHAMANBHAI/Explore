import React, { useState } from 'react';
import { useCustomer } from '../context/CustomerContext';
import { CustomerProfileCard } from '../components/customers/CustomerProfileCard';
import { StatCard } from '../components/ui/StatCard';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { OverviewTab } from '../components/customers/tabs/OverviewTab';
import { OrdersTab } from '../components/customers/tabs/OrdersTab';
import { WalletTab } from '../components/customers/tabs/WalletTab';
import { AddressesTab } from '../components/customers/tabs/AddressesTab';
import { NotificationsTab } from '../components/customers/tabs/NotificationsTab';
import { LoyaltyPointsTab } from '../components/customers/tabs/LoyaltyPointsTab';
import {
  ArrowLeft,
  ShoppingBag,
  CreditCard,
  Wallet,
  Award,
  Info,
  MapPin,
  Bell,
  UserX
} from 'lucide-react';

interface CustomerDetailPageProps {
  onBack: () => void;
  onViewOrder?: (orderId: string) => void;
}

export const CustomerDetailPage: React.FC<CustomerDetailPageProps> = ({
  onBack,
  onViewOrder
}) => {
  const { selectedCustomer } = useCustomer();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'orders' | 'wallet' | 'addresses' | 'notifications' | 'loyalty'
  >('overview');

  if (!selectedCustomer) {
    return (
      <EmptyState
        title="Customer Record Not Found"
        description="The requested customer identifier does not match any active or archived database record."
        icon={UserX}
        actionLabel="Back to Customer Directory"
        onAction={onBack}
        className="my-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
      />
    );
  }

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: Info },
    { id: 'orders' as const, label: `Orders (${selectedCustomer.orders.length})`, icon: ShoppingBag },
    { id: 'wallet' as const, label: 'Wallet', icon: Wallet },
    { id: 'addresses' as const, label: `Addresses (${selectedCustomer.addresses.length})`, icon: MapPin },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'loyalty' as const, label: 'Loyalty Points', icon: Award },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Breadcrumb Navigation & Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            size="icon"
            className="rounded-xl"
            title="Back to Customers List"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span onClick={onBack} className="hover:underline cursor-pointer">Customers</span>
              <span>/</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">{selectedCustomer.name}</span>
            </div>
            <h1 className="text-xl font-black text-slate-900 dark:text-slate-100">
              Customer 360° Profile
            </h1>
          </div>
        </div>
      </div>

      {/* Customer Header Info Card */}
      <CustomerProfileCard customer={selectedCustomer} />

      {/* Top 4 KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Lifetime Orders"
          value={selectedCustomer.totalOrders}
          subtitle={`${selectedCustomer.orders.filter(o => o.status === 'delivered').length} completed successfully`}
          icon={ShoppingBag}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-950/40"
        />
        <StatCard
          title="Total Spent"
          value={`₹${selectedCustomer.totalSpent.toFixed(2)}`}
          subtitle="Net platform checkout value"
          icon={CreditCard}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/40"
        />
        <StatCard
          title="Wallet Balance"
          value={`₹${selectedCustomer.walletBalance.toFixed(2)}`}
          subtitle="Available for instant checkout"
          icon={Wallet}
          iconColor="text-cyan-600 dark:text-cyan-400"
          iconBg="bg-cyan-50 dark:bg-cyan-950/40"
        />
        <StatCard
          title="Loyalty Points"
          value={`${selectedCustomer.loyaltyPoints} pts`}
          subtitle="Active reward balance"
          icon={Award}
          iconColor="text-amber-600 dark:text-amber-400"
          iconBg="bg-amber-50 dark:bg-amber-950/40"
        />
      </div>

      {/* 6-Tabbed Content Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        {/* Tab Headers */}
        <div className="border-b border-slate-200 dark:border-slate-800 px-4 flex items-center gap-1 overflow-x-auto bg-slate-50/50 dark:bg-slate-900/50">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-white dark:bg-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-6">
          {activeTab === 'overview' && <OverviewTab customer={selectedCustomer} />}
          {activeTab === 'orders' && <OrdersTab customer={selectedCustomer} onViewOrder={onViewOrder} />}
          {activeTab === 'wallet' && <WalletTab customer={selectedCustomer} />}
          {activeTab === 'addresses' && <AddressesTab customer={selectedCustomer} />}
          {activeTab === 'notifications' && <NotificationsTab customer={selectedCustomer} />}
          {activeTab === 'loyalty' && <LoyaltyPointsTab customer={selectedCustomer} />}
        </div>
      </div>
    </div>
  );
};
