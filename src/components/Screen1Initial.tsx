import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { GIF_URLS } from '../data/defaults';
import { playPopSound, playPoutSound } from '../utils/audio';
import BubuDuduImage from './BubuDuduImage';

interface Screen1InitialProps {
  recipientName?: string;
  onYes: () => void;
  onNo: () => void;
}

export default function Screen1Initial({ recipientName, onYes, onNo }: Screen1InitialProps) {
  const [noAttempts, setNoAttempts] = useState(0);
  const maxAttempts = 5;
  const [fixedPos, setFixedPos] = useState<{ top: number; left: number } | null>(null);
  const yesBtnRef = useRef<HTMLButtonElement | null>(null);
  const noBtnRef = useRef<HTMLButtonElement | null>(null);

  const moveNoButton = (e?: React.MouseEvent | React.TouchEvent) => {
    if (noAttempts < maxAttempts) {
      if (e && 'preventDefault' in e) {
        e.preventDefault();
        e.stopPropagation();
      }
      playPopSound();
      const nextAttempt = noAttempts + 1;
      setNoAttempts(nextAttempt);

      // Viewport safety margins
      const padding = 24;
      const btnW = noBtnRef.current?.offsetWidth || 100;
      const btnH = noBtnRef.current?.offsetHeight || 46;

      const maxW = Math.max(window.innerWidth - btnW - padding, padding);
      const maxH = Math.max(window.innerHeight - btnH - padding, padding);

      const yesRect = yesBtnRef.current?.getBoundingClientRect();

      let targetX = padding;
      let targetY = padding;
      let attempts = 0;

      while (attempts < 30) {
        targetX = Math.floor(Math.random() * (maxW - padding)) + padding;
        targetY = Math.floor(Math.random() * (maxH - padding)) + padding;

        if (yesRect) {
          const overlapX = targetX < yesRect.right + 45 && targetX + btnW > yesRect.left - 45;
          const overlapY = targetY < yesRect.bottom + 45 && targetY + btnH > yesRect.top - 45;
          if (!overlapX || !overlapY) break;
        } else {
          break;
        }
        attempts++;
      }

      setFixedPos({ top: targetY, left: targetX });
    }
  };

  const handleNoClick = (e: React.MouseEvent) => {
    if (noAttempts < maxAttempts) {
      moveNoButton(e);
    } else {
      // 5 attempts completed - allow click!
      playPoutSound();
      onNo();
    }
  };

  // Grow YES button slightly with each attempt to tease her
  const yesScale = 1 + noAttempts * 0.08;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -15 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex flex-col items-center text-center select-none"
    >
      {/* Cute speech bubble header */}
      <div className="relative mb-5 inline-block">
        <h1 className="text-2xl sm:text-3xl font-black text-[#d6336c] font-fredoka leading-snug tracking-wide [text-shadow:2px_2px_0px_rgba(255,182,193,0.6)] px-3">
          I made something special for u{recipientName ? `, ${recipientName}` : ''}! 🥺💖<br className="hidden sm:inline" /> do u wanna see it?
        </h1>
        <div className="absolute -top-3 -right-2 text-rose-400 animate-wiggle text-xl">
          ✨
        </div>
      </div>

      {/* Cute Panda & Bear Graphic */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 my-2 flex items-center justify-center">
        <div className="absolute inset-0 bg-rose-100/60 rounded-full filter blur-xl -z-10 scale-90"></div>
        <BubuDuduImage
          type="curious"
          gifUrl={GIF_URLS.initial}
          alt="Cute Bubu and Dudu asking a question"
          className="w-full h-full"
        />
      </div>

      {noAttempts > 0 && (
        <motion.p
          key={noAttempts}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs sm:text-sm text-[#d6336c] font-quicksand font-bold mb-2 px-3"
        >
          {noAttempts >= maxAttempts
            ? 'Fine... you caught the button! Click it if you dare 😤'
            : noAttempts >= 3
            ? `Runaway count: ${noAttempts}/5! Hehe, you can\'t say no~ Just click YES! 🤭`
            : `Attempt ${noAttempts}/5! Hey! Why are u trying to click no?! 🥺`}
        </motion.p>
      )}

      {/* Buttons container */}
      <div className="relative flex items-center justify-center gap-5 mt-4 min-h-[70px] w-full max-w-xs">
        {/* YES Button (grows bigger with each evade attempt) */}
        <motion.button
          ref={yesBtnRef}
          id="btn-screen1-yes"
          animate={{ scale: yesScale }}
          whileHover={{ scale: yesScale * 1.06 }}
          whileTap={{ scale: yesScale * 0.96 }}
          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          onClick={() => {
            playPopSound();
            onYes();
          }}
          className="btn-kawaii relative px-8 py-3.5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-fredoka font-bold text-base sm:text-lg rounded-full shadow-lg shadow-rose-300/60 border-2 border-white cursor-pointer transition-shadow hover:shadow-rose-400/80 z-20 uppercase tracking-wider"
        >
          YES! 🌸
        </motion.button>

        {/* Playful Runaway NO Button */}
        <motion.button
          ref={noBtnRef}
          id="btn-screen1-no"
          onMouseEnter={(e) => {
            if (noAttempts < maxAttempts) moveNoButton(e);
          }}
          onTouchStart={(e) => {
            if (noAttempts < maxAttempts) moveNoButton(e);
          }}
          onClick={handleNoClick}
          style={
            fixedPos
              ? {
                  position: 'fixed',
                  top: fixedPos.top,
                  left: fixedPos.left,
                  zIndex: 999,
                }
              : undefined
          }
          animate={fixedPos ? { scale: [0.85, 1] } : undefined}
          transition={{ type: 'spring', stiffness: 450, damping: 24 }}
          className="btn-kawaii px-6 py-3 bg-stone-200 hover:bg-rose-100 text-[#6b4f4f] hover:text-rose-700 font-fredoka font-bold text-sm sm:text-base rounded-full cursor-pointer transition-colors shadow-sm z-10 select-none touch-none uppercase tracking-wider"
        >
          No 🙈
        </motion.button>
      </div>
    </motion.div>
  );
}
