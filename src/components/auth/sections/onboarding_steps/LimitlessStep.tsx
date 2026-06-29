import React from "react";
import { LumiLogo } from "@/components/ui/koji-logo";
import { OnboardingLayout } from "../OnboardingLayout";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

export function LimitlessStep({ onNext, onBack }: StepProps) {
  return (
    <OnboardingLayout
      step={7}
      showLogo={false}
      title="There's no limit to how far you can go."
      onContinue={onNext}
      onBack={onBack}
    >
      <div className="relative flex h-full min-h-[300px] w-full items-center justify-center overflow-hidden">
        {/* SVG Decorative Graph Network Background */}
        <svg className="absolute inset-0 h-full w-full opacity-60 text-sky-300" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M46 144 L104 194 L154 170 L212 244 L288 212 L350 274" stroke="currentColor" strokeWidth="2.5" />
          <path d="M104 194 L84 278 L146 320 L212 244" stroke="currentColor" strokeWidth="2.5" />
          <path d="M154 170 L226 116 L288 212" stroke="currentColor" strokeWidth="2.5" />
          <path d="M226 116 L320 84 L352 150 L288 212" stroke="currentColor" strokeWidth="2.5" />

          <circle cx="46" cy="144" r="4" fill="#60A5FA" />
          <circle cx="104" cy="194" r="5" fill="#FACC15" />
          <circle cx="84" cy="278" r="4" fill="#A78BFA" />
          <circle cx="146" cy="320" r="4" fill="#FDE68A" />
          <circle cx="154" cy="170" r="4" fill="#818CF8" />
          <circle cx="226" cy="116" r="6" fill="#38BDF8" />
          <circle cx="320" cy="84" r="4" fill="#C4B5FD" />
          <circle cx="352" cy="150" r="4" fill="#60A5FA" />
          <circle cx="350" cy="274" r="5" fill="#FACC15" />

          <circle cx="288" cy="212" r="12" stroke="#818CF8" strokeWidth="2" fill="transparent" className="animate-ping" />
          <circle cx="288" cy="212" r="6" fill="#818CF8" />
        </svg>

        <div className="relative z-10 transform hover:rotate-3 transition-transform">
          <LumiLogo variant="study" className="h-28 w-28 animate-bounce-slow" priority noBackground={true} />
        </div>
      </div>
    </OnboardingLayout>
  );
}
