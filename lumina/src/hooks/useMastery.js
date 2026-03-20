/**
 * Custom hook for managing topic mastery state with sessionStorage persistence.
 */

import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'lumina_mastery';

/**
 * Mastery record structure.
 * @typedef {Object} MasteryRecord
 * @property {string} topic - Topic name
 * @property {number} score - Quiz score (0-3)
 * @property {number} total - Total questions
 * @property {number} percentage - Mastery percentage
 * @property {number} timestamp - When recorded
 * @property {number} attempts - Number of quiz attempts
 */

/**
 * Custom hook for tracking mastery progress.
 * @returns {Object} - Mastery state and handlers
 */
export function useMastery() {
  const [masteryData, setMasteryData] = useState({});
  const [streak, setStreak] = useState(0);

  /**
   * Load mastery data from sessionStorage on mount.
   */
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setMasteryData(parsed.mastery || {});
        setStreak(parsed.streak || 0);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  /**
   * Save mastery data to sessionStorage.
   */
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        mastery: masteryData,
        streak,
      }));
    } catch {
      // Ignore storage errors
    }
  }, [masteryData, streak]);

  /**
   * Record a quiz result.
   */
  const recordQuizResult = useCallback(({ topic, score, total }) => {
    const percentage = Math.round((score / total) * 100);
    const normalizedTopic = topic.toLowerCase().trim();

    setMasteryData((prev) => {
      const existing = prev[normalizedTopic];

      // Only update if this is a better score
      if (existing && existing.percentage >= percentage) {
        return {
          ...prev,
          [normalizedTopic]: {
            ...existing,
            attempts: (existing.attempts || 1) + 1,
          },
        };
      }

      return {
        ...prev,
        [normalizedTopic]: {
          topic,
          score,
          total,
          percentage,
          timestamp: Date.now(),
          attempts: existing ? (existing.attempts || 1) + 1 : 1,
        },
      };
    });

    // Increment streak
    setStreak((prev) => prev + 1);
  }, []);

  /**
   * Get mastery level for a specific topic.
   */
  const getTopicMastery = useCallback((topic) => {
    const normalizedTopic = topic.toLowerCase().trim();
    return masteryData[normalizedTopic] || null;
  }, [masteryData]);

  /**
   * Get all mastery records as an array.
   */
  const getMasteryList = useCallback(() => {
    return Object.values(masteryData).sort((a, b) => b.timestamp - a.timestamp);
  }, [masteryData]);

  /**
   * Calculate overall mastery percentage.
   */
  const getOverallMastery = useCallback(() => {
    const records = Object.values(masteryData);
    if (records.length === 0) return 0;

    const total = records.reduce((sum, r) => sum + r.percentage, 0);
    return Math.round(total / records.length);
  }, [masteryData]);

  /**
   * Get streak milestone message if applicable.
   */
  const getStreakMilestone = useCallback(() => {
    const milestones = {
      3: "You're on a roll! 3 topics explored!",
      5: 'Amazing focus! 5 topics deep!',
      10: 'Learning machine! 10 topics conquered!',
    };

    return milestones[streak] || null;
  }, [streak]);

  /**
   * Clear all mastery data.
   */
  const clearMastery = useCallback(() => {
    setMasteryData({});
    setStreak(0);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  /**
   * Get number of topics studied.
   */
  const topicsStudied = Object.keys(masteryData).length;

  /**
   * Get number of topics mastered (100%).
   */
  const topicsMastered = Object.values(masteryData).filter(
    (r) => r.percentage === 100
  ).length;

  return {
    // State
    masteryData,
    streak,
    topicsStudied,
    topicsMastered,

    // Actions
    recordQuizResult,
    getTopicMastery,
    getMasteryList,
    getOverallMastery,
    getStreakMilestone,
    clearMastery,
  };
}

export default useMastery;
