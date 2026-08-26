import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-border bg-card transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-black text-xl text-primary">
          Lingo
        </Link>
        <div className="flex items-center gap-4 text-sm font-extrabold text-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/courses" className="hover:text-primary transition-colors">
            Courses
          </Link>
          <Link href="/auth" className="hover:text-primary transition-colors">
            Sign up
          </Link>
          <ThemeToggle className="w-9 h-9 rounded-xl" />
        </div>
      </div>
    </nav>
  );
}
