"use client";

import React from "react";

interface ModeToggleProps {
  mode: "play" | "auto";
  onToggle: (mode: "play" | "auto") => void;
}

export function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  return (
    <div className="flex bg-slate-100 dark:bg-[#182232] border border-slate-200 dark:border-[#1e293b] rounded-2xl p-1 mb-4 w-full">
      <button
        type="button"
        onClick={() => onToggle("play")}
        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
          mode === "play"
            ? "bg-white dark:bg-[#111722] text-emerald-600 dark:text-emerald-400 shadow-xs border border-slate-200/60 dark:border-[#22365a]"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
        }`}
      >
        Play Game
      </button>
      <button
        type="button"
        onClick={() => onToggle("auto")}
        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
          mode === "auto"
            ? "bg-white dark:bg-[#111722] text-emerald-600 dark:text-emerald-400 shadow-xs border border-slate-200/60 dark:border-[#22365a]"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
        }`}
      >
        Auto Sort (3D Claw)
      </button>
    </div>
  );
}
