import React from 'react';
import { useCustomer } from '../context/CustomerContext';
import { DataTable, Column } from '../components/ui/DataTable';
import { Customer } from '../types/customer';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { Skeleton } from '../components/ui/Skeleton';
import { Users, UserPlus, RefreshCw, Eye, ShieldAlert, ShieldCheck } from 'lucide-react';

interface CustomersPageProps {
  onSelectCustomer: (customerId: string) => void;
}

export const CustomersPage: React.FC<CustomersPageProps> = ({ onSelectCustomer }) => {
  const {
    customers,
    isLoading,
    fetchError,
    reloadCustomers,
    toggleCustomerStatus
  } = useCustomer();

  const columns: Column<Customer>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      className: 'font-mono text-xs w-20 text-slate-500',
      render: c => `#${c.id}`
    },
    {
      key: 'name',
      header: 'Customer',
      sortable: true,
      render: c => (
        <div className="flex items-center gap-3">
          <img
            src={
              c.avatarUrl ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
            }
            alt={c.name}
            className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
          />
          <div>
            <span
              onClick={() => onSelectCustomer(c.id)}
              className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer block"
            >
              {c.name}
            </span>
            <span className="text-[11px] text-slate-400 block">
              Joined {c.registrationDate}
            </span>
          </div>
        </div>
      )
    },
    {
      key: 'details',
      header: 'Contact Details',
      render: c => (
        <div className="space-y-0.5">
          <p className="font-mono text-xs text-slate-700 dark:text-slate-300">{c.email}</p>
          <p className="font-mono text-xs text-slate-500">+{c.countryCode} {c.mobile}</p>
        </div>
      )
    },
    {
      key: 'walletBalance',
      header: 'Wallet Balance',
      sortable: true,
      render: c => (
        <div>
          <span className="font-bold text-slate-900 dark:text-slate-100">
            ₹{c.walletBalance.toFixed(2)}
          </span>
          <span className="block text-[11px] text-amber-600 dark:text-amber-400 font-medium">
            {c.loyaltyPoints} loyalty pts
          </span>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: c => (
        <Badge variant={c.status === 'active' ? 'success' : 'danger'} dot size="sm">
          {c.status.toUpperCase()}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: c => (
        <div className="flex items-center justify-end gap-1.5" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => onSelectCustomer(c.id)}
            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-lg transition-colors cursor-pointer"
            title="View 360 Profile"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleCustomerStatus(c.id)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              c.status === 'active'
                ? 'text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60'
                : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/60'
            }`}
            title={c.status === 'active' ? 'Block Account' : 'Activate Account'}
          >
            {c.status === 'active' ? <ShieldAlert className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Home</span>
            <span>/</span>
            <span className="text-slate-600 dark:text-slate-300 font-medium">Customer Management</span>
            <span>/</span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Directory</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Customer Directory
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage registered consumers, digital wallet balances, verification states, and loyalty points.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={() => reloadCustomers()}
            variant="outline"
            size="sm"
            isLoading={isLoading}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </Button>
          <Button
            onClick={() => alert('New Customer Registration Modal opens in production flow')}
            variant="default"
            size="sm"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Backend API Error Banner */}
      {fetchError && (
        <Alert variant="destructive" title="Backend Connection Error">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-1">
            <p>{fetchError}</p>
            <Button onClick={() => reloadCustomers()} variant="outline" size="sm" className="bg-white text-rose-700">
              <RefreshCw className="w-3 h-3" /> Retry Connection
            </Button>
          </div>
        </Alert>
      )}

      {/* Loading Skeleton vs DataTable */}
      {isLoading ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-9 w-64 rounded-xl" />
            <Skeleton className="h-9 w-32 rounded-xl" />
          </div>
          <div className="space-y-3 pt-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-36 rounded" />
                    <Skeleton className="h-3 w-24 rounded" />
                  </div>
                </div>
                <Skeleton className="h-4 w-40 rounded hidden md:block" />
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={customers}
          searchPlaceholder="Search customer by name, email, or mobile..."
          searchKey={c => `${c.name} ${c.email} ${c.mobile} ${c.referralCode}`}
          pageSize={10}
          onRowClick={c => onSelectCustomer(c.id)}
        />
      )}
    </div>
  );
};
