import { useState, useEffect, type DragEvent, type ChangeEvent } from 'react';
import { Upload, AlertCircle, Sparkles } from 'lucide-react';
import {
  USER_STICKER_ASSETS,
  SCREEN_TO_ASSET_MAP,
  getStickerSource,
  saveStickerBase64,
  convertFileToBase64,
  type ScreenStickerRole,
  type StickerAssetInfo,
} from '../data/stickers';

export type CharacterType =
  | 'curious'
  | 'pouting'
  | 'birthday'
  | 'letter'
  | 'hug'
  | 'crying'
  | 'kiss'
  | 'celebration'
  | 'proposal';

interface BubuDuduImageProps {
  type?: CharacterType;
  stickerRole?: ScreenStickerRole;
  gifUrl?: string;
  alt?: string;
  className?: string;
  showUploadTrigger?: boolean;
}

// Map CharacterType to ScreenStickerRole
function getRoleFromType(type: CharacterType): ScreenStickerRole {
  switch (type) {
    case 'curious':
      return 'screen1_initial';
    case 'pouting':
      return 'screen1_oops';
    case 'birthday':
      return 'screen2_birthday';
    case 'letter':
      return 'screen3_letter';
    case 'hug':
      return 'screen4_hug';
    case 'crying':
      return 'screen5_regular_yes';
    case 'kiss':
    case 'celebration':
    case 'proposal':
      return 'screen5_million_yes';
    default:
      return 'screen1_initial';
  }
}

export default function BubuDuduImage({
  type = 'curious',
  stickerRole,
  alt,
  className = '',
  showUploadTrigger = true,
}: BubuDuduImageProps) {
  const role = stickerRole || getRoleFromType(type);
  const targetFilename = SCREEN_TO_ASSET_MAP[role];
  const assetInfo: StickerAssetInfo = USER_STICKER_ASSETS[targetFilename];

  const [imgSrc, setImgSrc] = useState<string | null>(() => getStickerSource(targetFilename));
  const [loadError, setLoadError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sync state when stickers are updated in localStorage or via event
  useEffect(() => {
    const handleUpdate = () => {
      const source = getStickerSource(targetFilename);
      setImgSrc(source);
      setLoadError(false);
    };

    window.addEventListener('bubu-stickers-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    // Initial check
    const current = getStickerSource(targetFilename);
    if (current) {
      setImgSrc(current);
      setLoadError(false);
    } else {
      // Try local fallback paths in public/
      const testImg = new Image();
      testImg.onload = () => {
        setImgSrc(`/stickers/${targetFilename}`);
        setLoadError(false);
      };
      testImg.onerror = () => {
        // Try root public path
        const rootImg = new Image();
        rootImg.onload = () => {
          setImgSrc(`/${targetFilename}`);
          setLoadError(false);
        };
        rootImg.onerror = () => {
          setLoadError(true);
        };
        rootImg.src = `/${targetFilename}`;
      };
      testImg.src = `/stickers/${targetFilename}`;
    }

    return () => {
      window.removeEventListener('bubu-stickers-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [targetFilename]);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    try {
      const base64 = await convertFileToBase64(file);
      saveStickerBase64(targetFilename, base64);
      setImgSrc(base64);
      setLoadError(false);
    } catch (err) {
      console.error('Failed to convert sticker to base64', err);
    } finally {
      setIsProcessing(false);
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // If the image is loaded and valid, render the user's exact sticker image
  if (imgSrc && !loadError) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <img
          src={imgSrc}
          alt={alt || assetInfo.title}
          referrerPolicy="no-referrer"
          onError={() => setLoadError(true)}
          className="w-full h-full object-contain drop-shadow-sm select-none transition-transform duration-300"
          style={{ imageRendering: 'auto' }}
        />
      </div>
    );
  }

  // If image is missing: DO NOT substitute random AI cartoons.
  // If showUploadTrigger is false (e.g. tiny decorative corner badge), return null to avoid cluttering layout
  if (!showUploadTrigger) {
    return null;
  }

  // Clearly identify which asset is missing and provide a direct 1-click upload / drag-and-drop to Base64!
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative w-full max-w-[260px] mx-auto min-h-[170px] p-4 flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed transition-all duration-200 ${
        isDragging
          ? 'border-rose-500 bg-rose-100/80 scale-102'
          : 'border-rose-300 bg-white/90 shadow-sm hover:border-rose-400'
      } ${className}`}
    >
      <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-1.5 shadow-inner">
        <AlertCircle className="w-5 h-5 text-rose-600" />
      </div>

      <div className="space-y-0.5 mb-2">
        <span className="inline-block px-2 py-0.5 bg-rose-100/90 text-rose-800 text-[10px] font-black uppercase tracking-wider rounded-md">
          Missing Asset: {targetFilename}
        </span>
        <p className="text-xs font-bold text-stone-700">
          {assetInfo.title} ({assetInfo.code})
        </p>
        <p className="text-[10px] text-stone-500">
          Used on: {assetInfo.usagePages[0]}
        </p>
      </div>

      {showUploadTrigger && (
        <label className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-bold rounded-full cursor-pointer shadow-md shadow-rose-200 transition-transform active:scale-95">
          {isProcessing ? (
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Upload className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          )}
          <span>{isProcessing ? 'Converting to Base64...' : `Upload ${targetFilename}`}</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}

      <p className="text-[9px] text-stone-400 mt-1.5">
        Drag & drop {targetFilename} or click to embed as Base64
      </p>
    </div>
  );
}
