"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Play,
  Lock,
  Sparkles,
  BookOpen,
  RotateCcw,
  Code2,
  Layers,
  Coffee,
  Cpu,
  Hash,
  Compass,
  ArrowRight,
} from "lucide-react";
import Footer from "@/components/footer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const COMING_SOON_COURSES = [
  { id: "python", title: "Python", subtitle: "Translate ideas into powerful code", icon: <Code2 className="text-[#3776ab] w-6 h-6" />, color: "#3776ab" },
  { id: "javascript", title: "JavaScript", subtitle: "Build interactive web applications", icon: <Layers className="text-[#eab308] w-6 h-6" />, color: "#eab308" },
  { id: "java", title: "Java", subtitle: "Master object-oriented development", icon: <Coffee className="text-[#e76f51] w-6 h-6" />, color: "#e76f51" },
  { id: "cpp", title: "C++", subtitle: "Control high performance and memory", icon: <Cpu className="text-[#2dd4bf] w-6 h-6" />, color: "#2dd4bf" },
  { id: "csharp", title: "C#", subtitle: "Build modern desktop and gaming apps", icon: <Hash className="text-[#8b5cf6] w-6 h-6" />, color: "#8b5cf6" },
  { id: "go", title: "Go", subtitle: "Write simple, concurrency-first software", icon: <Compass className="text-[#10b981] w-6 h-6" />, color: "#10b981" },
];

export function CoursesPage() {
  const [stars, setStars] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const s = localStorage.getItem("lingo_stars");
    const h = localStorage.getItem("lingo_hearts");
    const t = setTimeout(() => {
      if (s) setStars(parseInt(s, 10));
      if (h) setHearts(parseInt(h, 10));
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const handleResetProgress = () => {
    setShowResetConfirm(true);
  };

  const executeReset = () => {
    setShowResetConfirm(false);
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    router.push("/auth");
  };

  return (
    <main className="min-h-screen w-full bg-background text-foreground font-sans flex flex-col items-center py-6 px-4 transition-colors duration-200">
      {/* Top Header Row */}
      <header className="w-full max-w-4xl flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#1e293b] px-3.5 py-2 rounded-2xl shadow-xs flex items-center gap-2.5">
            <Image src="/images/lumis-wayfing.png" alt="Lumi" width={28} height={28} className="w-7 h-7 object-contain" />
            <span className="text-xl md:text-2xl font-black tracking-tight leading-none text-slate-900 dark:text-white">
              Lingo
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Stars */}
          <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl px-3 py-1.5 shadow-xs">
            <span className="text-amber-500 font-bold text-sm">⭐</span>
            <span className="text-xs md:text-sm font-black text-amber-600 dark:text-amber-400 tabular-nums">{stars}</span>
          </div>
          {/* Hearts */}
          <div className="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-2xl px-3 py-1.5 shadow-xs">
            <span className="text-rose-500 font-bold text-sm">❤️</span>
            <span className="text-xs md:text-sm font-black text-rose-600 dark:text-rose-400 tabular-nums">{hearts}</span>
          </div>
          
          {/* Theme Toggle */}
          <ThemeToggle className="w-9 h-9 rounded-2xl" />

          {/* Reset progress */}
          <button
            onClick={handleResetProgress}
            className="w-9 h-9 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 dark:bg-[#111722] dark:border-[#1e293b] dark:hover:bg-[#182232] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-xs"
            title="Reset Progress"
          >
            <RotateCcw className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          </button>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <div className="w-full max-w-4xl grow flex flex-col gap-8 mb-24 z-10">

        {/* Active Hero Course Card */}
        <section className="w-full bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden border border-emerald-600/30">
          {/* Floating background blobs */}
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="grow space-y-3.5 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-300 font-black text-[11px] uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Subject
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Programming Basics
              </h1>
              <p className="text-emerald-100/90 text-sm md:text-base font-medium max-w-lg leading-relaxed">
                Guide Lumi through grids, collect stars, solve logic puzzles, and master sequences using visual commands! 🎮
              </p>

              <div className="flex flex-wrap gap-4 pt-1 justify-center md:justify-start">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-200">
                  <BookOpen className="w-4 h-4" />
                  Visual Interactive Quiz & Demo
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-200">
                  <span>🎓</span> Practice Mode & Sorting Game
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-center gap-4">
              <Image src="/images/lumis-wayfing.png" alt="Lumi" width={160} height={160} className="w-28 h-28 md:w-32 md:h-32 object-contain drop-shadow-md" />

              <Link href="/programming_basic">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base md:text-lg px-7 py-3.5 rounded-2xl shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-98 border border-emerald-400/40">
                  <Play className="w-5 h-5 fill-current" />
                  <span>Start Learning</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Coming Soon Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
              Upcoming Subjects
            </h2>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Locked ({COMING_SOON_COURSES.length})
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMING_SOON_COURSES.map((course) => (
              <div
                key={course.id}
                className="group bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#1e293b] rounded-2xl p-5 relative shadow-xs hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all flex flex-col gap-4 overflow-hidden"
              >
                {/* Locked Tag */}
                <span className="absolute top-3.5 right-3.5 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-400 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  Locked
                </span>

                <div className="flex items-start gap-3.5">
                  <div
                    className="shrink-0 size-12 rounded-2xl flex items-center justify-center border shadow-xs"
                    style={{
                      background: `linear-gradient(135deg, ${course.color}20, var(--surface-strong))`,
                      borderColor: `${course.color}40`
                    }}
                  >
                    {course.icon}
                  </div>

                  <div className="min-w-0 grow">
                    <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400 leading-snug pr-8">
                      {course.subtitle}
                    </p>
                  </div>
                </div>

                <div className="mt-2 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Coming Soon
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500/60 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={executeReset}
        title="Reset all progress?"
        description="Are you sure you want to reset all progress and restart onboarding?"
        confirmText="Reset"
        cancelText="Cancel"
        variant="danger"
      />

      <Footer />
    </main>
  );
}
