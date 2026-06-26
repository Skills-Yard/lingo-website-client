"use client";

import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { KojiLogo } from "@/components/icons/koji-logo";

// ✅ MOVED OUTSIDE: This prevents React from redefining the component on every render
const Topic = ({ text, colorClass }: { text: string; colorClass: string }) => (
  <div className="flex flex-col items-center justify-center p-2 text-center text-xs md:text-sm font-bold m-1">
    <div className={`h-1 w-12 rounded-full mb-1 ${colorClass}`} />
    <span>{text}</span>
  </div>
);

export default function TopicsPage() {
  const router = useRouter();

  return (
    <OnboardingLayout
      step={8}
      totalSteps={8}
      showLogo={false}
      title="We have everything you need."
      onContinue={() => router.push("/limitless")}
    >
      <div className="relative flex-1 flex items-center justify-center mt-12 min-h-[400px]">
        <div className="absolute inset-0 flex flex-wrap items-center justify-center content-center opacity-80 gap-x-4 gap-y-8">
          <Topic text="Arrays" colorClass="bg-blue-500" />
          <Topic text="Scaling with input size" colorClass="bg-blue-300" />
          <Topic text="Big-O and sublinear runtime" colorClass="bg-teal-400" />
          <Topic text="Heaps" colorClass="bg-blue-400" />
          <Topic text="Counting operations" colorClass="bg-teal-500" />
          <Topic text="Binary search trees" colorClass="bg-indigo-500" />
          <Topic text="Recursion" colorClass="bg-purple-500" />
          <Topic text="Recursive structures" colorClass="bg-purple-400" />
          <Topic text="Inductive thinking" colorClass="bg-purple-600" />
          <Topic text="Hash tables" colorClass="bg-indigo-600" />
          <Topic text="Divide and conquer" colorClass="bg-pink-500" />
          <Topic text="Variables and expressions" colorClass="bg-pink-400" />
          <Topic text="Loops" colorClass="bg-pink-300" />
        </div>
        
        {/* Center Mascot */}
        <div className="z-10 bg-[var(--background)] p-4 rounded-full shadow-[0_0_40px_20px_var(--background)]">
          <KojiLogo className="w-20 h-20 shadow-xl scale-110" />
        </div>
      </div>
    </OnboardingLayout>
  );
}