import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { AppScreen, AppCustomization } from './types';
import { DEFAULT_CUSTOMIZATION } from './data/defaults';
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';
import Screen1Initial from './components/Screen1Initial';
import Screen1Oops from './components/Screen1Oops';
import Screen2Birthday from './components/Screen2Birthday';
import Screen3Letter from './components/Screen3Letter';
import Screen4Hug from './components/Screen4Hug';
import Screen5Proposal from './components/Screen5Proposal';

const STORAGE_KEY = 'bubu_dudu_customization_v3';

function sanitizeCustomization(data: Partial<AppCustomization>): AppCustomization {
  const cleanHint = (data.letterHint || DEFAULT_CUSTOMIZATION.letterHint)
    .replace(/\s*\([^)]*\)/g, '')
    .trim();

  return {
    ...DEFAULT_CUSTOMIZATION,
    ...data,
    recipientName: (data.recipientName && data.recipientName !== 'Cutie Pie') ? data.recipientName : 'Prottushona',
    specialDate: (data.specialDate && data.specialDate !== '28.02.2026') ? data.specialDate : '05 06 26',
    letterSignature: (data.letterSignature && data.letterSignature !== 'Ur Panda 🐼❤️') ? data.letterSignature : 'Your Nafimshona ❤️',
    proposalQuestion: (data.proposalQuestion && data.proposalQuestion !== 'Will you be mine? 💖') ? data.proposalQuestion : 'Will you be mine, Prottushona? 💖',
    letterGreeting: (data.letterGreeting && data.letterGreeting !== 'Dearest Love,') ? data.letterGreeting : 'Dearest Prottushona,',
    letterSecretKey: (data.letterSecretKey && data.letterSecretKey !== '2802') ? data.letterSecretKey : '0506',
    letterHint: cleanHint || 'Hint: The day our beautiful story began 💍',
    missYouText: (data.missYouText && data.missYouText !== 'I MISS YOU ❤️') ? data.missYouText : 'I MISS YOU, PROTTUSHONA ❤️',
  };
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('initial');
  const [customization] = useState<AppCustomization>(() => {
    try {
      const savedV3 = localStorage.getItem(STORAGE_KEY);
      if (savedV3) return sanitizeCustomization(JSON.parse(savedV3));

      const savedV2 = localStorage.getItem('bubu_dudu_customization_v2');
      if (savedV2) {
        const sanitized = sanitizeCustomization(JSON.parse(savedV2));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
        return sanitized;
      }

      const savedV1 = localStorage.getItem('bubu_dudu_customization_v1');
      if (savedV1) {
        const sanitized = sanitizeCustomization(JSON.parse(savedV1));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
        return sanitized;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_CUSTOMIZATION;
  });

  // Step tracker mapping for progress bar
  const stepMap: Record<AppScreen, number> = {
    initial: 1,
    oops: 1,
    birthday: 2,
    letter: 3,
    hug: 4,
    proposal: 5,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFEBEF] to-[#FFF0F5] text-[#5A3A42] flex flex-col items-center justify-center p-3 sm:p-6 relative overflow-x-hidden select-none font-['Fredoka',sans-serif]">
      {/* Background Floating Hearts Particle System */}
      <FloatingHearts />

      {/* Top Controls Bar - Music Player only */}
      <header className="fixed top-3 sm:top-4 right-3 sm:right-4 z-40 flex items-center justify-end pointer-events-none">
        {/* Right: Music Player */}
        <div className="pointer-events-auto">
          <MusicPlayer customMusicUrl={customization.customMusicUrl} />
        </div>
      </header>

      {/* Center Main Applet Card */}
      <main className="relative z-10 w-full max-w-[490px] my-auto">
        <div className="card-kawaii w-full bg-white/95 backdrop-blur-sm rounded-[32px] p-5 sm:p-8 shadow-[0_15px_35px_rgba(255,154,162,0.25)] border-[3px] border-dashed border-rose-200/90 relative transition-all transform-gpu">
          {/* Subtle Step Indicator */}
          {currentScreen !== 'oops' && (
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((step) => {
                const currentStepNumber = stepMap[currentScreen];
                const isPassed = step <= currentStepNumber;
                const isCurrent = step === currentStepNumber;
                return (
                  <div
                    key={step}
                    className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                      isCurrent
                        ? 'w-7 h-3 bg-rose-500 text-white'
                        : isPassed
                        ? 'w-3 h-3 bg-rose-300'
                        : 'w-2 h-2 bg-rose-100'
                    }`}
                  >
                    {isCurrent && <Heart className="w-2.5 h-2.5 fill-white" />}
                  </div>
                );
              })}
            </div>
          )}

          {/* Screen Switcher with Animated Transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -10 }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              className="w-full"
            >
              {currentScreen === 'initial' && (
                <Screen1Initial
                  recipientName={customization.recipientName}
                  onYes={() => setCurrentScreen('birthday')}
                  onNo={() => setCurrentScreen('oops')}
                />
              )}

              {currentScreen === 'oops' && (
                <Screen1Oops
                  onTryAgain={() => setCurrentScreen('initial')}
                />
              )}

              {currentScreen === 'birthday' && (
                <Screen2Birthday
                  recipientName={customization.recipientName}
                  birthdayWish={customization.birthdayWish}
                  onNext={() => setCurrentScreen('letter')}
                />
              )}

              {currentScreen === 'letter' && (
                <Screen3Letter
                  title={customization.letterTitle}
                  greeting={customization.letterGreeting}
                  paragraph1={customization.letterParagraph1}
                  paragraph2={customization.letterParagraph2}
                  closing={customization.letterClosing}
                  signature={customization.letterSignature}
                  secretKey={customization.letterSecretKey}
                  hintText={customization.letterHint}
                  photos={customization.photos}
                  onNext={() => setCurrentScreen('hug')}
                />
              )}

              {currentScreen === 'hug' && (
                <Screen4Hug
                  missYouText={customization.missYouText}
                  onNext={() => setCurrentScreen('proposal')}
                />
              )}

              {currentScreen === 'proposal' && (
                <Screen5Proposal
                  question={customization.proposalQuestion}
                  specialDate={customization.specialDate}
                  photos={customization.photos}
                  onRestart={() => setCurrentScreen('initial')}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
