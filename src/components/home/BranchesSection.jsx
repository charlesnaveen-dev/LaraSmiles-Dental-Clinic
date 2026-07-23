import React from 'react';
import { MapPin } from 'lucide-react';
import { BranchSelector } from '@/components/common/BranchSelector';
import styles from './BranchesSection.module.css';

export const BranchesSection = () => {
  return (
    <section className={`section ${styles.section}`} id="locations">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}><MapPin size={14} /> Our Network</span>
          <h2 className={styles.title}>Serving Smiles Across South India</h2>
          <p className={styles.subtitle}>
            Visit the LARA Smiles branch nearest to you and experience premium dental care with advanced technology and personalized treatment.
          </p>
        </div>

        <BranchSelector />
      </div>
    </section>
  );
};
