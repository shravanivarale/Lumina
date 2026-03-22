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
    // Chat
    chatPlaceholder: 'Ask Lumina anything... ✨',
    followUpPlaceholder: 'Ask a follow-up question...',
    sendButton: 'Send',
    // Header
    appTitle: 'Lumina',
    appTagline: 'Your AI Learning Companion',
    // Sidebar
    subjects: 'Subjects',
    history: 'History',
    noTopicsYet: 'No topics yet',
    startLearning: 'Start learning to see your topics here!',
    mastery: 'Mastery',
    noMasteryYet: 'Complete quizzes to track mastery',
    // Subject names
    subjectMath: 'Math',
    subjectScience: 'Science',
    subjectHistory: 'History',
    subjectLanguage: 'Language',
    subjectGeneral: 'General',
    // Grade toggle
    grade: 'Grade',
    // Quiz
    quizMeButton: 'Quiz Me on This!',
    quizTitle: 'Quiz Time!',
    quizLoading: 'Creating your quiz...',
    quizQuestion: 'Question',
    quizOf: 'of',
    nextQuestion: 'Next Question',
    seeResults: 'See Results',
    tryAgain: 'Try Again',
    backToChat: 'Back to Chat',
    correct: 'Correct!',
    incorrect: 'Not quite!',
    yourScore: 'Your Score',
    perfectScore: 'Perfect Score!',
    greatJob: 'Great Job!',
    keepLearning: 'Keep Learning!',
    // Metrics
    topicsExplored: 'Topics Explored',
    questionsAsked: 'Questions Asked',
    quizzesCompleted: 'Quizzes Completed',
    // Auth
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    // Accessibility
    dyslexiaMode: 'Dyslexia Mode',
    // Welcome
    welcomeMessage: 'Welcome to Lumina! Ask me anything you want to learn about.',
    // Errors
    errorNetwork: "Oops! Can't reach my brain right now. Check your internet connection.",
    errorTimeout: "That took too long! Let's try a simpler question.",
    errorGeneric: 'Something went wrong. Please try again.',
    // System prompt addition
    systemPromptAddition: '',
  },
  [LANGUAGES.HI]: {
    code: 'hi',
    label: 'हिं',
    name: 'हिन्दी',
    // Chat
    chatPlaceholder: 'लुमिना से कुछ भी पूछें... ✨',
    followUpPlaceholder: 'अगला प्रश्न पूछें...',
    sendButton: 'भेजें',
    // Header
    appTitle: 'लुमिना',
    appTagline: 'आपका AI शिक्षण साथी',
    // Sidebar
    subjects: 'विषय',
    history: 'इतिहास',
    noTopicsYet: 'अभी कोई विषय नहीं',
    startLearning: 'अपने विषय यहाँ देखने के लिए सीखना शुरू करें!',
    mastery: 'दक्षता',
    noMasteryYet: 'दक्षता ट्रैक करने के लिए क्विज़ पूरा करें',
    // Subject names
    subjectMath: 'गणित',
    subjectScience: 'विज्ञान',
    subjectHistory: 'इतिहास',
    subjectLanguage: 'भाषा',
    subjectGeneral: 'सामान्य',
    // Grade toggle
    grade: 'कक्षा',
    // Quiz
    quizMeButton: 'क्विज़ लें!',
    quizTitle: 'क्विज़ का समय!',
    quizLoading: 'आपका क्विज़ बना रहे हैं...',
    quizQuestion: 'प्रश्न',
    quizOf: 'में से',
    nextQuestion: 'अगला प्रश्न',
    seeResults: 'परिणाम देखें',
    tryAgain: 'फिर से कोशिश करें',
    backToChat: 'चैट पर वापस जाएं',
    correct: 'सही!',
    incorrect: 'बिल्कुल नहीं!',
    yourScore: 'आपका स्कोर',
    perfectScore: 'पूर्ण अंक!',
    greatJob: 'बहुत बढ़िया!',
    keepLearning: 'सीखते रहें!',
    // Metrics
    topicsExplored: 'विषय खोजे',
    questionsAsked: 'प्रश्न पूछे',
    quizzesCompleted: 'क्विज़ पूरे किए',
    // Auth
    signIn: 'साइन इन करें',
    signUp: 'साइन अप करें',
    signOut: 'साइन आउट',
    email: 'ईमेल',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    forgotPassword: 'पासवर्ड भूल गए?',
    noAccount: 'खाता नहीं है?',
    haveAccount: 'पहले से खाता है?',
    // Accessibility
    dyslexiaMode: 'डिस्लेक्सिया मोड',
    // Welcome
    welcomeMessage: 'लुमिना में आपका स्वागत है! आप जो भी सीखना चाहते हैं, मुझसे पूछें।',
    // Errors
    errorNetwork: 'उफ़! अभी मेरे दिमाग तक नहीं पहुँच पा रहे। अपना इंटरनेट कनेक्शन जांचें।',
    errorTimeout: 'इसमें बहुत समय लग गया! आइए एक सरल प्रश्न पूछें।',
    errorGeneric: 'कुछ गलत हो गया। कृपया फिर से कोशिश करें।',
    // System prompt addition
    systemPromptAddition: '\n\nIMPORTANT: Please respond entirely in Hindi using Devanagari script (हिन्दी). Use simple, conversational Hindi that students can easily understand. All explanations, questions, and encouragements should be in Hindi.',
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
