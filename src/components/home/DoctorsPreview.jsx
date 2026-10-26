import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, GraduationCap, Shield, UserCheck, Calendar } from 'lucide-react';
import { doctorsData } from '@/data/doctorsData';
import doctor1 from '@/assets/images/LaraSmile/doctor-1.jpg';
import doctor2 from '@/assets/images/LaraSmile/doctor-2.jpg';
import doctorTeam from '@/assets/images/LaraSmile/doctor-team.jpg';
import styles from './DoctorsPreview.module.css';

export const DoctorsPreview = ({ onOpenAppointment }) => {
  const getDoctorImage = (imgName) => {
    switch (imgName) {
      case 'doctor-1.jpg': return doctor1;
      case 'doctor-2.jpg': return doctor2;
      case 'doctor-team.jpg': return doctorTeam;
      default: return doctor1;
    }
  };

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.headerFlex}>
          <div>
            <div className="section-tag">
              <UserCheck size={14} />
              <span>Clinical Leadership</span>
            </div>
            <h2 className={styles.title}>Meet Our Specialists</h2>
            <p className={styles.subtitle}>
              Accredited dental surgeons and orthodontists dedicated to world-class clinical standards and pain-free care.
            </p>
          </div>
          <NavLink to="/doctors" className={styles.viewAllBtn}>
            <span>View All Doctors</span>
            <ArrowRight size={16} />
          </NavLink>
        </div>

        <div className={styles.grid}>
          {doctorsData.slice(0, 3).map((doc) => (
            <div key={doc.id} className={styles.card}>
              <div className={styles.imgWrapper}>
                <img
                  src={getDoctorImage(doc.image)}
                  alt={doc.name}
                  className={styles.docImg}
                  width="380"
                  height="340"
                  loading="lazy"
                />
                <span className={styles.roleBadge}>{doc.role}</span>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.docName}>{doc.name}</h3>
                
                <div className={styles.metaRow}>
                  <div className={styles.metaItem}>
                    <GraduationCap size={15} className={styles.metaIcon} />
                    <span>{doc.qualifications}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Shield size={15} className={styles.metaIcon} />
                    <span>{doc.experience}</span>
                  </div>
                </div>

                <p className={styles.specialization}>
                  <strong>Specialization:</strong> {doc.specialization}
                </p>

                <button
                  onClick={onOpenAppointment}
                  className={styles.consultBtn}
                  type="button"
                  aria-label={`Book consultation with ${doc.name}`}
                >
                  <Calendar size={15} />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
