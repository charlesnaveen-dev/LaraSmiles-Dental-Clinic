import React, { useEffect, useRef } from 'react';
import { Cpu, UserCheck, Heart, ShieldCheck, Activity, Smile } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhyChoose.module.css';

gsap.registerPlugin(ScrollTrigger);

export const WhyChoose = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.compactCard}`,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
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

  const features = [
    {
      icon: <Cpu size={22} className={styles.icon} />,
      title: 'Advanced Technology',
      desc: '3D iTero® intraoral digital scanning.'
    },
    {
      icon: <UserCheck size={22} className={styles.icon} />,
      title: 'Experienced Doctors',
      desc: 'Accredited multi-specialty surgeons.'
    },
    {
      icon: <Heart size={22} className={styles.icon} />,
      title: 'Personalized Care',
      desc: 'Tailored 3D smile redesign plans.'
    },
    {
      icon: <ShieldCheck size={22} className={styles.icon} />,
      title: 'Comfort & Safety',
      desc: 'Painless micro-anesthesia & sterilization.'
    },
    {
      icon: <Activity size={22} className={styles.icon} />,
      title: 'Digital Dentistry',
      desc: 'Zero impression trays, 100% precision.'
    },
    {
      icon: <Smile size={22} className={styles.icon} />,
      title: 'Patient First Approach',
      desc: 'Gentle, transparent & compassionate care.'
    }
  ];

  return (
    <section className={styles.compactSection} ref={sectionRef}>
      <div className="container">
        <div className={styles.headerCompact}>
          <span className={styles.tag}>Why Choose LARA Smiles</span>
          <h2 className={styles.title}>Redefining Dental Excellence</h2>
        </div>

        {/* Single Row 6-Column Desktop Bar */}
        <div className={styles.cardsRow}>
          {features.map((item, idx) => (
            <div key={idx} className={styles.compactCard}>
              <div className={styles.iconBox}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
