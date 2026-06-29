import React, { useState } from "react";
import { Sunrise, Sun, MoonStar, SunDim } from "lucide-react";
import { SelectionCard } from "../OnboardingCards";
import { OnboardingLayout } from "../OnboardingLayout";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

const SCHEDULES = [
  { id: "morning", title: "Morning routine", icon: <Sunrise className="text-orange-400 w-10 h-10" /> },
  { id: "afternoon", title: "Afternoon break", icon: <Sun className="text-yellow-500 w-10 h-10" /> },
  { id: "night", title: "Nightly ritual", icon: <MoonStar className="text-indigo-400 w-10 h-10" /> },
  { id: "other", title: "Another time", icon: <SunDim className="text-pink-400 w-10 h-10" /> },
];

export function ScheduleStep({ onNext, onBack }: StepProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <OnboardingLayout
      step={4}
      title="How will learning fit into your day?"
      onContinue={onNext}
      onBack={onBack}
      isContinueDisabled={!selected}
    >
      <div className="grid grid-cols-2 gap-4">
        {SCHEDULES.map((item) => (
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
