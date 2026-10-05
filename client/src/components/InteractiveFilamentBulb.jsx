import React from 'react';
import { motion } from 'framer-motion';

export const InteractiveFilamentBulb = ({
  brightness = 85, // 0 to 100
  isOn = true,
  kelvin = 2200, // 1800K to 3500K
  filamentType = 'Squirrel Cage', // 'Squirrel Cage', 'Spiral Helix', 'Quad Loop', 'Hairpin', 'Heart', 'Starburst'
  shape = 'ST64 Teardrop', // 'ST64 Teardrop', 'G125 Globe', 'T45 Tubular', 'Diamond', 'Radio Tube', 'Candle Flame'
  glassFinish = 'Amber Gold', // 'Amber Gold', 'Smoked Titanium', 'Crystal Clear', 'Antique Mercury'
  socketFinish = 'Brushed Brass', // 'Brushed Brass', 'Antique Copper', 'Matte Gunmetal'
  size = 'md', // 'sm', 'md', 'lg', 'xl'
  interactive = true,
  onToggle,
  showParticles = true,
  className = ""
}) => {
  const effectiveBrightness = isOn ? brightness / 100 : 0;

  // Compute color based on Kelvin temperature and brightness
  const getGlowColor = () => {
    if (!isOn || effectiveBrightness === 0) return 'rgba(60, 45, 30, 0.2)';
    if (kelvin <= 1900) return `rgba(255, 120, 20, ${0.4 + effectiveBrightness * 0.6})`;
    if (kelvin <= 2200) return `rgba(255, 170, 40, ${0.4 + effectiveBrightness * 0.6})`;
    if (kelvin <= 2700) return `rgba(255, 200, 80, ${0.4 + effectiveBrightness * 0.6})`;
    return `rgba(255, 230, 150, ${0.4 + effectiveBrightness * 0.6})`;
  };

  const getFilamentColor = () => {
    if (!isOn || effectiveBrightness === 0) return '#423326';
    if (effectiveBrightness < 0.2) return '#ff4500';
    if (effectiveBrightness < 0.5) return '#ff8c00';
    if (effectiveBrightness < 0.8) return '#ffb72e';
    return '#fff3cc';
  };

  const getGlassTint = () => {
    switch (glassFinish) {
      case 'Smoked Titanium':
        return 'rgba(25, 25, 28, 0.45)';
      case 'Crystal Clear':
        return 'rgba(255, 255, 255, 0.05)';
      case 'Antique Mercury':
        return 'rgba(180, 140, 90, 0.35)';
      case 'Amber Gold':
      default:
        return 'rgba(245, 158, 11, 0.18)';
    }
  };

  const getSocketGradient = () => {
    switch (socketFinish) {
      case 'Antique Copper':
        return {
          top: '#f29b76',
          mid: '#c86432',
          base: '#69260d',
        };
      case 'Matte Gunmetal':
        return {
          top: '#6b7280',
          mid: '#374151',
          base: '#111827',
        };
      case 'Brushed Brass':
      default:
        return {
          top: '#fae4a8',
          mid: '#c89d53',
          base: '#593e11',
        };
    }
  };

  const socketColors = getSocketGradient();

  const dimensions = {
    sm: { width: 140, height: 210 },
    md: { width: 220, height: 330 },
    lg: { width: 300, height: 450 },
    xl: { width: 380, height: 570 },
  }[size] || { width: 220, height: 330 };

  // Render Glass Bulb Contours depending on Shape
  const renderGlassPath = () => {
    switch (shape) {
      case 'G125 Globe':
      case 'G95 Globe':
      case 'G200 Oversized':
        // Big round sphere that tapers smoothly to socket neck
        return (
          <path
            d="M 120 70 
               C 50 70, 30 140, 30 190 
               C 30 250, 60 295, 100 315 
               L 100 340 
               L 140 340 
               L 140 315 
               C 180 295, 210 250, 210 190 
               C 210 140, 190 70, 120 70 Z"
            fill={getGlassTint()}
            stroke="rgba(255, 220, 150, 0.3)"
            strokeWidth="2.5"
          />
        );
      case 'T45 Tubular':
        // Long slender straight cylinder
        return (
          <path
            d="M 85 70 
               C 85 45, 155 45, 155 70 
               L 155 315 
               L 140 340 
               L 100 340 
               L 85 315 Z"
            fill={getGlassTint()}
            stroke="rgba(255, 220, 150, 0.3)"
            strokeWidth="2.5"
          />
        );
      case 'Diamond':
        // Prismatic faceted diamond
        return (
          <path
            d="M 120 50 
               L 195 140 
               L 180 260 
               L 140 340 
               L 100 340 
               L 60 260 
               L 45 140 Z"
            fill={getGlassTint()}
            stroke="rgba(255, 220, 150, 0.35)"
            strokeWidth="2.5"
          />
        );
      case 'Radio Tube':
        // Steampunk valve contour
        return (
          <path
            d="M 80 80 
               C 80 50, 160 50, 160 80 
               L 165 250 
               C 165 290, 145 320, 140 340 
               L 100 340 
               C 95 320, 75 290, 75 250 Z"
            fill={getGlassTint()}
            stroke="rgba(255, 220, 150, 0.3)"
            strokeWidth="2.5"
          />
        );
      case 'Candle Flame':
        // Sinuous bent candle flame tip
        return (
          <path
            d="M 120 40 
               C 140 70, 175 140, 170 220 
               C 165 280, 145 315, 140 340 
               L 100 340 
               C 95 315, 70 280, 70 220 
               C 70 140, 100 70, 120 40 Z"
            fill={getGlassTint()}
            stroke="rgba(255, 220, 150, 0.3)"
            strokeWidth="2.5"
          />
        );
      case 'ST64 Teardrop':
      default:
        // Classic Edison teardrop shape with pointed crown
        return (
          <path
            d="M 120 50 
               C 115 50, 70 85, 55 145 
               C 42 195, 60 260, 95 305 
               L 95 340 
               L 145 340 
               L 145 305 
               C 180 260, 198 195, 185 145 
               C 170 85, 125 50, 120 50 Z"
            fill={getGlassTint()}
            stroke="rgba(255, 220, 150, 0.32)"
            strokeWidth="2.5"
          />
        );
    }
  };

  // Render Filament Geometry
  const renderFilament = () => {
    const strokeW = Math.max(1.8, 1.8 + effectiveBrightness * 1.5);
    const glowIntensity = effectiveBrightness;

    switch (filamentType) {
      case 'Spiral Helix':
        return (
          <g>
            {/* Center stem support */}
            <line x1="120" y1="310" x2="120" y2="120" stroke="#715438" strokeWidth="2.5" opacity="0.8" />
            <line x1="110" y1="310" x2="110" y2="240" stroke="#5c442c" strokeWidth="1.5" />
            <line x1="130" y1="310" x2="130" y2="240" stroke="#5c442c" strokeWidth="1.5" />
            
            {/* Vertical winding spiral */}
            <path
              d="M 105 240 
                 C 145 230, 145 200, 105 190 
                 C 65 180, 65 150, 105 140 
                 C 145 130, 145 100, 120 90 
                 C 95 100, 95 130, 135 140 
                 C 175 150, 175 180, 135 190 
                 C 95 200, 95 230, 135 240"
              fill="none"
              stroke={getFilamentColor()}
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: isOn && brightness > 0 ? `drop-shadow(0 0 ${8 + glowIntensity * 16}px ${getGlowColor()})` : 'none'
              }}
            />
          </g>
        );

      case 'Quad Loop':
        return (
          <g>
            <line x1="120" y1="310" x2="120" y2="130" stroke="#715438" strokeWidth="2.5" />
            {/* 4 tall vertical arching loops */}
            <path
              d="M 100 280 
                 L 100 110 
                 C 100 90, 110 90, 110 110 
                 L 110 270 
                 L 120 270 
                 L 120 100 
                 C 120 80, 130 80, 130 100 
                 L 130 270 
                 L 140 270 
                 L 140 110 
                 C 140 90, 150 90, 150 110 
                 L 150 280"
              fill="none"
              stroke={getFilamentColor()}
              strokeWidth={strokeW}
              strokeLinecap="round"
              style={{
                filter: isOn && brightness > 0 ? `drop-shadow(0 0 ${8 + glowIntensity * 16}px ${getGlowColor()})` : 'none'
              }}
            />
          </g>
        );

      case 'Hairpin':
        return (
          <g>
            <line x1="120" y1="310" x2="120" y2="150" stroke="#715438" strokeWidth="2" />
            <path
              d="M 105 270 
                 L 115 110 
                 C 117 95, 123 95, 125 110 
                 L 135 270"
              fill="none"
              stroke={getFilamentColor()}
              strokeWidth={strokeW + 0.5}
              strokeLinecap="round"
              style={{
                filter: isOn && brightness > 0 ? `drop-shadow(0 0 ${8 + glowIntensity * 16}px ${getGlowColor()})` : 'none'
              }}
            />
          </g>
        );

      case 'Heart':
        return (
          <g>
            <line x1="120" y1="310" x2="120" y2="220" stroke="#715438" strokeWidth="2" />
            <path
              d="M 120 220 
                 C 90 170, 75 120, 100 95 
                 C 118 75, 120 100, 120 110 
                 C 120 100, 122 75, 140 95 
                 C 165 120, 150 170, 120 220 Z"
              fill="none"
              stroke={getFilamentColor()}
              strokeWidth={strokeW}
              strokeLinecap="round"
              style={{
                filter: isOn && brightness > 0 ? `drop-shadow(0 0 ${8 + glowIntensity * 18}px ${getGlowColor()})` : 'none'
              }}
            />
          </g>
        );

      case 'Squirrel Cage':
      default:
        // Thomas Edison's signature multiple zigzag cage around glass arbor
        return (
          <g>
            {/* Center glass support arbor */}
            <line x1="120" y1="320" x2="120" y2="140" stroke="#785c40" strokeWidth="3" opacity="0.9" />
            {/* Radiating molybdenum filament anchor wires */}
            <line x1="120" y1="145" x2="80" y2="135" stroke="#8c6d4f" strokeWidth="1.2" />
            <line x1="120" y1="145" x2="95" y2="120" stroke="#8c6d4f" strokeWidth="1.2" />
            <line x1="120" y1="145" x2="145" y2="120" stroke="#8c6d4f" strokeWidth="1.2" />
            <line x1="120" y1="145" x2="160" y2="135" stroke="#8c6d4f" strokeWidth="1.2" />

            <line x1="120" y1="260" x2="85" y2="250" stroke="#8c6d4f" strokeWidth="1.2" />
            <line x1="120" y1="260" x2="155" y2="250" stroke="#8c6d4f" strokeWidth="1.2" />

            {/* Squirrel cage zigzag filament pattern */}
            <path
              d="M 85 270 
                 L 80 135 
                 L 95 265 
                 L 95 120 
                 L 110 260 
                 L 120 115 
                 L 130 260 
                 L 145 120 
                 L 145 265 
                 L 160 135 
                 L 155 270"
              fill="none"
              stroke={getFilamentColor()}
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: isOn && brightness > 0 ? `drop-shadow(0 0 ${6 + glowIntensity * 16}px ${getGlowColor()}) drop-shadow(0 0 ${16 + glowIntensity * 30}px rgba(245,158,11,0.5))` : 'none'
              }}
            />
          </g>
        );
    }
  };

  return (
    <div 
      className={`relative flex items-center justify-center select-none ${interactive ? 'cursor-pointer' : ''} ${className}`}
      onClick={interactive && onToggle ? onToggle : undefined}
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      {/* Background Volumetric Glow Aura */}
      {isOn && effectiveBrightness > 0.05 && (
        <motion.div
          animate={{
            scale: [1, 1.04, 1],
            opacity: [0.7 * effectiveBrightness, 0.95 * effectiveBrightness, 0.7 * effectiveBrightness]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full pointer-events-none blur-3xl"
          style={{
            background: `radial-gradient(circle, ${getGlowColor()} 0%, rgba(245, 158, 11, ${0.35 * effectiveBrightness}) 35%, rgba(180, 83, 9, 0) 70%)`,
            transform: 'scale(1.4)'
          }}
        />
      )}

      {/* Realistic Glass & Filament SVG Vector Artwork */}
      <svg
        viewBox="0 0 240 400"
        className="w-full h-full relative z-10 drop-shadow-2xl overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Brass socket gradient */}
          <linearGradient id={`socketGrad-${socketFinish}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={socketColors.top} />
            <stop offset="50%" stopColor={socketColors.mid} />
            <stop offset="100%" stopColor={socketColors.base} />
          </linearGradient>

          {/* Internal ambient glow radial */}
          <radialGradient id="internalGlow" cx="50%" cy="45%" r="45%">
            <stop offset="0%" stopColor={isOn ? '#ffecb3' : 'transparent'} stopOpacity={effectiveBrightness * 0.9} />
            <stop offset="50%" stopColor={isOn ? '#ff9800' : 'transparent'} stopOpacity={effectiveBrightness * 0.4} />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          {/* Glass reflection gradient */}
          <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="70%" stopColor="transparent" stopOpacity="0" />
            <stop offset="100%" stopColor="#ffb72e" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* 1. Base / Socket Hardware (E26 / E27 Edison screw threads) */}
        <g id="screw-base">
          {/* Threaded grooves */}
          <rect x="94" y="340" width="52" height="8" rx="3" fill={`url(#socketGrad-${socketFinish})`} stroke="#291a07" strokeWidth="1" />
          <rect x="92" y="348" width="56" height="8" rx="3" fill={`url(#socketGrad-${socketFinish})`} stroke="#291a07" strokeWidth="1" />
          <rect x="94" y="356" width="52" height="8" rx="3" fill={`url(#socketGrad-${socketFinish})`} stroke="#291a07" strokeWidth="1" />
          <rect x="92" y="364" width="56" height="8" rx="3" fill={`url(#socketGrad-${socketFinish})`} stroke="#291a07" strokeWidth="1" />
          {/* Contact solder foot at bottom */}
          <path d="M 104 372 L 136 372 L 126 385 L 114 385 Z" fill="#1c1917" stroke="#44403c" strokeWidth="1" />
          {/* Top brass rim collar */}
          <rect x="90" y="335" width="60" height="6" rx="2" fill={socketColors.top} />
        </g>

        {/* 2. Glass Envelope Body */}
        {renderGlassPath()}

        {/* 3. Internal Glow Core */}
        {isOn && effectiveBrightness > 0 && (
          <ellipse
            cx="120"
            cy="190"
            rx={shape.includes('Globe') ? 70 : 55}
            ry={shape.includes('Tubular') ? 95 : 75}
            fill="url(#internalGlow)"
            className="pointer-events-none"
          />
        )}

        {/* 4. Filament & Mount Mount Structure */}
        {renderFilament()}

        {/* 5. Curved Glass Highlight Reflections (Adds hyper-realistic 3D curved glass sheen) */}
        <path
          d="M 75 100 C 65 130, 65 180, 80 230"
          stroke="url(#glassReflect)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          opacity={isOn ? 0.45 : 0.6}
        />
        <path
          d="M 165 100 C 175 130, 175 180, 160 230"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity={isOn ? 0.2 : 0.4}
        />
        <ellipse cx="120" cy="65" rx="14" ry="5" fill="#ffffff" opacity={isOn ? 0.25 : 0.4} />

        {/* 6. Realistic Vintage Edison Etched Stamp on Glass */}
        <text
          x="120"
          y="290"
          textAnchor="middle"
          fill={isOn ? 'rgba(255,255,255,0.45)' : 'rgba(155,124,88,0.4)'}
          fontSize="6.5"
          fontFamily="serif"
          letterSpacing="1.2"
        >
          VOLTA 1893 • 2200K
        </text>
      </svg>
    </div>
  );
};

export default InteractiveFilamentBulb;
