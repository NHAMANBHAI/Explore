import React from 'react';
import { Customer } from '../../../types/customer';
import { Bell, ShoppingBag, Tag, Wallet, Shield } from 'lucide-react';
import { Badge } from '../../ui/Badge';

interface NotificationsTabProps {
  customer: Customer;
}

export const NotificationsTab: React.FC<NotificationsTabProps> = ({ customer }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-blue-500" />;
      case 'promotion':
        return <Tag className="w-4 h-4 text-purple-500" />;
      case 'wallet':
        return <Wallet className="w-4 h-4 text-emerald-500" />;
      default:
        return <Shield className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Customer Communications</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Log of push notifications, transactional alerts, and SMS delivered
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {customer.notifications.length > 0 ? (
          customer.notifications.map(notif => (
            <div key={notif.id} className="p-4 flex items-start gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">{notif.title}</h5>
                  <span className="text-[11px] font-mono text-slate-400">{notif.createdAt}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{notif.message}</p>
                <div className="flex items-center gap-2 pt-1">
                  <Badge variant="secondary" size="sm">
                    {notif.type.toUpperCase()}
                  </Badge>
                  <Badge variant={notif.status === 'read' ? 'success' : 'info'} size="sm">
                    {notif.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-slate-400 text-xs italic">
            No notification logs found for this customer.
          </div>
        )}
      </div>
    </div>
  );
};
