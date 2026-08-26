"use client";

import React, { useState } from "react";
import Link from "next/link";
import { OnboardingLayout } from "./sections/OnboardingLayout";
import { ArrowRight } from "lucide-react";

export function SignupStep({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [email, setEmail] = useState("");

  return (
    <OnboardingLayout
      step={7}
      totalSteps={8}
      title="Create a free profile to discover your learning plan"
      highlightWord="Create"
      onContinue={onComplete}
      onBack={onBack}
      showLogo={false}
      showContinueButton={false}
    >
      <div className="flex flex-col gap-5 py-2">
        <div className="space-y-3">
          <button
            type="button"
            onClick={onComplete}
            className="h-14 w-full rounded-2xl border border-border bg-card text-base font-extrabold text-foreground flex items-center justify-center gap-3 hover:bg-surface-strong active:scale-98 transition-all cursor-pointer shadow-xs"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={onComplete}
            className="h-14 w-full rounded-2xl border border-border bg-card text-base font-extrabold text-foreground flex items-center justify-center gap-3 hover:bg-surface-strong active:scale-98 transition-all cursor-pointer shadow-xs"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-foreground shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.05 13.921c-.015-2.38 1.95-3.526 2.042-3.585-1.11-1.61-2.834-1.83-3.414-1.854-1.442-.143-2.81.841-3.541.841-.715 0-1.848-.824-3.033-.801-1.536.02-2.955.882-3.743 2.235-1.597 2.748-.408 6.81 1.144 9.027.765 1.09 1.66 2.302 2.857 2.257 1.157-.043 1.602-.733 2.992-.733 1.39 0 1.796.733 3.011.71 1.23-.021 2.015-1.11 2.766-2.186.87-1.258 1.23-2.477 1.248-2.54-.027-.01-2.313-.878-2.329-3.371zM15.111 7.55c.636-.763 1.066-1.823.948-2.884-1.05.042-2.314.692-2.969 1.455-.519.601-1.033 1.684-.897 2.716 1.173.088 2.28-.624 2.918-1.287z" />
            </svg>
            Continue with Apple
          </button>
        </div>

        <div className="relative flex items-center py-1">
          <div className="grow border-t border-border" />
          <span className="mx-4 shrink-0 text-xs font-black tracking-widest text-muted-foreground">OR</span>
          <div className="grow border-t border-border" />
        </div>

        <div className="space-y-3 relative">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 w-full rounded-2xl border border-border bg-card text-foreground px-4 text-base font-bold focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all shadow-xs"
          />

          <button
            type="button"
            onClick={onComplete}
            disabled={!email}
            className={`h-14 w-full rounded-2xl font-black text-base md:text-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 ${
              !email
                ? "bg-muted text-muted-foreground border border-border cursor-not-allowed shadow-none"
                : "bg-primary hover:bg-primary/90 text-primary-foreground"
            }`}
          >
            <span>Sign up</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-xs font-medium text-muted-foreground px-4 leading-relaxed">
          By clicking Sign up, I agree to Lingo&apos;s{" "}
          <Link href="#" className="underline hover:text-primary">Terms</Link> and{" "}
          <Link href="#" className="underline hover:text-primary">Privacy Policy</Link>.
        </p>

        <div className="border-t border-border pt-4 text-center mt-1">
          <p className="text-sm font-bold text-muted-foreground">
            Existing user?{" "}
            <Link href="#" onClick={onComplete} className="font-extrabold text-primary underline hover:text-primary/80">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
}
