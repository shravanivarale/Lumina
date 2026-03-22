/**
 * Beautiful login page with soft pastel theme.
 * Made with love for Girls for Code ♡
 */
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles, Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

/**
 * Login page component.
 * @param {Object} props - Component props
 * @param {Function} props.onSwitchToSignUp - Switch to sign up view
 */
function LoginPage({ onSwitchToSignUp }) {
  const { signIn, resetPassword, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setLocalError('');

    if (!email || !password) {
      setLocalError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
    } catch (err) {
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setLocalError('Please enter your email first');
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (err) {
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-background pattern-dots flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Welcome */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mb-4 shadow-glow-primary animate-float">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-heading font-bold gradient-text mb-2">
            Welcome Back!
          </h1>
          <p className="text-text-secondary">
            So happy to see you again! Let's continue learning ✨
          </p>
        </div>

        {/* Login Form */}
        <div className="auth-card">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="input-field w-full pl-12"
                aria-label="Email address"
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="input-field w-full pl-12 pr-12"
                aria-label="Password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Error Message */}
            {displayError && (
              <div className="bg-error/10 border border-error/30 text-error rounded-xl p-3 text-sm animate-fade-in">
                {displayError}
              </div>
            )}

            {/* Reset Password Success */}
            {resetSent && (
              <div className="bg-success/10 border border-success/30 text-success-700 rounded-xl p-3 text-sm animate-fade-in">
                Password reset email sent! Check your inbox 💌
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              className="w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              <Heart className="w-4 h-4 ml-2" />
            </Button>

            {/* Forgot Password */}
            <button
              type="button"
              onClick={handleResetPassword}
              disabled={isLoading}
              className="w-full text-center text-sm text-text-secondary hover:text-primary transition-colors"
            >
              Forgot your password?
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary/20" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-text-muted">or</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-text-secondary mb-3">
              New to Lumina?
            </p>
            <Button
              variant="secondary"
              onClick={onSwitchToSignUp}
              className="w-full"
            >
              Create an Account ✨
            </Button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-text-muted mt-6">
          Made with 💕 for GIRLS IN CODE Hackathon 2026
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
