/**
 * Language context for managing language preferences.
 * Made with love for Girls for Code ♡
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'lumina_language';

const LANGUAGES = {
  EN: 'en',
  HI: 'hi',
};

const LANGUAGE_CONFIG = {
  [LANGUAGES.EN]: {
    code: 'en',
    label: 'EN',
    name: 'English',
    chatPlaceholder: 'Ask Lumina anything... ✨',
    followUpPlaceholder: 'Ask a follow-up question...',
    sendButton: 'Send',
    systemPromptAddition: '',
  },
  [LANGUAGES.HI]: {
    code: 'hi',
    label: 'हिं',
    name: 'हिन्दी',
    chatPlaceholder: 'कोई भी विषय पूछें... ✨',
    followUpPlaceholder: 'अगला प्रश्न पूछें...',
    sendButton: 'भेजें',
    systemPromptAddition: '\n\nIMPORTANT: Please respond entirely in Hindi. Use simple conversational Hindi that is easy to understand. Write in Devanagari script.',
  },
};

const LanguageContext = createContext(null);

/**
 * Load language from localStorage.
 */
function loadLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && Object.values(LANGUAGES).includes(stored)) {
      return stored;
    }
  } catch (error) {
    console.error('Failed to load language:', error);
  }
  return LANGUAGES.EN;
}

/**
 * Save language to localStorage.
 */
function saveLanguage(language) {
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch (error) {
    console.error('Failed to save language:', error);
  }
}

/**
 * Language provider component.
 */
export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(loadLanguage);

  // Save to localStorage when language changes
  useEffect(() => {
    saveLanguage(language);
  }, [language]);

  /**
   * Set language.
   */
  const setLanguage = useCallback((lang) => {
    if (Object.values(LANGUAGES).includes(lang)) {
      setLanguageState(lang);
    }
  }, []);

  /**
   * Toggle between languages.
   */
  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) =>
      prev === LANGUAGES.EN ? LANGUAGES.HI : LANGUAGES.EN
    );
  }, []);

  /**
   * Get current language config.
   */
  const config = LANGUAGE_CONFIG[language];

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    isHindi: language === LANGUAGES.HI,
    isEnglish: language === LANGUAGES.EN,
    config,
    LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook to use language context.
 * @returns {Object} Language data and controls
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { LANGUAGES, LANGUAGE_CONFIG };
export default LanguageContext;
