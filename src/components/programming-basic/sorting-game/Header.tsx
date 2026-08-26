"use client";

import React from "react";
import { ChevronLeft, Star, Heart } from "lucide-react";
import { ThemeToggle } from "../../ui/theme-toggle";

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
        className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#1e293b] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#182232] transition-all active:scale-95 cursor-pointer shadow-xs"
        aria-label="Back"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex flex-col items-center">
        <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">Level 3</span>
        <h1 className="text-base font-black text-slate-900 dark:text-white tracking-tight">3D Cube Sorting</h1>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle className="w-10 h-10 rounded-2xl" />

        <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl px-3 py-1.5 shadow-xs">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-xs md:text-sm font-black text-amber-600 dark:text-amber-400 tabular-nums">{visualStars}</span>
        </div>
        <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-2xl px-2.5 py-1.5 shadow-xs">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span className="text-xs md:text-sm font-black text-rose-600 dark:text-rose-400">{hearts}</span>
        </div>
      </div>
    </header>
  );
}
