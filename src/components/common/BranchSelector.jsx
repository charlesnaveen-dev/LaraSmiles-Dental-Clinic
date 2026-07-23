import React, { useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink, Navigation } from 'lucide-react';
import { branchesData } from '@/data/branchesData';
import styles from './BranchSelector.module.css';

export const BranchSelector = () => {
  const [activeBranchId, setActiveBranchId] = useState('tiruppur');
  const activeBranch = branchesData.find((b) => b.id === activeBranchId) || branchesData[0];

  return (
    <div className={styles.wrapper}>
      {/* Branch Tabs */}
      <div className={styles.tabsList} role="tablist" aria-label="LARA Smiles Branch Locations">
        {branchesData.map((branch) => {
          const isActive = branch.id === activeBranchId;
          return (
            <button
              key={branch.id}
              role="tab"
              aria-selected={isActive}
              className={`${styles.tabBtn} ${isActive ? styles.activeTab : ''}`}
              onClick={() => setActiveBranchId(branch.id)}
            >
              <MapPin size={16} className={styles.tabIcon} />
              <span>{branch.name.split(' ')[0]}</span>
              {branch.isMain && <span className={styles.mainBadge}>Main</span>}
            </button>
          );
        })}
      </div>

      {/* Active Branch Details Grid */}
      <div className={styles.contentGrid}>
        {/* Info Card */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.branchTitle}>{activeBranch.name}</h3>
            {activeBranch.isMain ? (
              <span className={styles.badgeGold}>Flagship Clinic</span>
            ) : (
              <span className={styles.badgePurple}>South India Network</span>
            )}
          </div>

          <div className={styles.detailsList}>
            {/* Address */}
            <div className={styles.detailItem}>
              <div className={styles.iconBox}>
                <MapPin size={20} />
              </div>
              <div>
                <span className={styles.detailLabel}>Address</span>
                <p className={styles.detailText}>{activeBranch.address}</p>
              </div>
            </div>

            {/* Phone */}
            <div className={styles.detailItem}>
              <div className={styles.iconBox}>
                <Phone size={20} />
              </div>
              <div>
                <span className={styles.detailLabel}>Contact Phone</span>
                <p className={styles.detailText}>{activeBranch.displayPhone}</p>
              </div>
            </div>

            {/* Hours */}
            <div className={styles.detailItem}>
              <div className={styles.iconBox}>
                <Clock size={20} />
              </div>
              <div>
                <span className={styles.detailLabel}>Working Hours</span>
                <p className={styles.detailText}>{activeBranch.hours}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionGroup}>
            <a
              href={activeBranch.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionsBtn}
            >
              <Navigation size={18} />
              Get Directions
            </a>

            <a
              href={`tel:${activeBranch.phone.replace(/[^0-9+]/g, '')}`}
              className={styles.callBtn}
            >
              <Phone size={18} />
              Call Now
            </a>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className={styles.mapContainer}>
          <iframe
            title={`Google Map - ${activeBranch.name}`}
            src={activeBranch.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={styles.mapIframe}
          />
        </div>
      </div>
    </div>
  );
};
