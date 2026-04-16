// Nature-themed sound effects using Web Audio API
const audioCtx = () => new (window.AudioContext || (window as any).webkitAudioContext)();

let ctx: AudioContext | null = null;
function getCtx() {
  if (!ctx || ctx.state === "closed") ctx = audioCtx();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function playTone(freq: number, duration: number, type: OscillatorType = "sine", vol = 0.15) {
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime);
  gain.gain.setValueAtTime(vol, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  osc.connect(gain).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + duration);
}

// Haptic feedback
function vibrate(pattern: number | number[]) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

// ✨ Word learned - magical chime
export function playLearnedSound() {
  playTone(523, 0.15, "sine", 0.12);
  setTimeout(() => playTone(659, 0.15, "sine", 0.12), 100);
  setTimeout(() => playTone(784, 0.25, "sine", 0.15), 200);
  vibrate(50);
}

// 🔓 Milestone unlocked - triumphant fanfare
export function playUnlockSound() {
  playTone(392, 0.2, "triangle", 0.15);
  setTimeout(() => playTone(523, 0.2, "triangle", 0.15), 150);
  setTimeout(() => playTone(659, 0.2, "triangle", 0.15), 300);
  setTimeout(() => playTone(784, 0.4, "triangle", 0.2), 450);
  vibrate([50, 30, 80]);
}

// 📜 Scroll open - soft whoosh
export function playScrollSound() {
  const c = getCtx();
  const bufferSize = c.sampleRate * 0.3;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
  }
  const source = c.createBufferSource();
  source.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2000, c.currentTime);
  filter.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.3);
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.08, c.currentTime);
  source.connect(filter).connect(gain).connect(c.destination);
  source.start();
}

// 🔥 Bonfire crackle
export function playFireSound() {
  const c = getCtx();
  const bufferSize = c.sampleRate * 0.4;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2) * (Math.random() > 0.95 ? 3 : 1);
  }
  const source = c.createBufferSource();
  source.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 800;
  filter.Q.value = 0.5;
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.06, c.currentTime);
  source.connect(filter).connect(gain).connect(c.destination);
  source.start();
}

// 🎯 Quiz correct
export function playCorrectSound() {
  playTone(523, 0.1, "sine", 0.1);
  setTimeout(() => playTone(784, 0.2, "sine", 0.15), 80);
  vibrate(30);
}

// ❌ Quiz wrong
export function playWrongSound() {
  playTone(200, 0.3, "sawtooth", 0.08);
  vibrate([30, 30, 30]);
}

// 🌿 Nature ambient tap
export function playTapSound() {
  playTone(880, 0.08, "sine", 0.05);
  vibrate(15);
}

// 📖 Story complete
export function playStoryCompleteSound() {
  [392, 440, 523, 659, 784].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.3, "triangle", 0.1), i * 120);
  });
  vibrate([30, 50, 30, 50, 100]);
}

// 🏆 Level up
export function playLevelUpSound() {
  [523, 659, 784, 1047].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.25, "sine", 0.12 + i * 0.02), i * 100);
  });
  vibrate([50, 30, 50, 30, 100]);
}
