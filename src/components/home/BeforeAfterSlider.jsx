import React, { useState, useRef } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';
import beforeAfterImg from '@/assets/images/LaraSmile/before-after-1.jpg';
import styles from './BeforeAfterSlider.module.css';

export const BeforeAfterSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };

  const onMouseDown = () => { isDragging.current = true; };
  const onMouseUp = () => { isDragging.current = false; };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}><Sparkles size={14} /> Real Patient Transformation</span>
          <h2 className={styles.title}>See The Power of a LARA Smile Makeover</h2>
          <p className={styles.subtitle}>Drag the slider to witness the real, un-retouched before & after smile transformation.</p>
        </div>

        <div 
          className={styles.sliderContainer}
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
        >
          {/* Base Image (After / Right) */}
          <img 
            src={beforeAfterImg} 
            alt="LARA Smiles After Transformation" 
            className={styles.baseImg} 
          />
          <span className={`${styles.label} ${styles.labelAfter}`}>AFTER (LARA Smile)</span>

          {/* Overlay Image (Before / Left Clip) */}
          <div 
            className={styles.overlayWrapper} 
            style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
          >
            <img 
              src={beforeAfterImg} 
              alt="LARA Smiles Before Transformation" 
              className={`${styles.baseImg} ${styles.beforeFilter}`} 
            />
            <span className={`${styles.label} ${styles.labelBefore}`}>BEFORE</span>
          </div>

          {/* Slider Line & Handle */}
          <div 
            className={styles.sliderHandle} 
            style={{ left: `${sliderPos}%` }}
          >
            <div className={styles.handleButton}>
              <MoveHorizontal size={18} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
