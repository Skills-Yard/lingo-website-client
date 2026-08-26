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
        <div className="bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#1e293b] rounded-2xl p-6 text-center shadow-xs max-w-sm transition-colors">
          <p className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
            Welcome to <span className="text-emerald-600 dark:text-emerald-400 font-black">Lingo</span>! Get ready to learn coding through interactive visual challenges. 🎮
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
}
