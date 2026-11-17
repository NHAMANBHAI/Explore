import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Customer } from '../../types/customer';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import { useCustomer } from '../../context/CustomerContext';
import { useToast } from '../../context/ToastContext';

interface AdjustLoyaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
}

export const AdjustLoyaltyModal: React.FC<AdjustLoyaltyModalProps> = ({
  isOpen,
  onClose,
  customer
}) => {
  const { adjustLoyaltyPoints } = useCustomer();
  const { toast } = useToast();

  const [action, setAction] = useState<'credit' | 'debit'>('credit');
  const [points, setPoints] = useState<string>('50');
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

    const numericPoints = parseInt(points, 10);
    const errors: Record<string, string> = {};

    // 1. Client-Side Validation
    if (isNaN(numericPoints) || numericPoints <= 0) {
      errors.points = 'Points must be a positive whole integer greater than 0.';
    }
    if (action === 'debit' && numericPoints > customer.loyaltyPoints) {
      errors.points = `Cannot debit ${numericPoints} points. Customer only has ${customer.loyaltyPoints} points.`;
    }
    if (!note || note.trim().length < 5) {
      errors.note = 'Audit note is required (minimum 5 characters).';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorBanner('Please correct the validation errors below.');
      return;
    }

    // 2. Simulated Backend API Execution
    setIsLoading(true);
    try {
      const res = await adjustLoyaltyPoints(customer.id, numericPoints, action, note);
      if (!res.success && res.error) {
        if (res.error.fieldErrors) {
          setFieldErrors(res.error.fieldErrors);
        }
        setErrorBanner(res.error.message);
        toast.error('Points Adjustment Denied', res.error.message);
      } else {
        toast.success(
          'Loyalty Points Updated',
          `${action === 'credit' ? 'Awarded' : 'Deducted'} ${numericPoints} points for ${customer.name}.`
        );
        handleClose();
      }
    } catch (err: unknown) {
      const errorMsg = (err as Error)?.message || 'An unexpected error occurred.';
      setErrorBanner(errorMsg);
      toast.error('System Exception', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Adjust Loyalty Points"
      subtitle={`Customer: ${customer.name} (Current: ${customer.loyaltyPoints} pts)`}
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
            Action <span className="text-rose-500">*</span>
          </label>
          <select
            value={action}
            onChange={e => {
              setAction(e.target.value as 'credit' | 'debit');
              setFieldErrors({});
            }}
            className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="credit">Credit Points (+) [Reward / Goodwill Bonus]</option>
            <option value="debit">Debit Points (-) [Expired Points / Correction]</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Points Amount <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            min="1"
            step="1"
            value={points}
            onChange={e => {
              setPoints(e.target.value);
              if (fieldErrors.points) {
                setFieldErrors(prev => {
                  const next = { ...prev };
                  delete next.points;
                  return next;
                });
              }
            }}
            className={`w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 transition-colors ${
              fieldErrors.points
                ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20'
                : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-500'
            }`}
            placeholder="e.g. 50"
          />
          {fieldErrors.points && (
            <p className="mt-1 text-[11px] text-rose-500 font-medium">{fieldErrors.points}</p>
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
            placeholder="e.g. Support compensation for delayed delivery on order #4812"
          />
          {fieldErrors.note ? (
            <p className="mt-1 text-[11px] text-rose-500 font-medium">{fieldErrors.note}</p>
          ) : (
            <p className="mt-1 text-[10px] text-slate-400">
              Audit note is required (minimum 5 characters).
            </p>
          )}
        </div>

        <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" onClick={handleClose} variant="ghost" size="sm">
            Cancel
          </Button>
          <Button type="submit" variant="default" size="sm" isLoading={isLoading}>
            Confirm Adjustment
          </Button>
        </div>
      </form>
    </Modal>
  );
};
