import { useState, useEffect, useRef, useCallback } from 'react';
import { FlyingStar } from '../utils/types';
import { MAP_NODES } from '../lib/constants/levels';

export function useStarsAndHearts() {
  const [stars, setStars] = useState(0);
  const [visualStars, setVisualStars] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [flyingStars, setFlyingStars] = useState<FlyingStar[]>([]);
  const [headerBounce, setHeaderBounce] = useState(false);

  const starPillRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Load from localStorage
  useEffect(() => {
    const s = localStorage.getItem('lingo_stars');
    const h = localStorage.getItem('lingo_hearts');
    const t = setTimeout(() => {
      if (s) {
        const v = parseInt(s, 10);
        setStars(v);
        setVisualStars(v);
      }
      if (h) setHearts(parseInt(h, 10));
    }, 0);
    return () => clearTimeout(t);
  }, []);


  // Save to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('lingo_stars', stars.toString());
    localStorage.setItem('lingo_hearts', hearts.toString());
  }, [stars, hearts]);

  // Animate visualStars toward stars
  useEffect(() => {
    if (visualStars >= stars) return;
    const timer = setTimeout(() => setVisualStars(v => Math.min(v + 1, stars)), 30);
    return () => clearTimeout(timer);
  }, [visualStars, stars]);

  const triggerFlyingStars = useCallback((nodeId: number, count: number) => {
    const node = MAP_NODES.find(n => n.id === nodeId);
    if (!node || !mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const fromX = rect.left + (node.x / 100) * rect.width;
    const fromY = rect.top + (node.y / 100) * rect.height;

    const newStars: FlyingStar[] = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      fromX,
      fromY,
    }));
    setFlyingStars(prev => [...prev, ...newStars]);

    // After animation completes, clear them and trigger header bounce
    setTimeout(() => {
      setFlyingStars([]);
      setHeaderBounce(true);
      setTimeout(() => setHeaderBounce(false), 600);
    }, 1000);
  }, []);

  return {
    stars,
    setStars,
    visualStars,
    setVisualStars,
    hearts,
    setHearts,
    flyingStars,
    setFlyingStars,
    headerBounce,
    setHeaderBounce,
    starPillRef,
    mapContainerRef,
    triggerFlyingStars,
  };
}
