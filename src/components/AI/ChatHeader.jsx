import React from 'react';
import { Minus, X, Sparkles } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import styles from './AIAssistant.module.css';

export const ChatHeader = ({ onMinimize, onClose }) => {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.headerLeft}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarCircle}>
            <span className={styles.toothEmoji}>🦷</span>
          </div>
          <span className={styles.onlineBadge} title="Online & Ready to Assist" />
        </div>

        <div className={styles.headerTitleGroup}>
          <div className={styles.nameRow}>
            <h3 className={styles.assistantName}>Lara AI</h3>
            <Sparkles size={14} className={styles.sparkleIcon} />
          </div>
          <p className={styles.assistantSub}>Your Smile Assistant</p>
        </div>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.miniLogo}>
          <Logo height={22} showTagline={false} />
        </div>

        <div className={styles.headerControls}>
          <button
            onClick={onMinimize}
            className={styles.controlBtn}
            title="Minimize Chat"
            aria-label="Minimize Chat Window"
            type="button"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={onClose}
            className={styles.controlBtn}
            title="Close Chat"
            aria-label="Close Chat Window"
            type="button"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
