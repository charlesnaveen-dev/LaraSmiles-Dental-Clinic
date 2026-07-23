import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar, User, Sparkles, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { SEOHead } from '@/components/common/SEOHead';
import { BranchSelector } from '@/components/common/BranchSelector';
import styles from './ContactPage.module.css';

export const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const formattedMessage = `Hello Lara Smiles, I would like to book an appointment.

Name: ${data.name}
Mobile Number: ${data.phone}
Treatment: ${data.treatment}
Preferred Date: ${data.date}
Preferred Time: ${data.time}
Message: ${data.message || 'N/A'}

Please confirm my appointment.`;

    const encoded = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/919384959626?text=${encoded}`;
    
    window.open(whatsappUrl, '_blank');
    reset();
  };

  return (
    <>
      <SEOHead 
        title="Contact & Book Appointment | LARA Smiles"
        description="Book your appointment online or visit LARA Smiles main Tiruppur clinic and branches across Salem, Madurai, Bangalore, and Sivakasi. Call +91 93849 59626."
        path="/contact"
      />

      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.tag}><MapPin size={14} /> Get In Touch</span>
          <h1 className={styles.heroTitle}>Contact & Appointments</h1>
          <p className={styles.heroDesc}>
            Book your consultation via our WhatsApp appointment form or visit your nearest LARA Smiles branch across South India.
          </p>
        </div>
      </section>

      {/* Embedded Form & Contact Overview Grid */}
      <section className={`section ${styles.mainContactSection}`}>
        <div className="container">
          <div className={styles.grid2Col}>
            {/* Embedded Appointment Form Card */}
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <span className={styles.formBadge}>Direct WhatsApp Booking</span>
                <h2 className={styles.formTitle}>Book an Appointment</h2>
                <p className={styles.formSub}>Fill in your details to generate a pre-filled WhatsApp confirmation message.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-name" className={styles.label}>Full Name *</label>
                  <div className={styles.inputWrapper}>
                    <User size={18} className={styles.icon} />
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Enter your name"
                      className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      {...register('name', { required: 'Name is required' })}
                    />
                  </div>
                  {errors.name && <span className={styles.errorMsg}>{errors.name.message}</span>}
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-phone" className={styles.label}>Mobile Number *</label>
                  <div className={styles.inputWrapper}>
                    <Phone size={18} className={styles.icon} />
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                      {...register('phone', {
                        required: 'Mobile number is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Enter valid 10-digit number'
                        }
                      })}
                    />
                  </div>
                  {errors.phone && <span className={styles.errorMsg}>{errors.phone.message}</span>}
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-treatment" className={styles.label}>Preferred Treatment *</label>
                  <div className={styles.inputWrapper}>
                    <Sparkles size={18} className={styles.icon} />
                    <select
                      id="contact-treatment"
                      className={`${styles.select} ${errors.treatment ? styles.inputError : ''}`}
                      {...register('treatment', { required: 'Select treatment' })}
                    >
                      <option value="">Select Treatment...</option>
                      <option value="General Consultation">General Consultation</option>
                      <option value="Invisalign">Invisalign® Clear Aligners</option>
                      <option value="Dental Implant">Dental Implant</option>
                      <option value="Root Canal">Root Canal Treatment</option>
                      <option value="Whitening">Laser Teeth Whitening</option>
                      <option value="Veneers">Porcelain Veneers</option>
                      <option value="Smile Makeover">Smile Makeover</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  {errors.treatment && <span className={styles.errorMsg}>{errors.treatment.message}</span>}
                </div>

                <div className={styles.row2}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-date" className={styles.label}>Preferred Date *</label>
                    <div className={styles.inputWrapper}>
                      <Calendar size={18} className={styles.icon} />
                      <input
                        id="contact-date"
                        type="date"
                        className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
                        {...register('date', { required: 'Select date' })}
                      />
                    </div>
                    {errors.date && <span className={styles.errorMsg}>{errors.date.message}</span>}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-time" className={styles.label}>Preferred Time *</label>
                    <div className={styles.inputWrapper}>
                      <Clock size={18} className={styles.icon} />
                      <select
                        id="contact-time"
                        className={`${styles.select} ${errors.time ? styles.inputError : ''}`}
                        {...register('time', { required: 'Select time' })}
                      >
                        <option value="">Select Time...</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="04:30 PM">04:30 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                        <option value="07:30 PM">07:30 PM</option>
                      </select>
                    </div>
                    {errors.time && <span className={styles.errorMsg}>{errors.time.message}</span>}
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-msg" className={styles.label}>Message (Optional)</label>
                  <div className={styles.inputWrapper}>
                    <MessageSquare size={18} className={styles.iconTop} />
                    <textarea
                      id="contact-msg"
                      rows={3}
                      placeholder="Mention any dental concerns..."
                      className={styles.textarea}
                      {...register('message')}
                    />
                  </div>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <MessageCircle size={18} /> Confirm Appointment via WhatsApp
                </button>
              </form>
            </div>

            {/* Quick Contact & Working Hours Side Box */}
            <div className={styles.sideBox}>
              <h2 className={styles.sideTitle}>Direct Clinic Contacts</h2>

              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <div className={styles.iconBox}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className={styles.itemLabel}>Call Us Directly</span>
                    <a href="tel:+919384959626" className={styles.itemVal}>+91 93849 59626</a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.iconBoxGreen}>
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <span className={styles.itemLabel}>WhatsApp Support</span>
                    <a 
                      href="https://wa.me/919384959626?text=Hello%20Lara%20Smiles%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20consultation."
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.itemVal}
                    >
                      +91 93849 59626
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.iconBox}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className={styles.itemLabel}>Email Support</span>
                    <a href="mailto:care@larasmiles.com" className={styles.itemVal}>care@larasmiles.com</a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.iconBox}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className={styles.itemLabel}>Business Hours</span>
                    <p className={styles.itemText}>Mon - Sat: 9:00 AM - 9:00 PM</p>
                    <p className={styles.itemText}>Sunday: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Call Now Action */}
              <div className={styles.actionRow}>
                <a href="tel:+919384959626" className={styles.callNowBtn}>
                  <Phone size={18} /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Branch Selector & Google Maps Embed */}
      <section className={`section ${styles.branchSection}`}>
        <div className="container">
          <div className={styles.headerCenter}>
            <span className={styles.tag}>South India Network</span>
            <h2 className={styles.sectionTitle}>Interactive Branch & Map Selector</h2>
            <p className={styles.sectionSub}>Select any branch tab below to view verified location details, map embed, and direct Google Maps directions.</p>
          </div>

          <BranchSelector />
        </div>
      </section>
    </>
  );
};
