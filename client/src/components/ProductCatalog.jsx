import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Search, 
  ShoppingBag, 
  Eye, 
  Star, 
  Zap, 
  SlidersHorizontal,
  Flame,
  Check,
  CreditCard,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { playSwitchSound } from '../utils/audio';

export const ProductCatalog = ({
  products,
  loading,
  onSelectProduct,
  onAddToCart,
  onDirectBuy,
  soundEnabled,
  currency
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [activeCardBulbs, setActiveCardBulbs] = useState({});
  const [addedItemIds, setAddedItemIds] = useState({});

  const categories = [
    'All',
    'Edison Classics',
    'Oversized Globes',
    'Spiral & Smoked',
    'Vintage LEDs',
    'Steampunk Fixtures'
  ];

  const formatPrice = (usdAmount) => {
    if (!usdAmount) return '';
    const converted = usdAmount * currency.rate;
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  const handleToggleCardBulb = (e, productId) => {
    e.stopPropagation();
    const nextState = !(activeCardBulbs[productId] !== false);
    setActiveCardBulbs(prev => ({ ...prev, [productId]: nextState }));
    if (soundEnabled) playSwitchSound(nextState);
  };

  const handleAddCart = (e, product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedItemIds(prev => ({ ...prev, [product._id || product.id]: true }));
    if (soundEnabled) playSwitchSound(true);
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [product._id || product.id]: false }));
    }, 1800);
  };

  const handleBuyNow = (e, product) => {
    e.stopPropagation();
    if (onDirectBuy) {
      onDirectBuy(product);
    } else {
      onAddToCart(product);
    }
  };

  // Filter and sort products
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.shape && p.shape.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <section id="collection" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Heading & Trust Metrics */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--accent-border)] pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--accent-border)] text-[var(--badge-text)] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>Direct-From-Kiln Catalog</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
              The Heritage Collection
            </h2>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl">
              Authentic reproductions and modern LED filament innovations. Each bulb is individually blown, laser calibrated, and triple-packaged.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Box */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search filaments, models..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--accent-border)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
              />
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--accent-border)] text-xs font-semibold text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-gold)] cursor-pointer"
              >
                <option value="featured">Featured &amp; Bestsellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <SlidersHorizontal className="w-4 h-4 text-[var(--text-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[var(--badge-bg)] text-[var(--badge-text)] border-[var(--accent-gold)] shadow-sm'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--accent-border)] hover:border-[var(--accent-gold)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-96 rounded-2xl bg-[var(--bg-card)] animate-pulse border border-[var(--accent-border)]" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-[var(--bg-card)] rounded-3xl border border-[var(--accent-border)]">
            <Flame className="w-10 h-10 text-[var(--text-muted)] mx-auto" />
            <h3 className="text-lg font-serif text-[var(--text-primary)]">No bulbs found</h3>
            <p className="text-xs text-[var(--text-muted)]">Try adjusting your search terms or category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => {
              const pId = String(product?._id || product?.id || `prod_${idx}`);
              const isBulbLit = activeCardBulbs[pId] !== false;
              const isRecentlyAdded = !!addedItemIds[pId];

              // Simulated stock left and viewers for high-conversion social proof
              const stockRemaining = Math.max(3, (Number(product?.stock) || 25) % 12);
              const activeViewers = Math.max(5, (pId.length * 3) % 18 + 4);

              return (
                <motion.div
                  key={pId}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => onSelectProduct(product)}
                  className="group relative flex flex-col rounded-3xl bg-[var(--bg-card)] border border-[var(--accent-border)] hover:border-[var(--accent-gold)] overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all"
                >
                  {/* Top Badge (Iconic, Showstopper, etc.) */}
                  {product.badge && (
                    <div className="absolute top-3.5 left-3.5 z-20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-primary)]/90 text-[var(--badge-text)] border border-[var(--accent-border)] backdrop-blur-md shadow-sm">
                      {product.badge}
                    </div>
                  )}

                  {/* On/Off Interactive Card Switch in Top Right */}
                  <button
                    onClick={(e) => handleToggleCardBulb(e, pId)}
                    title={isBulbLit ? "Extinguish Bulb" : "Ignite Bulb"}
                    className={`absolute top-3.5 right-3.5 z-20 p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                      isBulbLit
                        ? 'bg-[var(--badge-bg)] text-[var(--badge-text)] border-[var(--accent-gold)] shadow-sm'
                        : 'bg-[var(--bg-primary)]/80 text-[var(--text-muted)] border-[var(--accent-border)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Zap className={`w-3.5 h-3.5 ${isBulbLit ? 'text-[var(--accent-gold)] animate-pulse' : ''}`} />
                  </button>

                  {/* Product Image Stage with Dynamic Glow Overlay */}
                  <div className="relative h-60 w-full overflow-hidden bg-black/40 flex items-center justify-center p-4">
                    
                    {/* Glowing Filament Ambiance behind image when lit */}
                    <div 
                      className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                        isBulbLit ? 'opacity-100' : 'opacity-10 grayscale'
                      }`}
                      style={{
                        background: 'radial-gradient(circle at 50% 50%, var(--accent-glow) 0%, transparent 70%)'
                      }}
                    />

                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-cover rounded-2xl transition-all duration-700 group-hover:scale-105 ${
                        isBulbLit ? 'brightness-105 contrast-105' : 'brightness-70 contrast-90 filter grayscale-[40%]'
                      }`}
                    />

                    {/* Quick View Floating Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <div className="px-3.5 py-1.5 rounded-xl bg-[var(--bg-primary)]/90 border border-[var(--accent-border)] text-[var(--accent-light)] text-xs font-semibold flex items-center gap-1.5 shadow-md">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View &amp; Specs</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Content Details */}
                  <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-[var(--accent-light)]">
                        <span>{product.shape}</span>
                        <div className="flex items-center gap-1 text-[var(--accent-gold)]">
                          <Star className="w-3 h-3 fill-[var(--accent-gold)] text-[var(--accent-gold)]" />
                          <span>{product.rating} ({product.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-light)] transition-colors line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                        {product.subtitle || product.description}
                      </p>
                    </div>

                    {/* Selling Social Proof & Urgency */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-amber-400 flex items-center gap-1 font-bold">
                          <Flame className="w-3 h-3 text-[var(--accent-gold)]" />
                          Only {stockRemaining} in stock
                        </span>
                        <span className="text-[var(--text-muted)]">
                          {activeViewers} viewing
                        </span>
                      </div>
                      
                      {/* Stock Progress Bar */}
                      <div className="w-full bg-[var(--bg-accent)] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-amber-500 to-red-500 h-full rounded-full" 
                          style={{ width: `${(stockRemaining / 15) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Technical Specs Tags */}
                    <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-[var(--text-secondary)]">
                      <span className="px-2 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--accent-border)]">
                        {product.kelvin}K
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--accent-border)]">
                        {product.wattage}W ({product.equivalentWattage || 40}W Eq)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--accent-border)]">
                        {product.dimmable ? 'Dimmable' : 'Fixed'}
                      </span>
                    </div>

                    {/* Price & E-Commerce Selling Buttons */}
                    <div className="pt-3 border-t border-[var(--accent-border)] space-y-2">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold font-mono text-[var(--accent-light)]">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs font-mono text-[var(--text-muted)] line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        {product.originalPrice && (
                          <span className="text-[10px] font-bold font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">
                            Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </span>
                        )}
                      </div>

                      {/* Selling Action Buttons: Add to Cart + Instant Buy */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={(e) => handleAddCart(e, product)}
                          className={`py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                            isRecentlyAdded
                              ? 'bg-emerald-600 text-white border-emerald-500'
                              : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] border-[var(--accent-border)] hover:border-[var(--accent-gold)]'
                          }`}
                        >
                          {isRecentlyAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5 text-[var(--accent-gold)]" />}
                          <span>{isRecentlyAdded ? 'Added' : 'Cart'}</span>
                        </button>

                        <button
                          onClick={(e) => handleBuyNow(e, product)}
                          className="py-2 px-3 rounded-xl gold-btn-gradient text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Buy Now</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default ProductCatalog;
