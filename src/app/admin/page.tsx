'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { DashboardPage } from '@/views/DashboardPage';
import { useCustomer } from '@/context/CustomerContext';

export default function AdminDashboardRoute() {
  const router = useRouter();
  const { selectCustomer } = useCustomer();

  const handleSelectCustomer = (customerId: string) => {
    selectCustomer(customerId);
    router.push(`/admin/customers/${customerId}`);
  };

  const handleNavigate = (route: string) => {
    if (route === 'customers') router.push('/admin/customers');
    else if (route === 'orders') router.push('/admin/orders');
    else if (route === 'dispatch') router.push('/admin/dispatch');
    else if (route === 'settings') router.push('/admin/settings');
    else if (route === 'guide') router.push('/guide');
  };

  return (
    <DashboardPage
      onNavigate={handleNavigate}
      onSelectCustomer={handleSelectCustomer}
    />
  );
}
