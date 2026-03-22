/**
 * Auth page wrapper that manages login/signup views.
 */
import { useState } from 'react';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

function AuthPage() {
  const [view, setView] = useState('login'); // 'login' | 'signup'

  if (view === 'signup') {
    return <SignUpPage onSwitchToLogin={() => setView('login')} />;
  }

  return <LoginPage onSwitchToSignUp={() => setView('signup')} />;
}

export default AuthPage;
