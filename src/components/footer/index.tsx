"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CheckSquare, Home, KeyRound, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const footerItems = [
  {
    id: "home",
    label: "Home",
    href: "/coming-soon?tab=home", // Added query parameters
    icon: Home,
  },
  {
    id: "courses",
    label: "Courses",
    href: "/courses", // No parameter needed here
    icon: CheckSquare,
  },
  {
    id: "premium",
    label: "Premium",
    href: "/coming-soon?tab=premium",
    icon: KeyRound,
  },
  {
    id: "you",
    label: "You",
    href: "/coming-soon?tab=you",
    icon: UserRound,
  },
];

// Extracted the navigation logic into a sub-component so we can use useSearchParams safely
function FooterNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Read the active tab from the URL, fallback to courses if none is found
  const currentTab = searchParams.get("tab");
  const activeTab = pathname === "/courses" ? "courses" : currentTab || "courses";

  return (
    <nav
      aria-label="Primary"
      className="mx-auto grid h-24 max-w-3xl grid-cols-4 px-3 sm:h-28"
    >
      {footerItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex min-w-0 flex-col items-center justify-center gap-1 transition-colors hover:text-[color:var(--foreground)]",
              isActive ? "text-[color:var(--foreground)]" : "text-[color:var(--muted)]"
            )}
          >
            <span
              className={cn(
                "flex h-16 min-w-16 items-center justify-center rounded-xl transition-all duration-200",
                isActive && "bg-[color:var(--surface-strong)] text-[color:var(--foreground)]"
              )}
            >
              <Icon className="size-7" strokeWidth={1.4} />
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--border)] bg-[color:var(--surface)]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      {/* Next.js requires useSearchParams to be wrapped in a Suspense boundary */}
      <Suspense fallback={<div className="h-24 sm:h-28" />}>
        <FooterNav />
      </Suspense>
    </footer>
  );
}