import React, { useEffect, useRef } from 'react';
import { Star, Users, MapPin, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './TrustSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export const TrustSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.metricCard}`,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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

  const metrics = [
    {
      icon: <Star size={28} className={styles.goldIcon} />,
      value: '4.9 ⭐',
      label: 'Google Rating',
      sub: 'Based on 1,200+ verified patient reviews'
    },
    {
      icon: <Users size={28} className={styles.purpleIcon} />,
      value: '15,000+',
      label: 'Happy Patients',
      sub: 'Personalized smile transformations'
    },
    {
      icon: <MapPin size={28} className={styles.blueIcon} />,
      value: '5 Branches',
      label: 'Across South India',
      sub: 'Tiruppur, Salem, Madurai, Bangalore, Sivakasi'
    },
    {
      icon: <Award size={28} className={styles.goldIcon} />,
      value: '12+ Years',
      label: 'Clinical Excellence',
      sub: 'Advanced digital dentistry standards'
    }
  ];

  return (
    <section className={styles.trustSection} ref={sectionRef}>
      <div className="container">
        <div className={styles.grid}>
          {metrics.map((item, idx) => (
            <div key={idx} className={styles.metricCard}>
              <div className={styles.iconBox}>{item.icon}</div>
              <div className={styles.value}>{item.value}</div>
              <div className={styles.label}>{item.label}</div>
              <div className={styles.sub}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
