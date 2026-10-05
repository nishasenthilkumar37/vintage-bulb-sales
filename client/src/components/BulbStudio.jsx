import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sliders, 
  Sparkles, 
  Check, 
  ShoppingBag, 
  Flame, 
  Sun, 
  Layers, 
  Compass,
  Info,
  Zap,
  CreditCard
} from 'lucide-react';
import InteractiveFilamentBulb from './InteractiveFilamentBulb';
import { playSwitchSound, playRotaryTick } from '../utils/audio';

export const BulbStudio = ({ onAddToCart, onDirectBuy, soundEnabled, currency }) => {
  const [shape, setShape] = useState('ST64 Teardrop');
  const [filament, setFilament] = useState('Squirrel Cage');
  const [glassFinish, setGlassFinish] = useState('Amber Gold');
  const [socketFinish, setSocketFinish] = useState('Brushed Brass');
  const [brightness, setBrightness] = useState(85);
  const [isOn, setIsOn] = useState(true);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  const shapes = [
    { id: 'ST64 Teardrop', label: 'ST64 Edison', desc: 'Historic 1890s classic teardrop', priceModifier: 0 },
    { id: 'G125 Globe', label: 'G125 Grand Globe', desc: 'Oversized statement orb', priceModifier: 14 },
    { id: 'T45 Tubular', label: 'T45 Tubular', desc: 'Slender cylinder for cage pendants', priceModifier: -2 },
    { id: 'Diamond', label: 'Art Deco Diamond', desc: 'Prismatic faceted geometry', priceModifier: 10 },
    { id: 'Radio Tube', label: '1920s Radio Valve', desc: 'Laboratory vacuum valve', priceModifier: 8 },
    { id: 'Candle Flame', label: 'CA35 Flame Tip', desc: 'Dancing bent flame for sconces', priceModifier: -4 }
  ];

  const filaments = [
    { id: 'Squirrel Cage', label: 'Squirrel Cage', desc: '19-loop vertical zig-zag' },
    { id: 'Spiral Helix', label: 'Double Helix', desc: '360° fluid vertical spiral' },
    { id: 'Quad Loop', label: 'Quad Arch Loop', desc: 'Cathedral arch columns' },
    { id: 'Heart', label: 'Artisan Heart', desc: 'Intimate sculpted filament' },
    { id: 'Hairpin', label: 'Minimalist Hairpin', desc: 'Clean dual vertical needles' }
  ];

  const glassTints = [
    { id: 'Amber Gold', label: 'Amber Gold', colorClass: 'bg-amber-500', desc: 'Rich honey warmth 2200K' },
    { id: 'Smoked Titanium', label: 'Smoked Mirror', colorClass: 'bg-stone-700', desc: 'Twilight charcoal sheen' },
    { id: 'Crystal Clear', label: 'Crystal Clear', colorClass: 'bg-sky-100', desc: 'Crisp filament visibility' },
    { id: 'Antique Mercury', label: 'Antique Mercury', colorClass: 'bg-amber-700', desc: 'Mottled celestial patina' }
  ];

  const socketOptions = [
    { id: 'Brushed Brass', label: 'Spun Brass', colorClass: 'from-amber-200 to-amber-700' },
    { id: 'Antique Copper', label: 'Aged Copper', colorClass: 'from-orange-300 to-amber-900' },
    { id: 'Matte Gunmetal', label: 'Industrial Steel', colorClass: 'from-gray-400 to-gray-900' }
  ];

  // Base price calculation
  const basePrice = 28.00;
  const currentShapeObj = shapes.find(s => s.id === shape) || shapes[0];
  const totalPriceUSD = basePrice + currentShapeObj.priceModifier + (glassFinish === 'Smoked Titanium' ? 4 : 0);

  const formatPrice = (usdAmount) => {
    const converted = usdAmount * currency.rate;
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  const getCustomProductPayload = () => ({
    _id: `custom_${Date.now()}`,
    name: `Custom ${shape} (${filament})`,
    subtitle: `${glassFinish} Glass • ${socketFinish}`,
    category: 'Custom Studio',
    price: totalPriceUSD,
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=900&q=80',
    customSpecs: {
      shape,
      filament,
      glassFinish,
      socketFinish
    },
    stock: 99
  });

  const handleAddToCart = () => {
    const customItem = getCustomProductPayload();
    onAddToCart(customItem);
    setIsAddedSuccess(true);
    if (soundEnabled) playSwitchSound(true);
    setTimeout(() => setIsAddedSuccess(false), 2500);
  };

  const handleBuyNow = () => {
    const customItem = getCustomProductPayload();
    if (onDirectBuy) {
      onDirectBuy(customItem);
    } else {
      onAddToCart(customItem);
    }
  };

  return (
    <section id="studio" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[var(--accent-border)]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--accent-border)] text-[var(--badge-text)] text-xs font-semibold uppercase tracking-widest">
            <Sliders className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>Direct Custom Kiln Order</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
            The Custom Bulb Studio
          </h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base">
            Configure your bespoke vintage filament bulb. Select historic glass moulds, filament geometries, and socket metallurgy.
          </p>
        </div>

        {/* Studio Layout: Live 3D Visualizer on Left, Customizer Controls on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visualizer Display Box */}
          <div className="lg:col-span-6 bg-[var(--bg-card)] border border-[var(--accent-border)] rounded-3xl p-8 relative flex flex-col items-center justify-center min-h-[520px] shadow-2xl overflow-hidden group">
            
            {/* Ambient Background Aura */}
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{
                background: isOn 
                  ? `radial-gradient(circle at 50% 50%, var(--accent-glow) 0%, transparent 70%)`
                  : 'none'
              }}
            />

            {/* Spec Tag Top Left */}
            <div className="absolute top-6 left-6 flex flex-col gap-1 z-20">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-gold)] font-bold">
                Spec Blueprint
              </span>
              <span className="text-xs font-semibold text-[var(--text-primary)]">
                {shape} • {filament}
              </span>
            </div>

            {/* Live Master Interactive Bulb */}
            <div className="my-auto py-6">
              <InteractiveFilamentBulb
                brightness={brightness}
                isOn={isOn}
                filamentType={filament}
                shape={shape}
                glassFinish={glassFinish}
                socketFinish={socketFinish}
                size="lg"
                interactive={true}
                onToggle={() => {
                  setIsOn(!isOn);
                  if (soundEnabled) playSwitchSound(!isOn);
                }}
              />
            </div>

            {/* Bottom Dimmer Control Strip */}
            <div className="w-full max-w-sm mt-auto pt-4 border-t border-[var(--accent-border)] flex items-center gap-4 z-20">
              <button
                onClick={() => {
                  setIsOn(!isOn);
                  if (soundEnabled) playSwitchSound(!isOn);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                  isOn ? 'bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--accent-gold)]' : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'
                }`}
              >
                {isOn ? 'ON' : 'OFF'}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isOn ? brightness : 0}
                onChange={(e) => {
                  setBrightness(Number(e.target.value));
                  if (!isOn) setIsOn(true);
                  if (soundEnabled) playRotaryTick();
                }}
                className="w-full vintage-dimmer cursor-pointer"
              />
              <span className="text-xs font-mono text-[var(--accent-light)] shrink-0 w-10 text-right font-bold">
                {isOn ? `${brightness}%` : '0%'}
              </span>
            </div>
          </div>

          {/* Configuration Options Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* 1. Glass Shape Selection */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center justify-between">
                <span>1. Glass Silhouette</span>
                <span className="text-[var(--accent-gold)] text-[11px] font-normal font-mono">{shape}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {shapes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setShape(s.id)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      shape === s.id
                        ? 'bg-[var(--badge-bg)] border-[var(--accent-gold)] shadow-sm text-[var(--text-primary)]'
                        : 'bg-[var(--bg-card)] border-[var(--accent-border)] hover:border-[var(--accent-gold)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <div className="text-xs font-semibold">{s.label}</div>
                    <div className="text-[10px] text-[var(--text-muted)] truncate mt-0.5">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Filament Style Selection */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center justify-between">
                <span>2. Filament Geometry</span>
                <span className="text-[var(--accent-gold)] text-[11px] font-normal font-mono">{filament}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {filaments.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilament(f.id)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      filament === f.id
                        ? 'bg-[var(--badge-bg)] border-[var(--accent-gold)] shadow-sm text-[var(--text-primary)]'
                        : 'bg-[var(--bg-card)] border-[var(--accent-border)] hover:border-[var(--accent-gold)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <div className="text-xs font-semibold">{f.label}</div>
                    <div className="text-[10px] text-[var(--text-muted)] truncate mt-0.5">{f.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Glass Tint & Socket Metal Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Glass Tint */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  3. Glass Tint
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {glassTints.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGlassFinish(g.id)}
                      className={`p-2.5 rounded-xl border flex items-center gap-2 text-left transition-all cursor-pointer ${
                        glassFinish === g.id
                          ? 'bg-[var(--badge-bg)] border-[var(--accent-gold)] text-[var(--text-primary)]'
                          : 'bg-[var(--bg-card)] border-[var(--accent-border)] text-[var(--text-muted)]'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${g.colorClass} border border-white/20`} />
                      <span className="text-xs font-medium truncate">{g.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Socket Metal */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  4. Socket Hardware
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {socketOptions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSocketFinish(s.id)}
                      className={`p-2.5 rounded-xl border flex items-center gap-2 text-left transition-all cursor-pointer ${
                        socketFinish === s.id
                          ? 'bg-[var(--badge-bg)] border-[var(--accent-gold)] text-[var(--text-primary)]'
                          : 'bg-[var(--bg-card)] border-[var(--accent-border)] text-[var(--text-muted)]'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full bg-gradient-to-br ${s.colorClass} border border-white/20`} />
                      <span className="text-xs font-medium truncate">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Pricing & Add to Cart Action Bar */}
            <div className="pt-4 border-t border-[var(--accent-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Custom Build Total</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[var(--accent-light)]">
                  {formatPrice(totalPriceUSD)}
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddedSuccess}
                  className={`flex-1 sm:flex-none px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                    isAddedSuccess 
                      ? 'bg-emerald-600 text-white border-emerald-500' 
                      : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] border-[var(--accent-gold)]'
                  }`}
                >
                  {isAddedSuccess ? 'Added to Cart' : 'Add to Cart'}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 sm:flex-none px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider gold-btn-gradient shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default BulbStudio;
