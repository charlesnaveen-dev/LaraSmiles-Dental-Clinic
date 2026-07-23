import React from 'react';
import styles from './AIAssistant.module.css';

export const QuickActions = ({ onSelectChip }) => {
  const chips = [
    { label: '📅 Book Appointment', query: 'Book Appointment' },
    { label: '🦷 Invisalign®', query: 'Invisalign' },
    { label: '😁 Smile Makeover', query: 'Smile Makeover' },
    { label: '🦷 Dental Implants', query: 'Dental Implants' },
    { label: '✨ Teeth Whitening', query: 'Teeth Whitening' },
    { label: '🦷 Root Canal', query: 'Root Canal' },
    { label: '⏰ Clinic Timings', query: 'Clinic Timings' },
    { label: '📍 Location & Map', query: 'Clinic Location' },
    { label: '👨‍⚕️ Our Doctors', query: 'Our Doctors' },
    { label: '💳 Insurance & Cost', query: 'Pricing' },
    { label: '🚨 Emergency Care', query: 'Emergency Care' }
  ];

  return (
    <div className={styles.quickActionsContainer}>
      <span className={styles.quickActionsLabel}>Quick Actions:</span>
      <div className={styles.chipsScroll}>
        {chips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => onSelectChip(chip.query)}
            className={styles.quickChip}
            type="button"
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
};
