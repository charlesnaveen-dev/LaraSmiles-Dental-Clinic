import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, X, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ChatWindow } from './ChatWindow';
import { processUserMessage } from './FAQEngine';
import styles from './AIAssistant.module.css';

export const AIAssistant = ({ onOpenAppointment }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showInvitationCard, setShowInvitationCard] = useState(false);

  const buttonRef = useRef(null);
  const invitationRef = useRef(null);

  // Helper for context-aware prompt based on current route
  const getPagePrompt = (path) => {
    if (path.startsWith('/treatments')) {
      return 'Need help understanding a treatment?';
    }
    if (path.startsWith('/doctors')) {
      return 'Looking for the right dentist?';
    }
    if (path.startsWith('/gallery')) {
      return 'Want to know more about our clinic?';
    }
    if (path.startsWith('/contact')) {
      return 'Need help booking an appointment?';
    }
    return 'Need help choosing the right treatment?';
  };

  // Generate welcome message
  const createWelcomeMessage = (path) => ({
    id: `welcome-${Date.now()}`,
    sender: 'bot',
    text: `Hello 👋\nWelcome to LARA Smiles.\n\nI'm Lara AI, your personal dental assistant.\n\n${getPagePrompt(path)}\n\nI can help you with:\n\n🦷 Invisalign® Clear Aligners\n😁 Full Smile Makeovers\n🦷 Dental Implants\n✨ Laser Teeth Whitening\n📅 Booking Appointments\n📍 Clinic Location & Directions\n⏰ Clinic Operating Timings\n💬 General Dental Questions\n\nHow can I help you today?`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    actions: [
      { type: 'book_appointment', label: '📅 Book Appointment' },
      { type: 'whatsapp', label: '💬 Chat on WhatsApp' }
    ]
  });

  const [messages, setMessages] = useState([createWelcomeMessage(location.pathname)]);

  // Update initial welcome message if path changes before user interacts
  useEffect(() => {
    if (messages.length === 1 && messages[0].id.startsWith('welcome-')) {
      setMessages([createWelcomeMessage(location.pathname)]);
    }
  }, [location.pathname]);

  // Home Page Popup Invitation Card Timer (4.5s after mount on home page)
  useEffect(() => {
    const isHomePage = location.pathname === '/';
    const isDismissed = sessionStorage.getItem('lara_ai_popup_dismissed');

    if (isHomePage && !isDismissed && !isOpen) {
      const popupTimer = setTimeout(() => {
        setShowInvitationCard(true);
      }, 4500);

      return () => clearTimeout(popupTimer);
    } else {
      setShowInvitationCard(false);
    }
  }, [location.pathname, isOpen]);

  // GSAP Entrance animation for Invitation Card
  useEffect(() => {
    if (showInvitationCard && invitationRef.current) {
      gsap.fromTo(
        invitationRef.current,
        { opacity: 0, x: -15, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }
      );
    }
  }, [showInvitationCard]);

  // Gentle floating animation for AI trigger button
  useEffect(() => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        y: -3,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, []);

  const handleDismissInvitation = () => {
    setShowInvitationCard(false);
    sessionStorage.setItem('lara_ai_popup_dismissed', 'true');
  };

  const handleOpenFromInvitation = () => {
    handleDismissInvitation();
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleToggleOpen = () => {
    if (showInvitationCard) {
      handleDismissInvitation();
    }
    if (isMinimized) {
      setIsMinimized(false);
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleSendMessage = (userText) => {
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const response = processUserMessage(userText);
      const botMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: response.actions
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 550);
  };

  const handleActionClick = (action) => {
    if (action.type === 'book_appointment') {
      if (onOpenAppointment) {
        onOpenAppointment();
      }
    } else if (action.type === 'whatsapp') {
      const whatsappUrl = `https://wa.me/919384959626?text=${encodeURIComponent('Hello Lara Smiles, I would like to inquire about booking a dental consultation.')}`;
      window.open(whatsappUrl, '_blank');
    } else if (action.type === 'google_maps') {
      window.open(action.url || 'https://maps.google.com/?q=LARA+Smiles+Dental+Clinic+Tiruppur', '_blank');
    } else if (action.type === 'call') {
      window.location.href = action.url || 'tel:+919384959626';
    }
  };

  return (
    <>
      <div className={styles.aiButtonWrapper}>
        {/* Home Page AI Invitation Popup Card */}
        {showInvitationCard && !isOpen && (
          <div ref={invitationRef} className={styles.invitationCard}>
            <button
              onClick={handleDismissInvitation}
              className={styles.invitationCloseBtn}
              title="Close Invitation"
              aria-label="Close AI Invitation"
              type="button"
            >
              <X size={14} />
            </button>

            <div className={styles.invitationHeader}>
              <Sparkles size={16} className={styles.invitationSparkle} />
              <span className={styles.invitationTitle}>Ask Lara AI</span>
            </div>

            <p className={styles.invitationText}>
              Need help choosing the right treatment?
            </p>

            <button
              onClick={handleOpenFromInvitation}
              className={styles.askNowBtn}
              type="button"
            >
              <span>Ask Now</span>
              <ChevronRight size={14} />
            </button>
          </div>
        )}

        {/* Floating AI Trigger Button (Expands to Pill on Hover) */}
        <button
          ref={buttonRef}
          onClick={handleToggleOpen}
          className={styles.aiTriggerBtn}
          title="Ask Lara AI Dental Assistant"
          aria-label="Open Lara AI Dental Assistant Chat"
          type="button"
        >
          <div className={styles.btnIconWrapper}>
            <Sparkles size={20} className={styles.sparkleIconMain} />
          </div>

          <div className={styles.pillLabelGroup}>
            <span className={styles.pillTitle}>Ask Lara AI</span>
            <span className={styles.pillSub}>Get instant answers</span>
          </div>
        </button>
      </div>

      {/* Chat Window Modal */}
      {isOpen && !isMinimized && (
        <ChatWindow
          messages={messages}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
          onActionClick={handleActionClick}
          onMinimize={() => setIsMinimized(true)}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
