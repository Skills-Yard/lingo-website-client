import { useState, useEffect, useCallback } from 'react';

export function useLevelProgression({
  setStars,
  triggerFlyingStars,
  triggerSound,
}: {
  setStars: React.Dispatch<React.SetStateAction<number>>;
  triggerFlyingStars: (nodeId: number, count: number) => void;
  triggerSound: (type: 'tap' | 'step' | 'pickup' | 'win' | 'lose' | 'hint') => void;
}) {
  const [view, setView] = useState<'map' | 'lesson1_theory' | 'game'>('map');
  const [levelStates, setLevelStates] = useState<Record<string, 'locked' | 'unlocked' | 'completed' | 'demo_completed'>>({
    level1: 'unlocked',
    level2: 'locked',
    level3: 'locked',
    level4: 'locked',
    level5: 'locked',
  });
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const l = localStorage.getItem('lingo_level_states');
    if (l) {
      const t = setTimeout(() => {
        try {
          setLevelStates(JSON.parse(l));
        } catch {}
      }, 0);
      return () => clearTimeout(t);
    }
  }, []);


  // Save to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('lingo_level_states', JSON.stringify(levelStates));
  }, [levelStates]);

  const handleLevelSuccessContinue = useCallback(() => {
    triggerSound('tap');
    if (currentLevelIdx === 0) {
      // Demo done → go to Lesson 1
      setLevelStates(prev => ({ ...prev, level2: 'demo_completed' }));
      setCurrentLevelIdx(1);
    } else if (currentLevelIdx === 1) {
      // Lesson 1 done → award 50 stars, unlock level 3, return to map
      setLevelStates(prev => ({ ...prev, level2: 'completed', level3: 'unlocked' }));
      setStars(prev => prev + 50);
      triggerFlyingStars(2, 3);
      setView('map');
    }
  }, [currentLevelIdx, setStars, triggerFlyingStars, triggerSound]);

  return {
    view,
    setView,
    levelStates,
    setLevelStates,
    currentLevelIdx,
    setCurrentLevelIdx,
    handleLevelSuccessContinue,
  };
}
