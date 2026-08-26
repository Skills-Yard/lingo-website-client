"use client";

import React from "react";
import { ChevronLeft, ArrowRight } from "lucide-react";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

export function ReadyIntroStep({ onNext, onBack }: StepProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center font-sans bg-background text-foreground p-0 sm:p-4 transition-colors">
      <div className="w-full h-screen sm:h-[760px] sm:max-h-[90vh] sm:max-w-[390px] sm:rounded-3xl overflow-hidden flex flex-col justify-between p-6 relative bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#1e293b] shadow-xl">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between mt-3 z-10">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-[#182232] dark:hover:bg-[#1c293d] border border-slate-200 dark:border-[#1e293b] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-xs"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          </button>
        </div>

        {/* Top Header Text */}
        <div className="text-center mt-3 px-2 z-10">
          <p className="text-sm md:text-base font-bold text-slate-600 dark:text-slate-400 leading-relaxed max-w-[280px] mx-auto">
            Just a few quick questions to personalize your plan!
          </p>
        </div>

        {/* Character Image */}
        <div className="relative flex justify-center items-center my-auto max-h-[220px] z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/new-cractor1.png"
            alt="Lumi ready character"
            className="w-[180px] h-[180px] object-contain select-none transform hover:scale-105 transition-transform duration-300 animate-bounce-slow"
          />
        </div>

        {/* Ready Mate? Prompt */}
        <div className="text-center mb-3 z-10">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
            Ready to <span className="text-emerald-600 dark:text-emerald-400">start?</span>
          </h2>
        </div>

        {/* Action Buttons & Page Indicator */}
        <div className="flex flex-col gap-4 mt-auto mb-6 items-center z-10">
          <button
            type="button"
            onClick={onNext}
            className="w-full h-14 rounded-2xl bg-[#059669] hover:bg-[#047857] dark:bg-[#10b981] dark:hover:bg-[#059669] text-white font-black text-lg transition-all active:scale-98 shadow-lg cursor-pointer flex items-center justify-center gap-2 select-none"
          >
            <span>Let&apos;s go</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-[#1e293b] transition-all duration-300" />
            <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-[#1e293b] transition-all duration-300" />
            <div className="h-1.5 w-12 rounded-full bg-emerald-600 dark:bg-emerald-400 transition-all duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
