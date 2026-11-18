import React, { useState } from 'react';
import { mockOrders } from '../data/mockOrders';
import { Order } from '../types/order';
import { DataTable, Column } from '../components/ui/DataTable';
import { Badge } from '../components/ui/Badge';
import { ShoppingBag, Hourglass, Eye, FileText, Share2, Filter } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredOrders = filterStatus === 'all'
    ? mockOrders
    : mockOrders.filter(o => o.status === filterStatus);

  const columns: Column<Order>[] = [
    {
      key: 'orderNumber',
      header: 'Order #',
      sortable: true,
      className: 'font-mono text-xs w-28 text-blue-600 dark:text-blue-400 font-bold',
      render: o => (
        <div>
          <span>#{o.orderNumber}</span>
          <span className="block text-[10px] text-slate-400 font-normal">{o.timeAgo}</span>
        </div>
      )
    },
    {
      key: 'orderDetails',
      header: 'Buyer & Store',
      render: o => (
        <div className="space-y-0.5 text-xs">
          <p className="font-semibold text-slate-900 dark:text-slate-100">{o.buyerName}</p>
          <p className="text-slate-500 font-normal">Store: {o.storeName}</p>
          <span className="text-[10px] text-slate-400 block font-mono">{o.deliveryZone}</span>
        </div>
      )
    },
    {
      key: 'items',
      header: 'Items & Variant',
      render: o => (
        <div className="space-y-1 text-xs">
          {o.items.map(it => (
            <div key={it.id} className="flex items-center gap-2">
              <img
                src={it.image}
                alt={it.name}
                className="w-8 h-8 rounded-md object-cover border border-slate-200 dark:border-slate-700 shrink-0"
              />
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200 line-clamp-1">{it.name}</p>
                <span className="text-[10px] text-slate-400">Qty: {it.quantity} • {it.variant}</span>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status & Deadlines',
      render: o => (
        <div className="space-y-1">
          <Badge
            variant={
              o.status === 'out_for_delivery'
                ? 'warning'
                : o.status === 'delivered'
                ? 'success'
                : o.status === 'awaiting_store_response'
                ? 'danger'
                : 'info'
            }
            size="sm"
          >
            {o.status.replace(/_/g, ' ').toUpperCase()}
          </Badge>
          {o.status === 'awaiting_store_response' && (
            <span className="flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
              <Hourglass className="w-3 h-3" /> Acceptance window expired
            </span>
          )}
        </div>
      )
    },
    {
      key: 'payment',
      header: 'Payment & Total',
      sortable: true,
      render: o => (
        <div>
          <span className="font-bold text-slate-900 dark:text-slate-100 block">
            ₹{o.total.toFixed(2)}
          </span>
          <span className="text-[10px] font-mono uppercase bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">
            {o.paymentMethod}
          </span>
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: o => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => alert(`View Order #${o.orderNumber}`)}
            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert(`Download Invoice for #${o.orderNumber}`)}
            className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Download Invoice"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert(`Sent invoice on WhatsApp to ${o.buyerPhone}`)}
            className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded-lg transition-colors"
            title="Send WhatsApp Invoice"
          >
            <Share2 className="w-4 h-4" />
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
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <ShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Order Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time multi-vendor orders, store response countdowns, fulfillment, and invoices.
          </p>
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['all', 'awaiting_store_response', 'preparing', 'out_for_delivery', 'delivered'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl capitalize transition-colors whitespace-nowrap ${
                filterStatus === st
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredOrders}
        searchPlaceholder="Search order #, customer, store, or SKU..."
        searchKey={o => `${o.orderNumber} ${o.buyerName} ${o.storeName} ${o.deliveryZone}`}
        pageSize={10}
      />
    </div>
  );
};
