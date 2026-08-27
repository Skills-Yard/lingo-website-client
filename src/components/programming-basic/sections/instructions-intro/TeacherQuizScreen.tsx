import type { TeacherQuizSlide } from "@/lib/constants/instructionsIntro";
import { TeacherIllustration } from "./TeacherIllustration";

interface TeacherQuizScreenProps {
  slide: TeacherQuizSlide;
  selected: number | null;
  checked: boolean;
  onSelect: (idx: number) => void;
}

/** "What teacher is doing?" — the compact illustration plus the option cards (idle -> selected -> checked). */
export function TeacherQuizScreen({
  slide,
  selected,
  checked,
  onSelect,
}: TeacherQuizScreenProps) {
  return (
    <>
      <h1 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight text-center md:text-left">
        <span className="text-primary">{slide.highlightWord}</span>{" "}
        <span className="text-foreground">{slide.title}</span>
      </h1>

      <TeacherIllustration
        className="h-36 md:h-68.75"
        fit="cover"
        imageLight="/images/answerImgWhite.png"
        imageDark="/images/answerImgBlack.png"
      />

      <div className="flex flex-col gap-2">
        {slide.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const Icon = opt.icon;

          let cardBorder = "border-border bg-card hover:border-muted-foreground/50";
          let radioStyle = "border-muted-foreground/60";
          let iconWrap =
            idx === 0
              ? "bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-300"
              : "bg-secondary text-primary";

          if (isSelected && !checked) {
            cardBorder = "border-primary bg-secondary ring-1 ring-primary/30";
            radioStyle = "border-primary";
            iconWrap = "bg-primary/15 text-primary";
          } else if (isSelected && checked) {
            if (opt.isCorrect) {
              cardBorder = "border-primary bg-secondary ring-1 ring-primary/40";
              radioStyle = "border-primary";
              iconWrap = "bg-primary/15 text-primary";
            } else {
              cardBorder = "border-rose-500 bg-rose-50/80 dark:bg-[#260c11] ring-1 ring-rose-500/40";
              radioStyle = "border-rose-500";
              iconWrap = "bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400";
            }
          }

          return (
            <button
              key={opt.text}
              type="button"
              disabled={checked}
              onClick={() => onSelect(idx)}
              className={`w-full flex items-center justify-between p-3 rounded-[12px] border transition-all duration-200 text-left shadow-xs cursor-pointer active:scale-99 ${cardBorder}`}
            >
              <div className="flex items-center gap-3 min-w-0 grow">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${iconWrap}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="font-medium text-sm leading-tight text-foreground">
                    {opt.text}
                  </span>
                  {!(checked && isSelected) && (
                    <span className="text-xs text-muted-foreground font-normal mt-0.5 line-clamp-1">
                      {opt.subtitle}
                    </span>
                  )}
                </div>
              </div>
              <div className="shrink-0 pl-2">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${radioStyle}`}
                >
                  {isSelected && (
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        checked && !opt.isCorrect ? "bg-rose-500" : "bg-primary"
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
  );
}
