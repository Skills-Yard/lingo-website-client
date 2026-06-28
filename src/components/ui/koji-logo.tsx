import Image from "next/image";

type LumiVariant = "coding" | "study";

interface LumiLogoProps {
  className?: string;
  variant?: LumiVariant;
  priority?: boolean;
  noBackground?: boolean;
}

const lumiArtwork: Record<
  LumiVariant,
  { src: string; alt: string; sizes: string }
> = {
  coding: {
    src: "/images/lumi-laptop.png",
    alt: "Lumi coding on a laptop",
    sizes: "(max-width: 640px) 96px, 128px",
  },
  study: {
    src: "/images/lumi-book.png",
    alt: "Lumi studying from a book",
    sizes: "(max-width: 640px) 96px, 128px",
  },
};

export function LumiLogo({
  className = "w-16 h-16",
  variant = "coding",
  priority = false,
  noBackground = false,
}: LumiLogoProps) {
  const artwork = lumiArtwork[variant];

  if (noBackground) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={artwork.src}
          alt={artwork.alt}
          fill
          priority={priority}
          sizes={artwork.sizes}
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative isolate overflow-hidden rounded-[2rem] border border-white/60 bg-[radial-gradient(circle_at_top,_rgba(255,245,157,0.95),_rgba(255,224,130,0.72)_45%,_rgba(196,181,253,0.42)_100%)] p-2 shadow-[0_20px_45px_rgba(79,70,229,0.18)] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.75),_transparent_38%),radial-gradient(circle_at_80%_85%,_rgba(147,197,253,0.35),_transparent_32%)]" />
      <Image
        src={artwork.src}
        alt={artwork.alt}
        fill
        priority={priority}
        sizes={artwork.sizes}
        className="relative z-10 object-contain drop-shadow-[0_18px_30px_rgba(30,41,59,0.18)]"
      />
    </div>
  );
}

export function KojiLogo(props: LumiLogoProps) {
  return <LumiLogo {...props} />;
}
