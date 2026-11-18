'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ForgotPasswordPage } from '@/views/auth/ForgotPasswordPage';

export default function AdminForgotPasswordPage() {
  const router = useRouter();

  return (
    <ForgotPasswordPage
      onBackToLogin={() => router.push('/admin/login')}
    />
  );
}
