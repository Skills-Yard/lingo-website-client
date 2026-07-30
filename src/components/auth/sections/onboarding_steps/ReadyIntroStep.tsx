"use client";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

export function ReadyIntroStep({ onNext, onBack }: StepProps) {
  return (
    <div className="min-h-screen w-full  flex items-center justify-center font-sans p-0 sm:p-4">
      {/* Mobile Card Mockup Container */}
      <div className="w-full h-screen sm:h-[760px] sm:max-h-[90vh] sm:max-w-[390px] sm:rounded-[36px] overflow-hidden   flex flex-col justify-between p-6 relative ">

        {/* Floating Pixel Grids Decoration */}
        <div className="absolute top-16 right-6 flex flex-col gap-0.5 opacity-15 pointer-events-none select-none">
          <div className="flex gap-0.5">
            <div className="w-4 h-4 bg-[#7C73E6] rounded-sm" />
            <div className="w-4 h-4 bg-[#7C73E6] rounded-sm" />
            <div className="w-4 h-4 bg-transparent" />
            <div className="w-4 h-4 bg-[#7C73E6] rounded-sm" />
          </div>
          <div className="flex gap-0.5">
            <div className="w-4 h-4 bg-transparent" />
            <div className="w-4 h-4 bg-[#7C73E6] rounded-sm" />
            <div className="w-4 h-4 bg-[#7C73E6] rounded-sm" />
            <div className="w-4 h-4 bg-[#7C73E6] rounded-sm" />
          </div>
          <div className="flex gap-0.5">
            <div className="w-4 h-4 bg-[#7C73E6] rounded-sm" />
            <div className="w-4 h-4 bg-transparent" />
            <div className="w-4 h-4 bg-[#7C73E6] rounded-sm" />
            <div className="w-4 h-4 bg-transparent" />
          </div>
        </div>

        <div className="absolute bottom-32 left-6 flex flex-col gap-0.5 opacity-15 pointer-events-none select-none">
          <div className="flex gap-0.5">
            <div className="w-4 h-4 bg-[#7C73E6] rounded-sm" />
            <div className="w-4 h-4 bg-transparent" />
            <div className="w-4 h-4 bg-[#7C73E6] rounded-sm" />
          </div>
          <div className="flex gap-0.5">
            <div className="w-4 h-4 bg-[#7C73E6] rounded-sm" />
            <div className="w-4 h-4 bg-[#7C73E6] rounded-sm" />
            <div className="w-4 h-4 bg-transparent" />
          </div>
          <div className="flex gap-0.5">
            <div className="w-4 h-4 bg-transparent" />
            <div className="w-4 h-4 bg-[#7C73E6] rounded-sm" />
            <div className="w-4 h-4 bg-[#7C73E6] rounded-sm" />
          </div>
        </div>

        {/* Top Control Bar */}
        <div className="flex items-center justify-between mt-4 z-10">
          {/* Back Icon Skip-Media Button */}
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-[#9E94F8] border-2 border-b-4 border-indigo-900 flex items-center justify-center transition-all active:translate-y-0.5 active:border-b-2 cursor-pointer shadow-sm hover:brightness-105"
          >
            <svg className="w-5 h-5 fill-white text-white" viewBox="0 0 24 24">
              <path d="M6 19h2V5H6v14zm3.5-7L18 5v14l-8.5-7z" />
            </svg>
          </button>

          {/* Sound Mute-Slash Button */}
          <button
            className="w-10 h-10 rounded-2xl bg-[#9E94F8] border-2 border-b-4 border-indigo-900 flex items-center justify-center transition-all active:translate-y-0.5 active:border-b-2 cursor-pointer shadow-sm hover:brightness-105"
          >
            <svg className="w-5 h-5 fill-none stroke-white stroke-[2.5]" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3V6z" />
            </svg>
          </button>
        </div>

        {/* Top Header Text */}
        <div className="text-center mt-4 px-2 z-10">
          <p className="text-sm font-extrabold text-slate-800 leading-relaxed max-w-[280px] mx-auto">
            You need to answer just 7 quick questions! (Please)
          </p>
        </div>

        {/* Character Image */}
        <div className="relative flex justify-center items-center my-auto max-h-[220px] z-10">
          <img
            src="/images/new-cractor1.png"
            alt="Lumi pleading sad"
            className="w-[180px] h-[180px] object-contain select-none transform hover:scale-105 transition-transform duration-300 animate-pulse-slow"
          />
        </div>

        {/* Ready Mate? Prompt */}
        <div className="text-center mb-4 z-10">
          <h2 className="text-3xl font-extrabold text-slate-800 leading-tight">
            Ready mate?
          </h2>
        </div>

        {/* Action Buttons & Page Indicator */}
        <div className="flex flex-col gap-4 mt-auto mb-8 sm:mb-4 items-center z-10">
          {/* Ready since forever Button */}
          <button
            onClick={onNext}
            className="w-full h-14 rounded-2xl bg-[#7C73E6] border-b-4 border-[#5E54C9] hover:bg-[#8C83FA] text-white font-black text-lg transition-all active:translate-y-0.5 active:border-b-2 shadow-md cursor-pointer flex items-center justify-center select-none"
          >
            Ready since forever
          </button>

          {/* Progress Dash Indicators */}
          <div className="flex gap-2.5 mt-2">
            <div className="h-1.5 w-12 rounded-full bg-[#7C73E6] opacity-30 transition-all duration-300" />
            <div className="h-1.5 w-12 rounded-full bg-[#7C73E6] opacity-30 transition-all duration-300" />
            <div className="h-1.5 w-12 rounded-full bg-[#7C73E6] opacity-100 transition-all duration-300 shadow-[0_0_6px_rgba(124,115,230,0.5)]" />
          </div>
        </div>

      </div>
    </div>
  );
}
