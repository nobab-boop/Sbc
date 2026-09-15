import { useMemo } from 'react';

interface Particle {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FloatingHearts() {
  const particles = useMemo(() => {
    const emojis = ['💖', '💕', '🌸', '✨', '🍓', '🧸', '🍰', '💌', '🌷'];
    const list: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      list.push({
        id: i,
        emoji: emojis[i % emojis.length],
        left: Math.random() * 95,
        size: 14 + Math.random() * 18,
        duration: 7 + Math.random() * 8,
        delay: Math.random() * 8,
      });
    }
    return list;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 contain-strict transform-gpu">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float-heart select-none transform-gpu"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0.55,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
