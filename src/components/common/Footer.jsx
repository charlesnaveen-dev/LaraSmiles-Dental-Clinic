import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, Phone, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Logo } from '@/components/common/Logo';
import { branchesData } from '@/data/branchesData';
import styles from './Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

export const Footer = ({ onOpenAppointment }) => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%'
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={`container ${styles.footerGrid}`}>
        {/* Brand Info */}
        <div className={styles.brandCol}>
          <Logo variant="white" height={54} className={styles.footerLogo} />
          <p className={styles.description}>
            Creating confident smiles with advanced dental care, Invisalign®, dental implants, and personalized smile transformations across South India.
          </p>
          <div className={styles.badges}>
            <span className={styles.badge}><ShieldCheck size={14} /> ISO 9001:2015 Certified</span>
            <span className={styles.badge}><Sparkles size={14} /> Invisalign® Diamond Provider</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.linkList}>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About LARA Smiles</NavLink></li>
            <li><NavLink to="/treatments">All Treatments</NavLink></li>
            <li><NavLink to="/doctors">Our Specialists</NavLink></li>
            <li><NavLink to="/contact">Contact & Map</NavLink></li>
          </ul>
        </div>

        {/* Featured Treatments */}
        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Key Services</h4>
          <ul className={styles.linkList}>
            <li><NavLink to="/treatments#invisalign">Invisalign® Clear Aligners</NavLink></li>
            <li><NavLink to="/treatments#implants">Permanent Dental Implants</NavLink></li>
            <li><NavLink to="/treatments#veneers">Porcelain Veneers</NavLink></li>
            <li><NavLink to="/treatments#smile-makeover">Full Smile Makeover</NavLink></li>
            <li><NavLink to="/treatments#root-canal">Painless Root Canal</NavLink></li>
          </ul>
        </div>

        {/* Our Network Branches */}
        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>South India Locations</h4>
          <ul className={styles.branchList}>
            {branchesData.map((branch) => (
              <li key={branch.id} className={styles.branchItem}>
                <MapPin size={14} className={styles.branchIcon} />
                <span>{branch.name}</span>
              </li>
            ))}
          </ul>
          <div className={styles.contactPhone}>
            <Phone size={16} />
            <a href="tel:+919384959626">+91 93849 59626</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomFlex}`}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} LARA Smiles Dental Clinic. All Rights Reserved. Designed with <Heart size={14} className={styles.heartIcon} /> for real client perfection.
          </p>
          <div className={styles.legalLinks}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Verified Google Rating 4.9⭐</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
