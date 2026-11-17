import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-blue-600 dark:text-blue-400',
  iconBg = 'bg-blue-50 dark:bg-blue-950/40',
  trend,
  className = ''
}) => {
  return (
    <div
      className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs transition-all hover:border-slate-300 dark:hover:border-slate-700 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</h3>
            {trend && (
              <span
                className={`text-xs font-medium ${
                  trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
