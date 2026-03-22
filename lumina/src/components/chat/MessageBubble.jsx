/**
 * Message bubble component for user and Lumina messages.
 * Made with love for Girls for Code ♡
 */
import ReactMarkdown from 'react-markdown';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useSpeechContext } from '../../contexts/SpeechContext';

/**
 * Lumina's avatar component.
 */
function LuminaAvatar() {
  return (
    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-coral flex items-center justify-center flex-shrink-0 shadow-glow-primary">
      <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
    </div>
  );
}

/**
 * Text-to-Speech button component.
 */
function SpeakButton({ message }) {
  const { speak, stop, isMessageSpeaking, isSupported } = useSpeechContext();
  const isSpeaking = isMessageSpeaking(message.id);

  if (!isSupported) return null;

  const handleClick = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(message.content, message.id);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        p-1.5 rounded-lg transition-all duration-200
        ${isSpeaking
          ? 'bg-primary/20 text-primary animate-pulse'
          : 'text-text-muted hover:text-primary hover:bg-primary/10'
        }
      `}
      aria-label={isSpeaking ? 'Stop speaking' : 'Read message aloud'}
      title={isSpeaking ? 'Stop' : 'Listen'}
    >
      {isSpeaking ? (
        <VolumeX className="w-4 h-4" aria-hidden="true" />
      ) : (
        <Volume2 className="w-4 h-4" aria-hidden="true" />
      )}
    </button>
  );
}

/**
 * Message bubble component.
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
    <div className="flex items-start gap-3 animate-fade-in group">
      <LuminaAvatar />
      <div className="flex-1">
        <div
          className={`message-lumina ${isError ? 'border-l-4 border-error bg-error/5' : ''}`}
        >
          {isError ? (
            <p className="text-error">{message.content}</p>
          ) : (
            <div className="markdown-content">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
        {/* TTS Button - Only show for non-error Lumina messages */}
        {!isError && (
          <div className="mt-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <SpeakButton message={message} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
