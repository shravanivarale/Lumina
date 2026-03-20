/**
 * Message bubble component for user and Lumina messages.
 */
import ReactMarkdown from 'react-markdown';

/**
 * Lumina's avatar component.
 */
function LuminaAvatar() {
  return (
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
  );
}

/**
 * Message bubble component.
 * @param {Object} props - Component props
 * @param {Object} props.message - Message object
 * @param {string} props.message.role - 'user' | 'lumina' | 'error'
 * @param {string} props.message.content - Message content
 */
function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const isError = message.role === 'error';

  if (isUser) {
    return (
      <div className="flex justify-end animate-fade-in">
        <div className="message-user">
          <p className="text-white whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <LuminaAvatar />
      <div
        className={`message-lumina ${isError ? 'border-error/30 bg-error/5' : ''}`}
      >
        {isError ? (
          <p className="text-error">{message.content}</p>
        ) : (
          <div className="markdown-content">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
