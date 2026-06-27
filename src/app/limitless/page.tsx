"use client";

import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { LumiLogo } from "@/components/icons/koji-logo";

interface LimitlessPageProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function LimitlessPage({ onNext, onBack }: LimitlessPageProps) {
  const router = useRouter();

  return (
    <OnboardingLayout
      step={7}
      showLogo={false}
      title="There's no limit to how far you can go."
      onContinue={() => {
        if (onNext) {
          onNext();
          return;
        }

        router.push("/signup");
      }}
      onBack={onBack}
    >
      <div className="relative mt-12 flex h-full min-h-[400px] w-full flex-1 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,_rgba(250,204,21,0.18),_transparent_42%),radial-gradient(circle_at_12%_72%,_rgba(125,211,252,0.18),_transparent_34%),radial-gradient(circle_at_90%_80%,_rgba(196,181,253,0.18),_transparent_36%)]" />

        {/* SVG Decorative Graph Network Background */}
        <svg className="absolute inset-0 h-full w-full opacity-75 text-sky-200 dark:text-sky-950" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M46 144 L104 194 L154 170 L212 244 L288 212 L350 274" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M104 194 L84 278 L146 320 L212 244" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M154 170 L226 116 L288 212" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M226 116 L320 84 L352 150 L288 212" stroke="currentColor" strokeWidth="2.5"/>

          <circle cx="46" cy="144" r="4" fill="#60A5FA" />
          <circle cx="104" cy="194" r="5" fill="#FACC15" />
          <circle cx="84" cy="278" r="4" fill="#A78BFA" />
          <circle cx="146" cy="320" r="4" fill="#FDE68A" />
          <circle cx="154" cy="170" r="4" fill="#818CF8" />
          <circle cx="226" cy="116" r="6" fill="#38BDF8" />
          <circle cx="320" cy="84" r="4" fill="#C4B5FD" />
          <circle cx="352" cy="150" r="4" fill="#60A5FA" />
          <circle cx="350" cy="274" r="5" fill="#FACC15" />

          <circle cx="288" cy="212" r="12" stroke="#818CF8" strokeWidth="2" fill="transparent" className="animate-ping opacity-75" />
          <circle cx="288" cy="212" r="6" fill="#818CF8" />
          <path d="M293 202 L298 192 L303 202 Z" fill="#818CF8" />
        </svg>

        <div className="relative z-10 right-8 bottom-3 rounded-[2.25rem] border border-white/70 bg-white/70 p-3 shadow-[0_26px_70px_rgba(99,102,241,0.22)] backdrop-blur-md dark:border-white/10 dark:bg-slate-950/30">
          <LumiLogo variant="study" className="h-28 w-28 shadow-none" priority />
        </div>
      </div>
    </OnboardingLayout>
  );
}
