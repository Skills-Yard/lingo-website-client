"use client";

import React from "react";
import { SortStep } from "@/utils/types/Sorting";
import { Play, Pause, RotateCcw, ArrowRight } from "lucide-react";

interface ControlsProps {
  mode: "play" | "auto";
  moveCount: number;
  onReset: () => void;
  steps: SortStep[];
  currentStepIdx: number;
  isPlaying: boolean;
  isSorted: boolean;
  animatingSwap: boolean;
  speed: number;
  onPlayPause: () => void;
  onStep: () => void;
  onScrub: (idx: number) => void;
  onSpeedChange: (speed: number) => void;
  onTap: () => void;
}

export function Controls({
  mode,
  onReset,
  steps,
  currentStepIdx,
  isPlaying,
  isSorted,
  animatingSwap,
  speed,
  onPlayPause,
  onStep,
  onScrub,
  onSpeedChange,
  onTap,
}: ControlsProps) {
  return (
    <div className="w-full bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#1e293b] rounded-3xl p-4 shadow-xs mb-4 flex flex-col gap-3 transition-colors">
      {mode === "play" ? (
        <div className="flex justify-between items-center w-full">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Click a block, then click its neighbor to swap them!
          </span>
          <button
            onClick={onReset}
            className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 dark:bg-[#182232] dark:hover:bg-[#1c293d] text-slate-700 dark:text-slate-300 text-xs font-black px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-full">
          {/* Scrubber */}
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max={Math.max(0, steps.length - 1)}
              value={currentStepIdx}
              disabled={animatingSwap}
              onChange={(e) => {
                onTap();
                onScrub(parseInt(e.target.value));
              }}
              className="flex-1 h-2 bg-slate-200 dark:bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-emerald-600 disabled:opacity-50"
            />
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 min-w-12 text-right">
              {Math.round((currentStepIdx / (steps.length - 1 || 1)) * 100)}%
            </span>
          </div>

          {/* Playback buttons + Speed */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  onTap();
                  onPlayPause();
                }}
                disabled={isSorted || animatingSwap}
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-white cursor-pointer transition-all ${
                  isPlaying
                    ? "bg-amber-500 hover:bg-amber-600"
                    : "bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              <button
                onClick={() => {
                  onTap();
                  onStep();
                }}
                disabled={isPlaying || currentStepIdx >= steps.length - 1 || animatingSwap}
                className="w-9 h-9 bg-slate-100 hover:bg-slate-200 dark:bg-[#182232] dark:hover:bg-[#1c293d] text-slate-700 dark:text-slate-300 disabled:opacity-40 border border-slate-200 dark:border-[#1e293b] rounded-xl flex items-center justify-center cursor-pointer transition-all"
              >
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onReset}
                className="w-9 h-9 bg-slate-100 hover:bg-slate-200 dark:bg-[#182232] dark:hover:bg-[#1c293d] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#1e293b] rounded-xl flex items-center justify-center cursor-pointer transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black text-slate-400 uppercase">Speed:</span>
              <select
                value={speed}
                onChange={(e) => {
                  onTap();
                  onSpeedChange(parseInt(e.target.value));
                }}
                className="text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-[#182232] border border-slate-200 dark:border-[#1e293b] rounded-xl px-2 py-1 focus:outline-none cursor-pointer"
              >
                <option value={2000}>Slow (2s)</option>
                <option value={1200}>Normal (1.2s)</option>
                <option value={700}>Fast (0.7s)</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
