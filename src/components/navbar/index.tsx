import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-bold">Lingo</div>
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/signup">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}
