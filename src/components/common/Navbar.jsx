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

  // Close mobile menu & dropdown on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

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
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <>
          <div
            className={styles.mobileBackdrop}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className={styles.mobileDrawer} role="dialog" aria-label="Mobile Navigation Menu">
            <nav className={styles.mobileNav}>
              <NavLink
                to="/"
                onClick={handleMobileLinkClick}
                className={({ isActive }) =>
                  `${styles.mobileNavLink} ${isActive ? styles.activeMobileLink : ''}`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                onClick={handleMobileLinkClick}
                className={({ isActive }) =>
                  `${styles.mobileNavLink} ${isActive ? styles.activeMobileLink : ''}`
                }
              >
                About
              </NavLink>

              <NavLink
                to="/treatments"
                onClick={handleMobileLinkClick}
                className={({ isActive }) =>
                  `${styles.mobileNavLink} ${isActive ? styles.activeMobileLink : ''}`
                }
              >
                Treatments
              </NavLink>

              <NavLink
                to="/doctors"
                onClick={handleMobileLinkClick}
                className={({ isActive }) =>
                  `${styles.mobileNavLink} ${isActive ? styles.activeMobileLink : ''}`
                }
              >
                Doctors
              </NavLink>

              <NavLink
                to="/gallery"
                onClick={handleMobileLinkClick}
                className={({ isActive }) =>
                  `${styles.mobileNavLink} ${isActive ? styles.activeMobileLink : ''}`
                }
              >
                Gallery
              </NavLink>

              <NavLink
                to="/contact"
                onClick={handleMobileLinkClick}
                className={({ isActive }) =>
                  `${styles.mobileNavLink} ${isActive ? styles.activeMobileLink : ''}`
                }
              >
                Contact
              </NavLink>

              <button
                onClick={() => {
                  handleMobileLinkClick();
                  onOpenAppointment();
                }}
                className={styles.mobileAppointmentBtn}
                type="button"
              >
                <Calendar size={18} /> Book Appointment
              </button>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};
