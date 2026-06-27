"use client";

import { useEffect, useState } from "react";
import Motivation from "@/app/motivation/page";
import Age from "@/app/age/page";
import Subject from "@/app/subject/page";
import Level from "@/app/level/page";
import Schedule from "@/app/schedule/page";
import Goal from "@/app/goal/page";
import Topics from "@/app/topics/page";
import Limitless from "@/app/limitless/page";
import Signup from "@/app/signup/page";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { useRouter } from "next/navigation";

interface StepProps {
  onNext?: () => void;
  onBack?: () => void;
}

function WelcomeStep({ onNext, onBack }: StepProps) {
  return (
    <OnboardingLayout
      title="Welcome to Lingo"
      subtitle="Let's personalize your learning path in a few quick steps."
      onContinue={onNext ?? (() => {})}
      onBack={onBack}
    >
      <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)]/70 p-6 text-center shadow-sm">
        <p className="text-lg font-semibold">Your next lesson is ready.</p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          We&apos;ll help you discover the right subjects, level, goals, and
          schedule for your pace.
        </p>
      </div>
    </OnboardingLayout>
  );
}

const steps = [
  { id: "welcome", component: WelcomeStep },
  { id: "motivation", component: Motivation },
  { id: "age", component: Age },
  { id: "subject", component: Subject },
  { id: "level", component: Level },
  { id: "schedule", component: Schedule },
  { id: "goal", component: Goal },
  { id: "topics", component: Topics },
  { id: "limitless", component: Limitless },
  { id: "signup", component: Signup },
];

export default function CombinedHome() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const handleNext = () =>
    setIndex((current) => Math.min(steps.length, current + 1));
  const handleBack = () => setIndex((current) => Math.max(0, current - 1));

  useEffect(() => {
    if (index >= steps.length) {
      router.push("/courses");
    }
  }, [index, router]);

  if (index >= steps.length) {
    return null;
  }

  const StepComponent = steps[index].component;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StepComponent onNext={handleNext} onBack={handleBack} />
    </div>
  );
}
