"use client";

import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { LumiLogo } from "@/components/icons/koji-logo";

// ✅ MOVED OUTSIDE & REFINED: Added slight hover lift, balanced text wrapping, and refined shadows.
const Topic = ({ text, colorClass }: { text: string; colorClass: string }) => (
  <div className="group flex cursor-default flex-col items-center justify-center rounded-2xl border border-white/60 bg-white/50 px-3 py-2.5 text-center text-[11px] font-semibold text-[color:var(--foreground)] shadow-[0_8px_16px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] sm:px-4 sm:py-3 sm:text-xs dark:border-white/10 dark:bg-white/5">
    <div className={`mb-2 h-1.5 w-8 rounded-full ${colorClass} opacity-80 transition-opacity group-hover:opacity-100 sm:w-10`} />
    <span className="max-w-[100px] text-balance leading-tight sm:max-w-[120px]">
      {text}
    </span>
  </div>
);

interface TopicsPageProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function TopicsPage({ onNext, onBack }: TopicsPageProps) {
  const router = useRouter();

  return (
    <OnboardingLayout
      step={6}
      showLogo={false}
      title="We have everything you need."
      onContinue={() => {
        if (onNext) {
          onNext();
          return;
        }
        router.push("/limitless");
      }}
      onBack={onBack}
    >
      <div className="relative mx-auto mt-8 flex min-h-[400px] w-full max-w-2xl flex-col items-center justify-center gap-3 px-2 md:mt-12 md:gap-4">
        
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-x-10 top-12 h-64 rounded-full bg-[radial-gradient(circle,_rgba(250,204,21,0.15),_transparent_60%)] blur-3xl" />

        {/* Mascot - Positioned Absolutely in the Center of the Wrapper */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <div className="pointer-events-auto rounded-[2rem] border border-white/70 bg-[color:var(--surface)]/90 p-3 shadow-[0_22px_60px_rgba(96,165,250,0.28)] backdrop-blur-md dark:border-white/10">
            <LumiLogo variant="coding" className="h-16 w-16 shadow-none md:h-20 md:w-20" priority />
          </div>
        </div>

        {/* Row 1: Top Topics */}
        <div className="relative z-10 flex flex-wrap justify-center gap-2 md:gap-3">
          <Topic text="Arrays" colorClass="bg-sky-500" />
          <Topic text="Scaling with input size" colorClass="bg-sky-300" />
          <Topic text="Big-O and sublinear runtime" colorClass="bg-cyan-400" />
          <Topic text="Heaps" colorClass="bg-blue-400" />
        </div>

        {/* Row 2: Middle Topics (Split to leave space for Mascot) */}
        <div className="relative z-10 flex w-full flex-wrap items-center justify-center gap-2 md:gap-3">
          {/* Left Side */}
          <div className="flex flex-1 flex-wrap justify-end gap-2 md:gap-3">
            <Topic text="Counting operations" colorClass="bg-teal-400" />
            <Topic text="Binary search trees" colorClass="bg-indigo-500" />
          </div>
          
          {/* Invisible Spacer - Exact width of Mascot to prevent overlap */}
          <div className="w-[88px] shrink-0 md:w-[110px]" aria-hidden="true" />
          
          {/* Right Side */}
          <div className="flex flex-1 flex-wrap justify-start gap-2 md:gap-3">
            <Topic text="Recursion" colorClass="bg-violet-500" />
            <Topic text="Hash tables" colorClass="bg-indigo-400" />
          </div>
        </div>

        {/* Row 3: Bottom Topics */}
        <div className="relative z-10 flex flex-wrap justify-center gap-2 md:gap-3">
          <Topic text="Recursive structures" colorClass="bg-violet-400" />
          <Topic text="Inductive thinking" colorClass="bg-fuchsia-500" />
          <Topic text="Divide and conquer" colorClass="bg-amber-400" />
          <Topic text="Variables and expressions" colorClass="bg-yellow-400" />
          <Topic text="Loops" colorClass="bg-rose-300" />
        </div>

      </div>
    </OnboardingLayout>
  );
}