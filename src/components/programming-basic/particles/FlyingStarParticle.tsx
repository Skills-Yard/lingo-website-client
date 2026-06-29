import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface FlyingStarParticleProps {
  fromX: number;
  fromY: number;
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export function FlyingStarParticle({ fromX, fromY, targetRef }: FlyingStarParticleProps) {
  const [pos, setPos] = useState({ x: fromX, y: fromY, opacity: 1, scale: 1 });

  useEffect(() => {
    const rect = targetRef.current?.getBoundingClientRect();
    if (!rect) return;
    const toX = rect.left + rect.width / 2;
    const toY = rect.top + rect.height / 2;

    const duration = 800;
    const start = performance.now();

    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setPos({
        x: fromX + (toX - fromX) * ease,
        y: fromY + (toY - fromY) * ease,
        opacity: t > 0.7 ? 1 - (t - 0.7) / 0.3 : 1,
        scale: 1 - t * 0.4,
      });
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [fromX, fromY, targetRef]);

  return (
    <div
      className="fixed pointer-events-none z-9999"
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) scale(${pos.scale})`,
        opacity: pos.opacity,
      }}
    >
      <Star className="w-6 h-6 text-amber-400 fill-amber-400 drop-shadow-lg" />
    </div>
  );
}
