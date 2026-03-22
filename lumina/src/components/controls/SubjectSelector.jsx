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
import { useLanguage } from '../../contexts/LanguageContext';

const SUBJECT_CONFIG = [
  { key: 'math', labelKey: 'subjectMath', Icon: Calculator },
  { key: 'science', labelKey: 'subjectScience', Icon: FlaskConical },
  { key: 'history', labelKey: 'subjectHistory', Icon: Landmark },
  { key: 'language', labelKey: 'subjectLanguage', Icon: BookOpen },
  { key: 'general', labelKey: 'subjectGeneral', Icon: Sparkles },
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
  const { config } = useLanguage();

  return (
    <div
      className="flex flex-wrap gap-2"
      role="radiogroup"
      aria-label="Select subject"
    >
      {SUBJECT_CONFIG.map(({ key, labelKey, Icon }) => {
        const isActive = value === key;
        const label = config[labelKey];

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
