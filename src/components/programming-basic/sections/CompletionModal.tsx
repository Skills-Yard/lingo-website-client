import React, { useMemo } from 'react';

interface CompletionModalProps {
  success: boolean;
  currentLevelIdx: number;
  hearts: number;
  stars: number;
  failureMsg: string;
  setStars: React.Dispatch<React.SetStateAction<number>>;
  setHearts: React.Dispatch<React.SetStateAction<number>>;
  resetLevel: (keepCommands: boolean) => void;
  setView: (view: 'map' | 'lesson1_theory' | 'game') => void;
  handleLevelSuccessContinue: () => void;
  triggerSound: (type: 'tap' | 'step' | 'pickup' | 'win' | 'lose' | 'hint') => void;
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
    const colors = ['#FFC107', '#FF5722', '#E91E63', '#9C27B0', '#3F51B5', '#00BCD4', '#4CAF50', '#8BC34A'];
    return Array.from({ length: 80 }, () => {
      // Angle between 35 and 145 degrees (bursting upwards)
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
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in select-none">
        <div className="w-full max-w-[420px] bg-white rounded-lg p-8 shadow-2xl flex flex-col items-center text-center relative border border-slate-100 animate-scale-in">
          {/* Confetti styles */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes confettiBurst {
              0% {
                transform: translate(-50%, 0) scale(0.1) rotate(0deg);
                opacity: 0;
              }
              5% {
                opacity: 1;
              }
              80% {
                opacity: 1;
              }
              100% {
                transform: translate(calc(-50% + var(--tx)), var(--ty)) scale(0.5) rotate(var(--rot));
                opacity: 0;
              }
            }
          ` }} />

          {/* Confetti particles */}
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute pointer-events-none select-none rounded-[2px]"
              style={{
                bottom: '40%',
                left: '50%',
                width: p.size,
                height: p.sizeH,
                backgroundColor: p.color,
                zIndex: 10,
                transformOrigin: 'center',
                animationName: 'confettiBurst',
                animationDuration: p.duration,
                animationDelay: p.delay,
                animationTimingFunction: 'cubic-bezier(0.1, 0.8, 0.25, 1)',
                animationFillMode: 'forwards',
                ...({
                  '--tx': p.tx,
                  '--ty': p.ty,
                  '--rot': p.rot,
                } as React.CSSProperties),
              }}
            />
          ))}

          <h3 className="text-[28px] font-black text-slate-800 leading-tight">Awesome!</h3>
          <p className="text-[17px] font-bold text-[#7c3aed] mt-1.5 flex items-center gap-1 justify-center">
            You did it! 🎉
          </p>

          {/* Mascot */}
          <div className="my-7 w-36 h-36 flex items-center justify-center shrink-0 select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/lumis-wayfing.png"
              alt="Mascot"
              className="w-full h-full object-contain drop-shadow-md animate-bounce-slow"
            />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 w-full mb-8">
            {/* XP */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl py-3 flex flex-col items-center justify-center shadow-xs">
              <span className="text-2xl mb-1 select-none">⭐</span>
              <span className="text-base font-black text-slate-700">+25</span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider mt-0.5">XP</span>
            </div>

            {/* Coins */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl py-3 flex flex-col items-center justify-center shadow-xs">
              <span className="text-2xl mb-1 select-none">🪙</span>
              <span className="text-base font-black text-slate-700">+10</span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider mt-0.5">Coins</span>
            </div>

            {/* Streak */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl py-3 flex flex-col items-center justify-center shadow-xs">
              <span className="text-2xl mb-1 select-none">🔥</span>
              <span className="text-base font-black text-slate-700">+1</span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider mt-0.5">Streak</span>
            </div>
          </div>

          {/* Next Lesson Button */}
          <button
            onClick={handleLevelSuccessContinue}
            className="w-full py-4 bg-[#7c3aed] border-b-4 border-[#5b21b6] hover:bg-[#6d28d9] text-white font-black rounded-2xl shadow-lg text-[16px] cursor-pointer transition-all active:translate-y-0.5"
          >
            {currentLevelIdx === 0 ? 'Start Lesson 1' : 'Next Lesson'}
          </button>

          {/* Back to Map button */}
          <button
            onClick={() => {
              triggerSound('tap');
              setView('map');
            }}
            className="mt-4 text-[14px] font-black text-[#7c3aed] hover:underline cursor-pointer bg-transparent border-0"
          >
            Back to Map
          </button>
        </div>
      </div>
    );
  }

  // Fallback bottom drawer overlay for level failure (retry and restart flows)
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50 p-4 animate-slide-up select-none">
      <div
        className={`w-full max-w-[420px] rounded-lg p-5 shadow-2xl border border-b-8 bg-[#ffdfe0] border-[#ff4b4b]`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border-b-4 bg-white/50 border-[#ff4b4b]/30`}
          >
            💔
          </div>
          <div>
            <h3 className="text-base font-black text-slate-800">
              {hearts <= 0 ? 'Out of Hearts!' : 'Try Again!'}
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {hearts <= 0
                ? 'Refill hearts using stars to continue.'
                : failureMsg || "Lumi didn't reach the flag."}
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
                    triggerSound('tap');
                    setStars(p => p - 50);
                    setHearts(50);
                    resetLevel(true);
                  }
                }}
                className={`w-1/2 py-3 rounded-2xl font-extrabold text-white text-sm border-b-4 transition-all active:translate-y-0.5 ${stars >= 50
                  ? 'bg-amber-500 border-amber-700 cursor-pointer hover:bg-amber-400'
                  : 'bg-slate-300 border-slate-400 cursor-not-allowed'
                  }`}
              >
                Refill (50 ⭐)
              </button>
              <button
                onClick={() => {
                  triggerSound('tap');
                  setView('map');
                }}
                className="w-1/2 py-3 rounded-2xl font-extrabold text-slate-700 text-sm border-b-4 border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-all active:translate-y-0.5"
              >
                Return to Map
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  triggerSound('tap');
                  resetLevel(true);
                }}
                className="w-1/2 py-3 rounded-2xl font-extrabold text-slate-700 text-sm border-2 border-b-4 border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-all active:translate-y-0.5"
              >
                Retry
              </button>
              <button
                onClick={() => {
                  triggerSound('tap');
                  resetLevel(false);
                }}
                className="w-1/2 py-3 bg-[#ff4b4b] border-b-4 border-[#cc2b2b] text-white font-extrabold rounded-2xl text-sm cursor-pointer transition-all active:translate-y-0.5"
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
