import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Target, Compass, Sparkles, Building2, Cpu, CheckCircle2, Heart, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEOHead } from '@/components/common/SEOHead';
import { CTASection } from '@/components/home/CTASection';
import doctorTeam from '@/assets/images/LaraSmile/doctor-team.jpg';
import styles from './AboutPage.module.css';

gsap.registerPlugin(ScrollTrigger);

export const AboutPage = ({ onOpenAppointment }) => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.storyGrid}`,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.storySection}`,
            start: 'top 80%'
          }
        }
      );

      gsap.fromTo(
        `.${styles.facilityCard}`,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.facilitiesSection}`,
            start: 'top 80%'
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <SEOHead 
        title="About Us | LARA Smiles Dental Excellence"
        description="Discover LARA Smiles story, mission, vision, modern 3D digital technology, and why patients across South India trust our care."
        path="/about"
      />

      {/* Hero Header */}
      <section className={styles.hero}>
        <div className={styles.radialGlow} />
        <div className={`container ${styles.heroContainer}`}>
          <span className={styles.tag}><ShieldCheck size={14} /> About LARA Smiles</span>
          <h1 className={styles.heroTitle}>Setting The Standard In Cosmetic & Restorative Dentistry</h1>
          <p className={styles.heroDesc}>
            At LARA Smiles, we combine cutting-edge 3D intraoral digital technology with luxury comfort to create confident, natural smiles across South India.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className={`section ${styles.storySection}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <span className={styles.tag}>Our Story</span>
              <h2 className={styles.sectionTitle}>Built On Trust, Innovation & Clinical Passion</h2>
              <p className={styles.storyParagraph}>
                LARA Smiles was founded with a clear vision: to replace traditional, uncomfortable dental visits with a peaceful, tech-driven, and pain-free experience.
              </p>
              <p className={styles.storyParagraph}>
                Over the years, we have grown into one of South India's most trusted dental networks, equipped with 3D iTero® digital intraoral scanners, rotary endodontic systems, and certified Invisalign® Diamond Provider expertise.
              </p>
            </div>

            <div className={styles.storyImgBox}>
              <img src={doctorTeam} alt="LARA Smiles Specialist Doctor Team" className={styles.storyImg} />
            </div>
          </div>
        </div>
      </section>

      {/* Curved Section Divider */}
      <div className={styles.curvedDivider} />

      {/* Mission & Vision Section */}
      <section className={`section ${styles.missionSection}`}>
        <div className="container">
          <div className={styles.grid2Col}>
            <div className={styles.card}>
              <div className={styles.iconBoxPurple}>
                <Target size={26} />
              </div>
              <h3 className={styles.cardTitle}>Our Mission</h3>
              <p className={styles.cardText}>
                To deliver world-class, pain-free dental care using digital precision scanning, gentle micro-anesthesia, and biocompatible materials while building lifelong trust with every patient.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.iconBoxBlue}>
                <Compass size={26} />
              </div>
              <h3 className={styles.cardTitle}>Our Vision</h3>
              <p className={styles.cardText}>
                To lead South India in cosmetic dentistry and implantology, setting international benchmarks for patient comfort, digital accuracy, and aesthetic transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Dental Technology Section */}
      <section className={`section ${styles.facilitiesSection}`}>
        <div className="container">
          <div className={styles.headerCenter}>
            <span className={styles.tag}><Building2 size={14} /> Technology Suite</span>
            <h2 className={styles.sectionTitle}>Modern Dental Technology</h2>
            <p className={styles.headerSub}>
              Engineered with advanced 3D digital imaging, infection control protocols, and pain-free systems.
            </p>
          </div>

          <div className={styles.facilitiesGrid}>
            <div className={styles.facilityCard}>
              <Cpu size={26} className={styles.facilityIcon} />
              <h4>3D iTero® Digital Scanners</h4>
              <p>Replaces impression trays with instant, ultra-precise 3D digital oral maps for aligners and crowns.</p>
            </div>

            <div className={styles.facilityCard}>
              <ShieldCheck size={26} className={styles.facilityIcon} />
              <h4>Class-B Autoclave Suite</h4>
              <p>Strict sterilization protocols following international guidelines to guarantee 100% sterile instruments.</p>
            </div>

            <div className={styles.facilityCard}>
              <Sparkles size={26} className={styles.facilityIcon} />
              <h4>Rotary Painless Endodontics</h4>
              <p>Advanced rotary technology ensuring root canal procedures are completed smoothly in a single visit.</p>
            </div>

            <div className={styles.facilityCard}>
              <Heart size={26} className={styles.facilityIcon} />
              <h4>Gentle Micro-Anesthesia</h4>
              <p>Gentle delivery techniques ensuring total comfort during surgical and restorative procedures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Patients Choose Lara Smiles */}
      <section className={`section ${styles.trustSection}`}>
        <div className="container">
          <div className={styles.trustBox}>
            <span className={styles.tag}><Award size={14} /> Clinical Reputation</span>
            <h2 className={styles.sectionTitle}>Why Patients Choose LARA Smiles</h2>

            <div className={styles.trustGrid}>
              <div className={styles.trustItem}>
                <CheckCircle2 size={20} className={styles.checkIcon} />
                <div>
                  <h4>Certified Invisalign® Diamond Provider</h4>
                  <p>Proven track record in subtle, clear aligner smile straightening.</p>
                </div>
              </div>

              <div className={styles.trustItem}>
                <CheckCircle2 size={20} className={styles.checkIcon} />
                <div>
                  <h4>Multi-Specialty Surgeon Team</h4>
                  <p>Collaborative care with endodontists, prosthodontists, and implantologists.</p>
                </div>
              </div>

              <div className={styles.trustItem}>
                <CheckCircle2 size={20} className={styles.checkIcon} />
                <div>
                  <h4>15,000+ Smiles Transformed</h4>
                  <p>Consistently rated 4.9★ across verified patient Google reviews.</p>
                </div>
              </div>

              <div className={styles.trustItem}>
                <CheckCircle2 size={20} className={styles.checkIcon} />
                <div>
                  <h4>Transparent & Personal Masterplans</h4>
                  <p>No unexpected costs, clear timelines, and tailored digital previews.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection onOpenAppointment={onOpenAppointment} />
    </div>
  );
};
