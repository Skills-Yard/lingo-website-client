import Link from "next/link";
import { CheckSquare, Home, KeyRound, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

const footerItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    isActive: false,
  },
  {
    label: "Courses",
    href: "/courses",
    icon: CheckSquare,
    isActive: true,
  },
  {
    label: "Premium",
    href: "/premium",
    icon: KeyRound,
    isActive: false,
  },
  {
    label: "You",
    href: "/profile",
    icon: UserRound,
    isActive: false,
  },
];

export default function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--border)] bg-[color:var(--surface)]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto grid h-24 max-w-3xl grid-cols-4 px-3 sm:h-28"
      >
        {footerItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex  min-w-0 flex-col items-center justify-center gap-1 text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
            >
              <span
                className={cn(
                  "flex h-16 min-w-16 items-center justify-center rounded-xl",
                  item.isActive && "bg-[color:var(--surface-strong)] text-[color:var(--foreground)]",
                )}
              >
                <Icon className="size-7" strokeWidth={1.4} />
              </span>
              {/* <span
                className={cn(
                  "max-w-full truncate text-[12px] font-semibold sm:text-lg",
                  item.isActive && "text-[color:var(--foreground)]",
                )}
              >
                {item.label}
              </span> */}
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
