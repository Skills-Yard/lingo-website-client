"use client";

import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { LumiLogo } from "@/components/icons/koji-logo";

// ✅ MOVED OUTSIDE: This prevents React from redefining the component on every render
const Topic = ({ text, colorClass }: { text: string; colorClass: string }) => (
  <div className="m-1 flex flex-col items-center justify-center rounded-2xl border border-white/60 bg-white/55 px-3 py-2 text-center text-xs font-bold shadow-[0_12px_24px_rgba(148,163,184,0.12)] backdrop-blur-sm md:text-sm dark:border-white/10 dark:bg-white/5">
    <div className={`mb-2 h-1.5 w-12 rounded-full ${colorClass}`} />
    <span>{text}</span>
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
      step={7}
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
      <div className="relative mt-12 flex min-h-[400px] flex-1 items-center justify-center overflow-hidden">
        <div className="absolute inset-x-10 top-12 h-48 rounded-full bg-[radial-gradient(circle,_rgba(250,204,21,0.18),_transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 flex flex-wrap content-center items-center justify-center gap-x-4 gap-y-6 opacity-90">
          <Topic text="Arrays" colorClass="bg-sky-500" />
          <Topic text="Scaling with input size" colorClass="bg-sky-300" />
          <Topic text="Big-O and sublinear runtime" colorClass="bg-cyan-400" />
          <Topic text="Heaps" colorClass="bg-blue-400" />
          <Topic text="Counting operations" colorClass="bg-teal-400" />
          <Topic text="Binary search trees" colorClass="bg-indigo-500" />
          <Topic text="Recursion" colorClass="bg-violet-500" />
          <Topic text="Recursive structures" colorClass="bg-violet-400" />
          <Topic text="Inductive thinking" colorClass="bg-fuchsia-500" />
          <Topic text="Hash tables" colorClass="bg-indigo-400" />
          <Topic text="Divide and conquer" colorClass="bg-amber-400" />
          <Topic text="Variables and expressions" colorClass="bg-yellow-400" />
          <Topic text="Loops" colorClass="bg-rose-300" />
        </div>
        
        {/* Center Mascot */}
        <div className="z-10 rounded-[2rem] border border-white/70 bg-[color:var(--surface)]/85 p-3 shadow-[0_22px_60px_rgba(96,165,250,0.28)] backdrop-blur-md">
          <LumiLogo variant="coding" className="h-24 w-24 scale-110 shadow-none" priority />
        </div>
      </div>
    </OnboardingLayout>
  );
}
