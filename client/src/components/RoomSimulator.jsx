import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  Sliders, 
  Sun, 
  Moon, 
  Coffee, 
  BookOpen, 
  Wine, 
  Home, 
  Sparkles,
  Zap
} from 'lucide-react';
import { playSwitchSound, playRotaryTick } from '../utils/audio';

export const RoomSimulator = ({ soundEnabled }) => {
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(0);
  const [roomBrightness, setRoomBrightness] = useState(75);
  const [roomIsOn, setRoomIsOn] = useState(true);
  const [colorTone, setColorTone] = useState('2200K'); // '1800K', '2200K', '2700K'

  const scenes = [
    {
      id: 'speakeasy',
      title: '1920s Velvet Speakeasy',
      category: 'Hospitality & Bars',
      icon: Wine,
      bgImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=80',
      description: 'Low-lit velvet booths, dark mahogany bar tops, and brass accents that come alive with 2000K amber filament warmth.',
      recommendedBulb: 'The Titan G125 Spiral Helix'
    },
    {
      id: 'cafe',
      title: 'Artisan Coffee Roastery',
      category: 'Commercial Spaces',
      icon: Coffee,
      bgImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80',
      description: 'Exposed brick walls, reclaimed timber counters, and industrial hanging cage pendants creating an inviting creative hub.',
      recommendedBulb: 'The 1893 Edison Squirrel Cage'
    },
    {
      id: 'library',
      title: 'Steampunk Library Study',
      category: 'Residential Nooks',
      icon: BookOpen,
      bgImage: 'https://images.unsplash.com/photo-1507842229456-748981f4bdf9?auto=format&fit=crop&w=1400&q=80',
      description: 'Leather Chesterfield armchairs and towering walnut bookshelves bathed in gentle, non-fatiguing warm reading light.',
      recommendedBulb: 'The Marconi Radio Valve Lamp'
    },
    {
      id: 'loft',
      title: 'Modern Industrial Loft Dining',
      category: 'Dining & Kitchen',
      icon: Home,
      bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
      description: 'A cluster of hanging bare Edison pendants illuminating dinner parties with theatrical warmth and high CRI fidelity.',
      recommendedBulb: 'The G200 Monumental Emperor Globe'
    }
  ];

  const currentScene = scenes[selectedSceneIndex];

  const getToneOverlay = () => {
    if (!roomIsOn || roomBrightness === 0) {
      return 'rgba(5, 4, 3, 0.92)';
    }
    const opacity = 1 - (roomBrightness / 100) * 0.75;
    if (colorTone === '1800K') {
      return `rgba(45, 18, 5, ${opacity})`;
    } else if (colorTone === '2700K') {
      return `rgba(30, 25, 15, ${opacity})`;
    }
    return `rgba(35, 20, 8, ${opacity})`;
  };

  const getGlowColor = () => {
    if (colorTone === '1800K') return 'rgba(255, 120, 20, 0.45)';
    if (colorTone === '2700K') return 'rgba(255, 215, 120, 0.45)';
    return 'rgba(255, 175, 40, 0.45)';
  };

  return (
    <section id="room-simulator" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-vintage-800/80">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive Ambiance Lab</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-vintage-100">
            Illuminate Any Space
          </h2>
          <p className="text-vintage-300 text-sm sm:text-base">
            Test how our handcrafted Edison filaments transform mood and materials across signature interior spaces in real-time.
          </p>
        </div>

        {/* Scene Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {scenes.map((scene, idx) => {
            const Icon = scene.icon;
            const isSelected = selectedSceneIndex === idx;
            return (
              <button
                key={scene.id}
                onClick={() => setSelectedSceneIndex(idx)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-glow-sm'
                    : 'bg-vintage-900/80 border-vintage-800 text-vintage-400 hover:text-vintage-200 hover:bg-vintage-850'
                }`}
              >
                <Icon className="w-4 h-4 text-amber-400" />
                <span>{scene.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage Box */}
        <div className="relative rounded-3xl overflow-hidden border border-vintage-700/80 shadow-2xl h-[480px] sm:h-[540px] flex flex-col justify-between p-6 sm:p-8 group">
          
          {/* Background Room Image with Smooth Transition */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-105 group-hover:scale-100"
            style={{ backgroundImage: `url(${currentScene.bgImage})` }}
          />

          {/* Dynamic Light Dimmer & Tone Overlay Mask */}
          <div 
            className="absolute inset-0 transition-colors duration-500 pointer-events-none"
            style={{ backgroundColor: getToneOverlay() }}
          />

          {/* Center Volumetric Glow Effect */}
          {roomIsOn && roomBrightness > 0 && (
            <div 
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none transition-all duration-500"
              style={{
                background: `radial-gradient(circle, ${getGlowColor()} 0%, transparent 70%)`,
                opacity: (roomBrightness / 100) * 0.9
              }}
            />
          )}

          {/* Top Bar: Scene Info Pill */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <div className="px-4 py-2 rounded-2xl bg-vintage-950/85 backdrop-blur-md border border-vintage-700/70 text-vintage-100 shadow-lg">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 block">
                {currentScene.category}
              </span>
              <span className="text-base font-serif font-bold text-vintage-50">
                {currentScene.title}
              </span>
            </div>

            {/* Recommended Bulb Badge */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-950/80 backdrop-blur-md border border-amber-500/40 text-amber-200 text-xs shadow-glow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Recommended: <strong className="text-amber-100">{currentScene.recommendedBulb}</strong></span>
            </div>
          </div>

          {/* Bottom Interactive Floating Control Console */}
          <div className="relative z-10 max-w-2xl mx-auto w-full p-4 sm:p-5 rounded-2xl bg-vintage-950/90 backdrop-blur-xl border border-vintage-700/80 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between gap-4">
              {/* On / Off Toggle */}
              <button
                onClick={() => {
                  const next = !roomIsOn;
                  setRoomIsOn(next);
                  if (soundEnabled) playSwitchSound(next);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono transition-all border ${
                  roomIsOn 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-glow-sm' 
                    : 'bg-vintage-800 text-vintage-400 border-vintage-700'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{roomIsOn ? 'FIXTURES LIT' : 'LIGHTS OFF'}</span>
              </button>

              {/* Color Temperature Radios */}
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-vintage-900 border border-vintage-800">
                {['1800K (Candle)', '2200K (Amber)', '2700K (Warm)'].map((tone) => {
                  const val = tone.split(' ')[0];
                  const isSel = colorTone === val;
                  return (
                    <button
                      key={val}
                      onClick={() => setColorTone(val)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all ${
                        isSel
                          ? 'bg-amber-500/30 text-amber-300 border border-amber-500/40'
                          : 'text-vintage-400 hover:text-vintage-200'
                      }`}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Range Slider for Room Dimmer */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-vintage-300">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  Room Illumination Intensity
                </span>
                <span className="font-mono text-amber-400 font-bold">{roomIsOn ? `${roomBrightness}%` : '0%'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={roomIsOn ? roomBrightness : 0}
                onChange={(e) => {
                  setRoomBrightness(Number(e.target.value));
                  if (!roomIsOn) setRoomIsOn(true);
                  if (soundEnabled) playRotaryTick();
                }}
                className="w-full vintage-dimmer cursor-pointer"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default RoomSimulator;
