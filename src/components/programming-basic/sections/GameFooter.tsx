import React from 'react';
import { CommandType } from '../../../utils/types';

interface GameFooterProps {
  isPlaying: boolean;
  success: boolean | null;
  commands: (CommandType | null)[];
  runSequence: () => void;
  resetLevel: () => void;
  triggerSound: (type: 'tap' | 'step' | 'pickup' | 'win' | 'lose' | 'hint') => void;
}

export function GameFooter({
  isPlaying,
  success,
  commands,
  runSequence,
  resetLevel,
  triggerSound,
}: GameFooterProps) {
  const hasActiveCommands = commands.filter(c => c !== null).length > 0;

  return (
    <footer className="w-full flex justify-between gap-3 mb-2 select-none">
      <button
        onClick={() => {
          triggerSound('tap');
          resetLevel();
        }}
        className="flex items-center gap-2 justify-center py-3 px-5 rounded-2xl border-2 border-b-4 border-slate-200 hover:bg-slate-50 text-indigo-600 font-extrabold text-sm shadow-sm active:translate-y-0.5 transition-all w-1/3 cursor-pointer"
      >
        Reset
      </button>
      <button
        onClick={runSequence}
        disabled={isPlaying || success !== null || !hasActiveCommands}
        className={`grow flex items-center max-w-[200px] justify-center gap-2 py-3 rounded-2xl border-2 border-b-4 text-white font-extrabold text-sm shadow-md active:translate-y-0.5 transition-all cursor-pointer ${!hasActiveCommands
          ? 'bg-slate-300 border-slate-400 cursor-not-allowed shadow-none'
          : isPlaying
            ? 'bg-[#58cc02] border-[#3ea800] animate-pulse'
            : 'bg-[#58cc02] border-[#3ea800] hover:bg-[#65e002]'
          }`}
      >
        {isPlaying ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Executing…</span>
          </>
        ) : (
          <>
            <span>▶</span> Run
          </>
        )}
      </button>
    </footer>
  );
}
