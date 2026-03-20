/**
 * Featherless AI API service - handles all API communication for Lumina.
 */

import { buildTeachingPrompt, buildQuizPrompt } from '../prompts/systemPrompts';
import { parseQuizJSON, normalizeQuiz } from '../utils/parseQuizJSON';

const API_ENDPOINT = 'https://api.featherless.ai/v1/chat/completions';
const MODEL = 'meta-llama/Meta-Llama-3.1-8B-Instruct';
const REQUEST_TIMEOUT = 30000; // 30 seconds

/**
 * Response types from the API.
 */
export const RESPONSE_TYPES = {
  TEACH: 'teach',
  QUIZ: 'quiz',
  ERROR: 'error',
};

/**
 * Error types for handling.
 */
export const ERROR_TYPES = {
  NO_API_KEY: 'NO_API_KEY',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT',
  RATE_LIMITED: 'RATE_LIMITED',
  INVALID_JSON: 'INVALID_JSON',
  API_ERROR: 'API_ERROR',
};

/**
 * Check if API key is configured.
 */
export function hasApiKey() {
  const key = import.meta.env.VITE_FEATHERLESS_API_KEY;
  return key && key !== 'your_api_key_here' && key.length > 0;
}

/**
 * Get Lumina's response for a teaching/chat message.
 * @param {Object} params - Request parameters
 * @param {string} params.userMessage - The user's message
 * @param {number} params.gradeLevel - Grade level (5, 8, 10, or 12)
 * @param {string} params.subject - Subject area
 * @param {Array} params.messageHistory - Previous messages for context
 * @returns {Promise<Object>} - Response object with type and content
 */
export async function getLuminaResponse({
  userMessage,
  gradeLevel = 8,
  subject = 'general',
  messageHistory = [],
}) {
  if (!hasApiKey()) {
    return {
      type: RESPONSE_TYPES.ERROR,
      errorType: ERROR_TYPES.NO_API_KEY,
      content: 'Please configure your Featherless API key to start learning with Lumina.',
    };
  }

  const systemPrompt = buildTeachingPrompt(gradeLevel, subject);
  const messages = buildMessageArray(systemPrompt, messageHistory, userMessage);

  try {
    const response = await fetchWithTimeout(messages);
    const content = extractContent(response);

    return {
      type: RESPONSE_TYPES.TEACH,
      content,
    };
  } catch (error) {
    return handleError(error);
  }
}

/**
 * Generate a quiz for a topic.
 * @param {Object} params - Request parameters
 * @param {string} params.topic - The topic to quiz on
 * @param {number} params.gradeLevel - Grade level
 * @param {string} params.subject - Subject area
 * @returns {Promise<Object>} - Quiz object or error
 */
export async function generateQuiz({
  topic,
  gradeLevel = 8,
  subject = 'general',
}) {
  if (!hasApiKey()) {
    return {
      type: RESPONSE_TYPES.ERROR,
      errorType: ERROR_TYPES.NO_API_KEY,
      content: 'Please configure your Featherless API key to generate quizzes.',
    };
  }

  const systemPrompt = buildQuizPrompt(gradeLevel, subject, topic);
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Generate a quiz about: ${topic}` },
  ];

  try {
    const response = await fetchWithTimeout(messages, { temperature: 0.3 });
    const content = extractContent(response);
    const quiz = parseQuizJSON(content);

    if (!quiz) {
      // Retry once with explicit JSON instruction
      const retryMessages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Generate a quiz about: ${topic}` },
        { role: 'assistant', content: content },
        { role: 'user', content: 'Please format that as valid JSON only, with no additional text.' },
      ];

      const retryResponse = await fetchWithTimeout(retryMessages, { temperature: 0.1 });
      const retryContent = extractContent(retryResponse);
      const retryQuiz = parseQuizJSON(retryContent);

      if (!retryQuiz) {
        return {
          type: RESPONSE_TYPES.ERROR,
          errorType: ERROR_TYPES.INVALID_JSON,
          content: 'I had trouble generating the quiz. Let me try explaining the topic differently!',
        };
      }

      return {
        type: RESPONSE_TYPES.QUIZ,
        content: normalizeQuiz(retryQuiz),
      };
    }

    return {
      type: RESPONSE_TYPES.QUIZ,
      content: normalizeQuiz(quiz),
    };
  } catch (error) {
    return handleError(error);
  }
}

/**
 * Build the message array for the API request.
 */
function buildMessageArray(systemPrompt, history, userMessage) {
  const messages = [{ role: 'system', content: systemPrompt }];

  // Add relevant history (last 10 exchanges max)
  const recentHistory = history.slice(-20);
  messages.push(...recentHistory);

  // Add current user message
  messages.push({ role: 'user', content: userMessage });

  return messages;
}

/**
 * Fetch with timeout and error handling.
 */
async function fetchWithTimeout(messages, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_FEATHERLESS_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 1024,
        temperature: options.temperature ?? 0.7,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status === 429) {
      const error = new Error('Rate limited');
      error.type = ERROR_TYPES.RATE_LIMITED;
      throw error;
    }

    if (!response.ok) {
      const error = new Error(`API error: ${response.status}`);
      error.type = ERROR_TYPES.API_ERROR;
      error.status = response.status;
      throw error;
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      const timeoutError = new Error('Request timed out');
      timeoutError.type = ERROR_TYPES.TIMEOUT;
      throw timeoutError;
    }

    throw error;
  }
}

/**
 * Extract content from API response.
 */
function extractContent(response) {
  if (!response?.choices?.[0]?.message?.content) {
    throw new Error('Invalid API response structure');
  }
  return response.choices[0].message.content;
}

/**
 * Handle errors and return user-friendly messages.
 */
function handleError(error) {
  const errorType = error.type || ERROR_TYPES.NETWORK_ERROR;

  const errorMessages = {
    [ERROR_TYPES.NO_API_KEY]: 'Please configure your Featherless API key to start learning.',
    [ERROR_TYPES.NETWORK_ERROR]: "Oops! I can't reach my brain right now. Check your internet connection and try again.",
    [ERROR_TYPES.TIMEOUT]: "That took too long! Let's try a simpler question, or check your connection.",
    [ERROR_TYPES.RATE_LIMITED]: "I need a short break! Let's continue in a moment. 🧘",
    [ERROR_TYPES.INVALID_JSON]: 'I had trouble formatting my response. Let me try again!',
    [ERROR_TYPES.API_ERROR]: `Something went wrong on my end (Error ${error.status || 'unknown'}). Please try again.`,
  };

  return {
    type: RESPONSE_TYPES.ERROR,
    errorType,
    content: errorMessages[errorType] || 'Something unexpected happened. Please try again.',
  };
}

export default {
  getLuminaResponse,
  generateQuiz,
  hasApiKey,
  RESPONSE_TYPES,
  ERROR_TYPES,
};
