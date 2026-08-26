import React, { useMemo } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

interface CompletionModalProps {
  success: boolean;
  currentLevelIdx: number;
  hearts: number;
  stars: number;
  failureMsg: string;
  setStars: React.Dispatch<React.SetStateAction<number>>;
  setHearts: React.Dispatch<React.SetStateAction<number>>;
  resetLevel: (keepCommands: boolean) => void;
  setView: (view: "map" | "lesson1_theory" | "game") => void;
  handleLevelSuccessContinue: () => void;
  triggerSound: (type: "tap" | "step" | "pickup" | "win" | "lose" | "hint") => void;
}

export function CompletionModal({
  success,
  currentLevelIdx,
  hearts,
  stars,
  failureMsg,
  setStars,
  setHearts,
  resetLevel,
  setView,
  handleLevelSuccessContinue,
  triggerSound,
}: CompletionModalProps) {
  // Generate stable confetti particles on mount
  const particles = useMemo(() => {
    const colors = ["#10b981", "#059669", "#f59e0b", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6"];
    return Array.from({ length: 70 }, () => {
      const angle = (Math.random() * 110 + 35) * (Math.PI / 180);
      const force = Math.random() * 260 + 130;
      const tx = Math.cos(angle) * force;
      const ty = -Math.sin(angle) * force;
      const rot = Math.random() * 720 - 360;
      const size = Math.random() * 8 + 6;
      const sizeH = size * (Math.random() * 0.8 + 0.8);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const delay = Math.random() * 0.15;
      const duration = Math.random() * 0.8 + 1.2;
      return {
        tx: `${tx.toFixed(1)}px`,
        ty: `${ty.toFixed(1)}px`,
        rot: `${rot.toFixed(1)}deg`,
        size: `${size.toFixed(1)}px`,
        sizeH: `${sizeH.toFixed(1)}px`,
        color,
        delay: `${delay.toFixed(2)}s`,
        duration: `${duration.toFixed(2)}s`,
      };
    });
  }, []);

  if (success) {
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in select-none">
        <div className="w-full max-w-[400px] bg-white dark:bg-[#111722] rounded-3xl p-7 shadow-2xl flex flex-col items-center text-center relative border border-slate-200 dark:border-[#1e293b] animate-pop-in">
          {/* Confetti styles */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes confettiBurst {
              0% { transform: translate(-50%, 0) scale(0.1) rotate(0deg); opacity: 0; }
              5% { opacity: 1; }
              80% { opacity: 1; }
              100% { transform: translate(calc(-50% + var(--tx)), var(--ty)) scale(0.5) rotate(var(--rot)); opacity: 0; }
            }
          ` }} />

          {/* Confetti particles */}
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute pointer-events-none select-none rounded-[2px]"
              style={{
                bottom: "40%",
                left: "50%",
                width: p.size,
                height: p.sizeH,
                backgroundColor: p.color,
                zIndex: 10,
                transformOrigin: "center",
                animationName: "confettiBurst",
                animationDuration: p.duration,
                animationDelay: p.delay,
                animationTimingFunction: "cubic-bezier(0.1, 0.8, 0.25, 1)",
                animationFillMode: "forwards",
                ...({
                  "--tx": p.tx,
                  "--ty": p.ty,
                  "--rot": p.rot,
                } as React.CSSProperties),
              }}
            />
          ))}

          <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">
            Awesome!
          </h3>
          <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 justify-center">
            You completed the challenge! 🎉
          </p>

          {/* Mascot */}
          <div className="my-6 w-32 h-32 flex items-center justify-center shrink-0 select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/lumis-wayfing.png"
              alt="Mascot"
              className="w-full h-full object-contain drop-shadow-md animate-bounce-slow"
            />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2.5 w-full mb-6">
            <div className="bg-slate-50 dark:bg-[#182232] border border-slate-200 dark:border-[#22365a] rounded-2xl py-3 flex flex-col items-center justify-center shadow-xs">
              <span className="text-xl mb-1 select-none">⭐</span>
              <span className="text-base font-black text-slate-800 dark:text-white">+25</span>
              <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">XP</span>
            </div>

            <div className="bg-slate-50 dark:bg-[#182232] border border-slate-200 dark:border-[#22365a] rounded-2xl py-3 flex flex-col items-center justify-center shadow-xs">
              <span className="text-xl mb-1 select-none">🪙</span>
              <span className="text-base font-black text-slate-800 dark:text-white">+10</span>
              <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Coins</span>
            </div>

            <div className="bg-slate-50 dark:bg-[#182232] border border-slate-200 dark:border-[#22365a] rounded-2xl py-3 flex flex-col items-center justify-center shadow-xs">
              <span className="text-xl mb-1 select-none">🔥</span>
              <span className="text-base font-black text-slate-800 dark:text-white">+1</span>
              <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Streak</span>
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="button"
            onClick={handleLevelSuccessContinue}
            className="w-full h-13 bg-[#059669] hover:bg-[#047857] dark:bg-[#10b981] dark:hover:bg-[#059669] text-white font-black rounded-2xl shadow-lg text-base flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
          >
            <span>{currentLevelIdx === 0 ? "Start Lesson 1" : "Next Challenge"}</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => {
              triggerSound("tap");
              setView("map");
            }}
            className="mt-3 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer bg-transparent border-0"
          >
            Back to Map
          </button>
        </div>
      </div>
    );
  }

  // Fallback bottom drawer overlay for failure
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50 p-4 animate-slide-up select-none">
      <div className="w-full max-w-[420px] rounded-3xl p-5 shadow-2xl border bg-rose-50 dark:bg-[#1f090d] border-rose-200 dark:border-[#881337] flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-rose-100 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 shrink-0">
            💔
          </div>
          <div>
            <h3 className="text-base font-black text-rose-900 dark:text-rose-200">
              {hearts <= 0 ? "Out of Hearts!" : "Try Again!"}
            </h3>
            <p className="text-xs text-rose-700/80 dark:text-rose-300/80 mt-0.5">
              {hearts <= 0
                ? "Refill hearts using stars to continue."
                : failureMsg || "Lumi didn't reach the goal."}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {hearts <= 0 ? (
            <>
              <button
                disabled={stars < 50}
                onClick={() => {
                  if (stars >= 50) {
                    triggerSound("tap");
                    setStars((p) => p - 50);
                    setHearts(50);
                    resetLevel(true);
                  }
                }}
                className={`w-1/2 py-3 rounded-2xl font-extrabold text-white text-sm transition-all ${
                  stars >= 50
                    ? "bg-amber-500 hover:bg-amber-600 cursor-pointer shadow-md"
                    : "bg-slate-300 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
                }`}
              >
                Refill (50 ⭐)
              </button>
              <button
                onClick={() => {
                  triggerSound("tap");
                  setView("map");
                }}
                className="w-1/2 py-3 rounded-2xl font-extrabold text-slate-700 dark:text-slate-200 text-sm border border-slate-200 dark:border-[#1e293b] bg-white dark:bg-[#111722] hover:bg-slate-50 cursor-pointer transition-all"
              >
                Return to Map
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  triggerSound("tap");
                  resetLevel(true);
                }}
                className="w-1/2 py-3 rounded-2xl font-extrabold text-slate-700 dark:text-slate-200 text-sm border border-slate-200 dark:border-[#1e293b] bg-white dark:bg-[#111722] hover:bg-slate-50 cursor-pointer transition-all"
              >
                Retry
              </button>
              <button
                onClick={() => {
                  triggerSound("tap");
                  resetLevel(false);
                }}
                className="w-1/2 py-3 bg-[#dc2626] hover:bg-[#b91c1c] dark:bg-[#ef4444] text-white font-extrabold rounded-2xl text-sm cursor-pointer transition-all shadow-md"
              >
                Clear & Restart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
