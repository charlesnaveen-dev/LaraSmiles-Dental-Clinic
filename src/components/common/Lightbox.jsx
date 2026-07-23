import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import styles from './Lightbox.module.css';

export const Lightbox = ({ isOpen, image, title, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !image) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close Lightbox">
        <X size={24} />
      </button>

      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <img src={image} alt={title || 'LARA Smiles Gallery'} className={styles.image} />
        {title && (
          <div className={styles.caption}>
            <span>{title}</span>
          </div>
        )}
      </div>
    </div>
  );
};
