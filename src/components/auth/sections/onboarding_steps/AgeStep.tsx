import React, { useState } from "react";
import { OnboardingLayout } from "../OnboardingLayout";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

export function AgeStep({ onNext, onBack }: StepProps) {
  const [age, setAge] = useState("");

  return (
    <OnboardingLayout
      step={2}
      title="How old are you?"
      highlightWord="How"
      onContinue={onNext}
      onBack={onBack}
      isContinueDisabled={!age}
    >
      <div className="flex justify-center p-2">
        <input
          type="number"
          placeholder="Your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="text-2xl font-black h-16 rounded-2xl border border-slate-200 bg-white dark:bg-[#111722] dark:border-[#1e293b] dark:text-white px-6 w-full max-w-xs text-center focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all shadow-xs"
          autoFocus
        />
      </div>
    </OnboardingLayout>
  );
}
