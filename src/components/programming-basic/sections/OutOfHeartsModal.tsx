import React from "react";

interface OutOfHeartsModalProps {
  stars: number;
  setStars: React.Dispatch<React.SetStateAction<number>>;
  setHearts: React.Dispatch<React.SetStateAction<number>>;
  setShowOutOfHeartsModal: (show: boolean) => void;
  setSelectedQuizOption: (opt: number | null) => void;
  setQuizAnswerChecked: (checked: boolean) => void;
  setView: (view: "map" | "lesson1_theory" | "game") => void;
  triggerSound: (type: "tap" | "step" | "pickup" | "win" | "lose" | "hint") => void;
}

export function OutOfHeartsModal({
  stars,
  setStars,
  setHearts,
  setShowOutOfHeartsModal,
  setSelectedQuizOption,
  setQuizAnswerChecked,
  setView,
  triggerSound,
}: OutOfHeartsModalProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in select-none">
      <div className="w-full max-w-sm bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#1e293b] rounded-3xl p-6 text-center shadow-2xl animate-pop-in">
        <span className="text-5xl block mb-3">💔</span>
        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Out of Hearts!</h3>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">Refill hearts using stars, or return to the map.</p>
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            disabled={stars < 50}
            onClick={() => {
              if (stars >= 50) {
                triggerSound("tap");
                setStars((p) => p - 50);
                setHearts(50);
                setShowOutOfHeartsModal(false);
                setSelectedQuizOption(null);
                setQuizAnswerChecked(false);
              }
            }}
            className={`w-full py-3.5 rounded-2xl font-black text-sm transition-all active:scale-98 ${
              stars >= 50
                ? "bg-amber-500 hover:bg-amber-600 text-white cursor-pointer shadow-md"
                : "bg-slate-200 dark:bg-[#182232] text-slate-400 dark:text-slate-500 cursor-not-allowed"
            }`}
          >
            Refill Hearts (50 ⭐)
          </button>
          <button
            type="button"
            onClick={() => {
              triggerSound("tap");
              setShowOutOfHeartsModal(false);
              setView("map");
            }}
            className="w-full py-3.5 rounded-2xl font-black text-sm border border-slate-200 dark:border-[#1e293b] bg-white dark:bg-[#182232] text-slate-700 dark:text-slate-200 cursor-pointer hover:bg-slate-50 dark:hover:bg-[#1c293d] transition-all"
          >
            Return to Map
          </button>
        </div>
      </div>
    </div>
  );
}
