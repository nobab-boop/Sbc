// Sticker mapping for user-provided Bubu Dudu cartoon assets
// Mappings specified by user:
// - IMG_4668.jpeg (668)  -> First page (Screen 1 Initial) & Letter mascot
// - IMG_4669.jpeg (4669) -> First No page (Screen 1 Oops) & Last regular Yes page
// - IMG_4670.jpeg (4670) -> Happy Birthday page (Screen 2)
// - IMG_4671.jpeg (4671) -> Hug page (Screen 4) & Page after clicking million times yes

export interface StickerAssetInfo {
  filename: 'IMG_4668.jpeg' | 'IMG_4669.jpeg' | 'IMG_4670.jpeg' | 'IMG_4671.jpeg' | 'image.jpeg';
  code: string;
  title: string;
  usagePages: string[];
}

export const USER_STICKER_ASSETS: Record<string, StickerAssetInfo> = {
  'IMG_4668.jpeg': {
    filename: 'IMG_4668.jpeg',
    code: '668',
    title: 'First Page Sticker',
    usagePages: ['First Page ("I made something special for u")', 'Letter Mascot'],
  },
  'IMG_4669.jpeg': {
    filename: 'IMG_4669.jpeg',
    code: '4669',
    title: 'Crying Bear Sticker',
    usagePages: ['First "No" Page (Oops Screen)', 'Last "Regular Yes" Reaction Screen'],
  },
  'IMG_4670.jpeg': {
    filename: 'IMG_4670.jpeg',
    code: '4670',
    title: 'Happy Birthday Cake Sticker',
    usagePages: ['Happy Birthday Page (Cake & Crown Screen)'],
  },
  'IMG_4671.jpeg': {
    filename: 'IMG_4671.jpeg',
    code: '4671',
    title: 'Bear & Panda Hug / Heart Sticker',
    usagePages: ['Virtual Hug Page', 'Page After Clicking Million Times YES (Grand Finale)'],
  },
  'image.jpeg': {
    filename: 'image.jpeg',
    code: 'photo',
    title: 'Proposal Keepsake Photo',
    usagePages: ['Yes / Proposal Page Photo Frame'],
  },
};

export type ScreenStickerRole =
  | 'screen1_initial'
  | 'screen1_oops'
  | 'screen2_birthday'
  | 'screen3_letter'
  | 'screen4_hug'
  | 'screen5_regular_yes'
  | 'screen5_million_yes'
  | 'screen5_proposal_photo';

export const SCREEN_TO_ASSET_MAP: Record<ScreenStickerRole, 'IMG_4668.jpeg' | 'IMG_4669.jpeg' | 'IMG_4670.jpeg' | 'IMG_4671.jpeg' | 'image.jpeg'> = {
  screen1_initial: 'IMG_4668.jpeg', // "Use 668 for the first’s page"
  screen1_oops: 'IMG_4669.jpeg',    // "Use 4669 for the first no page"
  screen2_birthday: 'IMG_4670.jpeg',// "Use 4670 for happy birthday page"
  screen3_letter: 'IMG_4668.jpeg',  // Cute bear & panda companion
  screen4_hug: 'IMG_4671.jpeg',     // "Use 4671 for hug page"
  screen5_regular_yes: 'IMG_4669.jpeg', // "Use 4669 for ... last yes page"
  screen5_million_yes: 'IMG_4671.jpeg', // "Use 4671 for ... the page after clicking million time yes"
  screen5_proposal_photo: 'image.jpeg', // Special keepsakes photo on yes page
};

const STORAGE_KEY = 'bubu_dudu_sticker_base64_v1';

// In-memory cache of base64 data URLs
let stickerCache: Record<string, string> = {};

// Load cache from localStorage
export function loadStickersFromStorage(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      stickerCache = JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load stickers from storage', err);
  }
  return stickerCache;
}

// Save a sticker base64 directly with resilient quota handling
export function saveStickerBase64(filename: string, base64DataUrl: string): boolean {
  loadStickersFromStorage();
  stickerCache[filename] = base64DataUrl;
  let persisted = false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stickerCache));
    persisted = true;
  } catch (err) {
    console.warn('LocalStorage quota limit reached or restricted, using in-memory session cache.', err);
    persisted = false;
  }
  // Always notify listeners so UI updates instantly
  window.dispatchEvent(new CustomEvent('bubu-stickers-updated', { detail: { filename, base64DataUrl, persisted } }));
  return persisted;
}

// Remove / reset a sticker
export function removeStickerBase64(filename: string) {
  loadStickersFromStorage();
  delete stickerCache[filename];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stickerCache));
  } catch (err) {
    console.warn('Failed to update localStorage after removing sticker', err);
  }
  window.dispatchEvent(new CustomEvent('bubu-stickers-updated', { detail: { filename } }));
}

// Get the best URL for a filename: Base64 first, then /stickers/<filename>, then /<filename>
export function getStickerSource(filename: string): string | null {
  loadStickersFromStorage();
  if (stickerCache[filename]) {
    return stickerCache[filename];
  }
  return null;
}

// Convert a File object to an optimized base64 Data URL
// Automatically resizes high-res phone camera photos (e.g. 12MB iPhone photos) down to crisp sticker size (<100KB)
// so that browser localStorage quota (5MB) is never exceeded!
export function convertFileToBase64(file: File, maxDimension: number = 600): Promise<string> {
  return new Promise((resolve, reject) => {
    // If it's a small image (<150KB) and already within reasonable dimensions, or not an image
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') resolve(reader.result);
        else reject(new Error('Failed to read file as data URL'));
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      // Calculate new scaled dimensions
      let width = img.naturalWidth || img.width;
      let height = img.naturalHeight || img.height;

      // If dimensions are within bounds and file is small, direct conversion
      if (width <= maxDimension && height <= maxDimension && file.size < 200 * 1024) {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') resolve(reader.result);
          else reject(new Error('Failed to read file'));
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
        return;
      }

      if (width > height) {
        if (width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        }
      } else {
        if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        // Fallback
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Preserve PNG transparency if png/webp, else use high-quality jpeg
      const isPng = file.type === 'image/png' || file.name.toLowerCase().endsWith('.png');
      const mimeType = isPng ? 'image/png' : 'image/jpeg';
      const quality = isPng ? undefined : 0.88;

      const optimizedBase64 = canvas.toDataURL(mimeType, quality);
      resolve(optimizedBase64);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      // Fallback to direct read
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    };

    img.src = objectUrl;
  });
}
