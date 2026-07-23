import React, { useEffect, useRef } from 'react';
import { Calendar, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CTASection.module.css';

gsap.registerPlugin(ScrollTrigger);

export const CTASection = ({ onOpenAppointment }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.94, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.ctaSection} ref={sectionRef}>
      <div className={`container ${styles.ctaContainer}`} ref={containerRef}>
        <div className={styles.glowBg} />

        <span className={styles.tag}>Transform Your Life Today</span>

        <h2 className={styles.title}>Your Perfect Smile Starts Here</h2>
        
        <p className={styles.subtitle}>
          Book your personalized consultation with LARA Smiles specialists today. Experience pain-free dentistry in a luxury environment.
        </p>

        <div className={styles.btnGroup}>
          <button onClick={onOpenAppointment} className={styles.primaryBtn}>
            <Calendar size={18} />
            Book Appointment
          </button>

          <a href="tel:+919384959626" className={styles.callBtn}>
            <Phone size={18} />
            Call +91 93849 59626
          </a>
        </div>
      </div>
    </section>
  );
};
