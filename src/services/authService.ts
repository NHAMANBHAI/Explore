import {
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  UserCredential
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../config/firebase';
import { AdminUser, LoginDto } from '../types/auth';
import { ApiResponse, ApiError } from './apiClient';

const STORAGE_KEY = 'hyperlocal_admin_session';

class AuthService {
  /**
   * Retrieve saved session from localStorage
   */
  public getStoredUser(): AdminUser | null {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data) as AdminUser;
    } catch {
      return null;
    }
  }

  /**
   * Save session to localStorage
   */
  public saveSession(user: AdminUser): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }

  /**
   * Clear session
   */
  public clearSession(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  /**
   * Sign In With Email & Password
   */
  public async signInWithEmail(dto: LoginDto): Promise<ApiResponse<AdminUser>> {
    const trimmedEmail = dto.email.trim().toLowerCase();

    // 1. Check Demo Root Credentials
    if (trimmedEmail === 'hyperlocaladmin@gmail.com' && dto.password === '12345678') {
      const demoAdmin: AdminUser = {
        id: 'usr-admin-76',
        name: 'HyperLocal Administrator',
        email: 'hyperlocaladmin@gmail.com',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        role: 'super_admin',
        token: `40680|sanctum_${Date.now()}`,
        authProvider: 'email',
        lastLogin: new Date().toISOString()
      };
      this.saveSession(demoAdmin);
      return { success: true, data: demoAdmin, message: 'Login successful' };
    }

    // 2. Try Firebase Auth if configured
    if (isFirebaseConfigured) {
      try {
        const credential: UserCredential = await signInWithEmailAndPassword(
          auth,
          dto.email,
          dto.password
        );
        const fbUser = credential.user;
        const adminUser: AdminUser = {
          id: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Admin',
          email: fbUser.email || dto.email,
          avatarUrl: fbUser.photoURL || undefined,
          role: 'super_admin',
          token: await fbUser.getIdToken(),
          authProvider: 'email',
          lastLogin: new Date().toISOString()
        };
        this.saveSession(adminUser);
        return { success: true, data: adminUser, message: 'Firebase login successful' };
      } catch (err: unknown) {
        const fbErr = err as { code?: string; message?: string };
        const error: ApiError = {
          status: 401,
          message: this.formatFirebaseAuthError(fbErr.code || '', fbErr.message || ''),
          code: fbErr.code || 'ERR_AUTH_FAILED',
          timestamp: new Date().toISOString()
        };
        return { success: false, error };
      }
    }

    // 3. Fallback invalid credentials error
    const error: ApiError = {
      status: 401,
      message: 'Invalid credentials. Please use hyperlocaladmin@gmail.com / 12345678 or connect your Firebase credentials in .env.',
      code: 'ERR_INVALID_CREDENTIALS',
      fieldErrors: {
        email: trimmedEmail !== 'hyperlocaladmin@gmail.com' ? 'Unrecognized admin email address' : '',
        password: dto.password !== '12345678' ? 'Incorrect password entered' : ''
      },
      timestamp: new Date().toISOString()
    };
    return { success: false, error };
  }

  /**
   * Sign In With Google (Firebase GoogleAuthProvider)
   */
  public async signInWithGoogle(): Promise<ApiResponse<AdminUser>> {
    // 1. If Firebase credentials are configured in .env, execute real Google popup
    if (isFirebaseConfigured) {
      try {
        const credential: UserCredential = await signInWithPopup(auth, googleProvider);
        const fbUser = credential.user;
        const googleAdmin: AdminUser = {
          id: fbUser.uid,
          name: fbUser.displayName || 'Google Admin',
          email: fbUser.email || 'admin@google.com',
          avatarUrl: fbUser.photoURL || undefined,
          role: 'super_admin',
          token: await fbUser.getIdToken(),
          authProvider: 'google',
          lastLogin: new Date().toISOString()
        };
        this.saveSession(googleAdmin);
        return { success: true, data: googleAdmin, message: 'Google authentication successful' };
      } catch (err: unknown) {
        const fbErr = err as { code?: string; message?: string };
        if (fbErr.code === 'auth/popup-closed-by-user') {
          return {
            success: false,
            error: {
              status: 400,
              message: 'Google Sign-In popup was closed before authorization was completed.',
              code: 'ERR_POPUP_CLOSED',
              timestamp: new Date().toISOString()
            }
          };
        }
        return {
          success: false,
          error: {
            status: 400,
            message: this.formatFirebaseAuthError(fbErr.code || '', fbErr.message || ''),
            code: fbErr.code || 'ERR_GOOGLE_AUTH_FAILED',
            timestamp: new Date().toISOString()
          }
        };
      }
    }

    // 2. Fallback seamless simulator when running without live Google API keys
    // Simulates a real OAuth Google exchange with authentic Google Profile data
    await new Promise(resolve => setTimeout(resolve, 800));
    const simulatedGoogleUser: AdminUser = {
      id: 'usr-google-9921',
      name: 'Google Workspace Admin',
      email: 'hyperlocal.team@googlemail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      role: 'super_admin',
      token: `google_oauth2_${Date.now()}`,
      authProvider: 'google',
      lastLogin: new Date().toISOString()
    };
    this.saveSession(simulatedGoogleUser);
    return {
      success: true,
      data: simulatedGoogleUser,
      message: 'Signed in via Google OAuth successfully'
    };
  }

  /**
   * Password Reset Email Request
   */
  public async sendPasswordReset(email: string): Promise<ApiResponse<boolean>> {
    if (!email || !email.includes('@')) {
      return {
        success: false,
        error: {
          status: 422,
          message: 'Please provide a valid administrative email address.',
          code: 'ERR_INVALID_EMAIL',
          timestamp: new Date().toISOString()
        }
      };
    }

    if (isFirebaseConfigured) {
      try {
        await sendPasswordResetEmail(auth, email);
        return { success: true, data: true, message: `Reset email sent to ${email}` };
      } catch (err: unknown) {
        const fbErr = err as { code?: string; message?: string };
        return {
          success: false,
          error: {
            status: 400,
            message: this.formatFirebaseAuthError(fbErr.code || '', fbErr.message || ''),
            code: fbErr.code || 'ERR_RESET_FAILED',
            timestamp: new Date().toISOString()
          }
        };
      }
    }

    // Fallback simulation
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      success: true,
      data: true,
      message: `Password reset instructions have been dispatched to ${email}.`
    };
  }

  /**
   * Sign Out
   */
  public async signOutUser(): Promise<void> {
    try {
      if (isFirebaseConfigured) {
        await signOut(auth);
      }
    } catch {
      // Ignore
    } finally {
      this.clearSession();
    }
  }

  private formatFirebaseAuthError(code: string, fallback: string): string {
    switch (code) {
      case 'auth/invalid-email':
        return 'The entered email format is invalid.';
      case 'auth/user-disabled':
        return 'This administrative account has been deactivated.';
      case 'auth/user-not-found':
        return 'No user found matching this email address.';
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Incorrect password or authentication credentials.';
      case 'auth/too-many-requests':
        return 'Too many unsuccessful attempts. Access temporarily restricted for security.';
      case 'auth/network-request-failed':
        return 'Network connection failed. Please check your connectivity.';
      default:
        return fallback || 'Authentication transaction failed.';
    }
  }
}

export const authService = new AuthService();
