"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { LumiLogo } from "@/components/icons/koji-logo";
import { Bell, ArrowLeft } from "lucide-react";
import Footer from "@/components/footer";

export default function ComingSoonPage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,var(--background)_0%,var(--surface)_100%)] text-[var(--foreground)] px-4">
      
      {/* Ambient Background Glows */}
      <div className="pointer-events-none absolute inset-x-0 top-[-10%] h-[30rem] bg-[radial-gradient(circle_at_top,_rgba(253,224,71,0.15),_transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-10%] top-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(125,211,252,0.15),_transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-10%] h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(196,181,253,0.15),_transparent_70%)] blur-3xl" />

      {/* Main Glass Card */}
      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <div className="flex flex-col items-center rounded-3xl border border-white/60 bg-white/50 p-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:p-10 dark:border-white/10 dark:bg-white/5">
          
          {/* Mascot Container */}
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[1.5rem] border border-white/40 bg-[color:var(--surface)]/80 shadow-[0_12px_30px_rgba(96,165,250,0.2)] backdrop-blur-md dark:border-white/10">
            <LumiLogo variant="coding" className="h-16 w-16" priority />
          </div>

          {/* Typography */}
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-balance">
            Something awesome is brewing.
          </h1>
          <p className="mb-8 text-[var(--muted)] text-base text-pretty leading-relaxed">
            We&apos;re putting the final touches on this experience. Lumi is coding as fast as possible to get it ready for you!
          </p>

          {/* Actions Stack */}
          <div className="flex w-full flex-col gap-3">
            <Button 
              className="h-12 w-full rounded-2xl border-0 bg-[linear-gradient(135deg,#facc15_0%,#60a5fa_55%,#818cf8_100%)] text-base font-bold text-slate-950 shadow-[0_12px_24px_rgba(96,165,250,0.25)] transition-all hover:brightness-105 hover:shadow-[0_16px_30px_rgba(96,165,250,0.35)]"
              onClick={() => {
                // TODO: Wire up to your notification/toast system
                console.log("Notify user when ready");
              }}
            >
              <Bell className="mr-2 h-5 w-5" />
              Notify Me
            </Button>
            
            <Button 
              variant="ghost" 
              className="h-12 w-full rounded-2xl text-[var(--muted)] transition-colors hover:bg-black/5 hover:text-[var(--foreground)] dark:hover:bg-white/5"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
          </div>
          
        </div>
      </div>
      <Footer/>
      
    </div>
  );
}