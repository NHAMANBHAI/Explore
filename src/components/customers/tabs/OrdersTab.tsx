import React from 'react';
import { Customer } from '../../../types/customer';
import { Badge } from '../../ui/Badge';
import { Eye, FileText, Share2 } from 'lucide-react';

interface OrdersTabProps {
  customer: Customer;
  onViewOrder?: (orderId: string) => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({ customer, onViewOrder }) => {
  const statusBadges = {
    pending: { variant: 'warning' as const, label: 'Pending Response' },
    preparing: { variant: 'info' as const, label: 'Preparing' },
    ready_for_pickup: { variant: 'primary' as const, label: 'Ready for Pickup' },
    out_for_delivery: { variant: 'warning' as const, label: 'Out for Delivery' },
    delivered: { variant: 'success' as const, label: 'Delivered' },
    cancelled: { variant: 'danger' as const, label: 'Cancelled' }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Order History</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total {customer.orders.length} orders placed by {customer.name}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-50/80 dark:bg-slate-800/40 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-3 px-4">Order #</th>
              <th className="py-3 px-4">Store</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Payment</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {customer.orders.length > 0 ? (
              customer.orders.map(order => {
                const badgeInfo = statusBadges[order.status] || {
                  variant: 'secondary' as const,
                  label: order.status
                };
                return (
                  <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                      #{order.orderNumber}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                      {order.storeName}
                      <span className="block text-[11px] text-slate-400 font-normal">
                        {order.itemsCount} item{order.itemsCount > 1 ? 's' : ''}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={badgeInfo.variant} size="sm">
                        {badgeInfo.label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold uppercase text-[10px] px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {order.paymentMethod}
                      </span>
                      <span className="block text-[10px] text-slate-400 capitalize mt-0.5">
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">
                      ₹{order.total.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                      {order.createdAt}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewOrder && onViewOrder(order.id)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-lg transition-colors"
                          title="View Order"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="Download Invoice"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded-lg transition-colors"
                          title="Send Invoice on WhatsApp"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400 italic">
                  No orders found for this customer.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
