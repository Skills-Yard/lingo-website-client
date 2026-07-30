'use client';
import React from 'react';

interface ModeToggleProps {
  mode: 'play' | 'auto';
  onToggle: (mode: 'play' | 'auto') => void;
}

export function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  return (
    <div className="flex bg-slate-100/80 backdrop-blur border border-slate-200 rounded-2xl p-1 mb-4 w-full">
      <button
        onClick={() => onToggle('play')}
        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${mode === 'play'
          ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50'
          : 'text-slate-500 hover:text-slate-700'
          }`}
      >
        Play Game
      </button>
      <button
        onClick={() => onToggle('auto')}
        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${mode === 'auto'
          ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50'
          : 'text-slate-500 hover:text-slate-700'
          }`}
      >
        Auto Sort (3D Claw)
      </button>
    </div>
  );
}
