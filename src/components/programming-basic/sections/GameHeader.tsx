import { Star } from 'lucide-react';
import { LevelConfig } from '../../../utils/types';

interface GameHeaderProps {
  level: LevelConfig;
  currentLevelIdx: number;
  totalLevels: number;
  hearts: number;
  visualStars: number;
  setView: (view: 'map' | 'lesson1_theory' | 'game') => void;
  triggerSound: (type: 'tap' | 'step' | 'pickup' | 'win' | 'lose' | 'hint') => void;
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
    <header className="flex items-center justify-between gap-3 mb-2 w-full bg-white/95 backdrop-blur shadow-sm border border-slate-100 rounded-2xl p-2.5 select-none">
      <button
        onClick={() => {
          triggerSound('tap');
          setView('map');
        }}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 shadow-sm active:scale-95 transition-all cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1 px-1">
          <span className={`text-[10px] font-bold tracking-wide uppercase ${level.isDemo ? 'text-amber-500' : 'text-indigo-600'}`}>
            {level.isDemo ? '🎓 ' : ''}
            {level.name}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            {level.isDemo ? 'Practice' : `${currentLevelIdx}/${totalLevels - 1}`}
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${level.isDemo ? 'bg-amber-400' : 'bg-[#58cc02]'}`}
            style={{ width: level.isDemo ? '50%' : '100%' }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-rose-50 border border-rose-100 rounded-xl px-2.5 py-1.5 text-xs font-black text-rose-500">
          <span>❤️</span>
          <span>{hearts}</span>
        </div>
        <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-xl px-2.5 py-1.5 text-xs font-black text-amber-500">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{visualStars}</span>
        </div>
      </div>
    </header>
  );
}
