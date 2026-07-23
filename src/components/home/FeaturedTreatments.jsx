import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gallery1 from '@/assets/images/LaraSmile/gallery-1.jpg';
import clinic1 from '@/assets/images/LaraSmile/clinic-1.jpg';
import veneersImg from '@/assets/images/LaraSmile/veneers-treatment.jpg';
import beforeAfter1 from '@/assets/images/LaraSmile/before-after-1.jpg';
import clinic2 from '@/assets/images/LaraSmile/clinic-2.jpg';
import gallery2 from '@/assets/images/LaraSmile/gallery-2.jpg';
import styles from './FeaturedTreatments.module.css';

gsap.registerPlugin(ScrollTrigger);

export const FeaturedTreatments = ({ onOpenAppointment }) => {
  const sectionRef = useRef(null);

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

  const treatmentCards = [
    {
      id: 'invisalign',
      title: 'Invisalign® Aligners',
      image: gallery1,
      description: 'Virtually invisible, removable aligners engineered for comfortable, precise smile alignment.',
      badge: 'Invisalign® Provider'
    },
    {
      id: 'implants',
      title: 'Dental Implants',
      image: clinic1,
      description: 'Permanent, natural-feeling tooth replacements anchored securely into the jawbone.',
      badge: 'Tooth Replacement'
    },
    {
      id: 'smile-makeover',
      title: 'Smile Makeover',
      image: beforeAfter1,
      description: 'Personalized multi-treatment masterplan engineered for full facial and dental harmony.',
      badge: 'Full Restorative'
    },
    {
      id: 'veneers',
      title: 'Porcelain Veneers',
      image: veneersImg,
      description: 'Ultra-thin handcrafted ceramic shells delivering Hollywood-grade aesthetic perfection.',
      badge: 'Cosmetic Artistry'
    },
    {
      id: 'whitening',
      title: 'Teeth Whitening',
      image: gallery2,
      description: 'Professional LED-activated whitening brightening your teeth up to 8 shades in 45 min.',
      badge: 'Instant Results'
    },
    {
      id: 'root-canal',
      title: 'Root Canal Care',
      image: clinic2,
      description: 'Single-visit rotary endodontics preserving infected teeth 100% pain-free.',
      badge: 'Painless Care'
    }
  ];

  return (
    <section className={`section ${styles.section}`} ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={styles.headerFlex}>
          <div>
            <span className={styles.tag}>Specialized Procedures</span>
            <h2 className={styles.title}>OUR TREATMENTS</h2>
            <p className={styles.subtitle}>
              Transforming smiles with 3D intraoral digital accuracy and pain-free care.
            </p>
          </div>
          <NavLink to="/treatments" className={styles.viewAllBtn}>
            View All Treatments <ArrowRight size={16} />
          </NavLink>
        </div>

        {/* Clean Responsive Card Grid */}
        <div className={styles.grid}>
          {treatmentCards.map((item) => (
            <div key={item.id} className={styles.card}>
              {/* Large Image Box */}
              <div className={styles.imageBox}>
                <img src={item.image} alt={item.title} className={styles.cardImage} loading="lazy" />
                <span className={styles.badge}>{item.badge}</span>
              </div>

              {/* Card Body */}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>

                <div className={styles.cardFooter}>
                  <NavLink to={`/treatments#${item.id}`} className={styles.learnMore}>
                    Learn More <ArrowRight size={14} />
                  </NavLink>

                  <button onClick={onOpenAppointment} className={styles.bookBtn}>
                    <Calendar size={14} /> Book Consultation
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
