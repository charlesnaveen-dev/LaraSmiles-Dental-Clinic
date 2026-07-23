import React, { useEffect, useState } from 'react';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';
import { AIAssistant } from '@/components/AI/AIAssistant';
import styles from './FloatingActions.module.css';

export const FloatingActions = ({ onOpenAppointment }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent(
    'Hello Lara Smiles, I would like to inquire about booking a dental consultation.'
  );
  const whatsappUrl = `https://wa.me/919384959626?text=${whatsappMessage}`;

  return (
    <div className={styles.stackContainer}>
      {/* 1. Back To Top Button (Appears above existing buttons when scrolling > 400px) */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`${styles.actionBtn} ${styles.topBtn} ${styles.topBtnAnim}`}
          title="Back to Top"
          aria-label="Scroll back to top"
          type="button"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* 2. Lara AI Assistant Trigger Button & Invitation Card */}
      <AIAssistant onOpenAppointment={onOpenAppointment} />

      {/* 3. Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.actionBtn} ${styles.whatsappBtn}`}
        title="Chat on WhatsApp"
        aria-label="Chat with LARA Smiles on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      {/* 4. Floating Call Button */}
      <a
        href="tel:+919384959626"
        className={`${styles.actionBtn} ${styles.callBtn}`}
        title="Call LARA Smiles"
        aria-label="Call LARA Smiles Dental Clinic"
      >
        <Phone size={22} />
      </a>
    </div>
  );
};
