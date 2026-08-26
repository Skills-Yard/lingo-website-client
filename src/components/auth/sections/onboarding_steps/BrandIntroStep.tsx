"use client";

import React, { useState, useEffect } from "react";
import { removeImageBackground } from "@/utils/imageUtils";
import { ArrowRight } from "lucide-react";

interface StepProps {
  onNext: () => void;
}

export function BrandIntroStep({ onNext }: StepProps) {
  const [transparentSrc, setTransparentSrc] = useState<string>("/images/image 7.png");

  useEffect(() => {
    removeImageBackground("/images/image 7.png").then((src) => {
      setTransparentSrc(src);
    });
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center font-sans bg-background text-foreground p-0 sm:p-4 transition-colors">
      <div className="w-full h-screen sm:h-[760px] sm:max-h-[90vh] sm:max-w-[390px] sm:rounded-3xl overflow-hidden flex flex-col justify-between p-6 relative bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#1e293b] shadow-xl">
        {/* Lingo Title */}
        <div className="flex justify-center mt-12 sm:mt-10">
          <h1 className="text-5xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight font-sans select-none drop-shadow-xs">
            Lingo
          </h1>
        </div>

        {/* Circular Mascot Frame */}
        <div className="relative flex justify-center items-center my-auto">
          {/* Decorative Sparks */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="absolute top-[5%] left-[12%] w-6 h-6 text-amber-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg className="absolute top-[40%] left-[6%] w-5 h-5 text-amber-400 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg className="absolute top-[12%] right-[10%] w-7 h-7 text-amber-400 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          <div className="w-[200px] h-[200px] rounded-full border-4 border-emerald-500/20 bg-gradient-to-b from-emerald-100 to-teal-50 dark:from-emerald-950/60 dark:to-[#182232] flex items-center justify-center overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={transparentSrc}
              alt="Lumi Starry Eyes"
              className="w-[160px] h-[160px] object-contain select-none transform translate-y-1"
            />
          </div>
        </div>

        {/* Continue Button & Progress */}
        <div className="flex flex-col gap-5 mt-auto mb-6 items-center">
          <button
            type="button"
            onClick={onNext}
            className="w-full h-14 rounded-2xl bg-[#059669] hover:bg-[#047857] dark:bg-[#10b981] dark:hover:bg-[#059669] text-white font-black text-lg transition-all active:scale-98 shadow-lg cursor-pointer flex items-center justify-center gap-2 select-none"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            <div className="h-1.5 w-12 rounded-full bg-emerald-600 dark:bg-emerald-400 transition-all duration-300" />
            <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-[#1e293b] transition-all duration-300" />
            <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-[#1e293b] transition-all duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
