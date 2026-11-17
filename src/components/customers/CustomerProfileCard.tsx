import React, { useState } from 'react';
import { Customer } from '../../types/customer';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Mail, Phone, Calendar, Gift, Wallet, Award, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import { useToast } from '../../context/ToastContext';
import { AdjustWalletModal } from './AdjustWalletModal';
import { AdjustLoyaltyModal } from './AdjustLoyaltyModal';

interface CustomerProfileCardProps {
  customer: Customer;
}

export const CustomerProfileCard: React.FC<CustomerProfileCardProps> = ({ customer }) => {
  const { toggleCustomerStatus } = useCustomer();
  const { toast } = useToast();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isLoyaltyModalOpen, setIsLoyaltyModalOpen] = useState(false);
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);

  const handleToggleStatus = async () => {
    setIsTogglingStatus(true);
    try {
      const res = await toggleCustomerStatus(customer.id);
      if (res.success) {
        const nextState = customer.status === 'active' ? 'Blocked' : 'Activated';
        toast.success(
          `Customer Account ${nextState}`,
          `Account for ${customer.name} has been updated to ${nextState.toLowerCase()}.`
        );
      } else if (res.error) {
        toast.error('Action Failed', res.error.message);
      }
    } catch (err: unknown) {
      toast.error('Network Error', (err as Error)?.message || 'Failed to update status.');
    } finally {
      setIsTogglingStatus(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* User Identity Details */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <img
              src={
                customer.avatarUrl ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
              }
              alt={customer.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 dark:border-slate-800 shadow-sm"
            />
            <span
              className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center ${
                customer.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
              title={`Status: ${customer.status}`}
            />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{customer.name}</h2>
              <Badge variant={customer.status === 'active' ? 'success' : 'danger'} dot>
                {customer.status.toUpperCase()}
              </Badge>
              {customer.emailVerified ? (
                <Badge variant="success" size="sm">
                  Email Verified
                </Badge>
              ) : (
                <Badge variant="warning" size="sm">
                  Email Not Verified
                </Badge>
              )}
              {customer.mobileVerified ? (
                <Badge variant="success" size="sm">
                  Mobile Verified
                </Badge>
              ) : (
                <Badge variant="warning" size="sm">
                  Mobile Not Verified
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {customer.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                +{customer.countryCode} {customer.mobile}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Joined {customer.registrationDate}
              </span>
              <span className="flex items-center gap-1.5 font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-slate-700 dark:text-slate-300">
                <Gift className="w-3.5 h-3.5 text-blue-500" />
                {customer.referralCode}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
          <Button
            onClick={() => setIsWalletModalOpen(true)}
            variant="outline"
            size="sm"
            className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-950/60"
          >
            <Wallet className="w-3.5 h-3.5" />
            Adjust Wallet
          </Button>

          <Button
            onClick={() => setIsLoyaltyModalOpen(true)}
            variant="outline"
            size="sm"
            className="text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900 hover:bg-amber-50 dark:hover:bg-amber-950/60"
          >
            <Award className="w-3.5 h-3.5" />
            Adjust Loyalty
          </Button>

          <Button
            onClick={handleToggleStatus}
            variant={customer.status === 'active' ? 'destructive' : 'default'}
            size="sm"
            isLoading={isTogglingStatus}
          >
            {customer.status === 'active' ? (
              <>
                <ShieldAlert className="w-3.5 h-3.5" />
                Block Account
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                Unblock Account
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Adjust Modals */}
      <AdjustWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        customer={customer}
      />
      <AdjustLoyaltyModal
        isOpen={isLoyaltyModalOpen}
        onClose={() => setIsLoyaltyModalOpen(false)}
        customer={customer}
      />
    </div>
  );
};
