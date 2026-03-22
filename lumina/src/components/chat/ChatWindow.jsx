/**
 * Scrollable chat window displaying message history.
 * Made with love for Girls for Code ♡
 */
import { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { Sparkles, Heart, BookOpen, Lightbulb } from 'lucide-react';

/**
 * Empty state component when no messages exist.
 */
function EmptyState({ onSuggestionClick }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      {/* Lumina Avatar */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-coral flex items-center justify-center mb-6 shadow-glow-primary animate-float">
        <Sparkles className="w-12 h-12 text-white" aria-hidden="true" />
      </div>

      <h2 className="text-2xl font-heading font-bold gradient-text mb-3">
        Hello! I'm Lumina ✨
      </h2>

      <p className="text-text-secondary max-w-md mb-8">
        Your AI tutor here to help you understand any topic. I won't just give you answers —
        I'll guide you to discover them yourself!
      </p>

      {/* Suggestion Cards */}
      <div className="grid gap-3 w-full max-w-md">
        <SuggestionChip
          text="What is photosynthesis?"
          icon={<BookOpen className="w-4 h-4" />}
          onClick={onSuggestionClick}
        />
        <SuggestionChip
          text="Explain fractions to me"
          icon={<Lightbulb className="w-4 h-4" />}
          onClick={onSuggestionClick}
        />
        <SuggestionChip
          text="How do computers store data?"
          icon={<Sparkles className="w-4 h-4" />}
          onClick={onSuggestionClick}
        />
      </div>

      {/* Encouraging message */}
      <p className="mt-8 text-sm text-text-muted flex items-center gap-2">
        <Heart className="w-4 h-4 text-primary" />
        Every question is a step toward understanding!
      </p>
    </div>
  );
}

/**
 * Suggestion chip for empty state.
 */
function SuggestionChip({ text, icon, onClick }) {
  return (
    <button
      onClick={() => onClick?.(text)}
      className="soft-card px-5 py-4 text-left text-text-secondary
                 hover:text-primary hover:border-primary/30 hover:shadow-soft-lg
                 transition-all duration-300 flex items-center gap-3 group"
    >
      <div className="w-10 h-10 rounded-xl bg-soft-lavender flex items-center justify-center text-accent group-hover:bg-soft-pink group-hover:text-primary transition-colors">
        {icon}
      </div>
      <span className="font-medium">{text}</span>
    </button>
  );
}

/**
 * Chat window component.
 */
function ChatWindow({ messages = [], isLoading = false, onSuggestionClick }) {
  const scrollRef = useRef(null);
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Show empty state if no messages
  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 overflow-hidden">
        <EmptyState onSuggestionClick={onSuggestionClick} />
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 space-y-4"
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isLoading && <TypingIndicator />}

      {/* Scroll anchor */}
      <div ref={bottomRef} aria-hidden="true" />
    </div>
  );
}

export default ChatWindow;
