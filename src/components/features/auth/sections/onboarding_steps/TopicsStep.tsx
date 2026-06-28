import React from "react";
import { LumiLogo } from "@/components/ui/koji-logo";
import { OnboardingLayout } from "../OnboardingLayout";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

const TopicBubble = ({ text, colorClass }: { text: string; colorClass: string }) => (
  <div className="group flex cursor-default flex-col items-center justify-center rounded-2xl border-2 border-b-4 border-slate-200 bg-white/90 px-3 py-2.5 text-center text-[10px] font-black text-slate-700 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:px-4 sm:py-3 sm:text-xs">
    <div className={`mb-2 h-1.5 w-8 rounded-full ${colorClass} opacity-80 transition-opacity group-hover:opacity-100`} />
    <span className="max-w-[100px] text-balance leading-tight font-extrabold">{text}</span>
  </div>
);

export function TopicsStep({ onNext, onBack }: StepProps) {
  return (
    <OnboardingLayout
      step={6}
      showLogo={false}
      title="We have everything you need."
      onContinue={onNext}
      onBack={onBack}
    >
      <div className="relative mx-auto mt-2 flex min-h-[350px] w-full flex-col items-center justify-center gap-3 px-2">
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-x-10 top-12 h-64 rounded-full bg-[radial-gradient(circle,_rgba(250,204,21,0.15),_transparent_60%)] blur-3xl" />

        {/* Mascot Center */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <div className="pointer-events-auto">
            <LumiLogo variant="coding" className="h-16 w-16 animate-bounce-slow" priority noBackground={true} />
          </div>
        </div>

        {/* Row 1: Top Topics */}
        <div className="relative z-10 flex flex-wrap justify-center gap-2">
          <TopicBubble text="Arrays" colorClass="bg-sky-500" />
          <TopicBubble text="Scaling input" colorClass="bg-sky-300" />
          <TopicBubble text="Big-O runtime" colorClass="bg-cyan-400" />
          <TopicBubble text="Heaps" colorClass="bg-blue-400" />
        </div>

        {/* Row 2: Middle Topics (Split around Mascot space) */}
        <div className="relative z-10 flex w-full flex-wrap items-center justify-center gap-2">
          {/* Left Side */}
          <div className="flex flex-1 flex-wrap justify-end gap-2">
            <TopicBubble text="Counting ops" colorClass="bg-teal-400" />
            <TopicBubble text="Binary trees" colorClass="bg-indigo-500" />
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
          <TopicBubble text="Loops" colorClass="bg-rose-300" />
        </div>
      </div>
    </OnboardingLayout>
  );
}
