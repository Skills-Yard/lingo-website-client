"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center gap-2 p-2.5 rounded-2xl border transition-all duration-200 cursor-pointer shadow-xs active:scale-95 ${
        theme === "dark"
          ? "bg-[#161f2e] border-[#22365a] text-amber-400 hover:bg-[#1c293d] hover:border-[#324a73]"
          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
      } ${className}`}
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 transition-transform rotate-0 scale-100" />
      ) : (
        <Moon className="w-5 h-5 transition-transform rotate-0 scale-100" />
      )}
      {showLabel && (
        <span className="text-xs font-bold capitalize">
          {theme === "dark" ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
}
