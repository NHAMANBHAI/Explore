import React from 'react';
import { Customer } from '../../../types/customer';
import { MapPin, Phone, User, Check, Navigation } from 'lucide-react';
import { Badge } from '../../ui/Badge';

interface AddressesTabProps {
  customer: Customer;
}

export const AddressesTab: React.FC<AddressesTabProps> = ({ customer }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Saved Delivery Addresses</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {customer.addresses.length} registered drop-off locations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customer.addresses.length > 0 ? (
          customer.addresses.map(addr => (
            <div
              key={addr.id}
              className={`bg-white dark:bg-slate-900 border rounded-xl p-5 shadow-xs transition-all relative ${
                addr.isDefault
                  ? 'border-blue-500/80 ring-2 ring-blue-500/10'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Header: Label & Default Badge */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    {addr.type}
                  </span>
                </div>
                {addr.isDefault && (
                  <Badge variant="primary" size="sm">
                    <Check className="w-3 h-3" /> Default Drop-off
                  </Badge>
                )}
              </div>

              {/* Recipient Details */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {addr.name}
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  +{customer.countryCode} {addr.mobile}
                </div>
                <div className="pt-2 text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p className="font-medium">{addr.addressLine1}</p>
                  {addr.addressLine2 && <p className="text-slate-500">{addr.addressLine2}</p>}
                  {addr.landmark && (
                    <p className="text-slate-400 italic text-[11px]">Landmark: {addr.landmark}</p>
                  )}
                  <p className="font-semibold text-slate-900 dark:text-slate-100 mt-1">
                    {addr.city}, {addr.state} - {addr.postalCode}
                  </p>
                </div>

                {/* GPS Coordinates Bar */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-blue-500" />
                    {addr.latitude.toFixed(4)}, {addr.longitude.toFixed(4)}
                  </span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${addr.latitude},${addr.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-sans font-medium"
                  >
                    View on Map →
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 py-10 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 text-xs italic">
            No saved delivery addresses found for this customer.
          </div>
        )}
      </div>
    </div>
  );
};
