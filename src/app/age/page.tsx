"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { Input } from "@/components/ui/input"; // Shadcn Input

export default function AgePage() {
  const router = useRouter();
  const [age, setAge] = useState("");

  return (
    <OnboardingLayout
      step={3}
      title="How old are you?"
      onContinue={() => router.push("/subject")}
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