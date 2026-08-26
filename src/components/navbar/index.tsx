import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-slate-200 dark:border-[#1e293b] bg-white dark:bg-[#111722] transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-black text-xl text-emerald-600 dark:text-emerald-400">
          Lingo
        </Link>
        <div className="flex items-center gap-4 text-sm font-extrabold text-slate-700 dark:text-slate-200">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <Link href="/courses" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Courses
          </Link>
          <Link href="/auth" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Sign up
          </Link>
          <ThemeToggle className="w-9 h-9 rounded-xl" />
        </div>
      </div>
    </nav>
  );
}
