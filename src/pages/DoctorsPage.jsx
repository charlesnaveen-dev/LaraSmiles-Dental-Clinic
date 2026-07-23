import React, { useState } from 'react';
import { UserCheck, Award, Globe, GraduationCap, Calendar, Info, Shield, ZoomIn, Camera } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import { Lightbox } from '@/components/common/Lightbox';
import { CTASection } from '@/components/home/CTASection';
import { doctorsData } from '@/data/doctorsData';
import doctor1 from '@/assets/images/LaraSmile/doctor-1.jpg';
import doctor2 from '@/assets/images/LaraSmile/doctor-2.jpg';
import doctorTeam from '@/assets/images/LaraSmile/doctor-team.jpg';
import clinic1 from '@/assets/images/LaraSmile/clinic-1.jpg';
import clinic2 from '@/assets/images/LaraSmile/clinic-2.jpg';
import clinic3 from '@/assets/images/LaraSmile/clinic-3.jpg';
import gallery1 from '@/assets/images/LaraSmile/gallery-1.jpg';
import gallery2 from '@/assets/images/LaraSmile/gallery-2.jpg';
import heroSmile from '@/assets/images/LaraSmile/hero-smile.jpg';
import styles from './DoctorsPage.module.css';

export const DoctorsPage = ({ onOpenAppointment }) => {
  const [activeGalleryItem, setActiveGalleryItem] = useState(null);

  const getDoctorImage = (imgName) => {
    switch (imgName) {
      case 'doctor-1.jpg': return doctor1;
      case 'doctor-2.jpg': return doctor2;
      case 'doctor-team.jpg': return doctorTeam;
      default: return doctor1;
    }
  };

  const insideLaraItems = [
    { id: 1, src: clinic1, title: 'Luxury Reception & Patient Lounge', span: 'wide' },
    { id: 2, src: clinic2, title: 'Private Consultation Room', span: 'normal' },
    { id: 3, src: clinic3, title: 'State-of-the-Art Treatment Suite', span: 'tall' },
    { id: 4, src: gallery1, title: 'Modern 3D Digital Equipment', span: 'normal' },
    { id: 5, src: gallery2, title: 'Sterile & Hygienic Preparation Suite', span: 'normal' },
    { id: 6, src: heroSmile, title: 'Comfortable Patient Experience', span: 'wide' }
  ];

  return (
    <>
      <SEOHead 
        title="Our Doctors & Inside LARA Smiles | LARA Smiles"
        description="Meet accredited dental surgeons and explore Inside LARA Smiles - modern reception, private consultation rooms, treatment suites, and digital equipment."
        path="/doctors"
      />

      {/* Doctors Hero */}
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.tag}><UserCheck size={14} /> Clinical Leadership</span>
          <h1 className={styles.heroTitle}>Master Surgeons & Orthodontists</h1>
          <p className={styles.heroDesc}>
            Our team brings combined decades of clinical mastery in Invisalign®, dental implants, rotary endodontics, and facial aesthetics across South India.
          </p>

          <div className={styles.noticeBadge}>
            <Info size={16} className={styles.infoIcon} />
            <span>Note: Official doctor credentials will be updated upon client onboarding.</span>
          </div>
        </div>
      </section>

      {/* Doctor Profiles */}
      <section className={`section ${styles.doctorsSection}`}>
        <div className="container">
          <div className={styles.doctorsGrid}>
            {/* Replace with verified doctor data */}
            {doctorsData.map((doc) => (
              <div key={doc.id} className={styles.docCard}>
                <div className={styles.imgWrapper}>
                  <img src={getDoctorImage(doc.image)} alt={doc.name} className={styles.docImg} />
                  <span className={styles.roleBadge}>{doc.role}</span>
                </div>

                <div className={styles.docBody}>
                  <h2 className={styles.docName}>{doc.name}</h2>
                  
                  <div className={styles.metaRow}>
                    <div className={styles.metaItem}>
                      <GraduationCap size={16} className={styles.icon} />
                      <span>{doc.qualifications}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <Shield size={16} className={styles.icon} />
                      <span>{doc.experience}</span>
                    </div>
                  </div>

                  <p className={styles.docBio}>{doc.bio}</p>

                  <div className={styles.specBox}>
                    <span className={styles.boxLabel}>Specialization</span>
                    <p className={styles.boxVal}>{doc.specialization}</p>
                  </div>

                  <div className={styles.detailsRow}>
                    <div className={styles.detailCol}>
                      <span className={styles.boxLabel}><Globe size={12} /> Languages</span>
                      <p className={styles.boxVal}>{doc.languages}</p>
                    </div>
                  </div>

                  <button onClick={onOpenAppointment} className={styles.consultBtn}>
                    <Calendar size={16} /> Consult Specialist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "Inside LARA Smiles" Section */}
      <section className={`section ${styles.insideSection}`}>
        <div className="container">
          <div className={styles.headerCenter}>
            <span className={styles.tag}><Camera size={14} /> Clinic Tour</span>
            <h2 className={styles.sectionTitle}>Inside LARA Smiles</h2>
            <p className={styles.headerSub}>
              Take a visual tour of our modern reception, consultation rooms, treatment suites, advanced equipment, and comfortable patient environment.
            </p>
          </div>

          {/* Premium Masonry Gallery */}
          <div className={styles.masonryGrid}>
            {insideLaraItems.map((item) => (
              <div
                key={item.id}
                className={`${styles.masonryItem} ${styles[item.span]}`}
                onClick={() => setActiveGalleryItem(item)}
              >
                <img src={item.src} alt={item.title} className={styles.galleryImg} loading="lazy" />
                <div className={styles.overlay}>
                  <ZoomIn size={24} className={styles.zoomIcon} />
                  <span className={styles.itemTitle}>{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={!!activeGalleryItem}
        image={activeGalleryItem?.src}
        title={activeGalleryItem?.title}
        onClose={() => setActiveGalleryItem(null)}
      />

      {/* CTA */}
      <CTASection onOpenAppointment={onOpenAppointment} />
    </>
  );
};
