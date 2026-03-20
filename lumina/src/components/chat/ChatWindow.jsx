/**
 * Scrollable chat window displaying message history.
 */
import { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { Sparkles } from 'lucide-react';

/**
 * Empty state component when no messages exist.
 */
function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-6 shadow-glow-accent">
        <svg
          viewBox="0 0 24 24"
          className="w-12 h-12 text-white"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2L14.5 9L22 9L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9L9.5 9L12 2Z" />
        </svg>
      </div>

      <h2 className="text-2xl font-heading font-semibold text-white mb-3">
        Hello! I'm Lumina
      </h2>

      <p className="text-text-secondary max-w-md mb-8">
        Your AI tutor here to help you understand any topic. I won't just give you answers —
        I'll guide you to discover them yourself!
      </p>

      <div className="grid gap-3 w-full max-w-sm">
        <SuggestionChip text="What is photosynthesis?" />
        <SuggestionChip text="Explain fractions to me" />
        <SuggestionChip text="How do computers store data?" />
      </div>
    </div>
  );
}

/**
 * Suggestion chip for empty state.
 */
function SuggestionChip({ text, onClick }) {
  return (
    <button
      onClick={() => onClick?.(text)}
      className="glass-card px-4 py-3 text-left text-text-secondary hover:text-white
                 hover:bg-white/10 hover:border-white/20 transition-all duration-200
                 flex items-center gap-2 group"
    >
      <Sparkles className="w-4 h-4 text-accent group-hover:text-accent-300" aria-hidden="true" />
      <span>{text}</span>
    </button>
  );
}

/**
 * Chat window component.
 * @param {Object} props - Component props
 * @param {Array} props.messages - Array of message objects
 * @param {boolean} props.isLoading - Whether Lumina is typing
 * @param {Function} props.onSuggestionClick - Callback for suggestion clicks
 */
function ChatWindow({ messages = [], isLoading = false, onSuggestionClick }) {
  const scrollRef = useRef(null);
  const bottomRef = useRef(null);

  /**
   * Auto-scroll to bottom when new messages arrive.
   */
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Show empty state if no messages
  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 overflow-hidden">
        <EmptyState />
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
