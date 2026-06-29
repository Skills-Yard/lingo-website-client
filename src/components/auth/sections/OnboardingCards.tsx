import React from "react";

interface SelectionCardProps {
  title: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export function SelectionCard({ title, icon, selected, onClick, className = "" }: SelectionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-b-4 transition-all duration-150 w-full min-h-[140px] shadow-md cursor-pointer active:translate-y-0.5 active:border-b-2 ${
        selected 
          ? "border-[#58cc02] bg-[#d7f5c5] text-[#2d7a00] border-b-[6px] shadow-[0_0_14px_rgba(88,204,2,0.25)]" 
          : "border-slate-200 bg-white/80 hover:bg-slate-50/90 hover:border-slate-300 text-slate-700"
      } ${className}`}
    >
      {icon && <div className="text-3xl mb-3 flex items-center justify-center">{icon}</div>}
      <span className="font-extrabold text-center text-sm md:text-base leading-tight">{title}</span>
    </button>
  );
}

interface LevelCardProps {
  codeSnippet: React.ReactNode;
  level: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export function LevelCard({ codeSnippet, level, description, selected, onClick }: LevelCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-5 rounded-3xl border-2 border-b-4 transition-all duration-150 w-full min-h-[150px] shadow-md cursor-pointer active:translate-y-0.5 active:border-b-2 ${
        selected 
          ? "border-[#7c3aed] bg-[#f3e8ff] text-[#5b21b6] border-b-[6px] shadow-[0_0_14px_rgba(124,58,237,0.2)]" 
          : "border-slate-200 bg-white/80 hover:bg-slate-50/90 hover:border-slate-300 text-slate-700"
      }`}
    >
      <div className="font-mono text-xs md:text-sm text-indigo-600 dark:text-indigo-400 mb-3 min-h-[35px] flex items-center justify-center">
        {codeSnippet}
      </div>
      <h3 className="font-black text-lg md:text-xl mb-1">{level}</h3>
      <p className="text-xs opacity-80 leading-tight font-semibold">{description}</p>
    </button>
  );
}
