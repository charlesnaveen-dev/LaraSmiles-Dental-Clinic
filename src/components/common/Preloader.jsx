import React, { useEffect, useState } from 'react';
import { Logo } from '@/components/common/Logo';
import styles from './Preloader.module.css';

export const Preloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 600);
          }, 300);
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className={`${styles.overlay} ${isFading ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <Logo height={64} className={styles.logo} />
        <div className={styles.progressTrack}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.percentage}>{progress}%</div>
      </div>
    </div>
  );
};
