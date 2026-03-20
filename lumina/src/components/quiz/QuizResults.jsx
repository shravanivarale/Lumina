/**
 * Quiz results component showing score and mastery update.
 */
import { Trophy, RotateCcw, ArrowRight, Star } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

/**
 * Get result tier based on score percentage.
 */
function getResultTier(score, total) {
  const percentage = (score / total) * 100;
  if (percentage === 100) return 'perfect';
  if (percentage >= 66) return 'good';
  return 'needsWork';
}

/**
 * Result tier configurations.
 */
const TIER_CONFIG = {
  perfect: {
    title: 'Perfect Score!',
    icon: Trophy,
    iconColor: 'text-amber-400',
    bgGradient: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30',
  },
  good: {
    title: 'Great Job!',
    icon: Star,
    iconColor: 'text-success',
    bgGradient: 'from-success/20 to-emerald-500/20',
    borderColor: 'border-success/30',
  },
  needsWork: {
    title: 'Keep Learning!',
    icon: Star,
    iconColor: 'text-primary',
    bgGradient: 'from-primary/20 to-violet-500/20',
    borderColor: 'border-primary/30',
  },
};

/**
 * Quiz results component.
 * @param {Object} props - Component props
 * @param {string} props.topic - Quiz topic
 * @param {number} props.score - Number of correct answers
 * @param {number} props.total - Total number of questions
 * @param {string} props.encouragement - Encouragement message
 * @param {Function} props.onRetry - Callback to retry quiz
 * @param {Function} props.onContinue - Callback to continue learning
 */
function QuizResults({
  topic,
  score,
  total,
  encouragement,
  onRetry,
  onContinue,
}) {
  const tier = getResultTier(score, total);
  const config = TIER_CONFIG[tier];
  const Icon = config.icon;
  const percentage = Math.round((score / total) * 100);

  return (
    <Card
      className={`
        w-full max-w-md mx-auto text-center animate-fade-in
        bg-gradient-to-br ${config.bgGradient} ${config.borderColor}
      `}
      padding="p-8"
    >
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div
          className={`
            w-20 h-20 rounded-full bg-surface flex items-center justify-center
            ${tier === 'perfect' ? 'shadow-glow-accent' : 'shadow-glow-primary'}
          `}
        >
          <Icon className={`w-10 h-10 ${config.iconColor}`} aria-hidden="true" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-heading font-semibold text-white mb-2">
        {config.title}
      </h2>

      {/* Topic */}
      <p className="text-text-secondary mb-6">
        Topic: <span className="text-white">{topic}</span>
      </p>

      {/* Score Display */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="text-center">
          <div className="text-4xl font-heading font-bold text-white">
            {score}/{total}
          </div>
          <div className="text-text-secondary text-sm mt-1">Correct</div>
        </div>

        <div className="w-px h-12 bg-white/10" aria-hidden="true" />

        <div className="text-center">
          <div className="text-4xl font-heading font-bold text-white">
            {percentage}%
          </div>
          <div className="text-text-secondary text-sm mt-1">Mastery</div>
        </div>
      </div>

      {/* Encouragement */}
      <p className="text-text-primary mb-8">{encouragement}</p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="secondary"
          onClick={onRetry}
          aria-label="Retry this quiz"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          Try Again
        </Button>

        <Button onClick={onContinue} aria-label="Continue learning">
          Continue Learning
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Button>
      </div>
    </Card>
  );
}

export default QuizResults;
