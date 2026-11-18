'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PlatformGuidePage } from '@/views/PlatformGuidePage';

export default function GuideRoute() {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    if (route === 'storefront') router.push('/');
    else if (route === 'dashboard') router.push('/admin');
    else if (route === 'customers') router.push('/admin/customers');
    else if (route === 'orders') router.push('/admin/orders');
    else router.push(`/admin/${route}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => router.push('/admin')}
            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            ← Back to Admin Console
          </button>
          <button
            onClick={() => router.push('/')}
            className="text-xs font-bold text-[#FF5722] hover:underline cursor-pointer"
          >
            Go to FlexiCommerce Storefront →
          </button>
        </div>
        <PlatformGuidePage onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
