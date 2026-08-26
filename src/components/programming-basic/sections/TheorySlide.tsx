"use client";

import React from "react";
import { MessageSquare, BookOpen, HelpCircle, Compass, Play, Sparkles } from "lucide-react";
import { COMMAND_DETAILS } from "../../../lib/constants/commands";
import { TheorySlideType as Slide } from "../../../utils/types";

interface TheorySlideProps {
  slide: Slide;
  selectedQuizOption: number | null;
  setSelectedQuizOption: (opt: number | null) => void;
  quizAnswerChecked: boolean;
  triggerSound: (type: "tap" | "step" | "pickup" | "win" | "lose" | "hint") => void;
}

export function TheorySlide({
  slide,
  selectedQuizOption,
  setSelectedQuizOption,
  quizAnswerChecked,
  triggerSound,
}: TheorySlideProps) {
  // Extract first word for brand-color highlight
  const titleParts = slide.title.split(" ");
  const firstWord = titleParts[0];
  const remainingTitle = titleParts.slice(1).join(" ");

  // Default option badges mapping
  const getOptionBadge = (idx: number, opt: any) => {
    const cmdType = opt.commandType as keyof typeof COMMAND_DETAILS | undefined;
    if (cmdType && COMMAND_DETAILS[cmdType]) {
      return (
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center p-1 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={COMMAND_DETAILS[cmdType].imageSrc}
            alt={opt.text}
            className="w-6 h-6 object-contain"
          />
        </div>
      );
    }

    if (idx === 0) {
      return (
        <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
          <MessageSquare className="w-5 h-5 fill-current" />
        </div>
      );
    }
    if (idx === 1) {
      return (
        <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
      );
    }
    if (idx === 2) {
      return (
        <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
          <Compass className="w-5 h-5" />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0 font-black text-sm">
        {String.fromCharCode(65 + idx)}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 select-none">
      {/* ── Title with brand-color highlight on first word ── */}
      <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight text-center md:text-left">
        <span className="text-primary">{firstWord} </span>
        <span className="text-foreground">{remainingTitle}</span>
      </h1>

      {/* ── Main Media / 3D Card ── */}
      {slide.imageSrc ? (
        <div className="relative w-full h-64 md:h-72 bg-card rounded-3xl border border-border flex items-center justify-center overflow-hidden shadow-sm p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.imageSrc}
            alt={slide.title}
            className="w-full h-full object-contain rounded-2xl"
          />
        </div>
      ) : slide.showCommandsIllustration ? (
        <div className="relative w-full bg-card rounded-3xl border border-border p-5 shadow-sm">
          <div className="grid grid-cols-2 gap-3 mb-3">
            {[
              { icon: "↑", label: "Go Straight" },
              { icon: "←", label: "Turn Left" },
              { icon: "✋", label: "Pick Up" },
              { icon: "↓", label: "Put Down" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 bg-muted border border-border rounded-2xl p-3"
              >
                <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground font-black flex items-center justify-center shadow-xs">
                  {item.icon}
                </div>
                <span className="text-xs md:text-sm font-bold text-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground font-medium text-center">
            {slide.instruction || "The computer follows your commands step-by-step!"}
          </p>
        </div>
      ) : (
        <div className="relative w-full h-52 bg-card rounded-3xl border border-border flex flex-col items-center justify-center p-6 shadow-sm text-center">
          <div className="w-24 h-24 mb-2 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/lumis-wayfing.png"
              alt="Lumi"
              className="w-full h-full object-contain animate-bounce-slow"
            />
          </div>
          <p className="text-sm md:text-base font-semibold text-muted-foreground max-w-sm">
            {slide.text}
          </p>
        </div>
      )}

      {/* ── Subtitle / Question Description if applicable ── */}
      {slide.hasQuiz && slide.question && (
        <p className="text-xs md:text-sm font-bold text-muted-foreground px-1">
          {slide.question}
        </p>
      )}

      {/* ── Quiz Options List ── */}
      {slide.hasQuiz && slide.options && (
        <div className="flex flex-col gap-3">
          {slide.options.map((opt, idx) => {
            const isSelected = selectedQuizOption === idx;
            const isChecked = quizAnswerChecked;
            const isCorrect = opt.isCorrect;

            let cardBorder = "border-border bg-card hover:border-muted-foreground/50";
            let radioStyle = "border-muted-foreground/60";
            let titleColor = "text-foreground";

            if (isSelected && !isChecked) {
              cardBorder = "border-primary bg-secondary ring-1 ring-primary/30";
              radioStyle = "border-primary";
              titleColor = "text-primary";
            } else if (isSelected && isChecked) {
              if (isCorrect) {
                cardBorder = "border-primary bg-secondary ring-1 ring-primary/40";
                radioStyle = "border-primary";
                titleColor = "text-primary";
              } else {
                cardBorder =
                  "border-rose-500 bg-rose-50/80 dark:bg-[#260c11] dark:border-rose-500 ring-1 ring-rose-500/40";
                radioStyle = "border-rose-500 dark:border-rose-400";
                titleColor = "text-rose-600 dark:text-rose-400";
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isChecked}
                onClick={() => {
                  triggerSound("tap");
                  setSelectedQuizOption(idx);
                }}
                className={`w-full flex items-center justify-between p-4 md:p-4.5 rounded-2xl border transition-all duration-200 text-left shadow-xs cursor-pointer active:scale-99 ${cardBorder}`}
              >
                <div className="flex items-center gap-3.5 min-w-0 grow">
                  {getOptionBadge(idx, opt)}
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className={`font-bold text-base md:text-[17px] leading-tight ${titleColor}`}>
                      {opt.text}
                    </span>
                    {opt.explanation && !isChecked && (
                      <span className="text-xs text-muted-foreground font-medium mt-0.5 line-clamp-1">
                        {opt.explanation}
                      </span>
                    )}
                  </div>
                </div>

                {/* Radio Indicator */}
                <div className="shrink-0 pl-2">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${radioStyle}`}
                  >
                    {isSelected && (
                      <div
                        className={`w-3 h-3 rounded-full transition-transform scale-100 ${
                          isChecked && !isCorrect ? "bg-rose-500 dark:bg-rose-400" : "bg-primary"
                        }`}
                      />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
