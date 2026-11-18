'use client';

import React from 'react';
import { ShieldCheck, Plus, Check, Users, Lock } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const RolesView: React.FC = () => {
  const { toast } = useToast();

  const roles = [
    { name: 'Super Administrator', usersCount: 2, badge: 'Full Access', permissions: ['Customer 360 Full Edit', 'Orders Dispatch & Reassignment', 'Financial Payouts & Wallet Adjust', 'Staff RBAC & API Keys'], color: 'border-blue-500' },
    { name: 'Store Dispatcher', usersCount: 5, badge: 'Logistics', permissions: ['Orders Dispatch & Reassignment', 'Delivery Zones View', 'Rider GPS Fleet Monitor', 'COD Reconciliation'], color: 'border-emerald-500' },
    { name: 'Customer Support Lead', usersCount: 4, badge: 'CRM', permissions: ['Customer 360 View', 'Support Inbox & WhatsApp Chat', 'Wallet Transactions View', 'Order Return Requests Review'], color: 'border-amber-500' },
    { name: 'Finance Auditor', usersCount: 2, badge: 'Finance', permissions: ['Financial Payouts & Wallet Adjust', 'GST Tax Invoicing & GSTR-1', 'Seller Commission Ledger', 'COD Reconciliation'], color: 'border-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            Staff Roles & Role-Based Access Control (RBAC)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Enforce granular permissions for managers, dispatchers, finance auditors, and support agents.
          </p>
        </div>
        <button
          onClick={() => toast.info('New Role', 'Role creator opened.')}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create Custom Role
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {roles.map((r, idx) => (
          <div key={idx} className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 shadow-xs flex flex-col justify-between ${r.color}`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {r.badge}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{r.usersCount} Staff Assigned</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{r.name}</h3>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Granted Privileges</p>
                {r.permissions.map((perm, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{perm}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex justify-end">
              <button
                onClick={() => toast.info('Edit Role', `Editing permissions for ${r.name}`)}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Edit Role Matrix →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
