import React from 'react';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Slide {
  title: string;
  text: string;
  instruction?: string;
  hasQuiz?: boolean;
  showCommandsIllustration?: boolean;
  isEnd?: boolean;
  question?: string;
  options?: Option[];
}

interface TheorySlideProps {
  slide: Slide;
  selectedQuizOption: number | null;
  setSelectedQuizOption: (opt: number | null) => void;
  quizAnswerChecked: boolean;
  triggerSound: (type: 'tap' | 'step' | 'pickup' | 'win' | 'lose' | 'hint') => void;
}

export function TheorySlide({
  slide,
  selectedQuizOption,
  setSelectedQuizOption,
  quizAnswerChecked,
  triggerSound,
}: TheorySlideProps) {
  if (slide.showCommandsIllustration) {
    return (
      <>
        <div className="flex items-start gap-3 mb-6">
          <div className="grow">
            <h2 className="text-[26px] font-black text-slate-900 leading-tight mb-3">{slide.title}</h2>
            <p className="text-[14px] text-slate-600 leading-relaxed">{slide.text}</p>
          </div>
          <div className="shrink-0 w-27.5 h-32.5 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/bulb_mascot.png" alt="Mascot" className="w-full h-full object-contain drop-shadow-md" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { icon: '↑', label: 'Go Straight' },
            { icon: '←', label: 'Turn Left' },
            { icon: '✋', label: 'Pick Up' },
            { icon: '↓', label: 'Put Down' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 bg-white border-2 border-[#d7f5c5] rounded-2xl px-4 py-3 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-[#58cc02] flex items-center justify-center text-white font-black text-lg shadow-sm shrink-0">
                {item.icon}
              </div>
              <span className="text-[14px] font-bold text-slate-800">{item.label}</span>
            </div>
          ))}
        </div>

        <p className="text-[13px] font-semibold text-slate-500 text-center mt-5">
          {slide.instruction || "The computer follows your commands exactly!"}
        </p>
      </>
    );
  }

  if (slide.isEnd) {
    return (
      <div className="flex flex-col items-center text-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/bulb_mascot.png" alt="🎉" className="w-32 h-32 object-contain animate-bounce" />
        <h2 className="text-[26px] font-black text-slate-900 leading-tight">{slide.title}</h2>
        <p className="text-[14px] text-slate-600 leading-relaxed">{slide.text}</p>
        {slide.instruction && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-3 w-full">
            <p className="text-[12px] font-bold text-indigo-600">{slide.instruction}</p>
          </div>
        )}
      </div>
    );
  }

  if (slide.hasQuiz && slide.options) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-[22px] font-black text-slate-900 leading-tight">{slide.title}</h2>
        <p className="text-[14px] text-slate-600">{slide.text}</p>
        {slide.question && (
          <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest mt-1">{slide.question}</p>
        )}
        <div className="flex flex-col gap-3">
          {slide.options.map((opt, idx) => {
            const isSel = selectedQuizOption === idx;
            const checked = quizAnswerChecked;
            let borderCls = 'border-slate-200 bg-white text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/30';
            let iconBg = 'bg-slate-100';
            let iconColor = 'text-slate-400';

            if (isSel && !checked) {
              borderCls = 'border-indigo-400 bg-indigo-50 text-indigo-800 ring-2 ring-indigo-100';
              iconBg = 'bg-indigo-500';
              iconColor = 'text-white';
            } else if (isSel && checked) {
              if (opt.isCorrect) {
                borderCls = 'border-[#58cc02] bg-[#d7f5c5] text-[#2d7a00]';
                iconBg = 'bg-[#58cc02]';
                iconColor = 'text-white';
              } else {
                borderCls = 'border-[#ff4b4b] bg-[#ffdfe0] text-[#cc2b2b]';
                iconBg = 'bg-[#ff4b4b]';
                iconColor = 'text-white';
              }
            }

            return (
              <button
                key={idx}
                disabled={checked}
                onClick={() => {
                  triggerSound('tap');
                  setSelectedQuizOption(idx);
                }}
                className={`flex items-start gap-3 w-full text-left p-4 border-2 border-b-4 rounded-2xl transition-all shadow-sm cursor-pointer ${borderCls}`}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-[11px] shrink-0 mt-0.5 ${iconBg} ${iconColor}`}>
                  {['A', 'B', 'C'][idx]}
                </span>
                <span className="text-[13px] font-semibold leading-snug grow">{opt.text}</span>
                {isSel && checked && <span className="shrink-0 text-lg mt-0.5">{opt.isCorrect ? '✓' : '✗'}</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[26px] font-black text-slate-900 leading-tight">{slide.title}</h2>
      <p className="text-[14px] text-slate-600 leading-relaxed">{slide.text}</p>
      {slide.instruction && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-3">
          <p className="text-[12px] font-bold text-indigo-600 text-center">{slide.instruction}</p>
        </div>
      )}
    </div>
  );
}
