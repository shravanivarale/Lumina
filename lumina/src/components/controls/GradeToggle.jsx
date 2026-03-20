/**
 * Grade level toggle component for selecting student grade level.
 */
import { GRADE_LEVELS } from '../../prompts/systemPrompts';

const GRADE_OPTIONS = [
  { value: 5, label: 'Grade 5' },
  { value: 8, label: 'Grade 8' },
  { value: 10, label: 'Grade 10' },
  { value: 12, label: 'Grade 12' },
];

/**
 * Grade toggle component.
 * @param {Object} props - Component props
 * @param {number} props.value - Current grade level (5, 8, 10, or 12)
 * @param {Function} props.onChange - Callback when grade changes
 * @param {boolean} props.disabled - Whether toggle is disabled
 */
function GradeToggle({ value = 8, onChange, disabled = false }) {
  return (
    <div
      className="flex items-center gap-1 p-1 bg-surface rounded-xl"
      role="radiogroup"
      aria-label="Select grade level"
    >
      {GRADE_OPTIONS.map((option) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onChange?.(option.value)}
            disabled={disabled}
            role="radio"
            aria-checked={isActive}
            aria-label={`${option.label} - ${GRADE_LEVELS[option.value]}`}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
              ${isActive
                ? 'bg-primary text-white shadow-glow-primary'
                : 'text-text-secondary hover:text-white hover:bg-white/5'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default GradeToggle;
