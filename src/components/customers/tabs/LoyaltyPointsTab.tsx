import React, { useState } from 'react';
import { Customer } from '../../../types/customer';
import { Award, PlusCircle, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { AdjustLoyaltyModal } from '../AdjustLoyaltyModal';

interface LoyaltyPointsTabProps {
  customer: Customer;
}

export const LoyaltyPointsTab: React.FC<LoyaltyPointsTabProps> = ({ customer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Loyalty Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-amber-100 flex items-center gap-1.5">
            <Award className="w-4 h-4" /> Reward Program
          </span>
          <h3 className="text-3xl font-black mt-1">{customer.loyaltyPoints} Points</h3>
          <p className="text-xs text-amber-100 mt-1">
            Redeemable for up to ₹{(customer.loyaltyPoints * 0.5).toFixed(2)} in instant cart deductions
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 text-xs font-bold text-amber-900 bg-white hover:bg-amber-50 rounded-xl flex items-center gap-2 transition-colors shadow-sm shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Adjust Loyalty Points
        </button>
      </div>

      {/* Points Ledger Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Loyalty Points Activity</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Points earned, redeemed, expired, and manual administrative bonuses
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50/80 dark:bg-slate-800/40 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Points</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Expiry (Days)</th>
                <th className="py-3 px-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {customer.loyaltyTransactions.length > 0 ? (
                customer.loyaltyTransactions.map(tx => {
                  const isCredit = tx.type === 'credit';
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
                        isCredit ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}>
                        {isCredit ? '+' : '-'}{tx.points} pts
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={tx.status === 'active' ? 'success' : tx.status === 'redeemed' ? 'info' : 'danger'}
                          size="sm"
                        >
                          {tx.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono">
                        {tx.expiryDays ? `${tx.expiryDays} days` : '—'}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                        {tx.description}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 italic">
                    No loyalty point transactions on record.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdjustLoyaltyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customer={customer}
      />
    </div>
  );
};
