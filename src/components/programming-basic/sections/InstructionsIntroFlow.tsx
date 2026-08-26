"use client";

import React, { useState } from "react";
import { Poppins } from "next/font/google";
import {
  ChevronLeft,
  Bookmark,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Play,
  Network,
  Sparkles,
} from "lucide-react";
import { INSTRUCTIONS_INTRO_SLIDES } from "@/lib/constants/instructionsIntro";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

interface InstructionsIntroFlowProps {
  onComplete?: () => void;
  /** Slide to open on, for deep-linking/testing a specific screen (defaults to the first). */
  initialIndex?: number;
}

/** Teacher-at-the-whiteboard illustration shared by the "Teacher Says" intro and the quiz screen. */
function TeacherIllustration({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden shadow-sm ${compact ? "h-48 md:h-56" : "aspect-[390/360]"}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/teacherWhite.png"
        alt="Teacher explaining at the whiteboard"
        className={`w-full h-full dark:hidden ${compact ? "object-cover" : "object-contain"}`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/teacherBlack.png"
        alt="Teacher explaining at the whiteboard"
        className={`w-full h-full hidden dark:block ${compact ? "object-cover" : "object-contain"}`}
      />
      <div className="absolute top-5 right-5 max-w-32.5 bg-white text-[#2C2C2C] rounded-2xl rounded-bl-sm px-3.5 py-2.5 shadow-lg">
        <span className="text-xs md:text-sm font-semibold leading-snug">Open Your Notebook</span>
      </div>
    </div>
  );
}

export function InstructionsIntroFlow({
  onComplete,
  initialIndex = 0,
}: InstructionsIntroFlowProps) {
  const [index, setIndex] = useState(initialIndex);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const total = INSTRUCTIONS_INTRO_SLIDES.length;
  const slide = INSTRUCTIONS_INTRO_SLIDES[index];

  const stepNumber = index + 1;
  const stepTotal = total;

  const goNext = () => {
    setSelected(null);
    setChecked(false);
    if (index >= total - 1) {
      onComplete?.();
      return;
    }
    setIndex((i) => i + 1);
  };

  const goBack = () => {
    if (index === 0) return;
    setSelected(null);
    setChecked(false);
    setIndex((i) => i - 1);
  };

  const isQuiz = slide.kind === "teacher-quiz";
  const selectedOption =
    isQuiz && selected !== null ? slide.options[selected] : null;
  const isCorrect = !!selectedOption?.isCorrect;

  const handlePrimaryAction = () => {
    if (isQuiz && !checked) {
      if (selected === null) return;
      setChecked(true);
      return;
    }
    goNext();
  };

  const primaryLabel =
    slide.kind === "teacher-quiz" && !checked ? slide.submitLabel : slide.cta;
  const feedbackTitle =
    slide.kind === "teacher-quiz"
      ? isCorrect
        ? slide.correctTitle
        : slide.incorrectTitle
      : "";
  const feedbackBody =
    slide.kind === "teacher-quiz" ? (isCorrect ? slide.correctText : slide.incorrectText) : "";

  return (
    <main
      className={`${poppins.className} min-h-screen w-full max-w-full overflow-x-hidden bg-background text-foreground flex flex-col items-center transition-colors duration-200`}
    >
      <div className={`w-full max-w-md flex flex-col grow px-4 py-4 ${isQuiz && checked ? "pb-56" : "pb-32"}`}>
        {/* ── Header (same on every slide) ── */}
        <header className="flex items-center justify-between gap-2.5 mb-5 select-none">
          <button
            onClick={goBack}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-card border border-border text-foreground hover:bg-surface-strong transition-all active:scale-95 cursor-pointer shadow-xs"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="grow flex flex-col items-center gap-1.5 px-2">
            <div className="text-xs font-medium tracking-wider flex items-center gap-1">
              <span className="text-primary font-semibold">
                {String(stepNumber).padStart(2, "0")}
              </span>
              <span className="text-muted-foreground">
                / {String(stepTotal).padStart(2, "0")}
              </span>
            </div>
            <div className="w-full flex gap-1">
              {Array.from({ length: stepTotal }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full grow transition-all duration-300 ${
                    i < stepNumber ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setBookmarked((b) => !b)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all active:scale-95 cursor-pointer shadow-xs ${
                bookmarked
                  ? "bg-secondary border-primary/40 text-primary"
                  : "bg-card border-border text-muted-foreground"
              }`}
              aria-label="Bookmark"
            >
              <Bookmark
                className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`}
              />
            </button>
            <ThemeToggle className="w-10 h-10 rounded-lg" />
          </div>
        </header>

        {/* ── Body ── */}
        <div className="grow flex flex-col gap-4 select-none">
          {slide.kind === "cover" && (
            <div className="flex flex-col gap-3 text-center">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight text-balance">
                <span className="text-primary">{slide.highlightWord}</span>{" "}
                <span className="text-foreground">{slide.title}</span>
              </h1>

              <div className="relative w-full h-36 bg-card rounded-2xl border border-border flex items-center justify-center overflow-hidden shadow-sm p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.imageSrc}
                  alt=""
                  className="h-full max-w-full object-contain"
                />
              </div>

              <div>
                {slide.lines.map((line) => (
                  <p
                    key={line}
                    className="text-base md:text-lg font-semibold text-foreground"
                  >
                    {line}
                  </p>
                ))}
                <p className="text-base md:text-lg font-semibold text-primary">
                  {slide.highlightLine}
                </p>
              </div>

              <div className="w-full rounded-2xl bg-[#1A1C22] p-6 flex items-center gap-5 shadow-lg mt-1">
                <div className="w-16 h-16 shrink-0 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/box.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm text-white font-medium">
                    {slide.revealLabel}
                  </p>
                  <p className="text-sm text-[#BEBEBE] font-medium">about</p>
                  <p className="text-lg font-semibold tracking-wide text-primary">
                    {slide.revealSubject}
                  </p>
                </div>
              </div>
            </div>
          )}

          {slide.kind === "teacher-intro" && (
            <>
              <div className="flex flex-col items-center gap-3 text-center">
                <p className="text-2xl md:text-3xl font-semibold text-primary">
                  {slide.eyebrow}
                </p>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight -mt-2">
                  {slide.title}
                </h1>
              </div>
              <TeacherIllustration />
            </>
          )}

          {slide.kind === "teacher-quiz" && (
            <>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight text-center md:text-left">
                <span className="text-primary">{slide.highlightWord}</span>{" "}
                <span className="text-foreground">{slide.title}</span>
              </h1>

              <TeacherIllustration compact />

              <div className="flex flex-col gap-3">
                {slide.options.map((opt, idx) => {
                  const isSelected = selected === idx;
                  const Icon = opt.icon;

                  let cardBorder =
                    "border-border bg-card hover:border-muted-foreground/50";
                  let radioStyle = "border-muted-foreground/60";
                  let iconWrap =
                    idx === 0
                      ? "bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-300"
                      : "bg-secondary text-primary";

                  if (isSelected && !checked) {
                    cardBorder =
                      "border-primary bg-secondary ring-1 ring-primary/30";
                    radioStyle = "border-primary";
                    iconWrap = "bg-primary/15 text-primary";
                  } else if (isSelected && checked) {
                    if (opt.isCorrect) {
                      cardBorder =
                        "border-primary bg-secondary ring-1 ring-primary/40";
                      radioStyle = "border-primary";
                      iconWrap = "bg-primary/15 text-primary";
                    } else {
                      cardBorder =
                        "border-rose-500 bg-rose-50/80 dark:bg-[#260c11] ring-1 ring-rose-500/40";
                      radioStyle = "border-rose-500";
                      iconWrap =
                        "bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400";
                    }
                  }

                  return (
                    <button
                      key={opt.text}
                      type="button"
                      disabled={checked}
                      onClick={() => setSelected(idx)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left shadow-xs cursor-pointer active:scale-99 ${cardBorder}`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0 grow">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconWrap}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col min-w-0 pr-2">
                          <span className="font-medium text-base leading-tight text-foreground">
                            {opt.text}
                          </span>
                          {!checked && (
                            <span className="text-xs text-muted-foreground font-normal mt-0.5 line-clamp-1">
                              {opt.subtitle}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="shrink-0 pl-2">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${radioStyle}`}
                        >
                          {isSelected && (
                            <div
                              className={`w-3 h-3 rounded-full ${
                                checked && !opt.isCorrect
                                  ? "bg-rose-500"
                                  : "bg-primary"
                              }`}
                            />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {slide.kind === "examples-grid" && (
            <>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight text-center md:text-left text-foreground">
                {slide.title}
              </h1>

              <div className="flex flex-col gap-3 justify-center grow">
                {slide.pairs.map((pair) => (
                  <div key={pair.leftLabel} className="flex items-center justify-center gap-3">
                    <div className="flex flex-col items-center gap-1.5 w-24">
                      <div className="w-20 h-20 rounded-2xl bg-secondary overflow-hidden flex items-center justify-center p-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={pair.leftImage} alt={pair.leftLabel} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-xs font-medium text-foreground text-center leading-tight">
                        {pair.leftLabel}
                      </span>
                    </div>

                    <div className="w-6 h-0.5 rounded-full bg-primary shrink-0" />

                    <div className="flex flex-col items-center gap-1.5 w-24">
                      <div className="w-20 h-20 rounded-2xl bg-secondary overflow-hidden flex items-center justify-center p-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={pair.rightImage} alt={pair.rightLabel} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-xs font-medium text-foreground text-center leading-tight">
                        {pair.rightLabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {slide.kind === "video" && (
            <>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight text-center md:text-left flex items-center gap-2 justify-center md:justify-start">
                <Network className="w-5 h-5 text-primary shrink-0" />
                <span className="text-primary">
                  {slide.highlightWord} {slide.title}
                </span>
              </h1>

              <div className="relative w-full h-56 md:h-64 rounded-xl bg-[#1A1C22] flex items-center justify-center overflow-hidden shadow-lg">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl">
                  <Play className="w-6 h-6 text-primary fill-primary ml-0.5" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-black/40" />
              </div>

              <div className="w-full rounded-xl bg-secondary p-4 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary shrink-0" />
                <p className="text-xs md:text-sm text-secondary-foreground font-medium leading-snug">
                  {slide.caption}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 flex justify-center bg-gradient-to-t from-background via-background to-transparent pt-4 pb-4 px-4 backdrop-blur-xs">
        <div className="w-full max-w-md flex flex-col gap-3">
          {isQuiz && checked && selectedOption && (
            <div
              className={`w-full rounded-2xl p-4 border transition-all duration-300 animate-pop-in flex items-center justify-between gap-3 shadow-xl ${
                isCorrect
                  ? "bg-secondary border-primary/40"
                  : "bg-[#fff1f2] dark:bg-[#1f090d] border-[#fecdd3] dark:border-[#881337]"
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="min-w-0">
                  <h3
                    className={`text-base font-semibold leading-tight ${isCorrect ? "text-primary" : "text-rose-600 dark:text-rose-400"}`}
                  >
                    {feedbackTitle}
                  </h3>
                  <p
                    className={`text-xs font-medium leading-snug mt-0.5 ${isCorrect ? "text-secondary-foreground/90" : "text-rose-700/90 dark:text-rose-300/90"}`}
                  >
                    {feedbackBody}
                  </p>
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/sliceAnswer.png"
                alt=""
                className="w-16 h-16 shrink-0 object-contain animate-bounce-slow"
              />
            </div>
          )}

          <button
            type="button"
            onClick={handlePrimaryAction}
            disabled={isQuiz && !checked && selected === null}
            className={`w-full h-13 rounded-xl font-medium text-base transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98 cursor-pointer ${
              isQuiz && !checked && selected === null
                ? "bg-muted text-muted-foreground cursor-not-allowed shadow-none"
                : isQuiz && checked && !isCorrect
                  ? "bg-destructive hover:bg-destructive/90 text-white"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
            }`}
          >
            <span>{primaryLabel}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </main>
  );
}
