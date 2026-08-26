import { InstructionsIntroFlow } from "@/components/programming-basic/sections/InstructionsIntroFlow";

export default async function InstructionsIntroPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string }>;
}) {
  const { step } = await searchParams;
  const initialIndex = Number(step);

  return (
    <InstructionsIntroFlow
      initialIndex={Number.isInteger(initialIndex) && initialIndex >= 0 ? initialIndex : 0}
    />
  );
}
