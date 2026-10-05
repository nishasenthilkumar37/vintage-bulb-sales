import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Search, 
  Package, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Flame, 
  Clock,
  Sparkles
} from 'lucide-react';

export const OrderTrackingModal = ({ isOpen, onClose }) => {
  const [orderQuery, setOrderQuery] = useState('VLT-749210');
  const [trackedOrder, setTrackedOrder] = useState({
    orderNumber: 'VLT-749210',
    status: 'In Transit',
    customerName: 'Alexander Wright',
    itemsCount: 3,
    carrier: 'Insured Fragile Express',
    trackingCode: 'FE-84920491-US',
    estDelivery: 'Tomorrow by 4:00 PM',
    destination: 'New York, NY 10011',
    steps: [
      { title: 'Order Placed & Specifications Verified', date: 'Oct 04, 10:14 AM', completed: true },
      { title: 'Filaments Handcrafted & Tested (CRI 98+)', date: 'Oct 04, 02:30 PM', completed: true },
      { title: 'Custom Foam Molded & Triple Packaged', date: 'Oct 05, 08:45 AM', completed: true },
      { title: 'In Transit with Fragile Courier Carrier', date: 'Oct 05, 11:20 AM', completed: true, active: true },
      { title: 'Out for Final White-Glove Delivery', date: 'Pending', completed: false }
    ]
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setTrackedOrder({
        orderNumber: orderQuery.toUpperCase().startsWith('VLT-') ? orderQuery.toUpperCase() : `VLT-${orderQuery}`,
        status: 'In Transit',
        customerName: 'Verified Patron',
        itemsCount: 2,
        carrier: 'Fragile Heritage Courier',
        trackingCode: `HC-${Math.floor(10000000 + Math.random() * 90000000)}`,
        estDelivery: 'In 2 Business Days',
        destination: 'United States',
        steps: [
          { title: 'Order Placed & Specifications Verified', date: 'Today, 09:30 AM', completed: true },
          { title: 'Filaments Handcrafted & Tested', date: 'Today, 11:15 AM', completed: true },
          { title: 'Custom Foam Packaging Complete', date: 'Today, 01:00 PM', completed: true },
          { title: 'Dispatched via Insured Carrier', date: 'Today, 02:40 PM', completed: true, active: true },
          { title: 'Delivered to Doorstep', date: 'Pending', completed: false }
        ]
      });
      setLoading(false);
    }, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
          className="relative w-full max-w-xl bg-[var(--bg-card)] border border-[var(--accent-border)] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-gold)] uppercase tracking-wider">
              <Package className="w-4 h-4" />
              <span>Real-Time Logistics Tracker</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Track Your Vintage Order
            </h2>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="Enter Order # (e.g. VLT-749210)"
              className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent-border)] text-xs text-[var(--text-primary)] uppercase focus:outline-none focus:border-[var(--accent-gold)]"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl gold-btn-gradient text-xs font-bold shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{loading ? 'Searching...' : 'Track'}</span>
            </button>
          </form>

          {/* Order Status Card */}
          {trackedOrder && (
            <div className="space-y-5">
              {/* Key Summary Box */}
              <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--accent-border)] grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-[var(--text-muted)] text-[10px] uppercase block">Order Reference</span>
                  <span className="font-bold text-[var(--accent-light)]">{trackedOrder.orderNumber}</span>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] text-[10px] uppercase block">Status</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {trackedOrder.status}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] text-[10px] uppercase block">Estimated Delivery</span>
                  <span className="text-[var(--text-primary)] font-semibold">{trackedOrder.estDelivery}</span>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] text-[10px] uppercase block">Carrier</span>
                  <span className="text-[var(--text-primary)] font-semibold">{trackedOrder.carrier}</span>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-serif font-bold text-[var(--text-primary)]">
                  Fulfillment &amp; Courier Timeline
                </div>

                <div className="space-y-4 pl-2 border-l-2 border-[var(--accent-border)] ml-3">
                  {trackedOrder.steps.map((step, idx) => (
                    <div key={idx} className="relative pl-6">
                      <div 
                        className={`absolute -left-[19px] top-0.5 w-3.5 h-3.5 rounded-full border-2 ${
                          step.completed
                            ? 'bg-[var(--accent-gold)] border-[var(--bg-card)]'
                            : 'bg-[var(--bg-secondary)] border-[var(--accent-border)]'
                        }`}
                      />
                      <div className="text-xs font-medium text-[var(--text-primary)]">
                        {step.title}
                      </div>
                      <div className="text-[10px] font-mono text-[var(--text-muted)]">
                        {step.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="p-3.5 rounded-xl bg-[var(--badge-bg)] text-[var(--badge-text)] text-xs flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
            <span>Fragile Glass Guarantee: Full instant replacement if damaged during transit.</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OrderTrackingModal;
