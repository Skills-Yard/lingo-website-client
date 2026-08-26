"use client";

import React from "react";

interface MascotBannerProps {
  message: string;
}

export function MascotBanner({ message }: MascotBannerProps) {
  return (
    <div className="relative flex gap-3 items-start bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#1e293b] rounded-2xl p-4 shadow-xs mb-4 mt-2 transition-colors">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/mascot-bulb.png"
        onError={(e) => {
          e.currentTarget.src = "/images/running-lumi.webp";
        }}
        alt="Lumi Mascot"
        className="w-12 h-12 object-contain shrink-0 animate-bounce-slow"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-0.5">Lumi Guide</h3>
        <p className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed transition-all duration-300">
          {message}
        </p>
      </div>
    </div>
  );
}
