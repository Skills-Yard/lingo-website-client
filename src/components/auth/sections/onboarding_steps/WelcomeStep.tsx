import React from "react";
import { OnboardingLayout } from "../OnboardingLayout";

export function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <OnboardingLayout
      title="Hi! I am Lumi"
      subtitle="I'll help you personalize your learning path in a few quick steps."
      onContinue={onNext}
      onBack={() => { }}
      showContinueButton={true}
      showLogo={true}
    >
      <div className="flex flex-col items-center justify-center p-4">
        <div className="bg-white/80 border-2 border-b-4 border-slate-200 rounded-3xl p-6 text-center shadow-lg max-w-xs backdrop-blur-md">
          <p className="text-sm font-extrabold text-slate-700 leading-relaxed">
            Welcome to Lingo! Get ready to learn coding through interactive visual challenges. 🎮
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
}
