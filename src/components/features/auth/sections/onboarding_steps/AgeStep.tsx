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
          className="text-2xl font-black h-16 rounded-2xl border-2 border-b-4 border-slate-200 bg-white px-6 w-full max-w-xs text-center focus:border-[#7c3aed] focus:ring-0 focus:outline-none transition-all"
          autoFocus
        />
      </div>
    </OnboardingLayout>
  );
}
