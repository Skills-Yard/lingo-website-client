import Image from "next/image";
import { Network, Play, Sparkles } from "lucide-react";
import type { VideoSlide } from "@/lib/constants/instructionsIntro";

/** "What are Instructions?" — video thumbnail with a play badge and the takeaway caption. */
export function VideoScreen({ slide }: { slide: VideoSlide }) {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight text-center md:text-left flex items-center gap-2 justify-center md:justify-start">
        <Network className="w-5 h-5 text-primary shrink-0" />
        <span className="text-primary">
          {slide.highlightWord} {slide.title}
        </span>
      </h1>

      <div className="relative w-full h-[400px] md:h-96 rounded-[8px] bg-[#1A1C22] flex items-center justify-center overflow-hidden shadow-lg  ">
        <Image
          src="/images/vedioImg.png"
          height={700}
          width={512}
          alt="What are Instructions? video thumbnail"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl">
          <Play className="w-6 h-6 text-primary fill-primary ml-0.5" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-black/40" />
      </div>

      <div className="w-full rounded-[8px] bg-secondary p-4 flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-primary shrink-0" />
        <p className="text-xs md:text-sm text-secondary-foreground font-medium leading-snug">
          {slide.caption}
        </p>
      </div>
    </>
  );
}
