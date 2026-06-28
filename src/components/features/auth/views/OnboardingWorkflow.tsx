"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { WelcomeStep } from "../sections/onboarding_steps/WelcomeStep";
import { MotivationStep } from "../sections/onboarding_steps/MotivationStep";
import { AgeStep } from "../sections/onboarding_steps/AgeStep";
import { LevelStep } from "../sections/onboarding_steps/LevelStep";
import { ScheduleStep } from "../sections/onboarding_steps/ScheduleStep";
import { GoalStep } from "../sections/onboarding_steps/GoalStep";
import { TopicsStep } from "../sections/onboarding_steps/TopicsStep";
import { LimitlessStep } from "../sections/onboarding_steps/LimitlessStep";
import { SignupStep } from "../sections/onboarding_steps/SignupStep";

export function OnboardingWorkflow() {
  const [stepIndex, setStepIndex] = useState(0);
  const router = useRouter();

  const handleNext = () => setStepIndex((idx) => idx + 1);
  const handleBack = () => setStepIndex((idx) => Math.max(0, idx - 1));
  const handleComplete = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lingo_onboarding_completed", "true");
    }
    router.push("/courses");
  };

  const stepsList = [
    { id: "welcome", component: WelcomeStep },
    { id: "motivation", component: MotivationStep },
    { id: "age", component: AgeStep },
    { id: "level", component: LevelStep },
    { id: "schedule", component: ScheduleStep },
    { id: "goal", component: GoalStep },
    { id: "topics", component: TopicsStep },
    { id: "limitless", component: LimitlessStep },
  ];

  if (stepIndex < stepsList.length) {
    const CurrentStep = stepsList[stepIndex].component;
    return <CurrentStep onNext={handleNext} onBack={handleBack} />;
  }

  return <SignupStep onBack={handleBack} onComplete={handleComplete} />;
}
