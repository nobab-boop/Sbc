import { useState, useEffect, type DragEvent, type ChangeEvent } from 'react';
import {
  X,
  Sparkles,
  Download,
  Copy,
  Check,
  Sliders,
  Image as ImageIcon,
  Music,
  Heart,
  Calendar,
  Upload,
  AlertCircle,
  Trash2,
} from 'lucide-react';
import { AppCustomization } from '../types';
import { generateStandaloneHtml } from '../utils/exportHtml';
import { playPopSound } from '../utils/audio';
import {
  USER_STICKER_ASSETS,
  loadStickersFromStorage,
  saveStickerBase64,
  removeStickerBase64,
  convertFileToBase64,
} from '../data/stickers';

interface CustomizeModalProps {
  customization: AppCustomization;
  onUpdate: (updated: AppCustomization) => void;
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'text' | 'stickers' | 'photos' | 'export';
}

export default function CustomizeModal({
  customization,
  onUpdate,
  isOpen,
  onClose,
  initialTab = 'text',
}: CustomizeModalProps) {
  const [formData, setFormData] = useState<AppCustomization>(customization);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'stickers' | 'photos' | 'export'>(initialTab);
  const [stickersMap, setStickersMap] = useState<Record<string, string>>(() => loadStickersFromStorage());
  const [batchDragActive, setBatchDragActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStickersMap(loadStickersFromStorage());
      if (initialTab) {
        setActiveTab(initialTab);
      }
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleChange = (field: keyof AppCustomization, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handlePhotoChange = (key: keyof AppCustomization['photos'], val: string) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: val },
    }));
  };

  const handleSingleStickerUpload = async (filename: string, file: File) => {
    try {
      const base64 = await convertFileToBase64(file);
      saveStickerBase64(filename, base64);
      setStickersMap((prev) => ({ ...prev, [filename]: base64 }));
    } catch (err) {
      console.error(`Failed to upload ${filename}`, err);
    }
  };

  const handleBatchFiles = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const lowerName = file.name.toLowerCase();
      let matchedTarget: string | null = null;

      if (lowerName.includes('4668') || lowerName.includes('668')) {
        matchedTarget = 'IMG_4668.jpeg';
      } else if (lowerName.includes('4669')) {
        matchedTarget = 'IMG_4669.jpeg';
      } else if (lowerName.includes('4670')) {
        matchedTarget = 'IMG_4670.jpeg';
      } else if (lowerName.includes('4671')) {
        matchedTarget = 'IMG_4671.jpeg';
      }

      if (matchedTarget) {
        await handleSingleStickerUpload(matchedTarget, file);
      }
    }
  };

  const handleRemoveSticker = (filename: string) => {
    removeStickerBase64(filename);
    setStickersMap((prev) => {
      const copy = { ...prev };
      delete copy[filename];
      return copy;
    });
  };

  const handleSave = () => {
    playPopSound();
    onUpdate(formData);
    onClose();
  };

  const handleDownload = () => {
    playPopSound();
    const html = generateStandaloneHtml(formData);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bubu-dudu-birthday-${formData.recipientName.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    playPopSound();
    const html = generateStandaloneHtml(formData);
    navigator.clipboard.writeText(html).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-4 border-rose-100 p-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-100">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-rose-100 text-rose-500 rounded-xl">
              <Sliders className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-rose-600 leading-tight">Customize Surprise ✨</h2>
              <p className="text-xs text-stone-500">Stickers, messages, photos & standalone export</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-rose-50 text-stone-400 hover:text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-4 gap-1.5 pt-3 pb-2">
          <button
            onClick={() => setActiveTab('text')}
            className={`py-2 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'text'
                ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                : 'bg-stone-100 text-stone-600 hover:bg-rose-50'
            }`}
          >
            <Heart className="w-3 h-3" /> Messages
          </button>
          <button
            onClick={() => setActiveTab('stickers')}
            className={`py-2 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'stickers'
                ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                : 'bg-stone-100 text-stone-600 hover:bg-rose-50'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-300" /> Stickers
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`py-2 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                : 'bg-stone-100 text-stone-600 hover:bg-rose-50'
            }`}
          >
            <ImageIcon className="w-3 h-3" /> Photos
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`py-2 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'export'
                ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                : 'bg-stone-100 text-stone-600 hover:bg-rose-50'
            }`}
          >
            <Download className="w-3 h-3" /> Export
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto pr-1 my-2 space-y-4 text-left">
          {activeTab === 'stickers' && (
            <div className="space-y-3.5">
              {/* Batch dropzone */}
              <div
                onDrop={(e: DragEvent<HTMLDivElement>) => {
                  e.preventDefault();
                  setBatchDragActive(false);
                  if (e.dataTransfer.files) {
                    handleBatchFiles(e.dataTransfer.files);
                  }
                }}
                onDragOver={(e: DragEvent<HTMLDivElement>) => {
                  e.preventDefault();
                  setBatchDragActive(true);
                }}
                onDragLeave={() => setBatchDragActive(false)}
                className={`p-3.5 rounded-2xl border-2 border-dashed text-center transition-all ${
                  batchDragActive
                    ? 'border-rose-500 bg-rose-100'
                    : 'border-rose-300 bg-rose-50/60 hover:bg-rose-50'
                }`}
              >
                <p className="text-xs font-bold text-rose-800 flex items-center justify-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" /> Drop your sticker files here
                </p>
                <p className="text-[10px] text-stone-500 mt-0.5">
                  Drop IMG_4668, IMG_4669, IMG_4670, or IMG_4671 — they are auto-converted to Base64 data URLs!
                </p>
                <label className="mt-2 inline-block px-3 py-1 bg-white border border-rose-300 rounded-lg text-rose-600 text-xs font-semibold cursor-pointer shadow-xs hover:bg-rose-50">
                  <span>Browse files</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files) handleBatchFiles(e.target.files);
                    }}
                    className="hidden"
                  />
                </label>
              </div>

              {/* 4 Assigned Sticker Slots */}
              <div className="space-y-2.5">
                {(['IMG_4668.jpeg', 'IMG_4669.jpeg', 'IMG_4670.jpeg', 'IMG_4671.jpeg'] as const).map(
                  (filename) => {
                    const info = USER_STICKER_ASSETS[filename];
                    const base64 = stickersMap[filename];

                    return (
                      <div
                        key={filename}
                        className="p-3 bg-white border border-rose-100 rounded-2xl shadow-xs flex items-center gap-3"
                      >
                        {/* Preview / status thumbnail */}
                        <div className="w-14 h-14 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                          {base64 ? (
                            <img
                              src={base64}
                              alt={info.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <AlertCircle className="w-6 h-6 text-amber-500" />
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-stone-800 truncate">
                              {filename}
                            </span>
                            <span className="px-1.5 py-0.2 bg-rose-100 text-rose-700 text-[10px] font-bold rounded">
                              Code {info.code}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 truncate mt-0.5">
                            {info.usagePages.join(' • ')}
                          </p>
                          <div className="mt-1">
                            {base64 ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                                <Check className="w-3 h-3" /> Embedded as Base64
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-rose-600">
                                ⚠️ Missing Asset
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <label className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl cursor-pointer transition-colors" title={`Upload ${filename}`}>
                            <Upload className="w-4 h-4" />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                const f = e.target.files?.[0];
                                if (f) handleSingleStickerUpload(filename, f);
                              }}
                              className="hidden"
                            />
                          </label>
                          {base64 && (
                            <button
                              onClick={() => handleRemoveSticker(filename)}
                              className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                              title="Reset sticker"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {activeTab === 'text' && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-rose-700 mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={formData.recipientName}
                  onChange={(e) => handleChange('recipientName', e.target.value)}
                  className="w-full px-3 py-2 bg-rose-50/50 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm font-bold text-rose-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Special Anniversary / Date
                </label>
                <input
                  type="text"
                  value={formData.specialDate}
                  onChange={(e) => handleChange('specialDate', e.target.value)}
                  placeholder="e.g. October 24"
                  className="w-full px-3 py-2 bg-rose-50/50 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-700 mb-1">
                  Birthday Wish Text (Screen 2)
                </label>
                <textarea
                  rows={2}
                  value={formData.birthdayWish}
                  onChange={(e) => handleChange('birthdayWish', e.target.value)}
                  className="w-full px-3 py-2 bg-rose-50/50 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs leading-relaxed"
                />
              </div>

              <div className="bg-rose-50/80 p-3 rounded-2xl border border-rose-200/80 space-y-2.5">
                <label className="block text-xs font-bold text-rose-800 flex items-center gap-1.5">
                  <span>🔒 Step 3 Secret Password & Hint</span>
                </label>
                <div>
                  <label className="block text-[11px] font-semibold text-rose-700 mb-0.5">
                    Secret Key Password (default: 0506 / 05 06 26)
                  </label>
                  <input
                    type="text"
                    value={formData.letterSecretKey || '0506'}
                    onChange={(e) => handleChange('letterSecretKey', e.target.value)}
                    placeholder="e.g. 0506"
                    className="w-full px-3 py-1.5 bg-white border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs font-bold text-rose-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-rose-700 mb-0.5">
                    Hint Text Displayed on Envelope
                  </label>
                  <input
                    type="text"
                    value={formData.letterHint || 'Hint: The day our beautiful story began 💍'}
                    onChange={(e) => handleChange('letterHint', e.target.value)}
                    placeholder="Hint text..."
                    className="w-full px-3 py-1.5 bg-white border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-700 mb-1">
                  Love Letter - Paragraph 1
                </label>
                <textarea
                  rows={3}
                  value={formData.letterParagraph1}
                  onChange={(e) => handleChange('letterParagraph1', e.target.value)}
                  className="w-full px-3 py-2 bg-rose-50/50 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs leading-relaxed font-caveat text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-700 mb-1">
                  Love Letter - Paragraph 2
                </label>
                <textarea
                  rows={3}
                  value={formData.letterParagraph2}
                  onChange={(e) => handleChange('letterParagraph2', e.target.value)}
                  className="w-full px-3 py-2 bg-rose-50/50 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs leading-relaxed font-caveat text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-700 mb-1">
                  Letter Signature
                </label>
                <input
                  type="text"
                  value={formData.letterSignature}
                  onChange={(e) => handleChange('letterSignature', e.target.value)}
                  className="w-full px-3 py-2 bg-rose-50/50 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm"
                />
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="space-y-3">
              <p className="text-xs text-stone-500">
                Upload your real photos or paste image URLs for the romantic memory photo frames:
              </p>
              {(['photo1', 'photo2', 'photo3', 'photo4'] as const).map((key, idx) => (
                <div key={key} className="p-2.5 bg-rose-50/40 border border-rose-200/80 rounded-2xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-rose-200/80 text-rose-700 text-[11px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      Photo {idx + 1} {idx === 0 ? '(Letter & Proposal Collage)' : '(Proposal Collage)'}
                    </span>
                    <label className="cursor-pointer px-2.5 py-1 bg-white hover:bg-rose-100 border border-rose-300 text-rose-700 text-[11px] font-bold rounded-lg flex items-center gap-1 transition-colors shadow-2xs">
                      <Upload className="w-3 h-3" />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const base64 = await convertFileToBase64(file);
                              handlePhotoChange(key, base64);
                            } catch (err) {
                              console.error('Failed to convert photo file', err);
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Paste URL or click Upload Photo...`}
                      value={formData.photos[key]}
                      onChange={(e) => handlePhotoChange(key, e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs font-mono"
                    />
                    <img
                      src={formData.photos[key]}
                      alt={`Preview ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-lg object-cover border border-rose-300 flex-shrink-0 bg-white"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"><rect width="36" height="36" fill="%23FFE4E6"/><text x="18" y="24" font-size="16" text-anchor="middle">🌸</text></svg>';
                      }}
                    />
                  </div>
                </div>
              ))}

              <div className="pt-3 border-t border-rose-100">
                <label className="block text-xs font-semibold text-rose-700 mb-1 flex items-center gap-1">
                  <Music className="w-3.5 h-3.5" /> Custom Romantic BGM Audio URL (.mp3)
                </label>
                <input
                  type="text"
                  value={formData.customMusicUrl}
                  onChange={(e) => handleChange('customMusicUrl', e.target.value)}
                  placeholder="https://example.com/song.mp3"
                  className="w-full px-3 py-2 bg-rose-50/50 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs font-mono"
                />
                <span className="text-[11px] text-stone-400">
                  (If empty or unreachable, built-in soft music box chimes will automatically play!)
                </span>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4 py-2">
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-2">
                <div className="flex items-center gap-2 text-rose-700 font-bold">
                  <Sparkles className="w-4 h-4" /> Complete Single-File index.html
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Download the entire interactive surprise web app as a <strong>single standalone .html file</strong> with your Base64 embedded stickers, animations, confetti, and romantic music!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleDownload}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-bold shadow-md shadow-rose-300 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download index.html
                </button>
                <button
                  onClick={handleCopy}
                  className="py-3 px-4 bg-white border-2 border-rose-300 text-rose-600 rounded-xl font-bold hover:bg-rose-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied to Clipboard!' : 'Copy Code'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-rose-100 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-stone-500 hover:text-stone-700 text-xs font-semibold rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-rose-500 text-white text-xs font-bold rounded-xl shadow hover:bg-rose-600 transition-colors cursor-pointer"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
}
