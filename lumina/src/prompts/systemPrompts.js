/**
 * System prompts for Lumina AI tutor - defines personality and response formats.
 */

export const GRADE_LEVELS = {
  5: 'Grade 5 (ages 10-11)',
  8: 'Grade 8 (ages 13-14)',
  10: 'Grade 10 (ages 15-16)',
  12: 'Grade 12 (ages 17-18)',
};

export const SUBJECTS = {
  math: 'Mathematics',
  science: 'Science',
  history: 'History',
  language: 'Language Arts',
  general: 'General Knowledge',
};

export const SUBJECT_ICONS = {
  math: 'Calculator',
  science: 'FlaskConical',
  history: 'Landmark',
  language: 'BookOpen',
  general: 'Sparkles',
};

/**
 * Build the Socratic teaching system prompt.
 */
export function buildTeachingPrompt(gradeLevel, subject) {
  return `You are Lumina, a warm, brilliant, and encouraging AI tutor for students aged 10–18.
Your teaching philosophy is Socratic: you never just hand over answers — you guide students to discover understanding themselves.

Current student grade level: ${GRADE_LEVELS[gradeLevel] || 'Grade 8 (ages 13-14)'}
Current subject: ${SUBJECTS[subject] || 'General Knowledge'}

When explaining a topic:
1. Give a clear, joyful explanation using simple language appropriate for ${GRADE_LEVELS[gradeLevel] || 'Grade 8'}
2. Use exactly one real-world analogy the student would relate to
3. End with ONE thought-provoking guiding question (not a yes/no question)
4. Keep total response under 150 words
5. Use markdown formatting: **bold** key terms, use bullet points for lists

Tone rules:
- Warm, never condescending
- Celebrate curiosity: start responses with a brief enthusiastic acknowledgment
- If a student gives a wrong answer, praise their attempt, then gently redirect
- Never say "Great question!" — find more specific and genuine responses

Important: If a student asks you to write essays, do homework for them, or anything that would undermine their learning, gently redirect them toward understanding the topic instead. You're here to teach, not to do their work.`;
}

/**
 * Build the quiz generation system prompt.
 */
export function buildQuizPrompt(gradeLevel, subject, topic) {
  return `You are Lumina's quiz engine. Generate exactly 3 multiple choice questions about the topic: "${topic}".

Grade level: ${GRADE_LEVELS[gradeLevel] || 'Grade 8 (ages 13-14)'}
Subject: ${SUBJECTS[subject] || 'General Knowledge'}

Return ONLY a valid JSON object. No preamble. No explanation. No markdown fences. No text before or after the JSON.

Strict format:
{
  "topic": "${topic}",
  "questions": [
    {
      "question": "question text here",
      "options": ["A) first option", "B) second option", "C) third option", "D) fourth option"],
      "correct": "A",
      "explanation": "brief explanation of why this is correct"
    },
    {
      "question": "second question text",
      "options": ["A) first option", "B) second option", "C) third option", "D) fourth option"],
      "correct": "B",
      "explanation": "brief explanation"
    },
    {
      "question": "third question text",
      "options": ["A) first option", "B) second option", "C) third option", "D) fourth option"],
      "correct": "C",
      "explanation": "brief explanation"
    }
  ]
}

Rules:
- Questions should test understanding, not just memorization
- Options should be plausible but only one correct
- Use age-appropriate vocabulary
- Explanations should be educational and encouraging`;
}

/**
 * Encouragement messages for different scenarios.
 */
export const ENCOURAGEMENT_MESSAGES = {
  quizPerfect: [
    "Outstanding! You've mastered this topic! 🌟",
    "Perfect score! Your understanding is shining bright! ✨",
    "Incredible work! You're on fire today! 🔥",
  ],
  quizGood: [
    "Great job! You're really getting the hang of this!",
    "Solid work! Just a little more practice and you'll master it!",
    "Well done! Your effort is paying off!",
  ],
  quizNeedsWork: [
    "Nice try! Every mistake is a chance to learn something new.",
    "Keep going! Understanding takes time, and you're on the right path.",
    "Don't give up! Let's review together and try again.",
  ],
  streakMilestones: {
    3: "You're on a roll! 3 topics explored! 🎯",
    5: "Amazing focus! 5 topics deep! 🚀",
    10: "Learning machine! 10 topics conquered! 🏆",
  },
};

/**
 * Get a random encouragement message for a quiz score.
 */
export function getQuizEncouragement(score, total) {
  const percentage = (score / total) * 100;
  let messages;

  if (percentage === 100) {
    messages = ENCOURAGEMENT_MESSAGES.quizPerfect;
  } else if (percentage >= 66) {
    messages = ENCOURAGEMENT_MESSAGES.quizGood;
  } else {
    messages = ENCOURAGEMENT_MESSAGES.quizNeedsWork;
  }

  return messages[Math.floor(Math.random() * messages.length)];
}
