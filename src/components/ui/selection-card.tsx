"use client";

import { cn } from "@/lib/utils";

interface SelectionCardProps {
  title: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export function SelectionCard({ title, icon, selected, onClick, className }: SelectionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 bg-[var(--surface)] w-full gap-4",
        selected 
          ? "border-green-500 bg-green-50 dark:bg-green-950/20" 
          : "border-[var(--border)] hover:border-gray-300 dark:hover:border-gray-600",
        className
      )}
    >
      {icon && <div className="text-4xl mb-2">{icon}</div>}
      <span className="font-semibold text-center text-lg">{title}</span>
    </button>
  );
}