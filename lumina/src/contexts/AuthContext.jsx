/**
 * Authentication context for managing user state across the app.
 * Made with love for Girls for Code ♡
 */
import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../services/firebase';

const AuthContext = createContext(null);

/**
 * Custom hook to access auth context.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * Auth provider component.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if Firebase is configured
  const firebaseReady = isFirebaseConfigured();

  // Listen for auth state changes
  useEffect(() => {
    if (!firebaseReady || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firebaseReady]);

  /**
   * Sign up with email and password.
   */
  async function signUp(email, password, displayName) {
    if (!firebaseReady || !auth) {
      throw new Error('Firebase is not configured');
    }

    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Update display name
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }

      return result.user;
    } catch (err) {
      const message = getErrorMessage(err.code);
      setError(message);
      throw new Error(message);
    }
  }

  /**
   * Sign in with email and password.
   */
  async function signIn(email, password) {
    if (!firebaseReady || !auth) {
      throw new Error('Firebase is not configured');
    }

    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (err) {
      const message = getErrorMessage(err.code);
      setError(message);
      throw new Error(message);
    }
  }

  /**
   * Sign out the current user.
   */
  async function logOut() {
    if (!firebaseReady || !auth) {
      throw new Error('Firebase is not configured');
    }

    setError(null);
    try {
      await signOut(auth);
    } catch (err) {
      const message = getErrorMessage(err.code);
      setError(message);
      throw new Error(message);
    }
  }

  /**
   * Send password reset email.
   */
  async function resetPassword(email) {
    if (!firebaseReady || !auth) {
      throw new Error('Firebase is not configured');
    }

    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      const message = getErrorMessage(err.code);
      setError(message);
      throw new Error(message);
    }
  }

  /**
   * Clear any auth errors.
   */
  function clearError() {
    setError(null);
  }

  const value = {
    user,
    loading,
    error,
    firebaseReady,
    signUp,
    signIn,
    logOut,
    resetPassword,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Convert Firebase error codes to user-friendly messages.
 */
function getErrorMessage(errorCode) {
  const errorMessages = {
    'auth/email-already-in-use': 'This email is already registered. Try signing in instead! 💕',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/operation-not-allowed': 'Email/password sign-in is not enabled.',
    'auth/weak-password': 'Please choose a stronger password (at least 6 characters).',
    'auth/user-disabled': 'This account has been disabled. Please contact support.',
    'auth/user-not-found': "We couldn't find an account with this email. Want to sign up instead?",
    'auth/wrong-password': 'Incorrect password. Please try again or reset your password.',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/invalid-credential': 'Invalid email or password. Please try again.',
  };

  return errorMessages[errorCode] || 'Something went wrong. Please try again.';
}

export default AuthContext;
