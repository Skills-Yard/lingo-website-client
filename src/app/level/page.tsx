"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { LevelCard } from "@/components/ui/level-card";

const LEVELS = [
  {
    id: "beginner",
    code: <span>print(<span className="text-blue-500">&quot;hello&quot;</span>)</span>,
    level: "Beginner",
    description: "I want to start from the basics.",
  },
  {
    id: "novice",
    code: <span><span className="text-pink-500">if</span> b <span className="text-pink-500">&gt;</span> a:<br/>&nbsp;&nbsp;print b</span>,
    level: "Novice",
    description: "I&apos;ve seen, but not touched code before.",
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
    description: "I&apos;ve written longer programs.",
  },
];

interface LevelPageProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function LevelPage({ onNext, onBack }: LevelPageProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <OnboardingLayout
      step={4}
      title="What level of programming are you currently at?"
      onContinue={() => {
        if (onNext) {
          onNext();
          return;
        }

        router.push("/schedule");
      }}
      onBack={onBack}
      isContinueDisabled={!selected}
    >
      <div className="grid grid-cols-2 gap-4 mt-4">
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
