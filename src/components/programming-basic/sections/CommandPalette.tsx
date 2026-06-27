import React from 'react';
import { LevelConfig, CommandType } from '../../../utils/types';
import { COMMAND_DETAILS } from '../../../lib/constants/commands';

interface CommandPaletteProps {
  level: LevelConfig;
  isPlaying: boolean;
  success: boolean | null;
  addCommand: (type: CommandType) => void;
}

export function CommandPalette({ level, isPlaying, success, addCommand }: CommandPaletteProps) {
  return (
    <div className="w-full bg-white border border-slate-100 shadow-md rounded-2xl p-2 mb-2 select-none">
      <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase text-center mb-2">Available Actions</p>
      <div className="flex justify-between gap-2 px-1">
        {(Object.keys(COMMAND_DETAILS) as CommandType[]).map(type => {
          const d = COMMAND_DETAILS[type];
          const disabled = type === 'pickup' && !level.starPos;
          return (
            <button
              key={type}
              onClick={() => addCommand(type)}
              disabled={isPlaying || success !== null || disabled}
              className={`flex-1 p-0 rounded-2xl bg-transparent border-0 shadow-lg transition-all cursor-pointer ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
                }`}
            >
              <img src={d.imageSrc} alt={d.label} className="w-full h-auto object-contain" draggable={false} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
