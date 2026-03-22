/**
 * Grade level dropdown component for selecting student standard (5th to 12th).
 */
import { GraduationCap, ChevronDown } from 'lucide-react';

const GRADE_OPTIONS = [
  { value: 5, label: '5th Standard', age: 'Ages 10-11' },
  { value: 6, label: '6th Standard', age: 'Ages 11-12' },
  { value: 7, label: '7th Standard', age: 'Ages 12-13' },
  { value: 8, label: '8th Standard', age: 'Ages 13-14' },
  { value: 9, label: '9th Standard', age: 'Ages 14-15' },
  { value: 10, label: '10th Standard', age: 'Ages 15-16' },
  { value: 11, label: '11th Standard', age: 'Ages 16-17' },
  { value: 12, label: '12th Standard', age: 'Ages 17-18' },
];

/**
 * Grade dropdown component.
 * @param {Object} props - Component props
 * @param {number} props.value - Current grade level (5-12)
 * @param {Function} props.onChange - Callback when grade changes
 * @param {boolean} props.disabled - Whether dropdown is disabled
 * @param {boolean} props.compact - Show compact version
 */
function GradeToggle({ value = 8, onChange, disabled = false, compact = false }) {
  const currentGrade = GRADE_OPTIONS.find((g) => g.value === value) || GRADE_OPTIONS[3];

  return (
    <div className="relative">
      <label
        htmlFor="grade-select"
        className="sr-only"
      >
        Select your standard
      </label>

      <div className="relative">
        {/* Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <GraduationCap
            className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} text-primary`}
            aria-hidden="true"
          />
        </div>

        {/* Dropdown Select */}
        <select
          id="grade-select"
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          disabled={disabled}
          aria-label="Select your standard"
          className={`
            dropdown-select w-full
            ${compact ? 'pl-9 pr-10 py-2 text-sm' : 'pl-11 pr-12 py-3'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {GRADE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label} ({option.age})
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDown
            className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} text-primary`}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Current selection badge (optional decorative element) */}
      {!compact && (
        <div className="mt-2 flex items-center gap-2">
          <span className="love-badge">
            <span aria-hidden="true">✨</span>
            {currentGrade.label}
          </span>
        </div>
      )}
    </div>
  );
}

export default GradeToggle;
