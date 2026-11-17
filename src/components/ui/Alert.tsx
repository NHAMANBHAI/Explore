import React from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'warning' | 'success';
  title?: string;
  children: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className = '', variant = 'default', title, children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200',
      destructive: 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200',
      warning: 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200',
      success: 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200',
    };

    const iconMap = {
      default: <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />,
      destructive: <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />,
      warning: <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />,
      success: <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />,
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={`relative w-full rounded-xl border p-4 text-xs flex items-start gap-3 shadow-2xs ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {iconMap[variant]}
        <div className="flex-1 space-y-0.5">
          {title && <h5 className="font-bold leading-none tracking-tight">{title}</h5>}
          <div className="text-xs leading-relaxed opacity-90">{children}</div>
        </div>
      </div>
    );
  }
);
Alert.displayName = 'Alert';
