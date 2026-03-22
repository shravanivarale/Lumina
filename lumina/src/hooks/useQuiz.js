/**
 * Custom hook for managing quiz state, answer checking, and scoring.
 */

import { useState, useCallback } from 'react';
import { generateQuiz, RESPONSE_TYPES } from '../services/featherlessAPI';
import { getQuizEncouragement } from '../prompts/systemPrompts';

/**
 * Quiz state phases.
 */
export const QUIZ_PHASES = {
  IDLE: 'idle',
  LOADING: 'loading',
  ACTIVE: 'active',
  REVIEWING: 'reviewing',
  COMPLETE: 'complete',
  ERROR: 'error',
};

/**
 * Custom hook for quiz functionality.
 * @param {Object} options - Hook options
 * @param {number} options.gradeLevel - Current grade level
 * @param {string} options.subject - Current subject
 * @param {string} options.languageAddition - Additional language instructions
 * @param {Function} options.onComplete - Callback when quiz completes
 * @returns {Object} - Quiz state and handlers
 */
export function useQuiz({ gradeLevel = 8, subject = 'general', languageAddition = '', onComplete } = {}) {
  const [phase, setPhase] = useState(QUIZ_PHASES.IDLE);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);

  /**
   * Start a new quiz for a topic.
   */
  const startQuiz = useCallback(async (topic) => {
    if (!topic) {
      setError('Please learn about a topic first before taking a quiz!');
      setPhase(QUIZ_PHASES.ERROR);
      return;
    }

    setPhase(QUIZ_PHASES.LOADING);
    setError(null);
    setAnswers([]);
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);

    try {
      const response = await generateQuiz({
        topic,
        gradeLevel,
        subject,
        languageAddition,
      });

      if (response.type === RESPONSE_TYPES.ERROR) {
        setError(response.content);
        setPhase(QUIZ_PHASES.ERROR);
        return;
      }

      setQuiz(response.content);
      setPhase(QUIZ_PHASES.ACTIVE);
    } catch (err) {
      setError('Failed to generate quiz. Please try again.');
      setPhase(QUIZ_PHASES.ERROR);
    }
  }, [gradeLevel, subject, languageAddition]);

  /**
   * Submit an answer for the current question.
   */
  const submitAnswer = useCallback((answer) => {
    if (!quiz || selectedAnswer !== null) return;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct;

    setSelectedAnswer(answer);
    setShowExplanation(true);
    setPhase(QUIZ_PHASES.REVIEWING);

    const newAnswer = {
      questionIndex: currentQuestionIndex,
      selected: answer,
      correct: currentQuestion.correct,
      isCorrect,
    };

    setAnswers((prev) => [...prev, newAnswer]);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  }, [quiz, currentQuestionIndex, selectedAnswer]);

  /**
   * Move to the next question or complete the quiz.
   */
  const nextQuestion = useCallback(() => {
    if (!quiz) return;

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= quiz.questions.length) {
      // Quiz complete
      setPhase(QUIZ_PHASES.COMPLETE);
      const finalScore = answers.filter((a) => a.isCorrect).length +
        (selectedAnswer === quiz.questions[currentQuestionIndex].correct ? 1 : 0);

      if (onComplete) {
        onComplete({
          topic: quiz.topic,
          score: finalScore,
          total: quiz.questions.length,
          answers,
        });
      }
    } else {
      // Next question
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setPhase(QUIZ_PHASES.ACTIVE);
    }
  }, [quiz, currentQuestionIndex, answers, selectedAnswer, onComplete]);

  /**
   * Reset the quiz state.
   */
  const resetQuiz = useCallback(() => {
    setPhase(QUIZ_PHASES.IDLE);
    setQuiz(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setError(null);
  }, []);

  /**
   * Retry the same quiz.
   */
  const retryQuiz = useCallback(() => {
    if (quiz) {
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setScore(0);
      setPhase(QUIZ_PHASES.ACTIVE);
    }
  }, [quiz]);

  /**
   * Get current question data.
   */
  const currentQuestion = quiz?.questions[currentQuestionIndex] || null;

  /**
   * Get completion message.
   */
  const completionMessage = quiz
    ? getQuizEncouragement(score, quiz.questions.length)
    : '';

  return {
    // State
    phase,
    quiz,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions: quiz?.questions.length || 0,
    selectedAnswer,
    showExplanation,
    score,
    error,
    completionMessage,

    // Actions
    startQuiz,
    submitAnswer,
    nextQuestion,
    resetQuiz,
    retryQuiz,
  };
}

export default useQuiz;
