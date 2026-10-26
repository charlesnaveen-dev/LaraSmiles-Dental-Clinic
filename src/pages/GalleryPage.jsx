import React, { useState } from 'react';
import { Camera, ZoomIn, Sparkles, Filter } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import { Lightbox } from '@/components/common/Lightbox';
import { CTASection } from '@/components/home/CTASection';
import clinic1 from '@/assets/images/LaraSmile/clinic-1.jpg';
import clinic2 from '@/assets/images/LaraSmile/clinic-2.jpg';
import clinic3 from '@/assets/images/LaraSmile/clinic-3.jpg';
import gallery1 from '@/assets/images/LaraSmile/gallery-1.jpg';
import doctorTeam from '@/assets/images/LaraSmile/doctor-team.jpg';
import veneersImg from '@/assets/images/LaraSmile/veneers-treatment.jpg';
import heroSmile from '@/assets/images/LaraSmile/hero-smile.jpg';
import styles from './GalleryPage.module.css';

export const GalleryPage = ({ onOpenAppointment }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeItem, setActiveItem] = useState(null);

  const galleryItems = [
    { id: 1, category: 'interiors', title: 'Consultation Operatory & Digital Monitor', src: clinic1, label: 'Clinic Facility' },
    { id: 2, category: 'consultation', title: 'Private Doctor Consultation Room', src: clinic2, label: 'Consultation' },
    { id: 3, category: 'suites', title: 'Ergonomic Treatment Suite & Surgical Lights', src: clinic3, label: 'Treatment Suite' },
    { id: 4, category: 'equipment', title: '3D iTero® Digital Oral Scanner Workstation', src: gallery1, label: '3D Technology' },
    { id: 5, category: 'cosmetics', title: 'Aesthetic Porcelain Veneer Transformation', src: veneersImg, label: 'Cosmetic Care' },
    { id: 6, category: 'team', title: 'Accredited Specialist Dental Team', src: doctorTeam, label: 'Specialist Team' },
    { id: 7, category: 'interiors', title: 'Comfortable Patient Experience Environment', src: heroSmile, label: 'Patient Comfort' }
  ];

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'interiors', label: 'Clinic Facilities' },
    { id: 'consultation', label: 'Consultation' },
    { id: 'suites', label: 'Treatment Suites' },
    { id: 'equipment', label: '3D Equipment' },
    { id: 'cosmetics', label: 'Cosmetic Dentistry' },
    { id: 'team', label: 'Specialist Team' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <>
      <SEOHead 
        title="Clinic Photo Gallery | LARA Smiles"
        description="Take a visual tour of LARA Smiles modern dental clinic facilities, private consultation rooms, 3D equipment, treatment suites, and specialist team."
        path="/gallery"
      />

      {/* Gallery Hero Header */}
      <section className={styles.hero}>
        <div className="container">
          <div className="section-tag">
            <Camera size={14} />
            <span>Clinic Tour & Facilities</span>
          </div>
          <h1 className={styles.heroTitle}>Inside LARA Smiles</h1>
          <p className={styles.heroDesc}>
            Explore our state-of-the-art dental facilities, ergonomic treatment suites, 3D digital intraoral scanners, and comfortable patient environment.
          </p>
        </div>
      </section>

      {/* Gallery Filter Tabs & Responsive Grid */}
      <section className={styles.gallerySection}>
        <div className="container">
          {/* Category Filter Tabs */}
          <div className={styles.filterBar}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.activeFilter : ''}`}
                type="button"
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Clean Responsive 3-Column Image Cards */}
          <div className={styles.grid}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={styles.galleryCard}
                onClick={() => setActiveItem(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setActiveItem(item); }}
                aria-label={`View photo of ${item.title}`}
              >
                <div className={styles.imgWrapper}>
                  <img
                    src={item.src}
                    alt={item.title}
                    className={styles.galleryImg}
                    width="420"
                    height="280"
                    loading="lazy"
                  />
                  <div className={styles.overlay}>
                    <div className={styles.zoomCircle}>
                      <ZoomIn size={22} className={styles.zoomIcon} />
                    </div>
                    <span className={styles.badgeLabel}>{item.label}</span>
                  </div>
                </div>

                <div className={styles.cardInfo}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={!!activeItem}
        image={activeItem?.src}
        title={activeItem?.title}
        onClose={() => setActiveItem(null)}
      />

      {/* CTA */}
      <CTASection onOpenAppointment={onOpenAppointment} />
    </>
  );
};
