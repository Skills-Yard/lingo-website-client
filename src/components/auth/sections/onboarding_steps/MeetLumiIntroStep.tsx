"use client";

import React from "react";
import { ChevronLeft, ArrowRight } from "lucide-react";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
  onSkipToAuth?: () => void;
}

export function MeetLumiIntroStep({ onNext, onBack, onSkipToAuth }: StepProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center font-sans bg-background text-foreground p-0 sm:p-4 transition-colors">
      <div className="w-full h-screen sm:h-[760px] sm:max-h-[90vh] sm:max-w-[390px] sm:rounded-3xl overflow-hidden flex flex-col justify-between p-6 relative bg-card border border-border shadow-xl">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between mt-3">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-surface-strong hover:bg-border border border-border flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-xs"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Meet Lumi Title */}
        <div className="text-center mt-3">
          <h2 className="text-3xl font-black text-foreground leading-tight">
            Meet <span className="text-primary">Lumi!</span>
          </h2>
        </div>

        {/* Character Image */}
        <div className="relative flex justify-center items-center my-auto max-h-[220px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/new-cractor2.png"
            alt="Lumi character"
            className="w-[180px] h-[180px] object-contain select-none transform hover:scale-105 transition-transform duration-300 animate-bounce-slow"
          />
        </div>

        {/* Description Text */}
        <div className="text-center px-3 mb-3">
          <p className="text-sm md:text-base font-bold text-muted-foreground leading-relaxed">
            Your friendly coding companion who&apos;s here to make learning fun and interactive!
          </p>
        </div>

        {/* Action Buttons & Page Indicator */}
        <div className="flex flex-col gap-3 mt-auto mb-6 items-center">
          <button
            type="button"
            onClick={onNext}
            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg transition-all active:scale-98 shadow-lg cursor-pointer flex items-center justify-center gap-2 select-none"
          >
            <span>Get started</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => onSkipToAuth && onSkipToAuth()}
            className="w-full h-13 rounded-2xl bg-surface-strong hover:bg-border border border-border text-foreground font-extrabold text-sm transition-all active:scale-98 cursor-pointer flex items-center justify-center select-none"
          >
            Already have an account?
          </button>

          <div className="flex gap-2 mt-2">
            <div className="h-1.5 w-12 rounded-full bg-muted transition-all duration-300" />
            <div className="h-1.5 w-12 rounded-full bg-primary transition-all duration-300" />
            <div className="h-1.5 w-12 rounded-full bg-muted transition-all duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
