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
  badgeBg?: string;
  badgeTextColor?: string;
}

export function SelectionCard({
  title,
  subtitle,
  icon,
  selected,
  onClick,
  className,
  badgeBg,
  badgeTextColor,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex items-center justify-between w-full p-4 md:p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left shadow-xs",
        selected
          ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/25 dark:border-emerald-500 ring-1 ring-emerald-500/30"
          : "border-slate-200 bg-white hover:border-slate-300 dark:border-[#1e293b] dark:bg-[#111722] dark:hover:border-slate-700",
        className
      )}
    >
      <div className="flex items-center gap-3.5 min-w-0 grow">
        {icon && (
          <div
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
              badgeBg
                ? badgeBg
                : selected
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
              badgeTextColor
            )}
          >
            {icon}
          </div>
        )}
        <div className="flex flex-col min-w-0 pr-2">
          <span
            className={cn(
              "font-bold text-base md:text-[17px] leading-tight tracking-tight transition-colors",
              selected
                ? "text-emerald-700 dark:text-emerald-400 font-extrabold"
                : "text-slate-900 dark:text-white"
            )}
          >
            {title}
          </span>
          {subtitle && (
            <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium leading-normal mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Radio Indicator */}
      <div className="shrink-0 flex items-center justify-center pl-2">
        <div
          className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
            selected
              ? "border-emerald-500 bg-transparent dark:border-emerald-400"
              : "border-slate-300 dark:border-slate-600"
          )}
        >
          {selected && (
            <div className="w-3 h-3 rounded-full bg-emerald-600 dark:bg-emerald-400 transition-transform scale-100" />
          )}
        </div>
      </div>
    </button>
  );
}