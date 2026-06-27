'use client';

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type ThemeMode = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const storedTheme = window.localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : systemPrefersDark
        ? "dark"
        : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="fixed bottom-24 left-4 z-[60] inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-sm font-medium text-[color:var(--foreground)] shadow-lg backdrop-blur transition hover:opacity-90 sm:bottom-6"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
