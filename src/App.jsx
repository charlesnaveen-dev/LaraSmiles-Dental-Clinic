import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Preloader } from '@/components/common/Preloader';
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { FloatingActions } from '@/components/common/FloatingActions';
import { AppointmentModal } from '@/components/common/AppointmentModal';

import '@/styles/global.css';

// Lazy-loaded pages for optimal code splitting & bundle performance
const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const TreatmentsPage = lazy(() => import('@/pages/TreatmentsPage').then((m) => ({ default: m.TreatmentsPage })));
const DoctorsPage = lazy(() => import('@/pages/DoctorsPage').then((m) => ({ default: m.DoctorsPage })));
const GalleryPage = lazy(() => import('@/pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const ContactPage = lazy(() => import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })));

// Scroll To Top on Route Change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

export function App() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isPreloaderDone, setIsPreloaderDone] = useState(() => {
    return !!sessionStorage.getItem('lara_smiles_preloaded');
  });

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const handlePreloaderFinish = () => {
    sessionStorage.setItem('lara_smiles_preloaded', 'true');
    setIsPreloaderDone(true);
  };

  return (
    <Router>
      <ScrollToTop />

      {/* Initial Brand Percentage Preloader */}
      {!isPreloaderDone && (
        <Preloader onFinish={handlePreloaderFinish} />
      )}

      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Apple-Style Glass Navbar */}
      <Navbar onOpenAppointment={() => setIsAppointmentOpen(true)} />

      {/* Main Route View */}
      <main>
        <Suspense fallback={<div style={{ minHeight: '80vh', background: '#ffffff' }} />}>
          <Routes>
            <Route path="/" element={<HomePage onOpenAppointment={() => setIsAppointmentOpen(true)} />} />
            <Route path="/about" element={<AboutPage onOpenAppointment={() => setIsAppointmentOpen(true)} />} />
            <Route path="/treatments" element={<TreatmentsPage onOpenAppointment={() => setIsAppointmentOpen(true)} />} />
            <Route path="/doctors" element={<DoctorsPage onOpenAppointment={() => setIsAppointmentOpen(true)} />} />
            <Route path="/gallery" element={<GalleryPage onOpenAppointment={() => setIsAppointmentOpen(true)} />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </main>

      {/* Luxury Footer */}
      <Footer onOpenAppointment={() => setIsAppointmentOpen(true)} />

      {/* Unified Floating Actions Stack (Includes Back To Top, Lara AI, WhatsApp, Call) */}
      <FloatingActions onOpenAppointment={() => setIsAppointmentOpen(true)} />

      {/* WhatsApp Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />
    </Router>
  );
}

export default App;
