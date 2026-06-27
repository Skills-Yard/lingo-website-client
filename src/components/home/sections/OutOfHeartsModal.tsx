import React from 'react';

interface OutOfHeartsModalProps {
  stars: number;
  setStars: React.Dispatch<React.SetStateAction<number>>;
  setHearts: React.Dispatch<React.SetStateAction<number>>;
  setShowOutOfHeartsModal: (show: boolean) => void;
  setSelectedQuizOption: (opt: number | null) => void;
  setQuizAnswerChecked: (checked: boolean) => void;
  setView: (view: 'map' | 'lesson1_theory' | 'game') => void;
  triggerSound: (type: 'tap' | 'step' | 'pickup' | 'win' | 'lose' | 'hint') => void;
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl">
        <span className="text-5xl block mb-3">💔</span>
        <h3 className="text-lg font-black text-slate-800 mb-2">Out of Hearts!</h3>
        <p className="text-sm text-slate-500 mb-6">Refill hearts using stars, or return to the map.</p>
        <div className="flex flex-col gap-2">
          <button
            disabled={stars < 50}
            onClick={() => {
              if (stars >= 50) {
                triggerSound('tap');
                setStars(p => p - 50);
                setHearts(5);
                setShowOutOfHeartsModal(false);
                setSelectedQuizOption(null);
                setQuizAnswerChecked(false);
              }
            }}
            className={`w-full py-3 rounded-2xl font-black text-sm border-b-4 ${stars >= 50
              ? 'bg-amber-500 border-amber-700 text-white cursor-pointer hover:bg-amber-400'
              : 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed'
              }`}
          >
            Refill Hearts (50 ⭐)
          </button>
          <button
            onClick={() => {
              triggerSound('tap');
              setShowOutOfHeartsModal(false);
              setView('map');
            }}
            className="w-full py-3 rounded-2xl font-black text-sm border-b-4 bg-white border-slate-200 text-slate-600 cursor-pointer hover:bg-slate-50"
          >
            Return to Map
          </button>
        </div>
      </div>
    </div>
  );
}
