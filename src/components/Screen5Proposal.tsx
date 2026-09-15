import { useState, useEffect, useRef, type ChangeEvent, type DragEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Calendar, Sparkles, RotateCcw, ArrowLeft, Camera } from 'lucide-react';
import { GIF_URLS } from '../data/defaults';
import { triggerFireworks, triggerBirthdayConfetti } from '../utils/confetti';
import { playCelebrationSound, playPopSound, playPoutSound } from '../utils/audio';
import { getStickerSource, saveStickerBase64, convertFileToBase64 } from '../data/stickers';
import BubuDuduImage from './BubuDuduImage';

interface Screen5ProposalProps {
  question: string;
  specialDate: string;
  photos: {
    photo1: string;
    photo2: string;
    photo3: string;
    photo4: string;
  };
  onRestart: () => void;
}

export default function Screen5Proposal({
  question,
  specialDate,
  photos,
  onRestart,
}: Screen5ProposalProps) {
  const [modalState, setModalState] = useState<'none' | 'sad' | 'grandFinale'>('none');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Base64-first photo resolution for image.jpeg
  const [photoSrc, setPhotoSrc] = useState<string>(() => {
    const base64 = getStickerSource('image.jpeg');
    if (base64) return base64;
    return '/stickers/image.jpeg';
  });

  useEffect(() => {
    const handleUpdate = () => {
      const base64 = getStickerSource('image.jpeg');
      if (base64) {
        setPhotoSrc(base64);
      }
    };

    window.addEventListener('bubu-stickers-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    // Initial check
    const current = getStickerSource('image.jpeg');
    if (current) {
      setPhotoSrc(current);
    } else {
      const testImg = new Image();
      testImg.onload = () => setPhotoSrc('/stickers/image.jpeg');
      testImg.onerror = () => {
        const rootImg = new Image();
        rootImg.onload = () => setPhotoSrc('/image.jpeg');
        rootImg.onerror = () => {
          if (photos?.photo1) setPhotoSrc(photos.photo1);
        };
        rootImg.src = '/image.jpeg';
      };
      testImg.src = '/stickers/image.jpeg';
    }

    return () => {
      window.removeEventListener('bubu-stickers-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [photos?.photo1]);

  const handleFileUpload = async (file: File) => {
    try {
      const base64 = await convertFileToBase64(file);
      saveStickerBase64('image.jpeg', base64);
      setPhotoSrc(base64);
      playPopSound();
    } catch (err) {
      console.error('Failed to convert photo to base64', err);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  // Button 1: Simple "YES" triggers dramatic crying / pouting screen (NO confetti)
  const handleSimpleYes = () => {
    playPoutSound();
    setModalState('sad');
  };

  // Button 2: "A million times YES! 💖" triggers the true Grand Finale!
  const handleGrandYes = () => {
    setModalState('grandFinale');
    playCelebrationSound();
    triggerFireworks();
    triggerBirthdayConfetti();

    // Secondary waves of heart confetti
    setTimeout(() => {
      triggerBirthdayConfetti();
    }, 1000);
    setTimeout(() => {
      triggerFireworks();
    }, 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -15 }}
      transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex flex-col items-center text-center select-none"
    >
      {/* Title */}
      <div className="space-y-1 mb-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-widest bg-rose-100/80 px-3.5 py-1 rounded-full font-quicksand">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" /> A Sweet Little Question
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#d6336c] font-fredoka tracking-wide [text-shadow:2px_2px_0px_rgba(255,182,193,0.6)]">
          {question}
        </h1>
      </div>

      {/* Single Romantic Polaroid Keepsake Photo Frame (Base64 System) */}
      <div
        className={`relative my-3 p-3 sm:p-3.5 bg-white/95 border-[3px] border-dashed ${
          isDragging ? 'border-rose-500 bg-rose-50/70 scale-102' : 'border-rose-300/80'
        } rounded-3xl shadow-[0_10px_25px_rgba(255,154,162,0.25)] max-w-xs sm:max-w-sm w-full transition-all duration-300 group cursor-pointer`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {/* Hidden File Input for 1-Click Upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Washi Tape Header on Top */}
        <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 min-w-[190px] px-4 h-6 flex items-center justify-center text-[11px] font-bold text-rose-800/90 font-fredoka tracking-wider uppercase shadow-xs whitespace-nowrap z-20">
          ♡ WITH YOU FOREVER ♡
        </div>

        {/* Heart Accent Pin at Top */}
        <div className="absolute -top-3.5 left-4 w-7 h-7 rounded-full bg-rose-500 border-2 border-white shadow-md flex items-center justify-center text-white text-xs z-20">
          💖
        </div>

        {/* The One Keepsake Photo */}
        <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-rose-50/60 border border-rose-200/70 shadow-inner">
          <img
            src={photoSrc}
            alt="My Love Portrait"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 240'><defs><linearGradient id='bgGrad' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23FFF1F2'/><stop offset='100%' stop-color='%23FFE4E6'/></linearGradient></defs><rect width='320' height='240' fill='url(%23bgGrad)'/><circle cx='160' cy='100' r='55' fill='%23FDA4AF' opacity='0.3'/><text x='160' y='105' font-size='50' text-anchor='middle'>🌸</text><text x='160' y='165' font-size='16' font-family='sans-serif' font-weight='bold' fill='%23E11D48' text-anchor='middle'>The Love of My Life 💕</text><text x='160' y='190' font-size='12' font-family='sans-serif' fill='%23BE123C' text-anchor='middle' opacity='0.8'>Tap to upload your photo</text></svg>";
            }}
          />

          {/* Hover Overlay with Upload Cue */}
          <div
            className={`absolute inset-0 bg-rose-950/35 backdrop-blur-[1px] flex flex-col items-center justify-center text-white gap-1 transition-opacity duration-200 ${
              isHovered || isDragging ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Camera className="w-6 h-6 text-white drop-shadow-md animate-bounce" />
            <span className="text-xs font-bold font-fredoka uppercase tracking-wide drop-shadow-md">
              Tap or Drop to Change Photo 📷
            </span>
          </div>
        </div>

        {/* Cute Scrapbook Caption */}
        <div className="mt-2.5 pt-1 text-center">
          <p className="font-caveat text-xl sm:text-2xl font-bold text-rose-600 tracking-wider">
            My favorite smile in the whole world 💕
          </p>
        </div>

        {/* Cute panda sticker peeking at the bottom right */}
        <div className="absolute -bottom-4 -right-3 w-14 h-14 select-none pointer-events-none z-10">
          <BubuDuduImage
            type="celebration"
            alt="Proposal Celebration sticker"
            className="w-full h-full"
            showUploadTrigger={false}
          />
        </div>
      </div>

      {/* Special Memorable Date Display */}
      <div className="my-2 inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 border border-rose-300 rounded-full text-rose-800 font-bold text-xs sm:text-sm shadow-xs font-quicksand">
        <Calendar className="w-4 h-4 text-rose-600" />
        <span>✨ Special Date: {specialDate} ✨</span>
      </div>

      {/* Two Proposal Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-3 w-full max-w-xs sm:max-w-sm justify-center">
        <motion.button
          id="btn-proposal-yes-1"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSimpleYes}
          className="btn-kawaii flex-1 py-3.5 px-4 bg-rose-100 hover:bg-rose-200 text-rose-700 font-fredoka font-bold text-sm sm:text-base rounded-full border-2 border-rose-300 shadow-sm cursor-pointer transition-colors flex items-center justify-center gap-1.5 uppercase tracking-wider"
        >
          <span>YES</span>
        </motion.button>

        <motion.button
          id="btn-proposal-yes-2"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleGrandYes}
          className="btn-kawaii flex-1.5 py-3.5 px-5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-fredoka font-bold text-sm sm:text-base rounded-full shadow-lg shadow-rose-300/60 border-2 border-white cursor-pointer hover:shadow-rose-400/80 transition-shadow flex items-center justify-center gap-1.5 uppercase tracking-wider"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>A million times YES! 💖</span>
        </motion.button>
      </div>

      {/* Overlays / Modals */}
      <AnimatePresence>
        {/* Playful Sad / Dramatic Rejection Screen for "YES" */}
        {modalState === 'sad' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/40 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 text-center shadow-2xl border-4 border-rose-300 overflow-hidden"
            >
              <div className="text-3xl mb-1 animate-wiggle">💔🥺</div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#d6336c] font-fredoka tracking-wide leading-tight mb-2 [text-shadow:2px_2px_0px_rgba(255,182,193,0.6)]">
                Just a regular YES? 🥺💔
              </h2>

              {/* Crying or pouting cute bear graphic */}
              <div className="w-44 h-44 sm:w-48 sm:h-48 mx-auto my-2 flex items-center justify-center">
                <BubuDuduImage
                  type="crying"
                  gifUrl={GIF_URLS.crying}
                  alt="Dramatic Crying Bear"
                  className="w-full h-full"
                />
              </div>

              <p className="text-sm text-[#6b4f4f] font-quicksand font-semibold leading-relaxed mb-6 px-2">
                After all this effort, only a simple yes?! That hurts my little heart... Go back and think properly! 😭
              </p>

              <motion.button
                id="btn-reconsider"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playPopSound();
                  setModalState('none');
                }}
                className="btn-kawaii w-full py-3.5 px-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-fredoka font-bold text-sm sm:text-base rounded-full shadow-lg shadow-rose-300/60 border-2 border-white cursor-pointer flex items-center justify-center gap-2 hover:shadow-rose-400/80 transition-shadow uppercase tracking-wider"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Let me reconsider 🥺</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* Grand Finale Screen for "A million times YES! 💖" */}
        {modalState === 'grandFinale' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/45 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.7, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl border-[3px] border-dashed border-rose-300 overflow-hidden"
            >
              {/* Floating celebration stickers & emojis */}
              <div className="absolute top-2 left-3 text-2xl animate-bounce">🎉</div>
              <div className="absolute top-2 right-3 text-2xl animate-pulse">💖</div>
              <div className="absolute top-12 left-5 text-xl opacity-80 animate-cute-bounce">🌸</div>
              <div className="absolute top-12 right-5 text-xl opacity-80 animate-wiggle">✨</div>

              <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-100 px-3 py-1 rounded-full mb-2 font-quicksand">
                <Sparkles className="w-3.5 h-3.5" /> Happiest Day Ever
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#d6336c] font-fredoka tracking-wide leading-snug [text-shadow:2px_2px_0px_rgba(255,182,193,0.6)]">
                YAYYY! You just made me the happiest person in the universe! 💍✨🥰
              </h2>

              {/* Super happy hugging / kissing Panda & Bear graphic */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto my-3 flex items-center justify-center">
                <BubuDuduImage
                  type="kiss"
                  gifUrl={GIF_URLS.celebration}
                  alt="Super Happy Celebration Bubu and Dudu"
                  className="w-full h-full"
                />
              </div>

              {/* Celebratory message with special date */}
              <div className="space-y-1.5 mb-6">
                <div className="inline-block px-3 py-1 bg-rose-100 text-rose-800 font-bold text-xs rounded-full border border-rose-200 font-quicksand">
                  ✨ Sealed on our special date: {specialDate} ✨
                </div>
                <p className="text-xl font-bold text-rose-800 font-fredoka">
                  Forever & Always with you! 🐼❤️🐻
                </p>
                <p className="text-xs sm:text-sm text-[#6b4f4f] font-quicksand font-semibold">
                  Here's to a lifetime filled with sweet giggles, cozy hugs, and endless love!
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playCelebrationSound();
                    triggerFireworks();
                    triggerBirthdayConfetti();
                  }}
                  className="btn-kawaii py-3 px-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-fredoka font-bold text-xs sm:text-sm rounded-full shadow-md shadow-rose-300 flex items-center justify-center gap-1.5 uppercase tracking-wider"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>More Fireworks! 🎆</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playPopSound();
                    setModalState('none');
                    onRestart();
                  }}
                  className="btn-kawaii py-3 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 font-fredoka font-bold text-xs sm:text-sm rounded-full border border-rose-200 flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Replay Surprise 🎁</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
