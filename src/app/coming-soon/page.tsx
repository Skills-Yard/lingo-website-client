"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import {
  Bell,
  ArrowLeft,
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Footer from "@/components/footer";
import { LumiLogo } from "@/components/ui/koji-logo";
import { TAB_CONTENT } from "@/utils/data/comingSoon";
import { ThemeToggle } from "@/components/ui/theme-toggle";

function ComingSoonContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const tabParam = searchParams.get("tab") as keyof typeof TAB_CONTENT;
  const currentTab = TAB_CONTENT[tabParam] ? tabParam : "home";
  const content = TAB_CONTENT[currentTab];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-background text-foreground px-4 pb-36 pt-20 transition-colors duration-200">
      {/* Top action buttons */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20 max-w-4xl mx-auto">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-[#1e293b] bg-white dark:bg-[#111722] text-slate-800 dark:text-white font-extrabold text-sm rounded-2xl shadow-xs hover:bg-slate-50 dark:hover:bg-[#182232] transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <ThemeToggle className="w-10 h-10 rounded-2xl" />
      </div>

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-lg mt-6">
        <div className="flex flex-col items-center rounded-3xl border border-slate-200 dark:border-[#1e293b] bg-white dark:bg-[#111722] p-7 md:p-9 text-center shadow-lg transition-colors">
          {/* Animated Mascot Wrapper */}
          <div className="relative mb-5">
            <div className="absolute inset-0 -m-3 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-xl animate-pulse" />
            <LumiLogo
              variant={content.mascotVariant}
              className="h-24 w-24 relative z-10 animate-bounce-slow"
              priority
              noBackground={true}
            />
            <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-amber-400 animate-pulse" />
            <Award className="absolute -bottom-1 -left-2 h-6 w-6 text-emerald-500" />
          </div>

          {/* Tagline Badge */}
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {content.badge} Mode
          </span>

          {/* Heading */}
          <h1 className="mb-3 text-2xl md:text-3xl font-black tracking-tight leading-tight">
            {content.title} <span className="text-emerald-600 dark:text-emerald-400">in Progress</span>
          </h1>

          {/* Description */}
          <p className="mb-6 text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium leading-relaxed max-w-sm">
            {content.description}
          </p>

          {/* Action Form / Button */}
          <div className="w-full space-y-3">
            {isSubscribed ? (
              <div className="flex items-center justify-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Awesome! We&apos;ll notify you when it launches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="grow h-13 px-4 rounded-2xl border border-slate-200 dark:border-[#1e293b] bg-white dark:bg-[#182232] text-slate-900 dark:text-white font-bold placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all text-sm shadow-xs"
                />
                <button
                  type="submit"
                  className="h-13 px-5 rounded-2xl text-sm font-black bg-[#059669] hover:bg-[#047857] dark:bg-[#10b981] dark:hover:bg-[#059669] text-white flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 shadow-md"
                >
                  <Bell className="h-4 w-4" />
                  <span>Notify Me</span>
                </button>
              </form>
            )}

            <button
              type="button"
              onClick={() => router.push("/courses")}
              className="w-full h-13 bg-slate-100 hover:bg-slate-200 dark:bg-[#182232] dark:hover:bg-[#1c293d] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#1e293b] font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
            >
              <span>Explore Active Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function ComingSoonPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-3 border-emerald-500 border-t-transparent" />
            <p className="text-sm font-bold text-slate-400 animate-pulse">Loading...</p>
          </div>
        </div>
      }
    >
      <ComingSoonContent />
    </Suspense>
  );
}
