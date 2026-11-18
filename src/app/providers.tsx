'use client';

import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { ToastProvider } from '../context/ToastContext';
import { AuthProvider } from '../context/AuthContext';
import { CustomerProvider } from '../context/CustomerContext';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallbackTitle="Application Critical Failure">
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <CustomerProvider>
              {children}
            </CustomerProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
