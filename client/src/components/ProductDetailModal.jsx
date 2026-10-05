import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Sliders, 
  Zap, 
  Flame, 
  Clock, 
  Info,
  Maximize2
} from 'lucide-react';
import InteractiveFilamentBulb from './InteractiveFilamentBulb';
import { playSwitchSound, playRotaryTick } from '../utils/audio';

export const ProductDetailModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  soundEnabled
}) => {
  if (!isOpen || !product) return null;

  const [quantity, setQuantity] = useState(1);
  const [modalBrightness, setModalBrightness] = useState(85);
  const [modalIsOn, setModalIsOn] = useState(true);
  const [viewMode, setViewMode] = useState('simulation'); // 'simulation' or 'photo'
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart({ ...product, quantity });
    setIsAdded(true);
    if (soundEnabled) playSwitchSound(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Dialog Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-vintage-950 border border-vintage-700 rounded-3xl overflow-hidden shadow-2xl z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-vintage-900/80 hover:bg-vintage-800 text-vintage-300 hover:text-vintage-100 border border-vintage-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            
            {/* Left Column: Interactive Stage & 360 Visualizer */}
            <div className="md:col-span-6 bg-gradient-to-b from-vintage-900 to-vintage-950 p-6 sm:p-8 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-vintage-800 relative">
              
              {/* Top Mode Toggle: Simulation vs Photo */}
              <div className="w-full flex items-center justify-between z-20">
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-vintage-950/80 border border-vintage-800">
                  <button
                    onClick={() => setViewMode('simulation')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      viewMode === 'simulation'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-vintage-400 hover:text-vintage-200'
                    }`}
                  >
                    3D Filament
                  </button>
                  <button
                    onClick={() => setViewMode('photo')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      viewMode === 'photo'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-vintage-400 hover:text-vintage-200'
                    }`}
                  >
                    Studio Photo
                  </button>
                </div>

                {product.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Main Visual Display */}
              <div className="my-auto py-6 flex items-center justify-center min-h-[300px]">
                {viewMode === 'simulation' ? (
                  <InteractiveFilamentBulb
                    brightness={modalBrightness}
                    isOn={modalIsOn}
                    kelvin={product.kelvin || 2200}
                    filamentType={product.filamentType || 'Squirrel Cage'}
                    shape={product.shape || 'ST64 Teardrop'}
                    glassFinish={product.glassFinish || 'Amber Gold'}
                    size="lg"
                    interactive={true}
                    onToggle={() => {
                      setModalIsOn(!modalIsOn);
                      if (soundEnabled) playSwitchSound(!modalIsOn);
                    }}
                  />
                ) : (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-72 object-contain rounded-2xl shadow-2xl filter brightness-105"
                  />
                )}
              </div>

              {/* Interactive Dimmer for Modal */}
              <div className="w-full pt-4 border-t border-vintage-800 flex items-center gap-3 z-20">
                <button
                  onClick={() => {
                    setModalIsOn(!modalIsOn);
                    if (soundEnabled) playSwitchSound(!modalIsOn);
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold ${
                    modalIsOn ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-vintage-800 text-vintage-400'
                  }`}
                >
                  {modalIsOn ? 'ON' : 'OFF'}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={modalIsOn ? modalBrightness : 0}
                  onChange={(e) => {
                    setModalBrightness(Number(e.target.value));
                    if (!modalIsOn) setModalIsOn(true);
                    if (soundEnabled) playRotaryTick();
                  }}
                  className="w-full vintage-dimmer"
                />
                <span className="text-xs font-mono text-amber-400 font-bold shrink-0">
                  {modalIsOn ? `${modalBrightness}%` : '0%'}
                </span>
              </div>
            </div>

            {/* Right Column: Specifications & Purchase Actions */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                    {product.category} • {product.shape}
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-vintage-100">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-2 pt-1 text-xs">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-vintage-300 font-medium">
                      {product.rating} ({product.reviewsCount} verified reviews)
                    </span>
                  </div>
                </div>

                <div className="text-2xl font-bold font-mono text-amber-300 flex items-baseline gap-3">
                  <span>${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono text-vintage-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-vintage-300 leading-relaxed">
                  {product.description}
                </p>

                {/* Key Specification Matrix */}
                <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-vintage-900 border border-vintage-800 text-xs font-mono">
                  <div>
                    <span className="text-vintage-500 block text-[10px] uppercase">Base / Socket</span>
                    <span className="text-vintage-200 font-semibold">{product.base || 'E26 / E27 Standard'}</span>
                  </div>
                  <div>
                    <span className="text-vintage-500 block text-[10px] uppercase">Color Temperature</span>
                    <span className="text-amber-300 font-semibold">{product.kelvin}K Amber Glow</span>
                  </div>
                  <div>
                    <span className="text-vintage-500 block text-[10px] uppercase">Power / Equivalent</span>
                    <span className="text-vintage-200 font-semibold">{product.wattage}W ({product.equivalentWattage || 40}W Eq)</span>
                  </div>
                  <div>
                    <span className="text-vintage-500 block text-[10px] uppercase">Color Rendering</span>
                    <span className="text-vintage-200 font-semibold">CRI {product.cri || 97}+ High Fidelity</span>
                  </div>
                </div>

                {/* Bullet Features */}
                {product.features && (
                  <ul className="space-y-1.5 text-xs text-vintage-300">
                    {product.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Quantity & Add to Cart Controls */}
              <div className="pt-4 border-t border-vintage-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-xl bg-vintage-900 border border-vintage-700 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-vintage-800 hover:bg-vintage-700 text-vintage-200 font-bold flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-mono font-bold text-sm text-vintage-100">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-vintage-800 hover:bg-vintage-700 text-vintage-200 font-bold flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAdd}
                    disabled={isAdded}
                    className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm shadow-glow-md flex items-center justify-center gap-2 transition-all ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-vintage-950 hover:shadow-glow-lg'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add {quantity} to Cart (${(product.price * quantity).toFixed(2)})</span>
                      </>
                    )}
                  </motion.button>
                </div>

                <div className="flex items-center justify-center gap-4 text-[11px] text-vintage-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    3-Year Warranty
                  </span>
                  <span>•</span>
                  <span>Free Fragile Shipping on $50+</span>
                </div>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
};

export default ProductDetailModal;
