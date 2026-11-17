import React from 'react';
import { Customer } from '../../../types/customer';
import { User, CheckCircle2, XCircle, MapPin, ShoppingBag } from 'lucide-react';

interface OverviewTabProps {
  customer: Customer;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ customer }) => {
  const completedOrders = customer.orders.filter(o => o.status === 'delivered').length;
  const pendingOrders = customer.orders.filter(o => o.status === 'pending' || o.status === 'preparing').length;
  const cancelledOrders = customer.orders.filter(o => o.status === 'cancelled').length;

  const defaultAddress = customer.addresses.find(a => a.isDefault) || customer.addresses[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Personal Information Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Personal Information</h4>
        </div>
        <dl className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          <div className="py-2.5 flex justify-between">
            <dt className="text-slate-500 dark:text-slate-400 font-medium">Full Name</dt>
            <dd className="text-slate-900 dark:text-slate-100 font-semibold">{customer.name}</dd>
          </div>
          <div className="py-2.5 flex justify-between">
            <dt className="text-slate-500 dark:text-slate-400 font-medium">Email Address</dt>
            <dd className="text-slate-900 dark:text-slate-100 font-mono">{customer.email}</dd>
          </div>
          <div className="py-2.5 flex justify-between">
            <dt className="text-slate-500 dark:text-slate-400 font-medium">Mobile Phone</dt>
            <dd className="text-slate-900 dark:text-slate-100 font-mono">+{customer.countryCode} {customer.mobile}</dd>
          </div>
          <div className="py-2.5 flex justify-between">
            <dt className="text-slate-500 dark:text-slate-400 font-medium">Country / Region</dt>
            <dd className="text-slate-900 dark:text-slate-100">{customer.country}</dd>
          </div>
          <div className="py-2.5 flex justify-between">
            <dt className="text-slate-500 dark:text-slate-400 font-medium">Referral Code</dt>
            <dd className="text-blue-600 dark:text-blue-400 font-mono font-semibold">{customer.referralCode}</dd>
          </div>
          <div className="py-2.5 flex justify-between">
            <dt className="text-slate-500 dark:text-slate-400 font-medium">Invited By</dt>
            <dd className="text-slate-700 dark:text-slate-300 font-mono">{customer.referredByCode || 'Direct Organic Signup'}</dd>
          </div>
        </dl>
      </div>

      {/* Verification Status Details */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Verification & Security</h4>
        </div>
        <dl className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          <div className="py-2.5 flex items-center justify-between">
            <dt className="text-slate-500 dark:text-slate-400 font-medium">Email Verification</dt>
            <dd className="flex items-center gap-1.5 font-semibold">
              {customer.emailVerified ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Pending Verification
                </span>
              )}
            </dd>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <dt className="text-slate-500 dark:text-slate-400 font-medium">Mobile OTP Verification</dt>
            <dd className="flex items-center gap-1.5 font-semibold">
              {customer.mobileVerified ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Pending Verification
                </span>
              )}
            </dd>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <dt className="text-slate-500 dark:text-slate-400 font-medium">Government ID / KYC</dt>
            <dd className="flex items-center gap-1.5 font-semibold">
              {customer.kycVerified ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                </span>
              ) : (
                <span className="text-slate-500 flex items-center gap-1">Not Required</span>
              )}
            </dd>
          </div>
          <div className="py-2.5 flex justify-between">
            <dt className="text-slate-500 dark:text-slate-400 font-medium">Account Created</dt>
            <dd className="text-slate-700 dark:text-slate-300 font-mono">{customer.registrationDate}</dd>
          </div>
        </dl>
      </div>

      {/* Primary Delivery Address */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <MapPin className="w-4 h-4 text-rose-500" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Primary Delivery Address</h4>
        </div>
        {defaultAddress ? (
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-slate-100">{defaultAddress.name}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-400">
                {defaultAddress.type}
              </span>
            </div>
            <p className="leading-relaxed">
              {defaultAddress.addressLine1}, {defaultAddress.addressLine2}
            </p>
            {defaultAddress.landmark && (
              <p className="text-slate-500 italic">Landmark: {defaultAddress.landmark}</p>
            )}
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              {defaultAddress.city}, {defaultAddress.state} - {defaultAddress.postalCode}
            </p>
            <p className="text-[11px] text-slate-400 font-mono">
              GPS Coordinates: {defaultAddress.latitude}, {defaultAddress.longitude}
            </p>
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No saved address yet.</p>
        )}
      </div>

      {/* Order Breakdown Funnel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <ShoppingBag className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Order Lifetime Summary</h4>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
            <span className="text-xl font-bold text-emerald-700 dark:text-emerald-400 block">
              {completedOrders}
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-500 font-medium">Delivered</span>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-100 dark:border-amber-900/50">
            <span className="text-xl font-bold text-amber-700 dark:text-amber-400 block">
              {pendingOrders}
            </span>
            <span className="text-[11px] text-amber-600 dark:text-amber-500 font-medium">In Progress</span>
          </div>
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-100 dark:border-rose-900/50">
            <span className="text-xl font-bold text-rose-700 dark:text-rose-400 block">
              {cancelledOrders}
            </span>
            <span className="text-[11px] text-rose-600 dark:text-rose-500 font-medium">Cancelled</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500">Cumulative Spend</span>
          <span className="text-base font-bold text-slate-900 dark:text-slate-100">
            ₹{customer.totalSpent.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
