import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Check, DollarSign } from 'lucide-react';

export const THEMES = [
  {
    id: 'theme-obsidian-gold',
    name: 'Obsidian & Gold',
    badge: 'Luxury',
    primaryColor: '#f59e0b',
    bgPreview: '#070709',
    accentPreview: '#f59e0b'
  },
  {
    id: 'theme-emerald-brass',
    name: 'Emerald & Brass',
    badge: 'Heritage',
    primaryColor: '#10b981',
    bgPreview: '#040d09',
    accentPreview: '#10b981'
  },
  {
    id: 'theme-sapphire-platinum',
    name: 'Sapphire & Tungsten',
    badge: 'Modern',
    primaryColor: '#38bdf8',
    bgPreview: '#050814',
    accentPreview: '#38bdf8'
  },
  {
    id: 'theme-burgundy-copper',
    name: 'Burgundy & Copper',
    badge: 'Speakeasy',
    primaryColor: '#f43f5e',
    bgPreview: '#120609',
    accentPreview: '#f43f5e'
  },
  {
    id: 'theme-espresso',
    name: 'Steampunk Cognac',
    badge: 'Classic',
    primaryColor: '#d97706',
    bgPreview: '#0b0907',
    accentPreview: '#d97706'
  }
];

export const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1.0 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'CAD', symbol: 'CA$', rate: 1.36 },
  { code: 'AUD', symbol: 'AU$', rate: 1.52 },
  { code: 'JPY', symbol: '¥', rate: 154 }
];

export const ThemeSelector = ({
  currentTheme,
  setTheme,
  currency,
  setCurrency,
  isOpen,
  onClose
}) => {
  return (
    <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--accent-border)] shadow-2xl space-y-4 max-w-xs sm:max-w-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--accent-border)] pb-2.5">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[var(--accent-gold)]" />
          <span className="font-serif font-bold text-xs uppercase tracking-wider text-[var(--text-primary)]">
            Storefront Color Theme
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--text-muted)]">5 Palettes</span>
      </div>

      {/* Theme Swatches */}
      <div className="grid grid-cols-1 gap-2">
        {THEMES.map((th) => {
          const isSelected = currentTheme === th.id;
          return (
            <button
              key={th.id}
              onClick={() => setTheme(th.id)}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${
                isSelected
                  ? 'border-[var(--accent-gold)] bg-[var(--bg-card-hover)] shadow-md'
                  : 'border-transparent hover:border-[var(--accent-border)] bg-[var(--bg-secondary)]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {/* Color Dot Previews */}
                <div 
                  className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: th.bgPreview }}
                >
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: th.accentPreview }}
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                    <span>{th.name}</span>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-[var(--badge-bg)] text-[var(--badge-text)]">
                      {th.badge}
                    </span>
                  </div>
                </div>
              </div>

              {isSelected && (
                <Check className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Currency Selector */}
      <div className="pt-2 border-t border-[var(--accent-border)] space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--text-secondary)]">
          <span className="flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-[var(--accent-gold)]" />
            Store Currency
          </span>
          <span className="font-mono text-[var(--accent-gold)]">{currency.code} ({currency.symbol})</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {CURRENCIES.map((curr) => (
            <button
              key={curr.code}
              onClick={() => setCurrency(curr)}
              className={`py-1 px-2 rounded-lg text-xs font-mono font-medium transition-all ${
                currency.code === curr.code
                  ? 'bg-[var(--accent-gold)] text-black font-bold'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {curr.code} {curr.symbol}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ThemeSelector;
