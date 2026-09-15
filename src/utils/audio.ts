// Gentle Romantic Music Box Synthesizer & Audio Controller using Web Audio API

let audioCtx: AudioContext | null = null;
let musicBoxTimer: number | null = null;
let isSynthPlaying = false;
let customAudioElement: HTMLAudioElement | null = null;

// Romantic lullaby melody notes (frequencies in Hz)
const MELODY_NOTES = [
  // Sweet gentle romantic chord progression (C - G/B - Am - F)
  523.25, 659.25, 783.99, 1046.50, // C5, E5, G5, C6
  493.88, 587.33, 783.99, 987.77,  // B4, D5, G5, B5
  440.00, 523.25, 659.25, 880.00,  // A4, C5, E5, A5
  349.23, 440.00, 523.25, 698.46,  // F4, A4, C5, F5
  523.25, 659.25, 880.00, 1046.50, // C5, E5, A5, C6
  587.33, 783.99, 987.77, 1174.66, // D5, G5, B5, D6
  523.25, 659.25, 783.99, 1046.50, // C5, E5, G5, C6
  783.99, 659.25, 587.33, 523.25   // G5, E5, D5, C5
];

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play a single sweet music box chime
function playChimeNote(freq: number, timeOffset = 0, volume = 0.08) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Pure sine wave + subtle harmonics for celestial music box feel
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + timeOffset);

    // Envelope: quick attack, long gentle ringing decay
    const now = ctx.currentTime + timeOffset;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.8);
  } catch {
    // AudioContext blocked before user interaction
  }
}

// Start looping the gentle music box
export function startMusicBox() {
  if (isSynthPlaying) return;
  isSynthPlaying = true;
  let noteIndex = 0;

  function step() {
    if (!isSynthPlaying) return;
    const freq = MELODY_NOTES[noteIndex % MELODY_NOTES.length];
    playChimeNote(freq, 0, 0.09);

    // Add gentle bass chime on every 4th note
    if (noteIndex % 4 === 0) {
      playChimeNote(freq / 2, 0.05, 0.06);
    }

    noteIndex++;
    musicBoxTimer = window.setTimeout(step, 420);
  }

  step();
}

export function stopMusicBox() {
  isSynthPlaying = false;
  if (musicBoxTimer !== null) {
    clearTimeout(musicBoxTimer);
    musicBoxTimer = null;
  }
}

// Play a cute squishy bubble pop sound
export function playPopSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch {
    // Ignore if audio not permitted yet
  }
}

// Play celebratory chime chord
export function playCelebrationSound() {
  try {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      playChimeNote(freq, idx * 0.1, 0.12);
    });
  } catch {
    // Ignore
  }
}

// Play pout / sad funny boing sound for "NO"
export function playPoutSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.35);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  } catch {
    // Ignore
  }
}

// HTML5 Custom MP3 audio management
export function initCustomAudio(url: string): HTMLAudioElement {
  if (!customAudioElement) {
    customAudioElement = new Audio();
    customAudioElement.loop = true;
    customAudioElement.volume = 0.45;
  }
  if (customAudioElement.src !== url && url) {
    customAudioElement.src = url;
  }
  return customAudioElement;
}

export function toggleAudio(url?: string, shouldPlay?: boolean): boolean {
  try {
    getAudioContext();
    if (url) {
      const audio = initCustomAudio(url);
      const isCurrentlyPlaying = !audio.paused && audio.currentTime > 0;
      const targetState = shouldPlay !== undefined ? shouldPlay : !isCurrentlyPlaying;

      if (targetState) {
        audio.play().then(() => {
          stopMusicBox();
        }).catch(() => {
          // If external MP3 fails (e.g. CORS or bad link), fallback gracefully to synth
          startMusicBox();
        });
        return true;
      } else {
        audio.pause();
        stopMusicBox();
        return false;
      }
    } else {
      const targetState = shouldPlay !== undefined ? shouldPlay : !isSynthPlaying;
      if (targetState) {
        startMusicBox();
        return true;
      } else {
        stopMusicBox();
        return false;
      }
    }
  } catch {
    return false;
  }
}
