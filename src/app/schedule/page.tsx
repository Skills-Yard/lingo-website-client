"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { SelectionCard } from "@/components/ui/selection-card";
import { Sunrise, Sun, MoonStar, SunDim } from "lucide-react";

interface SchedulePageProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function SchedulePage({ onNext, onBack }: SchedulePageProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <OnboardingLayout
      step={5}
      title="How will learning fit into your day?"
      onContinue={() => {
        if (onNext) {
          onNext();
          return;
        }

        router.push("/goal");
      }}
      onBack={onBack}
      isContinueDisabled={!selected}
    >
      <div className="grid grid-cols-2 gap-4 mt-4">
        <SelectionCard
          title="Morning routine"
          icon={<Sunrise className="text-orange-400 w-16 h-16" />}
          selected={selected === "morning"}
          onClick={() => setSelected("morning")}
          className="h-56"
        />
        <SelectionCard
          title="Afternoon break"
          icon={<Sun className="text-yellow-500 w-16 h-16" />}
          selected={selected === "afternoon"}
          onClick={() => setSelected("afternoon")}
          className="h-56 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-transparent"
        />
        <SelectionCard
          title="Nightly ritual"
          icon={<MoonStar className="text-indigo-400 w-16 h-16" />}
          selected={selected === "night"}
          onClick={() => setSelected("night")}
          className="h-56"
        />
        <SelectionCard
          title="Another time"
          icon={<SunDim className="text-pink-400 w-16 h-16" />}
          selected={selected === "other"}
          onClick={() => setSelected("other")}
          className="h-56"
        />
      </div>
    </OnboardingLayout>
  );
}
