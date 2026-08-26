import { Star } from "lucide-react";
import { LevelConfig } from "../../../utils/types";
import { ThemeToggle } from "../../ui/theme-toggle";

interface GameHeaderProps {
  level: LevelConfig;
  currentLevelIdx: number;
  totalLevels: number;
  hearts: number;
  visualStars: number;
  setView: (view: "map" | "lesson1_theory" | "game") => void;
  triggerSound: (type: "tap" | "step" | "pickup" | "win" | "lose" | "hint") => void;
}

export function GameHeader({
  level,
  currentLevelIdx,
  totalLevels,
  hearts,
  visualStars,
  setView,
  triggerSound,
}: GameHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 mb-2 w-full bg-white/95 dark:bg-[#111722]/95 backdrop-blur-sm shadow-xs border border-slate-200 dark:border-[#1e293b] rounded-2xl p-2.5 select-none transition-colors">
      <button
        onClick={() => {
          triggerSound("tap");
          setView("map");
        }}
        className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white dark:bg-[#182232] hover:bg-slate-50 dark:hover:bg-[#1c293d] border border-slate-200 dark:border-[#22365a] text-slate-700 dark:text-slate-300 shadow-xs active:scale-95 transition-all cursor-pointer"
        aria-label="Back to Map"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="grow">
        <div className="flex justify-between items-center mb-1 px-1">
          <span className={`text-[11px] font-extrabold tracking-wide uppercase ${level.isDemo ? "text-amber-500" : "text-emerald-600 dark:text-emerald-400"}`}>
            {level.isDemo ? "🎓 " : ""}
            {level.name}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
            {level.isDemo ? "Practice" : `${currentLevelIdx}/${totalLevels - 1}`}
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-[#182232] h-2 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${level.isDemo ? "bg-amber-400" : "bg-emerald-500"}`}
            style={{ width: level.isDemo ? "50%" : "100%" }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <ThemeToggle className="w-9 h-9 rounded-2xl" />

        <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-2xl px-2.5 py-1.5 text-xs font-black text-rose-500">
          <span>❤️</span>
          <span>{hearts}</span>
        </div>
        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl px-2.5 py-1.5 text-xs font-black text-amber-500">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{visualStars}</span>
        </div>
      </div>
    </header>
  );
}
