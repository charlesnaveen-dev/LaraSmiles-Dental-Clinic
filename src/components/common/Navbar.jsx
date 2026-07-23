import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Calendar, Menu, X, Sparkles } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { treatmentsData } from '@/data/treatmentsData';
import styles from './Navbar.module.css';

export const Navbar = ({ onOpenAppointment }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        {/* Left Side: Official LARA Smiles Logo */}
        <NavLink to="/" className={styles.logoLink} aria-label="LARA Smiles Home">
          <Logo height={isScrolled ? 40 : 48} showTagline={!isScrolled} />
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.activeLink : ''}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.activeLink : ''}`
            }
          >
            About
          </NavLink>

          {/* Treatments Dropdown */}
          <div
            className={styles.dropdownContainer}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <NavLink
              to="/treatments"
              className={({ isActive }) =>
                `${styles.navLink} ${styles.dropdownTrigger} ${
                  isActive || location.pathname.startsWith('/treatments') ? styles.activeLink : ''
                }`
              }
            >
              Treatments
              <ChevronDown size={14} className={`${styles.chevron} ${isDropdownOpen ? styles.chevronRotated : ''}`} />
            </NavLink>

            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownHeader}>
                  <Sparkles size={14} /> Advanced Dental Procedures
                </div>
                <div className={styles.dropdownGrid}>
                  {treatmentsData.map((item) => (
                    <NavLink
                      key={item.id}
                      to={`/treatments#${item.slug}`}
                      className={styles.dropdownItem}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <span className={styles.itemTitle}>{item.title}</span>
                      <span className={styles.itemDesc}>{item.shortDescription}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.activeLink : ''}`
            }
          >
            Doctors
          </NavLink>

          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.activeLink : ''}`
            }
          >
            Gallery
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.activeLink : ''}`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Right Side: Appointment CTA */}
        <div className={styles.rightActions}>
          <button
            onClick={onOpenAppointment}
            className={styles.appointmentBtn}
            aria-label="Book Dental Appointment"
          >
            <Calendar size={16} />
            <span>Book Appointment</span>
          </button>

          <button
            className={styles.mobileToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <nav className={styles.mobileNav}>
            <NavLink to="/" className={styles.mobileNavLink}>Home</NavLink>
            <NavLink to="/about" className={styles.mobileNavLink}>About</NavLink>
            <NavLink to="/treatments" className={styles.mobileNavLink}>Treatments</NavLink>
            <NavLink to="/doctors" className={styles.mobileNavLink}>Doctors</NavLink>
            <NavLink to="/gallery" className={styles.mobileNavLink}>Gallery</NavLink>
            <NavLink to="/contact" className={styles.mobileNavLink}>Contact</NavLink>
            <button onClick={onOpenAppointment} className={styles.mobileAppointmentBtn}>
              <Calendar size={18} /> Book Appointment
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
