import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Check, ArrowRight, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEOHead } from '@/components/common/SEOHead';
import { TreatmentDetailModal } from '@/components/common/TreatmentDetailModal';
import { CTASection } from '@/components/home/CTASection';
import { treatmentsData } from '@/data/treatmentsData';
import gallery1 from '@/assets/images/LaraSmile/gallery-1.jpg';
import clinic1 from '@/assets/images/LaraSmile/clinic-1.jpg';
import veneersImg from '@/assets/images/LaraSmile/veneers-treatment.jpg';
import beforeAfter1 from '@/assets/images/LaraSmile/before-after-1.jpg';
import clinic2 from '@/assets/images/LaraSmile/clinic-2.jpg';
import gallery2 from '@/assets/images/LaraSmile/gallery-2.jpg';
import styles from './TreatmentsPage.module.css';

gsap.registerPlugin(ScrollTrigger);

export const TreatmentsPage = ({ onOpenAppointment }) => {
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const sectionRef = useRef(null);

  const getTreatmentImage = (imgName) => {
    switch (imgName) {
      case 'gallery-1.jpg': return gallery1;
      case 'clinic-1.jpg': return clinic1;
      case 'hero-smile.jpg': return veneersImg;
      case 'before-after-1.jpg': return beforeAfter1;
      case 'clinic-2.jpg': return clinic2;
      case 'gallery-2.jpg': return gallery2;
      default: return gallery1;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.card}`,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEOHead 
        title="Dental Treatments & Procedures | LARA Smiles"
        description="Explore premier dental procedures at LARA Smiles including Invisalign® clear aligners, dental implants, porcelain veneers, root canal care, and laser whitening."
        path="/treatments"
      />

      {/* Hero Header with Soft Radial Glow */}
      <section className={styles.hero}>
        <div className={styles.radialGlow1} />
        <div className={styles.radialGlow2} />

        <div className={`container ${styles.heroContainer}`}>
          <span className={styles.tag}><Sparkles size={14} /> Specialized Dentistry</span>
          <h1 className={styles.heroTitle}>Treatments Engineered For Perfection</h1>
          <p className={styles.heroDesc}>
            Transforming smiles with 3D intraoral digital accuracy, biocompatible materials, and pain-free clinical care.
          </p>
        </div>
      </section>

      {/* 3-Column Responsive Visual Treatments Grid */}
      <section className={styles.gridSection} ref={sectionRef}>
        <div className="container">
          <div className={styles.grid}>
            {treatmentsData.map((item) => (
              <div key={item.id} className={styles.card}>
                {/* Large High-Quality Image Box */}
                <div className={styles.imageBox}>
                  <img
                    src={getTreatmentImage(item.image)}
                    alt={item.title}
                    className={styles.cardImg}
                    loading="lazy"
                  />
                  <span className={styles.badge}>{item.badge}</span>
                </div>

                {/* Card Content Body */}
                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{item.title}</h2>
                  <p className={styles.cardDesc}>{item.shortDescription}</p>

                  {/* 3 Key Highlights Only */}
                  <ul className={styles.highlightsList}>
                    {item.benefits.slice(0, 3).map((b, idx) => (
                      <li key={idx}>
                        <Check size={14} className={styles.checkIcon} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Buttons */}
                  <div className={styles.cardActions}>
                    <button 
                      onClick={() => setSelectedTreatment(item)}
                      className={styles.learnMoreBtn}
                    >
                      Learn More <ArrowRight size={14} />
                    </button>

                    <button 
                      onClick={onOpenAppointment}
                      className={styles.bookBtn}
                    >
                      <Calendar size={14} /> Book Consultation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glassmorphism Procedure Detail Modal */}
      <TreatmentDetailModal
        isOpen={!!selectedTreatment}
        treatment={selectedTreatment}
        onClose={() => setSelectedTreatment(null)}
        onBook={onOpenAppointment}
      />

      {/* CTA */}
      <CTASection onOpenAppointment={onOpenAppointment} />
    </>
  );
};
