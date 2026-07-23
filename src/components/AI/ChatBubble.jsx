import React, { useState, forwardRef } from 'react';
import { Copy, Check, Calendar, MessageCircle, MapPin, Phone } from 'lucide-react';
import styles from './AIAssistant.module.css';

export const ChatBubble = forwardRef(({ message, onActionClick }, ref) => {
  const [copied, setCopied] = useState(false);
  const isBot = message.sender === 'bot';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to format text with bolding and newlines
  const formatContent = (text) => {
    if (!text) return null;

    const lines = text.split('\n');
    return lines.map((line, lIdx) => {
      // Parse bold **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <React.Fragment key={lIdx}>
          {formattedLine}
          {lIdx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div ref={ref} className={`${styles.bubbleRow} ${isBot ? styles.botRow : styles.userRow}`}>
      {isBot && (
        <div className={styles.botAvatarCircle}>
          <span>🦷</span>
        </div>
      )}

      <div className={styles.bubbleContentGroup}>
        <div className={`${styles.bubble} ${isBot ? styles.botBubble : styles.userBubble}`}>
          <div className={styles.bubbleText}>
            {formatContent(message.text)}
          </div>

          {/* Action buttons inside bot messages */}
          {isBot && message.actions && message.actions.length > 0 && (
            <div className={styles.actionsGroup}>
              {message.actions.map((act, aIdx) => (
                <button
                  key={aIdx}
                  onClick={() => onActionClick(act)}
                  className={styles.actionBtn}
                  type="button"
                >
                  {act.type === 'book_appointment' && <Calendar size={14} />}
                  {act.type === 'whatsapp' && <MessageCircle size={14} />}
                  {act.type === 'google_maps' && <MapPin size={14} />}
                  {act.type === 'call' && <Phone size={14} />}
                  <span>{act.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Message Footer: Timestamp & Copy button */}
        <div className={styles.bubbleMeta}>
          <span className={styles.timestamp}>{message.timestamp}</span>
          {isBot && (
            <button
              onClick={handleCopy}
              className={styles.copyBtn}
              title="Copy message"
              aria-label="Copy message text"
              type="button"
            >
              {copied ? <Check size={12} className={styles.checkIcon} /> : <Copy size={12} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
