import React, { useState } from 'react';
import { Customer } from '../../../types/customer';
import { Wallet, Award, PlusCircle, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { AdjustWalletModal } from '../AdjustWalletModal';

interface WalletTabProps {
  customer: Customer;
}

export const WalletTab: React.FC<WalletTabProps> = ({ customer }) => {
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Wallet KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Current Balance</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              ₹{customer.walletBalance.toFixed(2)}
            </h3>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
              Instant spendable at checkout
            </p>
          </div>
          <div className="p-3.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
            <Wallet className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Loyalty Points Balance</p>
            <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
              {customer.loyaltyPoints} pts
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Worth ₹{(customer.loyaltyPoints * 0.5).toFixed(2)} in discounts
            </p>
          </div>
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl p-5 shadow-sm flex flex-col justify-between sm:col-span-2 lg:col-span-1">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-200">Admin Actions</span>
            <h4 className="text-sm font-bold mt-1">Manual Balance Adjustment</h4>
            <p className="text-xs text-blue-100 mt-0.5">Credit refund or deposit directly to customer account.</p>
          </div>
          <button
            onClick={() => setIsAdjustModalOpen(true)}
            className="mt-4 px-3.5 py-2 text-xs font-semibold bg-white text-blue-700 hover:bg-blue-50 rounded-lg flex items-center justify-center gap-1.5 transition-colors self-start shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            Adjust Wallet
          </button>
        </div>
      </div>

      {/* Transaction Ledger Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Wallet Transactions Ledger</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Audit log of all credits, debits, refunds, and top-ups
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50/80 dark:bg-slate-800/40 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {customer.walletTransactions.length > 0 ? (
                customer.walletTransactions.map(tx => {
                  const isCredit = tx.type === 'deposit' || tx.type === 'refund' || tx.type === 'cashback';
                  return (
                    <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                        {tx.createdAt}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 font-semibold capitalize text-[11px] ${
                          isCredit ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                        }`}>
                          {isCredit ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                          {tx.type}
                        </span>
                      </td>
                      <td className={`py-3 px-4 font-bold ${
                        isCredit ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'
                      }`}>
                        {isCredit ? '+' : '-'}₹{tx.amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 uppercase text-[11px] font-mono">
                        {tx.paymentMethod}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={tx.status === 'completed' ? 'success' : tx.status === 'pending' ? 'warning' : 'danger'}
                          size="sm"
                        >
                          {tx.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                        {tx.description}
                        {tx.reference && (
                          <span className="block text-[10px] text-slate-400 font-mono">Ref: {tx.reference}</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 italic">
                    No transactions recorded for this wallet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdjustWalletModal
        isOpen={isAdjustModalOpen}
        onClose={() => setIsAdjustModalOpen(false)}
        customer={customer}
      />
    </div>
  );
};
