import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle2, ShieldQuestion } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';

interface ForgotPasswordPageProps {
  onBackToLogin: () => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onBackToLogin }) => {
  const { forgotPassword } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid administrative email address.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await forgotPassword(email);
      if (res.success) {
        setIsSubmitted(true);
        toast.success('Password Reset Dispatched', `Instructions sent to ${email}`);
      } else if (res.error) {
        setErrorMessage(res.error.message);
        toast.error('Request Denied', res.error.message);
      }
    } catch (err: unknown) {
      setErrorMessage((err as Error)?.message || 'Failed to dispatch reset request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold text-xl shadow-xs">
          <ShieldQuestion className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Forgot Password
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Enter your administrative email to receive a password reset link
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 sm:px-8 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xl space-y-6">
          {isSubmitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Reset Link Dispatched
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We've sent an encrypted recovery token to <strong className="text-slate-700 dark:text-slate-300">{email}</strong>. Please check your inbox and spam folder.
                </p>
              </div>
              <Button onClick={onBackToLogin} variant="outline" size="sm" className="w-full mt-4">
                <ArrowLeft className="w-4 h-4" />
                Return to Sign In
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <Alert variant="destructive" title="Request Failed">
                  {errorMessage}
                </Alert>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Administrative Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Send Password Reset Email
              </Button>

              <button
                type="button"
                onClick={onBackToLogin}
                className="w-full text-center text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 flex items-center justify-center gap-1.5 pt-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Sign In
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
