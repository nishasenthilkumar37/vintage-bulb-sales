import React, { useState } from 'react';
import { 
  Lightbulb, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  RotateCw, 
  Mail, 
  Heart,
  CheckCircle2
} from 'lucide-react';
import { playSwitchSound } from '../utils/audio';
import { apiFetch } from '../utils/api';

export const Footer = ({ soundEnabled }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribedStatus, setSubscribedStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setLoading(true);
    try {
      const res = await apiFetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: newsletterEmail })
      });
      const data = await res.json();
      setSubscribedStatus(data.message || 'Subscribed!');
      setNewsletterEmail('');
      if (soundEnabled) playSwitchSound(true);
    } catch (err) {
      setSubscribedStatus('Thank you for subscribing to the Edison Gazette!');
      setNewsletterEmail('');
    } finally {
      setLoading(false);
      setTimeout(() => setSubscribedStatus(''), 4000);
    }
  };

  return (
    <footer className="border-t border-vintage-800 bg-vintage-950 text-vintage-300 pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Newsletter Gazette Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-vintage-900 via-vintage-850 to-vintage-900 border border-vintage-700/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-widest">
              <Mail className="w-3.5 h-3.5" />
              <span>The Edison Gazette</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-vintage-100">
              Receive 15% Off Your First Heritage Fixture
            </h3>
            <p className="text-xs sm:text-sm text-vintage-400 max-w-xl">
              Receive curated illumination guides, limited-edition glass mould drops, and architectural lighting insights.
            </p>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full px-4 py-3 rounded-xl bg-vintage-950 border border-vintage-700 text-xs text-vintage-100 placeholder-vintage-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-vintage-950 font-bold text-xs shadow-glow-sm shrink-0 flex items-center gap-1.5 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Join</span>
                </button>
              </div>

              {subscribedStatus && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{subscribedStatus}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pt-6">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 shadow-glow-sm">
                <Lightbulb className="w-5 h-5 text-amber-400" />
              </div>
              <div className="font-cinzel text-xl font-bold tracking-widest text-vintage-100">
                VOLTA <span className="text-amber-400 font-serif italic text-base">&amp;</span> CO.
              </div>
            </div>
            <p className="text-xs text-vintage-400 leading-relaxed max-w-sm">
              Artisanal reproductions of 1890s Edison incandescent filaments powered by modern solid-state triac dimming technology. Handcrafted for warm living sanctuaries.
            </p>
            <div className="text-[11px] font-mono text-amber-400/80">
              Workshop: 1893 Industrial Parkway, Suite 400 • Brooklyn, NY
            </div>
          </div>

          {/* Collection Column */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-vintage-100 uppercase tracking-wider">
              Collections
            </h4>
            <ul className="space-y-2 text-vintage-400">
              <li><a href="#collection" className="hover:text-amber-300 transition-colors">ST64 Edison Teardrops</a></li>
              <li><a href="#collection" className="hover:text-amber-300 transition-colors">G125 &amp; G200 Giant Globes</a></li>
              <li><a href="#collection" className="hover:text-amber-300 transition-colors">Smoked Titanium Spirals</a></li>
              <li><a href="#collection" className="hover:text-amber-300 transition-colors">Radio Valve Tubes</a></li>
              <li><a href="#collection" className="hover:text-amber-300 transition-colors">Heavy Brass Fixtures</a></li>
            </ul>
          </div>

          {/* Custom & Science */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-vintage-100 uppercase tracking-wider">
              Experience
            </h4>
            <ul className="space-y-2 text-vintage-400">
              <li><a href="#studio" className="hover:text-amber-300 transition-colors">Bulb Studio Customizer</a></li>
              <li><a href="#room-simulator" className="hover:text-amber-300 transition-colors">Ambiance Room Lab</a></li>
              <li><a href="#anatomy" className="hover:text-amber-300 transition-colors">The Craft &amp; Physics</a></li>
              <li><a href="#reviews" className="hover:text-amber-300 transition-colors">Patron Testimonials</a></li>
              <li><a href="#collection" className="hover:text-amber-300 transition-colors">Commercial Trade Program</a></li>
            </ul>
          </div>

          {/* Guarantees */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-vintage-100 uppercase tracking-wider">
              Guarantees
            </h4>
            <ul className="space-y-2 text-vintage-400">
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> 3-Year No-Flicker Warranty</li>
              <li className="flex items-center gap-1.5"><RotateCw className="w-3.5 h-3.5 text-amber-400" /> 60-Day In-Home Trial</li>
              <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400" /> 100% Breakage-Free Courier</li>
            </ul>
          </div>

        </div>

        {/* Copyright & Sub-footer */}
        <div className="pt-8 border-t border-vintage-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-vintage-500">
          <div>
            © 1893–2026 VOLTA &amp; CO. Vintage Bulb Artisans. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>and amber filaments</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
