"use client";

import React from "react";
import { Home, BookOpen, Star, Trophy, User, ChevronLeft } from "lucide-react";
import { FlyingStar } from "../../../utils/types";
import { MAP_NODES, PATH_D } from "../../../lib/constants/levels";
import { MapNodeCard } from "../sections/MapNodeCard";
import { FlyingStarParticle } from "../particles/FlyingStarParticle";
import { ThemeToggle } from "../../ui/theme-toggle";
import Link from "next/link";

interface MapViewProps {
  visualStars: number;
  flyingStars: FlyingStar[];
  headerBounce: boolean;
  starPillRef: React.RefObject<HTMLDivElement | null>;
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
  levelStates: Record<string, "locked" | "unlocked" | "completed" | "demo_completed">;
  setCurrentLevelIdx: (idx: number) => void;
  resetLevel: () => void;
  setView: (view: "map" | "lesson1_theory" | "game" | "sorting_game") => void;
  triggerSound: (type: "tap" | "step" | "pickup" | "win" | "lose" | "hint") => void;
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
    <main className="min-h-screen relative w-full flex flex-col items-center bg-background text-foreground font-sans select-none transition-colors duration-200">
      {/* Flying star particles */}
      {flyingStars.map((fs) => (
        <FlyingStarParticle key={fs.id} fromX={fs.fromX} fromY={fs.fromY} targetRef={starPillRef} />
      ))}

      {/* ── Header ── */}
      <header className="w-full max-w-lg flex items-center justify-between px-4 py-3 mt-2">
        <Link href="/courses">
          <button className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#1e293b] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#182232] transition-all active:scale-95 cursor-pointer shadow-xs">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </Link>

        <h1 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
          Programming Basics
        </h1>

        <div className="flex items-center gap-2">
          <ThemeToggle className="w-10 h-10 rounded-2xl" />

          <div
            ref={starPillRef}
            className={`flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl px-3 py-1.5 shadow-xs transition-transform ${
              headerBounce ? "scale-125" : "scale-100"
            }`}
            style={{ transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-xs md:text-sm font-black text-amber-600 dark:text-amber-400 tabular-nums">
              {visualStars}
            </span>
          </div>
        </div>
      </header>

      {/* ── Map card ── */}
      <div
        ref={mapContainerRef}
        className="relative w-full max-w-lg mx-4 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-[#1e293b] mb-24"
        style={{ height: 520 }}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/map_bg.png" alt="Map background" className="absolute inset-0 w-full h-full object-cover" />

        {/* Gradient overlay top & bottom for depth */}
        {/* ── Level connecting road ── */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <path d={PATH_D} fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="6.5" strokeLinecap="round" />
          <path d={PATH_D} fill="none" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
          <path d={PATH_D} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3,4" opacity="0.9" />
        </svg>
        {MAP_NODES.map((node) => {
          const status = levelStates[node.key] || "locked";
          const isNext = status === "unlocked" || status === "demo_completed";
          const isDone = status === "completed";
          const isLocked = status === "locked";

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
                triggerSound("tap");
                if (node.id === 1) {
                  setView("lesson1_theory");
                  setCurrentLevelIdx(0);
                } else if (node.id === 2) {
                  const startIdx = status === "demo_completed" || status === "completed" ? 1 : 0;
                  setCurrentLevelIdx(startIdx);
                  resetLevel();
                  setView("game");
                } else if (node.id === 3) {
                  setCurrentLevelIdx(2);
                  setView("sorting_game");
                }
              }}
            />
          );
        })}

        {/* ── Mascot bottom left ── */}
        <div className="absolute -bottom-6 -left-4 w-36 h-36 pointer-events-none z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/lumis-wayfing.png" alt="Mascot" className="w-full h-full object-contain drop-shadow-lg" />
        </div>
      </div>

      {/* ── Bottom Navigation Bar ── */}
      <nav className="fixed bottom-4 w-full max-w-lg mx-auto rounded-2xl bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#1e293b] shadow-lg flex justify-around items-center py-2.5 px-4 z-50">
        {[
          { icon: <Home className="w-5 h-5" />, label: "Home", active: false },
          { icon: <BookOpen className="w-5 h-5" />, label: "Learn", active: true },
          { icon: <Star className="w-5 h-5" />, label: "Challenges", active: false },
          { icon: <Trophy className="w-5 h-5" />, label: "Badges", active: false },
          { icon: <User className="w-5 h-5" />, label: "Profile", active: false },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => triggerSound("tap")}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all cursor-pointer ${
              item.active
                ? "text-emerald-600 dark:text-emerald-400 font-extrabold"
                : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            }`}
          >
            <span>{item.icon}</span>
            <span className="text-[10px] tracking-wide">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </main>
  );
}
