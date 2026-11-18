'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { SessionExpiredModal } from '@/components/auth/SessionExpiredModal';
import { LoginPage } from '@/views/auth/LoginPage';

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentRoute = () => {
    if (pathname.includes('/admin/customers')) return 'customers';
    if (pathname.includes('/admin/orders')) return 'orders';
    if (pathname.includes('/admin/dispatch')) return 'dispatch';
    if (pathname.includes('/admin/settings')) return 'settings';
    if (pathname === '/admin') return 'dashboard';
    return 'dashboard';
  };

  const handleNavigate = (route: string) => {
    switch (route) {
      case 'dashboard':
        router.push('/admin');
        break;
      case 'customers':
        router.push('/admin/customers');
        break;
      case 'orders':
        router.push('/admin/orders');
        break;
      case 'dispatch':
        router.push('/admin/dispatch');
        break;
      case 'settings':
        router.push('/admin/settings');
        break;
      case 'guide':
        router.push('/guide');
        break;
      case 'storefront':
        router.push('/');
        break;
      default:
        router.push(`/admin/${route}`);
        break;
    }
  };

  if (pathname === '/admin/login' || pathname === '/admin/forgot-password') {
    return <>{children}</>;
  }

  if (!isAuthenticated && !isLoading) {
    return (
      <LoginPage
        onNavigateForgotPassword={() => router.push('/admin/forgot-password')}
        onNavigateStorefront={() => router.push('/')}
      />
    );
  }

  return (
    <AdminLayout
      currentRoute={getCurrentRoute()}
      onNavigate={handleNavigate}
    >
      {children}
      <SessionExpiredModal />
    </AdminLayout>
  );
}
