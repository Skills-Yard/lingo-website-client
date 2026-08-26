import React from "react";
import { LumiLogo } from "@/components/ui/koji-logo";
import { OnboardingLayout } from "../OnboardingLayout";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

const TopicBubble = ({ text, colorClass }: { text: string; colorClass: string }) => (
  <div className="group flex cursor-default flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white dark:bg-[#111722] dark:border-[#1e293b] px-3.5 py-2.5 text-center text-xs font-black text-slate-800 dark:text-slate-200 shadow-xs transition-all duration-200 hover:border-emerald-500/50 hover:shadow-sm">
    <div className={`mb-1.5 h-1.5 w-8 rounded-full ${colorClass} opacity-80 transition-opacity group-hover:opacity-100`} />
    <span className="max-w-[100px] leading-tight font-extrabold">{text}</span>
  </div>
);

export function TopicsStep({ onNext, onBack }: StepProps) {
  return (
    <OnboardingLayout
      step={6}
      showLogo={false}
      title="We have everything you need."
      highlightWord="We"
      onContinue={onNext}
      onBack={onBack}
    >
      <div className="relative mx-auto mt-2 flex min-h-[340px] w-full flex-col items-center justify-center gap-3 px-2">
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-x-10 top-12 h-64 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl" />

        {/* Mascot Center */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <div className="pointer-events-auto">
            <LumiLogo variant="coding" className="h-16 w-16 animate-bounce-slow" priority noBackground={true} />
          </div>
        </div>

        {/* Row 1: Top Topics */}
        <div className="relative z-10 flex flex-wrap justify-center gap-2">
          <TopicBubble text="Arrays" colorClass="bg-sky-500" />
          <TopicBubble text="Scaling input" colorClass="bg-emerald-400" />
          <TopicBubble text="Big-O runtime" colorClass="bg-cyan-400" />
          <TopicBubble text="Heaps" colorClass="bg-blue-400" />
        </div>

        {/* Row 2: Middle Topics (Split around Mascot space) */}
        <div className="relative z-10 flex w-full flex-wrap items-center justify-center gap-2">
          {/* Left Side */}
          <div className="flex flex-1 flex-wrap justify-end gap-2">
            <TopicBubble text="Counting ops" colorClass="bg-teal-400" />
            <TopicBubble text="Binary trees" colorClass="bg-emerald-500" />
          </div>

          {/* Invisible Spacer for Mascot */}
          <div className="w-[88px] shrink-0" aria-hidden="true" />

          {/* Right Side */}
          <div className="flex flex-1 flex-wrap justify-start gap-2">
            <TopicBubble text="Recursion" colorClass="bg-violet-500" />
            <TopicBubble text="Hash tables" colorClass="bg-indigo-400" />
          </div>
        </div>

        {/* Row 3: Bottom Topics */}
        <div className="relative z-10 flex flex-wrap justify-center gap-2">
          <TopicBubble text="Structures" colorClass="bg-violet-400" />
          <TopicBubble text="Divide & conquer" colorClass="bg-amber-400" />
          <TopicBubble text="Loops" colorClass="bg-emerald-400" />
        </div>
      </div>
    </OnboardingLayout>
  );
}
