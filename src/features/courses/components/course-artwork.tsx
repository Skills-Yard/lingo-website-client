import {
  Atom,
  BarChart3,
  Binary,
  Braces,
  Brain,
  ChartPie,
  CircleDot,
  Code2,
  Cpu,
  Database,
  FlaskConical,
  FunctionSquare,
  GitBranch,
  Layers3,
  Network,
  Pi,
  Sigma,
  SquareStack,
  Variable,
  Waypoints,
} from "lucide-react";

import { cn } from "@/lib/utils";

const iconMap = {
  layers: Layers3,
  braces: Braces,
  chart: BarChart3,
  atoms: Atom,
  logic: CircleDot,
  pie: ChartPie,
};

const artworkMap = {
  "code-window": Code2,
  variables: Variable,
  functions: FunctionSquare,
  algorithm: GitBranch,
  python: Braces,
  "python-functions": Sigma,
  recursion: Waypoints,
  "python-algorithms": Cpu,
  "data-visual": Database,
  probability: ChartPie,
  clusters: Network,
  regression: BarChart3,
  science: FlaskConical,
  motion: Binary,
  energy: Atom,
  logic: CircleDot,
  deduction: Brain,
  proof: SquareStack,
  numbers: Pi,
  money: Database,
  ratio: Sigma,
};

type ArtworkProps = {
  name: string;
  accent: string;
  className?: string;
  size?: "sm" | "lg";
};

export function SubjectIcon({ name, accent, className }: ArtworkProps) {
  const Icon = iconMap[name as keyof typeof iconMap] ?? Layers3;

  return (
    <span
      className={cn(
        "relative flex size-14 items-center justify-center rounded-2xl",
        className,
      )}
      style={{
        background: `linear-gradient(135deg, ${accent}33, var(--surface-strong) 72%)`,
        boxShadow: `inset 0 0 0 1px ${accent}55, 0 14px 30px ${accent}22`,
      }}
    >
      {/* <span
        className="absolute inset-x-3 top-3 h-3 rounded-full opacity-90 blur-[1px]"
        style={{ backgroundColor: accent }}
      /> */}
      <Icon className="relative z-10 size-8" style={{ color: accent }} />
    </span>
  );
}

export function CourseArtwork({
  name,
  accent,
  className,
  size = "sm",
}: ArtworkProps) {
  const Icon = artworkMap[name as keyof typeof artworkMap] ?? Code2;

  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-md",
        size === "lg" ? "size-28 sm:size-36" : "size-20 sm:size-24",
        className,
      )}
      style={{
        background: `radial-gradient(circle at 35% 25%, ${accent}66, transparent 42%), linear-gradient(145deg, var(--surface-strong), var(--background))`,
      }}
    >
      <span
        className="absolute -left-5 top-7 h-10 w-24 rotate-[-16deg] rounded-full opacity-80"
        style={{ backgroundColor: `${accent}44` }}
      />
      <span
        className="absolute bottom-3 right-2 size-9 rounded-full opacity-90"
        style={{ backgroundColor: `${accent}55` }}
      />
      <Icon
        className={cn("relative z-10", size === "lg" ? "size-20" : "size-12")}
        strokeWidth={2.4}
        style={{ color: accent }}
      />
    </span>
  );
}
