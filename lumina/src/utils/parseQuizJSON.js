/**
 * Safely parse quiz JSON from API response with validation.
 */

/**
 * Extracts and parses JSON from an API response that may contain extra text.
 * @param {string} responseText - The raw response text from the API
 * @returns {Object|null} - Parsed quiz object or null if invalid
 */
export function parseQuizJSON(responseText) {
  if (!responseText || typeof responseText !== 'string') {
    return null;
  }

  try {
    // Try direct parse first (ideal case)
    const direct = JSON.parse(responseText);
    if (validateQuizStructure(direct)) {
      return direct;
    }
  } catch {
    // Continue to extraction methods
  }

  // Try to extract JSON from markdown code blocks
  const codeBlockMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    try {
      const extracted = JSON.parse(codeBlockMatch[1].trim());
      if (validateQuizStructure(extracted)) {
        return extracted;
      }
    } catch {
      // Continue to next method
    }
  }

  // Try to find JSON object in the text
  const jsonMatch = responseText.match(/\{[\s\S]*"questions"[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const extracted = JSON.parse(jsonMatch[0]);
      if (validateQuizStructure(extracted)) {
        return extracted;
      }
    } catch {
      // Failed to parse
    }
  }

  return null;
}

/**
 * Validates that the parsed object has the expected quiz structure.
 * @param {Object} quiz - The parsed quiz object
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateQuizStructure(quiz) {
  if (!quiz || typeof quiz !== 'object') {
    return false;
  }

  if (!quiz.topic || typeof quiz.topic !== 'string') {
    return false;
  }

  if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
    return false;
  }

  // Validate each question
  return quiz.questions.every((q) => {
    if (!q.question || typeof q.question !== 'string') {
      return false;
    }

    if (!Array.isArray(q.options) || q.options.length !== 4) {
      return false;
    }

    if (!q.correct || !['A', 'B', 'C', 'D'].includes(q.correct.toUpperCase())) {
      return false;
    }

    if (!q.explanation || typeof q.explanation !== 'string') {
      return false;
    }

    return true;
  });
}

/**
 * Normalizes a quiz object to ensure consistent structure.
 * @param {Object} quiz - The quiz object to normalize
 * @returns {Object} - Normalized quiz object
 */
export function normalizeQuiz(quiz) {
  return {
    topic: quiz.topic.trim(),
    questions: quiz.questions.map((q, index) => ({
      id: index,
      question: q.question.trim(),
      options: q.options.map((opt) => opt.trim()),
      correct: q.correct.toUpperCase(),
      explanation: q.explanation.trim(),
    })),
  };
}

export default parseQuizJSON;
