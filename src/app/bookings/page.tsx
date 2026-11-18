'use client';

import React from 'react';
import { UniversalBookingsView } from '@/views/UniversalBookingsView';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { useRouter } from 'next/navigation';

export default function BookingsDirectPage() {
  const router = useRouter();

  return (
    <AdminLayout
      currentRoute="bookings"
      onNavigate={(route) => {
        if (route.startsWith('http')) window.open(route, '_blank');
        else router.push(`/admin/${route}`);
      }}
    >
      <UniversalBookingsView />
    </AdminLayout>
  );
}
