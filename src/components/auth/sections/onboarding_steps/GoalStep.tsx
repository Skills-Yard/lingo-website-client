import React, { useState } from "react";
import { Timer } from "lucide-react";
import { SelectionCard } from "../OnboardingCards";
import { OnboardingLayout } from "../OnboardingLayout";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

const GOALS = [
  { id: "10", time: "10 min", color: "text-indigo-400" },
  { id: "20", time: "20 min", color: "text-indigo-500" },
  { id: "30", time: "30 min", color: "text-pink-500" },
  { id: "60", time: "60 min", color: "text-rose-500" },
];

export function GoalStep({ onNext, onBack }: StepProps) {
  const [selected, setSelected] = useState<string | null>("20");

  return (
    <OnboardingLayout
      step={5}
      title="What's your daily learning goal?"
      onContinue={onNext}
      onBack={onBack}
      isContinueDisabled={!selected}
    >
      <div className="grid grid-cols-2 gap-4">
        {GOALS.map((goal) => (
          <SelectionCard
            key={goal.id}
            title={goal.time}
            icon={<Timer className={`${goal.color} w-10 h-10`} strokeWidth={2} />}
            selected={selected === goal.id}
            onClick={() => setSelected(goal.id)}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}
