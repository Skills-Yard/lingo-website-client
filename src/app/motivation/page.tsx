"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { SelectionCard } from "@/components/ui/selection-card";
import { Book, TrendingUp, Target, Rocket } from "lucide-react";

const MOTIVATIONS = [
  { id: "school", title: "Excelling in school", icon: <Book className="text-teal-500 w-12 h-12" /> },
  { id: "growth", title: "Professional growth", icon: <TrendingUp className="text-green-500 w-12 h-12" /> },
  { id: "sharp", title: "Staying sharp", icon: <Target className="text-purple-500 w-12 h-12" /> },
  { id: "child", title: "Helping my child learn", icon: <Rocket className="text-gray-500 w-12 h-12" /> },
];

export default function MotivationPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <OnboardingLayout
      step={1}
      title="What motivates you to learn?"
      onContinue={() => router.push("/voice")}
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
            className="h-48"
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}