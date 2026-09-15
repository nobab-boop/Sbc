import { useState, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { GIF_URLS } from '../data/defaults';
import { triggerHeartBurst } from '../utils/confetti';
import { playPopSound } from '../utils/audio';
import BubuDuduImage from './BubuDuduImage';

interface Screen4HugProps {
  missYouText: string;
  onNext: () => void;
}

export default function Screen4Hug({ missYouText, onNext }: Screen4HugProps) {
  const [hugCount, setHugCount] = useState(0);
  const [heartsList, setHeartsList] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleSendHug = (e: MouseEvent<HTMLButtonElement>) => {
    playPopSound();
    setHugCount((prev) => prev + 1);

    // Trigger visual confetti
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;
    triggerHeartBurst(originX, originY);

    // Floating heart from click
    const newHeart = {
      id: Date.now() + Math.random(),
      x: (Math.random() - 0.5) * 60,
      y: -30 - Math.random() * 40,
    };
    setHeartsList((prev) => [...prev.slice(-8), newHeart]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -15 }}
      transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex flex-col items-center text-center select-none"
    >
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-black text-[#d6336c] font-fredoka tracking-wide flex items-center justify-center gap-2 [text-shadow:2px_2px_0px_rgba(255,182,193,0.6)]">
        Virtual hug for ya! 🤗💕
      </h1>

      {/* Cute Hugging Graphic */}
      <div className="relative w-52 h-52 sm:w-60 sm:h-60 my-2 flex items-center justify-center">
        <div className="absolute inset-0 bg-rose-100/70 rounded-full filter blur-2xl -z-10 scale-95 animate-pulse"></div>
        <BubuDuduImage
          type="hug"
          gifUrl={GIF_URLS.hug}
          alt="Bubu and Dudu Cozy Hug"
          className="w-full h-full"
        />

        {/* Floating animated click hearts */}
        <AnimatePresence>
          {heartsList.map((h) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 1, scale: 0.6, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1.6, x: h.x, y: h.y }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute text-2xl pointer-events-none"
            >
              💖
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Emotional "I MISS YOU" Heading */}
      <div className="relative inline-block mb-3 px-2">
        <div className="text-3xl sm:text-4xl font-bold text-[#744253] tracking-wide font-fredoka [text-shadow:1px_1px_0px_rgba(255,182,193,0.5)]">
          {missYouText}
        </div>
        <span className="text-xs sm:text-sm font-semibold text-[#6b4f4f] font-quicksand block mt-1">
          (A million miles away or right next door, my heart is always hugging yours)
        </span>
      </div>

      {/* Hug interaction button */}
      <div className="my-2">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleSendHug}
          className="btn-kawaii px-6 py-2.5 bg-rose-100 hover:bg-rose-200 border-2 border-dashed border-rose-300 text-rose-700 font-fredoka font-bold text-xs sm:text-sm rounded-full flex items-center gap-2 cursor-pointer shadow-xs transition-all uppercase tracking-wider"
        >
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
          <span>Tap for Extra Hugs 🫂</span>
        </motion.button>
      </div>

      {/* Hug counter */}
      <div className="px-4 py-1.5 bg-white/90 border border-rose-200 rounded-full shadow-xs text-xs font-bold text-[#6b4f4f] font-quicksand flex items-center gap-1.5 mb-5">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>{hugCount === 0 ? 'Give a tight squeeze!' : `Sent ${hugCount} extra warm hugs! 💕`}</span>
      </div>

      {/* Next Button */}
      <motion.button
        id="btn-screen4-next"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playPopSound();
          onNext();
        }}
        className="btn-kawaii px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-fredoka font-bold text-base rounded-full shadow-lg shadow-rose-300/60 cursor-pointer hover:shadow-rose-400/80 transition-shadow uppercase tracking-wider"
      >
        Next ✨
      </motion.button>
    </motion.div>
  );
}
