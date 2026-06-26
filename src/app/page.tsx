"use client";

import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <OnboardingLayout
      title={
        <>
          Hi, I'm Koji!<br />I'll be your personal tutor.
        </>
      }
      onContinue={() => router.push("/motivation")}
    >
      <div /> {/* Empty child, layout handles the centered text and logo */}
    </OnboardingLayout>
  );
}