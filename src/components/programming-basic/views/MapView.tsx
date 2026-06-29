import React from 'react';
import { Home, BookOpen, Star, Trophy, User, ChevronLeft } from 'lucide-react';
import { FlyingStar } from '../../../utils/types';
import { MAP_NODES, PATH_D } from '../../../lib/constants/levels';
import { MapNodeCard } from '../sections/MapNodeCard';
import { FlyingStarParticle } from '../particles/FlyingStarParticle';
import Link from 'next/link';

interface MapViewProps {
  visualStars: number;
  flyingStars: FlyingStar[];
  headerBounce: boolean;
  starPillRef: React.RefObject<HTMLDivElement | null>;
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
  levelStates: Record<string, 'locked' | 'unlocked' | 'completed' | 'demo_completed'>;
  setCurrentLevelIdx: (idx: number) => void;
  resetLevel: () => void;
  setView: (view: 'map' | 'lesson1_theory' | 'game') => void;
  triggerSound: (type: 'tap' | 'step' | 'pickup' | 'win' | 'lose' | 'hint') => void;
}

export function MapView({
  visualStars,
  flyingStars,
  headerBounce,
  starPillRef,
  mapContainerRef,
  levelStates,
  setCurrentLevelIdx,
  resetLevel,
  setView,
  triggerSound,
}: MapViewProps) {
  return (
    <main className="min-h-screen relative w-full flex flex-col items-center bg-linear-to-b from-sky-100 via-blue-50 to-yellow-50 font-sans select-none">
      {/* Flying star particles */}
      {flyingStars.map(fs => (
        <FlyingStarParticle key={fs.id} fromX={fs.fromX} fromY={fs.fromY} targetRef={starPillRef} />
      ))}

      {/* ── Header ── */}
      <header className="w-full max-w-lg flex items-center justify-between px-4 py-3 mt-2">
        <Link href={"/courses"}>
          <button className="w-9 h-9 flex items-center justify-center rounded-2xl bg-white/80 border border-slate-200 shadow-sm text-slate-500 hover:bg-white transition-all active:scale-95">
            <ChevronLeft />
          </button>
        </Link>
        <h1 className="text-[15px] font-black text-slate-800 tracking-tight">Programming Basics</h1>
        <div
          ref={starPillRef}
          className={`flex items-center gap-1.5 bg-white border border-amber-200 rounded-2xl px-3 py-1.5 shadow-sm transition-transform ${headerBounce ? 'scale-125' : 'scale-100'
            }`}
          style={{ transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}
        >
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-sm font-black text-amber-600 tabular-nums">{visualStars}</span>
        </div>
      </header>

      {/* ── Map card ── */}
      <div
        ref={mapContainerRef}
        className="relative w-full max-w-lg mx-4 rounded-[28px] overflow-hidden shadow-2xl border-2 border-white/60 mb-24"
        style={{ height: 520 }}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/map_bg.png" alt="Map background" className="absolute inset-0 w-full h-full object-cover" />

        {/* Gradient overlay top & bottom for depth */}
        <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-sky-200/30 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-green-900/30 to-transparent pointer-events-none" />

        {/* ── SVG path ── */}
        <svg viewBox="0 0 100 90" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          {/* Shadow stroke */}
          <path d={PATH_D} fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="5" strokeLinecap="round" />
          {/* Main path */}
          <path d={PATH_D} fill="none" stroke="#b0bec5" strokeWidth="4" strokeLinecap="round" />
          {/* Dashed center highlight */}
          <path d={PATH_D} fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3,5" opacity="0.7" />
        </svg>

        {/* ── Level nodes ── */}
        {MAP_NODES.map(node => {
          const status = levelStates[node.key] || 'locked';
          const isNext = status === 'unlocked' || status === 'demo_completed';
          const isDone = status === 'completed';
          const isLocked = status === 'locked';

          return (
            <MapNodeCard
              key={node.id}
              node={node}
              status={status}
              isNext={isNext}
              isDone={isDone}
              isLocked={isLocked}
              onNodeClick={() => {
                if (isLocked) return;
                triggerSound('tap');
                if (node.id === 1) {
                  setView('lesson1_theory');
                  setCurrentLevelIdx(0);
                } else if (node.id === 2) {
                  const startIdx = (status === 'demo_completed' || status === 'completed') ? 1 : 0;
                  setCurrentLevelIdx(startIdx);
                  resetLevel();
                  setView('game');
                }
              }}
            />
          );
        })}

        {/* ── Mascot bottom right ── */}
        <div className="absolute -bottom-6 -left-4 w-40 h-40 pointer-events-none z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/lumis-wayfing.png" alt="Mascot" className="w-full h-full object-contain drop-shadow-lg" />
        </div>
      </div>

      {/* ── Bottom Navigation Bar ── */}
      <nav className="fixed bottom-5 w-full max-w-lg gap-6 mx-auto rounded-xl bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex justify-around items-center py-2 px-4 z-50">
        {[
          { icon: <Home className="w-5 h-5" />, label: 'Home', active: false },
          { icon: <BookOpen className="w-5 h-5" />, label: 'Learn', active: true },
          { icon: <Star className="w-5 h-5" />, label: 'Challenges', active: false },
          { icon: <Trophy className="w-5 h-5" />, label: 'Badges', active: false },
          { icon: <User className="w-5 h-5" />, label: 'Profile', active: false },
        ].map(item => (
          <button
            key={item.label}
            onClick={() => triggerSound('tap')}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all ${item.active ? 'text-[#58cc02]' : 'text-slate-400 hover:text-slate-600'
              }`}
          >
            <span className={item.active ? 'text-[#58cc02]' : 'text-slate-400'}>{item.icon}</span>
            <span className={`text-[9px] font-bold tracking-wide ${item.active ? 'text-[#58cc02]' : 'text-slate-400'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </main>
  );
}
