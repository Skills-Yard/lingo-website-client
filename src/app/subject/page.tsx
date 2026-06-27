"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { SelectionCard } from "@/components/ui/selection-card";
import { Calculator, Code2 } from "lucide-react";

interface SubjectPageProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function SubjectPage({ onNext, onBack }: SubjectPageProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <OnboardingLayout
      step={3}
      title="What do you want to learn first?"
      subtitle="You can make progress in both subjects later on"
      onContinue={() => {
        if (onNext) {
          onNext();
          return;
        }

        router.push("/level");
      }}
      onBack={onBack}
      isContinueDisabled={!selected}
    >
      <div className="grid grid-cols-2 gap-4 mt-4">
        <SelectionCard
          title="Math"
          icon={<Calculator className="text-blue-500 w-16 h-16" />}
          selected={selected === "math"}
          onClick={() => setSelected("math")}
          className="h-64 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-transparent"
        />
        <SelectionCard
          title="Computer Science & Coding"
          icon={<Code2 className="text-purple-500 w-16 h-16" />}
          selected={selected === "cs"}
          onClick={() => setSelected("cs")}
          className="h-64 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-transparent"
        />
      </div>
    </OnboardingLayout>
  );
}
