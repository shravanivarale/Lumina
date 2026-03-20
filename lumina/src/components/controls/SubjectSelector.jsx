/**
 * Subject selector component with icon-labeled pill buttons.
 */
import {
  Calculator,
  FlaskConical,
  Landmark,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { SUBJECTS } from '../../prompts/systemPrompts';

const SUBJECT_CONFIG = [
  { key: 'math', label: 'Math', Icon: Calculator },
  { key: 'science', label: 'Science', Icon: FlaskConical },
  { key: 'history', label: 'History', Icon: Landmark },
  { key: 'language', label: 'Language', Icon: BookOpen },
  { key: 'general', label: 'General', Icon: Sparkles },
];

/**
 * Subject selector component.
 * @param {Object} props - Component props
 * @param {string} props.value - Current subject key
 * @param {Function} props.onChange - Callback when subject changes
 * @param {boolean} props.disabled - Whether selector is disabled
 * @param {boolean} props.compact - Show compact version (icons only on mobile)
 */
function SubjectSelector({ value = 'general', onChange, disabled = false, compact = false }) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="radiogroup"
      aria-label="Select subject"
    >
      {SUBJECT_CONFIG.map(({ key, label, Icon }) => {
        const isActive = value === key;

        return (
          <button
            key={key}
            onClick={() => onChange?.(key)}
            disabled={disabled}
            role="radio"
            aria-checked={isActive}
            aria-label={`${label} - ${SUBJECTS[key]}`}
            className={`
              pill flex items-center gap-2
              ${isActive ? 'pill-active' : 'pill-inactive'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${compact ? 'px-3 py-2' : ''}
            `}
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
            <span className={compact ? 'hidden sm:inline' : ''}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default SubjectSelector;
