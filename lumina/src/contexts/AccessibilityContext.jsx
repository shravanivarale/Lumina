/**
 * Accessibility context for managing accessibility preferences.
 * Made with love for Girls for Code ♡
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'lumina_accessibility';

const defaultPreferences = {
  dyslexiaMode: false,
};

const AccessibilityContext = createContext(null);

/**
 * Load preferences from localStorage.
 */
function loadPreferences() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultPreferences, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to load accessibility preferences:', error);
  }
  return defaultPreferences;
}

/**
 * Save preferences to localStorage.
 */
function savePreferences(preferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error('Failed to save accessibility preferences:', error);
  }
}

/**
 * Accessibility provider component.
 */
export function AccessibilityProvider({ children }) {
  const [preferences, setPreferences] = useState(loadPreferences);

  // Apply dyslexia mode class to document
  useEffect(() => {
    if (preferences.dyslexiaMode) {
      document.documentElement.classList.add('dyslexia-mode');
    } else {
      document.documentElement.classList.remove('dyslexia-mode');
    }
  }, [preferences.dyslexiaMode]);

  // Toggle dyslexia mode
  const toggleDyslexiaMode = useCallback(() => {
    setPreferences((prev) => {
      const newPrefs = { ...prev, dyslexiaMode: !prev.dyslexiaMode };
      savePreferences(newPrefs);
      return newPrefs;
    });
  }, []);

  const value = {
    dyslexiaMode: preferences.dyslexiaMode,
    toggleDyslexiaMode,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

/**
 * Hook to use accessibility context.
 * @returns {Object} Accessibility preferences and controls
 */
export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}

export default AccessibilityContext;
