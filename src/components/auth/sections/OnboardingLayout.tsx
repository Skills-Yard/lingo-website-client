"use client";

import React from "react";
import { ChevronLeft, Volume2, ArrowRight } from "lucide-react";
import { LumiLogo } from "@/components/ui/koji-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  step?: number;
  totalSteps?: number;
  title: string;
  highlightWord?: string;
  subtitle?: string;
  onContinue: () => void;
  isContinueDisabled?: boolean;
  showLogo?: boolean;
  onBack: () => void;
  showContinueButton?: boolean;
  continueLabel?: string;
}

export function OnboardingLayout({
  children,
  step,
  totalSteps = 8,
  title,
  highlightWord,
  subtitle,
  onContinue,
  isContinueDisabled = false,
  showLogo = true,
  onBack,
  showContinueButton = true,
  continueLabel = "Continue"
}: OnboardingLayoutProps) {
  // Format step number with leading zero e.g. "03"
  const formattedStep = step !== undefined ? String(step + 1).padStart(2, "0") : "01";
  const formattedTotal = String(totalSteps).padStart(2, "0");

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground font-sans flex flex-col items-center py-5 px-4 transition-colors duration-200">
      <div className="relative w-full max-w-md flex flex-col z-10 grow">
        {/* Navigation & Progress Bar Header */}
        {step !== undefined ? (
          <header className="flex items-center justify-between gap-3 mb-6">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-2xl border border-border bg-card hover:bg-surface-strong flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-xs"
              aria-label="Back"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            {/* Segmented Progress with Step Counter */}
            <div className="flex-1 flex flex-col items-center gap-1.5 px-2">
              <div className="text-xs font-black tracking-wider flex items-center gap-1">
                <span className="text-primary font-extrabold">{formattedStep}</span>
                <span className="text-muted-foreground font-semibold">/ {formattedTotal}</span>
              </div>
              <div className="w-full flex gap-1.5">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full grow transition-all duration-300 ${
                      i <= step
                        ? "bg-primary shadow-[0_0_8px_rgba(1,161,127,0.35)]"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <ThemeToggle className="w-10 h-10 rounded-2xl" />
            </div>
          </header>
        ) : (
          <header className="flex items-center justify-between gap-3 mb-6">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-2xl border border-border bg-card hover:bg-surface-strong flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <ThemeToggle className="w-10 h-10 rounded-2xl" />
          </header>
        )}

        {/* Content Container */}
        <div className="grow flex flex-col justify-center items-center py-2 mb-28">
          {showLogo && (
            <div className="mb-5 flex justify-center transform hover:scale-105 transition-transform">
              <LumiLogo variant="study" className="w-24 h-24 drop-shadow-md animate-bounce-slow" priority noBackground={true} />
            </div>
          )}

          <div className="text-center w-full mb-6">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground leading-tight mb-2">
              {highlightWord ? (
                <>
                  <span className="text-primary">{highlightWord} </span>
                  {title.replace(highlightWord, "").trim()}
                </>
              ) : (
                title
              )}
            </h1>
            {subtitle && (
              <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed px-2">
                {subtitle}
              </p>
            )}
          </div>

          <div className="w-full">
            {children}
          </div>
        </div>

        {/* Sticky Continue Button */}
        {showContinueButton && (
          <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent flex justify-center z-20 backdrop-blur-xs">
            <div className="w-full max-w-md">
              <button
                type="button"
                onClick={onContinue}
                disabled={isContinueDisabled}
                className={`h-14 w-full rounded-2xl font-black text-base md:text-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99] ${
                  isContinueDisabled
                    ? "bg-muted text-muted-foreground border border-border cursor-not-allowed shadow-none"
                    : "bg-primary hover:bg-primary/90 text-primary-foreground border border-primary/30"
                }`}
              >
                <span>{continueLabel}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
