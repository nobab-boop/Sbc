import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Heart, KeyRound, Sparkles } from 'lucide-react';
import { playPopSound } from '../utils/audio';
import RadialFlowerBloom from './RadialFlowerBloom';
import BubuDuduImage from './BubuDuduImage';

// =========================================================================
// 🔒 SECRET PASSWORD CONFIGURATION
// Default secret key (05 06 26 / 0506)
// =========================================================================
export const SECRET_KEY = "0506";

// Editable hint displayed to the user
export const DEFAULT_HINT = "Hint: The day our beautiful story began 💍";

interface Screen3LetterProps {
  title: string;
  greeting: string;
  paragraph1: string;
  paragraph2: string;
  closing: string;
  signature: string;
  secretKey?: string;
  hintText?: string;
  photos?: {
    photo1: string;
    photo2: string;
    photo3: string;
    photo4: string;
  };
  onNext: () => void;
  onOpenCustomize?: () => void;
}

export default function Screen3Letter({
  title,
  greeting,
  paragraph1,
  paragraph2,
  closing,
  signature,
  secretKey = SECRET_KEY,
  hintText = DEFAULT_HINT,
  photos,
  onNext,
}: Screen3LetterProps) {
  const [passwordInput, setPasswordInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isBlooming, setIsBlooming] = useState(false);

  const handleUnlock = () => {
    const rawInput = passwordInput.trim().toLowerCase();
    const cleanInput = rawInput.replace(/[\s\/\-\.]/g, '');
    const cleanTarget = (secretKey || SECRET_KEY).trim().toLowerCase().replace(/[\s\/\-\.]/g, '');

    const isMatch =
      cleanInput === cleanTarget ||
      cleanInput === '0506' ||
      cleanInput === '050626' ||
      cleanInput === '05062026' ||
      rawInput === (secretKey || SECRET_KEY).trim().toLowerCase();

    if (isMatch) {
      // Correct password!
      playPopSound();
      setErrorMessage('');
      setIsBlooming(true);
      setIsUnlocked(true);

      // Trigger optional confetti
      if (typeof window !== 'undefined' && (window as unknown as { confetti?: (opts: unknown) => void }).confetti) {
        (window as unknown as { confetti: (opts: unknown) => void }).confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#FFC6FF'],
        });
      }
    } else {
      // Incorrect password: shake and tease
      setIsShaking(true);
      setErrorMessage("Hehe wrong answer! Think harder, my Prottushona! 🙈");
      setPasswordInput('');
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  return (
    <div className="relative flex flex-col items-center select-none w-full transform-gpu">
      {/* Radial Flower Blooming Canvas (Step A: Triggers on correct password) */}
      {isBlooming && (
        <RadialFlowerBloom onComplete={() => setIsBlooming(false)} />
      )}

      {/* Mascot Graphic on Top (Uses user-uploaded sticker or safe mascot) */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 -mb-2 flex items-center justify-center">
        <BubuDuduImage
          stickerRole="screen3_letter"
          alt="Bubu and Dudu Letter Companion"
          className="w-full h-full"
        />
      </div>

      {/* Main Card Container */}
      <div className="w-full max-w-md relative perspective-[1200px]">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            /* ========================================================= */
            /* 1. INITIAL LOCKED STATE (PASSWORD SCREEN)                */
            /* ========================================================= */
            <motion.div
              key="locked-screen"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full bg-[#FFFDF9] border-[3px] border-dashed border-rose-300/80 rounded-3xl p-5 sm:p-6 shadow-[0_10px_25px_rgba(255,154,162,0.25)] text-center transform-gpu"
            >
              {/* Cute Washi Tape Strip on Top */}
              <div className="washi-tape absolute -top-3.5 left-1/2 -translate-x-1/2 min-w-[170px] sm:min-w-[190px] px-4 h-6 flex items-center justify-center text-[11px] font-bold text-rose-800/80 font-fredoka tracking-wider uppercase shadow-xs whitespace-nowrap z-10">
                ♡ TOP SECRET ♡
              </div>

              {/* Diagonal Corner Washi Tapes */}
              <div className="washi-tape-slant absolute -top-2 -left-3 w-12 h-5 rotate-[-25deg] opacity-70"></div>
              <div className="washi-tape-slant absolute -top-2 -right-3 w-12 h-5 rotate-[25deg] opacity-70"></div>

              {/* Envelope Wax Seal / Lock Graphic */}
              <div className="mt-2 mb-3 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 shadow-md shadow-rose-300/50 border-2 border-white">
                <span className="text-2xl animate-pulse">🔒</span>
              </div>

              {/* Password Title */}
              <h2 className="text-xl sm:text-2xl font-black text-[#d6336c] tracking-wide font-fredoka mb-2 leading-snug [text-shadow:2px_2px_0px_rgba(255,182,193,0.6)]">
                Psst... This letter is password protected! 🔒💌
              </h2>

              {/* Cute Hint Box */}
              <div className="my-3 px-4 py-2.5 bg-rose-50/90 border border-rose-200 rounded-2xl inline-block max-w-[95%]">
                <p className="text-xs sm:text-[13px] font-bold text-[#6b4f4f] font-quicksand leading-relaxed">
                  {hintText}
                </p>
              </div>

              {/* Input Box & Unlock Button */}
              <div className="mt-4 flex flex-col items-center gap-3">
                <div className={`w-full max-w-xs relative ${isShaking ? 'animate-shake' : ''}`}>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleUnlock();
                    }}
                    placeholder="Enter the secret key..."
                    autoComplete="off"
                    className={`w-full px-4 py-3 rounded-2xl bg-white border-2 ${
                      isShaking ? 'border-red-400 bg-red-50/40' : 'border-rose-200 focus:border-rose-400'
                    } text-center font-bold tracking-widest text-base sm:text-lg text-rose-900 placeholder:text-rose-300 focus:outline-none transition-all shadow-inner font-quicksand`}
                  />
                  <KeyRound className="w-4 h-4 text-rose-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Error Teasing Message */}
                {errorMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs sm:text-[13px] font-bold text-[#d6336c] font-fredoka px-2 animate-bounce"
                  >
                    {errorMessage}
                  </motion.p>
                )}

                {/* Cute Unlock Button */}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleUnlock}
                  className="btn-kawaii mt-1 px-7 py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 text-white font-fredoka font-bold text-sm sm:text-base rounded-full shadow-md shadow-rose-300/60 flex items-center justify-center gap-2 cursor-pointer hover:shadow-rose-400/80 transition-shadow uppercase tracking-wider"
                >
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>Unlock My Heart 💖</span>
                </motion.button>
              </div>

              {/* Note below password */}
              <div className="mt-4 pt-3 border-t border-rose-100 text-center text-[11px] text-[#6b4f4f] font-quicksand font-semibold">
                <span>🔐 Only for my special one</span>
              </div>
            </motion.div>
          ) : (
            /* ========================================================= */
            /* 2. UNLOCKED STATE (ENVELOPE UNFOLD & LETTER REVEAL)      */
            /* ========================================================= */
            <motion.div
              key="unlocked-letter"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full bg-[#FFFDF9] border-[3px] border-dashed border-rose-300/80 rounded-3xl p-5 sm:p-6 shadow-[0_10px_25px_rgba(255,154,162,0.25)] text-left overflow-visible transform-gpu"
            >
              {/* Top Washi Tape Strip */}
              <div className="washi-tape absolute -top-3.5 left-1/2 -translate-x-1/2 min-w-[210px] sm:min-w-[230px] px-5 h-6 flex items-center justify-center text-[11px] font-bold text-rose-800/80 font-fredoka tracking-wider uppercase shadow-xs whitespace-nowrap z-10">
                ♡ WITH ALL MY LOVE ♡
              </div>

              {/* Diagonal Corner Washi Tapes */}
              <div className="washi-tape-slant absolute -top-2 -left-3 w-12 h-5 rotate-[-25deg] opacity-70"></div>
              <div className="washi-tape-slant absolute -top-2 -right-3 w-12 h-5 rotate-[25deg] opacity-70"></div>

              {/* Cute Scrapbook Sticker Badges */}
              <div className="flex items-center justify-between gap-1.5 px-1 sm:px-2 pt-1 pb-3 text-lg sm:text-xl select-none">
                <span className="hover:scale-125 transition-transform cursor-pointer flex-shrink-0" title="Sweet Memories 📸">
                  📸
                </span>
                <span className="hover:scale-125 transition-transform cursor-pointer flex-shrink-0" title="Sweetness 🍭">
                  🍭
                </span>
                <span className="text-rose-500 font-bold text-[11px] sm:text-xs uppercase tracking-wider bg-rose-50/95 px-3 py-1 rounded-full border border-rose-200 whitespace-nowrap flex-shrink-0 shadow-2xs font-quicksand">
                  ★ Special Delivery ★
                </span>
                <span className="hover:scale-125 transition-transform cursor-pointer flex-shrink-0" title="Sweet Cherries 🍒">
                  🍒
                </span>
                <span className="hover:scale-125 transition-transform cursor-pointer flex-shrink-0" title="Love 💖">
                  💖
                </span>
              </div>

              {/* Letter Title */}
              <div className="text-center my-2">
                <h2 className="text-2xl sm:text-3xl font-black text-[#d6336c] tracking-wide font-fredoka [text-shadow:2px_2px_0px_rgba(255,182,193,0.6)]">
                  {title}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300 rounded-full mx-auto mt-1"></div>
              </div>

              {/* Letter Content with Personal Handwritten Diary Typography ('Gaegu' / 'Itim') */}
              <div className="mt-4 space-y-3 font-gaegu text-[#4a3b32] text-xl sm:text-[1.25rem] leading-[1.7]">
                <p className="font-bold text-[#744253] text-2xl font-fredoka tracking-wide">
                  {greeting}
                </p>

                {/* Section 1: Memories */}
                <div className="bg-rose-50/50 p-4 rounded-2xl border-2 border-dashed border-rose-200/80 shadow-xs">
                  <p className="font-gaegu text-[#4a3b32] text-xl sm:text-[1.25rem] leading-[1.7]">
                    {paragraph1}
                  </p>
                </div>

                {/* Sweet Memory Photo Polaroid */}
                {photos?.photo1 && (
                  <div className="my-2 flex justify-center">
                    <div className="relative bg-white p-2 pb-3.5 rounded-xl shadow-[0_6px_16px_rgba(255,154,162,0.25)] border-2 border-dashed border-rose-300/80 rotate-[-1deg] max-w-[210px] sm:max-w-[240px] transition-transform hover:scale-105 hover:rotate-0">
                      <div className="w-full aspect-4/3 rounded-lg overflow-hidden bg-rose-50 border border-rose-100 flex items-center justify-center">
                        <img
                          src={photos.photo1}
                          alt="Our First Date"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'><rect width='160' height='160' fill='%23FFE4E6'/><text x='80' y='80' font-size='36' text-anchor='middle'>🌸</text><text x='80' y='120' font-size='13' font-weight='bold' fill='%23E11D48' text-anchor='middle'>loading soooon 💕</text></svg>";
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="mt-1.5 text-center text-sm font-caveat font-bold text-rose-700 tracking-wider">
                        loading soooon 💕
                      </p>
                    </div>
                  </div>
                )}

                {/* Section 2: Wishes & Love Lines */}
                <div className="bg-amber-50/50 p-4 rounded-2xl border-2 border-dashed border-amber-200/80 shadow-xs">
                  <p className="font-gaegu text-[#4a3b32] text-xl sm:text-[1.25rem] leading-[1.7]">
                    {paragraph2}
                  </p>
                </div>

                {/* Closing & Signature */}
                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <p className="text-base text-[#6b4f4f] font-quicksand font-bold">{closing}</p>
                    <p className="font-caveat text-2xl sm:text-3xl font-bold text-[#d6336c] tracking-wide mt-0.5">
                      {signature}
                    </p>
                  </div>
                  <div className="w-14 h-14 flex items-center justify-center text-3xl pointer-events-none select-none filter drop-shadow-sm">
                    💌🌸
                  </div>
                </div>
              </div>

              {/* Sealed bottom note */}
              <div className="mt-4 pt-3 border-t border-rose-100 text-center text-xs text-[#6b4f4f] font-quicksand font-semibold">
                <span>💌 Sealed with eternal hugs & kisses</span>
              </div>

              {/* Next Surprise Button */}
              <div className="mt-6 flex justify-center">
                <motion.button
                  id="btn-screen3-next"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playPopSound();
                    onNext();
                  }}
                  className="btn-kawaii px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-fredoka font-bold text-sm sm:text-base rounded-full shadow-lg shadow-rose-300/60 flex items-center gap-2 cursor-pointer hover:shadow-rose-400/80 transition-shadow uppercase tracking-wider"
                >
                  <span>Next Surprise</span>
                  <Heart className="w-4 h-4 fill-white" />
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
