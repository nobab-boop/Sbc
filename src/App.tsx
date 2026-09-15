import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Download, Sliders, Heart } from 'lucide-react';
import { AppScreen, AppCustomization } from './types';
import { DEFAULT_CUSTOMIZATION } from './data/defaults';
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';
import CustomizeModal from './components/CustomizeModal';
import Screen1Initial from './components/Screen1Initial';
import Screen1Oops from './components/Screen1Oops';
import Screen2Birthday from './components/Screen2Birthday';
import Screen3Letter from './components/Screen3Letter';
import Screen4Hug from './components/Screen4Hug';
import Screen5Proposal from './components/Screen5Proposal';
import { generateStandaloneHtml } from './utils/exportHtml';
import { playPopSound } from './utils/audio';

const STORAGE_KEY = 'bubu_dudu_customization_v1';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('initial');
  const [customization, setCustomization] = useState<AppCustomization>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_CUSTOMIZATION;
  });

  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [customizeTab, setCustomizeTab] = useState<'text' | 'stickers' | 'photos' | 'export'>('text');

  // Save changes to localStorage
  const handleUpdateCustomization = (updated: AppCustomization) => {
    setCustomization(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Quick download standalone HTML
  const handleQuickDownload = () => {
    playPopSound();
    const html = generateStandaloneHtml(customization);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bubu-dudu-birthday-${customization.recipientName.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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

      {/* Top Navigation & Controls Bar */}
      <header className="fixed top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-40 flex items-center justify-between pointer-events-none">
        {/* Left: Quick Actions */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => {
              playPopSound();
              setCustomizeTab('stickers');
              setIsCustomizeOpen(true);
            }}
            className="btn-kawaii flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-white/95 hover:bg-rose-50 border border-rose-300 text-rose-600 rounded-full shadow-xs text-xs font-bold font-fredoka uppercase tracking-wider transition-all hover:scale-105 cursor-pointer"
            title="Manage Bubu & Dudu Sticker Assets (IMG_4668, 4669, 4670, 4671)"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Stickers</span>
          </button>

          <button
            onClick={() => {
              playPopSound();
              setCustomizeTab('text');
              setIsCustomizeOpen(true);
            }}
            className="btn-kawaii flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-white/90 hover:bg-rose-50 border border-rose-200 text-rose-600 rounded-full shadow-xs text-xs font-bold font-fredoka uppercase tracking-wider transition-all hover:scale-105 cursor-pointer"
            title="Customize names, letter, photos & audio"
          >
            <Sliders className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          <button
            onClick={handleQuickDownload}
            className="btn-kawaii flex items-center gap-1 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-white/90 hover:bg-rose-50 border border-rose-200 text-rose-600 rounded-full shadow-xs text-xs font-bold font-fredoka uppercase tracking-wider transition-all hover:scale-105 cursor-pointer"
            title="Download complete standalone index.html file"
          >
            <Download className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden sm:inline">Save index.html</span>
          </button>
        </div>

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
                  onOpenCustomize={() => setIsCustomizeOpen(true)}
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

      {/* Customization Drawer / Export Modal */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        customization={customization}
        onUpdate={handleUpdateCustomization}
        initialTab={customizeTab}
      />
    </div>
  );
}
