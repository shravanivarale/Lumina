/**
 * Sidebar component with session history, subject selector, and mastery display.
 */
import { useState } from 'react';
import { History, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import SubjectSelector from '../controls/SubjectSelector';
import { MasteryRings } from '../mastery/MasteryRing';
import Button from '../ui/Button';
import Card from '../ui/Card';

/**
 * Sidebar component.
 * @param {Object} props - Component props
 * @param {string} props.subject - Current subject
 * @param {Function} props.onSubjectChange - Subject change handler
 * @param {Array} props.topics - Session history topics
 * @param {Function} props.onTopicClick - Topic click handler
 * @param {Array} props.masteryList - Mastery records
 * @param {number} props.streak - Current streak
 * @param {Function} props.onClearHistory - Clear history handler
 * @param {boolean} props.isCollapsed - Whether sidebar is collapsed
 * @param {Function} props.onToggleCollapse - Toggle collapse handler
 */
function Sidebar({
  subject = 'general',
  onSubjectChange,
  topics = [],
  onTopicClick,
  masteryList = [],
  streak = 0,
  onClearHistory,
  isCollapsed = false,
  onToggleCollapse,
}) {
  // Mobile bottom sheet state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col border-r border-white/5 bg-surface/50
          transition-all duration-300
          ${isCollapsed ? 'w-0 overflow-hidden' : 'w-72'}
        `}
        aria-label="Sidebar"
      >
        {/* Toggle Button */}
        <button
          onClick={onToggleCollapse}
          className="absolute left-[calc(100%-12px)] top-1/2 -translate-y-1/2 z-10
                     w-6 h-12 bg-surface border border-white/10 rounded-r-lg
                     flex items-center justify-center text-text-secondary
                     hover:text-white hover:bg-white/5 transition-all"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Subject Selector */}
          <div className="p-4 border-b border-white/5">
            <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
              Subject
            </h3>
            <SubjectSelector
              value={subject}
              onChange={onSubjectChange}
              compact
            />
          </div>

          {/* Session History */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-text-secondary" aria-hidden="true" />
                <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Session History
                </h3>
              </div>
              {topics.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearHistory}
                  aria-label="Clear history"
                  className="p-1 h-auto"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {topics.length === 0 ? (
                <p className="text-text-secondary text-sm text-center py-4">
                  No topics explored yet
                </p>
              ) : (
                <ul className="space-y-2" role="list">
                  {topics.map((topic, index) => (
                    <li key={`${topic}-${index}`}>
                      <button
                        onClick={() => onTopicClick(topic)}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm
                                   text-text-secondary hover:text-white hover:bg-white/5
                                   transition-all truncate"
                      >
                        {topic}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Mastery Section */}
          <div className="border-t border-white/5">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Mastery
                </h3>
                {streak > 0 && (
                  <span className="text-xs text-accent">
                    🔥 {streak} streak
                  </span>
                )}
              </div>
            </div>
            <MasteryRings masteryList={masteryList} />
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Sheet Trigger */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-20 left-4 z-40 p-3 bg-surface border border-white/10
                   rounded-full shadow-lg hover:bg-white/10 transition-all"
        aria-label="Open sidebar"
      >
        <History className="w-5 h-5 text-text-secondary" />
      </button>

      {/* Mobile Bottom Sheet */}
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Sheet */}
          <div className="lg:hidden fixed inset-x-0 bottom-0 z-50 bg-surface rounded-t-2xl
                          border-t border-white/10 max-h-[70vh] overflow-auto animate-slide-up">
            <div className="p-4">
              {/* Handle */}
              <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />

              {/* Subject Selector */}
              <div className="mb-6">
                <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
                  Subject
                </h3>
                <SubjectSelector value={subject} onChange={onSubjectChange} />
              </div>

              {/* Session History */}
              <div className="mb-6">
                <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
                  Session History
                </h3>
                {topics.length === 0 ? (
                  <p className="text-text-secondary text-sm">No topics explored yet</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic, index) => (
                      <button
                        key={`${topic}-${index}`}
                        onClick={() => {
                          onTopicClick(topic);
                          setIsMobileOpen(false);
                        }}
                        className="px-3 py-1.5 bg-white/5 rounded-full text-sm text-text-secondary
                                   hover:text-white hover:bg-white/10 transition-all"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mastery */}
              <div>
                <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
                  Mastery Progress
                </h3>
                <MasteryRings masteryList={masteryList} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Sidebar;
