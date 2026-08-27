import Image from "next/image";
import type { CoverSlide } from "@/lib/constants/instructionsIntro";

export function CoverScreen({ slide }: { slide: CoverSlide }) {
  return (
    <div className="flex flex-col gap-3 text-center">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight text-balance">
        <span className="text-primary">{slide.highlightWord}</span>{" "}
        <span className="text-foreground">{slide.title}</span>
      </h1>

      <div className="relative w-full h-36 flex items-center justify-center overflow-hidden p-3">
        <Image
          src={slide.imageLight}
          alt=""
          width={759}
          height={512}
          className="h-full w-auto max-w-full object-contain dark:hidden"
        />
        <Image
          src={slide.imageDark}
          alt=""
          width={743}
          height={512}
          className="hidden h-full w-auto max-w-full object-contain dark:block"
        />
      </div>

      <div>
        {slide.lines.map((line) => (
          <p key={line} className="text-base md:text-lg font-semibold text-foreground">
            {line}
          </p>
        ))}
        <p className="text-base md:text-lg font-semibold text-primary">
          {slide.highlightLine}
        </p>
      </div>

      <div className="w-full h-40 rounded-[8px] bg-[#1A1C22] p-6 flex items-center gap-5 shadow-lg mt-1">
        <div className="w-16 h-40 shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/box.png" alt="" className="w-full h-[150px] object-contain" />
        </div>
        <div className="text-left">
          <p className="text-[14px] text-white font-medium">{slide.revealLabel}</p>
          <p className="text-sm text-[#BEBEBE] font-medium">about</p>
          <p className="text-lg font-semibold tracking-wide text-primary">
            {slide.revealSubject}
          </p>
        </div>
      </div>
    </div>
  );
}
