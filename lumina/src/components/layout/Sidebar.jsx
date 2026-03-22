/**
 * Sidebar component with session history, subject selector, and mastery display.
 * Made with love for Girls for Code ♡
 */
import { useState } from 'react';
import { History, ChevronLeft, ChevronRight, Trash2, Sparkles, Heart } from 'lucide-react';
import SubjectSelector from '../controls/SubjectSelector';
import { MasteryRings } from '../mastery/MasteryRing';
import Button from '../ui/Button';

/**
 * Sidebar component with soft pastel styling.
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col border-r border-primary/10 bg-white/60 backdrop-blur-sm
          transition-all duration-300
          ${isCollapsed ? 'w-0 overflow-hidden' : 'w-72'}
        `}
        aria-label="Sidebar"
      >
        {/* Toggle Button */}
        <button
          onClick={onToggleCollapse}
          className="absolute left-[calc(100%-12px)] top-1/2 -translate-y-1/2 z-10
                     w-6 h-12 bg-white border border-primary/20 rounded-r-xl
                     flex items-center justify-center text-text-secondary
                     hover:text-primary hover:bg-soft-pink transition-all shadow-soft"
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
          <div className="p-4 border-b border-primary/10">
            <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-primary" />
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
                <History className="w-4 h-4 text-accent" aria-hidden="true" />
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Topics Explored
                </h3>
              </div>
              {topics.length > 0 && (
                <button
                  onClick={onClearHistory}
                  aria-label="Clear history"
                  className="p-1.5 text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {topics.length === 0 ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-soft-lavender flex items-center justify-center">
                    <History className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-text-muted text-sm">
                    Your learning journey starts here! ✨
                  </p>
                </div>
              ) : (
                <ul className="space-y-2" role="list">
                  {topics.map((topic, index) => (
                    <li key={`${topic}-${index}`}>
                      <button
                        onClick={() => onTopicClick(topic)}
                        className="w-full text-left px-3 py-2.5 rounded-xl text-sm
                                   text-text-secondary bg-white/50 border border-primary/10
                                   hover:text-primary hover:bg-soft-pink hover:border-primary/20
                                   transition-all truncate shadow-sm"
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
          <div className="border-t border-primary/10 bg-soft-lavender/20">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                  <Heart className="w-3 h-3 text-primary" />
                  Mastery
                </h3>
                {streak > 0 && (
                  <span className="love-badge">
                    ✨ {streak} streak
                  </span>
                )}
              </div>
            </div>
            <MasteryRings masteryList={masteryList} />
          </div>

          {/* Made with Love */}
          <div className="p-4 border-t border-primary/10 text-center">
            <p className="text-xs text-text-muted flex items-center justify-center gap-1">
              Made with <Heart className="w-3 h-3 text-primary fill-primary" /> for learning
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Sheet Trigger */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-24 left-4 z-40 p-3 bg-white border-2 border-primary/20
                   rounded-2xl shadow-soft hover:bg-soft-pink hover:border-primary/30 transition-all"
        aria-label="Open sidebar"
      >
        <History className="w-5 h-5 text-primary" />
      </button>

      {/* Mobile Bottom Sheet */}
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-text-primary/30 backdrop-blur-sm z-40"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Sheet */}
          <div className="lg:hidden fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl
                          border-t border-primary/10 max-h-[70vh] overflow-auto animate-slide-up shadow-soft-lg">
            <div className="p-5">
              {/* Handle */}
              <div className="w-12 h-1.5 bg-primary/20 rounded-full mx-auto mb-5" />

              {/* Subject Selector */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-primary" />
                  Subject
                </h3>
                <SubjectSelector value={subject} onChange={onSubjectChange} />
              </div>

              {/* Session History */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <History className="w-3 h-3 text-accent" />
                  Topics Explored
                </h3>
                {topics.length === 0 ? (
                  <p className="text-text-muted text-sm">Start learning something new! ✨</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic, index) => (
                      <button
                        key={`${topic}-${index}`}
                        onClick={() => {
                          onTopicClick(topic);
                          setIsMobileOpen(false);
                        }}
                        className="px-4 py-2 bg-soft-lavender rounded-full text-sm text-text-secondary
                                   hover:text-primary hover:bg-soft-pink transition-all border border-primary/10"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mastery */}
              <div>
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Heart className="w-3 h-3 text-primary" />
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
