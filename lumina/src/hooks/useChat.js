/**
 * Custom hook for managing chat state, message history, and API communication.
 */

import { useState, useCallback, useRef } from 'react';
import { getLuminaResponse, RESPONSE_TYPES } from '../services/featherlessAPI';

const DEBOUNCE_DELAY = 500;

/**
 * Message structure.
 * @typedef {Object} Message
 * @property {string} id - Unique message ID
 * @property {'user'|'lumina'|'error'} role - Message sender
 * @property {string} content - Message content
 * @property {number} timestamp - Unix timestamp
 */

/**
 * Generate unique ID for messages.
 */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Custom hook for chat functionality.
 * @param {Object} options - Hook options
 * @param {number} options.gradeLevel - Current grade level
 * @param {string} options.subject - Current subject
 * @returns {Object} - Chat state and handlers
 */
export function useChat({ gradeLevel = 8, subject = 'general' } = {}) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topics, setTopics] = useState([]);
  const lastSendTime = useRef(0);

  /**
   * Extract topic from user message (simple heuristic).
   */
  const extractTopic = useCallback((message) => {
    // Remove common question starters
    const cleaned = message
      .replace(/^(what is|what are|how do|how does|why do|why does|can you explain|explain|tell me about|teach me about)/i, '')
      .replace(/\?/g, '')
      .trim();

    // Capitalize first letter
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
  }, []);

  /**
   * Send a message and get Lumina's response.
   */
  const sendMessage = useCallback(async (userMessage) => {
    const trimmedMessage = userMessage.trim();
    if (!trimmedMessage) return;

    // Debounce check
    const now = Date.now();
    if (now - lastSendTime.current < DEBOUNCE_DELAY) {
      return;
    }
    lastSendTime.current = now;

    // Create user message
    const userMsg = {
      id: generateId(),
      role: 'user',
      content: trimmedMessage,
      timestamp: Date.now(),
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    // Extract and track topic
    const topic = extractTopic(trimmedMessage);
    if (topic && topic.length > 2) {
      setTopics((prev) => {
        if (!prev.includes(topic)) {
          return [...prev, topic];
        }
        return prev;
      });
    }

    // Build message history for context
    const messageHistory = messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content,
    }));

    try {
      const response = await getLuminaResponse({
        userMessage: trimmedMessage,
        gradeLevel,
        subject,
        messageHistory,
      });

      const luminaMsg = {
        id: generateId(),
        role: response.type === RESPONSE_TYPES.ERROR ? 'error' : 'lumina',
        content: response.content,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, luminaMsg]);

      if (response.type === RESPONSE_TYPES.ERROR) {
        setError(response.content);
      }
    } catch (err) {
      const errorMsg = {
        id: generateId(),
        role: 'error',
        content: 'Something went wrong. Please try again.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [messages, gradeLevel, subject, extractTopic]);

  /**
   * Clear all messages and start fresh.
   */
  const clearChat = useCallback(() => {
    setMessages([]);
    setTopics([]);
    setError(null);
  }, []);

  /**
   * Reload a previous topic as a new message.
   */
  const revisitTopic = useCallback((topic) => {
    sendMessage(`Tell me more about ${topic}`);
  }, [sendMessage]);

  /**
   * Get the last user message (for quiz topic).
   */
  const getLastTopic = useCallback(() => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === 'user');
    return lastUserMessage ? extractTopic(lastUserMessage.content) : null;
  }, [messages, extractTopic]);

  return {
    messages,
    isLoading,
    error,
    topics,
    sendMessage,
    clearChat,
    revisitTopic,
    getLastTopic,
  };
}

export default useChat;
