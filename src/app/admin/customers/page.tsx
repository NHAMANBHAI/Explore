'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CustomersPage } from '@/views/CustomersPage';
import { useCustomer } from '@/context/CustomerContext';

export default function AdminCustomersRoute() {
  const router = useRouter();
  const { selectCustomer } = useCustomer();

  const handleSelectCustomer = (customerId: string) => {
    selectCustomer(customerId);
    router.push(`/admin/customers/${customerId}`);
  };

  return <CustomersPage onSelectCustomer={handleSelectCustomer} />;
}
