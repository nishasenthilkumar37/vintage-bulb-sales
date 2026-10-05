import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, 
  ShoppingBag, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Sparkles, 
  Sliders, 
  Eye, 
  Award,
  Zap,
  Palette,
  Package
} from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';
import { playSwitchSound } from '../utils/audio';

export const Navbar = ({
  globalBrightness,
  setGlobalBrightness,
  globalIsOn,
  setGlobalIsOn,
  soundEnabled,
  setSoundEnabled,
  cartCount,
  onOpenCart,
  activeSection,
  setActiveSection,
  currentTheme,
  setTheme,
  currency,
  setCurrency,
  onOpenOrderTracking
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const handleLightToggle = () => {
    const nextState = !globalIsOn;
    setGlobalIsOn(nextState);
    if (soundEnabled) {
      playSwitchSound(nextState);
    }
  };

  const navLinks = [
    { id: 'collection', label: 'Vintage Bulbs', icon: Lightbulb },
    { id: 'studio', label: 'Bulb Studio', icon: Sliders },
    { id: 'room-simulator', label: 'Ambiance Lab', icon: Eye },
    { id: 'anatomy', label: 'The Craft', icon: Award },
    { id: 'reviews', label: 'Reviews', icon: Sparkles }
  ];

  const scrollTo = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--bg-primary)]/85 border-b border-[var(--accent-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--bg-card)] border border-[var(--accent-border)] shadow-md group-hover:border-[var(--accent-gold)] transition-all">
              <Lightbulb className="w-6 h-6 text-[var(--accent-gold)] group-hover:rotate-12 transition-transform duration-300" />
              {globalIsOn && (
                <div className="absolute inset-0 rounded-xl bg-[var(--accent-gold)]/20 animate-pulse pointer-events-none" />
              )}
            </div>
            <div>
              <div className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-[var(--text-primary)] flex items-center gap-1.5">
                <span>VOLTA</span>
                <span className="text-[var(--accent-gold)] font-serif italic text-lg">&amp;</span>
                <span>CO.</span>
              </div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-[var(--accent-light)] font-medium">
                Est. 1893 • Edison Artisans
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-[var(--accent-light)] bg-[var(--bg-card)] border border-[var(--accent-border)] shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Utilities: Theme Picker, Master Light Switch, Sound, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Color Theme Selector Dropdown Trigger */}
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] border border-[var(--accent-border)] transition-all cursor-pointer shadow-sm"
                title="Change Color Theme & Currency"
              >
                <Palette className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span className="hidden sm:inline">Theme</span>
                <span className="text-[10px] font-mono text-[var(--accent-gold)] font-bold">({currency.code})</span>
              </motion.button>

              {/* Popover Dropdown */}
              <AnimatePresence>
                {isThemeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-12 z-50"
                  >
                    <ThemeSelector
                      currentTheme={currentTheme}
                      setTheme={(th) => {
                        setTheme(th);
                        setIsThemeMenuOpen(false);
                      }}
                      currency={currency}
                      setCurrency={(c) => {
                        setCurrency(c);
                        setIsThemeMenuOpen(false);
                      }}
                      isOpen={isThemeMenuOpen}
                      onClose={() => setIsThemeMenuOpen(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Master Light Switch Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLightToggle}
              title={globalIsOn ? "Turn off room ambiance" : "Turn on room ambiance"}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                globalIsOn 
                  ? 'bg-[var(--badge-bg)] text-[var(--badge-text)] border-[var(--accent-border)] shadow-sm' 
                  : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border-[var(--accent-border)]'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${globalIsOn ? 'text-[var(--accent-gold)] animate-pulse' : 'text-[var(--text-muted)]'}`} />
              <span className="hidden sm:inline">{globalIsOn ? 'LIGHTS ON' : 'LIGHTS OFF'}</span>
            </motion.button>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Mute audio clicks" : "Enable tactile sound effects"}
              className="p-2.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-[var(--accent-gold)] border border-[var(--accent-border)] transition-colors cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[var(--accent-gold)]" />
              ) : (
                <VolumeX className="w-4 h-4 text-[var(--text-muted)]" />
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl gold-btn-gradient shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-black" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[20px] h-[20px] px-1 text-[11px] font-bold text-white bg-red-600 rounded-full shadow-md">
                  {cartCount}
                </span>
              )}
            </motion.button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--accent-border)]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-b border-[var(--accent-border)] bg-[var(--bg-primary)]/95 backdrop-blur-2xl px-4 py-4 space-y-2"
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-gold)] hover:bg-[var(--bg-card)] border border-transparent hover:border-[var(--accent-border)]"
              >
                <Icon className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>{link.label}</span>
              </button>
            );
          })}
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
