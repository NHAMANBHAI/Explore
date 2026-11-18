'use client';

import React, { useState } from 'react';
import { Calculator, Search, Plus, Minus, Trash2, Printer, CreditCard, QrCode, CheckCircle2, ShoppingBag } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import { useToast } from '../context/ToastContext';

export const PosDashboardView: React.FC = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<{ product: (typeof mockProducts)[0]; quantity: number }[]>([
    { product: mockProducts[0], quantity: 2 },
    { product: mockProducts[1], quantity: 1 },
  ]);
  const [paymentMode, setPaymentMode] = useState<'CASH' | 'UPI_QR' | 'CARD'>('UPI_QR');

  const filteredProducts = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product: (typeof mockProducts)[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast.success('Added to Bill', `${product.name} added`);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: (typeof mockProducts)[0]; quantity: number }[]
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const gst = subtotal * 0.05; // 5% GST
  const total = subtotal + gst;

  const handleCheckout = () => {
    toast.success('Bill Generated & Paid!', `Invoice #POS-${Date.now().toString().slice(-6)} • ₹${total.toFixed(2)} received via ${paymentMode}`);
    setCart([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Calculator className="w-6 h-6 text-blue-600" />
            POS Quick Billing Counter
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Fast checkout terminal for in-store retail, walk-in customers and instant receipt printing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Terminal Online • Counter #01
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Product Selector (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Scan barcode or search products by name, SKU or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => addToCart(p)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="h-20 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden mb-2">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/60 text-white">
                      Stock: {p.totalStock}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-tight">
                    {p.name}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{p.category}</p>
                </div>
                <div className="pt-2 flex items-center justify-between mt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-extrabold text-blue-600">₹{p.price.toFixed(2)}</span>
                  <span className="p-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Plus className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Active Bill & Checkout (Col 5) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-blue-600" /> Current Order ({cart.length} items)
            </h2>
            <button
              onClick={() => setCart([])}
              className="text-[11px] font-semibold text-rose-500 hover:underline cursor-pointer"
            >
              Clear Cart
            </button>
          </div>

          {/* Cart Items List */}
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                No items added. Click products on the left or scan barcode.
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex-1 truncate">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-[10px] text-slate-500">₹{item.product.price} each</p>
                  </div>

                  <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5">
                    <button
                      onClick={() => updateQuantity(item.product.id, -1)}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer"
                    >
                      <Minus className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                    </button>
                    <span className="text-xs font-bold px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, 1)}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer"
                    >
                      <Plus className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                    </button>
                  </div>

                  <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 w-16 text-right">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Bill Calculation */}
          <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>GST (5%):</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-200 dark:border-slate-700">
              <span>Total Payable:</span>
              <span className="text-blue-600">₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2 pt-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Payment Mode</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPaymentMode('UPI_QR')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  paymentMode === 'UPI_QR'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" /> UPI QR
              </button>
              <button
                onClick={() => setPaymentMode('CASH')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  paymentMode === 'CASH'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                Cash
              </button>
              <button
                onClick={() => setPaymentMode('CARD')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  paymentMode === 'CARD'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" /> Card
              </button>
            </div>
          </div>

          {/* Checkout & Print Buttons */}
          <div className="pt-2 flex gap-2">
            <button
              disabled={cart.length === 0}
              onClick={handleCheckout}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" /> Collect ₹{total.toFixed(2)}
            </button>
            <button
              onClick={() => toast.info('Printer Spooler', 'Printing receipt to thermal printer...')}
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
              title="Print Receipt"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
