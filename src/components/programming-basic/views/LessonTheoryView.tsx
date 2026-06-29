import React, { useState } from 'react';
import { THEORY_SLIDES } from '../../../lib/constants/theorySlides';
import { TheorySlide } from '../sections/TheorySlide';
import { OutOfHeartsModal } from '../sections/OutOfHeartsModal';
import { ConfirmDialog } from '../../ui/confirm-dialog';

interface LessonTheoryViewProps {
  hearts: number;
  setHearts: React.Dispatch<React.SetStateAction<number>>;
  stars: number;
  setStars: React.Dispatch<React.SetStateAction<number>>;
  setLevelStates: React.Dispatch<React.SetStateAction<Record<string, 'locked' | 'unlocked' | 'completed' | 'demo_completed'>>>;
  setView: (view: 'map' | 'lesson1_theory' | 'game') => void;
  triggerFlyingStars: (nodeId: number, count: number) => void;
  triggerSound: (type: 'tap' | 'step' | 'pickup' | 'win' | 'lose' | 'hint') => void;
}

export function LessonTheoryView({
  hearts,
  setHearts,
  stars,
  setStars,
  setLevelStates,
  setView,
  triggerFlyingStars,
  triggerSound,
}: LessonTheoryViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizAnswerChecked, setQuizAnswerChecked] = useState(false);
  const [showOutOfHeartsModal, setShowOutOfHeartsModal] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const slide = THEORY_SLIDES[currentSlide];
  const progress = ((currentSlide + 1) / THEORY_SLIDES.length) * 100;
  const total = THEORY_SLIDES.length;

  return (
    <main className="min-h-screen max-w-lg mx-auto bg-white font-sans flex flex-col" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* ── Top bar: back arrow | progress | hearts ── */}
      <header className="flex items-center justify-between px-5 pt-5 pb-3">
        <button
          onClick={() => {
            triggerSound('tap');
            setShowExitConfirm(true);
          }}
          className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-xl transition-all active:scale-95 cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        <div className="flex items-center gap-2 grow mx-3">
          <div className="grow h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #58cc02, #89e219)' }}
            />
          </div>
          <span className="text-[11px] font-black text-slate-400 tabular-nums whitespace-nowrap">
            {currentSlide + 1}/{total}
          </span>
        </div>

        <div className="flex items-center gap-1 bg-rose-50 border border-rose-100 rounded-xl px-3 py-1.5">
          <span className="text-sm">❤️</span>
          <span className="text-sm font-black text-rose-500">{hearts}</span>
        </div>
      </header>

      {/* ── Slide body ── */}
      <div className="grow flex flex-col px-5 pt-4 pb-6 overflow-y-auto">
        <TheorySlide
          slide={slide}
          selectedQuizOption={selectedQuizOption}
          setSelectedQuizOption={setSelectedQuizOption}
          quizAnswerChecked={quizAnswerChecked}
          triggerSound={triggerSound}
        />
      </div>

      {/* ── Bottom button ── */}
      <div className="px-5 pb-8 pt-3 bg-white border-t border-slate-50">
        {slide.hasQuiz && !quizAnswerChecked ? (
          <button
            disabled={selectedQuizOption === null}
            onClick={() => {
              if (selectedQuizOption === null) return;
              setQuizAnswerChecked(true);
              const correct = slide.options![selectedQuizOption].isCorrect;
              if (correct) triggerSound('win');
              else {
                triggerSound('lose');
                setHearts(p => {
                  const nv = Math.max(0, p - 1);
                  if (nv === 0) setShowOutOfHeartsModal(true);
                  return nv;
                });
              }
            }}
            className={`w-full py-4 rounded-2xl font-black text-[15px] text-white border-b-4 transition-all active:translate-y-0.5 shadow-lg ${selectedQuizOption === null
                ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-[#7c3aed] border-[#5b21b6] hover:bg-[#6d28d9] cursor-pointer'
              }`}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={() => {
              triggerSound('tap');
              setSelectedQuizOption(null);
              setQuizAnswerChecked(false);
              if (slide.isEnd) {
                setLevelStates(prev => ({ ...prev, level1: 'completed', level2: 'unlocked' }));
                setStars(prev => prev + 25);
                setView('map');
                setTimeout(() => triggerFlyingStars(1, 3), 100);
              } else {
                setCurrentSlide(p => p + 1);
              }
            }}
            className="w-full py-4 rounded-2xl font-black text-[15px] text-white border-b-4 bg-[#7c3aed] border-[#5b21b6] hover:bg-[#6d28d9] shadow-lg active:translate-y-0.5 transition-all cursor-pointer"
          >
            Continue
          </button>
        )}
      </div>

      {/* Out of Hearts Modal */}
      {showOutOfHeartsModal && (
        <OutOfHeartsModal
          stars={stars}
          setStars={setStars}
          setHearts={setHearts}
          setShowOutOfHeartsModal={setShowOutOfHeartsModal}
          setSelectedQuizOption={setSelectedQuizOption}
          setQuizAnswerChecked={setQuizAnswerChecked}
          setView={setView}
          triggerSound={triggerSound}
        />
      )}

      {/* Exit Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showExitConfirm}
        onClose={() => setShowExitConfirm(false)}
        onConfirm={() => {
          setShowExitConfirm(false);
          setView('map');
        }}
        title="Exit lesson?"
        description="Your current progress in this lesson will be lost."
        confirmText="Exit"
        cancelText="Cancel"
        variant="danger"
      />
    </main>
  );
}
