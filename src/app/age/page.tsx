"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { Input } from "@/components/ui/input"; // Shadcn Input

interface AgePageProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function AgePage({ onNext, onBack }: AgePageProps) {
  const router = useRouter();
  const [age, setAge] = useState("");

  return (
    <OnboardingLayout
      step={2}
      title="How old are you?"
      onContinue={() => {
        if (onNext) {
          onNext();
          return;
        }

        router.push("/subject");
      }}
      onBack={onBack}
      isContinueDisabled={!age}
    >
      <div className="mt-8 flex justify-center">
        <Input
          type="number"
          placeholder="Your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="text-xl h-16 rounded-xl border-2 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-black dark:focus-visible:border-white w-full max-w-xs text-center"
          autoFocus
        />
      </div>
    </OnboardingLayout>
  );
}
