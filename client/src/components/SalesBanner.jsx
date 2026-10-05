import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Sparkles, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Tag, 
  Package, 
  Percent,
  Search
} from 'lucide-react';

export const SalesBanner = ({ onOpenOrderTracking }) => {
  // Live Countdown Timer (Simulates a limited kiln firing batch ending soon)
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 38,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[var(--bg-secondary)] border-b border-[var(--accent-border)] text-xs text-[var(--text-secondary)] py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        
        {/* Left: Kiln Batch Flash Sale Urgency with Live Timer */}
        <div className="flex items-center gap-2 font-medium">
          <span className="flex h-2 w-2 rounded-full bg-[var(--accent-gold)] animate-ping" />
          <span className="text-[var(--accent-light)] font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            Limited Batch Sale:
          </span>
          <span className="text-[var(--text-primary)] font-mono font-bold bg-[var(--bg-accent)] px-2 py-0.5 rounded border border-[var(--accent-border)]">
            {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
          </span>
          <span className="hidden md:inline text-[var(--text-muted)] text-[11px]">
            — Only 8 Hand-Spun Bulbs remaining in today's batch
          </span>
        </div>

        {/* Center: Promo Code Badge */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] font-mono font-bold text-[11px] border border-[var(--accent-border)] flex items-center gap-1">
            <Tag className="w-3 h-3" />
            Use Code: VINTAGE1893 (15% OFF)
          </span>
        </div>

        {/* Right: Free Shipping & Order Tracking Trigger */}
        <div className="flex items-center gap-4 text-[11px]">
          <div className="hidden sm:flex items-center gap-1.5 text-[var(--text-secondary)]">
            <Truck className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>Free Fragile Shipping on $50+</span>
          </div>

          <button
            onClick={onOpenOrderTracking}
            className="flex items-center gap-1 text-[var(--accent-light)] hover:text-[var(--text-primary)] font-semibold transition-colors underline underline-offset-2"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Track Order</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default SalesBanner;
