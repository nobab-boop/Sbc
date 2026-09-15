import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { toggleAudio } from '../utils/audio';

interface MusicPlayerProps {
  customMusicUrl?: string;
}

export default function MusicPlayer({ customMusicUrl }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    const nextState = !isPlaying;
    const active = toggleAudio(customMusicUrl, nextState);
    setIsPlaying(active);
  };

  useEffect(() => {
    return () => {
      toggleAudio(customMusicUrl, false);
    };
  }, [customMusicUrl]);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        id="bgm-music-toggle-btn"
        onClick={handleToggle}
        aria-label="Toggle Romantic Background Music"
        className={`group relative flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-all duration-300 shadow-md ${
          isPlaying
            ? 'bg-rose-50 border-rose-300 text-rose-600 shadow-rose-200/60 scale-105'
            : 'bg-white/90 border-rose-200 text-stone-500 hover:text-rose-500 hover:border-rose-300'
        }`}
      >
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${
            isPlaying ? 'animate-spin-slow bg-rose-100 text-rose-600' : 'bg-stone-100 text-stone-400'
          }`}
        >
          {isPlaying ? <Music className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </div>
        <span className="text-xs font-semibold tracking-wide pr-1 hidden sm:inline">
          {isPlaying ? 'BGM Playing 🎶' : 'Play Song 🎵'}
        </span>
        {isPlaying && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
        )}
      </button>
    </div>
  );
}
