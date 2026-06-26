import { Card, CardContent } from "@/components/ui/card";
import type { CourseItem, SubjectTheme } from "../types";
import { CourseArtwork } from "./course-artwork";

type CourseCardProps = {
  course: CourseItem;
  theme: SubjectTheme;
};

export function CourseCard({ course, theme }: CourseCardProps) {
  return (
    <Card className="relative z-10 border-[3px] border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm">
      <CardContent className="flex min-h-16 items-center gap-4 p-2 sm:min-h-34 sm:gap-8 sm:p-7">
        <CourseArtwork name={course.illustration} accent={theme.accent} />
        <h3 className="pr-14 text-lg font-black leading-tight text-[color:var(--foreground)] sm:text-xl">
          {course.title}
        </h3>
        {course.isNew ? (
          <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-black uppercase text-white sm:right-5 sm:text-base">
            New
          </span>
        ) : null}
      </CardContent>
    </Card>
  );
}
