import React from 'react';
import { DemoPlatform } from '../demo';
import { Level1Platform } from '../level1';
import { LevelConfig, CommandType, Position, Direction } from '../../../utils/types';
import { COMMAND_DETAILS } from '../../../lib/constants/commands';

interface GameBoardProps {
  level: LevelConfig;
  commands: (CommandType | null)[];
  isPlaying: boolean;
  playerPos: Position;
  playerDir: Direction;
  executingStep: number | null;
  collectedStar: boolean;
  success: boolean | null;
  soundEnabled: boolean;
  fillHint: () => void;
  setSoundEnabled: (enabled: boolean) => void;
  removeCommand: (idx: number) => void;
  triggerSound: (type: 'tap' | 'step' | 'pickup' | 'win' | 'lose' | 'hint') => void;
}

export function GameBoard({
  level,
  commands,
  isPlaying,
  playerPos,
  playerDir,
  executingStep,
  collectedStar,
  success,
  soundEnabled,
  fillHint,
  setSoundEnabled,
  removeCommand,
  triggerSound,
}: GameBoardProps) {
  const stepsLeft = commands.filter(c => c === null).length;

  return (
    <div className="relative w-full bg-white/90 border-2 border-white backdrop-blur shadow-xl rounded-3xl p-3 mb-2 flex flex-col items-center">
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10 pointer-events-none">
        <span
          className={`pointer-events-auto text-white font-black text-[10px] px-3 py-1 rounded-full border-b-4 shadow-md ${level.isDemo ? 'bg-amber-500 border-amber-700' : 'bg-indigo-600 border-indigo-800'
            }`}
        >
          Steps left: {stepsLeft}
        </span>
        <div className="pointer-events-auto flex gap-1.5">
          <button
            onClick={fillHint}
            disabled={isPlaying}
            className="flex items-center gap-1 bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-600 text-[10px] font-bold px-3 py-1 rounded-xl border border-slate-200 hover:border-amber-300 shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            💡 Hint
          </button>
          <button
            onClick={() => {
              triggerSound('tap');
              setSoundEnabled(!soundEnabled);
            }}
            className={`w-8 h-8 flex items-center justify-center rounded-xl border shadow-sm transition-all cursor-pointer ${soundEnabled ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-100 border-slate-300 text-slate-400'
              }`}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </div>

      <div className="w-full flex items-center justify-center py-4 overflow-visible relative">
        {level.isDemo ? (
          <DemoPlatform playerPos={playerPos} playerDir={playerDir} isPlaying={isPlaying} executingStep={executingStep} />
        ) : (
          <Level1Platform
            playerPos={playerPos}
            playerDir={playerDir}
            isPlaying={isPlaying}
            executingStep={executingStep}
            collectedStar={collectedStar}
          />
        )}
      </div>

      <div className="w-full mt-1 select-none">
        <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase text-center mb-2">Program Slots</p>
        <div className="flex flex-wrap justify-center gap-2">
          {commands.map((cmd, idx) => {
            const active = executingStep === idx && isPlaying;
            return (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-[8px] font-black text-slate-400 mb-1">{idx + 1}</span>
                {cmd ? (
                  <button
                    onClick={() => removeCommand(idx)}
                    disabled={isPlaying || success !== null}
                    className={`w-12 h-12 shadow-md rounded-xl overflow-hidden transition-all p-0 bg-transparent cursor-pointer ${active ? 'scale-110 -translate-y-1' : 'hover:scale-105 border-gray-200 border active:scale-95'
                      }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={COMMAND_DETAILS[cmd].imageSrc}
                      alt={COMMAND_DETAILS[cmd].label}
                      className="w-full h-full object-contain"
                      draggable={false}
                    />
                  </button>
                ) : (
                  <div className="w-12 h-12 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-center relative">
                    {idx === 0 && commands.filter(c => c !== null).length === 0 && (
                      <div className="w-3 h-1 bg-indigo-400 rounded-full animate-ping absolute" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
