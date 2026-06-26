import type { Metadata } from "next";

import { CoursesPage } from "@/features/courses/components/courses-page";

export const metadata: Metadata = {
  title: "Courses | Lingo",
  description: "Explore programming, Python, data, science, logic, and math courses.",
};

export default function Page() {
  return <CoursesPage />;
}
