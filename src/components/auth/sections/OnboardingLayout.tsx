import React from "react";
import { ChevronLeft, Volume2 } from "lucide-react";
import { LumiLogo } from "@/components/ui/koji-logo";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  step?: number;
  totalSteps?: number;
  title: string;
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
  totalSteps = 7,
  title,
  subtitle,
  onContinue,
  isContinueDisabled = false,
  showLogo = true,
  onBack,
  showContinueButton = true,
  continueLabel: _continueLabel = "Continue"
}: OnboardingLayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-linear-to-b from-sky-100 via-blue-50 to-yellow-50 text-slate-800 font-sans flex flex-col items-center py-6 px-4">
      {/* Background Clouds decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        <div className="absolute top-[10%] -left-25 w-50 h-20 bg-white rounded-full blur-[1px] animate-pulse" />
        <div className="absolute top-[30%] -right-30 w-62.5 h-22.5 bg-white rounded-full blur-[1px]" />
      </div>

      <div className="relative w-full max-w-md flex flex-col z-10 grow">
        {/* Navigation & Progress Bar */}
        {step !== undefined && (
          <header className="flex items-center justify-between gap-3 mb-6">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-all active:translate-y-0.5 active:border-b-2 cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>

            <div className="flex-1 flex gap-1.5 px-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-full grow border border-slate-200/50 shadow-inner ${i < step
                      ? "bg-[#58cc02] shadow-[0_0_8px_rgba(88,204,2,0.4)]"
                      : "bg-slate-200"
                    }`}
                />
              ))}
            </div>

            <button
              className="w-10 h-10 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-all active:translate-y-0.5 active:border-b-2 cursor-pointer shadow-sm"
            >
              <Volume2 className="w-5 h-5 text-slate-600" />
            </button>
          </header>
        )}

        {/* Content Container */}
        <div className="grow flex flex-col justify-center items-center py-4 mb-28">
          {showLogo && (
            <div className="mb-6 flex justify-center transform hover:scale-105 transition-transform">
              <LumiLogo variant="study" className="w-24 h-24 drop-shadow-md animate-bounce-slow" priority noBackground={true} />
            </div>
          )}

          <div className="text-center w-full mb-8">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-tight mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm md:text-base text-slate-500 font-bold leading-relaxed px-4">
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
          <footer className="fixed bottom-0 left-0 right-0 p-4 bg-linear-to-t from-sky-50 via-sky-50/90 to-transparent flex justify-center z-20">
            <div className="w-full max-w-md">
              <button
                onClick={onContinue}
                disabled={isContinueDisabled}
                className={`h-14 w-full rounded-2xl font-black text-lg transition-all border-b-4 flex items-center justify-center gap-2 cursor-pointer active:translate-y-0.5 active:border-b-2 shadow-md ${isContinueDisabled
                    ? "bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed shadow-none"
                    : "bg-[#58cc02] border-[#3ea800] hover:bg-[#65e002] text-white"
                  }`}
              >
                Continue
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
