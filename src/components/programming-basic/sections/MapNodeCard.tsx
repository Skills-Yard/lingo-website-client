import React from "react";
import { Lock, Star } from "lucide-react";

interface Node {
  id: number;
  key: string;
  name: string;
  x: number;
  y: number;
}

interface MapNodeCardProps {
  node: Node;
  status: "locked" | "unlocked" | "completed" | "demo_completed";
  isNext: boolean;
  isDone: boolean;
  isLocked: boolean;
  onNodeClick: () => void;
}

export function MapNodeCard({
  node,
  status: _status,
  isNext,
  isDone,
  isLocked,
  onNodeClick,
}: MapNodeCardProps) {
  return (
    <div
      className="absolute z-20 select-none pointer-events-none"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
      }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center">
        {/* ── Circular node button centered exactly at (node.x, node.y) ── */}
        <button
          type="button"
          onClick={onNodeClick}
          className={`pointer-events-auto relative flex items-center justify-center rounded-full font-black text-white transition-all duration-200 active:scale-95 shadow-lg ${
            isLocked
              ? "w-13 h-13 bg-slate-500/90 dark:bg-slate-700/90 cursor-not-allowed border-2 border-white/60"
              : isDone
              ? "w-14 h-14 bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 shadow-emerald-500/40 cursor-pointer border-2 border-white/80"
              : "w-14 h-14 bg-emerald-500 dark:bg-emerald-400 hover:bg-emerald-600 shadow-emerald-500/50 cursor-pointer ring-4 ring-emerald-400/40 border-2 border-white"
          }`}
        >
          {isLocked ? <Lock className="w-5 h-5 text-white/90" /> : <span className="text-xl font-black">{node.id}</span>}

          {/* Pulse ring for active node */}
          {isNext && <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping pointer-events-none" />}
        </button>

        {/* ── Label capsule positioned cleanly to the right of the button ── */}
        <div
          className={`pointer-events-auto absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 flex flex-col px-3.5 py-1.5 rounded-2xl shadow-md border backdrop-blur-xs transition-colors whitespace-nowrap ${
            isDone
              ? "bg-white/95 dark:bg-[#111722]/95 border-slate-200 dark:border-[#1e293b]"
              : isNext
              ? "bg-emerald-50/95 dark:bg-[#0c2017]/95 border-emerald-300 dark:border-emerald-700"
              : "bg-white/90 dark:bg-[#111722]/90 border-slate-200 dark:border-[#1e293b]"
          }`}
        >
          <span
            className={`text-[12px] font-black leading-tight ${
              isLocked
                ? "text-slate-500 dark:text-slate-400"
                : isDone
                ? "text-slate-800 dark:text-white"
                : "text-emerald-700 dark:text-emerald-300"
            }`}
          >
            {node.name}
          </span>
          {isDone && (
            <div className="flex gap-0.5 mt-0.5">
              {[0, 1, 2].map((i) => (
                <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
