import React from 'react';
import styles from './AIAssistant.module.css';

export const TypingIndicator = () => {
  return (
    <div className={styles.typingContainer} aria-label="Lara AI is typing">
      <div className={styles.avatarTiny}>🦷</div>
      <div className={styles.typingBubble}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <span className={styles.typingText}>Lara AI is thinking...</span>
    </div>
  );
};
