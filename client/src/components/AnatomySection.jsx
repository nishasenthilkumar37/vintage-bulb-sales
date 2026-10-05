import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Sparkles, 
  Zap, 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle,
  HelpCircle
} from 'lucide-react';
import InteractiveFilamentBulb from './InteractiveFilamentBulb';

export const AnatomySection = () => {
  const [activeHotspot, setActiveHotspot] = useState(1);

  const hotspots = [
    {
      id: 1,
      title: 'Mouth-Blown Soda-Lime Glass',
      tag: 'Envelope Physics',
      description: 'Handcrafted with a subtle natural amber hue infused during molten state. Replicates 19th-century furnace clarity without cheap exterior tint sprays that peel over time.',
      stat: '100% Lead-Free Crystal'
    },
    {
      id: 2,
      title: 'Precision Micro-Filament Matrix',
      tag: 'Light Engine',
      description: 'Ultra-thin flexible sapphire substrate populated with linear micro-LED arrays, encapsulated in golden phosphor resin to radiate true 360-degree candlelight.',
      stat: 'CRI 98+ Natural Spectrum'
    },
    {
      id: 3,
      title: 'Noble Argon Hermetic Seal',
      tag: 'Thermal Dynamics',
      description: 'The glass bulb is completely evacuated and sealed with pure inert argon gas, dissipating thermal energy effortlessly and protecting internal filaments for 25,000+ hours.',
      stat: '25,000 Hours Lifespan'
    },
    {
      id: 4,
      title: 'Solid Spun Brass Screw Base',
      tag: 'Metallurgy',
      description: 'Machined from solid unlacquered brass that naturally patinas with age. Features ceramic insulator base and universal E26 / E27 threading for instant retrofit.',
      stat: 'Universal 110V - 240V'
    }
  ];

  return (
    <section id="anatomy" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-vintage-800/80">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>Master Craftsmanship</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-vintage-100">
            The Anatomy of Vintage Light
          </h2>
          <p className="text-vintage-300 text-sm sm:text-base">
            Where 1890s Edison aesthetics meet aerospace-grade optical engineering.
          </p>
        </div>

        {/* Interactive Anatomy Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Bulb Visual Center with Interactive Hotspot Buttons */}
          <div className="lg:col-span-6 bg-vintage-900/60 rounded-3xl p-8 border border-vintage-700/80 relative flex flex-col items-center justify-center min-h-[460px] shadow-2xl overflow-hidden">
            
            <InteractiveFilamentBulb
              brightness={80}
              isOn={true}
              filamentType="Squirrel Cage"
              shape="ST64 Teardrop"
              size="lg"
              interactive={false}
            />

            {/* Floating Hotspot Markers over the bulb */}
            <button
              onClick={() => setActiveHotspot(1)}
              className={`absolute top-24 left-1/3 p-2 rounded-full border text-xs font-bold font-mono transition-all shadow-glow-sm ${
                activeHotspot === 1 
                  ? 'bg-amber-400 text-vintage-950 border-white scale-125' 
                  : 'bg-vintage-950/90 text-amber-300 border-amber-500/50 hover:scale-110'
              }`}
            >
              1
            </button>

            <button
              onClick={() => setActiveHotspot(2)}
              className={`absolute top-48 left-1/2 -translate-x-1/2 p-2 rounded-full border text-xs font-bold font-mono transition-all shadow-glow-sm ${
                activeHotspot === 2 
                  ? 'bg-amber-400 text-vintage-950 border-white scale-125' 
                  : 'bg-vintage-950/90 text-amber-300 border-amber-500/50 hover:scale-110'
              }`}
            >
              2
            </button>

            <button
              onClick={() => setActiveHotspot(3)}
              className={`absolute top-64 right-1/3 p-2 rounded-full border text-xs font-bold font-mono transition-all shadow-glow-sm ${
                activeHotspot === 3 
                  ? 'bg-amber-400 text-vintage-950 border-white scale-125' 
                  : 'bg-vintage-950/90 text-amber-300 border-amber-500/50 hover:scale-110'
              }`}
            >
              3
            </button>

            <button
              onClick={() => setActiveHotspot(4)}
              className={`absolute bottom-16 left-1/2 -translate-x-1/2 p-2 rounded-full border text-xs font-bold font-mono transition-all shadow-glow-sm ${
                activeHotspot === 4 
                  ? 'bg-amber-400 text-vintage-950 border-white scale-125' 
                  : 'bg-vintage-950/90 text-amber-300 border-amber-500/50 hover:scale-110'
              }`}
            >
              4
            </button>

          </div>

          {/* Hotspot Explanations List */}
          <div className="lg:col-span-6 space-y-4">
            {hotspots.map((spot) => {
              const isSelected = activeHotspot === spot.id;
              return (
                <div
                  key={spot.id}
                  onClick={() => setActiveHotspot(spot.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-vintage-850 border-amber-500/60 shadow-glow-sm scale-[1.02]'
                      : 'bg-vintage-900/50 border-vintage-800 hover:border-vintage-700 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                        isSelected ? 'bg-amber-400 text-vintage-950' : 'bg-vintage-800 text-vintage-300'
                      }`}>
                        {spot.id}
                      </span>
                      <h3 className="font-serif font-bold text-base text-vintage-100">
                        {spot.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {spot.stat}
                    </span>
                  </div>

                  <p className="text-xs text-vintage-300 pl-9 leading-relaxed mt-2">
                    {spot.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Technology Comparison Matrix Table */}
        <div className="bg-vintage-900/70 border border-vintage-700/80 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <h3 className="font-serif text-2xl font-bold text-vintage-100">
              How VOLTA Vintage Compares
            </h3>
            <p className="text-xs text-vintage-400">
              Why our hybrid vintage LED filaments outperform both 1890s power-hungry originals and cheap modern white LEDs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-vintage-700 text-vintage-400">
                  <th className="py-3 px-4 uppercase">Feature / Parameter</th>
                  <th className="py-3 px-4 uppercase text-amber-300 bg-amber-500/10 rounded-t-lg">VOLTA Heritage Filament</th>
                  <th className="py-3 px-4 uppercase">1890 Incandescent</th>
                  <th className="py-3 px-4 uppercase">Standard Plastic LED</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-vintage-800/80 text-vintage-200">
                <tr>
                  <td className="py-3 px-4 font-sans font-medium text-vintage-300">Energy Consumption</td>
                  <td className="py-3 px-4 font-bold text-amber-300 bg-amber-500/5">4.5 Watts (90% Savings)</td>
                  <td className="py-3 px-4 text-vintage-400">60.0 Watts</td>
                  <td className="py-3 px-4 text-vintage-400">9.0 Watts</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-medium text-vintage-300">Color Spectrum Fidelity</td>
                  <td className="py-3 px-4 font-bold text-amber-300 bg-amber-500/5">CRI 98+ (Living Fire)</td>
                  <td className="py-3 px-4 text-vintage-300">CRI 99</td>
                  <td className="py-3 px-4 text-vintage-500">CRI 75-80 (Harsh/Cold)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-medium text-vintage-300">Triac Stepless Dimming</td>
                  <td className="py-3 px-4 font-bold text-amber-300 bg-amber-500/5">0% - 100% Smooth (Zero Hum)</td>
                  <td className="py-3 px-4 text-vintage-300">0% - 100% (High Heat)</td>
                  <td className="py-3 px-4 text-red-400/80">Steppy / Flickering</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-medium text-vintage-300">Lifespan Rating</td>
                  <td className="py-3 px-4 font-bold text-amber-300 bg-amber-500/5">25,000 Hours (12+ Years)</td>
                  <td className="py-3 px-4 text-vintage-400">1,200 Hours</td>
                  <td className="py-3 px-4 text-vintage-400">15,000 Hours</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AnatomySection;
