import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Star, Calendar, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import heroImg from '@/assets/images/LaraSmile/hero-smile.jpg';
import styles from './Hero.module.css';

export const Hero = ({ onOpenAppointment }) => {
  const heroRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightVisualRef = useRef(null);

  useEffect(() => {
    // Subtle, graceful entrance that never hides content if JS or prefers-reduced-motion triggers
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftContentRef.current?.children || [],
        { opacity: 0.2, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' }
      );

      if (rightVisualRef.current) {
        gsap.fromTo(
          rightVisualRef.current,
          { opacity: 0.3, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out', delay: 0.1 }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.heroSection} ref={heroRef}>
      <div className={`container ${styles.heroContainer}`}>
        {/* LEFT SIDE: Dentis-Inspired Editorial Dental Composition */}
        <div className={styles.leftSide} ref={leftContentRef}>
          {/* Refined Dental Category Pill */}
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Premier Dental Care in South India</span>
          </div>

          <h1 className={styles.headline}>
            Believe in Your <span className="gradient-text">Smile.</span>
          </h1>

          <p className={styles.subtitle}>
            Creating confident smiles with advanced dental care, Invisalign® clear aligners, permanent dental implants, and personalized smile transformations.
          </p>

          {/* Action Buttons */}
          <div className={styles.ctaGroup}>
            <button onClick={onOpenAppointment} className={styles.primaryBtn}>
              <Calendar size={18} />
              <span>Book Appointment</span>
            </button>

            <NavLink to="/treatments" className={styles.secondaryBtn}>
              <span>Explore Treatments</span>
              <ArrowRight size={18} />
            </NavLink>
          </div>

          {/* Dentis-style Authentic Proof Strip */}
          <div className={styles.trustStrip}>
            <div className={styles.starsRow}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className={styles.starIcon} fill="#D4AF37" stroke="#D4AF37" />
              ))}
            </div>
            <span className={styles.trustText}>4.9 Google Rating</span>
            <span className={styles.dotSeparator}>•</span>
            <span className={styles.subText}>Official Invisalign® Provider</span>
            <span className={styles.dotSeparator}>•</span>
            <span className={styles.subText}>15,000+ Happy Smiles</span>
          </div>
        </div>

        {/* RIGHT SIDE: Elegant Clean Clinic Visual with Subtle Healthcare Badge */}
        <div className={styles.rightSide} ref={rightVisualRef}>
          <div className={styles.imageWrapper}>
            <img
              src={heroImg}
              alt="LARA Smiles Confident Smile Transformation"
              className={styles.heroImage}
              width="480"
              height="600"
              loading="eager"
            />

            {/* Subtle Clinical Accreditation Pill */}
            <div className={styles.floatingBadge}>
              <div className={styles.badgeIconCircle}>
                <ShieldCheck size={20} className={styles.badgeIcon} />
              </div>
              <div className={styles.badgeTextCol}>
                <span className={styles.badgeTitle}>Invisalign® Diamond Provider</span>
                <span className={styles.badgeSub}>3D Digital Smile Simulation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
