import { useEffect, useRef } from 'react';

interface RadialFlowerBloomProps {
  onComplete?: () => void;
}

interface PetalParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  size: number;
  color: string;
  petalCount: number;
  opacity: number;
  type: 'flower' | 'petal' | 'sparkle';
  decay: number;
}

export default function RadialFlowerBloom({ onComplete }: RadialFlowerBloomProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const centerX = width / 2;
    const centerY = height / 2;

    const colors = [
      '#FFB7B2', // Soft sakura blush
      '#FFDAC1', // Pastel peach
      '#E2F0CB', // Hint of soft mint leaf
      '#FF9AA2', // Warm pink
      '#FFC6FF', // Soft lilac-pink
      '#FFF0F5', // Cream blossom
      '#FFD1DC', // Classic pastel pink
    ];

    const goldSparkles = ['#FFE066', '#FFD166', '#FFF3B0', '#FFFFFF'];

    // Spawn concentric particle waves
    const particles: PetalParticle[] = [];
    const totalParticles = 75;

    for (let i = 0; i < totalParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 8.5; // Radial burst velocity
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
        petalCount: 5 + Math.floor(Math.random() * 2), // 5 or 6 petals
        opacity: 1,
        type,
        decay: 0.007 + Math.random() * 0.009,
      });
    }

    let startTime: number | null = null;
    const duration = 2500; // 2.5s duration

    const drawCoreBlossom = (progress: number) => {
      // Core blossom starts small, blossoms wide, and softly fades
      const coreScale = Math.min(1, progress * 2.2);
      const coreOpacity = progress < 0.6 ? 1 : Math.max(0, 1 - (progress - 0.6) / 0.4);
      const coreRadius = 45 * coreScale;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(progress * 1.5);
      ctx.globalAlpha = coreOpacity * 0.9;

      // Draw 6 large layered petals
      const petals = 6;
      for (let i = 0; i < petals; i++) {
        const theta = (i * Math.PI * 2) / petals;
        ctx.save();
        ctx.rotate(theta);

        // Gradient petal
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

      // Golden center pistil
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = '#FFE066';
      ctx.fill();

      // Delicate pistil dots
      for (let j = 0; j < 8; j++) {
        const dotAngle = (j * Math.PI * 2) / 8;
        const dx = Math.cos(dotAngle) * (coreRadius * 0.22);
        const dy = Math.sin(dotAngle) * (coreRadius * 0.22);
        ctx.beginPath();
        ctx.arc(dx, dy, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFAA00';
        ctx.fill();
      }

      ctx.restore();
    };

    const drawRadialRipples = (progress: number) => {
      // Concentric expanding ring waves
      const maxRadius = Math.max(width, height) * 0.85;
      const rippleCount = 3;

      for (let r = 0; r < rippleCount; r++) {
        const offsetProgress = Math.max(0, Math.min(1, progress * 1.5 - r * 0.18));
        if (offsetProgress <= 0 || offsetProgress >= 1) continue;

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
    };

    const drawSparkle = (p: PetalParticle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      const s = p.size;
      ctx.beginPath();
      // 4-pointed star
      ctx.moveTo(0, -s);
      ctx.quadraticCurveTo(0, 0, s, 0);
      ctx.quadraticCurveTo(0, 0, 0, s);
      ctx.quadraticCurveTo(0, 0, -s, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s);
      ctx.fill();

      ctx.restore();
    };

    const drawFlower = (p: PetalParticle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      const r = p.size;
      for (let i = 0; i < p.petalCount; i++) {
        const ang = (i * Math.PI * 2) / p.petalCount;
        ctx.save();
        ctx.rotate(ang);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, r * 0.5, r * 0.35, r * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Center pistil
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = '#FFE57F';
      ctx.fill();

      ctx.restore();
    };

    const drawPetal = (p: PetalParticle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      const s = p.size;
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.45, s, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);

      ctx.clearRect(0, 0, width, height);

      // Draw concentric ripple waves
      drawRadialRipples(progress);

      // Draw central blooming blossom
      drawCoreBlossom(progress);

      // Draw flying radial particles
      for (const p of particles) {
        // Friction / drag
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.opacity = Math.max(0, p.opacity - p.decay);

        if (p.opacity <= 0) continue;

        if (p.type === 'sparkle') {
          drawSparkle(p);
        } else if (p.type === 'flower') {
          drawFlower(p);
        } else {
          drawPetal(p);
        }
      }

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        if (onComplete) onComplete();
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
}
