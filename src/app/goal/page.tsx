"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { SelectionCard } from "@/components/ui/selection-card";
import { Timer } from "lucide-react";

interface GoalPageProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function GoalPage({ onNext, onBack }: GoalPageProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>("20");

  const goals = [
    { id: "10", time: "10 min", color: "text-purple-300" },
    { id: "20", time: "20 min", color: "text-purple-400", bg: "bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-transparent" },
    { id: "30", time: "30 min", color: "text-purple-500" },
    { id: "60", time: "60 min", color: "text-purple-600" },
  ];

  return (
    <OnboardingLayout
      step={6}
      title="What's your daily learning goal?"
      onContinue={() => {
        if (onNext) {
          onNext();
          return;
        }

        router.push("/topics");
      }}
      onBack={onBack}
      isContinueDisabled={!selected}
    >
      <div className="grid grid-cols-2 gap-4 mt-4">
        {goals.map((goal) => (
          <SelectionCard
            key={goal.id}
            title={goal.time}
            icon={<Timer className={`${goal.color} w-16 h-16`} strokeWidth={1.5} />}
            selected={selected === goal.id}
            onClick={() => setSelected(goal.id)}
            className={`h-56 ${goal.bg || ""}`}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}
