import React from "react";
import { OnboardingLayout } from "../OnboardingLayout";

export function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <OnboardingLayout
      title="Hi! I am Lumi"
      highlightWord="Hi!"
      subtitle="I'll help you personalize your learning path in a few quick steps."
      onContinue={onNext}
      onBack={() => { }}
      showContinueButton={true}
      showLogo={true}
    >
      <div className="flex flex-col items-center justify-center p-2">
        <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-xs max-w-sm transition-colors">
          <p className="text-base md:text-lg font-bold text-foreground leading-relaxed">
            Welcome to <span className="text-primary font-black">Lingo</span>! Get ready to learn coding through interactive visual challenges. 🎮
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
}
