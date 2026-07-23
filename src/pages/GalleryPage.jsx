import React, { useState, useEffect, useRef } from 'react';
import { Camera, ZoomIn, Sparkles, Filter } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEOHead } from '@/components/common/SEOHead';
import { Lightbox } from '@/components/common/Lightbox';
import { CTASection } from '@/components/home/CTASection';
import clinic1 from '@/assets/images/LaraSmile/clinic-1.jpg';
import clinic2 from '@/assets/images/LaraSmile/clinic-2.jpg';
import clinic3 from '@/assets/images/LaraSmile/clinic-3.jpg';
import gallery1 from '@/assets/images/LaraSmile/gallery-1.jpg';
import gallery2 from '@/assets/images/LaraSmile/gallery-2.jpg';
import doctorTeam from '@/assets/images/LaraSmile/doctor-team.jpg';
import beforeAfter1 from '@/assets/images/LaraSmile/before-after-1.jpg';
import styles from './GalleryPage.module.css';

gsap.registerPlugin(ScrollTrigger);

export const GalleryPage = ({ onOpenAppointment }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeItem, setActiveItem] = useState(null);
  const galleryRef = useRef(null);

  const galleryItems = [
    { id: 1, category: 'interiors', title: 'Luxury Reception & Patient Lounge', src: clinic1, span: 'wide' },
    { id: 2, category: 'consultation', title: 'Private Doctor Consultation Room', src: clinic2, span: 'normal' },
    { id: 3, category: 'suites', title: 'State-of-the-Art Treatment Suite', src: clinic3, span: 'tall' },
    { id: 4, category: 'equipment', title: '3D iTero® Digital Scanner Suite', src: gallery1, span: 'normal' },
    { id: 5, category: 'equipment', title: 'Laser Teeth Whitening Facility', src: gallery2, span: 'normal' },
    { id: 6, category: 'team', title: 'Accredited Specialist Doctor Team', src: doctorTeam, span: 'wide' },
    { id: 7, category: 'interiors', title: 'Smile Transformation Center', src: beforeAfter1, span: 'tall' }
  ];

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'interiors', label: 'Clinic Interiors' },
    { id: 'consultation', label: 'Consultation Rooms' },
    { id: 'suites', label: 'Treatment Suites' },
    { id: 'equipment', label: '3D Equipment' },
    { id: 'team', label: 'Specialist Team' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.masonryItem}`,
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 80%'
          }
        }
      );
    }, galleryRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <>
      <SEOHead 
        title="Clinic Photo Gallery | LARA Smiles"
        description="Take a visual tour of LARA Smiles modern dental clinic facilities, reception lounge, consultation rooms, 3D equipment, and specialist team."
        path="/gallery"
      />

      {/* Gallery Hero Header */}
      <section className={styles.hero}>
        <div className={styles.radialGlow} />
        <div className={`container ${styles.heroContainer}`}>
          <span className={styles.tag}><Camera size={14} /> Photo Gallery</span>
          <h1 className={styles.heroTitle}>Inside LARA Smiles</h1>
          <p className={styles.heroDesc}>
            Explore our state-of-the-art dental facilities, ergonomic treatment suites, 3D digital intraoral scanners, and comfortable patient environment.
          </p>
        </div>
      </section>

      {/* Gallery Filter Tabs & Masonry */}
      <section className={styles.gallerySection} ref={galleryRef}>
        <div className="container">
          {/* Category Filter Tabs */}
          <div className={styles.filterBar}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.activeFilter : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className={styles.masonryGrid}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`${styles.masonryItem} ${styles[item.span]}`}
                onClick={() => setActiveItem(item)}
              >
                <img src={item.src} alt={item.title} className={styles.itemImg} loading="lazy" />
                <div className={styles.overlay}>
                  <ZoomIn size={26} className={styles.zoomIcon} />
                  <span className={styles.itemTitle}>{item.title}</span>
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
