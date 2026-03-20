# LUMINA — Complete Project Documentation

> **Living Document** — Update after every major task completion

---

## 1. Project Identity

| Field | Value |
|-------|-------|
| **Full Name** | Lumina |
| **Tagline** | "Every student deserves a brilliant teacher. Now they have one." |
| **Target Users** | Students aged 10–18 (Grades 5–12) |
| **SDG Alignment** | SDG 4 — Quality Education \| SDG 10 — Reduced Inequalities |
| **Hackathon** | The 2030 AI Challenge (Devpost) |
| **Deadline** | March 29, 2026 @ 6:30pm GMT+5:30 |
| **Submission Type** | Solo submission |
| **Developer** | [Developer Name Placeholder] |

---

## 2. Vision & Problem Statement

### The Global Education Crisis

According to UNESCO, **258 million children and youth** are out of school worldwide. Even among those in school, learning outcomes remain deeply unequal:

- Students in low-income countries are 4x less likely to achieve minimum proficiency in reading
- Rural students have significantly less access to qualified teachers
- One-on-one tutoring remains a privilege of the wealthy

### Bloom's 2-Sigma Problem

In 1984, educational psychologist Benjamin Bloom discovered that students who receive **one-on-one tutoring** perform **two standard deviations better** than students in conventional classrooms — that's moving from the 50th percentile to the 98th percentile.

The challenge: How do we scale personalized tutoring to every student on Earth?

### Our Solution: Lumina

Lumina bridges this gap by providing:

1. **AI-Powered Personal Tutoring** — Every student gets a patient, knowledgeable tutor available 24/7
2. **Socratic Method** — Rather than giving answers, Lumina guides students to discover understanding themselves
3. **Adaptive Learning** — Explanations automatically adjust to the student's grade level
4. **Mastery Tracking** — Visual progress indicators motivate continued learning
5. **Zero Cost** — Runs entirely in the browser with no backend infrastructure

**Impact Potential**: If Lumina helps even 1% of underserved students achieve grade-level proficiency, that's 2.58 million lives transformed.

---

## 3. Complete Feature Specifications

### F1: Socratic AI Chat Interface
| Attribute | Details |
|-----------|---------|
| **User-Facing Description** | A conversational interface where students can ask questions about any topic and receive guided explanations |
| **Technical Implementation** | React chat component with message history, auto-scroll, markdown rendering via react-markdown, Featherless API integration |
| **Key Behaviors** | Never gives direct answers; uses guiding questions; celebrates curiosity; provides analogies |
| **Status** | [x] Complete |

### F2: Grade Level Adaptive Toggle
| Attribute | Details |
|-----------|---------|
| **User-Facing Description** | Four-button toggle (Grade 5 / 8 / 10 / 12) that adjusts explanation complexity |
| **Technical Implementation** | GradeToggle component with state; grade level injected into system prompt dynamically |
| **Key Behaviors** | Visual active state with glow; smooth transitions; persists in session |
| **Status** | [x] Complete |

### F3: Mini Quiz Generator
| Attribute | Details |
|-----------|---------|
| **User-Facing Description** | After learning a topic, students can take a 3-question multiple choice quiz |
| **Technical Implementation** | Quiz mode prompt returns strict JSON; parseQuizJSON utility validates response; QuizCard renders each question |
| **Key Behaviors** | 4 options per question; immediate feedback with color coding; explanation shown after answer |
| **Status** | [x] Complete |

### F4: Mastery Tracker
| Attribute | Details |
|-----------|---------|
| **User-Facing Description** | Visual progress rings showing mastery level for each topic studied |
| **Technical Implementation** | Chart.js doughnut charts via react-chartjs-2; mastery stored in sessionStorage |
| **Key Behaviors** | 0-3 correct = 0%/33%/66%/100% fill; animated on update; topic labels |
| **Status** | [x] Complete |

### F5: Subject Selector
| Attribute | Details |
|-----------|---------|
| **User-Facing Description** | Choose from Math, Science, History, Language, or General to focus Lumina's responses |
| **Technical Implementation** | SubjectSelector component with pill buttons; subject injected into system prompt |
| **Key Behaviors** | Icons for each subject; active state styling; affects prompt context |
| **Status** | [x] Complete |

### F6: Session History Sidebar
| Attribute | Details |
|-----------|---------|
| **User-Facing Description** | List of all topics explored in the current session; click to revisit |
| **Technical Implementation** | Sidebar component with topic array state; onClick loads topic as new message |
| **Key Behaviors** | Updates after each exchange; scrollable list; responsive collapse on mobile |
| **Status** | [x] Complete |

### F7: Encouragement & Streak System
| Attribute | Details |
|-----------|---------|
| **User-Facing Description** | Motivational micro-interactions celebrating learning milestones |
| **Technical Implementation** | CSS animations; encouraging messages after quiz completion; streak counter |
| **Key Behaviors** | Subtle confetti on perfect quiz; warm acknowledgments; never condescending |
| **Status** | [x] Complete |

### F8: Mobile Responsive Layout
| Attribute | Details |
|-----------|---------|
| **User-Facing Description** | Fully functional experience on mobile devices (375px+) |
| **Technical Implementation** | Tailwind responsive classes; sidebar collapses to bottom sheet; touch-friendly targets |
| **Key Behaviors** | No horizontal overflow; all elements accessible; optimized for thumb reach |
| **Status** | [x] Complete |

---

## 4. System Architecture

### Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | React | 18.x |
| Build Tool | Vite | 5.x |
| Styling | Tailwind CSS | 3.x |
| AI API | Featherless.ai | v1 |
| Charts | Chart.js + react-chartjs-2 | 4.x / 5.x |
| Icons | Lucide React | Latest |
| Markdown | react-markdown | Latest |
| Hosting | Vercel | - |

### Component Tree

```
App.jsx
├── AppShell.jsx
│   ├── Sidebar.jsx
│   │   ├── SubjectSelector.jsx
│   │   └── SessionHistory (internal)
│   └── MainContent
│       ├── Header
│       │   └── GradeToggle.jsx
│       ├── ChatWindow.jsx
│       │   ├── MessageBubble.jsx (multiple)
│       │   └── TypingIndicator.jsx
│       ├── ChatInput.jsx
│       ├── QuizCard.jsx (conditional)
│       └── QuizResults.jsx (conditional)
└── MasteryRing.jsx (in sidebar or modal)
```

### Data Flow Diagram

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│ User Input  │────▶│ Prompt Router│────▶│ Featherless API │
└─────────────┘     └──────────────┘     └─────────────────┘
                           │                      │
                    [grade, subject,              │
                     mode injection]              │
                                                  ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│     UI      │◀────│Response Parser│◀────│   API Response  │
└─────────────┘     └──────────────┘     └─────────────────┘
       │                   │
       │            [quiz JSON parse,
       │             markdown format]
       ▼
┌─────────────┐
│  State      │
│  Update     │
└─────────────┘
```

### Prompt Architecture

1. **Base System Prompt**: Defines Lumina's personality, teaching philosophy, and response format
2. **Grade Injection**: `Current student grade level: {GRADE_LEVEL}` inserted dynamically
3. **Subject Injection**: `Current subject: {SUBJECT}` inserted dynamically
4. **Mode Switching**:
   - `teach` / `socratic`: Standard explanatory mode with guiding questions
   - `quiz`: Returns strict JSON with 3 MCQs

### State Management Approach

- **React useState/useReducer**: All state managed at App.jsx level, passed down via props
- **Custom Hooks**: `useChat`, `useQuiz`, `useMastery` encapsulate complex state logic
- **sessionStorage**: Mastery data persists within browser session
- **No external state library**: Keeps bundle small, complexity low

---

## 5. Featherless API Integration

### Endpoint Configuration

| Setting | Value |
|---------|-------|
| **Base URL** | `https://api.featherless.ai/v1/chat/completions` |
| **Model** | `meta-llama/Meta-Llama-3.1-8B-Instruct` |
| **API Key Storage** | `.env` as `VITE_FEATHERLESS_API_KEY` |
| **Request Method** | POST |
| **Content-Type** | application/json |

### System Prompt — Teach/Socratic Mode

```
You are Lumina, a warm, brilliant, and encouraging AI tutor for students aged 10–18.
Your teaching philosophy is Socratic: you never just hand over answers — you guide
students to discover understanding themselves.

Current student grade level: {GRADE_LEVEL}
Current subject: {SUBJECT}

When explaining a topic:
1. Give a clear, joyful explanation using simple language appropriate for {GRADE_LEVEL}
2. Use exactly one real-world analogy the student would relate to
3. End with ONE thought-provoking guiding question (not a yes/no question)
4. Keep total response under 150 words
5. Use markdown formatting: **bold** key terms, use bullet points for lists

Tone rules:
- Warm, never condescending
- Celebrate curiosity: start responses with a brief enthusiastic acknowledgment
- If a student gives a wrong answer, praise their attempt, then gently redirect
- Never say "Great question!" — find more specific and genuine responses
```

### System Prompt — Quiz Mode

```
You are Lumina's quiz engine. Generate exactly 3 multiple choice questions about
the topic the student just learned.

Grade level: {GRADE_LEVEL}
Subject: {SUBJECT}

Return ONLY a valid JSON object. No preamble. No explanation. No markdown fences.
Strict format:
{
  "topic": "topic name",
  "questions": [
    {
      "question": "question text",
      "options": ["A) option", "B) option", "C) option", "D) option"],
      "correct": "A",
      "explanation": "brief explanation of why this is correct"
    }
  ]
}
```

### Error Handling Strategy

| Error Type | Detection | User Message | Recovery |
|------------|-----------|--------------|----------|
| No API Key | `!import.meta.env.VITE_FEATHERLESS_API_KEY` | Friendly setup screen with instructions | Block chat until key added |
| Network Failure | fetch throws | "Oops! Can't reach my brain right now. Check your internet connection." | Retry button |
| Rate Limited | 429 status | "I need a short break! Try again in a moment." | Auto-retry after 5s, max 3 attempts |
| Timeout (>15s) | AbortController | "That took too long. Let's try a simpler question." | Allow retry |
| Invalid JSON (quiz) | JSON.parse throws | "Quiz generation hiccup. Let me try again." | Auto-retry once |
| API Error (4xx/5xx) | response.ok === false | "Something went wrong on my end. Error: {code}" | Log for debugging |

---

## 6. UI/UX Design Specification

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Primary (Deep Indigo) | `#4F46E5` | Buttons, active states, user message bubbles |
| Accent (Amber) | `#F59E0B` | Lumina avatar, highlights, success celebrations |
| Success (Emerald) | `#10B981` | Correct answer glow, positive feedback |
| Error (Red) | `#EF4444` | Wrong answer glow, error messages |
| Background | `#0F0F1A` | App background (dark mode) |
| Surface | `#1A1A2E` | Cards, sidebar, elevated elements |
| Text Primary | `#F1F5F9` | Main text content |
| Text Secondary | `#94A3B8` | Labels, timestamps, hints |

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Headings | Inter | 600 (Semibold) | 24px–32px |
| Body | DM Sans | 400 (Regular) | 16px |
| Labels | DM Sans | 500 (Medium) | 14px |
| Code/Mono | System Mono | 400 | 14px |

**Import** (index.css):
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&display=swap');
```

### Spacing System

Using Tailwind defaults:
- `p-2` = 8px
- `p-4` = 16px
- `p-6` = 24px
- `gap-4` for consistent component spacing
- `rounded-2xl` for cards (16px border-radius)

### Animation Specifications

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| All interactive | `transition-all` | 200ms | ease-out |
| Message appear | Fade in + slide up | 300ms | ease-out |
| Typing dots | Bounce stagger | 600ms loop | ease-in-out |
| Quiz option select | Scale + glow | 200ms | ease-out |
| Mastery ring fill | Arc draw | 800ms | ease-out |
| Button hover | Scale 1.02 | 150ms | ease-out |

### Component Design Tokens

**Glassmorphism Card**:
```css
bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl
```

**Primary Button**:
```css
bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium
px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-indigo-500/25
transition-all duration-200
```

**Input Field**:
```css
bg-white/5 border border-white/10 rounded-xl px-4 py-3
text-white placeholder-slate-400 focus:border-indigo-500
focus:ring-2 focus:ring-indigo-500/20 outline-none
```

### Accessibility Requirements

- All colors pass WCAG AA contrast ratio (4.5:1 for text)
- All interactive elements have `aria-label`
- Logical tab order throughout the app
- Focus states visible with ring indicator
- Screen reader announcements for dynamic content
- No seizure-inducing animations
- Reduced motion respected via `prefers-reduced-motion`

---

## 7. File & Folder Structure

```
lumina/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── chat/
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   └── TypingIndicator.jsx
│   │   ├── controls/
│   │   │   ├── GradeToggle.jsx
│   │   │   └── SubjectSelector.jsx
│   │   ├── quiz/
│   │   │   ├── QuizCard.jsx
│   │   │   └── QuizResults.jsx
│   │   ├── mastery/
│   │   │   └── MasteryRing.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       └── LoadingSpinner.jsx
│   ├── hooks/
│   │   ├── useChat.js
│   │   ├── useQuiz.js
│   │   └── useMastery.js
│   ├── services/
│   │   └── featherlessAPI.js
│   ├── prompts/
│   │   └── systemPrompts.js
│   ├── utils/
│   │   └── parseQuizJSON.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
└── LUMINA_PROJECT_DOCS.md
```

**Status**: [x] Structure created

---

## 8. Environment Setup Guide

### Prerequisites

- Node.js v18.x or higher
- npm v9.x or higher
- Git
- Featherless.ai API key (free tier available)

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/[username]/lumina.git
cd lumina

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Add your Featherless API key to .env
# Edit .env and replace 'your_key_here' with your actual key
VITE_FEATHERLESS_API_KEY=your_actual_api_key

# 5. Start development server
npm run dev

# 6. Open in browser
# Navigate to http://localhost:5173
```

### Getting a Featherless API Key

1. Go to [featherless.ai](https://featherless.ai)
2. Sign up for a free account
3. Navigate to API Keys section
4. Generate a new key
5. Copy and paste into your `.env` file

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Deploy to Vercel

```bash
# Option 1: Vercel CLI
npm install -g vercel
vercel

# Option 2: GitHub Integration
# 1. Push code to GitHub
# 2. Go to vercel.com
# 3. Import your repository
# 4. Add VITE_FEATHERLESS_API_KEY to Environment Variables
# 5. Deploy
```

---

## 9. Testing Guide

### Manual Testing Checklist

#### Core Functionality
- [ ] Chat sends message and receives Lumina response
- [ ] Grade level toggle changes explanation complexity (test same prompt on grade 5 vs 12)
- [ ] Quiz generates exactly 3 MCQs with 4 options each
- [ ] Correct answer shows green, wrong shows red with explanation
- [ ] Mastery ring increments after quiz completion
- [ ] Subject selector filters system prompt correctly
- [ ] Session history sidebar updates after each exchange

#### Responsive Design
- [ ] Mobile layout (375px width) — no overflow, all elements accessible
- [ ] Tablet layout (768px) — proper spacing
- [ ] Desktop layout (1280px+) — full sidebar visible

#### Error Handling
- [ ] API key missing → graceful error message shown (not a blank crash)
- [ ] Long responses render without layout breaking
- [ ] Network offline → friendly error message

#### Accessibility
- [ ] Keyboard-only navigation works through all controls
- [ ] Screen reader announces messages correctly
- [ ] Focus states visible on all interactive elements
- [ ] Dark mode renders correctly on Chrome, Firefox, Safari

### Edge Case Tests

- [ ] Empty input submitted — handled gracefully (button disabled or error shown)
- [ ] API timeout (>10s) — spinner shown, timeout message after 15s
- [ ] Non-educational message (e.g. "write my essay") — Lumina redirects politely
- [ ] Very long topic name — UI doesn't break (text truncation)
- [ ] Rapid successive messages — no duplicate API calls (debounce working)
- [ ] Special characters in message — renders correctly, no XSS
- [ ] Emoji in messages — displays properly

### Performance Benchmarks

| Metric | Target | Status |
|--------|--------|--------|
| First Contentful Paint | < 1.5s | [ ] |
| Largest Contentful Paint | < 2.5s | [ ] |
| Lighthouse Performance | > 90 | [ ] |
| Lighthouse Accessibility | > 95 | [ ] |
| Lighthouse Best Practices | > 90 | [ ] |
| Bundle Size (gzipped) | < 200KB | [ ] |

---

## 10. Known Issues & Bugs Log

| Issue | Severity | Status | Fix Applied |
|-------|----------|--------|-------------|
| *No issues yet* | - | - | - |

---

## 11. Hackathon Submission Checklist

### Technical Deliverables
- [ ] Vercel deployment live and accessible
- [ ] GitHub repo public with clear README
- [ ] All code committed and pushed
- [ ] No console errors in production build
- [ ] Environment variables configured on Vercel

### Content Deliverables
- [ ] 2-minute demo video recorded and uploaded to YouTube (unlisted OK)
- [ ] Technical report PDF complete (8–10 pages)
- [ ] Screenshots/GIFs of key features

### Devpost Submission
- [ ] Project title: Lumina
- [ ] Elevator pitch (300 chars max)
- [ ] Detailed project story (What it does, How we built it, Challenges, Accomplishments, What we learned, What's next)
- [ ] Built-with tags: React, Vite, Tailwind CSS, Featherless AI, Chart.js, Vercel
- [ ] Video embedded
- [ ] Try it out link (Vercel URL)
- [ ] GitHub link
- [ ] All team member names added
- [ ] Submission submitted before **Mar 29, 2026 @ 6:30pm GMT+5:30**

---

## 12. Change Log

| Date | Change | Files Affected |
|------|--------|----------------|
| 2026-03-20 | Created initial project documentation | `LUMINA_PROJECT_DOCS.md` |
| 2026-03-20 | Scaffolded Vite + React project with Tailwind CSS v3.4 | `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js` |
| 2026-03-20 | Created all UI components (Button, Card, LoadingSpinner) | `src/components/ui/*` |
| 2026-03-20 | Created chat components (ChatWindow, MessageBubble, ChatInput, TypingIndicator) | `src/components/chat/*` |
| 2026-03-20 | Created control components (GradeToggle, SubjectSelector) | `src/components/controls/*` |
| 2026-03-20 | Created quiz components (QuizCard, QuizResults) | `src/components/quiz/*` |
| 2026-03-20 | Created mastery component (MasteryRing) | `src/components/mastery/*` |
| 2026-03-20 | Created layout components (AppShell, Sidebar) | `src/components/layout/*` |
| 2026-03-20 | Implemented Featherless API service with error handling | `src/services/featherlessAPI.js` |
| 2026-03-20 | Created system prompts with Socratic teaching philosophy | `src/prompts/systemPrompts.js` |
| 2026-03-20 | Created custom hooks (useChat, useQuiz, useMastery) | `src/hooks/*` |
| 2026-03-20 | Created quiz JSON parsing utility | `src/utils/parseQuizJSON.js` |
| 2026-03-20 | Implemented main App with full state orchestration | `src/App.jsx` |
| 2026-03-20 | Created index.css with Tailwind and custom styles | `src/index.css` |
| 2026-03-20 | Created README.md with setup instructions | `README.md` |
| 2026-03-20 | Verified production build (425KB gzipped: 140KB) | `dist/*` |

---

*Last Updated: 2026-03-20*
