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
          ? "border-primary bg-secondary text-secondary-foreground ring-2 ring-primary/20"
          : "border-border bg-card hover:border-muted-foreground/50 hover:bg-surface-strong text-foreground",
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center mb-2.5 transition-transform",
            selected
              ? "bg-primary/15 text-primary"
              : "bg-muted text-muted-foreground"
          )}
        >
          {icon}
        </div>
      )}
      <span className="font-extrabold text-sm md:text-base leading-snug">{title}</span>
      {subtitle && (
        <span className="text-xs text-muted-foreground font-medium mt-0.5">{subtitle}</span>
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
          ? "border-primary bg-secondary text-secondary-foreground ring-2 ring-primary/20"
          : "border-border bg-card hover:border-muted-foreground/50 hover:bg-surface-strong text-foreground"
      )}
    >
      <div className="font-mono text-xs md:text-sm text-primary mb-2 min-h-8 flex items-center justify-center font-bold">
        {codeSnippet}
      </div>
      <h3 className="font-black text-lg md:text-xl mb-1">{level}</h3>
      <p className="text-xs text-muted-foreground leading-tight font-medium">{description}</p>
    </button>
  );
}
