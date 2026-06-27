"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ChevronLeft, 
  Volume2, 
  Book, 
  TrendingUp, 
  Target, 
  Rocket, 
  Sunrise, 
  Sun, 
  MoonStar, 
  SunDim, 
  Timer 
} from "lucide-react";
import { LumiLogo } from "@/components/icons/koji-logo";

// ── 3D STYLED COMPONENTS ──

interface SelectionCardProps {
  title: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

function SelectionCard({ title, icon, selected, onClick, className = "" }: SelectionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-b-4 transition-all duration-150 w-full min-h-[140px] shadow-md cursor-pointer active:translate-y-0.5 active:border-b-2 ${
        selected 
          ? "border-[#58cc02] bg-[#d7f5c5] text-[#2d7a00] border-b-[6px] shadow-[0_0_14px_rgba(88,204,2,0.25)]" 
          : "border-slate-200 bg-white/80 hover:bg-slate-50/90 hover:border-slate-300 text-slate-700"
      } ${className}`}
    >
      {icon && <div className="text-3xl mb-3 flex items-center justify-center">{icon}</div>}
      <span className="font-extrabold text-center text-sm md:text-base leading-tight">{title}</span>
    </button>
  );
}

interface LevelCardProps {
  codeSnippet: React.ReactNode;
  level: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

function LevelCard({ codeSnippet, level, description, selected, onClick }: LevelCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-5 rounded-3xl border-2 border-b-4 transition-all duration-150 w-full min-h-[150px] shadow-md cursor-pointer active:translate-y-0.5 active:border-b-2 ${
        selected 
          ? "border-[#7c3aed] bg-[#f3e8ff] text-[#5b21b6] border-b-[6px] shadow-[0_0_14px_rgba(124,58,237,0.2)]" 
          : "border-slate-200 bg-white/80 hover:bg-slate-50/90 hover:border-slate-300 text-slate-700"
      }`}
    >
      <div className="font-mono text-xs md:text-sm text-indigo-600 dark:text-indigo-400 mb-3 min-h-[35px] flex items-center justify-center">
        {codeSnippet}
      </div>
      <h3 className="font-black text-lg md:text-xl mb-1">{level}</h3>
      <p className="text-xs opacity-80 leading-tight font-semibold">{description}</p>
    </button>
  );
}

// ── UNIFIED ONBOARDING LAYOUT ──

interface OnboardingLayoutProps {
  children: React.ReactNode;
  step?: number;
  totalSteps?: number;
  title: string;
  subtitle?: string;
  onContinue: () => void;
  isContinueDisabled?: boolean;
  showLogo?: boolean;
  onBack: () => void;
  showContinueButton?: boolean;
  continueLabel?: string;
}

function OnboardingLayout({
  children,
  step,
  totalSteps = 7,
  title,
  subtitle,
  onContinue,
  isContinueDisabled = false,
  showLogo = true,
  onBack,
  showContinueButton = true,
  continueLabel: _continueLabel = "Continue"
}: OnboardingLayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-sky-100 via-blue-50 to-yellow-50 text-slate-800 font-sans flex flex-col items-center py-6 px-4">
      {/* Background Clouds decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        <div className="absolute top-[10%] left-[-100px] w-[200px] h-[80px] bg-white rounded-full blur-[1px] animate-pulse" />
        <div className="absolute top-[30%] right-[-120px] w-[250px] h-[90px] bg-white rounded-full blur-[1px]" />
      </div>

      <div className="relative w-full max-w-md flex flex-col z-10 flex-grow">
        {/* Navigation & Progress Bar */}
        {step !== undefined && (
          <header className="flex items-center justify-between gap-3 mb-6">
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-all active:translate-y-0.5 active:border-b-2 cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>

            <div className="flex-1 flex gap-1.5 px-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2.5 rounded-full flex-grow border border-slate-200/50 shadow-inner ${
                    i < step 
                      ? "bg-[#58cc02] shadow-[0_0_8px_rgba(88,204,2,0.4)]" 
                      : "bg-slate-200"
                  }`} 
                />
              ))}
            </div>

            <button 
              className="w-10 h-10 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-all active:translate-y-0.5 active:border-b-2 cursor-pointer shadow-sm"
            >
              <Volume2 className="w-5 h-5 text-slate-600" />
            </button>
          </header>
        )}

        {/* Content Container */}
        <div className="flex-grow flex flex-col justify-center items-center py-4 mb-28">
          {showLogo && (
            <div className="mb-6 flex justify-center transform hover:scale-105 transition-transform">
              <LumiLogo variant="study" className="w-24 h-24 drop-shadow-md animate-bounce-slow" priority />
            </div>
          )}

          <div className="text-center w-full mb-8">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-tight mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm md:text-base text-slate-500 font-bold leading-relaxed px-4">
                {subtitle}
              </p>
            )}
          </div>

          <div className="w-full">
            {children}
          </div>
        </div>

        {/* Sticky Continue Button */}
        {showContinueButton && (
          <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-sky-50 via-sky-50/90 to-transparent flex justify-center z-20">
            <div className="w-full max-w-md">
              <button
                onClick={onContinue}
                disabled={isContinueDisabled}
                className={`h-14 w-full rounded-2xl font-black text-lg transition-all border-b-4 flex items-center justify-center gap-2 cursor-pointer active:translate-y-0.5 active:border-b-2 shadow-md ${
                  isContinueDisabled 
                    ? "bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed shadow-none" 
                    : "bg-[#58cc02] border-[#3ea800] hover:bg-[#65e002] text-white"
                }`}
              >
                Continue
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

// ── STEP SUB-COMPONENTS ──

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

// Step 0: Welcome
function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <OnboardingLayout
      title="Hi! I am Lumi"
      subtitle="I'll help you personalize your learning path in a few quick steps."
      onContinue={onNext}
      onBack={() => {}}
      showContinueButton={true}
      showLogo={true}
    >
      <div className="flex flex-col items-center justify-center p-4">
        <div className="bg-white/80 border-2 border-b-4 border-slate-200 rounded-3xl p-6 text-center shadow-lg max-w-xs backdrop-blur-md">
          <p className="text-sm font-extrabold text-slate-700 leading-relaxed">
            Welcome to Lingo! Get ready to learn coding through interactive visual challenges. 🎮
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
}

// Step 1: Motivation
const MOTIVATIONS = [
  { id: "school", title: "Excelling in school", icon: <Book className="text-teal-500 w-10 h-10" /> },
  { id: "growth", title: "Professional growth", icon: <TrendingUp className="text-green-500 w-10 h-10" /> },
  { id: "sharp", title: "Staying sharp", icon: <Target className="text-purple-500 w-10 h-10" /> },
  { id: "child", title: "Helping my child learn", icon: <Rocket className="text-indigo-500 w-10 h-10" /> },
];

function MotivationStep({ onNext, onBack }: StepProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <OnboardingLayout
      step={1}
      title="What motivates you to learn?"
      onContinue={onNext}
      onBack={onBack}
      isContinueDisabled={!selected}
    >
      <div className="grid grid-cols-2 gap-4">
        {MOTIVATIONS.map((item) => (
          <SelectionCard
            key={item.id}
            title={item.title}
            icon={item.icon}
            selected={selected === item.id}
            onClick={() => setSelected(item.id)}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}

// Step 2: Age
function AgeStep({ onNext, onBack }: StepProps) {
  const [age, setAge] = useState("");

  return (
    <OnboardingLayout
      step={2}
      title="How old are you?"
      onContinue={onNext}
      onBack={onBack}
      isContinueDisabled={!age}
    >
      <div className="flex justify-center p-2">
        <input
          type="number"
          placeholder="Your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="text-2xl font-black h-16 rounded-2xl border-2 border-b-4 border-slate-200 bg-white px-6 w-full max-w-xs text-center focus:border-[#7c3aed] focus:ring-0 focus:outline-none transition-all"
          autoFocus
        />
      </div>
    </OnboardingLayout>
  );
}

// Step 3: Programming Level
const LEVELS = [
  {
    id: "beginner",
    code: <span>print(<span className="text-blue-500">&quot;hello&quot;</span>)</span>,
    level: "Beginner",
    description: "I want to start from the basics.",
  },
  {
    id: "novice",
    code: <span><span className="text-pink-500">if</span> b &gt; a:<br/>&nbsp;&nbsp;print b</span>,
    level: "Novice",
    description: "I've seen, but not touched code before.",
  },
  {
    id: "intermediate",
    code: <span><span className="text-pink-500">for</span> i <span className="text-pink-500">in</span> <span className="text-blue-500">range</span>(5):</span>,
    level: "Intermediate",
    description: "I can write simple programs with loops.",
  },
  {
    id: "advanced",
    code: <span><span className="text-pink-500">def</span> <span className="text-blue-500">circle</span>(size):</span>,
    level: "Advanced",
    description: "I've written longer programs.",
  },
];

function LevelStep({ onNext, onBack }: StepProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <OnboardingLayout
      step={3}
      title="What level of programming are you currently at?"
      onContinue={onNext}
      onBack={onBack}
      isContinueDisabled={!selected}
    >
      <div className="grid grid-cols-2 gap-4 mt-2">
        {LEVELS.map((item) => (
          <LevelCard
            key={item.id}
            codeSnippet={item.code}
            level={item.level}
            description={item.description}
            selected={selected === item.id}
            onClick={() => setSelected(item.id)}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}

// Step 4: Schedule
const SCHEDULES = [
  { id: "morning", title: "Morning routine", icon: <Sunrise className="text-orange-400 w-10 h-10" /> },
  { id: "afternoon", title: "Afternoon break", icon: <Sun className="text-yellow-500 w-10 h-10" /> },
  { id: "night", title: "Nightly ritual", icon: <MoonStar className="text-indigo-400 w-10 h-10" /> },
  { id: "other", title: "Another time", icon: <SunDim className="text-pink-400 w-10 h-10" /> },
];

function ScheduleStep({ onNext, onBack }: StepProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <OnboardingLayout
      step={4}
      title="How will learning fit into your day?"
      onContinue={onNext}
      onBack={onBack}
      isContinueDisabled={!selected}
    >
      <div className="grid grid-cols-2 gap-4">
        {SCHEDULES.map((item) => (
          <SelectionCard
            key={item.id}
            title={item.title}
            icon={item.icon}
            selected={selected === item.id}
            onClick={() => setSelected(item.id)}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}

// Step 5: Daily Goal
const GOALS = [
  { id: "10", time: "10 min", color: "text-indigo-400" },
  { id: "20", time: "20 min", color: "text-indigo-500" },
  { id: "30", time: "30 min", color: "text-pink-500" },
  { id: "60", time: "60 min", color: "text-rose-500" },
];

function GoalStep({ onNext, onBack }: StepProps) {
  const [selected, setSelected] = useState<string | null>("20");

  return (
    <OnboardingLayout
      step={5}
      title="What's your daily learning goal?"
      onContinue={onNext}
      onBack={onBack}
      isContinueDisabled={!selected}
    >
      <div className="grid grid-cols-2 gap-4">
        {GOALS.map((goal) => (
          <SelectionCard
            key={goal.id}
            title={goal.time}
            icon={<Timer className={`${goal.color} w-10 h-10`} strokeWidth={2} />}
            selected={selected === goal.id}
            onClick={() => setSelected(goal.id)}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}

// Step 6: Topics Grid Surrounding Mascot
const TopicBubble = ({ text, colorClass }: { text: string; colorClass: string }) => (
  <div className="group flex cursor-default flex-col items-center justify-center rounded-2xl border-2 border-b-4 border-slate-200 bg-white/90 px-3 py-2.5 text-center text-[10px] font-black text-slate-700 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:px-4 sm:py-3 sm:text-xs">
    <div className={`mb-2 h-1.5 w-8 rounded-full ${colorClass} opacity-80 transition-opacity group-hover:opacity-100`} />
    <span className="max-w-[100px] text-balance leading-tight font-extrabold">{text}</span>
  </div>
);

function TopicsStep({ onNext, onBack }: StepProps) {
  return (
    <OnboardingLayout
      step={6}
      showLogo={false}
      title="We have everything you need."
      onContinue={onNext}
      onBack={onBack}
    >
      <div className="relative mx-auto mt-2 flex min-h-[350px] w-full flex-col items-center justify-center gap-3 px-2">
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-x-10 top-12 h-64 rounded-full bg-[radial-gradient(circle,_rgba(250,204,21,0.15),_transparent_60%)] blur-3xl" />

        {/* Mascot Center */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <div className="pointer-events-auto rounded-[2rem] border-2 border-b-4 border-slate-200 bg-white p-3 shadow-xl backdrop-blur-md">
            <LumiLogo variant="coding" className="h-16 w-16 shadow-none animate-bounce-slow" priority />
          </div>
        </div>

        {/* Row 1: Top Topics */}
        <div className="relative z-10 flex flex-wrap justify-center gap-2">
          <TopicBubble text="Arrays" colorClass="bg-sky-500" />
          <TopicBubble text="Scaling input" colorClass="bg-sky-300" />
          <TopicBubble text="Big-O runtime" colorClass="bg-cyan-400" />
          <TopicBubble text="Heaps" colorClass="bg-blue-400" />
        </div>

        {/* Row 2: Middle Topics (Split around Mascot space) */}
        <div className="relative z-10 flex w-full flex-wrap items-center justify-center gap-2">
          {/* Left Side */}
          <div className="flex flex-1 flex-wrap justify-end gap-2">
            <TopicBubble text="Counting ops" colorClass="bg-teal-400" />
            <TopicBubble text="Binary trees" colorClass="bg-indigo-500" />
          </div>
          
          {/* Invisible Spacer for Mascot */}
          <div className="w-[88px] shrink-0" aria-hidden="true" />
          
          {/* Right Side */}
          <div className="flex flex-1 flex-wrap justify-start gap-2">
            <TopicBubble text="Recursion" colorClass="bg-violet-500" />
            <TopicBubble text="Hash tables" colorClass="bg-indigo-400" />
          </div>
        </div>

        {/* Row 3: Bottom Topics */}
        <div className="relative z-10 flex flex-wrap justify-center gap-2">
          <TopicBubble text="Structures" colorClass="bg-violet-400" />
          <TopicBubble text="Divide & conquer" colorClass="bg-amber-400" />
          <TopicBubble text="Loops" colorClass="bg-rose-300" />
        </div>
      </div>
    </OnboardingLayout>
  );
}

// Step 7: Limitless (Premium Intro)
function LimitlessStep({ onNext, onBack }: StepProps) {
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

          <circle cx="288" cy="212" r="12" stroke="#818CF8" strokeWidth="2" fill="transparent" className="animate-ping" />
          <circle cx="288" cy="212" r="6" fill="#818CF8" />
        </svg>

        <div className="relative z-10 rounded-[2.25rem] border-2 border-b-4 border-slate-200 bg-white p-4 shadow-xl backdrop-blur-md transform hover:rotate-3 transition-transform">
          <LumiLogo variant="study" className="h-28 w-28 shadow-none animate-bounce-slow" priority />
        </div>
      </div>
    </OnboardingLayout>
  );
}

// Step 8: Signup Form
function SignupStep({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [email, setEmail] = useState("");

  return (
    <OnboardingLayout
      step={8}
      totalSteps={8}
      title="Create a free profile to discover your learning plan"
      onContinue={onComplete}
      onBack={onBack}
      showLogo={false}
      showContinueButton={false}
    >
      <div className="flex flex-col gap-5 py-2">
        <div className="space-y-3">
          <button
            onClick={onComplete}
            className="h-14 w-full rounded-2xl border-2 border-b-4 border-slate-200 bg-white text-base font-extrabold text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50 active:translate-y-0.5 active:border-b-2 transition-all cursor-pointer shadow-md"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <button
            onClick={onComplete}
            className="h-14 w-full rounded-2xl border-2 border-b-4 border-slate-200 bg-white text-base font-extrabold text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50 active:translate-y-0.5 active:border-b-2 transition-all cursor-pointer shadow-md"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-slate-800" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.05 13.921c-.015-2.38 1.95-3.526 2.042-3.585-1.11-1.61-2.834-1.83-3.414-1.854-1.442-.143-2.81.841-3.541.841-.715 0-1.848-.824-3.033-.801-1.536.02-2.955.882-3.743 2.235-1.597 2.748-.408 6.81 1.144 9.027.765 1.09 1.66 2.302 2.857 2.257 1.157-.043 1.602-.733 2.992-.733 1.39 0 1.796.733 3.011.71 1.23-.021 2.015-1.11 2.766-2.186.87-1.258 1.23-2.477 1.248-2.54-.027-.01-2.313-.878-2.329-3.371zM15.111 7.55c.636-.763 1.066-1.823.948-2.884-1.05.042-2.314.692-2.969 1.455-.519.601-1.033 1.684-.897 2.716 1.173.088 2.28-.624 2.918-1.287z" />
            </svg>
            Continue with Apple
          </button>
        </div>

        <div className="relative flex items-center py-1">
          <div className="flex-grow border-t-2 border-slate-200" />
          <span className="mx-4 flex-shrink-0 text-xs font-black tracking-widest text-slate-400">OR</span>
          <div className="flex-grow border-t-2 border-slate-200" />
        </div>

        <div className="space-y-3 relative">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 w-full rounded-2xl border-2 border-b-4 border-slate-200 bg-white px-4 text-base font-bold focus:border-[#7c3aed] focus:ring-0 focus:outline-none transition-all"
          />

          <button
            onClick={onComplete}
            disabled={!email}
            className={`h-14 w-full rounded-2xl font-black text-lg transition-all border-b-4 flex items-center justify-center gap-2 cursor-pointer active:translate-y-0.5 active:border-b-2 shadow-md ${
              !email
                ? "bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed shadow-none" 
                : "bg-[#7c3aed] border-[#5b21b6] hover:bg-[#6d28d9] text-white"
            }`}
          >
            Sign up
          </button>
        </div>

        <p className="text-center text-xs font-semibold text-slate-400 px-4 leading-relaxed">
          By clicking Sign up, I agree to Lingo&apos;s{" "}
          <Link href="#" className="underline hover:text-slate-600">Terms</Link> and{" "}
          <Link href="#" className="underline hover:text-slate-600">Privacy Policy</Link>.
        </p>

        <div className="border-t border-slate-200 pt-4 text-center mt-2">
          <p className="text-sm font-bold text-slate-600">
            Existing user?{" "}
            <Link href="#" onClick={onComplete} className="font-extrabold text-[#7c3aed] underline hover:text-[#5b21b6]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
}

// ── MAIN AUTH WORKFLOW PAGE ──

export default function AuthPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const router = useRouter();

  const handleNext = () => setStepIndex((idx) => idx + 1);
  const handleBack = () => setStepIndex((idx) => Math.max(0, idx - 1));
  const handleComplete = () => {
    // Save onboarding completion to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("lingo_onboarding_completed", "true");
    }
    router.push("/courses");
  };

  const stepsList = [
    { id: "welcome", component: WelcomeStep },
    { id: "motivation", component: MotivationStep },
    { id: "age", component: AgeStep },
    { id: "level", component: LevelStep },
    { id: "schedule", component: ScheduleStep },
    { id: "goal", component: GoalStep },
    { id: "topics", component: TopicsStep },
    { id: "limitless", component: LimitlessStep },
  ];

  if (stepIndex < stepsList.length) {
    const CurrentStep = stepsList[stepIndex].component;
    return <CurrentStep onNext={handleNext} onBack={handleBack} />;
  }

  return <SignupStep onBack={handleBack} onComplete={handleComplete} />;
}
