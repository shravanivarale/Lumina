/**
 * Custom hook for text-to-speech using Web Speech API.
 * Made with love for Girls for Code ♡
 */
import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook for text-to-speech functionality.
 * @returns {Object} Speech control functions and state
 */
function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState(null);
  const utteranceRef = useRef(null);

  // Check if speech synthesis is supported
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (isSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSupported]);

  // Handle visibility change to pause/resume speech
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isSupported) {
        window.speechSynthesis.pause();
      } else if (!document.hidden && isSupported && isSpeaking) {
        window.speechSynthesis.resume();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isSupported, isSpeaking]);

  /**
   * Start speaking the provided text.
   * @param {string} text - Text to speak
   * @param {string} messageId - ID of the message being spoken
   */
  const speak = useCallback((text, messageId) => {
    if (!isSupported) {
      console.warn('Speech synthesis is not supported in this browser');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Clean text - remove markdown syntax
    const cleanText = text
      .replace(/[#*_`~]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\n+/g, '. ')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current = utterance;

    // Configure voice settings for a friendly tone
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.1; // Slightly higher for warmth
    utterance.volume = 1;

    // Try to select a female voice for Lumina
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (voice) =>
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('victoria') ||
        voice.name.includes('Google') && voice.lang.startsWith('en')
    );
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    // Event handlers
    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentMessageId(messageId);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentMessageId(null);
    };

    utterance.onerror = (event) => {
      // Don't log 'interrupted' errors as they're expected when stopping
      if (event.error !== 'interrupted') {
        console.error('Speech synthesis error:', event.error);
      }
      setIsSpeaking(false);
      setCurrentMessageId(null);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSupported]);

  /**
   * Stop any ongoing speech.
   */
  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentMessageId(null);
    }
  }, [isSupported]);

  /**
   * Check if a specific message is currently being spoken.
   * @param {string} messageId - ID of the message to check
   * @returns {boolean} Whether the message is being spoken
   */
  const isMessageSpeaking = useCallback(
    (messageId) => isSpeaking && currentMessageId === messageId,
    [isSpeaking, currentMessageId]
  );

  return {
    speak,
    stop,
    isSpeaking,
    isMessageSpeaking,
    isSupported,
  };
}

export default useSpeech;
