/**
 * Beautiful sign up page with soft pastel theme.
 * Made with love for Girls for Code ♡
 */
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Sparkles, Heart, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

/**
 * Sign up page component.
 * @param {Object} props - Component props
 * @param {Function} props.onSwitchToLogin - Switch to login view
 */
function SignUpPage({ onSwitchToLogin }) {
  const { signUp, error, clearError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setLocalError('');

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setLocalError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password should be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password, name);
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
        {/* Back Button */}
        <button
          onClick={onSwitchToLogin}
          className="flex items-center gap-2 text-text-secondary hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to login</span>
        </button>

        {/* Logo and Welcome */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-coral mb-4 shadow-glow-primary animate-float">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-heading font-bold gradient-text mb-2">
            Join Lumina!
          </h1>
          <p className="text-text-secondary">
            Start your learning adventure today ✨
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="auth-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="input-field w-full pl-12"
                aria-label="Your name"
                disabled={isLoading}
              />
            </div>

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
                placeholder="Create a password"
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

            {/* Confirm Password Field */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="input-field w-full pl-12"
                aria-label="Confirm password"
                disabled={isLoading}
              />
            </div>

            {/* Password Requirements */}
            <div className="bg-soft-lavender/50 rounded-xl p-3">
              <p className="text-xs text-text-secondary">
                Password should be at least 6 characters long 🔐
              </p>
            </div>

            {/* Error Message */}
            {displayError && (
              <div className="bg-error/10 border border-error/30 text-error rounded-xl p-3 text-sm animate-fade-in">
                {displayError}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              className="w-full"
            >
              {isLoading ? 'Creating your account...' : 'Create Account'}
              <Heart className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* Terms */}
          <p className="text-xs text-text-muted text-center mt-4">
            By signing up, you agree to learn with joy and curiosity! 📚
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-text-muted mt-6">
          Made with 💕 for Girls for Code Hackathon 2026
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
