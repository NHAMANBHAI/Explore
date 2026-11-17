import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';

export const SessionExpiredModal: React.FC = () => {
  const { user, isSessionExpiredModalOpen, closeSessionExpiredModal, loginWithEmail } = useAuth();
  const { toast } = useToast();

  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isSessionExpiredModalOpen || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!password) {
      setErrorMsg('Please enter your password to continue.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await loginWithEmail({ email: user.email, password });
      if (res.success) {
        toast.success('Session Re-authenticated', 'You may continue your work seamlessly.');
        closeSessionExpiredModal();
        setPassword('');
      } else if (res.error) {
        setErrorMsg(res.error.message);
      }
    } catch (err: unknown) {
      setErrorMsg((err as Error)?.message || 'Authentication error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isSessionExpiredModalOpen}
      onClose={closeSessionExpiredModal}
      title="Session Expired"
      subtitle="Please verify your password to continue without losing your current view."
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center py-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <p className="text-xs text-slate-500">
            Re-authenticating as <strong className="text-slate-800 dark:text-slate-200">{user.email}</strong>
          </p>
        </div>

        {errorMsg && (
          <Alert variant="destructive" title="Verification Failed">
            {errorMsg}
          </Alert>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Admin Password <span className="text-rose-500">*</span>
          </label>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            required
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
          <Button
            type="button"
            onClick={closeSessionExpiredModal}
            variant="ghost"
            size="sm"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            size="sm"
            isLoading={isLoading}
          >
            Confirm & Resume
          </Button>
        </div>
      </form>
    </Modal>
  );
};
