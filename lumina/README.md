# Lumina ✨

> **"Every student deserves a brilliant teacher. Now they have one."**

Lumina is an AI-powered tutoring web application that uses the Socratic method to help students aged 10–18 learn any topic. Built for The 2030 AI Challenge hackathon, addressing **SDG 4 (Quality Education)** and **SDG 10 (Reduced Inequalities)**.

![Lumina Screenshot](./docs/screenshot.png)

## 🌟 Live Demo

**[Try Lumina Live →](https://lumina-ai-tutor.vercel.app)**

## ✨ Features

- **🧠 Socratic AI Tutoring** — Lumina guides students to discover understanding through thoughtful questions rather than just giving answers
- **📊 Adaptive Grade Levels** — Explanations automatically adjust for Grade 5, 8, 10, or 12 students
- **📝 Interactive Quizzes** — Test your knowledge with AI-generated multiple choice quizzes
- **🎯 Mastery Tracking** — Visual progress rings show your mastery level for each topic
- **📚 Subject Selection** — Choose from Math, Science, History, Language, or General topics
- **📱 Mobile Responsive** — Beautiful experience on any device

## 🎯 SDG Alignment

### SDG 4: Quality Education
According to UNESCO, **258 million children** are out of school worldwide. Even among those in school, access to quality one-on-one tutoring is limited to those who can afford it. Lumina democratizes access to personalized education.

### SDG 10: Reduced Inequalities
Bloom's research showed students receiving personal tutoring perform **2 standard deviations better** than classroom peers. Lumina brings this advantage to everyone with an internet connection — for free.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+
- [Featherless AI API Key](https://featherless.ai) (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/lumina.git
cd lumina

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your Featherless API key to .env
# VITE_FEATHERLESS_API_KEY=your_api_key_here

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see Lumina in action.

### Getting a Featherless API Key

1. Visit [featherless.ai](https://featherless.ai)
2. Create a free account
3. Navigate to API Keys section
4. Generate a new key
5. Add it to your `.env` file

## 🏗️ Architecture

```
src/
├── components/
│   ├── layout/       # AppShell, Sidebar
│   ├── chat/         # ChatWindow, MessageBubble, ChatInput
│   ├── controls/     # GradeToggle, SubjectSelector
│   ├── quiz/         # QuizCard, QuizResults
│   ├── mastery/      # MasteryRing
│   └── ui/           # Button, Card, LoadingSpinner
├── hooks/
│   ├── useChat.js    # Chat state management
│   ├── useQuiz.js    # Quiz state management
│   └── useMastery.js # Mastery tracking
├── services/
│   └── featherlessAPI.js  # API integration
├── prompts/
│   └── systemPrompts.js   # AI prompt templates
└── utils/
    └── parseQuizJSON.js   # Quiz response parsing
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS 3 |
| AI Backend | Featherless AI (Llama 3.1) |
| Charts | Chart.js + react-chartjs-2 |
| Icons | Lucide React |
| Markdown | react-markdown |
| Hosting | Vercel |

### Data Flow

```
User Input → Prompt Router → Featherless API → Response Parser → UI Update
                  ↓
         [Grade + Subject injection]
```

## 🎨 Design System

- **Primary**: Deep Indigo `#4F46E5`
- **Accent**: Amber `#F59E0B`
- **Success**: Emerald `#10B981`
- **Background**: Dark `#0F0F1A`
- **Typography**: Inter (headings) + DM Sans (body)
- **Style**: Glassmorphism with subtle animations

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add `VITE_FEATHERLESS_API_KEY` to Environment Variables
4. Deploy!

## 🧪 Testing

See [LUMINA_PROJECT_DOCS.md](./LUMINA_PROJECT_DOCS.md) for the complete testing checklist.

```bash
# Run development server with test coverage
npm run dev
```

### Manual Testing Checklist
- [ ] Chat sends and receives messages
- [ ] Grade toggle changes explanation complexity
- [ ] Quiz generates 3 MCQs correctly
- [ ] Mastery ring updates after quiz
- [ ] Mobile layout works (375px)
- [ ] Keyboard navigation works

## 📁 Project Structure

```
lumina/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services
│   ├── prompts/        # AI prompt templates
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Root component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── .env.example        # Environment template
├── index.html          # HTML template
├── tailwind.config.js  # Tailwind configuration
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

## 📜 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

- [Featherless AI](https://featherless.ai) for providing the AI infrastructure
- [Tailwind CSS](https://tailwindcss.com) for the styling framework
- [Lucide](https://lucide.dev) for beautiful icons
- [Chart.js](https://chartjs.org) for data visualization

---

Built with ❤️ for The 2030 AI Challenge

*Addressing SDG 4 (Quality Education) & SDG 10 (Reduced Inequalities)*
