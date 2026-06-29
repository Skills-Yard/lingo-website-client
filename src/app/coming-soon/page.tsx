"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import {
  Bell,
  ArrowLeft,
  Sparkles,
  Award,
  CheckCircle2
} from "lucide-react";
import Footer from "@/components/footer";
import { LumiLogo } from "@/components/ui/koji-logo";
import { TAB_CONTENT } from "@/utils/data/comingSoon";

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
    <div className={`relative flex min-h-screen w-full flex-col items-center bg-linear-to-b ${content.bgGradient} text-foreground px-4 pb-36 pt-24 transition-all duration-500`}>
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-160 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_60%)] blur-3xl" />

      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center justify-center gap-1.5 px-4 py-2 border-2 border-b-4 border-border bg-surface text-foreground font-black text-sm rounded-2xl shadow-sm hover:bg-surface-strong transition-all active:translate-y-0.5 active:border-b-2 cursor-pointer z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Glass Card Container */}
      <div className="relative z-10 w-full max-w-xl animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out">
        <div className="flex flex-col items-center rounded-[2.5rem] border-2 border-b-[6px] border-border bg-surface/80 p-8 text-center shadow-xl backdrop-blur-xl md:p-10">

          {/* Animated Mascot Wrapper */}
          <div className="relative mb-6">
            {/* Soft pulsing halo */}
            <div className="absolute inset-0 -m-3 rounded-[2.5rem] bg-linear-to-tr from-yellow-300/30 to-purple-400/20 blur-xl animate-pulse" />

            {/* The Mascot */}
            <LumiLogo
              variant={content.mascotVariant}
              className="h-28 w-28 relative z-10 animate-bounce-slow"
              priority
              noBackground={true}
            />

            {/* Decorative Sparkle Icons */}
            <Sparkles className="absolute -top-3 -right-3 h-6 w-6 text-amber-400 animate-pulse" />
            <Award className="absolute -bottom-2 -left-3 h-7 w-7 text-indigo-400" />
          </div>

          {/* Tagline Badge */}
          <span className={`inline-flex items-center gap-1 px-3.5 py-1 rounded-full border-2 font-black text-xs uppercase tracking-wider mb-4 ${content.badgeColor}`}>
            <Sparkles className="w-3.5 h-3.5" />
            {content.badge} Mode
          </span>

          {/* Heading */}
          <h1 className="mb-4 text-3xl md:text-4xl font-black tracking-tight leading-tight">
            {content.title} <span className="text-primary">is Brewing</span>
          </h1>

          {/* Description */}
          <p className="mb-8 text-muted-foreground text-sm md:text-base font-bold leading-relaxed max-w-md">
            {content.description}
          </p>

          {/* Stats Preview Card */}
          <div className="w-full bg-surface-strong/60 border-2 border-border/80 rounded-3xl p-5 mb-8 text-left">
            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3 border-b-2 border-border pb-1.5 flex items-center justify-between">
              <span>Feature Preview</span>
              <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md">Upcoming</span>
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              {content.statsPreview.map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-1.5 p-2 bg-surface/50 border border-border/50 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider leading-none">
                    {stat.label}
                  </span>
                  <span className="text-xs md:text-sm font-black text-foreground">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Form / Button */}
          <div className="w-full space-y-4">
            {isSubscribed ? (
              <div className="flex items-center justify-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl text-emerald-600 dark:text-emerald-400 font-extrabold text-sm animate-in zoom-in-95 duration-200">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Awesome! We&apos;ll notify you as soon as it launches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="grow h-14 px-5 rounded-2xl border-2 border-b-4 border-border bg-surface text-foreground font-bold placeholder-muted-foreground focus:outline-none focus:border-primary transition-all text-sm"
                />
                <button
                  type="submit"
                  className={`h-14 sm:w-auto px-6 border-b-[6px] rounded-2xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-0.5 active:border-b-2 shadow-md ${content.primaryButtonBg}`}
                >
                  <Bell className="h-4.5 w-4.5" />
                  Notify Me
                </button>
              </form>
            )}

            <button
              onClick={() => router.push("/courses")}
              className="w-full h-14 bg-surface hover:bg-surface-strong text-foreground border-2 border-b-4 border-border font-black text-sm rounded-2xl flex items-center justify-center gap-2 transition-all active:translate-y-0.5 active:border-b-2 cursor-pointer shadow-sm"
            >
              <span>Explore Active Courses</span>
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
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-sky-100 via-blue-50 to-yellow-50 dark:from-slate-950 dark:to-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-bold text-muted-foreground animate-pulse">Lumi is thinking...</p>
        </div>
      </div>
    }>
      <ComingSoonContent />
    </Suspense>
  );
}
