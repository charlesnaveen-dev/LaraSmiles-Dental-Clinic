import React from 'react';
import { Star, Quote, CheckCircle2, HeartHandshake } from 'lucide-react';
import styles from './Testimonials.module.css';

export const Testimonials = () => {
  const reviews = [
    {
      name: 'Kavitha Ramachandran',
      location: 'Tiruppur Main Clinic',
      treatment: 'Invisalign® Clear Aligners',
      rating: 5,
      comment: 'My Invisalign treatment at LARA Smiles was smooth from day one. The 3D digital preview showed me exact results beforehand, and now my smile is completely transformed and flawless!'
    },
    {
      name: 'Arun Kumar',
      location: 'Bangalore Branch',
      treatment: 'Permanent Dental Implants',
      rating: 5,
      comment: 'I was nervous about getting a dental implant, but Dr. and team made it completely painless. The implant looks and feels 100% like my natural tooth with full chewing comfort.'
    },
    {
      name: 'Priya Sundaram',
      location: 'Salem Branch',
      treatment: 'Porcelain Veneers & Whitening',
      rating: 5,
      comment: 'The level of hygiene and clinical care at LARA Smiles is unmatched. My porcelain veneers completely restored my confidence for my wedding. Highly recommended!'
    }
  ];

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <div className="section-tag">
            <HeartHandshake size={14} />
            <span>Patient Testimonials</span>
          </div>
          <h2 className={styles.title}>Stories of Confidence Restored</h2>
          <p className={styles.subtitle}>
            Hear directly from our patients about their smile transformation journeys across South India.
          </p>
        </div>

        <div className={styles.grid}>
          {reviews.map((rev, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.topRow}>
                <div className={styles.starsRow}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="#D4AF37" stroke="#D4AF37" />
                  ))}
                </div>
                <Quote size={24} className={styles.quoteIcon} />
              </div>

              <p className={styles.comment}>"{rev.comment}"</p>

              <div className={styles.authorRow}>
                <div className={styles.avatar}>
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <div className={styles.authorName}>
                    <span>{rev.name}</span>
                    <CheckCircle2 size={15} className={styles.verifiedIcon} />
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
