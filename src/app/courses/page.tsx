import { CoursesPage } from "@/components/courses/courses-page";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Courses | Lingo",
  description: "Explore programming, Python, data, science, logic, and math courses.",
};

export default function Page() {
  return <CoursesPage />;
}
