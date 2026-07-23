import React from 'react';

export const Logo = ({ height = 48, variant = 'default', showTagline = true, className = '' }) => {
  const isDarkBg = variant === 'white' || variant === 'light-text';

  const purpleColor = isDarkBg ? '#FFFFFF' : '#6D3CC8';
  const textGradStart = isDarkBg ? '#FFFFFF' : '#6D3CC8';
  const textGradEnd = isDarkBg ? '#E2E8F0' : '#4A2391';
  const taglineColor = isDarkBg ? '#4FC3F7' : '#582CA9';

  return (
    <div 
      className={className} 
      style={{ 
        height: typeof height === 'number' ? `${height}px` : height, 
        display: 'inline-flex',
        alignItems: 'center'
      }}
    >
      <svg 
        viewBox="0 0 520 130" 
        style={{ height: '100%', width: 'auto', overflow: 'visible' }}
        aria-label="LARA Smiles - Believe in your Smile"
      >
        <defs>
          <linearGradient id={`toothGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4FC3F7" />
            <stop offset="100%" stopColor="#0288D1" />
          </linearGradient>
          <linearGradient id={`textGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={textGradStart} />
            <stop offset="100%" stopColor={textGradEnd} />
          </linearGradient>
        </defs>

        {/* Tooth Icon with smile curve */}
        <g transform="translate(10, 14)">
          <path 
            d="M35 5 C22 5, 8 18, 8 36 C8 58, 18 72, 22 92 C24 102, 29 104, 34 94 C38 86, 42 86, 46 94 C51 104, 56 102, 58 92 C62 72, 72 58, 72 36 C72 18, 58 5, 45 5 Z" 
            fill="none" 
            stroke={`url(#toothGrad-${variant})`} 
            strokeWidth="6.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Inner Tooth Smile Curve */}
          <path 
            d="M22 42 Q40 62 58 42" 
            fill="none" 
            stroke={purpleColor} 
            strokeWidth="4.5" 
            strokeLinecap="round" 
          />
        </g>

        {/* LARA Bold Text */}
        <text 
          x="100" 
          y="68" 
          fontFamily="'Outfit', -apple-system, BlinkMacSystemFont, sans-serif" 
          fontSize="48" 
          fontWeight="800" 
          fill={`url(#textGrad-${variant})`} 
          letterSpacing="1"
        >
          LARA
        </text>

        {/* Smiles Script Text */}
        <text 
          x="245" 
          y="68" 
          fontFamily="'Georgia', 'Times New Roman', serif" 
          fontSize="46" 
          fontWeight="700" 
          fontStyle="italic" 
          fill={purpleColor}
        >
          Smiles
        </text>
        
        {/* Registered Symbol */}
        <text 
          x="395" 
          y="40" 
          fontFamily="sans-serif" 
          fontSize="14" 
          fontWeight="700" 
          fill={purpleColor}
        >
          ®
        </text>

        {/* Smile Swoosh Underline */}
        <path 
          d="M105 80 Q250 115 395 80" 
          fill="none" 
          stroke={purpleColor} 
          strokeWidth="4.5" 
          strokeLinecap="round" 
        />

        {/* Tagline: Believe in your Smile */}
        {showTagline && (
          <text 
            x="240" 
            y="110" 
            fontFamily="'Georgia', 'Brush Script MT', serif" 
            fontSize="18" 
            fontStyle="italic" 
            fill={taglineColor} 
            textAnchor="middle"
          >
            Believe in your Smile
          </text>
        )}
      </svg>
    </div>
  );
};
