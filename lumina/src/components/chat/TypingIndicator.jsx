/**
 * Animated typing indicator showing Lumina is thinking.
 * Made with love for Girls for Code ♡
 */
import { Sparkles } from 'lucide-react';

function TypingIndicator() {
  return (
    <div
      className="flex items-center gap-3 max-w-[80%]"
      role="status"
      aria-label="Lumina is typing"
    >
      {/* Lumina Avatar */}
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-coral flex items-center justify-center flex-shrink-0 shadow-glow-primary">
        <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
      </div>

      {/* Typing Dots */}
      <div className="soft-card px-5 py-3 flex items-center gap-2 border-l-4 border-accent">
        <div
          className="w-2.5 h-2.5 bg-primary rounded-full animate-typing-dot typing-dot-1"
          aria-hidden="true"
        />
        <div
          className="w-2.5 h-2.5 bg-accent rounded-full animate-typing-dot typing-dot-2"
          aria-hidden="true"
        />
        <div
          className="w-2.5 h-2.5 bg-coral rounded-full animate-typing-dot typing-dot-3"
          aria-hidden="true"
        />
        <span className="sr-only">Lumina is thinking...</span>
      </div>
    </div>
  );
}

export default TypingIndicator;
