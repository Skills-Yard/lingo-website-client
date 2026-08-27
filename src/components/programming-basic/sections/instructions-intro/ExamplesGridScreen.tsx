import Image from "next/image";
import type { ExamplesGridSlide } from "@/lib/constants/instructionsIntro";

/** "Some examples of instruction" — rows of source -> action image pairs joined by an arrow. */
export function ExamplesGridScreen({ slide }: { slide: ExamplesGridSlide }) {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight text-center md:text-left text-foreground">
        {slide.title}
      </h1>

      <div className="flex flex-col gap-3 justify-center grow">
        {slide.pairs.map((pair) => (
          <div key={pair.leftLabel} className="flex items-center justify-center gap-10">
            <div className="flex flex-col items-center gap-1.5 w-24">
              <div className="relative w-[132px] h-[132px] rounded-[18px] bg-[#EFF4F1] dark:bg-[#15181E] overflow-hidden flex items-center justify-center p-2">
                <Image
                  src={pair.leftImage}
                  alt={pair.leftLabel}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-medium text-foreground text-center leading-tight">
                {pair.leftLabel}
              </span>
            </div>

            <Image
              src="/images/arrowLines.png"
              alt=""
              width={24}
              height={16}
              className="object-contain shrink-0"
            />

            <div className="flex flex-col items-center gap-1.5 w-24">
              <div className="relative w-[132px] h-[132px] rounded-[18px] bg-[#EFF4F1] dark:bg-[#15181E] overflow-hidden flex items-center justify-center p-2">
                <Image
                  src={pair.rightImage}
                  alt={pair.rightLabel}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-medium text-foreground text-center leading-tight">
                {pair.rightLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
