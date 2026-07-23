import React, { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import gsap from 'gsap';
import { ChatHeader } from './ChatHeader';
import { ChatBubble } from './ChatBubble';
import { TypingIndicator } from './TypingIndicator';
import { QuickActions } from './QuickActions';
import styles from './AIAssistant.module.css';

export const ChatWindow = ({
  messages,
  isTyping,
  onSendMessage,
  onActionClick,
  onMinimize,
  onClose
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);

  const windowRef = useRef(null);
  const containerRef = useRef(null);
  const lastMessageRef = useRef(null);
  const inputRef = useRef(null);

  // GSAP opening animation
  useEffect(() => {
    if (windowRef.current) {
      gsap.fromTo(
        windowRef.current,
        { opacity: 0, scale: 0.85, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.4)' }
      );
    }
  }, []);

  // Detect manual upward scrolling
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    // If distance from bottom is greater than 100px, user manually scrolled up
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
    setIsUserScrolledUp(isScrolledUp);
  };

  // Scroll to newest message (never auto-scroll to QuickActions)
  useEffect(() => {
    if (!isUserScrolledUp && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, isTyping]);

  // ESC key listener to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setIsUserScrolledUp(false); // Reset user scroll state on new message
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div
      ref={windowRef}
      className={styles.chatWindow}
      role="dialog"
      aria-label="Lara AI Dental Assistant"
      aria-modal="true"
    >
      {/* Header */}
      <ChatHeader onMinimize={onMinimize} onClose={onClose} />

      {/* Messages Scroll Area */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={styles.messagesContainer}
      >
        {messages.map((msg, idx) => (
          <ChatBubble
            key={msg.id}
            ref={idx === messages.length - 1 ? lastMessageRef : null}
            message={msg}
            onActionClick={onActionClick}
          />
        ))}

        {isTyping && <TypingIndicator />}

        {/* Quick Action Chips */}
        <QuickActions onSelectChip={(query) => {
          setIsUserScrolledUp(false);
          onSendMessage(query);
        }} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask Lara AI anything..."
          className={styles.chatInput}
          aria-label="Message Lara AI"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className={`${styles.sendBtn} ${inputValue.trim() ? styles.sendBtnActive : ''}`}
          title="Send message"
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};
