/**
 * Lumina - AI Tutoring Application
 * Root component orchestrating all state and child components.
 */
import { useState, useCallback } from 'react';
import AppShell from './components/layout/AppShell';
import ChatWindow from './components/chat/ChatWindow';
import ChatInput from './components/chat/ChatInput';
import QuizCard from './components/quiz/QuizCard';
import QuizResults from './components/quiz/QuizResults';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Button from './components/ui/Button';
import Card from './components/ui/Card';
import { useChat } from './hooks/useChat';
import { useQuiz, QUIZ_PHASES } from './hooks/useQuiz';
import { useMastery } from './hooks/useMastery';
import { hasApiKey } from './services/featherlessAPI';
import { Brain, Key, AlertCircle } from 'lucide-react';

/**
 * API Key missing screen.
 */
function ApiKeyScreen() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <Card className="max-w-md text-center" padding="p-8">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <Key className="w-8 h-8 text-primary" />
        </div>

        <h2 className="text-xl font-heading font-semibold text-white mb-3">
          API Key Required
        </h2>

        <p className="text-text-secondary mb-6">
          To start learning with Lumina, you need to configure your Featherless AI API key.
        </p>

        <div className="text-left bg-surface rounded-xl p-4 mb-6">
          <p className="text-sm text-text-secondary mb-2">
            1. Get a free API key from{' '}
            <a
              href="https://featherless.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              featherless.ai
            </a>
          </p>
          <p className="text-sm text-text-secondary mb-2">
            2. Create a <code className="bg-white/10 px-1.5 py-0.5 rounded text-accent">.env</code> file in the project root
          </p>
          <p className="text-sm text-text-secondary">
            3. Add: <code className="bg-white/10 px-1.5 py-0.5 rounded text-accent">VITE_FEATHERLESS_API_KEY=your_key</code>
          </p>
        </div>

        <p className="text-xs text-text-secondary">
          Restart the dev server after adding your key.
        </p>
      </Card>
    </div>
  );
}

/**
 * Main App component.
 */
function App() {
  // State
  const [gradeLevel, setGradeLevel] = useState(8);
  const [subject, setSubject] = useState('general');
  const [showQuiz, setShowQuiz] = useState(false);

  // Hooks
  const {
    messages,
    isLoading,
    topics,
    sendMessage,
    clearChat,
    revisitTopic,
    getLastTopic,
  } = useChat({ gradeLevel, subject });

  const {
    masteryData,
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
    onComplete: (result) => {
      recordQuizResult(result);
    },
  });

  // Handlers
  const handleSendMessage = useCallback((message) => {
    setShowQuiz(false);
    resetQuiz();
    sendMessage(message);
  }, [sendMessage, resetQuiz]);

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
    setShowQuiz(false);
  }, [clearChat, clearMastery, resetQuiz]);

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
              <p className="text-text-secondary">Generating your quiz...</p>
            </Card>
          )}

          {/* Error State */}
          {quizPhase === QUIZ_PHASES.ERROR && (
            <Card className="max-w-md text-center" padding="p-8">
              <div className="w-16 h-16 rounded-full bg-error/20 flex items-center justify-center mx-auto mb-4">
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

      {/* Quiz Button (shown when there's a topic to quiz) */}
      {messages.length > 0 && getLastTopic() && !isLoading && (
        <div className="flex justify-center py-2 px-4 bg-surface/30">
          <Button
            variant="secondary"
            onClick={handleStartQuiz}
            aria-label="Take a quiz on this topic"
            className="text-sm"
          >
            <Brain className="w-4 h-4" aria-hidden="true" />
            Quiz Me on This!
          </Button>
        </div>
      )}

      {/* Chat Input */}
      <ChatInput
        onSend={handleSendMessage}
        disabled={isLoading}
        placeholder={
          messages.length === 0
            ? 'Ask Lumina anything...'
            : 'Ask a follow-up question...'
        }
      />
    </AppShell>
  );
}

export default App;
