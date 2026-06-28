import React, { useState } from "react";
import { Book, TrendingUp, Target, Rocket } from "lucide-react";
import { SelectionCard } from "../OnboardingCards";
import { OnboardingLayout } from "../OnboardingLayout";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

const MOTIVATIONS = [
  { id: "school", title: "Excelling in school", icon: <Book className="text-teal-500 w-10 h-10" /> },
  { id: "growth", title: "Professional growth", icon: <TrendingUp className="text-green-500 w-10 h-10" /> },
  { id: "sharp", title: "Staying sharp", icon: <Target className="text-purple-500 w-10 h-10" /> },
  { id: "child", title: "Helping my child learn", icon: <Rocket className="text-indigo-500 w-10 h-10" /> },
];

export function MotivationStep({ onNext, onBack }: StepProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <OnboardingLayout
      step={1}
      title="What motivates you to learn?"
      onContinue={onNext}
      onBack={onBack}
      isContinueDisabled={!selected}
    >
      <div className="grid grid-cols-2 gap-4">
        {MOTIVATIONS.map((item) => (
          <SelectionCard
            key={item.id}
            title={item.title}
            icon={item.icon}
            selected={selected === item.id}
            onClick={() => setSelected(item.id)}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}
