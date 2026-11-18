import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';

/**
 * Firebase Client Configuration
 * Supports Next.js environment variables (NEXT_PUBLIC_FIREBASE_*)
 */
const getEnv = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  return undefined;
};

const firebaseConfig = {
  apiKey: getEnv('NEXT_PUBLIC_FIREBASE_API_KEY') || 'AIzaSyDemoFallbackKeyForAdminPortal-7389',
  authDomain: getEnv('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN') || 'hyperlocal-admin.firebaseapp.com',
  projectId: getEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID') || 'hyperlocal-admin',
  storageBucket: getEnv('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET') || 'hyperlocal-admin.appspot.com',
  messagingSenderId: getEnv('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID') || '1029384756',
  appId: getEnv('NEXT_PUBLIC_FIREBASE_APP_ID') || '1:1029384756:web:abcdef123456',
};

// Initialize Firebase safely (client-side only or singleton)
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth: Auth = getAuth(app);
export const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const isFirebaseConfigured = Boolean(
  getEnv('NEXT_PUBLIC_FIREBASE_API_KEY') && getEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID')
);

export default app;
