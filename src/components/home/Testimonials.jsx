import React, { useEffect, useRef } from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Testimonials.module.css';

gsap.registerPlugin(ScrollTrigger);

export const Testimonials = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.card}`,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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

  const reviews = [
    {
      name: 'Kavitha Ramachandran',
      location: 'Tiruppur Branch',
      treatment: 'Invisalign® Clear Aligners',
      rating: 5,
      comment: 'My Invisalign treatment at LARA Smiles was smooth from day one. The 3D digital preview showed me exact results beforehand, and now my smile is flawless!'
    },
    {
      name: 'Arun Kumar',
      location: 'Bangalore Branch',
      treatment: 'Dental Implants',
      rating: 5,
      comment: 'I was nervous about getting a dental implant, but Dr. and team made it completely painless. The implant looks and feels 100% like my natural tooth.'
    },
    {
      name: 'Priya Sundaram',
      location: 'Salem Branch',
      treatment: 'Porcelain Veneers & Whitening',
      rating: 5,
      comment: 'The level of hygiene and hospitality at LARA Smiles is unmatched. My porcelain veneers transformed my confidence. Highly recommended!'
    }
  ];

  return (
    <section className={`section ${styles.section}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>Patient Stories</span>
          <h2 className={styles.title}>Stories of Confidence Restored</h2>
        </div>

        <div className={styles.grid}>
          {reviews.map((rev, idx) => (
            <div key={idx} className={styles.card}>
              <Quote size={32} className={styles.quoteIcon} />
              
              <div className={styles.starsRow}>
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={15} fill="#D4AF37" className={styles.star} />
                ))}
              </div>

              <p className={styles.comment}>"{rev.comment}"</p>

              <div className={styles.authorRow}>
                <div className={styles.avatar}>
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <div className={styles.authorName}>
                    {rev.name} <CheckCircle2 size={14} className={styles.verifiedIcon} />
                  </div>
                  <div className={styles.authorSub}>{rev.treatment} • {rev.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
