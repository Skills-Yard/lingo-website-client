'use client';

import { SortingGameViewProps } from '../../../utils/types/Sorting';
import { getActionText } from '../../../utils/constants/helpers';
import { useSortingGame } from '@/hooks/useSortingGame';
import { Header } from './Header';
import { MascotBanner } from './MascotBanner';
import { ModeToggle } from './ModeToggle';
import { SortingViewport } from './SortingViewport';
import { Controls } from './Controls';
import { CodeViewer } from './CodeViewer';
import { WinModal } from './WinModal';

export function SortingGameView({
  hearts,
  setHearts: _setHearts,
  stars: _stars,
  setStars: _setStars,
  visualStars,
  setView,
  levelStates: _levelStates,
  setLevelStates: _setLevelStates,
  currentLevelIdx: _currentLevelIdx,
  setCurrentLevelIdx: _setCurrentLevelIdx,
  handleLevelSuccessContinue,
  triggerSound,
}: SortingGameViewProps) {
  const game = useSortingGame({ triggerSound, handleLevelSuccessContinue });

  const actionText = getActionText({
    isSorted: game.isSorted,
    mode: game.mode,
    currentStep: game.steps[game.currentStepIdx],
    animatingSwap: game.animatingSwap,
    liftedIndices: game.liftedIndices,
    arrayLength: game.array.length,
  });

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-linear-to-b from-sky-100 via-blue-50 to-yellow-50 font-sans flex flex-col items-center py-2 px-3 select-none">

      {/* Background Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] -left-37.5 w-50 h-20 bg-white opacity-40 blur-[2px] rounded-full animate-float-slow" />
        <div className="absolute top-[25%] -right-45 w-62.5 h-22.5 bg-white opacity-50 blur-[1px] rounded-full animate-float-medium" />
      </div>

      {/* Main Wrapper */}
      <div className="relative w-full max-w-xl flex flex-col z-10">

        <Header
          visualStars={visualStars}
          hearts={hearts}
          onBack={() => { game.playTap(); setView('map'); }}
        />

        <MascotBanner message={game.mascotMessage} />

        <ModeToggle mode={game.mode} onToggle={game.toggleMode} />

        <SortingViewport
          array={game.array}
          mode={game.mode}
          steps={game.steps}
          currentStepIdx={game.currentStepIdx}
          isSorted={game.isSorted}
          selectedIdx={game.selectedIdx}
          animatingSwap={game.animatingSwap}
          liftedIndices={game.liftedIndices}
          moveCount={game.moveCount}
          craneX={game.craneX}
          clawGrabbing={game.clawGrabbing}
          clawLowered={game.clawLowered}
          wireLength={game.wireLength}
          clawTop={game.clawTop}
          slotWidthPercent={game.slotWidthPercent}
          workspaceRef={game.workspaceRef}
          workspaceHeight={game.workspaceHeight}
          handleBlockClick={game.handleBlockClick}
        />

        {/* Action Label */}
        <div className="flex justify-center items-center h-10 -mt-2 mb-2">
          {actionText && (
            <div className={`font-mono text-sm font-bold uppercase tracking-wider px-6 py-1.5 rounded-full border shadow-sm transition-all duration-300 ${game.isSorted
              ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
              : 'bg-amber-950/80 text-amber-400 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)] animate-pulse'
              }`}>
              {actionText}
            </div>
          )}
        </div>

        <Controls
          mode={game.mode}
          moveCount={game.moveCount}
          onReset={game.resetState}
          steps={game.steps}
          currentStepIdx={game.currentStepIdx}
          isPlaying={game.isPlaying}
          isSorted={game.isSorted}
          animatingSwap={game.animatingSwap}
          speed={game.speed}
          onPlayPause={() => game.setIsPlaying(!game.isPlaying)}
          onStep={() => {
            if (game.currentStepIdx < game.steps.length - 1) {
              game.runAutoStep(game.currentStepIdx + 1);
            }
          }}
          onScrub={game.runAutoStep}
          onSpeedChange={game.setSpeed}
          onTap={game.playTap}
        />

        <CodeViewer activeCodeLine={game.activeCodeLine} onRun={game.handleRunCode} />

      </div>

      {/* Win Modal */}
      {game.showWinModal && (
        <WinModal
          mode={game.mode}
          moveCount={game.moveCount}
          onContinue={() => { game.playTap(); handleLevelSuccessContinue(); }}
        />
      )}
    </main>
  );
}
