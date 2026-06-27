"use client";

import { useEffect, useMemo, useState } from "react";

import { courseSubjects } from "../data/course-catalog";
import { AllSubjectsOverview } from "./all-subjects-overview";
import { CourseSection } from "./course-section";
import { SubjectRail } from "./subject-rail";
import Footer from "@/components/footer";

export function CoursesPage() {
  const sectionIds = useMemo(
    () => ["all-subjects", ...courseSubjects.map((subject) => subject.id)],
    [],
  );
  const [activeSubjectId, setActiveSubjectId] = useState(sectionIds[0]);

  useEffect(() => {
    let frameId = 0;

    function updateActiveSection() {
      const activationLine = window.innerHeight * 0.34;
      const currentSection = sectionIds.reduce((current, sectionId) => {
        const element = document.getElementById(sectionId);

        if (!element) {
          return current;
        }

        if (element.getBoundingClientRect().top <= activationLine) {
          return sectionId;
        }

        return current;
      }, sectionIds[0]);

      setActiveSubjectId(currentSection);
    }

    function handleScroll() {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        updateActiveSection();
        frameId = 0;
      });
    }

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionIds]);

  useEffect(() => {
    const activeButton = document.querySelector<HTMLElement>(
      `[data-subject-id="${activeSubjectId}"]`,
    );

    activeButton?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeSubjectId]);

  function handleSubjectClick(subjectId: string) {
    setActiveSubjectId(subjectId);
    document.getElementById(subjectId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="min-h-screen p-2 bg-[color:var(--background)] pb-32 text-[color:var(--foreground)]">
      <SubjectRail
        subjects={courseSubjects}
        activeSubjectId={activeSubjectId}
        onSubjectClick={handleSubjectClick}
      />
      <AllSubjectsOverview subjects={courseSubjects} />
      {courseSubjects.map((subject) => (
        <CourseSection key={subject.id} subject={subject} />
      ))}

        <Footer />
    </main>
  );
}
