import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, Check, ArrowRight, Calendar } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import { TreatmentDetailModal } from '@/components/common/TreatmentDetailModal';
import { CTASection } from '@/components/home/CTASection';
import { treatmentsData } from '@/data/treatmentsData';
import gallery1 from '@/assets/images/LaraSmile/gallery-1.jpg';
import clinic1 from '@/assets/images/LaraSmile/clinic-1.jpg';
import veneersImg from '@/assets/images/LaraSmile/veneers-treatment.jpg';
import beforeAfter1 from '@/assets/images/LaraSmile/before-after-1.jpg';
import clinic3 from '@/assets/images/LaraSmile/clinic-3.jpg';
import heroSmile from '@/assets/images/LaraSmile/hero-happy-smile.jpg';
import styles from './TreatmentsPage.module.css';

export const TreatmentsPage = ({ onOpenAppointment }) => {
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const { hash } = useLocation();

  const getTreatmentImage = (imgName) => {
    switch (imgName) {
      case 'gallery-1.jpg': return gallery1;
      case 'clinic-1.jpg': return clinic1;
      case 'hero-smile.jpg': return veneersImg;
      case 'before-after-1.jpg': return beforeAfter1;
      case 'clinic-2.jpg': return clinic3;
      case 'gallery-2.jpg': return heroSmile;
      default: return gallery1;
    }
  };

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
      }
    }
  }, [hash]);

  return (
    <>
      <SEOHead 
        title="Dental Treatments & Procedures | LARA Smiles"
        description="Explore premier dental procedures at LARA Smiles including Invisalign® clear aligners, permanent dental implants, porcelain veneers, root canal care, and laser teeth whitening."
        path="/treatments"
      />

      {/* Hero Header */}
      <section className={styles.hero}>
        <div className="container">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Specialized Dentistry</span>
          </div>
          <h1 className={styles.heroTitle}>Treatments Engineered For Perfection</h1>
          <p className={styles.heroDesc}>
            Transforming smiles with 3D intraoral digital accuracy, biocompatible materials, and pain-free clinical care across South India.
          </p>
        </div>
      </section>

      {/* 3-Column Responsive Visual Treatments Grid */}
      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.grid}>
            {treatmentsData.map((item) => (
              <div key={item.id} id={item.id} className={styles.card}>
                {/* Large High-Quality Image Box */}
                <div className={styles.imageBox}>
                  <img
                    src={getTreatmentImage(item.image)}
                    alt={item.title}
                    className={styles.cardImg}
                    width="420"
                    height="260"
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
                      type="button"
                      aria-label={`View clinical details for ${item.title}`}
                    >
                      <span>Procedure Details</span>
                      <ArrowRight size={14} />
                    </button>

                    <button 
                      onClick={onOpenAppointment}
                      className={styles.bookBtn}
                      type="button"
                      aria-label={`Book Consultation for ${item.title}`}
                    >
                      <Calendar size={14} />
                      <span>Book Consultation</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refined Procedure Detail Modal */}
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
