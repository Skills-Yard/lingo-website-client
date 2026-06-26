import type { CourseSubject } from "../types";
import { SubjectIcon } from "./course-artwork";

type AllSubjectsOverviewProps = {
  subjects: CourseSubject[];
};

export function AllSubjectsOverview({ subjects }: AllSubjectsOverviewProps) {
  return (
    <section
      id="all-subjects"
      className="scroll-mt-36 px-4 py-10 sm:px-6 lg:py-14"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-normal text-[color:var(--foreground)] sm:text-4xl">
            Courses
          </h1>
          <p className="max-w-2xl text-base font-medium leading-7 text-[color:var(--muted)] sm:text-lg">
            Choose a subject and jump straight into focused lessons.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <a
              key={subject.id}
              href={`#${subject.id}`}
              className="group rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-5 transition hover:-translate-y-0.5 hover:border-[color:var(--border)] hover:bg-[color:var(--surface-strong)]"
            >
              <div className="flex items-start gap-4">
                <SubjectIcon
                  name={subject.icon}
                  accent={subject.theme.accent}
                  className="size-16"
                />
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-black text-[color:var(--foreground)] sm:text-xl">
                    {subject.title}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm font-medium leading-6 text-[color:var(--muted)]">
                    {subject.subtitle}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
