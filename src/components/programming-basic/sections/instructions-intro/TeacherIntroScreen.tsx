import type { TeacherIntroSlide } from "@/lib/constants/instructionsIntro";
import { TeacherIllustration } from "./TeacherIllustration";

/** "Let Suppose / Teacher Says" — eyebrow, title and the full teacher illustration, no quiz yet. */
export function TeacherIntroScreen({ slide }: { slide: TeacherIntroSlide }) {
  return (
    <>
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-2xl md:text-3xl font-semibold text-primary">{slide.eyebrow}</p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight -mt-2">
          {slide.title}
        </h1>
      </div>
      <TeacherIllustration
        className="h-68.75"
        imageLight="/images/teacherWhite.png"
        imageDark="/images/teacherBlack.png"
      />
    </>
  );
}
