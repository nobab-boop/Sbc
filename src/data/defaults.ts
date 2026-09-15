import { AppCustomization } from '../types';

export const DEFAULT_CUSTOMIZATION: AppCustomization = {
  recipientName: "Prottushona",
  specialDate: "05 06 26",
  birthdayWish: "I am ur gift 🎁",
  letterTitle: "MY WISH FOR U",
  letterGreeting: "Dearest Prottushona,",
  letterParagraph1: "Happy Birthday to the sweetest, most wonderful human in the entire universe! Every single day with you feels like sunshine after rain. Thank you for filling my life with your gentle giggles, endless warmth, and all our silly little memories.",
  letterParagraph2: "My deepest wish for you today is a year overflowing with peace, immense joy, and dreams coming true. No matter what tomorrow holds, know that I'm always right here cheering for you, admiring you, and loving you more than words could ever say.",
  letterClosing: "Forever and always yours,",
  letterSignature: "Your Nafimshona ❤️",
  letterSecretKey: "0506",
  letterHint: "Hint: The day our beautiful story began 💍",
  missYouText: "I MISS YOU, PROTTUSHONA ❤️",
  proposalQuestion: "Will you be mine, Prottushona? 💖",
  customMusicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=sweet-love-112199.mp3",
  photos: {
    photo1: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'><rect width='160' height='160' fill='%23FFE4E6'/><circle cx='80' cy='65' r='36' fill='%23FDA4AF' opacity='0.6'/><text x='80' y='74' font-size='34' text-anchor='middle'>🌸</text><rect x='20' y='115' width='120' height='26' rx='13' fill='%23FFF1F2'/><text x='80' y='132' font-size='12' font-weight='bold' fill='%23BE123C' text-anchor='middle'>First Date 💕</text></svg>",
    photo2: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'><rect width='160' height='160' fill='%23FEF3C7'/><circle cx='80' cy='65' r='36' fill='%23FDE68A' opacity='0.6'/><text x='80' y='74' font-size='34' text-anchor='middle'>🍰</text><rect x='20' y='115' width='120' height='26' rx='13' fill='%23FFFBEB'/><text x='80' y='132' font-size='12' font-weight='bold' fill='%23B45309' text-anchor='middle'>Sweet Treats 🧋</text></svg>",
    photo3: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'><rect width='160' height='160' fill='%23E0F2FE'/><circle cx='80' cy='65' r='36' fill='%23BAE6FD' opacity='0.6'/><text x='80' y='74' font-size='34' text-anchor='middle'>🌙</text><rect x='20' y='115' width='120' height='26' rx='13' fill='%23F0F9FF'/><text x='80' y='132' font-size='12' font-weight='bold' fill='%230369A1' text-anchor='middle'>Late Night Talks ✨</text></svg>",
    photo4: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'><rect width='160' height='160' fill='%23FCE7F3'/><circle cx='80' cy='65' r='36' fill='%23FBCFE8' opacity='0.6'/><text x='80' y='74' font-size='34' text-anchor='middle'>💍</text><rect x='20' y='115' width='120' height='26' rx='13' fill='%23FDF2F8'/><text x='80' y='132' font-size='12' font-weight='bold' fill='%23BE185D' text-anchor='middle'>Endless Love 💖</text></svg>",
  }
};

// Verified GitHub hosted Bubu & Dudu GIFs (No CORS/hotlinking restrictions)
export const GIF_URLS = {
  // Step 1: Start/Greeting - Cute sitting & waving
  initial: "https://raw.githubusercontent.com/manishiitg/bubu-dudu-stickers/main/stickers/bubu-dudu-1.gif",
  // Step 1.5: Oops/Mad/Pouting screen after clicking NO
  oops: "https://raw.githubusercontent.com/manishiitg/bubu-dudu-stickers/main/stickers/bubu-dudu-angry.gif",
  // Step 2: Birthday Cake Celebration
  birthday: "https://raw.githubusercontent.com/manishiitg/bubu-dudu-stickers/main/stickers/bubu-dudu-birthday.gif",
  // Step 3: Envelope / Secret Lock / Letter Screen
  letter: "https://raw.githubusercontent.com/manishiitg/bubu-dudu-stickers/main/stickers/bubu-dudu-curious.gif",
  // Step 4: Virtual Hug / I Miss You
  hug: "https://raw.githubusercontent.com/manishiitg/bubu-dudu-stickers/main/stickers/bubu-dudu-hug.gif",
  // Step 5: Sad Screen (After clicking ordinary "YES")
  crying: "https://raw.githubusercontent.com/manishiitg/bubu-dudu-stickers/main/stickers/bubu-dudu-crying.gif",
  // Step 5: Happy Finale (After clicking "A million times YES!")
  celebration: "https://raw.githubusercontent.com/manishiitg/bubu-dudu-stickers/main/stickers/bubu-dudu-love.gif"
};
