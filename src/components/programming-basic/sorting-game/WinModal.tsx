"use client";

import React from "react";
import { CheckCircle2, Star, ArrowRight } from "lucide-react";

interface WinModalProps {
  mode: "play" | "auto";
  moveCount: number;
  onContinue: () => void;
}

export function WinModal({ mode, moveCount, onContinue }: WinModalProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-[999] animate-fade-in select-none">
      <div className="bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#1e293b] rounded-3xl shadow-2xl p-7 w-full max-w-sm flex flex-col items-center text-center animate-pop-in">
        <div className="w-18 h-18 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
        </div>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
          Lesson Completed!
        </h2>
        <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-3">
          You mastered 3D Sorting!
        </p>

        <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 leading-relaxed max-w-[260px]">
          {mode === "play"
            ? `Fantastic! You ordered the 3D cubes manually in ${moveCount} swaps.`
            : "Excellent! You successfully followed the Bubble Sort algorithm logic."}
        </p>

        <div className="flex items-center gap-2 border border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/40 rounded-2xl px-5 py-2.5 mb-6 shadow-xs">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          <span className="text-sm font-black text-amber-700 dark:text-amber-400">+50 Stars Granted</span>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="w-full h-13 bg-[#059669] hover:bg-[#047857] dark:bg-[#10b981] dark:hover:bg-[#059669] text-white font-black rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
