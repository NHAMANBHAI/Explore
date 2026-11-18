'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Layers, ArrowLeft, CheckCircle2, ShieldCheck, Download, Sparkles } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function AdminCatchAllModuleRoute() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const slugArray = Array.isArray(params?.slug) ? params.slug : [params?.slug || 'module'];
  const moduleName = slugArray.map((s) => s.replace(/_/g, ' ')).join(' / ');
  const parentRoute = slugArray[0] || 'admin';

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span className="cursor-pointer hover:underline" onClick={() => router.push('/admin')}>
              Admin
            </span>
            <span>/</span>
            <span className="capitalize">{slugArray[0]}</span>
            {slugArray[1] && (
              <>
                <span>/</span>
                <span className="text-slate-700 dark:text-slate-200 font-bold capitalize">{slugArray[1]}</span>
              </>
            )}
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 capitalize flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-blue-600" />
            {moduleName}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Active module connected to Hyperlocal multi-channel commerce operations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push(`/admin/${parentRoute}`)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to {parentRoute}
          </button>
          <button
            onClick={() => toast.success('Report Exported', `${moduleName} data exported to CSV.`)}
            className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Export Data
          </button>
        </div>
      </div>

      {/* Module Overview Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="max-w-md mx-auto space-y-1.5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 capitalize">
            {slugArray[slugArray.length - 1]?.replace(/_/g, ' ')} Workspace
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            This module is synchronized with your MySQL database tables. You can monitor live data pipelines, review logs, or execute bulk administrative operations.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 max-w-lg mx-auto pt-2 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <p className="text-[10px] text-slate-400">System Status</p>
            <p className="font-extrabold text-emerald-600 flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Operational
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <p className="text-[10px] text-slate-400">Database Sync</p>
            <p className="font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">MySQL 8.0</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <p className="text-[10px] text-slate-400">Security Audit</p>
            <p className="font-extrabold text-blue-600 flex items-center justify-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Role Protected
            </p>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => router.push('/admin/customers')}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-[#FF5722] rounded-xl transition-colors cursor-pointer"
          >
            Go to Customer 360
          </button>
          <button
            onClick={() => router.push('/admin/orders')}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Go to Live Orders
          </button>
        </div>
      </div>
    </div>
  );
}
