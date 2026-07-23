import React, { useState } from 'react';
import { ZoomIn, Camera } from 'lucide-react';
import { Lightbox } from '@/components/common/Lightbox';
import clinic1 from '@/assets/images/LaraSmile/clinic-1.jpg';
import clinic2 from '@/assets/images/LaraSmile/clinic-2.jpg';
import clinic3 from '@/assets/images/LaraSmile/clinic-3.jpg';
import doctorTeam from '@/assets/images/LaraSmile/doctor-team.jpg';
import gallery1 from '@/assets/images/LaraSmile/gallery-1.jpg';
import gallery2 from '@/assets/images/LaraSmile/gallery-2.jpg';
import heroSmile from '@/assets/images/LaraSmile/hero-smile.jpg';
import styles from './ClinicGallery.module.css';

export const ClinicGallery = () => {
  const [activeImage, setActiveImage] = useState(null);

  const galleryItems = [
    { id: 1, src: clinic1, title: 'State-of-the-Art Treatment Operatory', span: 'tall' },
    { id: 2, src: clinic2, title: '3D Intraoral Digital Consultation', span: 'normal' },
    { id: 3, src: doctorTeam, title: 'Multi-Specialty Dental Team', span: 'wide' },
    { id: 4, src: clinic3, title: 'Comfortable Patient Recovery Suite', span: 'normal' },
    { id: 5, src: gallery1, title: 'Precision Invisalign® Treatment Area', span: 'tall' },
    { id: 6, src: gallery2, title: 'Sterilisation & Hygiene Center', span: 'normal' },
    { id: 7, src: heroSmile, title: 'Natural Aesthetic Smile Result', span: 'wide' }
  ];

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}><Camera size={14} /> Clinic Gallery</span>
          <h2 className={styles.title}>Inside LARA Smiles Experience</h2>
          <p className={styles.subtitle}>Explore our ultra-hygienic, modern dental suites designed for maximum comfort and peace of mind.</p>
        </div>

        {/* Pinterest Style Masonry Grid */}
        <div className={styles.masonryGrid}>
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`${styles.masonryItem} ${styles[item.span]}`}
              onClick={() => setActiveImage(item)}
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className={styles.galleryImg}
              />
              <div className={styles.overlay}>
                <ZoomIn size={24} className={styles.zoomIcon} />
                <span className={styles.itemTitle}>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={!!activeImage}
        image={activeImage?.src}
        title={activeImage?.title}
        onClose={() => setActiveImage(null)}
      />
    </section>
  );
};
