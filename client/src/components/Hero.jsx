import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Flame, 
  Sun, 
  ShieldCheck, 
  Sliders, 
  ArrowRight, 
  RotateCw,
  Zap,
  Clock,
  TrendingUp,
  Award
} from 'lucide-react';
import InteractiveFilamentBulb from './InteractiveFilamentBulb';
import { playSwitchSound, playRotaryTick } from '../utils/audio';

export const Hero = ({
  brightness,
  setBrightness,
  isOn,
  setIsOn,
  soundEnabled,
  onExploreClick,
  onStudioClick,
  currency
}) => {
  const [activeFilament, setActiveFilament] = useState('Squirrel Cage');
  const [activeShape, setActiveShape] = useState('ST64 Teardrop');
  const [isPullingChain, setIsPullingChain] = useState(false);

  // Compute live Kelvin and Lumens based on brightness slider
  const liveKelvin = Math.round(1800 + (brightness / 100) * 900);
  const liveLumens = Math.round(40 + (brightness / 100) * 360);

  const handlePullChain = () => {
    setIsPullingChain(true);
    const nextState = !isOn;
    setIsOn(nextState);
    if (soundEnabled) {
      playSwitchSound(nextState);
    }
    setTimeout(() => {
      setIsPullingChain(false);
    }, 400);
  };

  const handleDimmerChange = (e) => {
    const val = Number(e.target.value);
    setBrightness(val);
    if (val > 0 && !isOn) {
      setIsOn(true);
    }
    if (soundEnabled && Math.abs(val - brightness) >= 5) {
      playRotaryTick();
    }
  };

  const filamentOptions = [
    { name: 'Squirrel Cage', icon: '1893' },
    { name: 'Spiral Helix', icon: 'Spiral' },
    { name: 'Quad Loop', icon: 'Quad' },
    { name: 'Heart', icon: 'Heart' },
    { name: 'Hairpin', icon: 'Pin' },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-6 pb-16 px-4 sm:px-6 lg:px-8">
      
      {/* Background Volumetric Light Cone & Particles */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none transition-opacity duration-700"
        style={{ opacity: isOn ? 0.85 : 0.1 }}
      >
        {/* Luminous Light Beam Cone */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[800px] blur-3xl rounded-full"
          style={{
            background: `radial-gradient(ellipse at top, var(--accent-glow) 0%, transparent 75%)`
          }}
        />

        {/* Ambient floating dust particles in the beam */}
        {isOn && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/40 blur-[0.5px]"
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  top: `${Math.random() * 80}%`,
                  left: `${40 + Math.random() * 20}%`,
                  animation: `emberFloat ${5 + Math.random() * 6}s infinite linear`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Brand Manifesto & Interactive Dial */}
        <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
          
          {/* Historical Heritage Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--accent-border)] shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-[var(--accent-gold)] animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--badge-text)]">
              Direct-From-Kiln • 1893 Artisanal Series
            </span>
          </motion.div>

          {/* Luxury Serif Headline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="font-serif text-4xl sm:text-5xl xl:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.12]">
              Luminous Soul. <br />
              <span className="gold-text-gradient font-cinzel">Artisanal Warmth.</span>
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Hand-wound tungsten filaments encased in mouth-blown amber crystal. Engineered with modern 
              flicker-free triac technology for an intimate, golden candle-lit sanctuary.
            </p>
          </motion.div>

          {/* Interactive Stepless Dimmer Console */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-5 sm:p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--accent-border)] backdrop-blur-md shadow-2xl space-y-4 max-w-lg mx-auto lg:mx-0"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[var(--accent-gold)]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  Solid Brass Rotary Dimmer
                </span>
              </div>
              <span className="text-xs font-mono font-semibold text-[var(--accent-light)] bg-[var(--badge-bg)] px-2.5 py-0.5 rounded border border-[var(--accent-border)]">
                {isOn ? `${brightness}% OUTPUT` : 'DISCONNECTED'}
              </span>
            </div>

            {/* Stepless Range Slider */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="100"
                value={isOn ? brightness : 0}
                onChange={handleDimmerChange}
                className="w-full vintage-dimmer cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span>0% Extinguished</span>
                <span>50% Candlelight</span>
                <span>100% Full Ember</span>
              </div>
            </div>

            {/* Live Real-Time Light Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[var(--accent-border)]">
              <div className="text-center p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent-border)]">
                <div className="text-[10px] uppercase text-[var(--text-muted)] font-medium">Color Temp</div>
                <div className="text-sm font-bold font-mono text-[var(--accent-light)]">
                  {isOn && brightness > 0 ? `${liveKelvin}K` : '--'}
                </div>
              </div>
              <div className="text-center p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent-border)]">
                <div className="text-[10px] uppercase text-[var(--text-muted)] font-medium">Luminous Flux</div>
                <div className="text-sm font-bold font-mono text-[var(--accent-light)]">
                  {isOn && brightness > 0 ? `${liveLumens} lm` : '0 lm'}
                </div>
              </div>
              <div className="text-center p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent-border)]">
                <div className="text-[10px] uppercase text-[var(--text-muted)] font-medium">Color Fidelity</div>
                <div className="text-sm font-bold font-mono text-[var(--accent-light)]">CRI 98+</div>
              </div>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 rounded-xl font-bold text-sm gold-btn-gradient shadow-md hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>Shop 1890 Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onStudioClick}
              className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] hover:text-[var(--accent-light)] border border-[var(--accent-border)] hover:border-[var(--accent-gold)] shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>Bulb Customizer Studio</span>
            </button>
          </motion.div>

          {/* Quality Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--accent-border)] text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
              <span className="text-xs">3-Year Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
              <span className="text-xs">25,000h Life</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
              <span className="text-xs">Hand-Blown</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Interactive Hanging Bulb Showcase */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          
          {/* Ceiling Braided Cord */}
          <div className="w-2.5 h-16 bg-gradient-to-b from-[var(--bg-secondary)] via-[#3d2e1e] to-[#715438] rounded-b shadow-md" />
          
          {/* Heavy Machined Brass Canopy */}
          <div className="w-16 h-6 rounded-t-lg bg-gradient-to-r from-brass-light via-brass to-brass-dark border border-amber-300/40 shadow-sm" />

          {/* Master Interactive Filament Bulb Component */}
          <div className="relative group">
            <InteractiveFilamentBulb
              brightness={brightness}
              isOn={isOn}
              kelvin={liveKelvin}
              filamentType={activeFilament}
              shape={activeShape}
              size="lg"
              interactive={true}
              onToggle={handlePullChain}
            />

            {/* Click to Toggle Hint Floating Pill */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[var(--bg-primary)]/90 text-[var(--accent-light)] border border-[var(--accent-border)] text-[11px] font-mono px-3 py-1 rounded-full whitespace-nowrap shadow-md">
              Click bulb or pull chain
            </div>
          </div>

          {/* Interactive Vintage Beaded Brass Pull-Chain */}
          <div className="relative flex flex-col items-center -mt-2">
            <motion.div
              animate={isPullingChain ? { y: [0, 24, 0] } : { y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={handlePullChain}
              className="cursor-pointer group flex flex-col items-center"
              title="Click to pull chain switch"
            >
              {/* Beaded chain links */}
              <div className="flex flex-col items-center space-y-1 py-1">
                {[...Array(7)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-amber-200 to-amber-600 shadow-sm"
                  />
                ))}
              </div>

              {/* Teardrop Brass Pull Weight */}
              <div className="w-3.5 h-7 rounded-b-full rounded-t-sm bg-gradient-to-b from-brass-light via-brass to-brass-dark border border-amber-300/40 shadow-md group-hover:scale-110 transition-transform flex items-center justify-center">
                <div className="w-1 h-2 bg-amber-100/40 rounded-full" />
              </div>
            </motion.div>
          </div>

          {/* Interactive Filament Type Selector Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-[var(--bg-card)] border border-[var(--accent-border)] backdrop-blur-md">
            <span className="text-[11px] font-mono uppercase text-[var(--text-muted)] px-2">Filament Style:</span>
            {filamentOptions.map((f) => (
              <button
                key={f.name}
                onClick={() => setActiveFilament(f.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeFilament === f.name
                    ? 'bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--accent-gold)] shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
