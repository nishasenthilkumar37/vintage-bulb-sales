import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ShoppingBag, 
  Check, 
  Flame, 
  ShieldCheck, 
  Zap, 
  Layers, 
  ArrowRight,
  Gift
} from 'lucide-react';
import { playSwitchSound } from '../utils/audio';

export const BundleSection = ({ onAddToCart, soundEnabled, currency }) => {
  const [addedBundleId, setAddedBundleId] = useState(null);

  const formatPrice = (usdAmount) => {
    const converted = usdAmount * currency.rate;
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  const bundles = [
    {
      id: 'bundle-steampunk-trio',
      title: 'The Industrial Steampunk Pendant Set',
      badge: 'Best Value • 25% Off',
      image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=900&q=80',
      description: 'Includes 2x 1893 Squirrel Cage ST64 bulbs, 1x Solid Cast Brass Socket with rotary dimmer, and 3 meters of twisted houndstooth cable.',
      itemsList: [
        '2x The 1893 Edison Squirrel Cage ST64 (2200K)',
        '1x Heavy Solid Cast Brass Socket Fixture',
        '3m Braided Houndstooth Fabric Cable',
        'Complimentary Brass Polishing Cloth'
      ],
      originalPriceUSD: 108.00,
      priceUSD: 79.00,
      savingsUSD: 29.00,
      stockLeft: 5
    },
    {
      id: 'bundle-speakeasy-globes',
      title: 'The Grand Speakeasy Statement Trio',
      badge: 'Architectural Choice • 30% Off',
      image: 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?auto=format&fit=crop&w=900&q=80',
      description: 'An ensemble of monumental smoked amber globes for grand dining tables, kitchen islands, and high-ceiling lofts.',
      itemsList: [
        '2x Titan G125 Smoked Spiral Helix Globes',
        '1x G200 Monumental Emperor Globe',
        '3x Brass Ceiling Rose Support Kits',
        'Triple-Insulated Fragile Packaging'
      ],
      originalPriceUSD: 172.00,
      priceUSD: 118.00,
      savingsUSD: 54.00,
      stockLeft: 3
    },
    {
      id: 'bundle-cafe-sixpack',
      title: 'The Artisanal Cafe & Bistro 6-Pack',
      badge: 'Bulk Trade Saver • 20% Off',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80',
      description: 'The standard choice for commercial cafe sconces, bare-bulb chandeliers, and restaurant atmospheric lighting.',
      itemsList: [
        '6x Victorian Quad-Loop Tubular T45 Bulbs',
        'Universal E26/E27 Triac Dimmable (0-100%)',
        'Matched 2100K Warm Golden Spectrum',
        '3-Year Commercial Replacement Warranty'
      ],
      originalPriceUSD: 132.00,
      priceUSD: 105.00,
      savingsUSD: 27.00,
      stockLeft: 8
    }
  ];

  const handleAddBundle = (bundle) => {
    const bundleProduct = {
      _id: bundle.id,
      name: bundle.title,
      subtitle: bundle.badge,
      category: 'Curated Bundles',
      price: bundle.priceUSD,
      image: bundle.image,
      stock: bundle.stockLeft,
      quantity: 1
    };

    onAddToCart(bundleProduct);
    setAddedBundleId(bundle.id);
    if (soundEnabled) playSwitchSound(true);
    setTimeout(() => setAddedBundleId(null), 2000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-[var(--bg-secondary)]/50 border-t border-[var(--accent-border)]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--accent-border)] text-[var(--badge-text)] text-xs font-semibold uppercase tracking-widest">
            <Gift className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>Curated Illumination Sets</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
            Bundle &amp; Save Up to 30%
          </h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base">
            Complete turnkey sets with matched color temperatures, solid brass hardware, and guaranteed fragile courier transit.
          </p>
        </div>

        {/* Bundle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bundles.map((bundle) => {
            const isAdded = addedBundleId === bundle.id;
            return (
              <motion.div
                key={bundle.id}
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-[var(--bg-card)] border border-[var(--accent-border)] overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[var(--accent-gold)] transition-all"
              >
                <div>
                  {/* Top Image Banner with Badge */}
                  <div className="relative h-56 w-full overflow-hidden bg-black/40">
                    <img
                      src={bundle.image}
                      alt={bundle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-primary)]/90 text-[var(--badge-text)] border border-[var(--accent-border)] shadow-md">
                      {bundle.badge}
                    </div>

                    {/* Stock Urgency Tag */}
                    <div className="absolute bottom-3.5 right-3.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-black/85 text-[var(--accent-light)] border border-[var(--accent-border)] flex items-center gap-1">
                      <Flame className="w-3 h-3 text-[var(--accent-gold)]" />
                      <span>Only {bundle.stockLeft} Sets Left</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-light)] transition-colors">
                        {bundle.title}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                        {bundle.description}
                      </p>
                    </div>

                    {/* Inclusions List */}
                    <div className="space-y-2 pt-2 border-t border-[var(--accent-border)]">
                      <div className="text-[11px] font-mono uppercase text-[var(--accent-gold)] font-semibold">
                        Kit Inclusions:
                      </div>
                      <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                        {bundle.itemsList.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Pricing & Add to Cart */}
                <div className="p-6 pt-0 space-y-4">
                  <div className="flex items-baseline justify-between border-t border-[var(--accent-border)] pt-4">
                    <div>
                      <div className="text-2xl font-bold font-mono text-[var(--accent-light)]">
                        {formatPrice(bundle.priceUSD)}
                      </div>
                      <div className="text-xs font-mono text-[var(--text-muted)] line-through">
                        {formatPrice(bundle.originalPriceUSD)}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800">
                        Save {formatPrice(bundle.savingsUSD)}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAddBundle(bundle)}
                    disabled={isAdded}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'gold-btn-gradient hover:shadow-lg'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Bundle Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Claim Bundle Deal</span>
                      </>
                    )}
                  </motion.button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BundleSection;
