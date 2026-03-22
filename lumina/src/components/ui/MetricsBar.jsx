/**
 * Impact metrics bar component showing learning statistics.
 * Made with love for Girls for Code ♡
 */
import { BookOpen, MessageCircle, CheckCircle } from 'lucide-react';
import { useMetrics } from '../../contexts/MetricsContext';

/**
 * Single metric item component.
 */
function MetricItem({ icon: Icon, value, label, isAnimating }) {
  return (
    <div className="flex items-center gap-2 text-text-secondary">
      <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
      <span
        className={`
          font-bold text-text-primary transition-transform duration-300
          ${isAnimating ? 'animate-metric-pulse scale-125 text-primary' : 'scale-100'}
        `}
      >
        {value}
      </span>
      <span className="text-xs hidden sm:inline">{label}</span>
    </div>
  );
}

/**
 * Impact metrics bar component.
 */
function MetricsBar() {
  const { topicsExplored, questionsAsked, quizzesCompleted, recentlyUpdated } = useMetrics();

  return (
    <div className="bg-gradient-to-r from-soft-pink/50 via-soft-lavender/50 to-soft-mint/50 border-b border-primary/10">
      <div className="flex items-center justify-center gap-6 sm:gap-8 py-2 px-4">
        <MetricItem
          icon={BookOpen}
          value={topicsExplored}
          label="Topics Explored"
          isAnimating={recentlyUpdated.topicsExplored}
        />

        <div className="w-px h-4 bg-primary/20" aria-hidden="true" />

        <MetricItem
          icon={MessageCircle}
          value={questionsAsked}
          label="Questions Asked"
          isAnimating={recentlyUpdated.questionsAsked}
        />

        <div className="w-px h-4 bg-primary/20" aria-hidden="true" />

        <MetricItem
          icon={CheckCircle}
          value={quizzesCompleted}
          label="Quizzes Completed"
          isAnimating={recentlyUpdated.quizzesCompleted}
        />
      </div>
    </div>
  );
}

export default MetricsBar;
