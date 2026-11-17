import React, { useState, useEffect } from 'react';
import { Search, X, Users, ShoppingBag, Truck, Settings, HelpCircle, ArrowRight } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const { customers, selectCustomer } = useCustomer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickNav = [
    { title: 'Customers Directory', category: 'Module', route: 'customers', icon: Users },
    { title: 'Live Orders & Returns', category: 'Module', route: 'orders', icon: ShoppingBag },
    { title: 'Dispatch Management Console', category: 'Module', route: 'dispatch', icon: Truck },
    { title: 'System Settings', category: 'Module', route: 'settings', icon: Settings },
    { title: 'How to Use This Platform (User Guide)', category: 'Documentation', route: 'guide', icon: HelpCircle },
  ];

  const filteredNav = quickNav.filter(n => n.title.toLowerCase().includes(query.toLowerCase()));
  const filteredCustomers = customers.filter(
    c =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase()) ||
      c.mobile.includes(query)
  );

  const handleSelectNav = (route: string) => {
    onNavigate(route);
    onClose();
  };

  const handleSelectCustomer = (id: string) => {
    selectCustomer(id);
    onNavigate('customer_detail');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-100">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10">
        {/* Search Header */}
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command, customer name, order #, or module..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full px-3 py-4 text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Navigation Items */}
          {filteredNav.length > 0 && (
            <div>
              <p className="px-2 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Navigation
              </p>
              <div className="space-y-1">
                {filteredNav.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.title}
                      onClick={() => handleSelectNav(item.route)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-left transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                          {item.title}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Customers Matched */}
          {filteredCustomers.length > 0 && (
            <div>
              <p className="px-2 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Customers
              </p>
              <div className="space-y-1">
                {filteredCustomers.map(cust => (
                  <button
                    key={cust.id}
                    onClick={() => handleSelectCustomer(cust.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={cust.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt={cust.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 block">
                          {cust.name}
                        </span>
                        <span className="text-[11px] text-slate-400 block">
                          {cust.email} • {cust.mobile}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      ₹{cust.walletBalance.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredNav.length === 0 && filteredCustomers.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching records found for "{query}"
            </div>
          )}
        </div>

        {/* Footer Hints */}
        <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with mouse or keyboard</span>
          <span className="text-blue-600 dark:text-blue-400 font-medium">Command Palette</span>
        </div>
      </div>
    </div>
  );
};
