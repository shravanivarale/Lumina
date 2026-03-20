/**
 * Main application shell layout wrapper.
 */
import { useState } from 'react';
import { Sparkles, HelpCircle } from 'lucide-react';
import Sidebar from './Sidebar';
import GradeToggle from '../controls/GradeToggle';

/**
 * App shell component.
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Main content
 * @param {number} props.gradeLevel - Current grade level
 * @param {Function} props.onGradeChange - Grade change handler
 * @param {string} props.subject - Current subject
 * @param {Function} props.onSubjectChange - Subject change handler
 * @param {Array} props.topics - Session history topics
 * @param {Function} props.onTopicClick - Topic click handler
 * @param {Array} props.masteryList - Mastery records
 * @param {number} props.streak - Current streak
 * @param {Function} props.onClearHistory - Clear history handler
 * @param {boolean} props.isLoading - Loading state
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-background grain-texture">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-white/5 bg-surface/50 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-glow-accent">
              <Sparkles className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-semibold text-white">
                Lumina
              </h1>
              <p className="text-xs text-text-secondary hidden sm:block">
                Your AI Tutor
              </p>
            </div>
          </div>

          {/* Grade Toggle */}
          <div className="flex items-center gap-4">
            <GradeToggle
              value={gradeLevel}
              onChange={onGradeChange}
              disabled={isLoading}
            />

            <button
              className="p-2 text-text-secondary hover:text-white transition-colors"
              aria-label="Help"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

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
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppShell;
