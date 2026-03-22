/**
 * Main application shell layout wrapper with soft pastel theme.
 * Made with love for Girls for Code ♡
 */
import { useState } from 'react';
import { Sparkles, HelpCircle, LogOut, Type, Heart, Globe } from 'lucide-react';
import Sidebar from './Sidebar';
import MetricsBar from '../ui/MetricsBar';
import GradeToggle from '../controls/GradeToggle';
import { useAuth } from '../../contexts/AuthContext';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * App shell component.
 */
function AppShell({
  children,
  gradeLevel = 8,
  onGradeChange,
  subject = 'general',
  onSubjectChange,
  topics = [],
  onTopicClick,
  masteryList = [],
  streak = 0,
  onClearHistory,
  isLoading = false,
}) {
  const { user, logOut, firebaseReady } = useAuth();
  const { dyslexiaMode, toggleDyslexiaMode } = useAccessibility();
  const { toggleLanguage, config } = useLanguage();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      // Handle error silently
    }
  };

  // Get user's first name or email
  const userName = user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'Learner';

  return (
    <div className="h-screen flex flex-col bg-background pattern-dots">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-primary/10 bg-white/80 backdrop-blur-md shadow-soft">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-coral flex items-center justify-center shadow-glow-primary">
              <Sparkles className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold gradient-text">
                Lumina
              </h1>
              <p className="text-xs text-text-secondary hidden sm:block">
                Your AI Learning Companion ✨
              </p>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* Grade Dropdown */}
            <div className="hidden md:block">
              <GradeToggle
                value={gradeLevel}
                onChange={onGradeChange}
                disabled={isLoading}
                compact
              />
            </div>

            {/* User Menu */}
            {firebaseReady && user && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-soft-lavender hover:bg-primary/10 transition-all"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-text-primary">
                    {userName}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-soft-lg border border-primary/10 overflow-hidden z-20 animate-slide-down">
                      <div className="px-4 py-3 border-b border-primary/10">
                        <p className="text-sm font-medium text-text-primary">{user.displayName || 'Student'}</p>
                        <p className="text-xs text-text-muted truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 flex items-center gap-2 text-sm text-text-secondary hover:bg-soft-pink hover:text-primary transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-xl text-text-secondary hover:text-primary hover:bg-soft-lavender transition-all flex items-center gap-1"
              aria-label="Toggle language"
              title={`Switch to ${config.code === 'en' ? 'Hindi' : 'English'}`}
            >
              <Globe className="w-5 h-5" />
              <span className="text-xs font-bold">{config.label}</span>
            </button>

            {/* Dyslexia Mode Toggle */}
            <button
              onClick={toggleDyslexiaMode}
              className={`
                p-2 rounded-xl transition-all flex items-center gap-1
                ${dyslexiaMode
                  ? 'bg-primary/20 text-primary'
                  : 'text-text-secondary hover:text-primary hover:bg-soft-lavender'
                }
              `}
              aria-label="Toggle dyslexia-friendly font"
              aria-pressed={dyslexiaMode}
              title={dyslexiaMode ? 'Dyslexia mode on' : 'Dyslexia mode off'}
            >
              <Type className="w-5 h-5" />
              <span className="text-xs font-bold hidden sm:inline">Aa</span>
            </button>

            {/* Help Button */}
            <button
              className="p-2 text-text-secondary hover:text-primary hover:bg-soft-lavender rounded-xl transition-all"
              aria-label="Help"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Grade Selector */}
        <div className="md:hidden px-4 pb-3">
          <GradeToggle
            value={gradeLevel}
            onChange={onGradeChange}
            disabled={isLoading}
            compact
          />
        </div>
      </header>

      {/* Impact Metrics Bar */}
      <MetricsBar />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar */}
        <Sidebar
          subject={subject}
          onSubjectChange={onSubjectChange}
          topics={topics}
          onTopicClick={onTopicClick}
          masteryList={masteryList}
          streak={streak}
          onClearHistory={onClearHistory}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden bg-background-alt/50">
          {children}
        </main>
      </div>

      {/* Made with Love Footer (mobile only) */}
      <div className="md:hidden bg-white/80 backdrop-blur-sm border-t border-primary/10 py-2 text-center">
        <p className="text-xs text-text-muted flex items-center justify-center gap-1">
          Made with <Heart className="w-3 h-3 text-primary fill-primary" /> for Girls for Code
        </p>
      </div>
    </div>
  );
}

export default AppShell;
