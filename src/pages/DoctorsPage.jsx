import React, { useState } from 'react';
import { UserCheck, Globe, GraduationCap, Calendar, Info, Shield, ZoomIn, Camera, Sparkles } from 'lucide-react';
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
import veneersImg from '@/assets/images/LaraSmile/veneers-treatment.jpg';
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
    { id: 1, src: clinic1, title: 'Doctor Consultation & Treatment Suite', category: 'Clinical Operatory' },
    { id: 2, src: clinic2, title: 'Private Specialist Consultation Room', category: 'Consultation' },
    { id: 3, src: clinic3, title: 'Advanced Ergonomic Dental Treatment Chair', category: 'Treatment Room' },
    { id: 4, src: gallery1, title: '3D iTero® Digital Scanner Workstation', category: 'Technology' },
    { id: 5, src: veneersImg, title: 'Cosmetic Aesthetic Smile Transformation', category: 'Cosmetics' },
    { id: 6, src: heroSmile, title: 'Comfortable Patient Experience Lounge', category: 'Patient Care' }
  ];

  return (
    <>
      <SEOHead 
        title="Our Doctors & Inside LARA Smiles | LARA Smiles"
        description="Meet accredited dental surgeons and orthodontists at LARA Smiles. Explore our modern clinic facilities, consultation rooms, and 3D digital technology."
        path="/doctors"
      />

      {/* Doctors Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className="section-tag">
            <UserCheck size={14} />
            <span>Clinical Leadership</span>
          </div>
          <h1 className={styles.heroTitle}>Master Surgeons & Orthodontists</h1>
          <p className={styles.heroDesc}>
            Our multi-disciplinary team brings combined decades of clinical excellence in Invisalign®, dental implants, rotary endodontics, and facial aesthetics across South India.
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
            {doctorsData.map((doc) => (
              <div key={doc.id} className={styles.docCard}>
                <div className={styles.imgWrapper}>
                  <img
                    src={getDoctorImage(doc.image)}
                    alt={doc.name}
                    className={styles.docImg}
                    width="380"
                    height="320"
                    loading="lazy"
                  />
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
                      <span className={styles.boxLabel}><Globe size={13} /> Languages</span>
                      <p className={styles.boxVal}>{doc.languages}</p>
                    </div>
                  </div>

                  <button
                    onClick={onOpenAppointment}
                    className={styles.consultBtn}
                    type="button"
                    aria-label={`Consult ${doc.name}`}
                  >
                    <Calendar size={16} />
                    <span>Book Consultation</span>
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
            <div className="section-tag">
              <Camera size={14} />
              <span>Clinic Tour</span>
            </div>
            <h2 className={styles.sectionTitle}>Inside LARA Smiles</h2>
            <p className={styles.headerSub}>
              Take a visual tour of our modern reception, consultation suites, ergonomic operatory, and advanced digital imaging suites.
            </p>
          </div>

          {/* Clean 3x2 Grid */}
          <div className={styles.tourGrid}>
            {insideLaraItems.map((item) => (
              <div
                key={item.id}
                className={styles.tourCard}
                onClick={() => setActiveGalleryItem(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setActiveGalleryItem(item); }}
                aria-label={`View photo of ${item.title}`}
              >
                <div className={styles.tourImgContainer}>
                  <img
                    src={item.src}
                    alt={item.title}
                    className={styles.tourImg}
                    width="400"
                    height="280"
                    loading="lazy"
                  />
                  <div className={styles.tourOverlay}>
                    <div className={styles.zoomCircle}>
                      <ZoomIn size={20} className={styles.zoomIcon} />
                    </div>
                    <span className={styles.overlayCategory}>{item.category}</span>
                  </div>
                </div>
                <div className={styles.tourMeta}>
                  <h3 className={styles.tourTitle}>{item.title}</h3>
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
