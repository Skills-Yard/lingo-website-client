"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SelectionCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export function SelectionCard({ title, subtitle, icon, selected, onClick, className = "" }: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-5 md:p-6 rounded-2xl border transition-all duration-200 w-full min-h-32 shadow-xs cursor-pointer active:scale-98 text-center",
        selected
          ? "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/20"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 text-slate-800 dark:border-[#1e293b] dark:bg-[#111722] dark:hover:border-slate-700 dark:text-white",
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center mb-2.5 transition-transform",
            selected
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300"
              : "bg-slate-100 text-slate-600 dark:bg-[#182232] dark:text-slate-300"
          )}
        >
          {icon}
        </div>
      )}
      <span className="font-extrabold text-sm md:text-base leading-snug">{title}</span>
      {subtitle && (
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{subtitle}</span>
      )}
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
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-200 w-full min-h-36 shadow-xs cursor-pointer active:scale-98 text-center",
        selected
          ? "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/20"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800 dark:border-[#1e293b] dark:bg-[#111722] dark:hover:border-slate-700 dark:text-white"
      )}
    >
      <div className="font-mono text-xs md:text-sm text-emerald-600 dark:text-emerald-400 mb-2 min-h-8 flex items-center justify-center font-bold">
        {codeSnippet}
      </div>
      <h3 className="font-black text-lg md:text-xl mb-1">{level}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight font-medium">{description}</p>
    </button>
  );
}
