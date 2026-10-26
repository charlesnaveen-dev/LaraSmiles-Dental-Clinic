import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';
import gallery1 from '@/assets/images/LaraSmile/gallery-1.jpg';
import clinic1 from '@/assets/images/LaraSmile/clinic-1.jpg';
import veneersImg from '@/assets/images/LaraSmile/veneers-treatment.jpg';
import beforeAfter1 from '@/assets/images/LaraSmile/before-after-1.jpg';
import clinic3 from '@/assets/images/LaraSmile/clinic-3.jpg';
import heroSmile from '@/assets/images/LaraSmile/hero-happy-smile.jpg';
import styles from './FeaturedTreatments.module.css';

export const FeaturedTreatments = ({ onOpenAppointment }) => {
  const treatmentCards = [
    {
      id: 'invisalign',
      title: 'Invisalign® Aligners',
      image: gallery1,
      description: 'Virtually invisible, removable aligners custom-engineered for comfortable, precise smile alignment.',
      badge: 'Invisalign® Provider'
    },
    {
      id: 'implants',
      title: 'Dental Implants',
      image: clinic1,
      description: 'Permanent, natural-feeling tooth replacements anchored securely with biocompatible titanium.',
      badge: 'Tooth Replacement'
    },
    {
      id: 'smile-makeover',
      title: 'Smile Makeover',
      image: beforeAfter1,
      description: 'Personalized multi-treatment masterplan combining aesthetics and function for total facial harmony.',
      badge: 'Full Restorative'
    },
    {
      id: 'veneers',
      title: 'Porcelain Veneers',
      image: veneersImg,
      description: 'Ultra-thin handcrafted ceramic shells delivering natural shade match and lasting aesthetic perfection.',
      badge: 'Cosmetic Artistry'
    },
    {
      id: 'whitening',
      title: 'Laser Teeth Whitening',
      image: heroSmile,
      description: 'Professional LED-activated whitening brightening your smile up to 8 shades in a single safe 45-min visit.',
      badge: 'Instant Results'
    },
    {
      id: 'root-canal',
      title: 'Root Canal Treatment',
      image: clinic3,
      description: 'Advanced single-visit rotary endodontics saving infected natural teeth 100% pain-free.',
      badge: 'Painless Care'
    }
  ];

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        {/* Header */}
        <div className={styles.headerFlex}>
          <div>
            <div className="section-tag">
              <Sparkles size={14} />
              <span>Specialized Procedures</span>
            </div>
            <h2 className={styles.title}>Featured Dental Treatments</h2>
            <p className={styles.subtitle}>
              Transforming smiles with 3D intraoral digital accuracy, biocompatible materials, and gentle care.
            </p>
          </div>
          <NavLink to="/treatments" className={styles.viewAllBtn}>
            <span>View All Treatments</span>
            <ArrowRight size={16} />
          </NavLink>
        </div>

        {/* Dentis-style Treatment Cards Grid */}
        <div className={styles.grid}>
          {treatmentCards.map((item) => (
            <div key={item.id} className={styles.card}>
              {/* Image Box */}
              <div className={styles.imageBox}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.cardImage}
                  width="400"
                  height="250"
                  loading="lazy"
                />
                <span className={styles.badge}>{item.badge}</span>
              </div>

              {/* Card Body */}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>

                <div className={styles.cardFooter}>
                  <NavLink to={`/treatments#${item.id}`} className={styles.learnMore}>
                    <span>Learn More</span>
                    <ArrowRight size={14} />
                  </NavLink>

                  <button
                    onClick={onOpenAppointment}
                    className={styles.bookBtn}
                    type="button"
                    aria-label={`Book Consultation for ${item.title}`}
                  >
                    <Calendar size={14} />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
