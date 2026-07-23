import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, GraduationCap, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { doctorsData } from '@/data/doctorsData';
import doctor1 from '@/assets/images/LaraSmile/doctor-1.jpg';
import doctor2 from '@/assets/images/LaraSmile/doctor-2.jpg';
import doctorTeam from '@/assets/images/LaraSmile/doctor-team.jpg';
import styles from './DoctorsPreview.module.css';

gsap.registerPlugin(ScrollTrigger);

export const DoctorsPreview = ({ onOpenAppointment }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.card}`,
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
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

  const getDoctorImage = (imgName) => {
    switch (imgName) {
      case 'doctor-1.jpg': return doctor1;
      case 'doctor-2.jpg': return doctor2;
      case 'doctor-team.jpg': return doctorTeam;
      default: return doctor1;
    }
  };

  return (
    <section className={`section ${styles.section}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.headerFlex}>
          <div>
            <span className={styles.tag}>Clinical Leadership</span>
            <h2 className={styles.title}>Meet Our Doctors</h2>
            <p className={styles.subtitle}>
              Accredited dental surgeons and orthodontists committed to international standards and compassionate care.
            </p>
          </div>
          <NavLink to="/doctors" className={styles.viewAllBtn}>
            View All Doctors <ArrowRight size={16} />
          </NavLink>
        </div>

        <div className={styles.grid}>
          {doctorsData.slice(0, 3).map((doc) => (
            <div key={doc.id} className={styles.card}>
              <div className={styles.imgWrapper}>
                <img src={getDoctorImage(doc.image)} alt={doc.name} className={styles.docImg} loading="lazy" />
                <span className={styles.roleBadge}>{doc.role}</span>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.docName}>{doc.name}</h3>
                
                <div className={styles.metaRow}>
                  <div className={styles.metaItem}>
                    <GraduationCap size={15} className={styles.icon} />
                    <span>{doc.qualifications}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Shield size={15} className={styles.icon} />
                    <span>{doc.experience}</span>
                  </div>
                </div>

                <p className={styles.specialization}>
                  <strong>Specialization:</strong> {doc.specialization}
                </p>

                <button onClick={onOpenAppointment} className={styles.consultBtn}>
                  Book Consultation
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
