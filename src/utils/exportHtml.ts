import { AppCustomization } from '../types';
import { getStickerSource } from '../data/stickers';
import {
  SVG_MEMORY_CARDS,
} from './inlineSvgAssets';

function renderStickerHtml(
  filename: 'IMG_4668.jpeg' | 'IMG_4669.jpeg' | 'IMG_4670.jpeg' | 'IMG_4671.jpeg' | 'image.jpeg',
  alt: string,
  usage: string
): string {
  const base64 = getStickerSource(filename);
  if (base64) {
    return `<img src="${base64}" alt="${alt}" style="width: 100%; height: 100%; max-height: 220px; object-fit: contain; margin: 0 auto; display: block;" />`;
  }
  return `<div style="padding: 16px; border: 2px dashed #FDA4AF; border-radius: 16px; background: rgba(255,255,255,0.9); text-align: center; max-width: 250px; margin: 0 auto;">
    <div style="font-size: 22px; margin-bottom: 4px;">⚠️</div>
    <div style="font-size: 13px; font-weight: bold; color: #BE123C;">Missing Asset: ${filename}</div>
    <div style="font-size: 11px; color: #78716C; margin-top: 3px;">Assigned to: ${usage}</div>
  </div>`;
}

export function generateStandaloneHtml(config: AppCustomization): string {
  const proposalPhotoSrc = getStickerSource('image.jpeg') || (config.photos?.photo1 && config.photos.photo1.startsWith('data:image') ? config.photos.photo1 : null);
  const proposalPhotoHtml = proposalPhotoSrc
    ? `<img src="${proposalPhotoSrc}" alt="Our Special Memory" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\\'http://www.w3.org/2000/svg\\\' viewBox=\\\'0 0 160 160\\\'><rect width=\\\'160\\\' height=\\\'160\\\' fill=\\\'%23FFE4E6\\\'/><text x=\\\'80\\\' y=\\\'80\\\' font-size=\\\'36\\\' text-anchor=\\\'middle\\\'>🌸</text><text x=\\\'80\\\' y=\\\'120\\\' font-size=\\\'13\\\' font-weight=\\\'bold\\\' fill=\\\'%23E11D48\\\' text-anchor=\\\'middle\\\'>loading soooon 💕</text></svg>'" />`
    : `<div style="text-align: center; padding: 24px 16px;"><div style="font-size: 38px;">🌸</div><div style="font-family: 'Caveat', cursive; font-size: 1.3rem; font-weight: bold; color: #d6336c; margin-top: 6px;">loading soooon 💕</div></div>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Happy Birthday ${config.recipientName}! 🎂💖</title>
  <meta name="description" content="A romantic birthday surprise web app inspired by Bubu & Dudu" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Fredoka:wght@400;500;600;700&family=Gaegu:wght@400;700&family=Itim&family=Quicksand:wght@500;600;700&family=Sniglet:wght@400;800&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.4/dist/confetti.browser.min.js"></script>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      user-select: none;
      -webkit-user-select: none;
    }
    .font-itim {
      font-family: 'Itim', cursive, sans-serif;
    }
    .font-gaegu {
      font-family: 'Gaegu', cursive, sans-serif;
    }
    @keyframes shakeInput {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-6px); }
      40%, 80% { transform: translateX(6px); }
    }
    .animate-shake {
      animation: shakeInput 0.4s ease-in-out;
      border-color: #F87171 !important;
      background-color: #FEF2F2 !important;
    }
    .bloom-canvas {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 100;
      width: 100%;
      height: 100%;
    }
    body {
      font-family: 'Fredoka', 'Quicksand', sans-serif;
      background: linear-gradient(135deg, #FFF5F7 0%, #FFE9ED 50%, #FFF0F5 100%);
      color: #5A3A42;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow-x: hidden;
      position: relative;
    }
    .floating-hearts-container {
      position: fixed;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 1;
    }
    .heart-particle {
      position: absolute;
      bottom: -40px;
      animation: floatUp linear infinite;
      opacity: 0.55;
      will-change: transform, opacity;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
    }
    @keyframes floatUp {
      0% { transform: translate3d(0, 0, 0) scale(0.6) rotate(0deg); opacity: 0; }
      15% { opacity: 0.6; }
      85% { opacity: 0.6; }
      100% { transform: translate3d(0, -115vh, 0) scale(1.1) rotate(30deg); opacity: 0; }
    }
    .app-card {
      position: relative;
      z-index: 10;
      width: 92%;
      max-width: 490px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 32px;
      box-shadow: 0 15px 35px rgba(255, 154, 162, 0.25);
      border: 3px dashed rgba(253, 164, 175, 0.9);
      padding: 28px 24px;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .screen {
      display: none;
      animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
    .screen.active {
      display: block;
    }
    @keyframes popIn {
      from { opacity: 0; transform: scale(0.92) translateY(12px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    h1, h2, h3 {
      font-family: 'Fredoka', cursive, sans-serif;
      font-weight: 700;
      color: #d6336c;
      text-shadow: 2px 2px 0px rgba(255, 182, 193, 0.6);
      margin-bottom: 14px;
      line-height: 1.25;
      letter-spacing: 0.5px;
    }
    .lead-text {
      font-family: 'Fredoka', sans-serif;
      font-size: 1.4rem;
      font-weight: 700;
      color: #744253;
      margin-bottom: 18px;
    }
    p, span, div, label {
      font-family: 'Quicksand', sans-serif;
      color: #6b4f4f;
    }
    .gif-container {
      width: 100%;
      max-width: 220px;
      margin: 0 auto 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .gif-img {
      width: 100%;
      max-width: 220px;
      height: auto;
      border-radius: 16px;
      margin: 0 auto;
      display: block;
      filter: drop-shadow(0 8px 16px rgba(244, 63, 94, 0.15));
    }
    .btn-group {
      display: flex;
      gap: 16px;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      position: relative;
      min-height: 60px;
    }
    .btn-primary {
      background: linear-gradient(135deg, #FB7185, #E11D48);
      color: white;
      border: none;
      border-radius: 50px;
      padding: 14px 34px;
      font-size: 1.05rem;
      font-family: 'Fredoka', sans-serif;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      cursor: pointer;
      box-shadow: 0 8px 18px rgba(225, 29, 72, 0.35);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .btn-primary:hover {
      transform: translateY(-3px) scale(1.04);
      box-shadow: 0 12px 22px rgba(225, 29, 72, 0.45);
    }
    .btn-primary:active {
      transform: scale(0.96);
    }
    .btn-secondary {
      background: #E2E8F0;
      color: #6b4f4f;
      border: none;
      border-radius: 50px;
      padding: 14px 30px;
      font-size: 1rem;
      font-family: 'Fredoka', sans-serif;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      cursor: pointer;
      transition: transform 0.2s ease;
      position: relative;
    }
    .floating-stamp-btn {
      position: absolute;
      right: -10px;
      bottom: -15px;
      background: #FFE4E6;
      border: 3px dashed #FB7185;
      color: #E11D48;
      border-radius: 50%;
      width: 76px;
      height: 76px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.85rem;
      cursor: pointer;
      box-shadow: 0 6px 16px rgba(244, 63, 94, 0.25);
      transition: all 0.2s ease;
    }
    .floating-stamp-btn:hover {
      transform: scale(1.1) rotate(8deg);
      background: #FECDD3;
    }
    /* Scrapbook Letter */
    .locked-card {
      background: #FFFDF9;
      border: 2px dashed #FBCFE8;
      border-radius: 24px;
      padding: 24px 20px;
      position: relative;
      box-shadow: 0 10px 24px rgba(244, 63, 94, 0.12);
      text-align: center;
    }
    .lock-icon-badge {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: linear-gradient(135deg, #FB7185, #F43F5E);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      color: #FFF;
      box-shadow: 0 4px 12px rgba(244, 63, 94, 0.35);
      border: 2px solid #FFF;
      margin: 6px auto 12px;
    }
    .lock-title {
      font-family: 'Sniglet', cursive, sans-serif;
      font-size: 1.25rem;
      font-weight: 800;
      color: #E11D48;
      line-height: 1.35;
      margin-bottom: 10px;
    }
    .hint-pill-box {
      background: rgba(255, 241, 242, 0.95);
      border: 1px solid #FECDD3;
      border-radius: 16px;
      padding: 8px 14px;
      display: inline-block;
      max-width: 95%;
      margin: 6px auto 14px;
      font-size: 0.85rem;
      font-weight: 600;
      color: #BE123C;
      line-height: 1.4;
    }
    .password-input-wrap {
      margin: 8px auto 12px;
      max-width: 280px;
    }
    .password-input-field {
      width: 100%;
      padding: 12px 16px;
      border-radius: 18px;
      border: 2px solid #FECDD3;
      background: #FFFFFF;
      text-align: center;
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: 3px;
      color: #881337;
      outline: none;
      transition: all 0.2s ease;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.03);
    }
    .password-input-field:focus {
      border-color: #FB7185;
      box-shadow: 0 0 0 3px rgba(251, 113, 133, 0.2);
    }
    .password-error-msg {
      font-size: 0.82rem;
      font-weight: 700;
      color: #E11D48;
      margin-top: 6px;
      min-height: 20px;
    }
    .badge-special {
      font-size: 0.72rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      background: #FFF1F2;
      color: #E11D48;
      padding: 4px 10px;
      border-radius: 9999px;
      border: 1px solid #FECDD3;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .letter-section-box {
      background: rgba(255, 241, 242, 0.45);
      border: 1px solid rgba(254, 205, 211, 0.6);
      border-radius: 16px;
      padding: 12px;
      margin: 10px 0;
    }
    .letter-section-title {
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #FB7185;
      margin-bottom: 4px;
    }
    .scrapbook-container {
      background: #FFFDF9;
      border: 2px dashed #FBCFE8;
      border-radius: 20px;
      padding: 22px 18px;
      position: relative;
      box-shadow: inset 0 0 20px rgba(254, 215, 226, 0.3), 0 8px 18px rgba(0,0,0,0.04);
      text-align: left;
    }
    .washi-tape-top {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 90px;
      height: 24px;
      background: rgba(253, 164, 175, 0.7);
      clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
    }
    .letter-title {
      text-align: center;
      font-size: 1.5rem;
      font-family: 'Fredoka', cursive, sans-serif;
      font-weight: 700;
      color: #d6336c;
      text-shadow: 1px 1px 0px rgba(255, 182, 193, 0.6);
      margin-bottom: 12px;
      letter-spacing: 1px;
    }
    .letter-body {
      font-family: 'Gaegu', cursive, sans-serif;
      font-size: 1.25rem;
      line-height: 1.7;
      color: #4a3b32;
    }
    .letter-signature {
      margin-top: 14px;
      text-align: right;
      font-family: 'Caveat', cursive;
      font-size: 1.6rem;
      color: #d6336c;
      font-weight: 700;
    }
    .stickers-badge {
      display: flex;
      justify-content: space-around;
      font-size: 1.5rem;
      margin: 12px 0 6px;
    }
    /* Heart Collage */
    .photo-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      max-width: 280px;
      margin: 14px auto;
      border: 4px solid #FFE4E6;
      border-radius: 20px;
      padding: 8px;
      background: #FFF1F2;
    }
    .collage-img {
      width: 100%;
      height: 95px;
      object-fit: cover;
      border-radius: 12px;
    }
    .date-badge {
      display: inline-block;
      background: #FFE4E6;
      color: #9F1239;
      padding: 6px 18px;
      border-radius: 9999px;
      font-weight: 700;
      font-size: 1.05rem;
      margin: 12px 0 16px;
      border: 1px solid #FECDD3;
    }
    /* Music Floating Button */
    .music-btn {
      position: fixed;
      top: 18px;
      right: 18px;
      background: white;
      border: 2px solid #FECDD3;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(244, 63, 94, 0.2);
      z-index: 100;
      transition: transform 0.2s ease;
    }
    .music-btn:hover {
      transform: scale(1.1);
    }
    .music-spinning {
      animation: spin 3s linear infinite;
    }
    @keyframes spin {
      100% { transform: rotate(360deg); }
    }
    .hug-counter-badge {
      background: #FFE4E6;
      border-radius: 9999px;
      padding: 8px 18px;
      color: #E11D48;
      font-weight: 700;
      display: inline-block;
      margin-top: 14px;
    }
    .celebration-overlay {
      position: fixed;
      inset: 0;
      background: rgba(255, 241, 242, 0.95);
      backdrop-filter: blur(8px);
      z-index: 200;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      text-align: center;
    }
    .celebration-overlay.active {
      display: flex;
      animation: popIn 0.5s ease forwards;
    }
  </style>
</head>
<body>

  <!-- Floating Heart Background -->
  <div class="floating-hearts-container" id="heartsContainer"></div>

  <!-- Music Toggle Button -->
  <button class="music-btn" id="musicBtn" title="Play / Pause Romantic BGM">🎵</button>
  <audio id="bgmAudio" loop src="${config.customMusicUrl}"></audio>

  <!-- Main Card -->
  <div class="app-card">

    <!-- Screen 1: Initial Question -->
    <div class="screen active" id="screen1">
      <div class="lead-text">I made something special for u, do u wanna see it? 💖</div>
      <div class="gif-container">
        ${renderStickerHtml('IMG_4668.jpeg', 'First Page Sticker', 'First Page (668)')}
      </div>
      <div class="btn-group" id="btnGroup1">
        <button class="btn-primary" id="btnYes1">YES! 🌸</button>
        <button class="btn-secondary" id="btnNo1">No 🙈</button>
      </div>
    </div>

    <!-- Screen 1.5: Oops / Mad Screen -->
    <div class="screen" id="screenOops">
      <h2 style="color: #E11D48; font-size: 1.5rem;">Why did u click no!? 🥺</h2>
      <div class="gif-container">
        ${renderStickerHtml('IMG_4669.jpeg', 'First No Page Sticker', 'First No Page (4669)')}
      </div>
      <p style="color: #881337; font-weight: 600; margin-bottom: 20px;">Bear is pouting now! You have to say yes~ 😤</p>
      <button class="btn-primary" id="btnTryAgain">TRY AGAIN 💖</button>
    </div>

    <!-- Screen 2: Birthday Celebration -->
    <div class="screen" id="screen2">
      <h1 style="font-size: 1.85rem;">HAPPY BIRTHDAY 🎉🎂</h1>
      <div class="gif-container">
        ${renderStickerHtml('IMG_4670.jpeg', 'Happy Birthday Sticker', 'Happy Birthday Page (4670)')}
      </div>
      <div style="font-size: 1.4rem; font-weight: 700; color: #BE123C; margin-bottom: 30px;">
        ${config.birthdayWish}
      </div>
      <button class="floating-stamp-btn" id="btnNext2">
        <span>Click</span>
        <span>Me 🌸</span>
      </button>
    </div>

    <!-- Radial Flower Blooming Canvas (Step A: Triggers on correct password) -->
    <canvas id="bloomCanvas" class="bloom-canvas" style="display: none;"></canvas>

    <!-- Screen 3: Secret Password Lock & Unfolded Love Letter -->
    <div class="screen" id="screen3">
      <!-- Curious Bubu Dudu Mascot on top -->
      <div class="gif-container" style="height: 140px; margin-bottom: 6px;">
        ${renderStickerHtml('IMG_4668.jpeg', 'Letter Mascot Sticker', 'Letter Mascot (668)')}
      </div>

      <!-- 1. Initial Locked State (Password Screen) -->
      <div class="locked-card" id="letterLockedBox">
        <div class="washi-tape-top"></div>
        <div class="lock-icon-badge">🔒</div>
        <h2 class="lock-title">Psst... This letter is password protected! 🔒💌</h2>
        <div class="hint-pill-box">
          ${config.letterHint || 'Hint: The day our beautiful story began 💍 (DDMM format)'}
        </div>
        <div class="password-input-wrap">
          <input
            type="password"
            id="passwordInput"
            class="password-input-field"
            placeholder="Enter the secret key..."
            autocomplete="off"
          />
          <div id="passwordError" class="password-error-msg"></div>
        </div>
        <button class="btn-primary" id="btnUnlockHeart" style="margin-top: 4px; padding: 12px 26px;">
          Unlock My Heart 💖
        </button>
      </div>

      <!-- 2. Unlocked State (Envelope Unfold & Letter Reveal) -->
      <div class="scrapbook-container font-itim" id="letterUnlockedBox" style="display: none; font-size: 1.1rem;">
        <div class="washi-tape-top" style="width: 200px; font-size: 11px; font-weight: bold; color: rgba(159, 18, 57, 0.85); display: flex; align-items: center; justify-content: center; font-family: 'Fredoka', sans-serif; letter-spacing: 1px; white-space: nowrap;">♡ WITH ALL MY LOVE ♡</div>
        <!-- Cute Scrapbook Badges (Guaranteed Single Line!) -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; padding: 4px 2px 10px; font-size: 1.25rem;">
          <span>📸</span>
          <span>🍭</span>
          <span class="badge-special">★ Special Delivery ★</span>
          <span>🍒</span>
          <span>💖</span>
        </div>

        <div class="letter-title">${config.letterTitle}</div>

        <div class="letter-body font-itim" style="font-size: 1.1rem; line-height: 1.65;">
          <p style="margin-bottom: 8px; font-weight: 800; font-size: 1.2rem; color: #881337; font-family: 'Fredoka', sans-serif;">${config.letterGreeting}</p>
          
          <div class="letter-section-box">
            <p style="color: #4A353B;">${config.letterParagraph1}</p>
          </div>

          <!-- Polaroid Memory Frame -->
          <div style="margin: 12px auto; text-align: center; max-width: 220px; background: #fff; padding: 8px 8px 12px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.08); border: 1px solid rgba(254, 205, 211, 0.8);">
            <div style="width: 100%; aspect-ratio: 4/3; border-radius: 8px; overflow: hidden; background: #FFF1F2;">
              <img src="${config.photos?.photo1 || ''}" alt="Our First Date" referrerpolicy="no-referrer" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\\'http://www.w3.org/2000/svg\\\' viewBox=\\\'0 0 160 160\\\'><rect width=\\\'160\\\' height=\\\'160\\\' fill=\\\'%23FFE4E6\\\'/><text x=\\\'80\\\' y=\\\'80\\\' font-size=\\\'36\\\' text-anchor=\\\'middle\\\'>🌸</text><text x=\\\'80\\\' y=\\\'120\\\' font-size=\\\'13\\\' font-weight=\\\'bold\\\' fill=\\\'%23E11D48\\\' text-anchor=\\\'middle\\\'>loading soooon 💕</text></svg>'" />
            </div>
            <div style="margin-top: 6px; font-family: 'Caveat', cursive; font-size: 1.15rem; font-weight: bold; color: #BE123C; text-align: center;">loading soooon 💕</div>
          </div>

          <div class="letter-section-box" style="background: rgba(254, 243, 199, 0.4); border-color: rgba(253, 230, 138, 0.7);">
            <p style="color: #4A353B;">${config.letterParagraph2}</p>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px;">
            <div>
              <p style="font-size: 0.9rem; color: #78716C; font-weight: 600;">${config.letterClosing}</p>
              <div class="letter-signature" style="text-align: left; margin-top: 2px;">${config.letterSignature}</div>
            </div>
            <div style="font-size: 2rem;">💌🌸</div>
          </div>
        </div>

        <div style="margin-top: 20px; text-align: center; border-top: 1px solid #FFE4E6; padding-top: 10px; font-size: 11px; color: #A8A29E;">
          💌 Sealed with eternal hugs & kisses
        </div>

        <div style="margin-top: 16px; text-align: center;">
          <button class="btn-primary" id="btnNext3">Next Surprise ➜</button>
        </div>
      </div>
    </div>

    <!-- Screen 4: Virtual Hug / I Miss You -->
    <div class="screen" id="screen4">
      <h1 style="font-size: 1.7rem;">Virtual hug for ya! 🤗</h1>
      <div class="gif-container">
        ${renderStickerHtml('IMG_4671.jpeg', 'Virtual Hug Sticker', 'Hug Page (4671)')}
      </div>
      <div style="font-size: 1.6rem; font-weight: 800; color: #BE123C; margin-bottom: 12px;">
        ${config.missYouText}
      </div>
      <div>
        <button class="btn-primary" id="btnSendHug" style="padding: 10px 24px; font-size: 1rem;">
          Tap for Extra Hugs 🫂
        </button>
      </div>
      <div class="hug-counter-badge" id="hugBadge">Sent 0 warm hugs 💕</div>
      <div style="margin-top: 22px;">
        <button class="btn-secondary" id="btnNext4" style="background: #FFE4E6; color: #9F1239;">Next ✨</button>
      </div>
    </div>

    <!-- Screen 5: Final Proposal -->
    <div class="screen" id="screen5">
      <h1 style="font-size: 1.8rem; font-family: 'Fredoka', cursive, sans-serif; color: #d6336c; text-shadow: 2px 2px 0px rgba(255, 182, 193, 0.6);">${config.proposalQuestion}</h1>
      
      <!-- Single Keepsake Photo Frame (Base64 enabled) -->
      <div style="margin: 16px auto; max-width: 270px; background: #ffffff; padding: 10px 10px 14px; border-radius: 20px; border: 3px dashed #FDA4AF; box-shadow: 0 8px 22px rgba(251, 113, 133, 0.2); position: relative; transform: rotate(-1deg); transition: transform 0.3s ease;">
        <div style="width: 100%; aspect-ratio: 4/3; border-radius: 14px; overflow: hidden; background: #FFF1F2; display: flex; align-items: center; justify-content: center;">
          ${proposalPhotoHtml}
        </div>
        <div style="margin-top: 8px; font-family: 'Caveat', cursive; font-size: 1.25rem; font-weight: bold; color: #d6336c; text-align: center;">
          Our Forever Memory 🌸
        </div>
      </div>

      <div class="date-badge">✨ Special Date: ${config.specialDate} ✨</div>
      <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 10px;">
        <button class="btn-secondary" id="btnProposalYes1" style="font-size: 1.05rem; background: #FFE4E6; color: #d6336c; border: 2px solid #FECDD3;">YES</button>
        <button class="btn-primary" id="btnProposalYes2" style="background: linear-gradient(135deg, #F43F5E, #BE123C); font-size: 1.15rem;">A million times YES! 💖</button>
      </div>
    </div>

    <!-- Screen 5.5: Playful Sad Screen for regular YES -->
    <div class="screen" id="screenSad">
      <div style="font-size: 2.2rem; margin-bottom: 6px;">💔🥺</div>
      <h2 style="color: #E11D48; font-size: 1.55rem; margin-bottom: 8px;">Just a regular YES? 🥺💔</h2>
      <div class="gif-container">
        ${renderStickerHtml('IMG_4669.jpeg', 'Regular Yes Sad Sticker', 'Last Yes Reaction (4669)')}
      </div>
      <p style="color: #5A3A42; font-weight: 500; font-size: 0.95rem; line-height: 1.5; margin-bottom: 24px; padding: 0 8px;">
        After all this effort, only a simple yes?! That hurts my little heart... Go back and think properly! 😭
      </p>
      <button class="btn-primary" id="btnReconsider" style="padding: 12px 28px; font-size: 1.05rem;">Let me reconsider 🥺</button>
    </div>

  </div>

  <!-- Grand Acceptance Overlay for 'A million times YES! 💖' -->
  <div class="celebration-overlay" id="celebrationOverlay">
    <div style="display: flex; gap: 8px; font-size: 1.8rem; margin-bottom: 6px;">
      <span>🎉</span><span>💍</span><span>✨</span><span>🥰</span>
    </div>
    <div style="font-size: 1.75rem; font-weight: 800; color: #E11D48; margin-bottom: 10px; line-height: 1.3; max-width: 380px;">
      YAYYY! You just made me the happiest person in the universe! 💍✨🥰
    </div>
    <div class="gif-container">
      ${renderStickerHtml('IMG_4671.jpeg', 'Million Times Yes Celebration Sticker', 'Page After Clicking Million Times Yes (4671)')}
    </div>
    <div class="date-badge" style="margin-bottom: 12px;">✨ Sealed on our special date: ${config.specialDate} ✨</div>
    <p style="font-size: 1.25rem; color: #881337; font-weight: 700; margin-bottom: 6px;">
      Forever & Always with you! 🐼❤️🐻
    </p>
    <p style="font-size: 0.9rem; color: #5A3A42; font-weight: 500; margin-bottom: 22px; max-width: 320px;">
      Here's to a lifetime filled with sweet giggles, cozy hugs, and endless love!
    </p>
    <div style="display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 280px;">
      <button class="btn-primary" id="btnMoreFireworks" style="padding: 11px 24px; font-size: 0.95rem;">More Fireworks! 🎆</button>
      <button class="btn-secondary" id="btnReplay" style="padding: 11px 24px; font-size: 0.95rem; background: #FFE4E6; color: #9F1239;">Replay the Surprise 🎁</button>
    </div>
  </div>

  <script>
    // Audio synthesizer & player
    let audioPlaying = false;
    const bgmAudio = document.getElementById('bgmAudio');
    const musicBtn = document.getElementById('musicBtn');

    // Web Audio Fallback Synthesizer
    let audioCtx = null;
    let synthTimer = null;
    const NOTES = [523.25, 659.25, 783.99, 1046.50, 493.88, 587.33, 783.99, 987.77, 440, 523.25, 659.25, 880, 523.25, 659.25, 783.99, 1046.50];

    function startSynth() {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      let i = 0;
      function step() {
        if (!audioPlaying) return;
        try {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(NOTES[i % NOTES.length], audioCtx.currentTime);
          gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 1.2);
        } catch(e) {}
        i++;
        synthTimer = setTimeout(step, 450);
      }
      step();
    }

    function toggleMusic() {
      audioPlaying = !audioPlaying;
      if (audioPlaying) {
        musicBtn.classList.add('music-spinning');
        musicBtn.textContent = '🎶';
        bgmAudio.play().catch(function() {
          startSynth();
        });
      } else {
        musicBtn.classList.remove('music-spinning');
        musicBtn.textContent = '🎵';
        bgmAudio.pause();
        clearTimeout(synthTimer);
      }
    }
    musicBtn.addEventListener('click', toggleMusic);

    // Floating heart particles generator
    const heartsContainer = document.getElementById('heartsContainer');
    const heartIcons = ['💖', '💕', '🌸', '✨', '🍓', '🧸'];
    function createFloatingHeart() {
      const h = document.createElement('div');
      h.className = 'heart-particle';
      h.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
      h.style.left = Math.random() * 96 + 'vw';
      h.style.fontSize = (Math.random() * 16 + 14) + 'px';
      h.style.animationDuration = (Math.random() * 5 + 6) + 's';
      heartsContainer.appendChild(h);
      setTimeout(() => h.remove(), 12000);
    }
    setInterval(createFloatingHeart, 600);

    // Screen Switching Navigation
    function showScreen(screenId) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      const target = document.getElementById(screenId);
      if (target) target.classList.add('active');
    }

    // Runaway NO Button logic with attempt counter and mobile+desktop support
    let noAttempts = 0;
    const maxAttempts = 5;
    const btnNo1 = document.getElementById('btnNo1');
    const btnYes1 = document.getElementById('btnYes1');

    function resetNoButton() {
      noAttempts = 0;
      btnNo1.style.position = '';
      btnNo1.style.left = '';
      btnNo1.style.top = '';
      btnNo1.style.zIndex = '';
      btnNo1.style.transform = '';
      btnNo1.style.transition = '';
      btnYes1.style.transform = 'scale(1)';
    }

    function moveNoButton(e) {
      if (noAttempts < maxAttempts) {
        if (e && e.cancelable) e.preventDefault();
        noAttempts++;

        // Make YES button grow slightly bigger with each attempt
        const yesScale = 1 + noAttempts * 0.08;
        btnYes1.style.transform = \`scale(\${yesScale})\`;
        btnYes1.style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';

        const padding = 24;
        const btnW = btnNo1.offsetWidth || 100;
        const btnH = btnNo1.offsetHeight || 46;

        const maxW = Math.max(window.innerWidth - btnW - padding, padding);
        const maxH = Math.max(window.innerHeight - btnH - padding, padding);

        const yesRect = btnYes1.getBoundingClientRect();
        let targetX = padding;
        let targetY = padding;
        let safety = 0;

        while (safety < 30) {
          targetX = Math.floor(Math.random() * (maxW - padding)) + padding;
          targetY = Math.floor(Math.random() * (maxH - padding)) + padding;

          // Prevent overlap with YES button
          const overlapX = targetX < yesRect.right + 45 && targetX + btnW > yesRect.left - 45;
          const overlapY = targetY < yesRect.bottom + 45 && targetY + btnH > yesRect.top - 45;
          if (!overlapX || !overlapY) break;
          safety++;
        }

        btnNo1.style.position = 'fixed';
        btnNo1.style.left = targetX + 'px';
        btnNo1.style.top = targetY + 'px';
        btnNo1.style.zIndex = '999';
        btnNo1.style.transition = 'top 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }
    }

    // Desktop hover
    btnNo1.addEventListener('mouseover', (e) => {
      if (noAttempts < maxAttempts) {
        moveNoButton(e);
      }
    });

    // Mobile touch
    btnNo1.addEventListener('touchstart', (e) => {
      if (noAttempts < maxAttempts) {
        moveNoButton(e);
      }
    }, { passive: false });

    // Click handler for both PC & Mobile
    btnNo1.addEventListener('click', (e) => {
      if (noAttempts < maxAttempts) {
        moveNoButton(e);
      } else {
        // 5 attempts completed: allow click to fire navigation
        showScreen('screenOops');
      }
    });

    // Screen 1: Yes clicked
    document.getElementById('btnYes1').addEventListener('click', () => {
      if (!audioPlaying) toggleMusic();
      showScreen('screen2');
      if (window.confetti) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    });

    // Screen 1.5: Try Again
    document.getElementById('btnTryAgain').addEventListener('click', () => {
      resetNoButton();
      showScreen('screen1');
    });

    // Screen 2: Next
    document.getElementById('btnNext2').addEventListener('click', () => {
      showScreen('screen3');
    });

    // =========================================================================
    // 🔒 Screen 3: Secret Password Lock & Radial Flower Blooming Animation
    // =========================================================================
    // Change the secret password below (e.g. DDMM format like "2802", anniversary, or birthday)
    const SECRET_KEY = "${config.letterSecretKey || '2802'}";

    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    const btnUnlockHeart = document.getElementById('btnUnlockHeart');
    const letterLockedBox = document.getElementById('letterLockedBox');
    const letterUnlockedBox = document.getElementById('letterUnlockedBox');
    const bloomCanvas = document.getElementById('bloomCanvas');

    function triggerRadialFlowerBloom() {
      if (!bloomCanvas) return;
      bloomCanvas.style.display = 'block';
      const ctx = bloomCanvas.getContext('2d');
      if (!ctx) return;

      let width = (bloomCanvas.width = window.innerWidth);
      let height = (bloomCanvas.height = window.innerHeight);
      const centerX = width / 2;
      const centerY = height / 2;

      const colors = ['#FFB7B2', '#FFDAC1', '#E2F0CB', '#FF9AA2', '#FFC6FF', '#FFF0F5', '#FFD1DC'];
      const goldSparkles = ['#FFE066', '#FFD166', '#FFF3B0', '#FFFFFF'];
      const particles = [];
      const totalParticles = 75;

      for (let i = 0; i < totalParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.5 + Math.random() * 8.5;
        const type = Math.random() > 0.4 ? (Math.random() > 0.5 ? 'flower' : 'petal') : 'sparkle';
        particles.push({
          x: centerX + (Math.random() - 0.5) * 20,
          y: centerY + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.12,
          size: type === 'flower' ? 12 + Math.random() * 16 : (type === 'petal' ? 7 + Math.random() * 9 : 3 + Math.random() * 5),
          color: type === 'sparkle' ? goldSparkles[Math.floor(Math.random() * goldSparkles.length)] : colors[Math.floor(Math.random() * colors.length)],
          petalCount: 5 + Math.floor(Math.random() * 2),
          opacity: 1,
          type: type,
          decay: 0.007 + Math.random() * 0.009
        });
      }

      let startTime = null;
      const duration = 2500;

      function animateBloom(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(1, elapsed / duration);

        ctx.clearRect(0, 0, width, height);

        // Concentric radial expanding ripples
        const maxRadius = Math.max(width, height) * 0.85;
        for (let r = 0; r < 3; r++) {
          const offsetProgress = Math.max(0, Math.min(1, progress * 1.5 - r * 0.18));
          if (offsetProgress > 0 && offsetProgress < 1) {
            const currentRadius = offsetProgress * maxRadius;
            const ringOpacity = Math.sin(offsetProgress * Math.PI) * 0.35;
            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
            ctx.strokeStyle = r % 2 === 0 ? 'rgba(255, 182, 193, ' + ringOpacity + ')' : 'rgba(255, 218, 185, ' + ringOpacity + ')';
            ctx.lineWidth = 3 * (1 - offsetProgress) + 1;
            ctx.stroke();
            ctx.restore();
          }
        }

        // Central core blooming blossom
        const coreScale = Math.min(1, progress * 2.2);
        const coreOpacity = progress < 0.6 ? 1 : Math.max(0, 1 - (progress - 0.6) / 0.4);
        const coreRadius = 45 * coreScale;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(progress * 1.5);
        ctx.globalAlpha = coreOpacity * 0.9;
        for (let p = 0; p < 6; p++) {
          ctx.save();
          ctx.rotate((p * Math.PI * 2) / 6);
          const grad = ctx.createRadialGradient(0, coreRadius * 0.6, 2, 0, coreRadius * 0.6, coreRadius * 0.8);
          grad.addColorStop(0, '#FFF0F5');
          grad.addColorStop(0.5, '#FFB7B2');
          grad.addColorStop(1, '#FF8096');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.ellipse(0, coreRadius * 0.6, coreRadius * 0.45, coreRadius * 0.65, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        ctx.beginPath();
        ctx.arc(0, 0, coreRadius * 0.28, 0, Math.PI * 2);
        ctx.fillStyle = '#FFE066';
        ctx.fill();
        ctx.restore();

        // Flying flower petals and golden sparkles
        for (let i = 0; i < particles.length; i++) {
          const pt = particles[i];
          pt.vx *= 0.985;
          pt.vy *= 0.985;
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.rotation += pt.vRot;
          pt.opacity = Math.max(0, pt.opacity - pt.decay);
          if (pt.opacity <= 0) continue;

          ctx.save();
          ctx.translate(pt.x, pt.y);
          ctx.rotate(pt.rotation);
          ctx.globalAlpha = pt.opacity;
          ctx.fillStyle = pt.color;

          if (pt.type === 'sparkle') {
            const s = pt.size;
            ctx.beginPath();
            ctx.moveTo(0, -s);
            ctx.quadraticCurveTo(0, 0, s, 0);
            ctx.quadraticCurveTo(0, 0, 0, s);
            ctx.quadraticCurveTo(0, 0, -s, 0);
            ctx.quadraticCurveTo(0, 0, 0, -s);
            ctx.fill();
          } else if (pt.type === 'flower') {
            const r = pt.size;
            for (let k = 0; k < pt.petalCount; k++) {
              ctx.save();
              ctx.rotate((k * Math.PI * 2) / pt.petalCount);
              ctx.beginPath();
              ctx.ellipse(0, r * 0.5, r * 0.35, r * 0.5, 0, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
            ctx.beginPath();
            ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
            ctx.fillStyle = '#FFE57F';
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.ellipse(0, 0, pt.size * 0.45, pt.size, 0, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }

        if (progress < 1) {
          requestAnimationFrame(animateBloom);
        } else {
          bloomCanvas.style.display = 'none';
        }
      }

      requestAnimationFrame(animateBloom);
    }

    function handlePasswordUnlock() {
      const inputVal = (passwordInput.value || '').trim().toLowerCase();
      const targetVal = SECRET_KEY.trim().toLowerCase();

      if (inputVal === targetVal) {
        // Correct password!
        passwordError.textContent = '';
        letterLockedBox.style.display = 'none';
        letterUnlockedBox.style.display = 'block';
        triggerRadialFlowerBloom();
        if (window.confetti) {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#FFC6FF']
          });
        }
      } else {
        // Incorrect password!
        passwordInput.classList.add('animate-shake');
        passwordError.textContent = "Hehe wrong answer! Think harder, my cutie! 🙈";
        passwordInput.value = '';
        setTimeout(() => {
          passwordInput.classList.remove('animate-shake');
        }, 500);
      }
    }

    if (btnUnlockHeart && passwordInput) {
      btnUnlockHeart.addEventListener('click', handlePasswordUnlock);
      passwordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handlePasswordUnlock();
      });
    }

    // Screen 3: Next button (proceed to Step 4)
    const btnNext3 = document.getElementById('btnNext3');
    if (btnNext3) {
      btnNext3.addEventListener('click', () => {
        showScreen('screen4');
      });
    }

    // Screen 4: Hug counter & Next
    let hugCount = 0;
    const hugBadge = document.getElementById('hugBadge');
    document.getElementById('btnSendHug').addEventListener('click', () => {
      hugCount++;
      hugBadge.textContent = \`Sent \${hugCount} warm hugs 💕\`;
      if (window.confetti) {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.7 }
        });
      }
    });
    document.getElementById('btnNext4').addEventListener('click', () => {
      showScreen('screen5');
    });

    // Screen 5: Acceptance Logic
    // Button 1: Simple "YES" -> Playful sad/dramatic screen (NO confetti)
    document.getElementById('btnProposalYes1').addEventListener('click', () => {
      showScreen('screenSad');
    });

    // Screen 5.5: "Let me reconsider 🥺" -> Return smoothly to Step 5
    document.getElementById('btnReconsider').addEventListener('click', () => {
      showScreen('screen5');
    });

    // Button 2: "A million times YES! 💖" -> Grand Finale!
    function fireHeartConfetti() {
      if (!window.confetti) return;
      const count = 200;
      const defaults = { origin: { y: 0.7 } };

      function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio)
        }));
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });

      const end = Date.now() + 3000;
      const interval = setInterval(function() {
        if (Date.now() > end) return clearInterval(interval);
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: { x: Math.random(), y: Math.random() - 0.2 }
        });
      }, 250);
    }

    document.getElementById('btnProposalYes2').addEventListener('click', () => {
      fireHeartConfetti();
      document.getElementById('celebrationOverlay').classList.add('active');
    });

    document.getElementById('btnMoreFireworks').addEventListener('click', () => {
      fireHeartConfetti();
    });

    document.getElementById('btnReplay').addEventListener('click', () => {
      document.getElementById('celebrationOverlay').classList.remove('active');
      resetNoButton();
      showScreen('screen1');
    });
  </script>
</body>
</html>`;
}
