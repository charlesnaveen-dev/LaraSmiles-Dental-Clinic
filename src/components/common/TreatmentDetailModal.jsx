import React, { useEffect, useState } from 'react';
import { X, Calendar, CheckCircle2, ChevronDown, Sparkles, ShieldCheck } from 'lucide-react';
import styles from './TreatmentDetailModal.module.css';

export const TreatmentDetailModal = ({ isOpen, treatment, onClose, onBook }) => {
  const [openFaq, setOpenFaq] = useState(null);

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

  if (!isOpen || !treatment) return null;

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className={styles.header}>
          <span className={styles.badge}><Sparkles size={14} /> {treatment.badge || 'Procedure Details'}</span>
          <h2 className={styles.title}>{treatment.title}</h2>
        </div>

        {/* Modal Scrollable Content */}
        <div className={styles.bodyScroll}>
          {/* Overview */}
          <div className={styles.overviewBox}>
            <p className={styles.overviewText}>{treatment.overview}</p>
          </div>

          {/* Full Benefits */}
          {treatment.benefits && (
            <div className={styles.sectionBlock}>
              <h3 className={styles.blockTitle}><ShieldCheck size={18} className={styles.iconPurple} /> Procedure Benefits</h3>
              <ul className={styles.benefitsGrid}>
                {treatment.benefits.map((b, idx) => (
                  <li key={idx} className={styles.benefitItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQs Accordion */}
          {treatment.faqs && treatment.faqs.length > 0 && (
            <div className={styles.sectionBlock}>
              <h3 className={styles.blockTitle}>Frequently Asked Questions</h3>
              <div className={styles.faqList}>
                {treatment.faqs.map((faq, fIdx) => {
                  const isOpenFaq = openFaq === fIdx;
                  return (
                    <div key={fIdx} className={styles.faqCard}>
                      <button 
                        className={styles.faqQuestion} 
                        onClick={() => toggleFaq(fIdx)}
                        aria-expanded={isOpenFaq}
                      >
                        <span>{faq.question}</span>
                        <ChevronDown size={18} className={`${styles.faqChevron} ${isOpenFaq ? styles.faqChevronOpen : ''}`} />
                      </button>
                      {isOpenFaq && (
                        <div className={styles.faqAnswer}>
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className={styles.footerAction}>
          <button 
            onClick={() => {
              onClose();
              if (onBook) onBook();
            }} 
            className={styles.bookBtn}
          >
            <Calendar size={18} /> Book Appointment for {treatment.title.split(' ')[0]}
          </button>
        </div>
      </div>
    </div>
  );
};
