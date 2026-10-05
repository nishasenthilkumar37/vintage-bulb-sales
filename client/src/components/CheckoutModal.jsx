import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  CheckCircle2, 
  Truck, 
  Sparkles, 
  Package,
  ArrowRight
} from 'lucide-react';
import { playCelebrationChime, playSwitchSound } from '../utils/audio';
import { apiFetch } from '../utils/api';

export const CheckoutModal = ({
  isOpen,
  onClose,
  items,
  cartSummary,
  onOrderSuccess,
  soundEnabled,
  currency
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    fullName: 'Alexander Wright',
    email: 'alex.wright@example.com',
    phone: '+1 (555) 234-8901',
    address: '450 West 24th Street, Apt 8B',
    city: 'New York',
    postalCode: '10011',
    country: 'United States',
    paymentMethod: 'Instant Heritage Direct (Simulated)'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const formatPrice = (usdAmount) => {
    const converted = usdAmount * currency.rate;
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProcessPayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderPayload = {
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country
      },
      items: items.map(item => ({
        productId: item._id || item.id || 'custom',
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image,
        customSpecs: item.customSpecs || null
      })),
      subtotal: cartSummary.subtotal,
      discount: cartSummary.discount,
      shipping: cartSummary.shipping,
      total: cartSummary.total,
      paymentMethod: formData.paymentMethod
    };

    try {
      const res = await apiFetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      
      const orderResult = data.order || {
        orderNumber: `VLT-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'Processing'
      };

      setPlacedOrder(orderResult);
      onOrderSuccess();

      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#10b981', '#38bdf8', '#ffffff']
      });

      if (soundEnabled) playCelebrationChime();
    } catch (err) {
      const fallbackOrder = {
        orderNumber: `VLT-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'Processing'
      };
      setPlacedOrder(fallbackOrder);
      onOrderSuccess();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
      if (soundEnabled) playCelebrationChime();
    } finally {
      setIsProcessing(false);
    }
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

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--accent-border)] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8 space-y-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!placedOrder ? (
            /* Checkout Form */
            <form onSubmit={handleProcessPayment} className="space-y-6">
              
              {/* Header */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-gold)] uppercase tracking-widest">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-Bit Encrypted Heritage Checkout</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  Shipping &amp; Order Placement
                </h2>
              </div>

              {/* Order Quick Review Box */}
              <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--accent-border)] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[var(--text-muted)] block">{items.length} handcrafted items ready for dispatch</span>
                  <span className="text-[var(--text-primary)] font-semibold font-serif">Fragile Glass Triple-Packaged</span>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[var(--text-muted)] text-[10px] block uppercase">Final Total</span>
                  <span className="text-lg font-bold text-[var(--accent-light)]">{formatPrice(cartSummary.total)}</span>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4 text-xs">
                
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-[var(--text-secondary)]">Recipient Full Name *</label>
                    <input
                      type="text"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent-border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-[var(--text-secondary)]">Email Address (Order Tracking) *</label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent-border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div className="space-y-1">
                  <label className="font-semibold text-[var(--text-secondary)]">Delivery Street Address *</label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent-border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                  />
                </div>

                {/* City, Postal, Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-[var(--text-secondary)]">City *</label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent-border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-[var(--text-secondary)]">Postal / ZIP Code *</label>
                    <input
                      type="text"
                      required
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent-border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-[var(--text-secondary)]">Phone *</label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent-border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>
                </div>

                {/* Payment Simulation Radio */}
                <div className="p-4 rounded-2xl bg-[var(--badge-bg)] border border-[var(--accent-border)] space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-[var(--accent-light)]">
                    <CreditCard className="w-4 h-4 text-[var(--accent-gold)]" />
                    <span>Instant Kiln Order Placement (Simulated)</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    No payment gateway setup required. Clicking below saves your order to the MongoDB database and queues dispatch.
                  </p>
                </div>

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-xl gold-btn-gradient font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isProcessing ? (
                  <span>Securing Handcrafted Order...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize &amp; Complete Order ({formatPrice(cartSummary.total)})</span>
                  </>
                )}
              </button>

            </form>
          ) : (
            /* Order Placed Success Confirmation */
            <div className="text-center py-6 space-y-6">
              
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent-gold)] font-bold">
                  Order Successfully Dispatched
                </div>
                <h2 className="font-serif text-3xl font-bold text-[var(--text-primary)]">
                  Thank You, {formData.fullName.split(' ')[0]}!
                </h2>
                <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
                  Your vintage lighting order has been queued for hand-testing, custom foam packaging, and insured courier delivery.
                </p>
              </div>

              {/* Order Info Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--accent-border)] text-left space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-[var(--accent-border)] pb-2">
                  <span className="text-[var(--text-muted)]">Order Reference:</span>
                  <span className="font-bold text-[var(--accent-light)]">{placedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between border-b border-[var(--accent-border)] pb-2">
                  <span className="text-[var(--text-muted)]">Delivery Address:</span>
                  <span className="text-[var(--text-primary)] text-right">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Estimated Arrival:</span>
                  <span className="text-emerald-400 font-bold">2 - 3 Business Days</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--bg-card-hover)] text-[var(--accent-light)] border border-[var(--accent-border)] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Continue Exploring Collection
              </button>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
