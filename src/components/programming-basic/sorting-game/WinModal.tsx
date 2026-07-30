'use client';
import React from 'react';
import { CheckCircle2, Star } from 'lucide-react';

interface WinModalProps {
  mode: 'play' | 'auto';
  moveCount: number;
  onContinue: () => void;
}

export function WinModal({ mode, moveCount, onContinue }: WinModalProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-[999] animate-fade-in">
      <div className="bg-white border-2 border-white rounded-[32px] shadow-2xl p-6 w-full max-w-sm flex flex-col items-center text-center animate-slide-up select-none">

        <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 fill-emerald-100" />
        </div>

        <h2 className="text-xl font-black text-slate-800 tracking-tight mb-1">Lesson Completed!</h2>
        <p className="text-sm font-black text-[#58cc02] uppercase tracking-wide mb-3">You mastered 3D Sorting!</p>

        <p className="text-xs font-bold text-slate-500 mb-6 leading-relaxed max-w-[240px]">
          {mode === 'play'
            ? `Fantastic! You ordered the 3D cubes manually in ${moveCount} swaps.`
            : 'Excellent! You successfully followed the Bubble Sort algorithm logic.'}
        </p>

        <div className="flex items-center gap-2 border-2 border-amber-100 bg-amber-50 rounded-2xl px-5 py-2 mb-6">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          <span className="text-sm font-black text-amber-700">+50 Stars Granted</span>
        </div>

        <button
          onClick={onContinue}
          className="w-full bg-[#58cc02] border-b-4 border-[#3b9c01] text-white text-sm font-black py-3 rounded-2xl shadow-md hover:bg-[#61df02] active:border-b-0 active:mt-1 cursor-pointer transition-all uppercase tracking-wider"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
