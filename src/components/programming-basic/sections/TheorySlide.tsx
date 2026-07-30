import { COMMAND_DETAILS } from '../../../lib/constants/commands';
import { TheorySlideType as Slide } from '../../../utils/types';

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
            <img src="/images/lumis-wayfing.png" alt="Mascot" className="w-full h-full object-contain drop-shadow-md" />
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
        <img src="/images/lumis-wayfing.png" alt="🎉" className="w-32 h-32 object-contain" />
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
    // Render the explanation/feedback layout if the answer has been checked/submitted
    if (quizAnswerChecked && selectedQuizOption !== null) {
      const selectedOption = slide.options[selectedQuizOption];
      const isCorrect = selectedOption?.isCorrect ?? false;
      const title = isCorrect 
        ? (slide.explanation?.correctTitle ?? "Great choice!") 
        : (slide.explanation?.incorrectTitle ?? "Not quite!");
      const text = selectedOption?.explanation ?? (isCorrect
        ? (slide.explanation?.correctText ?? "That is correct!")
        : (slide.explanation?.incorrectText ?? "That is incorrect!"));
      const remember = slide.explanation?.rememberText ?? "Every command has a specific action.";

      return (
        <div className="flex flex-col gap-4 animate-fade-in select-none">
          {/* Explanation Header & presenter mascot */}
          <div className="flex justify-between items-start gap-4">
            <div className="grow">
              <h2 className={`text-[26px] font-black leading-tight ${isCorrect ? 'text-[#58cc02]' : 'text-[#ff4b4b]'}`}>
                {title}
              </h2>
              <p className="text-[14px] text-slate-600 leading-relaxed mt-2">{text}</p>
            </div>
            <div className="shrink-0 w-24 h-24 relative select-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/lumis-wayfing.png"
                alt="Presenter Mascot"
                className="w-full h-full object-contain drop-shadow-md animate-bounce-slow"
                style={{ transform: 'scaleX(-1) rotate(-10deg)' }}
              />
            </div>
          </div>

          {/* Visual Illustration */}
          {slide.imageSrc && (
            <div className="relative w-full h-[180px] bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden mb-1 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.imageSrc}
                alt={slide.title}
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {!slide.imageSrc && slide.quizIllustration && slide.quizIllustration.type === 'command_demonstration' && (
            <div className="relative w-full h-40 bg-linear-to-b from-indigo-50/50 to-blue-50/20 rounded-2xl border border-slate-100 flex items-center justify-center overflow-visible mb-1 shadow-sm">
              <div className="relative w-[180px] h-[100px] mt-4">
                {/* Isometric Tiles */}
                <div 
                  className="absolute w-[80px] h-[45px] bg-[#89e219] border-b-[6px] border-[#58cc02] rounded-[10px]"
                  style={{
                    transform: 'rotateX(55deg) rotateZ(-45deg) translate(0px, 0px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  }}
                />
                <div 
                  className="absolute w-[80px] h-[45px] bg-[#a2ec3b] border-b-[6px] border-[#73db16] rounded-[10px]"
                  style={{
                    transform: 'rotateX(55deg) rotateZ(-45deg) translate(70px, -70px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  }}
                />

                {/* Lumi Character */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/lumis-wayfing.png"
                  alt="Lumi"
                  className="absolute w-14 h-14 object-contain z-10 bottom-[20px] left-[15px]"
                  style={{ filter: 'url(#chroma-white)' }}
                />

                {/* Floating Command Icon and dashed curve */}
                <div className="absolute -top-[15px] right-[20px] flex flex-col items-center z-20">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={COMMAND_DETAILS[slide.quizIllustration.commandType].imageSrc} 
                      alt={slide.quizIllustration.commandType} 
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                </div>

                {/* Star item for pickup */}
                {slide.quizIllustration.commandType === 'pickup' && (
                  <img 
                    src="/images/star.png" 
                    alt="Star" 
                    className="absolute w-8 h-8 object-contain z-10 top-[5px] right-[40px] animate-pulse"
                  />
                )}

                {/* SVG Dashed Curve */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
                  <path
                    d="M 45 45 Q 85 0 135 15"
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Lavender Remember Box */}
          <div className="bg-[#f5f3ff] border border-[#e9e3ff] rounded-2xl p-4 flex gap-3 items-start mt-2 shadow-xs">
            <span className="text-lg">💡</span>
            <div className="flex flex-col">
              <span className="text-[11px] font-black text-[#7c3aed] uppercase tracking-wider">Remember</span>
              <span className="text-[13px] font-bold text-slate-700 leading-normal mt-0.5">{remember}</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4 select-none">
        <h2 className="text-[22px] font-black text-slate-900 leading-tight">{slide.title}</h2>
        <p className="text-[14px] text-slate-600">{slide.text}</p>
        {slide.question && (
          <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest mt-1">{slide.question}</p>
        )}

        {/* Render generated image asset if provided */}
        {slide.imageSrc && (
          <div className="relative w-full h-[180px] bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden mb-2 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.imageSrc}
              alt={slide.title}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Custom Visual Illustration for command quizzes */}
        {!slide.imageSrc && slide.quizIllustration && slide.quizIllustration.type === 'command_demonstration' && (
          <div className="relative w-full h-40 bg-linear-to-b from-indigo-50/50 to-blue-50/20 rounded-2xl border border-slate-100 flex items-center justify-center overflow-visible mb-2 shadow-sm">
            <div className="relative w-[180px] h-[100px] mt-4">
              {/* Isometric Tiles */}
              <div 
                className="absolute w-[80px] h-[45px] bg-[#89e219] border-b-[6px] border-[#58cc02] rounded-[10px]"
                style={{
                  transform: 'rotateX(55deg) rotateZ(-45deg) translate(0px, 0px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                }}
              />
              <div 
                className="absolute w-[80px] h-[45px] bg-[#a2ec3b] border-b-[6px] border-[#73db16] rounded-[10px]"
                style={{
                  transform: 'rotateX(55deg) rotateZ(-45deg) translate(70px, -70px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                }}
              />

              {/* Lumi Character */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/lumis-wayfing.png"
                alt="Lumi"
                className="absolute w-14 h-14 object-contain z-10 bottom-[20px] left-[15px]"
                style={{ filter: 'url(#chroma-white)' }}
              />

              {/* Floating Command Icon and dashed curve */}
              <div className="absolute -top-[15px] right-[20px] flex flex-col items-center z-20">
                <div className="w-12 h-12 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={COMMAND_DETAILS[slide.quizIllustration.commandType].imageSrc} 
                    alt={slide.quizIllustration.commandType} 
                    className="w-7 h-7 object-contain"
                  />
                </div>
              </div>

              {/* If it's a pickup, show a star on the destination tile */}
              {slide.quizIllustration.commandType === 'pickup' && (
                <img 
                  src="/images/star.png" 
                  alt="Star" 
                  className="absolute w-8 h-8 object-contain z-10 top-[5px] right-[40px] animate-pulse"
                />
              )}

              {/* SVG Dashed Curve */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
                <path
                  d="M 45 45 Q 85 0 135 15"
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {slide.options.map((opt, idx) => {
            const isSel = selectedQuizOption === idx;
            const checked = quizAnswerChecked;
            let borderCls = 'border-slate-200 bg-white text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/30';
            let iconBg = 'bg-slate-100';
            let iconColor = 'text-slate-400';

            if (isSel && !checked) {
              borderCls = 'border-[#7c3aed] bg-[#f5f3ff] text-[#6d28d9] ring-2 ring-indigo-100';
              iconBg = 'bg-[#7c3aed]';
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
                className={`flex items-center gap-4 w-full text-left p-3.5 border-2 border-b-4 rounded-2xl transition-all shadow-sm cursor-pointer ${borderCls}`}
              >
                {opt.commandType ? (
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 p-0.5 border ${isSel ? 'bg-indigo-100 border-indigo-200' : 'bg-slate-50 border-slate-200'}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={COMMAND_DETAILS[opt.commandType].imageSrc}
                      alt={opt.text}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-[11px] shrink-0 ${iconBg} ${iconColor}`}>
                    {['A', 'B', 'C', 'D'][idx]}
                  </span>
                )}
                <span className="text-[14px] font-bold leading-snug grow">{opt.text}</span>
                {isSel && checked && <span className="shrink-0 text-lg">{opt.isCorrect ? '✓' : '✗'}</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 select-none">
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
