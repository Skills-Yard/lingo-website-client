import React from 'react';
import { Lock, Star } from 'lucide-react';

interface Node {
  id: number;
  key: string;
  name: string;
  x: number;
  y: number;
}

interface MapNodeCardProps {
  node: Node;
  status: 'locked' | 'unlocked' | 'completed' | 'demo_completed';
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
      className="absolute flex items-center gap-2"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* ── Circular node button ── */}
      <button
        onClick={onNodeClick}
        className={`
          relative flex items-center justify-center rounded-full font-black text-white
          transition-all duration-150 active:scale-95
          ${
            isLocked
              ? 'w-12 h-12 bg-slate-400 border-b-4 border-slate-500 cursor-not-allowed shadow-md'
              : isDone
              ? 'min-w-14 min-h-14 bg-[#58cc02] border-b-[5px] border-[#3ea800] hover:bg-[#65e002] shadow-[0_4px_14px_rgba(88,204,2,0.45)] cursor-pointer'
              : 'min-w-14 min-h-14 bg-[#58cc02] border-b-[5px] border-[#3ea800] hover:bg-[#65e002] shadow-[0_4px_14px_rgba(88,204,2,0.45)] cursor-pointer ring-4 ring-[#58cc02]/30'
          }
        `}
      >
        {isLocked ? <Lock className="w-5 h-5 text-white" /> : <span className="text-xl">{node.id}</span>}

        {/* Pulse ring for active node */}
        {isNext && <span className="absolute inset-0 rounded-full bg-[#58cc02]/30 animate-ping" />}
      </button>

      {/* ── Label capsule (right side) ── */}
      <div
        className={`
          flex flex-col px-3 py-1.5 rounded-2xl shadow-md border
          ${isDone ? 'bg-white border-slate-200' : isNext ? 'bg-[#d7f5c5] border-[#58cc02]/40' : 'bg-white/80 border-slate-200'}
        `}
        style={{ minWidth: 110, maxWidth: 140 }}
      >
        <span className={`text-[12px] font-black leading-tight ${isLocked ? 'text-slate-400' : isDone ? 'text-slate-700' : 'text-[#3a9900]'}`}>
          {node.name}
        </span>
        {isDone && (
          <div className="flex gap-0.5 mt-0.5">
            {[0, 1, 2].map(i => (
              <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
