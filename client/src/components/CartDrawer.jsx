import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Gift, 
  Tag
} from 'lucide-react';
import { playSwitchSound } from '../utils/audio';

export const CartDrawer = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  soundEnabled,
  currency
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  if (!isOpen) return null;

  const formatPrice = (usdAmount) => {
    const converted = usdAmount * currency.rate;
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  const subtotalUSD = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const discountAmountUSD = subtotalUSD * couponDiscount;
  const shippingUSD = subtotalUSD >= 50 || subtotalUSD === 0 ? 0 : 7.50;
  const totalUSD = Math.max(0, subtotalUSD - discountAmountUSD + shippingUSD);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'VINTAGE1893' || couponCode.trim().toUpperCase() === 'EDISON15') {
      setCouponDiscount(0.15); // 15% off
      setCouponApplied(true);
      setCouponError('');
      if (soundEnabled) playSwitchSound(true);
    } else {
      setCouponError('Invalid promo code. Try "VINTAGE1893" for 15% off');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-md bg-[var(--bg-card)] border-l border-[var(--accent-border)] shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-[var(--accent-border)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[var(--badge-bg)] border border-[var(--accent-border)] text-[var(--accent-gold)]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-[var(--text-primary)]">
                    Artisan Cart
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    {items.length} {items.length === 1 ? 'unique item' : 'unique items'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping / Free Perk Progress Bar */}
            <div className="px-6 py-3 bg-[var(--bg-secondary)] border-b border-[var(--accent-border)] text-xs text-[var(--text-secondary)] flex items-center justify-between">
              {subtotalUSD >= 50 ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Unlocked: FREE Insured Fragile Shipping!
                </span>
              ) : (
                <span>
                  Add <strong>{formatPrice(50 - subtotalUSD)}</strong> more for Free Shipping
                </span>
              )}
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <ShoppingBag className="w-12 h-12 text-[var(--text-muted)] mx-auto" />
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg text-[var(--text-primary)]">Your cart is empty</h3>
                    <p className="text-xs text-[var(--text-muted)]">Explore our hand-spun filament lamps &amp; fixtures.</p>
                  </div>
                </div>
              ) : (
                items.map((item) => {
                  const itemId = item._id || item.id;
                  return (
                    <div
                      key={itemId}
                      className="flex gap-4 p-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--accent-border)] items-center"
                    >
                      {/* Thumbnail */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl bg-black border border-[var(--accent-border)]"
                      />

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-sm text-[var(--text-primary)] truncate">
                          {item.name}
                        </h4>
                        <div className="text-[11px] text-[var(--text-muted)] truncate">
                          {item.subtitle || `${item.shape || 'ST64'} • ${item.kelvin || 2200}K`}
                        </div>
                        <div className="text-xs font-mono font-bold text-[var(--accent-light)] mt-1">
                          {formatPrice(item.price * (item.quantity || 1))}
                        </div>
                      </div>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-1 bg-[var(--bg-card)] border border-[var(--accent-border)] rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(itemId, (item.quantity || 1) - 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-[var(--text-secondary)] hover:text-white cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-mono text-[var(--text-primary)]">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(itemId, (item.quantity || 1) + 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-[var(--text-secondary)] hover:text-white cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => onRemoveItem(itemId)}
                        className="p-2 text-[var(--text-muted)] hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              )}

              {/* Complimentary gift perk if subtotal > $40 */}
              {subtotalUSD >= 40 && (
                <div className="p-3.5 rounded-xl bg-[var(--badge-bg)] border border-[var(--accent-border)] flex items-center gap-3 text-xs text-[var(--badge-text)]">
                  <Gift className="w-5 h-5 text-[var(--accent-gold)] shrink-0" />
                  <div>
                    <div className="font-bold">Complimentary Gift Included</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">Microfiber Brass Polishing Cloth &amp; Cotton Glove</div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[var(--accent-border)] space-y-4 bg-[var(--bg-secondary)]">
                
                {/* Coupon Code Form */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Promo (use VINTAGE1893)"
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--accent-border)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] uppercase focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-xs font-semibold text-[var(--accent-light)] border border-[var(--accent-border)] cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {couponError && (
                  <div className="text-[11px] text-red-400">{couponError}</div>
                )}
                {couponApplied && (
                  <div className="text-[11px] text-emerald-400 font-semibold">
                    ✓ 15% Heritage Discount Applied!
                  </div>
                )}

                {/* Subtotal lines */}
                <div className="space-y-1.5 text-xs text-[var(--text-secondary)] font-mono">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotalUSD)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount (15%)</span>
                      <span>-{formatPrice(discountAmountUSD)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Fragile Shipping</span>
                    <span>{shippingUSD === 0 ? 'FREE' : formatPrice(shippingUSD)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[var(--text-primary)] pt-2 border-t border-[var(--accent-border)]">
                    <span className="font-sans">Total</span>
                    <span className="text-[var(--accent-light)]">{formatPrice(totalUSD)}</span>
                  </div>
                </div>

                {/* Proceed to Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onProceedToCheckout({
                      subtotal: subtotalUSD,
                      discount: discountAmountUSD,
                      shipping: shippingUSD,
                      total: totalUSD
                    });
                  }}
                  className="w-full py-3.5 rounded-xl gold-btn-gradient font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default CartDrawer;
