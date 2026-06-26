"use client";

import { cn } from "@/lib/utils";

interface LevelCardProps {
  codeSnippet: React.ReactNode;
  level: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export function LevelCard({ codeSnippet, level, description, selected, onClick, className }: LevelCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 bg-[var(--surface)] w-full text-center min-h-[220px]",
        selected 
          ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20" 
          : "border-[var(--border)] hover:border-gray-300 dark:hover:border-gray-600",
        className
      )}
    >
      <div className="font-mono text-sm md:text-base text-purple-600 dark:text-purple-400 mb-6 min-h-[40px] flex items-center justify-center">
        {codeSnippet}
      </div>
      <h3 className="font-bold text-lg mb-2">{level}</h3>
      <p className="text-[var(--muted)] text-sm leading-tight">{description}</p>
    </button>
  );
}   