import { motion } from 'motion/react';
import { GIF_URLS } from '../data/defaults';
import { playPopSound } from '../utils/audio';
import BubuDuduImage from './BubuDuduImage';

interface Screen1OopsProps {
  onTryAgain: () => void;
}

export default function Screen1Oops({ onTryAgain }: Screen1OopsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col items-center text-center select-none"
    >
      <div className="inline-block relative">
        <h2 className="text-2xl sm:text-3xl font-black text-[#d6336c] font-fredoka leading-snug tracking-wide [text-shadow:2px_2px_0px_rgba(255,182,193,0.6)]">
          Why did u click no!? 🥺
        </h2>
        <span className="absolute -top-3 -right-3 text-2xl animate-bounce">
          💢
        </span>
      </div>

      {/* Angry/Pouting Bear Graphic */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 my-3 flex items-center justify-center">
        <div className="absolute inset-0 bg-red-100/70 rounded-full filter blur-xl -z-10 scale-90"></div>
        <BubuDuduImage
          type="pouting"
          gifUrl={GIF_URLS.oops}
          alt="Angry pouting Bear"
          className="w-full h-full"
        />
      </div>

      <div className="max-w-xs bg-rose-50/90 border-2 border-dashed border-rose-300 px-4 py-3 rounded-2xl mb-6 shadow-[0_4px_12px_rgba(255,154,162,0.2)]">
        <p className="text-xs sm:text-sm font-semibold text-[#6b4f4f] font-quicksand leading-relaxed">
          Bear is very upset and pouting! 😤 <br />
          You weren't supposed to say no to your favorite gift!
        </p>
      </div>

      <motion.button
        id="btn-try-again"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playPopSound();
          onTryAgain();
        }}
        className="btn-kawaii px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-fredoka font-bold text-base sm:text-lg rounded-full shadow-lg shadow-rose-300/60 border-2 border-white cursor-pointer hover:shadow-rose-400/80 transition-shadow uppercase tracking-wider"
      >
        TRY AGAIN 💖
      </motion.button>
    </motion.div>
  );
}
