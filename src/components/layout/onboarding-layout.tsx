"use client";

import { ChevronLeft, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { LumiLogo } from "@/components/ui/koji-logo";
import {
  getOnboardingStep,
  ONBOARDING_TOTAL_STEPS,
} from "@/components/layout/onboarding-progress";

interface OnboardingLayoutProps {
  children: ReactNode;
  step?: number;
  totalSteps?: number;
  title: string | ReactNode;
  subtitle?: string;
  onContinue: () => void;
  isContinueDisabled?: boolean;
  showLogo?: boolean;
  onBack?: () => void;
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
  continueLabel = "Continue",
}: OnboardingLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const resolvedStep = step ?? getOnboardingStep(pathname);
  const resolvedTotalSteps = totalSteps ?? ONBOARDING_TOTAL_STEPS;

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    router.back();
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[linear-gradient(180deg,var(--background)_0%,var(--surface)_100%)] text-[var(--foreground)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(253,224,71,0.28),_transparent_60%)]" />
      <div className="pointer-events-none absolute right-[-4rem] top-28 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(125,211,252,0.24),_transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute left-[-3rem] top-[32rem] h-52 w-52 rounded-full bg-[radial-gradient(circle,_rgba(196,181,253,0.2),_transparent_72%)] blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col p-4 sm:p-6">
        {/* Top Navigation & Progress */}
        {(resolvedStep !== undefined && resolvedStep <= 7) && (
          <div className="flex items-center justify-between mb-2 gap-4">
            <button onClick={handleBack} className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] p-2 -ml-2 shadow-sm transition hover:bg-[var(--surface-strong)]">
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex-1 flex gap-2 max-w-[220px]">
              {Array.from({ length: resolvedTotalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full flex-1 ${i < resolvedStep
                      ? "bg-[linear-gradient(90deg,#facc15_0%,#60a5fa_100%)] shadow-[0_0_12px_rgba(96,165,250,0.35)]"
                      : "bg-[color:var(--border)]"
                    }`}
                />
              ))}
            </div>

            <button className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] p-2 -mr-2 shadow-sm transition hover:bg-[var(--surface-strong)]">
              <Volume2 className="w-6 h-6 text-[color:var(--muted)]" />
            </button>
          </div>
        )}

        {/* Header Area (Now ONLY contains the logo if visible) */}


        {/* Main Content Area (Now Centers Your Title, Subtitle, and Step Children Vertically) */}
        <div className="flex-1 flex flex-col justify-center items-center mb-24 gap-6">
          {showLogo && (
            <div className="mb-0 mt-0">
              <LumiLogo variant="study" priority />
            </div>
          )}
          <div className="text-center space-y-2 w-full">
            <h1 className="text-2xl font-bold tracking-tight text-balance">{title}</h1>
            {subtitle && <p className="text-[var(--muted)] text-lg text-pretty">{subtitle}</p>}
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            {children}
          </div>
        </div>

        {/* Sticky Bottom Button */}
        {showContinueButton && (
          <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-[var(--background)] via-[var(--background)] to-transparent p-4 sm:p-6 z-10">
            <div className="w-full max-w-md">
              <Button
                className="h-14 w-full rounded-2xl border-0 bg-[linear-gradient(135deg,#facc15_0%,#60a5fa_55%,#818cf8_100%)] text-lg font-bold text-slate-950 shadow-[0_16px_30px_rgba(96,165,250,0.28)] transition hover:brightness-105 dark:text-slate-950"
                onClick={onContinue}
                disabled={isContinueDisabled}
              >
                {continueLabel}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}