interface CharacterProps {
  className?: string;
}

// Screen 1: Curious Panda and Bear holding hands & waving
export function BubuDuduCurious({ className = "w-48 h-48 sm:w-56 sm:h-56" }: CharacterProps) {
  return (
    <svg viewBox="0 0 300 240" className={`object-contain select-none drop-shadow-md ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="blushPink" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6584" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FF6584" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="blushPeach" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FA8F54" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FA8F54" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Floating question & sparkle */}
      <g className="animate-cute-bounce">
        <text x="145" y="42" fontSize="28" fill="#E11D48" fontWeight="bold">💖</text>
        <text x="135" y="70" fontSize="20" fill="#FB7185" fontWeight="bold">?</text>
      </g>

      {/* DUDU (BROWN BEAR) - LEFT */}
      <g transform="translate(45, 55)">
        {/* Shadow */}
        <ellipse cx="60" cy="165" rx="45" ry="12" fill="#E2B4BD" opacity="0.4" />

        {/* Ears */}
        <circle cx="28" cy="35" r="18" fill="#B27854" />
        <circle cx="28" cy="35" r="11" fill="#FFCFD2" />
        <circle cx="92" cy="35" r="18" fill="#B27854" />
        <circle cx="92" cy="35" r="11" fill="#FFCFD2" />

        {/* Body */}
        <ellipse cx="60" cy="125" rx="38" ry="36" fill="#B27854" />
        {/* Tummy */}
        <ellipse cx="60" cy="130" rx="26" ry="24" fill="#FEEFE5" />

        {/* Feet */}
        <ellipse cx="38" cy="155" rx="14" ry="10" fill="#96603F" />
        <ellipse cx="82" cy="155" rx="14" ry="10" fill="#96603F" />

        {/* Head */}
        <ellipse cx="60" cy="65" rx="46" ry="40" fill="#B27854" />

        {/* Snout area */}
        <ellipse cx="60" cy="74" rx="22" ry="17" fill="#FEEFE5" />

        {/* Nose */}
        <ellipse cx="60" cy="68" rx="6" ry="4" fill="#3D281D" />

        {/* Mouth */}
        <path d="M54 74 Q60 81 66 74" fill="none" stroke="#3D281D" strokeWidth="2.5" strokeLinecap="round" />

        {/* Cheeks */}
        <circle cx="32" cy="74" r="10" fill="url(#blushPeach)" />
        <circle cx="88" cy="74" r="10" fill="url(#blushPeach)" />

        {/* Eyes */}
        <ellipse cx="42" cy="60" rx="5" ry="6" fill="#3D281D" />
        <circle cx="44" cy="58" r="2" fill="#FFFFFF" />
        <ellipse cx="78" cy="60" rx="5" ry="6" fill="#3D281D" />
        <circle cx="80" cy="58" r="2" fill="#FFFFFF" />

        {/* Left Arm waving */}
        <g className="animate-wiggle" style={{ transformOrigin: '20px 105px' }}>
          <path d="M26 115 Q10 95 18 80 Q28 85 32 105 Z" fill="#B27854" />
        </g>
        {/* Right Arm holding hand towards panda */}
        <path d="M85 115 Q105 125 118 120" fill="none" stroke="#B27854" strokeWidth="14" strokeLinecap="round" />
      </g>

      {/* BUBU (PANDA) - RIGHT */}
      <g transform="translate(145, 55)">
        {/* Shadow */}
        <ellipse cx="60" cy="165" rx="45" ry="12" fill="#E2B4BD" opacity="0.4" />

        {/* Black Ears */}
        <circle cx="28" cy="35" r="18" fill="#2E2729" />
        <circle cx="92" cy="35" r="18" fill="#2E2729" />

        {/* White Body */}
        <ellipse cx="60" cy="125" rx="38" ry="36" fill="#FFFFFF" stroke="#EAE0E2" strokeWidth="2" />
        {/* Black tummy stripe/vest */}
        <path d="M24 115 Q60 135 96 115 Q85 155 35 155 Z" fill="#2E2729" />

        {/* Feet */}
        <ellipse cx="38" cy="155" rx="14" ry="10" fill="#2E2729" />
        <ellipse cx="82" cy="155" rx="14" ry="10" fill="#2E2729" />

        {/* White Head */}
        <ellipse cx="60" cy="65" rx="46" ry="40" fill="#FFFFFF" stroke="#EFE4E6" strokeWidth="1.5" />

        {/* Black Eye Patches */}
        <ellipse cx="40" cy="62" rx="13" ry="15" fill="#2E2729" transform="rotate(-10 40 62)" />
        <ellipse cx="80" cy="62" rx="13" ry="15" fill="#2E2729" transform="rotate(10 80 62)" />

        {/* Sparkle Eyes */}
        <circle cx="40" cy="62" r="5" fill="#FFFFFF" />
        <circle cx="43" cy="59" r="2" fill="#FFFFFF" />
        <circle cx="80" cy="62" r="5" fill="#FFFFFF" />
        <circle cx="83" cy="59" r="2" fill="#FFFFFF" />

        {/* Nose */}
        <ellipse cx="60" cy="70" rx="5" ry="4" fill="#2E2729" />

        {/* Cute :3 Cat Mouth */}
        <path d="M53 76 Q57 80 60 76 Q63 80 67 76" fill="none" stroke="#2E2729" strokeWidth="2.5" strokeLinecap="round" />

        {/* Pink Cheeks */}
        <circle cx="28" cy="76" r="10" fill="url(#blushPink)" />
        <circle cx="92" cy="76" r="10" fill="url(#blushPink)" />

        {/* Left Arm holding Bear's hand */}
        <path d="M30 115 Q15 125 0 120" fill="none" stroke="#2E2729" strokeWidth="14" strokeLinecap="round" />

        {/* Right Arm holding pink heart flower */}
        <g className="animate-cute-bounce">
          <path d="M85 110 Q105 95 98 82" fill="none" stroke="#2E2729" strokeWidth="14" strokeLinecap="round" />
          <path d="M96 74 Q106 60 116 74 Q106 88 96 74" fill="#FF4D6D" />
          <circle cx="106" cy="74" r="5" fill="#FFD166" />
        </g>
      </g>
    </svg>
  );
}

// Screen 1.5: Angry / Pouting Dudu Bear
export function BubuDuduPouting({ className = "w-48 h-48 sm:w-56 sm:h-56" }: CharacterProps) {
  return (
    <svg viewBox="0 0 240 240" className={`object-contain select-none drop-shadow-md ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="poutRed" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="120" cy="215" rx="55" ry="14" fill="#F87171" opacity="0.3" />

      {/* Angry steam / pop mark */}
      <g className="animate-wiggle" transform="translate(165, 30)">
        <path d="M0 8 L16 8 M8 0 L8 16" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M14 2 L22 10 M22 2 L14 10" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Pouting Bear */}
      <g transform="translate(30, 20)">
        {/* Ears */}
        <circle cx="40" cy="40" r="22" fill="#A06742" />
        <circle cx="40" cy="40" r="13" fill="#FCA5A5" />
        <circle cx="140" cy="40" r="22" fill="#A06742" />
        <circle cx="140" cy="40" r="13" fill="#FCA5A5" />

        {/* Chubby Body */}
        <ellipse cx="90" cy="140" rx="50" ry="46" fill="#B27854" />
        <ellipse cx="90" cy="145" rx="34" ry="32" fill="#FEEFE5" />

        {/* Crossed Arms (Pouting posture!) */}
        <path d="M45 135 Q90 160 135 135" fill="none" stroke="#96603F" strokeWidth="18" strokeLinecap="round" />

        {/* Feet */}
        <ellipse cx="60" cy="182" rx="18" ry="12" fill="#845030" />
        <ellipse cx="120" cy="182" rx="18" ry="12" fill="#845030" />

        {/* Big Pouting Head */}
        <ellipse cx="90" cy="75" rx="58" ry="50" fill="#B27854" />

        {/* Pale Snout */}
        <ellipse cx="90" cy="88" rx="28" ry="20" fill="#FEEFE5" />

        {/* Nose */}
        <ellipse cx="90" cy="80" rx="7" ry="5" fill="#3D281D" />

        {/* Pouting Frown Mouth */}
        <path d="M80 97 Q90 89 100 97" fill="none" stroke="#3D281D" strokeWidth="3.5" strokeLinecap="round" />

        {/* Angry / Pouting slanted eyebrows */}
        <path d="M60 52 L78 60" stroke="#3D281D" strokeWidth="4" strokeLinecap="round" />
        <path d="M120 52 L102 60" stroke="#3D281D" strokeWidth="4" strokeLinecap="round" />

        {/* Pouting Sad Eyes */}
        <ellipse cx="68" cy="68" rx="7" ry="8" fill="#3D281D" />
        <circle cx="70" cy="66" r="3" fill="#FFFFFF" />
        <circle cx="66" cy="72" r="1.5" fill="#60A5FA" opacity="0.8" /> {/* Tear glint */}

        <ellipse cx="112" cy="68" rx="7" ry="8" fill="#3D281D" />
        <circle cx="114" cy="66" r="3" fill="#FFFFFF" />
        <circle cx="110" cy="72" r="1.5" fill="#60A5FA" opacity="0.8" />

        {/* Big Red Blushing Cheeks */}
        <circle cx="50" cy="88" r="14" fill="url(#poutRed)" />
        <circle cx="130" cy="88" r="14" fill="url(#poutRed)" />
      </g>
    </svg>
  );
}

// Screen 2: Birthday Celebration with Cake & Party Hats
export function BubuDuduBirthday({ className = "w-52 h-52 sm:w-60 sm:h-60" }: CharacterProps) {
  return (
    <svg viewBox="0 0 320 260" className={`object-contain select-none drop-shadow-lg ${className}`} xmlns="http://www.w3.org/2000/svg">
      {/* Floating party confetti */}
      <circle cx="30" cy="40" r="5" fill="#F43F5E" />
      <circle cx="70" cy="20" r="4" fill="#FBBF24" />
      <circle cx="250" cy="30" r="6" fill="#38BDF8" />
      <circle cx="290" cy="55" r="5" fill="#A855F7" />
      <path d="M40 70 Q45 80 50 70 T60 70" fill="none" stroke="#EC4899" strokeWidth="2" />
      <path d="M260 60 Q265 70 270 60 T280 60" fill="none" stroke="#EAB308" strokeWidth="2" />

      {/* BEAR (DUDU) - LEFT */}
      <g transform="translate(40, 45)">
        {/* Ears */}
        <circle cx="35" cy="35" r="16" fill="#B27854" />
        <circle cx="85" cy="35" r="16" fill="#B27854" />
        {/* Head */}
        <ellipse cx="60" cy="60" rx="42" ry="36" fill="#B27854" />
        {/* Snout */}
        <ellipse cx="60" cy="68" rx="20" ry="15" fill="#FEEFE5" />
        <ellipse cx="60" cy="64" rx="5" ry="4" fill="#3D281D" />
        <path d="M55 70 Q60 75 65 70" fill="none" stroke="#3D281D" strokeWidth="2" strokeLinecap="round" />
        {/* Happy Curved Eyes */}
        <path d="M44 58 Q50 52 56 58" fill="none" stroke="#3D281D" strokeWidth="3" strokeLinecap="round" />
        <path d="M64 58 Q70 52 76 58" fill="none" stroke="#3D281D" strokeWidth="3" strokeLinecap="round" />
        {/* Cheeks */}
        <circle cx="38" cy="68" r="9" fill="#FF85A1" opacity="0.6" />
        <circle cx="82" cy="68" r="9" fill="#FF85A1" opacity="0.6" />
        {/* Party Hat */}
        <polygon points="60,8 42,42 78,42" fill="#F43F5E" />
        <polygon points="60,8 50,42 70,42" fill="#FDE047" opacity="0.8" />
        <circle cx="60" cy="6" r="5" fill="#FDE047" />
        {/* Body & Paws */}
        <ellipse cx="60" cy="115" rx="35" ry="30" fill="#B27854" />
        <ellipse cx="35" cy="110" rx="10" ry="14" fill="#96603F" transform="rotate(-15 35 110)" />
      </g>

      {/* PANDA (BUBU) - RIGHT */}
      <g transform="translate(160, 45)">
        {/* Black Ears */}
        <circle cx="35" cy="35" r="16" fill="#2E2729" />
        <circle cx="85" cy="35" r="16" fill="#2E2729" />
        {/* Head */}
        <ellipse cx="60" cy="60" rx="42" ry="36" fill="#FFFFFF" stroke="#F3E8E9" strokeWidth="1.5" />
        {/* Black eye patches */}
        <ellipse cx="45" cy="58" rx="12" ry="14" fill="#2E2729" transform="rotate(-8 45 58)" />
        <ellipse cx="75" cy="58" rx="12" ry="14" fill="#2E2729" transform="rotate(8 75 58)" />
        {/* Happy Curved Wink Eyes */}
        <path d="M40 58 Q45 52 50 58" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="75" cy="57" r="4" fill="#FFFFFF" />
        {/* Nose & Smile */}
        <ellipse cx="60" cy="66" rx="4" ry="3" fill="#2E2729" />
        <path d="M54 72 Q60 76 66 72" fill="none" stroke="#2E2729" strokeWidth="2" strokeLinecap="round" />
        {/* Cheeks */}
        <circle cx="38" cy="68" r="9" fill="#FF85A1" opacity="0.6" />
        <circle cx="82" cy="68" r="9" fill="#FF85A1" opacity="0.6" />
        {/* Party Hat */}
        <polygon points="60,8 42,42 78,42" fill="#38BDF8" />
        <polygon points="60,8 52,42 68,42" fill="#F472B6" opacity="0.8" />
        <circle cx="60" cy="6" r="5" fill="#F472B6" />
        {/* Body */}
        <ellipse cx="60" cy="115" rx="35" ry="30" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
        <ellipse cx="85" cy="110" rx="10" ry="14" fill="#2E2729" transform="rotate(15 85 110)" />
      </g>

      {/* BIRTHDAY CAKE IN FRONT */}
      <g transform="translate(90, 130)">
        {/* Plate */}
        <ellipse cx="70" cy="98" rx="72" ry="16" fill="#FEE2E2" stroke="#FDA4AF" strokeWidth="2" />

        {/* Cake Bottom Tier */}
        <path d="M22 65 C22 55, 118 55, 118 65 L118 90 C118 100, 22 100, 22 90 Z" fill="#FFF1F2" />
        {/* Strawberry Cream Frosting */}
        <path d="M22 65 C35 75, 45 60, 60 75 C75 60, 85 75, 100 60 C110 75, 118 65, 118 65 C118 55, 22 55, 22 65 Z" fill="#FB7185" />

        {/* Strawberries on top */}
        <circle cx="45" cy="56" r="7" fill="#E11D48" />
        <circle cx="70" cy="53" r="8" fill="#E11D48" />
        <circle cx="95" cy="56" r="7" fill="#E11D48" />

        {/* Candle */}
        <rect x="67" y="24" width="6" height="28" rx="3" fill="#FDE047" stroke="#F59E0B" strokeWidth="1" />
        {/* Flame */}
        <g className="animate-wiggle">
          <ellipse cx="70" cy="14" rx="5" ry="9" fill="#F97316" />
          <ellipse cx="70" cy="15" rx="2.5" ry="5" fill="#FEF08A" />
        </g>
      </g>
    </svg>
  );
}

// Screen 4: Warm Cozy Tight Hug
export function BubuDuduHug({ className = "w-52 h-52 sm:w-60 sm:h-60" }: CharacterProps) {
  return (
    <svg viewBox="0 0 260 240" className={`object-contain select-none drop-shadow-lg ${className}`} xmlns="http://www.w3.org/2000/svg">
      {/* Floating love hearts */}
      <g className="animate-cute-bounce">
        <text x="115" y="32" fontSize="24" fill="#E11D48">💖</text>
        <text x="60" y="55" fontSize="18" fill="#FB7185">💕</text>
        <text x="175" y="55" fontSize="18" fill="#FB7185">💕</text>
      </g>

      {/* Cozy Shadow */}
      <ellipse cx="130" cy="210" rx="75" ry="16" fill="#FBCFE8" opacity="0.5" />

      {/* COMBINED HUGGING FIGURE */}
      <g transform="translate(30, 40)">
        {/* Dudu Brown Bear Ears */}
        <circle cx="50" cy="45" r="18" fill="#B27854" />
        <circle cx="50" cy="45" r="10" fill="#FFD1DC" />

        {/* Bubu Panda Ears */}
        <circle cx="150" cy="45" r="18" fill="#2E2729" />

        {/* Dudu Bear Body (Left) */}
        <ellipse cx="75" cy="130" rx="42" ry="38" fill="#B27854" />
        {/* Bubu Panda Body (Right) */}
        <ellipse cx="125" cy="130" rx="42" ry="38" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />

        {/* Dudu Bear Head (snuggled towards right) */}
        <ellipse cx="78" cy="78" rx="44" ry="38" fill="#B27854" />
        {/* Bubu Panda Head (snuggled towards left, overlapping) */}
        <ellipse cx="122" cy="78" rx="44" ry="38" fill="#FFFFFF" stroke="#F3E8E9" strokeWidth="1.5" />

        {/* Panda Eye Patches */}
        <ellipse cx="115" cy="74" rx="10" ry="13" fill="#2E2729" transform="rotate(-15 115 74)" />
        <ellipse cx="145" cy="74" rx="10" ry="13" fill="#2E2729" transform="rotate(15 145 74)" />

        {/* Blissful Closed Happy Eyes */}
        {/* Bear eyes */}
        <path d="M58 74 Q66 82 74 74" fill="none" stroke="#3D281D" strokeWidth="3" strokeLinecap="round" />
        {/* Panda eyes */}
        <path d="M110 74 Q116 80 122 74" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M140 74 Q146 80 152 74" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

        {/* Bear Snout & Smile */}
        <ellipse cx="78" cy="86" rx="14" ry="10" fill="#FEEFE5" />
        <ellipse cx="78" cy="83" rx="4" ry="3" fill="#3D281D" />
        <path d="M74 88 Q78 92 82 88" fill="none" stroke="#3D281D" strokeWidth="2" strokeLinecap="round" />

        {/* Panda Snout & Smile */}
        <ellipse cx="126" cy="85" rx="3.5" ry="2.5" fill="#2E2729" />
        <path d="M122 90 Q126 94 130 90" fill="none" stroke="#2E2729" strokeWidth="2" strokeLinecap="round" />

        {/* Hugging Arms Wrapped Around Each Other */}
        {/* Bear's brown arm hugging around Panda's back */}
        <path d="M60 120 C85 145, 140 145, 155 125" fill="none" stroke="#96603F" strokeWidth="16" strokeLinecap="round" />
        {/* Panda's black arm hugging around Bear's back */}
        <path d="M140 120 C115 145, 60 145, 45 125" fill="none" stroke="#2E2729" strokeWidth="16" strokeLinecap="round" />

        {/* Blushing Cheeks on Both */}
        <circle cx="50" cy="86" r="10" fill="#FF4D6D" opacity="0.6" />
        <circle cx="150" cy="86" r="10" fill="#FF4D6D" opacity="0.6" />
        <circle cx="98" cy="92" r="8" fill="#FF6584" opacity="0.5" />
      </g>
    </svg>
  );
}

// Screen 5: Sweet Proposal with Ring & Rose
export function BubuDuduProposal({ className = "w-48 h-48 sm:w-56 sm:h-56" }: CharacterProps) {
  return (
    <svg viewBox="0 0 280 220" className={`object-contain select-none drop-shadow-md ${className}`} xmlns="http://www.w3.org/2000/svg">
      {/* Panda kneeling with ring box */}
      <g transform="translate(30, 45)">
        <circle cx="28" cy="30" r="15" fill="#2E2729" />
        <circle cx="75" cy="30" r="15" fill="#2E2729" />
        <ellipse cx="52" cy="55" rx="36" ry="32" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
        <ellipse cx="38" cy="52" rx="10" ry="12" fill="#2E2729" />
        <ellipse cx="66" cy="52" rx="10" ry="12" fill="#2E2729" />
        <circle cx="38" cy="52" r="3" fill="#FFFFFF" />
        <circle cx="66" cy="52" r="3" fill="#FFFFFF" />
        <circle cx="32" cy="62" r="7" fill="#FF85A1" opacity="0.6" />
        <circle cx="72" cy="62" r="7" fill="#FF85A1" opacity="0.6" />
        <path d="M48 64 Q52 68 56 64" fill="none" stroke="#2E2729" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="52" cy="105" rx="30" ry="26" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />

        {/* Ring box in hand */}
        <g transform="translate(68, 78)">
          <rect x="0" y="8" width="22" height="18" rx="4" fill="#BE123C" />
          <path d="M0 8 Q11 -4 22 8 Z" fill="#9F1239" />
          {/* Sparkling Diamond Ring */}
          <circle cx="11" cy="6" r="6" fill="none" stroke="#FBBF24" strokeWidth="2" />
          <polygon points="11, -2 14, 2 11, 4 8, 2" fill="#38BDF8" />
          <text x="16" y="2" fontSize="12">✨</text>
        </g>
      </g>

      {/* Bear blushing with joy */}
      <g transform="translate(150, 45)">
        <circle cx="35" cy="30" r="15" fill="#B27854" />
        <circle cx="80" cy="30" r="15" fill="#B27854" />
        <ellipse cx="58" cy="55" rx="38" ry="34" fill="#B27854" />
        <ellipse cx="58" cy="62" rx="18" ry="14" fill="#FEEFE5" />
        {/* Surprised Happy Eyes */}
        <circle cx="44" cy="52" r="5" fill="#3D281D" />
        <circle cx="46" cy="50" r="2" fill="#FFFFFF" />
        <circle cx="72" cy="52" r="5" fill="#3D281D" />
        <circle cx="74" cy="50" r="2" fill="#FFFFFF" />
        {/* Open Cute O-mouth */}
        <ellipse cx="58" cy="66" rx="5" ry="6" fill="#BE123C" />
        {/* Big Blush */}
        <circle cx="36" cy="64" r="10" fill="#FF4D6D" opacity="0.7" />
        <circle cx="80" cy="64" r="10" fill="#FF4D6D" opacity="0.7" />
        {/* Paws on cheeks in cute shock */}
        <ellipse cx="36" cy="70" rx="8" ry="12" fill="#96603F" transform="rotate(25 36 70)" />
        <ellipse cx="80" cy="70" rx="8" ry="12" fill="#96603F" transform="rotate(-25 80 70)" />
        <ellipse cx="58" cy="110" rx="32" ry="28" fill="#B27854" />
      </g>
    </svg>
  );
}

// Letter / Seal Screen cute panda sticker
export function BubuDuduLetter({ className = "w-16 h-16" }: CharacterProps) {
  return (
    <svg viewBox="0 0 120 120" className={`object-contain select-none drop-shadow-sm ${className}`} xmlns="http://www.w3.org/2000/svg">
      {/* Panda peeking with envelope */}
      <circle cx="35" cy="35" r="12" fill="#2E2729" />
      <circle cx="85" cy="35" r="12" fill="#2E2729" />
      <ellipse cx="60" cy="55" rx="34" ry="28" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
      <ellipse cx="46" cy="52" rx="8" ry="10" fill="#2E2729" />
      <ellipse cx="74" cy="52" rx="8" ry="10" fill="#2E2729" />
      <circle cx="47" cy="51" r="2.5" fill="#FFFFFF" />
      <circle cx="75" cy="51" r="2.5" fill="#FFFFFF" />
      <circle cx="38" cy="62" r="6" fill="#FF85A1" opacity="0.6" />
      <circle cx="82" cy="62" r="6" fill="#FF85A1" opacity="0.6" />
      <ellipse cx="60" cy="59" rx="3" ry="2" fill="#2E2729" />
      <path d="M57 63 Q60 66 63 63" fill="none" stroke="#2E2729" strokeWidth="1.5" strokeLinecap="round" />
      {/* Pink envelope with heart */}
      <rect x="35" y="72" width="50" height="34" rx="4" fill="#FFE4E6" stroke="#FB7185" strokeWidth="1.5" />
      <polygon points="35,72 60,90 85,72" fill="#FECDD3" stroke="#FB7185" strokeWidth="1.5" />
      <text x="54" y="93" fontSize="12">💌</text>
    </svg>
  );
}

export function BubuDuduCrying({ className = "w-48 h-48 sm:w-56 sm:h-56" }: CharacterProps) {
  return (
    <svg viewBox="0 0 260 220" className={`object-contain select-none drop-shadow-md ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tearStream" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Floating broken heart */}
      <g className="animate-wiggle" transform="translate(112, 10)">
        <text x="0" y="24" fontSize="26">💔</text>
      </g>

      <g transform="translate(45, 30)">
        {/* Bear ears */}
        <circle cx="35" cy="40" r="18" fill="#B27854" />
        <circle cx="35" cy="40" r="10" fill="#FCA5A5" />
        <circle cx="135" cy="40" r="18" fill="#B27854" />
        <circle cx="135" cy="40" r="10" fill="#FCA5A5" />

        {/* Bear body */}
        <ellipse cx="85" cy="135" rx="46" ry="42" fill="#B27854" />
        <ellipse cx="85" cy="140" rx="30" ry="28" fill="#FEEFE5" />

        {/* Paws covering face / wiping tears */}
        <ellipse cx="50" cy="95" rx="14" ry="18" fill="#96603F" transform="rotate(-25 50 95)" />
        <ellipse cx="120" cy="95" rx="14" ry="18" fill="#96603F" transform="rotate(25 120 95)" />

        {/* Big sad head */}
        <ellipse cx="85" cy="72" rx="52" ry="44" fill="#B27854" />
        <ellipse cx="85" cy="82" rx="24" ry="17" fill="#FEEFE5" />
        <ellipse cx="85" cy="76" rx="6" ry="4" fill="#3D281D" />

        {/* Trembling sad mouth */}
        <path d="M75 92 Q85 84 95 92" fill="none" stroke="#3D281D" strokeWidth="3" strokeLinecap="round" />

        {/* Sad slanted eyebrows */}
        <path d="M55 50 Q65 44 72 52" fill="none" stroke="#3D281D" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M115 50 Q105 44 98 52" fill="none" stroke="#3D281D" strokeWidth="3.5" strokeLinecap="round" />

        {/* Crying closed eyes */}
        <path d="M60 66 Q68 60 76 66" fill="none" stroke="#3D281D" strokeWidth="3" strokeLinecap="round" />
        <path d="M94 66 Q102 60 110 66" fill="none" stroke="#3D281D" strokeWidth="3" strokeLinecap="round" />

        {/* Dramatic anime tear waterfalls */}
        <path d="M62 68 C58 85, 48 115, 44 145 C48 145, 68 145, 66 115 C66 90, 68 75, 68 68 Z" fill="url(#tearStream)" />
        <path d="M108 68 C112 85, 122 115, 126 145 C122 145, 102 145, 104 115 C104 90, 102 75, 102 68 Z" fill="url(#tearStream)" />

        {/* Puddle of tears */}
        <ellipse cx="85" cy="172" rx="65" ry="12" fill="#93C5FD" opacity="0.45" />

        {/* Cheeks */}
        <circle cx="48" cy="80" r="10" fill="#EF4444" opacity="0.6" />
        <circle cx="122" cy="80" r="10" fill="#EF4444" opacity="0.6" />
      </g>
    </svg>
  );
}

export function BubuDuduKiss({ className = "w-48 h-48 sm:w-56 sm:h-56" }: CharacterProps) {
  return (
    <svg viewBox="0 0 260 220" className={`object-contain select-none drop-shadow-lg ${className}`} xmlns="http://www.w3.org/2000/svg">
      <g className="animate-cute-bounce">
        <text x="120" y="28" fontSize="24" fill="#E11D48">💖</text>
        <text x="90" y="40" fontSize="16" fill="#F43F5E">💕</text>
        <text x="150" y="40" fontSize="16" fill="#F43F5E">💕</text>
      </g>

      <g transform="translate(35, 40)">
        {/* Dudu Bear (kissing cheek) */}
        <circle cx="40" cy="35" r="16" fill="#B27854" />
        <ellipse cx="65" cy="65" rx="38" ry="34" fill="#B27854" />
        <path d="M50 62 Q56 68 62 62" fill="none" stroke="#3D281D" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="88" cy="68" rx="8" ry="5" fill="#96603F" /> {/* Kissy snout touching panda */}
        <circle cx="48" cy="70" r="9" fill="#FF6584" opacity="0.6" />

        {/* Bubu Panda (blushing deeply) */}
        <circle cx="150" cy="35" r="16" fill="#2E2729" />
        <ellipse cx="125" cy="65" rx="38" ry="34" fill="#FFFFFF" stroke="#F3E8E9" strokeWidth="1.5" />
        <ellipse cx="115" cy="62" rx="9" ry="12" fill="#2E2729" />
        <ellipse cx="142" cy="62" rx="9" ry="12" fill="#2E2729" />
        <path d="M110 62 Q115 67 120 62" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <path d="M138 62 Q143 67 148 62" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        {/* Giant Red Blushing Cheeks */}
        <circle cx="102" cy="72" r="12" fill="#EF4444" opacity="0.75" />
        <circle cx="148" cy="72" r="12" fill="#EF4444" opacity="0.75" />
        <path d="M125 72 Q128 76 132 72" fill="none" stroke="#2E2729" strokeWidth="2" strokeLinecap="round" />

        {/* Bodies holding together */}
        <ellipse cx="65" cy="120" rx="32" ry="28" fill="#B27854" />
        <ellipse cx="125" cy="120" rx="32" ry="28" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
        <path d="M75 115 Q95 130 115 115" fill="none" stroke="#96603F" strokeWidth="12" strokeLinecap="round" />
      </g>
    </svg>
  );
}
