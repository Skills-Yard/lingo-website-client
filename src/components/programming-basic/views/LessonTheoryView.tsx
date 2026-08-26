"use client";

import React, { useState } from "react";
import { ChevronLeft, Bookmark, MoreHorizontal, CheckCircle2, XCircle, ArrowRight, Sparkles } from "lucide-react";
import { THEORY_SLIDES } from "../../../lib/constants/theorySlides";
import { TheorySlide } from "../sections/TheorySlide";
import { OutOfHeartsModal } from "../sections/OutOfHeartsModal";
import { ConfirmDialog } from "../../ui/confirm-dialog";
import { ThemeToggle } from "../../ui/theme-toggle";

interface LessonTheoryViewProps {
  hearts: number;
  setHearts: React.Dispatch<React.SetStateAction<number>>;
  stars: number;
  setStars: React.Dispatch<React.SetStateAction<number>>;
  setLevelStates: React.Dispatch<React.SetStateAction<Record<string, "locked" | "unlocked" | "completed" | "demo_completed">>>;
  setView: (view: "map" | "lesson1_theory" | "game") => void;
  triggerFlyingStars: (nodeId: number, count: number) => void;
  triggerSound: (type: "tap" | "step" | "pickup" | "win" | "lose" | "hint") => void;
}

export function LessonTheoryView({
  hearts,
  setHearts,
  stars,
  setStars,
  setLevelStates,
  setView,
  triggerFlyingStars,
  triggerSound,
}: LessonTheoryViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizAnswerChecked, setQuizAnswerChecked] = useState(false);
  const [showOutOfHeartsModal, setShowOutOfHeartsModal] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const slide = THEORY_SLIDES[currentSlide];
  const total = THEORY_SLIDES.length;
  const formattedStep = String(currentSlide + 1).padStart(2, "0");
  const formattedTotal = String(total).padStart(2, "0");

  const isCurrentAnswerCorrect =
    slide.hasQuiz &&
    selectedQuizOption !== null &&
    slide.options &&
    slide.options[selectedQuizOption]?.isCorrect;

  const handleNextSlide = () => {
    triggerSound("tap");
    setSelectedQuizOption(null);
    setQuizAnswerChecked(false);
    if (slide.isEnd) {
      setLevelStates((prev) => ({ ...prev, level1: "completed", level2: "unlocked" }));
      setStars((prev) => prev + 25);
      setView("map");
      setTimeout(() => triggerFlyingStars(1, 3), 100);
    } else {
      setCurrentSlide((p) => Math.min(total - 1, p + 1));
    }
  };

  const handleCheckAnswer = () => {
    if (selectedQuizOption === null) return;
    setQuizAnswerChecked(true);
    const correct = slide.options![selectedQuizOption].isCorrect;
    if (correct) {
      triggerSound("win");
    } else {
      triggerSound("lose");
      setHearts((p) => {
        const nv = Math.max(0, p - 1);
        if (nv === 0) setShowOutOfHeartsModal(true);
        return nv;
      });
    }
  };

  return (
    <main className="min-h-screen w-full bg-background text-foreground font-sans flex flex-col items-center transition-colors duration-200">
      <div className="w-full max-w-md flex flex-col grow px-4 py-4 pb-32">
        {/* ── Top Header Bar ── */}
        <header className="flex items-center justify-between gap-2.5 mb-5 select-none">
          <button
            onClick={() => {
              triggerSound("tap");
              setShowExitConfirm(true);
            }}
            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#1e293b] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#182232] transition-all active:scale-95 cursor-pointer shadow-xs"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Segmented Step Indicator */}
          <div className="grow flex flex-col items-center gap-1.5 px-2">
            <div className="text-xs font-black tracking-wider flex items-center gap-1">
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{formattedStep}</span>
              <span className="text-slate-400 dark:text-slate-500 font-semibold">/ {formattedTotal}</span>
            </div>
            <div className="w-full flex gap-1">
              {Array.from({ length: total }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full grow transition-all duration-300 ${
                    i <= currentSlide
                      ? "bg-emerald-600 dark:bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.35)]"
                      : "bg-slate-200 dark:bg-[#1e293b]"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Bookmark button */}
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`w-10 h-10 flex items-center justify-center rounded-2xl border transition-all active:scale-95 cursor-pointer shadow-xs ${
                bookmarked
                  ? "bg-emerald-50 border-emerald-300 text-emerald-600 dark:bg-emerald-950/40 dark:border-emerald-700 dark:text-emerald-400"
                  : "bg-white dark:bg-[#111722] border-slate-200 dark:border-[#1e293b] text-slate-600 dark:text-slate-300"
              }`}
              title="Bookmark question"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
            </button>

            {/* Theme toggle */}
            <ThemeToggle className="w-10 h-10 rounded-2xl" />

            {/* Hearts indicator */}
            <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-2xl px-2.5 py-2 shadow-xs">
              <span className="text-xs">❤️</span>
              <span className="text-xs font-black text-rose-600 dark:text-rose-400 tabular-nums">{hearts}</span>
            </div>
          </div>
        </header>

        {/* ── Slide Body ── */}
        <div className="grow flex flex-col">
          <TheorySlide
            slide={slide}
            selectedQuizOption={selectedQuizOption}
            setSelectedQuizOption={setSelectedQuizOption}
            quizAnswerChecked={quizAnswerChecked}
            triggerSound={triggerSound}
          />
        </div>
      </div>

      {/* ── Dynamic Bottom Sheet / Feedback Area ── */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 flex justify-center bg-gradient-to-t from-background via-background to-transparent pt-4 pb-4 px-4 backdrop-blur-xs">
        <div className="w-full max-w-md flex flex-col gap-3">
          {/* Normal Quiz Unchecked Submit Button */}
          {slide.hasQuiz && !quizAnswerChecked && (
            <button
              type="button"
              disabled={selectedQuizOption === null}
              onClick={handleCheckAnswer}
              className={`w-full h-14 rounded-2xl font-black text-base md:text-lg text-white transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98 cursor-pointer ${
                selectedQuizOption === null
                  ? "bg-slate-200 border border-slate-300 text-slate-400 dark:bg-[#182232] dark:border-[#1e293b] dark:text-slate-500 cursor-not-allowed shadow-none"
                  : "bg-[#059669] hover:bg-[#047857] dark:bg-[#10b981] dark:hover:bg-[#059669]"
              }`}
            >
              <span>Submit</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {/* Answer Checked Feedback Banner (Success or Error) */}
          {slide.hasQuiz && quizAnswerChecked && selectedQuizOption !== null && (
            <div
              className={`w-full rounded-3xl p-5 border transition-all duration-300 animate-pop-in flex flex-col gap-4 shadow-xl ${
                isCurrentAnswerCorrect
                  ? "bg-[#f0fdf4] dark:bg-[#0a1a14] border-[#86efac] dark:border-[#14532d] text-[#065f46] dark:text-[#a7f3d0]"
                  : "bg-[#fff1f2] dark:bg-[#1f090d] border-[#fecdd3] dark:border-[#881337] text-[#9f1239] dark:text-[#fecdd3]"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                {/* Status Message & Icon */}
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    {isCurrentAnswerCorrect ? (
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950/60" />
                    ) : (
                      <XCircle className="w-8 h-8 text-rose-600 dark:text-rose-400 fill-rose-100 dark:fill-rose-950/60" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3
                      className={`text-xl font-black leading-tight ${
                        isCurrentAnswerCorrect
                          ? "text-emerald-700 dark:text-emerald-300"
                          : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {isCurrentAnswerCorrect ? "Correct!" : "Oops! Not quite."}
                    </h3>
                    <p
                      className={`text-xs md:text-sm font-bold leading-snug ${
                        isCurrentAnswerCorrect
                          ? "text-emerald-800/90 dark:text-emerald-300/90"
                          : "text-rose-700/90 dark:text-rose-300/90"
                      }`}
                    >
                      {slide.options?.[selectedQuizOption]?.explanation ||
                        (isCurrentAnswerCorrect ? "Great job solving this!" : "Review the clue and try again.")}
                    </p>
                  </div>
                </div>

                {/* Animated Mascot / Character Illustration */}
                <div className="shrink-0 relative w-20 h-20 flex items-center justify-center">
                  <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-400 animate-spin" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={isCurrentAnswerCorrect ? "/images/lumis-wayfing.png" : "/images/lumi-laptop.png"}
                    alt="Mascot"
                    className="w-full h-full object-contain drop-shadow-md animate-bounce-slow"
                  />
                </div>
              </div>

              {/* Continue Button matching the state color */}
              <button
                type="button"
                onClick={handleNextSlide}
                className={`w-full h-13 rounded-2xl font-black text-base md:text-lg text-white transition-all flex items-center justify-center gap-2 shadow-md active:scale-98 cursor-pointer ${
                  isCurrentAnswerCorrect
                    ? "bg-[#059669] hover:bg-[#047857] dark:bg-[#10b981] dark:hover:bg-[#059669]"
                    : "bg-[#dc2626] hover:bg-[#b91c1c] dark:bg-[#ef4444] dark:hover:bg-[#dc2626]"
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Non-quiz slide continue button */}
          {!slide.hasQuiz && (
            <button
              type="button"
              onClick={handleNextSlide}
              className="w-full h-14 rounded-2xl font-black text-base md:text-lg bg-[#059669] hover:bg-[#047857] dark:bg-[#10b981] dark:hover:bg-[#059669] text-white shadow-lg active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{slide.isEnd ? "Finish & Start Level" : "Continue"}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </footer>

      {/* Out of Hearts Modal */}
      {showOutOfHeartsModal && (
        <OutOfHeartsModal
          stars={stars}
          setStars={setStars}
          setHearts={setHearts}
          setShowOutOfHeartsModal={setShowOutOfHeartsModal}
          setSelectedQuizOption={setSelectedQuizOption}
          setQuizAnswerChecked={setQuizAnswerChecked}
          setView={setView}
          triggerSound={triggerSound}
        />
      )}

      {/* Exit Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showExitConfirm}
        onClose={() => setShowExitConfirm(false)}
        onConfirm={() => {
          setShowExitConfirm(false);
          setView("map");
        }}
        title="Exit lesson?"
        description="Your current progress in this lesson will be lost."
        confirmText="Exit"
        cancelText="Cancel"
        variant="danger"
      />
    </main>
  );
}
