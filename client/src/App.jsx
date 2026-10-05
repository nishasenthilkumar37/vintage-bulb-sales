import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sliders, 
  Zap, 
  Flame, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Palette,
  Package
} from 'lucide-react';

import Navbar from './components/Navbar';
import SalesBanner from './components/SalesBanner';
import Hero from './components/Hero';
import BundleSection from './components/BundleSection';
import BulbStudio from './components/BulbStudio';
import RoomSimulator from './components/RoomSimulator';
import ProductCatalog from './components/ProductCatalog';
import ProductDetailModal from './components/ProductDetailModal';
import AnatomySection from './components/AnatomySection';
import ReviewsSection from './components/ReviewsSection';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTrackingModal from './components/OrderTrackingModal';
import Footer from './components/Footer';

import { THEMES, CURRENCIES, ThemeSelector } from './components/ThemeSelector';
import { seedProducts, seedReviews } from '../../server/data/seedData.js';
import { playSwitchSound, playRotaryTick } from './utils/audio';
import { apiFetch } from './utils/api';

export function App() {
  // Theme & Currency State
  const [currentTheme, setCurrentTheme] = useState('theme-obsidian-gold');
  const [currency, setCurrency] = useState(CURRENCIES[0]); // USD default

  // Global Ambiance State
  const [globalBrightness, setGlobalBrightness] = useState(85);
  const [globalIsOn, setGlobalIsOn] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeSection, setActiveSection] = useState('collection');

  // Products & Reviews Data State
  const [products, setProducts] = useState(seedProducts);
  const [reviews, setReviews] = useState(seedReviews);
  const [loading, setLoading] = useState(false);

  // Cart & Modals State
  const [cartItems, setCartItems] = useState([
    {
      ...seedProducts[0],
      _id: 'seed-cart-1',
      quantity: 2
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [cartSummary, setCartSummary] = useState({ subtotal: 0, discount: 0, shipping: 0, total: 0 });
  const [showAmbianceRemote, setShowAmbianceRemote] = useState(false);

  // Fetch initial data from Express API (falls back to bundled seed data if server is loading)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodRes, revRes] = await Promise.all([
          apiFetch('/api/products').catch(() => null),
          apiFetch('/api/reviews').catch(() => null)
        ]);

        if (prodRes && prodRes.ok) {
          const prodData = await prodRes.json();
          if (Array.isArray(prodData) && prodData.length > 0) {
            setProducts(prodData);
          }
        }

        if (revRes && revRes.ok) {
          const revData = await revRes.json();
          if (Array.isArray(revData) && revData.length > 0) {
            setReviews(revData);
          }
        }
      } catch (err) {
        console.warn('Using initial seed data due to API connection status:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Cart handlers
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const pId = product._id || product.id;
      const existing = prevItems.find((item) => (item._id || item.id) === pId);
      if (existing) {
        return prevItems.map((item) =>
          (item._id || item.id) === pId
            ? { ...item, quantity: (item.quantity || 1) + (product.quantity || 1) }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: product.quantity || 1 }];
    });
    setIsCartOpen(true);
  };

  // Instant 1-Click "Buy Now" flow
  const handleDirectBuy = (product) => {
    const pId = product._id || product.id;
    const item = { ...product, quantity: product.quantity || 1 };
    setCartItems([item]);
    
    const subtotal = item.price * (item.quantity || 1);
    const shipping = subtotal >= 50 ? 0 : 7.50;
    setCartSummary({
      subtotal,
      discount: 0,
      shipping,
      total: subtotal + shipping
    });
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => ((item._id || item.id) === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => (item._id || item.id) !== id));
  };

  const handleProceedToCheckout = (summary) => {
    setCartSummary(summary);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
  };

  const handleAddReview = async (newReview) => {
    try {
      const res = await apiFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(newReview)
      });
      if (res.ok) {
        const saved = await res.json();
        setReviews(prev => [saved, ...prev]);
        return;
      }
    } catch (e) {}

    // Fallback local addition
    setReviews(prev => [{ ...newReview, _id: `local_rev_${Date.now()}` }, ...prev]);
  };

  // Compute dynamic page ambient glow based on global brightness & on/off state
  const effectiveGlowOpacity = globalIsOn ? (globalBrightness / 100) : 0.05;

  return (
    <div className={`min-h-screen ${currentTheme} font-sans relative selection:bg-[var(--accent-gold)]/30 selection:text-[var(--accent-light)] transition-colors duration-500`}>
      
      {/* Dynamic Global Volumetric Lighting Atmosphere */}
      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-700 z-0"
        style={{
          background: globalIsOn
            ? `radial-gradient(circle at 50% 15%, var(--accent-glow) 0%, transparent 65%)`
            : '#050505'
        }}
      />

      {/* Subtle Vintage Grid Watermark Pattern */}
      <div className="fixed inset-0 vintage-grid-pattern opacity-30 pointer-events-none z-0" />

      {/* Main Content Layout */}
      <div className="relative z-10">
        
        {/* Top High-Conversion Flash Sale & Announcement Banner */}
        <SalesBanner
          onOpenOrderTracking={() => setIsOrderTrackingOpen(true)}
        />

        {/* Navigation Bar */}
        <Navbar
          globalBrightness={globalBrightness}
          setGlobalBrightness={setGlobalBrightness}
          globalIsOn={globalIsOn}
          setGlobalIsOn={setGlobalIsOn}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          cartCount={cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)}
          onOpenCart={() => setIsCartOpen(true)}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          currentTheme={currentTheme}
          setTheme={setCurrentTheme}
          currency={currency}
          setCurrency={setCurrency}
          onOpenOrderTracking={() => setIsOrderTrackingOpen(true)}
        />

        {/* Hero Showcase Section */}
        <Hero
          brightness={globalBrightness}
          setBrightness={setGlobalBrightness}
          isOn={globalIsOn}
          setIsOn={setGlobalIsOn}
          soundEnabled={soundEnabled}
          currency={currency}
          onExploreClick={() => {
            const el = document.getElementById('collection');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onStudioClick={() => {
            const el = document.getElementById('studio');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Bundle & Save (High-Conversion Starter Sets) */}
        <BundleSection
          onAddToCart={handleAddToCart}
          soundEnabled={soundEnabled}
          currency={currency}
        />

        {/* Product Catalog with Selling Triggers */}
        <ProductCatalog
          products={products}
          loading={loading}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
          onDirectBuy={handleDirectBuy}
          soundEnabled={soundEnabled}
          currency={currency}
        />

        {/* Bulb Studio Customizer */}
        <BulbStudio
          onAddToCart={handleAddToCart}
          onDirectBuy={handleDirectBuy}
          soundEnabled={soundEnabled}
          currency={currency}
        />

        {/* Room Ambiance Simulator */}
        <RoomSimulator
          soundEnabled={soundEnabled}
        />

        {/* Anatomy of Light Craft Section */}
        <AnatomySection />

        {/* Reviews Section */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={handleAddReview}
          soundEnabled={soundEnabled}
        />

        {/* Footer */}
        <Footer soundEnabled={soundEnabled} />

      </div>

      {/* Floating Quick Ambiance Remote & Theme Toggle (Bottom Right Corner) */}
      <div className="fixed bottom-6 right-6 z-40">
        <AnimatePresence>
          {showAmbianceRemote && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="mb-3 p-4 rounded-3xl bg-[var(--bg-card)] border border-[var(--accent-border)] backdrop-blur-xl shadow-2xl w-64 space-y-3 font-mono text-xs"
            >
              <div className="flex items-center justify-between text-[var(--text-secondary)]">
                <span className="font-bold flex items-center gap-1.5 text-[var(--accent-light)]">
                  <Sliders className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  Store Ambiance
                </span>
                <span className="text-[var(--accent-gold)] font-bold">{globalIsOn ? `${globalBrightness}%` : 'OFF'}</span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={globalIsOn ? globalBrightness : 0}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setGlobalBrightness(v);
                  if (!globalIsOn) setGlobalIsOn(true);
                  if (soundEnabled) playRotaryTick();
                }}
                className="w-full vintage-dimmer cursor-pointer"
              />

              <div className="flex gap-2 pt-1 border-t border-[var(--accent-border)]">
                <button
                  onClick={() => {
                    const n = !globalIsOn;
                    setGlobalIsOn(n);
                    if (soundEnabled) playSwitchSound(n);
                  }}
                  className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold border transition-colors cursor-pointer ${
                    globalIsOn ? 'bg-[var(--badge-bg)] text-[var(--badge-text)] border-[var(--accent-gold)]' : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border-[var(--accent-border)]'
                  }`}
                >
                  {globalIsOn ? 'Extinguish' : 'Ignite'}
                </button>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="px-2.5 py-1.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent-border)] text-[var(--text-secondary)] hover:text-[var(--accent-gold)] cursor-pointer"
                  title="Toggle Sound Effects"
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[var(--accent-gold)]" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setShowAmbianceRemote(!showAmbianceRemote)}
          className="p-3.5 rounded-2xl gold-btn-gradient shadow-md hover:shadow-lg flex items-center justify-center border border-white/20 cursor-pointer"
          title="Open Ambiance Remote"
        >
          <Sliders className="w-5 h-5 text-black" />
        </motion.button>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        soundEnabled={soundEnabled}
        currency={currency}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        soundEnabled={soundEnabled}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        cartSummary={cartSummary}
        onOrderSuccess={handleOrderSuccess}
        soundEnabled={soundEnabled}
        currency={currency}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
      />

    </div>
  );
}

export default App;
