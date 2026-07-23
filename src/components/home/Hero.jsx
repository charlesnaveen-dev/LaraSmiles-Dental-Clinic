import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Star, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { Logo } from '@/components/common/Logo';
import heroImg from '@/assets/images/LaraSmile/hero-smile.jpg';
import styles from './Hero.module.css';

export const Hero = ({ onOpenAppointment }) => {
  const heroRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightVisualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clean stagger reveal
      gsap.fromTo(
        leftContentRef.current.children,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
      );

      gsap.fromTo(
        rightVisualRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.3 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.heroSection} ref={heroRef}>
      <div className={`container ${styles.heroContainer}`}>
        {/* LEFT SIDE: Clean Minimalist Layout */}
        <div className={styles.leftSide} ref={leftContentRef}>
          {/* Official LARA Smiles Logo */}
          <div className={styles.logoWrapper}>
            <Logo height={58} showTagline={false} />
          </div>

          <h1 className={styles.headline}>
            Believe in Your <span className="gradient-text">Smile.</span>
          </h1>

          <p className={styles.subtitle}>
            Creating confident smiles with advanced dental care, Invisalign®, dental implants, and personalized smile transformations.
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

          {/* Single Subtle Trust Badge */}
          <div className={styles.singleTrustBadge}>
            <div className={styles.starsRow}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className={styles.starIcon} fill="#D4AF37" />
              ))}
            </div>
            <span className={styles.trustText}>4.9 Google Rating</span>
            <span className={styles.dotSeparator}>•</span>
            <span className={styles.subText}>Official Invisalign® Provider</span>
          </div>
        </div>

        {/* RIGHT SIDE: One Clean Premium Hero Image with 1 Subtle Floating Card */}
        <div className={styles.rightSide} ref={rightVisualRef}>
          <div className={styles.imageWrapper}>
            <img
              src={heroImg}
              alt="LARA Smiles Premium Dental Care"
              className={styles.heroImage}
            />

            {/* Single Subtle Floating Glass Pill */}
            <div className={styles.minimalGlassCard}>
              <ShieldCheck size={20} className={styles.glassIcon} />
              <div>
                <span className={styles.glassTitle}>Invisalign® Provider</span>
                <span className={styles.glassSub}>Advanced 3D Smile Planning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
