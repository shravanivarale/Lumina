/**
 * Animated typing indicator showing Lumina is thinking.
 */
function TypingIndicator() {
  return (
    <div
      className="flex items-center gap-3 max-w-[80%]"
      role="status"
      aria-label="Lumina is typing"
    >
      {/* Lumina Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-glow-accent">
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-white"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2L14.5 9L22 9L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9L9.5 9L12 2Z" />
        </svg>
      </div>

      {/* Typing Dots */}
      <div className="glass-card px-4 py-3 flex items-center gap-1.5">
        <div
          className="w-2 h-2 bg-text-secondary rounded-full animate-typing-dot typing-dot-1"
          aria-hidden="true"
        />
        <div
          className="w-2 h-2 bg-text-secondary rounded-full animate-typing-dot typing-dot-2"
          aria-hidden="true"
        />
        <div
          className="w-2 h-2 bg-text-secondary rounded-full animate-typing-dot typing-dot-3"
          aria-hidden="true"
        />
        <span className="sr-only">Lumina is typing...</span>
      </div>
    </div>
  );
}

export default TypingIndicator;
