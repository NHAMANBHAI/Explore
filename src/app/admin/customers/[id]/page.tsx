'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CustomerDetailPage } from '@/views/CustomerDetailPage';
import { useCustomer } from '@/context/CustomerContext';

export default function CustomerDetailRoute() {
  const router = useRouter();
  const params = useParams();
  const { selectCustomer } = useCustomer();

  React.useEffect(() => {
    if (params?.id) {
      selectCustomer(params.id as string);
    }
  }, [params?.id, selectCustomer]);

  return (
    <CustomerDetailPage
      onBack={() => router.push('/admin/customers')}
      onViewOrder={() => router.push('/admin/orders')}
    />
  );
}
