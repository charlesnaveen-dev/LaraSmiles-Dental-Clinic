import React from 'react';
import { ShieldCheck, Target, Compass, Sparkles, Building2, Cpu, CheckCircle2, Heart, Award } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import { CTASection } from '@/components/home/CTASection';
import doctorTeam from '@/assets/images/LaraSmile/doctor-team.jpg';
import styles from './AboutPage.module.css';

export const AboutPage = ({ onOpenAppointment }) => {
  return (
    <>
      <SEOHead 
        title="About Us | LARA Smiles Dental Excellence"
        description="Discover LARA Smiles story, care philosophy, 3D intraoral digital technology, certified specialists, and why patients across South India trust our care."
        path="/about"
      />

      {/* Hero Header */}
      <section className={styles.hero}>
        <div className="container">
          <div className="section-tag">
            <ShieldCheck size={14} />
            <span>About LARA Smiles</span>
          </div>
          <h1 className={styles.heroTitle}>Setting The Standard In Modern Dentistry</h1>
          <p className={styles.heroDesc}>
            At LARA Smiles, we combine cutting-edge 3D intraoral digital accuracy with luxury comfort to create confident, natural smiles across South India.
          </p>
        </div>
      </section>

      {/* Editorial Story Section */}
      <section className={`section ${styles.storySection}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <div className="section-tag">
                <Sparkles size={14} />
                <span>Our Philosophy</span>
              </div>
              <h2 className={styles.sectionTitle}>Built On Trust, Innovation & Clinical Passion</h2>
              <p className={styles.storyParagraph}>
                LARA Smiles was founded with a singular conviction: to replace traditional, anxious dental visits with a peaceful, tech-driven, and completely pain-free experience.
              </p>
              <p className={styles.storyParagraph}>
                Over the years, we have grown into one of South India's premier multi-specialty dental centers, equipped with state-of-the-art 3D iTero® digital intraoral scanners, rotary endodontic systems, and certified Invisalign® Diamond Provider expertise.
              </p>
              <p className={styles.storyParagraph}>
                From simple preventive check-ups to complex full-mouth reconstructions and subtle aligner transformations, our accredited dental surgeons tailor every procedure to your unique facial aesthetics and oral health.
              </p>
            </div>

            <div className={styles.storyImgWrapper}>
              <img
                src={doctorTeam}
                alt="LARA Smiles Specialist Doctor Team"
                className={styles.storyImg}
                width="540"
                height="420"
                loading="lazy"
              />
              <div className={styles.imgCaption}>
                <span className={styles.captionTitle}>Multi-Disciplinary Specialist Team</span>
                <span className={styles.captionSub}>Tiruppur • Salem • Madurai • Bangalore • Sivakasi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className={`section ${styles.missionSection}`}>
        <div className="container">
          <div className={styles.missionGrid}>
            <div className={styles.missionCard}>
              <div className={styles.iconBoxPurple}>
                <Target size={24} />
              </div>
              <h3 className={styles.cardTitle}>Our Mission</h3>
              <p className={styles.cardText}>
                To deliver world-class, pain-free dental care using digital precision scanning, gentle micro-anesthesia, and biocompatible materials while building lifelong trust with every patient and family.
              </p>
            </div>

            <div className={styles.missionCard}>
              <div className={styles.iconBoxBlue}>
                <Compass size={24} />
              </div>
              <h3 className={styles.cardTitle}>Our Vision</h3>
              <p className={styles.cardText}>
                To lead South India in cosmetic dentistry and implantology, setting international benchmarks for patient comfort, digital diagnostic accuracy, and life-changing smile transformations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Dental Technology Suite */}
      <section className={`section ${styles.facilitiesSection}`}>
        <div className="container">
          <div className={styles.headerCenter}>
            <div className="section-tag">
              <Building2 size={14} />
              <span>Technology Suite</span>
            </div>
            <h2 className={styles.sectionTitle}>Modern Dental Technology</h2>
            <p className={styles.headerSub}>
              Engineered with advanced 3D digital imaging, strict infection control protocols, and pain-free systems.
            </p>
          </div>

          <div className={styles.facilitiesGrid}>
            <div className={styles.facilityCard}>
              <div className={styles.facilityIconCircle}>
                <Cpu size={24} className={styles.facilityIcon} />
              </div>
              <h4>3D iTero® Digital Scanners</h4>
              <p>Replaces uncomfortable impression trays with instant, ultra-precise 3D digital oral maps for aligners and crowns.</p>
            </div>

            <div className={styles.facilityCard}>
              <div className={styles.facilityIconCircle}>
                <ShieldCheck size={24} className={styles.facilityIcon} />
              </div>
              <h4>Class-B Autoclave Suite</h4>
              <p>Strict sterilization protocols following international hospital standards to guarantee 100% sterile instruments.</p>
            </div>

            <div className={styles.facilityCard}>
              <div className={styles.facilityIconCircle}>
                <Sparkles size={24} className={styles.facilityIcon} />
              </div>
              <h4>Rotary Painless Endodontics</h4>
              <p>Advanced rotary technology ensuring root canal treatments are completed comfortably and smoothly in a single visit.</p>
            </div>

            <div className={styles.facilityCard}>
              <div className={styles.facilityIconCircle}>
                <Heart size={24} className={styles.facilityIcon} />
              </div>
              <h4>Gentle Micro-Anesthesia</h4>
              <p>Ultra-fine delivery techniques minimizing discomfort and ensuring total relaxation during surgical and restorative care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Patients Choose Lara Smiles */}
      <section className={`section ${styles.trustSection}`}>
        <div className="container">
          <div className={styles.trustBox}>
            <div className="section-tag">
              <Award size={14} />
              <span>Clinical Reputation</span>
            </div>
            <h2 className={styles.sectionTitle}>Why Patients Choose LARA Smiles</h2>

            <div className={styles.trustGrid}>
              <div className={styles.trustItem}>
                <CheckCircle2 size={22} className={styles.checkIcon} />
                <div>
                  <h4>Certified Invisalign® Diamond Provider</h4>
                  <p>Proven track record in subtle, clear aligner smile straightening with 3D digital smile previews.</p>
                </div>
              </div>

              <div className={styles.trustItem}>
                <CheckCircle2 size={22} className={styles.checkIcon} />
                <div>
                  <h4>Multi-Specialty Surgeon Team</h4>
                  <p>Collaborative care with endodontists, prosthodontists, periodontists, and implantologists.</p>
                </div>
              </div>

              <div className={styles.trustItem}>
                <CheckCircle2 size={22} className={styles.checkIcon} />
                <div>
                  <h4>15,000+ Smiles Transformed</h4>
                  <p>Consistently rated 4.9★ across verified patient Google reviews with lifelong patient relationships.</p>
                </div>
              </div>

              <div className={styles.trustItem}>
                <CheckCircle2 size={22} className={styles.checkIcon} />
                <div>
                  <h4>Transparent & Personal Masterplans</h4>
                  <p>No unexpected costs, clear timelines, and tailored digital previews before treatment starts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection onOpenAppointment={onOpenAppointment} />
    </>
  );
};
