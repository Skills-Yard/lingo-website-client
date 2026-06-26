"use client";

import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { KojiLogo } from "@/components/icons/koji-logo";

export default function LimitlessPage() {
  const router = useRouter();

  return (
    <OnboardingLayout
      showLogo={false}
      title="There's no limit to how far you can go."
      onContinue={() => router.push("/signup")}
    >
      <div className="relative flex-1 flex items-center justify-center mt-12 w-full h-full min-h-[400px] overflow-hidden">
        {/* SVG Decorative Graph Network Background */}
        <svg className="absolute inset-0 w-full h-full opacity-60 text-blue-200 dark:text-blue-900" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 150 L100 200 L150 180 L200 250 L280 220 L350 280" stroke="currentColor" strokeWidth="2"/>
          <path d="M100 200 L80 280 L140 320 L200 250" stroke="currentColor" strokeWidth="2"/>
          <path d="M150 180 L220 120 L280 220" stroke="currentColor" strokeWidth="2"/>
          <path d="M220 120 L320 80 L350 150 L280 220" stroke="currentColor" strokeWidth="2"/>
          
          <circle cx="50" cy="150" r="4" fill="#60A5FA" />
          <circle cx="100" cy="200" r="5" fill="#F472B6" />
          <circle cx="80" cy="280" r="4" fill="#34D399" />
          <circle cx="140" cy="320" r="4" fill="#FBBF24" />
          <circle cx="150" cy="180" r="4" fill="#A78BFA" />
          <circle cx="220" cy="120" r="6" fill="#F87171" />
          <circle cx="320" cy="80" r="4" fill="#34D399" />
          <circle cx="350" cy="150" r="4" fill="#60A5FA" />
          <circle cx="350" cy="280" r="5" fill="#F472B6" />
          
          {/* Active Node Ping */}
          <circle cx="280" cy="220" r="10" stroke="#A78BFA" strokeWidth="2" fill="transparent" className="animate-ping opacity-75" />
          <circle cx="280" cy="220" r="6" fill="#A78BFA" />
          <path d="M285 210 L290 200 L295 210 Z" fill="#A78BFA" />
        </svg>

        <div className="z-10 relative right-12 bottom-6">
          <KojiLogo className="w-24 h-24 shadow-2xl" />
        </div>
      </div>
    </OnboardingLayout>
  );
}