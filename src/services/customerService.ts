import { apiClient, ApiResponse } from './apiClient';
import { Customer, WalletTransaction, LoyaltyTransaction } from '../types/customer';
import { mockCustomers } from '../data/mockCustomers';

export interface WalletAdjustmentDto {
  amount: number;
  type: 'credit' | 'debit';
  note: string;
}

export interface LoyaltyAdjustmentDto {
  points: number;
  type: 'credit' | 'debit';
  note: string;
}

class CustomerService {
  private customers: Customer[] = [...mockCustomers];

  public async getCustomers(): Promise<ApiResponse<Customer[]>> {
    return apiClient.request<Customer[]>('/api/admin/customers', 'GET', this.customers);
  }

  public async getCustomerById(id: string): Promise<ApiResponse<Customer>> {
    const customer = this.customers.find(c => c.id === id);
    if (!customer) {
      return {
        success: false,
        error: {
          status: 404,
          message: `Customer with ID #${id} does not exist or has been archived.`,
          code: 'ERR_CUSTOMER_NOT_FOUND',
          timestamp: new Date().toISOString()
        }
      };
    }
    return apiClient.request<Customer>(`/api/admin/customers/${id}`, 'GET', customer);
  }

  public async adjustWallet(
    customerId: string,
    dto: WalletAdjustmentDto
  ): Promise<ApiResponse<Customer>> {
    const customer = this.customers.find(c => c.id === customerId);

    const validationCheck = () => {
      const errors: Record<string, string> = {};
      if (!dto.amount || dto.amount <= 0) {
        errors.amount = 'Amount must be greater than ₹0.00.';
      }
      if (dto.amount > 100000) {
        errors.amount = 'Single transaction cannot exceed limit of ₹100,000.00.';
      }
      if (dto.type === 'debit') {
        if (!customer) {
          errors.customer = 'Customer not found.';
        } else if (dto.amount > customer.walletBalance) {
          errors.amount = `Insufficient wallet balance. Current balance is only ₹${customer.walletBalance.toFixed(2)}. Overdraft is not permitted.`;
        }
      }
      if (!dto.note || dto.note.trim().length < 5) {
        errors.note = 'Audit note is mandatory (minimum 5 characters) for regulatory compliance.';
      }
      return Object.keys(errors).length > 0 ? errors : null;
    };

    const res = await apiClient.request<Customer>(
      `/api/admin/customers/${customerId}/wallet-adjust`,
      'POST',
      dto,
      validationCheck
    );

    if (!res.success) {
      return res;
    }

    // Apply mutation if validation and server call passed
    if (customer) {
      const delta = dto.type === 'credit' ? dto.amount : -dto.amount;
      customer.walletBalance = Math.max(0, customer.walletBalance + delta);
      const newTx: WalletTransaction = {
        id: `tx-${Date.now().toString().slice(-4)}`,
        amount: dto.amount,
        type: dto.type === 'credit' ? 'deposit' : 'debit',
        paymentMethod: 'system',
        status: 'completed',
        description: dto.note,
        reference: `ADJ-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
      };
      customer.walletTransactions = [newTx, ...customer.walletTransactions];
      return { success: true, data: { ...customer } };
    }

    return res;
  }

  public async adjustLoyalty(
    customerId: string,
    dto: LoyaltyAdjustmentDto
  ): Promise<ApiResponse<Customer>> {
    const customer = this.customers.find(c => c.id === customerId);

    const validationCheck = () => {
      const errors: Record<string, string> = {};
      if (!dto.points || dto.points <= 0 || !Number.isInteger(dto.points)) {
        errors.points = 'Points must be a positive whole integer.';
      }
      if (dto.type === 'debit') {
        if (!customer) {
          errors.customer = 'Customer not found.';
        } else if (dto.points > customer.loyaltyPoints) {
          errors.points = `Cannot debit ${dto.points} points. Customer currently only holds ${customer.loyaltyPoints} points.`;
        }
      }
      if (!dto.note || dto.note.trim().length < 5) {
        errors.note = 'Audit reason is mandatory (minimum 5 characters).';
      }
      return Object.keys(errors).length > 0 ? errors : null;
    };

    const res = await apiClient.request<Customer>(
      `/api/admin/customers/${customerId}/loyalty-adjust`,
      'POST',
      dto,
      validationCheck
    );

    if (!res.success) {
      return res;
    }

    if (customer) {
      const delta = dto.type === 'credit' ? dto.points : -dto.points;
      customer.loyaltyPoints = Math.max(0, customer.loyaltyPoints + delta);
      const newTx: LoyaltyTransaction = {
        id: `lp-${Date.now().toString().slice(-4)}`,
        points: dto.points,
        type: dto.type,
        status: 'active',
        expiryDays: 90,
        description: dto.note,
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
      };
      customer.loyaltyTransactions = [newTx, ...customer.loyaltyTransactions];
      return { success: true, data: { ...customer } };
    }

    return res;
  }

  public async toggleStatus(customerId: string): Promise<ApiResponse<Customer>> {
    const customer = this.customers.find(c => c.id === customerId);
    if (!customer) {
      return {
        success: false,
        error: {
          status: 404,
          message: 'Customer not found.',
          code: 'ERR_CUSTOMER_NOT_FOUND',
          timestamp: new Date().toISOString()
        }
      };
    }

    const res = await apiClient.request<Customer>(
      `/api/admin/customers/${customerId}/status`,
      'PATCH',
      { status: customer.status === 'active' ? 'blocked' : 'active' }
    );

    if (res.success && customer) {
      customer.status = customer.status === 'active' ? 'blocked' : 'active';
      return { success: true, data: { ...customer } };
    }

    return res;
  }
}

export const customerService = new CustomerService();
