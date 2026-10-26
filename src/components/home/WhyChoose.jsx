import React from 'react';
import { Cpu, ShieldCheck, Heart, Award, CheckCircle2, Sparkles } from 'lucide-react';
import styles from './WhyChoose.module.css';

export const WhyChoose = () => {
  const highlights = [
    {
      icon: <Cpu size={22} className={styles.featureIcon} />,
      title: '3D iTero® Digital Scanning',
      desc: 'Zero messy impression trays. Instant 3D digital oral maps for precise aligners and implants.'
    },
    {
      icon: <Sparkles size={22} className={styles.featureIcon} />,
      title: 'Invisalign® Diamond Provider',
      desc: 'Certified specialists delivering subtle, comfortable teeth alignment tailored to your face.'
    },
    {
      icon: <ShieldCheck size={22} className={styles.featureIcon} />,
      title: 'Class-B Sterile Safety',
      desc: 'International hospital-grade sterilization protocols ensuring 100% infection-free care.'
    },
    {
      icon: <Heart size={22} className={styles.featureIcon} />,
      title: 'Painless Micro-Anesthesia',
      desc: 'Gentle delivery techniques and rotary endodontics ensuring your treatment is calm and pain-free.'
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.layoutGrid}>
          {/* Left Column: Clinic Reputation & Trust Card */}
          <div className={styles.trustCard}>
            <div className="section-tag">
              <Award size={14} />
              <span>Why Choose Us</span>
            </div>
            <h2 className={styles.mainTitle}>
              Setting The Standard In Modern Dental Care
            </h2>
            <p className={styles.mainDesc}>
              At LARA Smiles, we combine world-class 3D intraoral digital precision with a warm, patient-first approach to give you the healthy, radiant smile you deserve.
            </p>

            <div className={styles.statsRow}>
              <div className={styles.statBox}>
                <span className={styles.statNum}>15,000+</span>
                <span className={styles.statLabel}>Smiles Perfected</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statBox}>
                <span className={styles.statNum}>4.9★</span>
                <span className={styles.statLabel}>Verified Google Rating</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statBox}>
                <span className={styles.statNum}>5 Branches</span>
                <span className={styles.statLabel}>Across South India</span>
              </div>
            </div>

            <div className={styles.guaranteePill}>
              <CheckCircle2 size={18} className={styles.guaranteeIcon} />
              <span>Transparent Pricing • No Hidden Costs • Digital 3D Previews</span>
            </div>
          </div>

          {/* Right Column: 2x2 Feature Bento */}
          <div className={styles.featuresGrid}>
            {highlights.map((item, idx) => (
              <div key={idx} className={styles.featureCard}>
                <div className={styles.iconCircle}>{item.icon}</div>
                <h3 className={styles.featureTitle}>{item.title}</h3>
                <p className={styles.featureDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
