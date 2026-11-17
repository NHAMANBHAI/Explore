import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, LoginDto } from '../types/auth';
import { authService } from '../services/authService';
import { ApiResponse } from '../services/apiClient';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authError: string | null;
  isSessionExpiredModalOpen: boolean;
  loginWithEmail: (dto: LoginDto) => Promise<ApiResponse<AdminUser>>;
  loginWithGoogle: () => Promise<ApiResponse<AdminUser>>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<ApiResponse<boolean>>;
  triggerSessionExpired: () => void;
  closeSessionExpiredModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => authService.getStoredUser());
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSessionExpiredModalOpen, setIsSessionExpiredModalOpen] = useState(false);

  useEffect(() => {
    // If no user stored, verify if we should pre-authenticate or leave at login
    const stored = authService.getStoredUser();
    if (stored) {
      setUser(stored);
    }
  }, []);

  const loginWithEmail = async (dto: LoginDto): Promise<ApiResponse<AdminUser>> => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await authService.signInWithEmail(dto);
      if (res.success && res.data) {
        setUser(res.data);
        setIsSessionExpiredModalOpen(false);
      } else if (res.error) {
        setAuthError(res.error.message);
      }
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<ApiResponse<AdminUser>> => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await authService.signInWithGoogle();
      if (res.success && res.data) {
        setUser(res.data);
        setIsSessionExpiredModalOpen(false);
      } else if (res.error) {
        setAuthError(res.error.message);
      }
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.signOutUser();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<ApiResponse<boolean>> => {
    return authService.sendPasswordReset(email);
  };

  const triggerSessionExpired = () => {
    setIsSessionExpiredModalOpen(true);
  };

  const closeSessionExpiredModal = () => {
    setIsSessionExpiredModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        authError,
        isSessionExpiredModalOpen,
        loginWithEmail,
        loginWithGoogle,
        logout,
        forgotPassword,
        triggerSessionExpired,
        closeSessionExpiredModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
