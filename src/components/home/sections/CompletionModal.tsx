import React from 'react';

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
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50 p-4 animate-slide-up select-none">
      <div
        className={`w-full max-w-md rounded-3xl p-5 shadow-2xl border border-b-8 ${success ? 'bg-[#d7f5c5] border-[#58cc02]' : 'bg-[#ffdfe0] border-[#ff4b4b]'
          }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border-b-4 ${success ? 'bg-white/50 border-[#58cc02]/30' : 'bg-white/50 border-[#ff4b4b]/30'
              }`}
          >
            {success ? '🎉' : '💔'}
          </div>
          <div>
            <h3 className="text-base font-black text-slate-800">
              {success ? (currentLevelIdx === 0 ? 'Practice Cleared! 🎯' : 'Awesome Job! 🎉') : hearts <= 0 ? 'Out of Hearts!' : 'Try Again!'}
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {success
                ? currentLevelIdx === 0
                  ? 'Practice done! Now the real test begins.'
                  : 'Lumi reached the flag successfully!'
                : hearts <= 0
                  ? 'Refill hearts using stars to continue.'
                  : failureMsg || "Lumi didn't reach the flag."}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          {success ? (
            <button
              onClick={handleLevelSuccessContinue}
              className="w-full py-3 bg-[#58cc02] border-b-4 border-[#3ea800] hover:bg-[#65e002] text-white font-extrabold rounded-2xl shadow-md text-sm cursor-pointer transition-all active:translate-y-0.5"
            >
              {currentLevelIdx === 0 ? 'Start Lesson 1 ➔' : 'Finish Level ➔'}
            </button>
          ) : hearts <= 0 ? (
            <>
              <button
                disabled={stars < 50}
                onClick={() => {
                  if (stars >= 50) {
                    triggerSound('tap');
                    setStars(p => p - 50);
                    setHearts(5);
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
