'use client';
import React from 'react';

interface MascotBannerProps {
  message: string;
}

export function MascotBanner({ message }: MascotBannerProps) {
  return (
    <div className="relative flex gap-3 items-start bg-white/90 border-2 border-white backdrop-blur rounded-3xl p-4 shadow-lg mb-4 mt-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/mascot-bulb.png"
        onError={(e) => {
          e.currentTarget.src = "/images/running-lumi.webp";
        }}
        alt="Lumi Mascot"
        className="w-14 h-14 object-contain shrink-0 animate-bounce-slow"
      />
      <div className="flex-1">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-0.5">Lumi the Bulb</h3>
        <p className="text-xs font-bold text-slate-700 leading-relaxed transition-all duration-300">
          {message}
        </p>
      </div>
    </div>
  );
}
