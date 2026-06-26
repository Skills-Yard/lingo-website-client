import type { CourseSubject } from "../types";
import { CourseArtwork } from "./course-artwork";
import { CourseCard } from "./course-card";

type CourseSectionProps = {
  subject: CourseSubject;
};

export function CourseSection({ subject }: CourseSectionProps) {
  return (
    <section
      id={subject.id}
      className="scroll-mt-36 border-t border-[color:var(--border)]"
      style={{
        background: `linear-gradient(180deg, ${subject.theme.panel}, rgba(255,255,255,0) 250px)`,
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-10 flex items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black tracking-normal text-[color:var(--foreground)] sm:text-4xl">
              {subject.title}
            </h2>
            <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-[color:var(--muted)] sm:text-xl">
              {subject.subtitle}
            </p>
          </div>
          <CourseArtwork
            name={subject.courses[0]?.illustration ?? subject.icon}
            accent={subject.theme.accent}
            size="lg"
            className="hidden sm:flex"
          />
        </div>

        <div className="relative mx-auto max-w-5xl space-y-9">
          <span
            aria-hidden
            className="absolute bottom-10 left-1/2 top-10 w-1 -translate-x-1/2 bg-[color:var(--border)]"
          />
          {subject.courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              theme={subject.theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
