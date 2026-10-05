// Synthesized Audio Effects using the Web Audio API (Zero external audio assets needed)

let audioCtx = null;
let humOsc = null;
let humGain = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playSwitchSound = (turningOn = true) => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Mechanical snap / click sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(turningOn ? 1200 : 800, ctx.currentTime);

    const startTime = ctx.currentTime;
    osc.frequency.setValueAtTime(turningOn ? 280 : 200, startTime);
    osc.frequency.exponentialRampToValueAtTime(turningOn ? 60 : 40, startTime + 0.06);

    gain.gain.setValueAtTime(0.35, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.06);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.06);

    // Warm electrical surge click if turning on
    if (turningOn) {
      setTimeout(() => {
        try {
          const surgeOsc = ctx.createOscillator();
          const surgeGain = ctx.createGain();
          surgeOsc.type = 'sine';
          surgeOsc.frequency.setValueAtTime(110, ctx.currentTime);
          surgeGain.gain.setValueAtTime(0.08, ctx.currentTime);
          surgeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
          surgeOsc.connect(surgeGain);
          surgeGain.connect(ctx.destination);
          surgeOsc.start();
          surgeOsc.stop(ctx.currentTime + 0.12);
        } catch (e) {}
      }, 20);
    }
  } catch (err) {
    // Audio non-critical
  }
};

export const playRotaryTick = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(1600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.015);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.015);
  } catch (err) {}
};

export const playCelebrationChime = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 1.2);
        } catch (e) {}
      }, idx * 120);
    });
  } catch (err) {}
};
