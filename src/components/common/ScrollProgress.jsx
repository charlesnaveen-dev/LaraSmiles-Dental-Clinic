import React, { useEffect, useState } from 'react';
import styles from './ScrollProgress.module.css';

export const ScrollProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const currentScroll = window.scrollY;
      setScrollPercentage((currentScroll / totalHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.progressTrack}>
      <div 
        className={styles.progressBar} 
        style={{ width: `${scrollPercentage}%` }} 
      />
    </div>
  );
};
