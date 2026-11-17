export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'super_admin' | 'dispatcher' | 'catalog_manager' | 'support_lead';
  token: string;
  authProvider: 'email' | 'google';
  lastLogin: string;
}

export interface LoginDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
