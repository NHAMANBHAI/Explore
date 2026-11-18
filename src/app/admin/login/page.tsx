'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LoginPage } from '@/views/auth/LoginPage';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  return (
    <LoginPage
      onNavigateForgotPassword={() => router.push('/admin/forgot-password')}
      onNavigateStorefront={() => router.push('/')}
    />
  );
}
