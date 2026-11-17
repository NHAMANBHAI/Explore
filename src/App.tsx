import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CustomerProvider, useCustomer } from './context/CustomerContext';
import { AdminLayout } from './components/layout/AdminLayout';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { LoginPage } from './pages/auth/LoginPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { SessionExpiredModal } from './components/auth/SessionExpiredModal';
import { DashboardPage } from './pages/DashboardPage';
import { CustomersPage } from './pages/CustomersPage';
import { CustomerDetailPage } from './pages/CustomerDetailPage';
import { OrdersPage } from './pages/OrdersPage';
import { DispatchPage } from './pages/DispatchPage';
import { SettingsPage } from './pages/SettingsPage';
import { PlatformGuidePage } from './pages/PlatformGuidePage';
import { FlexiStorefrontPage } from './pages/storefront/FlexiStorefrontPage';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [viewMode, setViewMode] = useState<'storefront' | 'admin'>('storefront');
  const [authView, setAuthView] = useState<'login' | 'forgot_password'>('login');
  const [currentRoute, setCurrentRoute] = useState<string>('customers');
  const { selectCustomer } = useCustomer();

  // Mode 1: FlexiCommerce Public Storefront & Marketing Portal
  if (viewMode === 'storefront') {
    return (
      <FlexiStorefrontPage
        onNavigateToAdmin={() => setViewMode('admin')}
      />
    );
  }

  // Mode 2: Unauthenticated Admin Login Gateway
  if (!isAuthenticated) {
    if (authView === 'forgot_password') {
      return (
        <ForgotPasswordPage
          onBackToLogin={() => setAuthView('login')}
        />
      );
    }
    return (
      <LoginPage
        onNavigateForgotPassword={() => setAuthView('forgot_password')}
        onNavigateStorefront={() => setViewMode('storefront')}
      />
    );
  }

  // Mode 3: Authenticated Hyperlocal Admin Console
  const handleSelectCustomer = (customerId: string) => {
    selectCustomer(customerId);
    setCurrentRoute('customer_detail');
  };

  const handleNavigate = (route: string) => {
    if (route === 'storefront') {
      setViewMode('storefront');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AdminLayout currentRoute={currentRoute} onNavigate={handleNavigate}>
      <ErrorBoundary fallbackTitle="Application View Error" onReset={() => handleNavigate('customers')}>
        {currentRoute === 'dashboard' && (
          <DashboardPage
            onNavigate={handleNavigate}
            onSelectCustomer={handleSelectCustomer}
          />
        )}

        {currentRoute === 'customers' && (
          <CustomersPage onSelectCustomer={handleSelectCustomer} />
        )}

        {currentRoute === 'customer_detail' && (
          <CustomerDetailPage
            onBack={() => setCurrentRoute('customers')}
            onViewOrder={() => setCurrentRoute('orders')}
          />
        )}

        {currentRoute === 'orders' && <OrdersPage />}

        {currentRoute === 'dispatch' && <DispatchPage />}

        {currentRoute === 'settings' && <SettingsPage />}

        {currentRoute === 'guide' && <PlatformGuidePage onNavigate={handleNavigate} />}

        {/* Fallback for submenus */}
        {!['dashboard', 'customers', 'customer_detail', 'orders', 'dispatch', 'settings', 'guide'].includes(
          currentRoute
        ) && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 capitalize">
              {currentRoute.replace(/_/g, ' ')} Module
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              This module is connected to the Hyperlocal system architecture. You can review the functional documentation or continue exploring the live Customer Management and Order Fulfillment modules.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setCurrentRoute('customers')}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-xl cursor-pointer"
              >
                Go to Customer Management
              </button>
              <button
                onClick={() => setCurrentRoute('guide')}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl cursor-pointer"
              >
                Read Module Guide
              </button>
            </div>
          </div>
        )}
      </ErrorBoundary>

      {/* Global Session Expired Re-login Overlay Modal */}
      <SessionExpiredModal />
    </AdminLayout>
  );
};

export default function App() {
  return (
    <ErrorBoundary fallbackTitle="Root Application Critical Failure">
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <CustomerProvider>
              <AppContent />
            </CustomerProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
