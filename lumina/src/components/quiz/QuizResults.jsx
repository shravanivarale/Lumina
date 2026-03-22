/**
 * Quiz results component showing score and mastery update.
 * Made with love for Girls for Code ♡
 */
import { Trophy, RotateCcw, ArrowRight, Star, Heart, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';

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
 * Result tier configurations - soft pastel theme.
 */
const TIER_CONFIG = {
  perfect: {
    title: 'Perfect Score!',
    subtitle: 'You absolutely nailed it!',
    icon: Trophy,
    iconColor: 'text-coral',
    bgGradient: 'from-soft-coral/40 to-soft-pink/40',
    borderColor: 'border-coral/30',
    ringGradient: 'from-coral to-primary',
  },
  good: {
    title: 'Great Job!',
    subtitle: 'You\'re doing wonderfully!',
    icon: Star,
    iconColor: 'text-success',
    bgGradient: 'from-soft-mint/40 to-soft-lavender/40',
    borderColor: 'border-success/30',
    ringGradient: 'from-success to-accent',
  },
  needsWork: {
    title: 'Keep Going!',
    subtitle: 'Every step is progress!',
    icon: Heart,
    iconColor: 'text-primary',
    bgGradient: 'from-soft-pink/40 to-soft-lavender/40',
    borderColor: 'border-primary/30',
    ringGradient: 'from-primary to-accent',
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
  const { config: langConfig } = useLanguage();
  const tier = getResultTier(score, total);
  const config = TIER_CONFIG[tier];
  const Icon = config.icon;
  const percentage = Math.round((score / total) * 100);

  // Get localized tier titles
  const tierTitles = {
    perfect: langConfig.perfectScore,
    good: langConfig.greatJob,
    needsWork: langConfig.keepLearning,
  };

  return (
    <div
      className={`
        soft-card w-full max-w-md mx-auto text-center animate-fade-in overflow-hidden
        bg-gradient-to-br ${config.bgGradient} ${config.borderColor}
      `}
    >
      {/* Decorative header */}
      <div className="h-2 bg-gradient-to-r from-primary via-accent to-coral" />

      <div className="p-8">
        {/* Icon with gradient ring */}
        <div className="flex justify-center mb-6">
          <div
            className={`
              w-24 h-24 rounded-full bg-gradient-to-br ${config.ringGradient}
              flex items-center justify-center shadow-glow-primary animate-float
            `}
          >
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
              <Icon className={`w-10 h-10 ${config.iconColor}`} aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-heading font-bold gradient-text mb-1">
          {tierTitles[tier]}
        </h2>
        <p className="text-text-secondary text-sm mb-4">{config.subtitle}</p>

        {/* Topic */}
        <p className="text-text-secondary mb-6">
          Topic: <span className="text-primary-700 font-medium">{topic}</span>
        </p>

        {/* Score Display - Soft cards */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="bg-white/60 rounded-2xl px-6 py-4 shadow-soft">
            <div className="text-3xl font-heading font-bold text-primary">
              {score}/{total}
            </div>
            <div className="text-text-muted text-xs mt-1 font-medium">{langConfig.correct}</div>
          </div>

          <Sparkles className="w-5 h-5 text-accent" aria-hidden="true" />

          <div className="bg-white/60 rounded-2xl px-6 py-4 shadow-soft">
            <div className="text-3xl font-heading font-bold text-accent-700">
              {percentage}%
            </div>
            <div className="text-text-muted text-xs mt-1 font-medium">{langConfig.mastery}</div>
          </div>
        </div>

        {/* Encouragement */}
        <p className="text-text-primary mb-8 bg-white/40 rounded-xl px-4 py-3 text-sm">
          {encouragement}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="secondary"
            onClick={onRetry}
            aria-label={langConfig.tryAgain}
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            {langConfig.tryAgain}
          </Button>

          <Button onClick={onContinue} aria-label={langConfig.backToChat}>
            {langConfig.backToChat}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuizResults;
