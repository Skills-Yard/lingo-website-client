'use client';
import React from 'react';
import { ChevronLeft, Star, Heart } from 'lucide-react';

interface HeaderProps {
  visualStars: number;
  hearts: number;
  onBack: () => void;
}

export function Header({ visualStars, hearts, onBack }: HeaderProps) {
  return (
    <header className="w-full flex items-center justify-between px-2 py-3 mt-1">
      <button
        onClick={onBack}
        className="w-9 h-9 flex items-center justify-center rounded-2xl bg-white/80 border border-slate-200 shadow-sm text-slate-500 hover:bg-white transition-all active:scale-95 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex flex-col items-center">
        <span className="text-[10px] font-black text-[#58cc02] tracking-wider uppercase">Level 3</span>
        <h1 className="text-base font-black text-slate-800 tracking-tight">3D Cube Sorting</h1>
      </div>

      <div className="flex gap-2">
        <div className="flex items-center gap-1 bg-white border border-amber-200 rounded-2xl px-3 py-1 shadow-sm">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-sm font-black text-amber-600 tabular-nums">{visualStars}</span>
        </div>
        <div className="flex items-center gap-1 bg-white border border-red-200 rounded-2xl px-3 py-1 shadow-sm">
          <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
          <span className="text-sm font-black text-red-600">{hearts}</span>
        </div>
      </div>
    </header>
  );
}
