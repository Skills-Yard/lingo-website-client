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
    href: "/coming-soon?tab=home",
    icon: Home,
  },
  {
    id: "courses",
    label: "Courses",
    href: "/courses",
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

function FooterNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab");
  const activeTab = pathname === "/courses" ? "courses" : currentTab || "courses";

  return (
    <nav
      aria-label="Primary"
      className="mx-auto grid h-16 max-w-3xl grid-cols-4 px-2 sm:h-20"
    >
      {footerItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex min-w-0 flex-col items-center justify-center gap-0.5 transition-all duration-150 active:scale-95 group select-none",
              isActive ? "text-primary font-black" : "text-muted-foreground hover:text-foreground font-bold"
            )}
          >
            <span
              className={cn(
                "flex h-9 w-12 sm:h-12 sm:w-16 items-center justify-center rounded-2xl transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                  : "bg-transparent text-muted-foreground group-hover:text-foreground group-hover:bg-muted/5"
              )}
            >
              <Icon className="size-5 sm:size-6" strokeWidth={isActive ? 2.4 : 1.8} />
            </span>
            <span className="text-[10px] sm:text-xs tracking-wider uppercase">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="fixed left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl bottom-5 rounded-3xl border-2 border-b-4 border-border bg-surface/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-40 pb-[env(safe-area-inset-bottom)] transition-all duration-200">
      <Suspense fallback={<div className="h-16 sm:h-20" />}>
        <FooterNav />
      </Suspense>
    </footer>
  );
}