import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer } from '../types/customer';
import { customerService } from '../services/customerService';
import { apiClient, ApiResponse } from '../services/apiClient';

interface CustomerContextType {
  customers: Customer[];
  selectedCustomer: Customer | null;
  selectedCustomerId: string | null;
  isLoading: boolean;
  fetchError: string | null;
  isSimulatingError: boolean;
  toggleSimulatedError: () => void;
  reloadCustomers: () => Promise<void>;
  selectCustomer: (id: string | null) => void;
  adjustWalletBalance: (
    customerId: string,
    amount: number,
    type: 'credit' | 'debit',
    note: string
  ) => Promise<ApiResponse<Customer>>;
  adjustLoyaltyPoints: (
    customerId: string,
    points: number,
    type: 'credit' | 'debit',
    note: string
  ) => Promise<ApiResponse<Customer>>;
  toggleCustomerStatus: (customerId: string) => Promise<ApiResponse<Customer>>;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>('901');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isSimulatingError, setIsSimulatingError] = useState(false);

  const reloadCustomers = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const res = await customerService.getCustomers();
      if (res.success && res.data) {
        setCustomers(res.data);
      } else if (res.error) {
        setFetchError(res.error.message);
      }
    } catch (err: unknown) {
      setFetchError((err as Error)?.message || 'Failed to connect to backend service.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reloadCustomers();
  }, []);

  const toggleSimulatedError = () => {
    const next = !isSimulatingError;
    setIsSimulatingError(next);
    apiClient.simulateServerError = next;
  };

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId) || null;

  const selectCustomer = (id: string | null) => {
    setSelectedCustomerId(id);
  };

  const adjustWalletBalance = async (
    customerId: string,
    amount: number,
    type: 'credit' | 'debit',
    note: string
  ): Promise<ApiResponse<Customer>> => {
    const res = await customerService.adjustWallet(customerId, { amount, type, note });
    if (res.success && res.data) {
      setCustomers(prev => prev.map(c => (c.id === customerId ? res.data! : c)));
    }
    return res;
  };

  const adjustLoyaltyPoints = async (
    customerId: string,
    points: number,
    type: 'credit' | 'debit',
    note: string
  ): Promise<ApiResponse<Customer>> => {
    const res = await customerService.adjustLoyalty(customerId, { points, type, note });
    if (res.success && res.data) {
      setCustomers(prev => prev.map(c => (c.id === customerId ? res.data! : c)));
    }
    return res;
  };

  const toggleCustomerStatus = async (customerId: string): Promise<ApiResponse<Customer>> => {
    const res = await customerService.toggleStatus(customerId);
    if (res.success && res.data) {
      setCustomers(prev => prev.map(c => (c.id === customerId ? res.data! : c)));
    }
    return res;
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        selectedCustomer,
        selectedCustomerId,
        isLoading,
        fetchError,
        isSimulatingError,
        toggleSimulatedError,
        reloadCustomers,
        selectCustomer,
        adjustWalletBalance,
        adjustLoyaltyPoints,
        toggleCustomerStatus,
        searchTerm,
        setSearchTerm
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};
