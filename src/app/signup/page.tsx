"use client";

import { HelpCircle } from "lucide-react";
import Link from "next/link";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SignupPageProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function SignupPage({ onNext, onBack }: SignupPageProps) {
  return (
    <OnboardingLayout
      step={9}
      title="Create a free profile to discover your learning plan"
      onContinue={() => {}}
      onBack={onBack}
      showLogo={false}
      showContinueButton={false}
    >
      <div className="mb-12 mt-4 flex flex-1 flex-col justify-center gap-6">
        <div className="space-y-4">
          <Button
            variant="ghost"
            className="h-14 w-full rounded-2xl border-2 bg-transparent text-lg font-bold hover:bg-[var(--surface-strong)]"
          >
            <svg
              viewBox="0 0 24 24"
              className="mr-2 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          <Button
            variant="ghost"
            className="h-14 w-full rounded-2xl border-2 bg-transparent text-lg font-bold hover:bg-[var(--surface-strong)]"
          >
            <svg
              viewBox="0 0 24 24"
              className="mr-2 h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.05 13.921c-.015-2.38 1.95-3.526 2.042-3.585-1.11-1.61-2.834-1.83-3.414-1.854-1.442-.143-2.81.841-3.541.841-.715 0-1.848-.824-3.033-.801-1.536.02-2.955.882-3.743 2.235-1.597 2.748-.408 6.81 1.144 9.027.765 1.09 1.66 2.302 2.857 2.257 1.157-.043 1.602-.733 2.992-.733 1.39 0 1.796.733 3.011.71 1.23-.021 2.015-1.11 2.766-2.186.87-1.258 1.23-2.477 1.248-2.54-.027-.01-2.313-.878-2.329-3.371zM15.111 7.55c.636-.763 1.066-1.823.948-2.884-1.05.042-2.314.692-2.969 1.455-.519.601-1.033 1.684-.897 2.716 1.173.088 2.28-.624 2.918-1.287z" />
            </svg>
            Continue with Apple
          </Button>
        </div>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-[var(--border)]" />
          <span className="mx-4 flex-shrink-0 text-sm font-bold tracking-widest text-[var(--muted)]">
            OR
          </span>
          <div className="flex-grow border-t border-[var(--border)]" />
        </div>

        <div className="relative space-y-4">
          <Input
            type="email"
            placeholder="Email"
            className="h-14 w-full rounded-2xl border-2 px-4 text-lg focus-visible:border-black focus-visible:ring-0 dark:focus-visible:border-white"
          />
          <div className="absolute right-[-40px] top-1">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <HelpCircle className="h-5 w-5" />
            </button>
          </div>

          <Button
            onClick={() => onNext?.()}
            className="h-14 w-full rounded-2xl bg-[linear-gradient(135deg,#facc15_0%,#60a5fa_55%,#818cf8_100%)] text-lg font-bold text-slate-950 hover:brightness-105"
          >
            Sign up
          </Button>
        </div>

        <p className="mt-2 px-4 text-center text-sm text-[var(--muted)]">
          By clicking Sign up, I agree to Brilliant&apos;s{" "}
          <Link href="#" className="underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      <div className="pb-8 text-center">
        <p className="text-lg">
          Existing user?{" "}
          <Link href="/login" className="font-bold underline">
            Sign in
          </Link>
        </p>
      </div>
    </OnboardingLayout>
  );
}
