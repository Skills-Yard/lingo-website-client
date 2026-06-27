import ThemeToggle from "@/components/theme-toggle";

export default function OnboardingRouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <ThemeToggle />
      {children}
    </div>
  );
}
