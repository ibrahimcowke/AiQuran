import React from 'react';

export default function QuranLogo({ size = 'md', className = '', glow = true }) {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${currentSize} ${className}`}>
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 to-amber-400/20 rounded-2xl blur-sm -z-10" />
      )}
      <svg 
        viewBox="0 0 512 512" 
        className="w-full h-full drop-shadow-md select-none"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="40%" stopColor="#059669" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>

          <linearGradient id="logoGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="25%" stopColor="#FCD34D" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          <linearGradient id="logoDeepGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          <linearGradient id="logoPageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FAF5E6" />
            <stop offset="50%" stopColor="#FFFDF8" />
            <stop offset="100%" stopColor="#F3EAD3" />
          </linearGradient>
        </defs>

        {/* Base Rounded Squircle with Gold Border */}
        <rect x="20" y="20" width="472" height="472" rx="112" fill="url(#logoBgGrad)" />
        <rect x="26" y="26" width="460" height="460" rx="106" stroke="url(#logoGoldGrad)" strokeWidth="8" opacity="0.9" />
        <rect x="38" y="38" width="436" height="436" rx="94" stroke="#34D399" strokeWidth="2.5" opacity="0.35" strokeDasharray="10 8" />

        {/* Mihrab Arch Silhouette */}
        <path d="M156 410 V 230 C 156 160, 256 110, 256 110 C 256 110, 356 160, 356 230 V 410" 
              stroke="url(#logoGoldGrad)" strokeWidth="3.5" opacity="0.3" />

        {/* Gilded 8-Pointed Star (Rub el Hizb ۞ / AI Wisdom Star) */}
        <g transform="translate(256, 175)">
          <rect x="-38" y="-38" width="76" height="76" rx="9" fill="url(#logoGoldGrad)" />
          <rect x="-38" y="-38" width="76" height="76" rx="9" fill="url(#logoGoldGrad)" transform="rotate(45)" />
          <circle cx="0" cy="0" r="24" fill="#064E3B" />
          <circle cx="0" cy="0" r="19" fill="url(#logoGoldGrad)" opacity="0.4" />
          {/* AI Intelligence Diamond */}
          <path d="M0 -15 Q 0 0 -15 0 Q 0 0 0 15 Q 0 0 15 0 Q 0 0 0 -15 Z" fill="#FFFFFF" />
          <circle cx="0" cy="0" r="3.5" fill="#047857" />
        </g>

        {/* Open Holy Quran Book (المصحف الشريف) */}
        <g transform="translate(0, 35)">
          <path d="M96 345 C 160 330, 235 348, 256 362 C 277 348, 352 330, 416 345 V 360 C 352 345, 277 362, 256 376 C 235 362, 160 345, 96 360 Z" 
                fill="url(#logoDeepGold)" />

          {/* Left Page */}
          <path d="M102 245 C 165 228, 236 242, 254 262 L 254 366 C 236 346, 165 332, 102 348 Z" 
                fill="url(#logoPageGrad)" stroke="#D4AF37" strokeWidth="2.5" />

          {/* Right Page */}
          <path d="M410 245 C 347 228, 276 242, 258 262 L 258 366 C 276 346, 347 332, 410 348 Z" 
                fill="url(#logoPageGrad)" stroke="#D4AF37" strokeWidth="2.5" />

          {/* Calligraphy lines on left page */}
          <g opacity="0.4" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round">
            <line x1="126" y1="272" x2="232" y2="280" />
            <line x1="126" y1="292" x2="232" y2="300" />
            <line x1="126" y1="312" x2="232" y2="320" />
            <line x1="140" y1="332" x2="218" y2="338" />
          </g>

          {/* Calligraphy lines on right page */}
          <g opacity="0.4" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round">
            <line x1="280" y1="280" x2="386" y2="272" />
            <line x1="280" y1="300" x2="386" y2="292" />
            <line x1="280" y1="320" x2="386" y2="312" />
            <line x1="294" y1="338" x2="372" y2="332" />
          </g>

          {/* Golden Spine & Hanging Silk Bookmark Ribbon */}
          <path d="M253 260 H 259 V 390 H 253 Z" fill="url(#logoGoldGrad)" />
          <path d="M251 366 L 251 424 L 256 416 L 261 424 L 261 366 Z" fill="url(#logoGoldGrad)" />
        </g>

        {/* Sparkles */}
        <path d="M120 150 Q 120 160 110 160 Q 120 160 120 170 Q 120 160 130 160 Q 120 160 120 150 Z" fill="#FDE68A" opacity="0.85" />
        <path d="M392 150 Q 392 160 382 160 Q 392 160 392 170 Q 392 160 402 160 Q 392 160 392 150 Z" fill="#FDE68A" opacity="0.85" />
      </svg>
    </div>
  );
}
