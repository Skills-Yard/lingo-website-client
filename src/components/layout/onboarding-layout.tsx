"use client";

import { ChevronLeft, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { KojiLogo } from "@/components/icons/koji-logo";

interface OnboardingLayoutProps {
  children: ReactNode;
  step?: number;
  totalSteps?: number;
  title: string | ReactNode;
  subtitle?: string;
  onContinue: () => void;
  isContinueDisabled?: boolean;
  showLogo?: boolean;
}

export function OnboardingLayout({
  children,
  step,
  totalSteps = 4,
  title,
  subtitle,
  onContinue,
  isContinueDisabled = false,
  showLogo = true,
}: OnboardingLayoutProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto p-4 sm:p-6 bg-[var(--background)] text-[var(--foreground)]">
      {/* Top Navigation & Progress */}
      {step !== undefined && (
        <div className="flex items-center justify-between mb-8 gap-4">
          <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-[var(--surface-strong)]">
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex-1 flex gap-2 max-w-[200px]">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full flex-1 ${
                  i < step ? "bg-green-500" : "bg-[var(--border)]"
                }`}
              />
            ))}
          </div>

          <button className="p-2 -mr-2 rounded-full hover:bg-[var(--surface-strong)]">
            <Volume2 className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      )}

      {/* Header Area */}
      <div className="flex flex-col items-center mb-8 gap-6 mt-4">
        {showLogo && <KojiLogo />}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-[var(--muted)] text-lg">{subtitle}</p>}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col mb-24">
        {children}
      </div>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-[var(--background)] via-[var(--background)] to-transparent flex justify-center">
        <div className="w-full max-w-md">
          <Button 
            className="w-full rounded-2xl h-14 text-lg font-bold bg-[#333333] hover:bg-[#222222] text-white dark:bg-[#e5e5e5] dark:text-black dark:hover:bg-[#cccccc]"
            onClick={onContinue}
            disabled={isContinueDisabled}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}