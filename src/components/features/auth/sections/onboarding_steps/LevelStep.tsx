import React, { useState } from "react";
import { LevelCard } from "../OnboardingCards";
import { OnboardingLayout } from "../OnboardingLayout";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

const LEVELS = [
  {
    id: "beginner",
    code: <span>print(<span className="text-blue-500">&quot;hello&quot;</span>)</span>,
    level: "Beginner",
    description: "I want to start from the basics.",
  },
  {
    id: "novice",
    code: <span><span className="text-pink-500">if</span> b &gt; a:<br />&nbsp;&nbsp;print b</span>,
    level: "Novice",
    description: "I've seen, but not touched code before.",
  },
  {
    id: "intermediate",
    code: <span><span className="text-pink-500">for</span> i <span className="text-pink-500">in</span> <span className="text-blue-500">range</span>(5):</span>,
    level: "Intermediate",
    description: "I can write simple programs with loops.",
  },
  {
    id: "advanced",
    code: <span><span className="text-pink-500">def</span> <span className="text-blue-500">circle</span>(size):</span>,
    level: "Advanced",
    description: "I've written longer programs.",
  },
];

export function LevelStep({ onNext, onBack }: StepProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <OnboardingLayout
      step={3}
      title="What level of programming are you currently at?"
      onContinue={onNext}
      onBack={onBack}
      isContinueDisabled={!selected}
    >
      <div className="grid grid-cols-2 gap-4 mt-2">
        {LEVELS.map((item) => (
          <LevelCard
            key={item.id}
            codeSnippet={item.code}
            level={item.level}
            description={item.description}
            selected={selected === item.id}
            onClick={() => setSelected(item.id)}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}
