import React from 'react';
import { useForm } from 'react-hook-form';
import { X, Calendar, Clock, User, Phone, MessageSquare, Sparkles } from 'lucide-react';
import styles from './AppointmentModal.module.css';

export const AppointmentModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  if (!isOpen) return null;

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
    
    // Open WhatsApp directly in new tab
    window.open(whatsappUrl, '_blank');
    reset();
    onClose();
  };

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose} 
          className={styles.closeBtn}
          aria-label="Close appointment modal"
        >
          <X size={20} />
        </button>

        <div className={styles.header}>
          <div className={styles.badge}>
            <Sparkles size={14} /> VIP Consultation
          </div>
          <h2 id="modal-title" className={styles.title}>Book Your Appointment</h2>
          <p className={styles.subtitle}>Select your preferred date & time. Opens directly in WhatsApp.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* Name Field */}
          <div className={styles.fieldGroup}>
            <label htmlFor="name" className={styles.label}>Full Name *</label>
            <div className={styles.inputWrapper}>
              <User size={18} className={styles.icon} />
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                {...register('name', { required: 'Name is required' })}
              />
            </div>
            {errors.name && <span className={styles.errorMsg}>{errors.name.message}</span>}
          </div>

          {/* Phone Field */}
          <div className={styles.fieldGroup}>
            <label htmlFor="phone" className={styles.label}>Mobile Number *</label>
            <div className={styles.inputWrapper}>
              <Phone size={18} className={styles.icon} />
              <input
                id="phone"
                type="tel"
                placeholder="10-digit mobile number"
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                {...register('phone', {
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Please enter a valid 10-digit number'
                  }
                })}
              />
            </div>
            {errors.phone && <span className={styles.errorMsg}>{errors.phone.message}</span>}
          </div>

          {/* Treatment Dropdown */}
          <div className={styles.fieldGroup}>
            <label htmlFor="treatment" className={styles.label}>Preferred Treatment *</label>
            <div className={styles.inputWrapper}>
              <Sparkles size={18} className={styles.icon} />
              <select
                id="treatment"
                className={`${styles.select} ${errors.treatment ? styles.inputError : ''}`}
                {...register('treatment', { required: 'Please select a treatment' })}
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

          {/* Date & Time Row */}
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label htmlFor="date" className={styles.label}>Preferred Date *</label>
              <div className={styles.inputWrapper}>
                <Calendar size={18} className={styles.icon} />
                <input
                  id="date"
                  type="date"
                  className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
                  {...register('date', { required: 'Select date' })}
                />
              </div>
              {errors.date && <span className={styles.errorMsg}>{errors.date.message}</span>}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="time" className={styles.label}>Preferred Time *</label>
              <div className={styles.inputWrapper}>
                <Clock size={18} className={styles.icon} />
                <select
                  id="time"
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

          {/* Message Field */}
          <div className={styles.fieldGroup}>
            <label htmlFor="message" className={styles.label}>Additional Message (Optional)</label>
            <div className={styles.inputWrapper}>
              <MessageSquare size={18} className={styles.iconTop} />
              <textarea
                id="message"
                rows={3}
                placeholder="Mention any specific concerns..."
                className={styles.textarea}
                {...register('message')}
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Confirm via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};
