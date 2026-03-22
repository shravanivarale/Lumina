/**
 * Lumina - AI Tutoring Application
 * Made with love for Girls for Code Hackathon 2026 ♡
 */
import { useState, useCallback } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SpeechProvider } from './contexts/SpeechContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { MetricsProvider, useMetrics } from './contexts/MetricsContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import AppShell from './components/layout/AppShell';
import ChatWindow from './components/chat/ChatWindow';
import ChatInput from './components/chat/ChatInput';
import QuizCard from './components/quiz/QuizCard';
import QuizResults from './components/quiz/QuizResults';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Button from './components/ui/Button';
import Card from './components/ui/Card';
import AuthPage from './components/auth/AuthPage';
import { useChat } from './hooks/useChat';
import { useQuiz, QUIZ_PHASES } from './hooks/useQuiz';
import { useMastery } from './hooks/useMastery';
import { hasApiKey } from './services/featherlessAPI';
import { Brain, Key, AlertCircle, Sparkles, Heart } from 'lucide-react';

/**
 * API Key missing screen - soft pastel style.
 */
function ApiKeyScreen() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <Card className="max-w-md text-center" padding="p-8">
        <div className="w-16 h-16 rounded-full bg-soft-lavender flex items-center justify-center mx-auto mb-6">
          <Key className="w-8 h-8 text-primary" />
        </div>

        <h2 className="text-xl font-heading font-bold text-text-primary mb-3">
          API Key Required
        </h2>

        <p className="text-text-secondary mb-6">
          To start learning with Lumina, you need to configure your Featherless AI API key ✨
        </p>

        <div className="text-left bg-soft-lavender/30 rounded-2xl p-4 mb-6 border border-primary/10">
          <p className="text-sm text-text-secondary mb-2">
            1. Get a free API key from{' '}
            <a
              href="https://featherless.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              featherless.ai
            </a>
          </p>
          <p className="text-sm text-text-secondary mb-2">
            2. Create a <code className="bg-soft-pink px-2 py-0.5 rounded-lg text-primary-700">.env</code> file in the project root
          </p>
          <p className="text-sm text-text-secondary">
            3. Add: <code className="bg-soft-pink px-2 py-0.5 rounded-lg text-primary-700">VITE_FEATHERLESS_API_KEY=your_key</code>
          </p>
        </div>

        <p className="text-xs text-text-muted">
          Restart the dev server after adding your key 💕
        </p>
      </Card>
    </div>
  );
}

/**
 * Loading screen while checking auth.
 */
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background pattern-dots flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-coral flex items-center justify-center animate-float shadow-glow-primary">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <LoadingSpinner size="md" />
        <p className="mt-4 text-text-secondary">Loading Lumina...</p>
      </div>
    </div>
  );
}

/**
 * Main application content (after auth).
 */
function MainApp() {
  // State
  const [gradeLevel, setGradeLevel] = useState(8);
  const [subject, setSubject] = useState('general');
  const [showQuiz, setShowQuiz] = useState(false);

  // Metrics
  const { incrementQuestions, incrementQuizzes, incrementTopics, resetMetrics } = useMetrics();

  // Language
  const { config: langConfig } = useLanguage();

  // Hooks
  const {
    messages,
    isLoading,
    topics,
    sendMessage,
    clearChat,
    revisitTopic,
    getLastTopic,
  } = useChat({ gradeLevel, subject, languageAddition: langConfig.systemPromptAddition });

  const {
    streak,
    recordQuizResult,
    getMasteryList,
    clearMastery,
  } = useMastery();

  const {
    phase: quizPhase,
    quiz,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    selectedAnswer,
    showExplanation,
    score,
    error: quizError,
    completionMessage,
    startQuiz,
    submitAnswer,
    nextQuestion,
    resetQuiz,
    retryQuiz,
  } = useQuiz({
    gradeLevel,
    subject,
    languageAddition: langConfig.systemPromptAddition,
    onComplete: (result) => {
      recordQuizResult(result);
      incrementQuizzes(); // Track quiz completion
    },
  });

  // Handlers
  const handleSendMessage = useCallback((message) => {
    setShowQuiz(false);
    resetQuiz();
    sendMessage(message);
    incrementQuestions(); // Track question asked
    incrementTopics(message); // Track topic explored
  }, [sendMessage, resetQuiz, incrementQuestions, incrementTopics]);

  const handleStartQuiz = useCallback(() => {
    const topic = getLastTopic();
    if (topic) {
      setShowQuiz(true);
      startQuiz(topic);
    }
  }, [getLastTopic, startQuiz]);

  const handleQuizContinue = useCallback(() => {
    setShowQuiz(false);
    resetQuiz();
  }, [resetQuiz]);

  const handleClearHistory = useCallback(() => {
    clearChat();
    clearMastery();
    resetQuiz();
    resetMetrics();
    setShowQuiz(false);
  }, [clearChat, clearMastery, resetQuiz, resetMetrics]);

  // Check for API key
  if (!hasApiKey()) {
    return (
      <AppShell
        gradeLevel={gradeLevel}
        onGradeChange={setGradeLevel}
        subject={subject}
        onSubjectChange={setSubject}
        topics={[]}
        onTopicClick={() => {}}
        masteryList={[]}
        streak={0}
        onClearHistory={() => {}}
      >
        <ApiKeyScreen />
      </AppShell>
    );
  }

  // Render quiz mode
  if (showQuiz) {
    return (
      <AppShell
        gradeLevel={gradeLevel}
        onGradeChange={setGradeLevel}
        subject={subject}
        onSubjectChange={setSubject}
        topics={topics}
        onTopicClick={revisitTopic}
        masteryList={getMasteryList()}
        streak={streak}
        onClearHistory={handleClearHistory}
        isLoading={quizPhase === QUIZ_PHASES.LOADING}
      >
        <div className="flex-1 flex items-center justify-center p-4 overflow-y-auto">
          {/* Loading State */}
          {quizPhase === QUIZ_PHASES.LOADING && (
            <Card className="text-center" padding="p-8">
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-text-secondary">Creating your quiz... ✨</p>
            </Card>
          )}

          {/* Error State */}
          {quizPhase === QUIZ_PHASES.ERROR && (
            <Card className="max-w-md text-center" padding="p-8">
              <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-error" />
              </div>
              <p className="text-text-secondary mb-6">{quizError}</p>
              <Button onClick={handleQuizContinue}>Continue Learning</Button>
            </Card>
          )}

          {/* Active Quiz */}
          {(quizPhase === QUIZ_PHASES.ACTIVE || quizPhase === QUIZ_PHASES.REVIEWING) && (
            <QuizCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              selectedAnswer={selectedAnswer}
              showExplanation={showExplanation}
              onSelectAnswer={submitAnswer}
              onNext={nextQuestion}
            />
          )}

          {/* Quiz Complete */}
          {quizPhase === QUIZ_PHASES.COMPLETE && quiz && (
            <QuizResults
              topic={quiz.topic}
              score={score}
              total={totalQuestions}
              encouragement={completionMessage}
              onRetry={retryQuiz}
              onContinue={handleQuizContinue}
            />
          )}
        </div>
      </AppShell>
    );
  }

  // Render chat mode
  return (
    <AppShell
      gradeLevel={gradeLevel}
      onGradeChange={setGradeLevel}
      subject={subject}
      onSubjectChange={setSubject}
      topics={topics}
      onTopicClick={revisitTopic}
      masteryList={getMasteryList()}
      streak={streak}
      onClearHistory={handleClearHistory}
      isLoading={isLoading}
    >
      {/* Chat Window */}
      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        onSuggestionClick={handleSendMessage}
      />

      {/* Quiz Button */}
      {messages.length > 0 && getLastTopic() && !isLoading && (
        <div className="flex justify-center py-3 px-4 bg-white/50 backdrop-blur-sm border-t border-primary/10">
          <Button
            variant="secondary"
            onClick={handleStartQuiz}
            aria-label="Take a quiz on this topic"
            className="text-sm"
          >
            <Brain className="w-4 h-4" aria-hidden="true" />
            Quiz Me on This! ✨
          </Button>
        </div>
      )}

      {/* Chat Input */}
      <ChatInput
        onSend={handleSendMessage}
        disabled={isLoading}
        placeholder={
          messages.length === 0
            ? langConfig.chatPlaceholder
            : langConfig.followUpPlaceholder
        }
      />
    </AppShell>
  );
}

/**
 * App wrapper with auth handling.
 */
function AppWithAuth() {
  const { user, loading, firebaseReady } = useAuth();

  // Show loading screen while checking auth
  if (loading) {
    return <LoadingScreen />;
  }

  // If Firebase is configured and user is not logged in, show auth page
  if (firebaseReady && !user) {
    return <AuthPage />;
  }

  // Show main app (works both with and without Firebase)
  return <MainApp />;
}

/**
 * Root App component.
 */
function App() {
  return (
    <AccessibilityProvider>
      <LanguageProvider>
        <MetricsProvider>
          <AuthProvider>
            <SpeechProvider>
              <AppWithAuth />
            </SpeechProvider>
          </AuthProvider>
        </MetricsProvider>
      </LanguageProvider>
    </AccessibilityProvider>
  );
}

export default App;
