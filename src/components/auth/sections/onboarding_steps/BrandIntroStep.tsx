"use client";

import React, { useState, useEffect } from "react";
import { removeImageBackground } from "@/utils/imageUtils";

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
    <div className="min-h-screen w-full flex items-center justify-center font-sans p-0 sm:p-4">
      {/* Mobile Card Mockup Container */}
      <div className="w-full h-screen sm:h-[760px] sm:max-h-[90vh] sm:max-w-[390px] sm:rounded-[36px] overflow-hidden flex flex-col justify-between p-6 relative">

        {/* Lingo Title */}
        <div className="flex justify-center mt-16 sm:mt-12">
          <h1 className="text-5xl font-black text-[#7C73E6] tracking-wide font-sans select-none drop-shadow-[0_2px_8px_rgba(124,115,230,0.15)]">
            Lingo
          </h1>
        </div>

        {/* Circular Mascot Frame */}
        <div className="relative flex justify-center items-center my-auto">
          {/* Decorative Sparks/Stars */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Spark 1 - Top Left */}
            <svg className="absolute top-[5%] left-[12%] w-6 h-6 text-amber-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {/* Spark 2 - Mid Left */}
            <svg className="absolute top-[40%] left-[6%] w-5 h-5 text-amber-400 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {/* Spark 3 - Bottom Left */}
            <svg className="absolute bottom-[10%] left-[15%] w-4 h-4 text-amber-300 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {/* Spark 4 - Top Right */}
            <svg className="absolute top-[12%] right-[10%] w-7 h-7 text-amber-400 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {/* Spark 5 - Mid Right */}
            <svg className="absolute top-[45%] right-[5%] w-5 h-5 text-amber-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          {/* Circle */}
          <div className="w-[210px] h-[210px] rounded-full border-6 border-white bg-gradient-to-b from-[#A2A4FC] to-[#D5D7FF] flex items-center justify-center overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.2)] transform hover:scale-105 transition-transform duration-300">
            <img
              src={transparentSrc}
              alt="Lumi Starry Eyes"
              className="w-[170px] h-[170px] object-contain select-none transform translate-y-1"
            />
          </div>
        </div>

        {/* Continue Button & Page Indicator */}
        <div className="flex flex-col gap-6 mt-auto mb-8 sm:mb-4 items-center">
          <button
            onClick={onNext}
            className="w-full h-14 rounded-2xl bg-[#7C73E6] border-b-4 border-[#5E54C9] hover:bg-[#8C83FA] text-white font-black text-lg transition-all active:translate-y-0.5 active:border-b-2 shadow-md cursor-pointer flex items-center justify-center select-none"
          >
            Continue
          </button>

          {/* Progress Dash Indicators */}
          <div className="flex gap-2.5 mt-2">
            <div className="h-1.5 w-12 rounded-full bg-[#7C73E6] opacity-100 transition-all duration-300 shadow-[0_0_6px_rgba(124,115,230,0.5)]" />
            <div className="h-1.5 w-12 rounded-full bg-[#7C73E6] opacity-30 transition-all duration-300" />
            <div className="h-1.5 w-12 rounded-full bg-[#7C73E6] opacity-30 transition-all duration-300" />
          </div>
        </div>

      </div>
    </div>
  );
}
