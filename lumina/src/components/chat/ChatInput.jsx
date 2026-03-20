/**
 * Chat input component with send button and keyboard handling.
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import Button from '../ui/Button';

/**
 * Chat input component.
 * @param {Object} props - Component props
 * @param {Function} props.onSend - Callback when sending a message
 * @param {boolean} props.disabled - Whether input is disabled
 * @param {string} props.placeholder - Input placeholder text
 */
function ChatInput({ onSend, disabled = false, placeholder = 'Ask Lumina anything...' }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  /**
   * Auto-resize textarea based on content.
   */
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [value]);

  /**
   * Handle form submission.
   */
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setValue('');

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  }, [value, disabled, onSend]);

  /**
   * Handle keyboard shortcuts.
   */
  const handleKeyDown = useCallback((e) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }, [handleSubmit]);

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-3 p-4 bg-surface/50 backdrop-blur-md border-t border-white/5"
    >
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          rows={1}
          aria-label="Message input"
          className="input-field w-full resize-none pr-4 min-h-[48px] max-h-[150px]"
        />
      </div>

      <Button
        type="submit"
        disabled={!canSend}
        aria-label="Send message"
        size="icon"
        className="h-12 w-12 rounded-xl flex-shrink-0"
      >
        <Send className="w-5 h-5" aria-hidden="true" />
      </Button>
    </form>
  );
}

export default ChatInput;
