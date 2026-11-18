import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';

interface LoginPageProps {
  onNavigateForgotPassword: () => void;
  onNavigateStorefront?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigateForgotPassword, onNavigateStorefront }) => {
  const { loginWithEmail, loginWithGoogle, isLoading, authError } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('hyperlocaladmin@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your administrative email and password.');
      return;
    }

    const res = await loginWithEmail({ email, password, rememberMe });
    if (!res.success && res.error) {
      setErrorMessage(res.error.message);
      toast.error('Authentication Failed', res.error.message);
    } else {
      toast.success('Welcome Back!', 'Authenticated into HyperLocal Admin Portal.');
    }
  };

  const handleGoogleSubmit = async () => {
    setErrorMessage(null);
    const res = await loginWithGoogle();
    if (!res.success && res.error) {
      setErrorMessage(res.error.message);
      toast.error('Google Sign-In Failed', res.error.message);
    } else {
      toast.success('Signed in with Google', 'Administrative session established.');
    }
  };

  const handleDemoFill = () => {
    setEmail('hyperlocaladmin@gmail.com');
    setPassword('12345678');
    setErrorMessage(null);
    toast.info('Demo Credentials Loaded', 'hyperlocaladmin@gmail.com / 12345678');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      {onNavigateStorefront && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-4 text-center">
          <button
            onClick={onNavigateStorefront}
            className="text-xs font-semibold text-slate-500 hover:text-[#FF5722] transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>← Return to FlexiCommerce Public Storefront</span>
          </button>
        </div>
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        {/* Brand Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white font-bold text-xl shadow-lg shadow-blue-500/30">
          H
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          HyperLocal Admin Portal
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Sign in to access order dispatch, catalog control, and customer management
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 sm:px-8 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xl space-y-6">
          {/* Quick Demo Credentials Pill */}
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Zap className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Demo Root Admin Account</span>
            </div>
            <button
              type="button"
              onClick={handleDemoFill}
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Auto Fill
            </button>
          </div>

          {/* Continue with Google (Firebase OAuth) */}
          <button
            type="button"
            onClick={handleGoogleSubmit}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs transition-all cursor-pointer disabled:opacity-50"
          >
            {/* Google SVG Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            <span className="bg-white dark:bg-slate-900 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Or sign in with email
            </span>
          </div>

          {/* Error Message Display */}
          {(errorMessage || authError) && (
            <Alert variant="destructive" title="Authentication Error">
              {errorMessage || authError}
            </Alert>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address
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

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={onNavigateForgotPassword}
                  className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  I forgot password
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700"
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              <ShieldCheck className="w-4 h-4" />
              Sign In to Admin Console
            </Button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-slate-400 mt-6">
          HyperLocal Multivendor Delivery & E-Commerce Platform • v2.6 Production
        </p>
      </div>
    </div>
  );
};
