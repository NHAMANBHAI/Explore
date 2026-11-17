import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Customer } from '../../types/customer';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import { useCustomer } from '../../context/CustomerContext';
import { useToast } from '../../context/ToastContext';

interface AdjustWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
}

export const AdjustWalletModal: React.FC<AdjustWalletModalProps> = ({
  isOpen,
  onClose,
  customer
}) => {
  const { adjustWalletBalance } = useCustomer();
  const { toast } = useToast();

  const [action, setAction] = useState<'credit' | 'debit'>('credit');
  const [amount, setAmount] = useState<string>('100');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleClose = () => {
    setErrorBanner(null);
    setFieldErrors({});
    setIsLoading(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBanner(null);
    setFieldErrors({});

    const numericAmount = parseFloat(amount);
    const errors: Record<string, string> = {};

    // 1. Client-Side Validation
    if (isNaN(numericAmount) || numericAmount <= 0) {
      errors.amount = 'Please enter a valid positive amount greater than ₹0.00.';
    }
    if (action === 'debit' && numericAmount > customer.walletBalance) {
      errors.amount = `Insufficient wallet balance. Current balance is only ₹${customer.walletBalance.toFixed(2)}. Overdraft is not permitted.`;
    }
    if (!note || note.trim().length < 5) {
      errors.note = 'Audit note is required (minimum 5 characters).';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorBanner('Please resolve the errors highlighted below.');
      return;
    }

    // 2. Simulated Backend API Execution
    setIsLoading(true);
    try {
      const res = await adjustWalletBalance(customer.id, numericAmount, action, note);
      if (!res.success && res.error) {
        if (res.error.fieldErrors) {
          setFieldErrors(res.error.fieldErrors);
        }
        setErrorBanner(res.error.message);
        toast.error('Transaction Failed', res.error.message);
      } else {
        toast.success(
          'Wallet Adjusted Successfully',
          `${action === 'credit' ? 'Credited' : 'Debited'} ₹${numericAmount.toFixed(2)} for ${customer.name}.`
        );
        handleClose();
      }
    } catch (err: unknown) {
      const errorMsg = (err as Error)?.message || 'An unexpected network error occurred.';
      setErrorBanner(errorMsg);
      toast.error('Network Error', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Adjust Customer Wallet Balance"
      subtitle={`Customer: ${customer.name} (Current: ₹${customer.walletBalance.toFixed(2)})`}
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorBanner && (
          <Alert variant="destructive" title="Adjustment Denied">
            {errorBanner}
          </Alert>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Transaction Direction <span className="text-rose-500">*</span>
          </label>
          <select
            value={action}
            onChange={e => {
              setAction(e.target.value as 'credit' | 'debit');
              setFieldErrors({});
            }}
            className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="credit">Credit (+) [Deposit, Refund, Goodwill Bonus]</option>
            <option value="debit">Debit (-) [Fee Deduction, Overcharge Reversal]</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Amount (₹) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-xs">
              ₹
            </span>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={e => {
                setAmount(e.target.value);
                if (fieldErrors.amount) {
                  setFieldErrors(prev => {
                    const next = { ...prev };
                    delete next.amount;
                    return next;
                  });
                }
              }}
              className={`w-full pl-8 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 transition-colors ${
                fieldErrors.amount
                  ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-500'
              }`}
              placeholder="0.00"
            />
          </div>
          {fieldErrors.amount && (
            <p className="mt-1 text-[11px] text-rose-500 font-medium">{fieldErrors.amount}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Audit Reason & Note <span className="text-rose-500">*</span>
          </label>
          <textarea
            value={note}
            onChange={e => {
              setNote(e.target.value);
              if (fieldErrors.note) {
                setFieldErrors(prev => {
                  const next = { ...prev };
                  delete next.note;
                  return next;
                });
              }
            }}
            rows={2}
            className={`w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 transition-colors ${
              fieldErrors.note
                ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20'
                : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-500'
            }`}
            placeholder="e.g. Approved manual bank deposit slip #DEP-90214 or order return compensation"
          />
          {fieldErrors.note ? (
            <p className="mt-1 text-[11px] text-rose-500 font-medium">{fieldErrors.note}</p>
          ) : (
            <p className="mt-1 text-[10px] text-slate-400">
              Required for fiscal audit logging. Minimum 5 characters.
            </p>
          )}
        </div>

        <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" onClick={handleClose} variant="ghost" size="sm">
            Cancel
          </Button>
          <Button type="submit" variant="default" size="sm" isLoading={isLoading}>
            Commit Transaction
          </Button>
        </div>
      </form>
    </Modal>
  );
};
