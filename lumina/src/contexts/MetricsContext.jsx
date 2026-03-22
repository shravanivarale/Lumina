/**
 * Metrics context for tracking learning impact.
 * Made with love for Girls for Code ♡
 */
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY = 'lumina_metrics';

const defaultMetrics = {
  topicsExplored: 0,
  questionsAsked: 0,
  quizzesCompleted: 0,
};

const MetricsContext = createContext(null);

/**
 * Load metrics from localStorage.
 */
function loadMetrics() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultMetrics, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to load metrics:', error);
  }
  return defaultMetrics;
}

/**
 * Save metrics to localStorage.
 */
function saveMetrics(metrics) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(metrics));
  } catch (error) {
    console.error('Failed to save metrics:', error);
  }
}

/**
 * Metrics provider component.
 */
export function MetricsProvider({ children }) {
  const [metrics, setMetrics] = useState(loadMetrics);
  const [recentlyUpdated, setRecentlyUpdated] = useState({
    topicsExplored: false,
    questionsAsked: false,
    quizzesCompleted: false,
  });

  // Track previously explored topics to avoid double counting
  const exploredTopicsRef = useRef(new Set());

  // Save to localStorage when metrics change
  useEffect(() => {
    saveMetrics(metrics);
  }, [metrics]);

  // Clear recently updated flags after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setRecentlyUpdated({
        topicsExplored: false,
        questionsAsked: false,
        quizzesCompleted: false,
      });
    }, 600);
    return () => clearTimeout(timer);
  }, [recentlyUpdated]);

  /**
   * Increment topics explored (only if topic is new).
   */
  const incrementTopics = useCallback((topic) => {
    const normalizedTopic = topic?.toLowerCase().trim();
    if (normalizedTopic && !exploredTopicsRef.current.has(normalizedTopic)) {
      exploredTopicsRef.current.add(normalizedTopic);
      setMetrics((prev) => ({ ...prev, topicsExplored: prev.topicsExplored + 1 }));
      setRecentlyUpdated((prev) => ({ ...prev, topicsExplored: true }));
    }
  }, []);

  /**
   * Increment questions asked.
   */
  const incrementQuestions = useCallback(() => {
    setMetrics((prev) => ({ ...prev, questionsAsked: prev.questionsAsked + 1 }));
    setRecentlyUpdated((prev) => ({ ...prev, questionsAsked: true }));
  }, []);

  /**
   * Increment quizzes completed.
   */
  const incrementQuizzes = useCallback(() => {
    setMetrics((prev) => ({ ...prev, quizzesCompleted: prev.quizzesCompleted + 1 }));
    setRecentlyUpdated((prev) => ({ ...prev, quizzesCompleted: true }));
  }, []);

  /**
   * Reset all metrics.
   */
  const resetMetrics = useCallback(() => {
    exploredTopicsRef.current.clear();
    setMetrics(defaultMetrics);
  }, []);

  const value = {
    ...metrics,
    recentlyUpdated,
    incrementTopics,
    incrementQuestions,
    incrementQuizzes,
    resetMetrics,
  };

  return (
    <MetricsContext.Provider value={value}>
      {children}
    </MetricsContext.Provider>
  );
}

/**
 * Hook to use metrics context.
 * @returns {Object} Metrics data and controls
 */
export function useMetrics() {
  const context = useContext(MetricsContext);
  if (!context) {
    throw new Error('useMetrics must be used within a MetricsProvider');
  }
  return context;
}

export default MetricsContext;
