import React from 'react';
import { SEOHead } from '@/components/common/SEOHead';
import { Hero } from '@/components/home/Hero';
import { WhyChoose } from '@/components/home/WhyChoose';
import { FeaturedTreatments } from '@/components/home/FeaturedTreatments';
import { DoctorsPreview } from '@/components/home/DoctorsPreview';
import { Testimonials } from '@/components/home/Testimonials';
import { CTASection } from '@/components/home/CTASection';

export const HomePage = ({ onOpenAppointment }) => {
  return (
    <>
      <SEOHead 
        title="LARA Smiles | Premium Dental Care, Invisalign® & Implants"
        description="Creating confident smiles with advanced dental care, Invisalign®, dental implants, and personalized smile transformations."
        path="/"
      />

      {/* 1. Hero */}
      <Hero onOpenAppointment={onOpenAppointment} />

      {/* 2. Why Choose LARA Smiles */}
      <WhyChoose />

      {/* 3. Featured Treatments */}
      <FeaturedTreatments onOpenAppointment={onOpenAppointment} />

      {/* 4. Meet Our Doctors (Preview) */}
      <DoctorsPreview onOpenAppointment={onOpenAppointment} />

      {/* 5. Patient Testimonials */}
      <Testimonials />

      {/* 6. Book Appointment CTA */}
      <CTASection onOpenAppointment={onOpenAppointment} />
    </>
  );
};
