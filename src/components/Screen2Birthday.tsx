import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, PartyPopper } from 'lucide-react';
import { GIF_URLS } from '../data/defaults';
import { triggerBirthdayConfetti } from '../utils/confetti';
import { playCelebrationSound, playPopSound } from '../utils/audio';
import BubuDuduImage from './BubuDuduImage';

interface Screen2BirthdayProps {
  birthdayWish: string;
  recipientName: string;
  onNext: () => void;
}

export default function Screen2Birthday({
  birthdayWish,
  recipientName,
  onNext,
}: Screen2BirthdayProps) {
  useEffect(() => {
    // Automatically trigger confetti and celebratory chime on arrival
    triggerBirthdayConfetti();
    playCelebrationSound();

    const secondTimer = setTimeout(() => {
      triggerBirthdayConfetti();
    }, 900);

    return () => clearTimeout(secondTimer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -15 }}
      transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex flex-col items-center text-center select-none relative pb-10"
    >
      {/* Title */}
      <div className="space-y-1 mb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100/80 text-rose-700 rounded-full text-xs font-bold tracking-wider uppercase mb-1 font-quicksand">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          Special Day for {recipientName}
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#d6336c] font-fredoka tracking-wide flex items-center justify-center gap-2 [text-shadow:2px_2px_0px_rgba(255,182,193,0.6)]">
          HAPPY BIRTHDAY 🎉🎂
        </h1>
      </div>

      {/* Cute Birthday Cake Graphic */}
      <div className="relative w-52 h-52 sm:w-60 sm:h-60 my-2 flex items-center justify-center">
        <div className="absolute inset-0 bg-pink-100/70 rounded-full filter blur-xl -z-10"></div>
        <BubuDuduImage
          type="birthday"
          gifUrl={GIF_URLS.birthday}
          alt="Bubu and Dudu Birthday Celebration Cake"
          className="w-full h-full"
        />
      </div>

      {/* Subtext */}
      <div className="space-y-2 mb-4">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl sm:text-3xl font-bold text-[#744253] font-fredoka tracking-tight"
        >
          {birthdayWish}
        </motion.div>
        <p className="text-xs sm:text-sm text-[#6b4f4f] font-quicksand font-semibold">
          (No returns, no exchanges, free cuddles forever! 🧸✨)
        </p>
      </div>

      {/* More Confetti playful button */}
      <button
        onClick={() => {
          playPopSound();
          triggerBirthdayConfetti();
        }}
        className="btn-kawaii text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors mb-2 font-fredoka uppercase tracking-wider"
      >
        <PartyPopper className="w-3.5 h-3.5 text-rose-500" /> More Confetti! 🎊
      </button>

      {/* Cute floating stamp/flower design at bottom right */}
      <motion.button
        id="btn-screen2-next"
        whileHover={{ scale: 1.15, rotate: 8 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => {
          playPopSound();
          onNext();
        }}
        className="btn-kawaii absolute -right-3 -bottom-4 sm:-right-5 sm:-bottom-5 w-20 h-20 rounded-full bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200 border-4 border-dashed border-rose-400 text-rose-700 font-fredoka font-bold text-xs flex flex-col items-center justify-center shadow-lg shadow-rose-300/60 cursor-pointer z-30 group"
      >
        <span className="text-base group-hover:scale-125 transition-transform">🌸</span>
        <span className="tracking-wide uppercase text-[11px] font-bold leading-tight mt-0.5">
          Click<br />Me ✨
        </span>
      </motion.button>
    </motion.div>
  );
}
