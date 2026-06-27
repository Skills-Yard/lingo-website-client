'use client';

import React, { useState } from 'react';
import { MapView } from './views/MapView';
import { LessonTheoryView } from './views/LessonTheoryView';
import { GameView } from './views/GameView';
import { useStarsAndHearts } from '@/hooks/useStarsAndHearts';
import { useSound } from '@/hooks/useSound';
import { useLevelProgression } from '@/hooks/useLevelProgression';
import { LEVELS } from '@/config/levels';
import { useGameState } from '@/hooks/useGameState';


export default function ProgrammingBasic() {
  const {
    stars,
    setStars,
    visualStars,
    flyingStars,
    headerBounce,
    starPillRef,
    mapContainerRef,
    triggerFlyingStars,
    hearts,
    setHearts,
  } = useStarsAndHearts();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const triggerSound = useSound(soundEnabled);

  const {
    view,
    setView,
    levelStates,
    setLevelStates,
    currentLevelIdx,
    setCurrentLevelIdx,
    handleLevelSuccessContinue,
  } = useLevelProgression({
    setStars,
    triggerFlyingStars,
    triggerSound,
  });

  const level = LEVELS[currentLevelIdx];

  const gameState = useGameState(level, triggerSound, soundEnabled, setSoundEnabled);

  if (view === 'map') {
    return (
      <MapView
        visualStars={visualStars}
        flyingStars={flyingStars}
        headerBounce={headerBounce}
        starPillRef={starPillRef}
        mapContainerRef={mapContainerRef}
        levelStates={levelStates}
        setCurrentLevelIdx={(idx) => setCurrentLevelIdx(idx)}
        resetLevel={gameState.resetLevel}
        setView={setView}
        triggerSound={triggerSound}
      />
    );
  }

  if (view === 'lesson1_theory') {
    return (
      <LessonTheoryView
        hearts={hearts}
        setHearts={setHearts}
        stars={stars}
        setStars={setStars}
        setLevelStates={setLevelStates}
        setView={setView}
        triggerFlyingStars={triggerFlyingStars}
        triggerSound={triggerSound}
      />
    );
  }

  return (
    <GameView
      currentLevelIdx={currentLevelIdx}
      level={level}
      hearts={hearts}
      setHearts={setHearts}
      stars={stars}
      setStars={setStars}
      visualStars={visualStars}
      gameState={gameState}
      setView={setView}
      handleLevelSuccessContinue={handleLevelSuccessContinue}
      triggerSound={triggerSound}
    />
  );
}
export { ProgrammingBasic };
