/**
 * Quiz card component for displaying a single multiple choice question.
 */
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

/**
 * Get option letter from index.
 */
function getOptionLetter(index) {
  return ['A', 'B', 'C', 'D'][index];
}

/**
 * Extract option text (remove letter prefix if present).
 */
function extractOptionText(option) {
  return option.replace(/^[A-D]\)\s*/i, '');
}

/**
 * Quiz card component.
 * @param {Object} props - Component props
 * @param {Object} props.question - Question object
 * @param {number} props.questionNumber - Current question number
 * @param {number} props.totalQuestions - Total number of questions
 * @param {string|null} props.selectedAnswer - Currently selected answer
 * @param {boolean} props.showExplanation - Whether to show explanation
 * @param {Function} props.onSelectAnswer - Callback when answer is selected
 * @param {Function} props.onNext - Callback for next question
 */
function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  showExplanation,
  onSelectAnswer,
  onNext,
}) {
  if (!question) return null;

  const isAnswered = selectedAnswer !== null;

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in" padding="p-0">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <span className="text-text-secondary text-sm">
          Question {questionNumber} of {totalQuestions}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < questionNumber - 1
                  ? 'bg-success'
                  : i === questionNumber - 1
                  ? 'bg-primary'
                  : 'bg-white/20'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="p-6">
        <h3 className="text-lg font-heading font-medium text-white mb-6">
          {question.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const letter = getOptionLetter(index);
            const isSelected = selectedAnswer === letter;
            const isCorrect = letter === question.correct;
            const showAsCorrect = showExplanation && isCorrect;
            const showAsIncorrect = showExplanation && isSelected && !isCorrect;

            return (
              <button
                key={letter}
                onClick={() => !isAnswered && onSelectAnswer(letter)}
                disabled={isAnswered}
                aria-label={`Option ${letter}: ${extractOptionText(option)}`}
                aria-pressed={isSelected}
                className={`
                  quiz-option w-full text-left flex items-center gap-4
                  ${showAsCorrect ? 'quiz-option-correct' : ''}
                  ${showAsIncorrect ? 'quiz-option-incorrect' : ''}
                  ${isSelected && !showExplanation ? 'quiz-option-selected' : ''}
                  ${isAnswered ? 'cursor-default' : ''}
                `}
              >
                {/* Letter Badge */}
                <span
                  className={`
                    w-8 h-8 rounded-lg flex items-center justify-center font-medium text-sm
                    ${showAsCorrect ? 'bg-success text-white' : ''}
                    ${showAsIncorrect ? 'bg-error text-white' : ''}
                    ${!showExplanation && isSelected ? 'bg-primary text-white' : ''}
                    ${!showExplanation && !isSelected ? 'bg-white/10 text-text-secondary' : ''}
                  `}
                >
                  {showAsCorrect && <CheckCircle className="w-5 h-5" />}
                  {showAsIncorrect && <XCircle className="w-5 h-5" />}
                  {!showExplanation && letter}
                </span>

                {/* Option Text */}
                <span className="flex-1 text-text-primary">
                  {extractOptionText(option)}
                </span>

                {/* Correct/Incorrect Indicator */}
                {showExplanation && isCorrect && !isSelected && (
                  <span className="text-success text-sm font-medium">Correct answer</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 animate-fade-in">
            <p className="text-text-secondary text-sm">
              <span className="font-medium text-white">Explanation: </span>
              {question.explanation}
            </p>
          </div>
        )}

        {/* Next Button */}
        {showExplanation && (
          <div className="mt-6 flex justify-end animate-fade-in">
            <Button onClick={onNext} aria-label={questionNumber === totalQuestions ? 'See results' : 'Next question'}>
              {questionNumber === totalQuestions ? 'See Results' : 'Next Question'}
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

export default QuizCard;
