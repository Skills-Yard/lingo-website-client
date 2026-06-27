import React from 'react';
import { GameHeader } from '../sections/GameHeader';
import { MascotBanner } from '../sections/MascotBanner';
import { GameBoard } from '../sections/GameBoard';
import { CommandPalette } from '../sections/CommandPalette';
import { GameFooter } from '../sections/GameFooter';
import { CompletionModal } from '../sections/CompletionModal';
import { useGameExecution } from '../../../hooks/useGameExecution';
import { GameState } from '../../../hooks/useGameState';
import { LevelConfig, CommandType } from '../../../utils/types';
import { LEVELS } from '../../../lib/constants/levels';

interface GameViewProps {
  currentLevelIdx: number;
  level: LevelConfig;
  hearts: number;
  setHearts: React.Dispatch<React.SetStateAction<number>>;
  stars: number;
  setStars: React.Dispatch<React.SetStateAction<number>>;
  visualStars: number;
  gameState: GameState;
  setView: (view: 'map' | 'lesson1_theory' | 'game') => void;
  handleLevelSuccessContinue: () => void;
  triggerSound: (type: 'tap' | 'step' | 'pickup' | 'win' | 'lose' | 'hint') => void;
}

export function GameView({
  currentLevelIdx,
  level,
  hearts,
  setHearts,
  stars,
  setStars,
  visualStars,
  gameState,
  setView,
  handleLevelSuccessContinue,
  triggerSound,
}: GameViewProps) {
  const {
    commands,
    isPlaying,
    playerPos,
    playerDir,
    executingStep,
    collectedStar,
    success,
    failureMsg,
    soundEnabled,
    fillHint,
    setSoundEnabled,
    removeCommand,
    addCommand,
    resetLevel,
  } = gameState;

  const { canvasRef, runSequence } = useGameExecution({
    level,
    gameState,
    hearts,
    setHearts,
    triggerSound,
  });

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-sky-100 via-blue-50 to-yellow-50 font-sans flex flex-col items-center py-2 px-3">
      {/* Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-150px] w-[200px] h-[80px] bg-white opacity-40 blur-[2px] rounded-full animate-float-slow" />
        <div className="absolute top-[30%] right-[-180px] w-[250px] h-[90px] bg-white opacity-50 blur-[1px] rounded-full animate-float-medium" />
      </div>

      {success === true && <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-50" />}

      <div className="relative w-full max-w-xl flex flex-col z-10">
        {/* Game Header */}
        <GameHeader
          level={level}
          currentLevelIdx={currentLevelIdx}
          totalLevels={LEVELS.length}
          hearts={hearts}
          visualStars={visualStars}
          setView={setView}
          triggerSound={triggerSound}
        />

        {/* Mascot Banner */}
        <MascotBanner level={level} collectedStar={collectedStar} success={success} />

        {/* Game Board */}
        <GameBoard
          level={level}
          commands={commands}
          isPlaying={isPlaying}
          playerPos={playerPos}
          playerDir={playerDir}
          executingStep={executingStep}
          collectedStar={collectedStar}
          success={success}
          soundEnabled={soundEnabled}
          fillHint={fillHint}
          setSoundEnabled={setSoundEnabled}
          removeCommand={removeCommand}
          triggerSound={triggerSound}
        />

        {/* Command Palette */}
        <CommandPalette level={level} isPlaying={isPlaying} success={success} addCommand={addCommand} />

        {/* Game Footer */}
        <GameFooter
          isPlaying={isPlaying}
          success={success}
          commands={commands}
          runSequence={runSequence}
          resetLevel={resetLevel}
          triggerSound={triggerSound}
        />

        {/* Completion Modal */}
        {success !== null && (
          <CompletionModal
            success={success}
            currentLevelIdx={currentLevelIdx}
            hearts={hearts}
            stars={stars}
            failureMsg={failureMsg}
            setStars={setStars}
            setHearts={setHearts}
            resetLevel={resetLevel}
            setView={setView}
            handleLevelSuccessContinue={handleLevelSuccessContinue}
            triggerSound={triggerSound}
          />
        )}
      </div>

      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id="chroma-white" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 -2 -2 -2 6 -0.05" />
          </filter>
        </defs>
      </svg>
    </main>
  );
}
