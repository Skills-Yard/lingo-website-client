"use client";

import { BookOpenCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CourseSubject } from "@/utils/types/type";
import { SubjectIcon } from "./course-artwork";

type SubjectRailProps = {
  subjects: CourseSubject[];
  activeSubjectId: string;
  onSubjectClick: (subjectId: string) => void;
};

export function SubjectRail({
  subjects,
  activeSubjectId,
  onSubjectClick,
}: SubjectRailProps) {
  return (
    <div className="sticky top-0 z-30 border-b border-[color:var(--border)] bg-[color:var(--background)]/95 backdrop-blur">
      <div className="mx-auto max-w-6xl overflow-x-auto touch-pan-x px-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-4 py-4">
          <SubjectButton
            subjectId="all-subjects"
            isActive={activeSubjectId === "all-subjects"}
            accent="var(--foreground)"
            label="All"
            onClick={() => onSubjectClick("all-subjects")}
          >
            <span className="flex size-12 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]">
              <BookOpenCheck className="size-8 text-[color:var(--foreground)]" />
            </span>
          </SubjectButton>

          {subjects.map((subject) => (
            <SubjectButton
              key={subject.id}
              subjectId={subject.id}
              isActive={activeSubjectId === subject.id}
              accent={subject.theme.accent}
              label={subject.shortName}
              onClick={() => {
                onSubjectClick(subject.id);
              }}
            >
              <SubjectIcon name={subject.icon} accent={subject.theme.accent} />
            </SubjectButton>
          ))}
        </div>
      </div>
    </div>
  );
}

type SubjectButtonProps = {
  children: React.ReactNode;
  subjectId: string;
  label: string;
  accent: string;
  isActive: boolean;
  onClick: () => void;
};

function SubjectButton({
  children,
  subjectId,
  label,
  accent,
  isActive,
  onClick,
}: SubjectButtonProps) {
  return (
    <div className="relative flex flex-col items-center gap-2">
      <Button
        type="button"
        data-subject-id={subjectId}
        variant="subject"
        size="subject"
        aria-pressed={isActive}
        onClick={onClick}
        className={cn(
          "h-16 w-24 rounded-2xl border-2 font-bold pointer-events-auto",
          isActive && "bg-[color:var(--surface-strong)] text-[color:var(--foreground)]",
        )}
        style={{
          borderColor: isActive ? accent : undefined,
          boxShadow: isActive ? `0 0 0 1px ${accent}33` : undefined,
          touchAction: "manipulation",
        }}
      >
        {children}
      </Button>
      <span className="max-w-32 truncate text-sm text-[color:var(--foreground)] sm:text-base">
        {label}
      </span>
      <span
        aria-hidden
        className={cn(
          "mt-0 h-1.5 w-16 rounded-full opacity-0 transition-opacity",
          isActive && "opacity-100",
        )}
        style={{ backgroundColor: accent }}
      />
    </div>
  );
}
