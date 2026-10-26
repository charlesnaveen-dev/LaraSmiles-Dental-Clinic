import React from 'react';
import { Calendar, Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import styles from './CTASection.module.css';

export const CTASection = ({ onOpenAppointment }) => {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaBox}>
          <div className={styles.badgeWrapper}>
            <span className={styles.tag}>
              <Sparkles size={14} />
              <span>Start Your Smile Transformation</span>
            </span>
          </div>

          <h2 className={styles.title}>Your Confident Smile Starts Here</h2>
          
          <p className={styles.subtitle}>
            Book your consultation with LARA Smiles specialists today. Experience digital 3D accuracy, painless treatments, and world-class clinical care in a comfortable luxury setting.
          </p>

          <div className={styles.btnGroup}>
            <button
              onClick={onOpenAppointment}
              className={styles.primaryBtn}
              type="button"
              aria-label="Book Dental Consultation"
            >
              <Calendar size={18} />
              <span>Book Appointment</span>
            </button>

            <a
              href="tel:+919384959626"
              className={styles.callBtn}
              aria-label="Call LARA Smiles Clinic"
            >
              <Phone size={18} />
              <span>Call +91 93849 59626</span>
            </a>
          </div>

          <div className={styles.trustNotes}>
            <span className={styles.trustItem}>
              <CheckCircle2 size={15} className={styles.checkIcon} />
              <span>5 Modern Clinics in South India</span>
            </span>
            <span className={styles.bulletDot}>•</span>
            <span className={styles.trustItem}>
              <CheckCircle2 size={15} className={styles.checkIcon} />
              <span>Digital 3D Smile Simulation</span>
            </span>
            <span className={styles.bulletDot}>•</span>
            <span className={styles.trustItem}>
              <CheckCircle2 size={15} className={styles.checkIcon} />
              <span>100% Pain-Free Care</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
