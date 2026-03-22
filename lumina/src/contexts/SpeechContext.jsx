/**
 * Speech context for text-to-speech functionality.
 * Made with love for Girls for Code ♡
 */
import { createContext, useContext } from 'react';
import useSpeech from '../hooks/useSpeech';

const SpeechContext = createContext(null);

/**
 * Speech provider component.
 */
export function SpeechProvider({ children }) {
  const speech = useSpeech();

  return (
    <SpeechContext.Provider value={speech}>
      {children}
    </SpeechContext.Provider>
  );
}

/**
 * Hook to use speech context.
 * @returns {Object} Speech control functions and state
 */
export function useSpeechContext() {
  const context = useContext(SpeechContext);
  if (!context) {
    throw new Error('useSpeechContext must be used within a SpeechProvider');
  }
  return context;
}

export default SpeechContext;
