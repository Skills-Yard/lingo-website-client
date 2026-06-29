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
  Compass
} from "lucide-react";
import Footer from "@/components/footer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

const COMING_SOON_COURSES = [
  { id: "python", title: "Python", subtitle: "Translate ideas into powerful code", icon: <Code2 className="text-[#3776ab] w-7 h-7" />, color: "#3776ab" },
  { id: "javascript", title: "JavaScript", subtitle: "Build interactive web applications", icon: <Layers className="text-[#f7df1e] w-7 h-7" />, color: "#c58a52" },
  { id: "java", title: "Java", subtitle: "Master object-oriented development", icon: <Coffee className="text-[#e76f51] w-7 h-7" />, color: "#e76f51" },
  { id: "cpp", title: "C++", subtitle: "Control high performance and memory", icon: <Cpu className="text-[#2dd4bf] w-7 h-7" />, color: "#2dd4bf" },
  { id: "csharp", title: "C#", subtitle: "Build modern desktop and gaming apps", icon: <Hash className="text-[#8b5cf6] w-7 h-7" />, color: "#8b5cf6" },
  { id: "go", title: "Go", subtitle: "Write simple, concurrency-first software", icon: <Compass className="text-[#22c55e] w-7 h-7" />, color: "#22c55e" },
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
    <main className="min-h-screen w-full bg-linear-to-b from-sky-100 via-blue-50 to-yellow-50 text-slate-800 font-sans flex flex-col items-center py-6 px-4">
      {/* Top Header Row */}
      <header className="w-full max-w-4xl flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-white border-2 border-b-4 border-slate-200 px-3 py-1.5 rounded-2xl shadow-sm flex items-center gap-2">
            <Image src="/images/lumis-wayfing.png" alt="Lumi" width={28} height={28} className="w-7 h-7 object-contain" />
            <span className="text-2xl font-black text-slate-800 tracking-tight leading-none">
              Lingo
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Stars */}
          <div className="flex items-center gap-1 bg-amber-50 border-2 border-b-4 border-amber-200 rounded-2xl px-3 py-1.5 shadow-sm">
            <span className="text-amber-500 font-bold">⭐</span>
            <span className="text-xs md:text-sm font-black text-amber-600 tabular-nums">{stars}</span>
          </div>
          {/* Hearts */}
          <div className="flex items-center gap-1 bg-rose-50 border-2 border-b-4 border-rose-200 rounded-2xl px-3 py-1.5 shadow-sm">
            <span className="text-rose-500 font-bold">❤️</span>
            <span className="text-xs md:text-sm font-black text-rose-600 tabular-nums">{hearts}</span>
          </div>
          {/* Reset progress */}
          <button
            onClick={handleResetProgress}
            className="w-10 h-10 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-all active:translate-y-0.5 active:border-b-2 cursor-pointer shadow-sm ml-1"
            title="Reset Progress"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <div className="w-full max-w-4xl grow flex flex-col gap-8 mb-24 z-10">

        {/* Active Hero Course Card */}
        <section className="w-full bg-linear-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-[2.5rem] p-6 md:p-8 shadow-xl relative overflow-hidden border-b-8 border-indigo-900 active:translate-y-0.5 active:border-b-4 transition-all">
          {/* Floating background blobs */}
          <div className="absolute -top-7.5 -right-7.5 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12.5 -left-12.5 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="grow space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-yellow-400/20 text-yellow-300 font-black text-[11px] uppercase tracking-widest px-3 py-1 rounded-full border border-yellow-400/30">
                <Sparkles className="w-3 h-3" />
                Featured Subject
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Programming Basics
              </h1>
              <p className="text-indigo-100 text-sm md:text-base font-bold max-w-lg leading-relaxed">
                Guide Lumi through grids, collect stars, avoid rocks or trees, and master sequence logic using directional commands! 🎮
              </p>

              <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-200">
                  <BookOpen className="w-4 h-4" />
                  Demo & Lesson 1
                </div>
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-200">
                  <span>🎓</span> Practice Mode
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-center gap-4">
              <Image src="/images/lumis-wayfing.png" alt="Lumi" width={180} height={180} className="w-32 h-32 object-contain" />

              <Link href="/programming_basic">
                <button className="bg-[#58cc02] border-b-[6px] border-[#3ea800] hover:bg-[#65e002] active:translate-y-0.5 active:border-b-2 text-white font-black text-lg px-8 py-3.5 rounded-2xl shadow-lg flex items-center gap-2 cursor-pointer transition-all">
                  <Play className="w-5 h-5 fill-current" />
                  Start Learning
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Coming Soon Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-2">
            <h2 className="text-xl md:text-2xl font-black text-slate-800">
              Upcoming Subjects
            </h2>
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
              Locked ({COMING_SOON_COURSES.length})
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMING_SOON_COURSES.map((course) => (
              <div
                key={course.id}
                className="group bg-white/75 border-2 border-b-4 border-slate-200 rounded-3xl p-5 relative shadow-md hover:bg-white transition-all flex flex-col gap-4 overflow-hidden"
              >
                {/* Coming Soon Tag */}
                <span className="absolute top-3 right-3 bg-slate-100 text-slate-400 font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md border border-slate-200 shadow-sm flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  Locked
                </span>

                <div className="flex items-start gap-3">
                  <div
                    className="shrink-0 size-12 rounded-2xl flex items-center justify-center border shadow-inner"
                    style={{
                      background: `linear-gradient(135deg, ${course.color}15, var(--surface-strong) 72%)`,
                      borderColor: `${course.color}33`
                    }}
                  >
                    {course.icon}
                  </div>

                  <div className="min-w-0 grow">
                    <h3 className="text-base font-black text-slate-800 leading-tight">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-xs font-bold text-slate-400 leading-snug pr-8">
                      {course.subtitle}
                    </p>
                  </div>
                </div>

                <div className="mt-2 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Coming Soon
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 animate-pulse" />
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
