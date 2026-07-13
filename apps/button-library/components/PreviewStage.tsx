import { getMotionComponent } from "@/lib/motion-registry";

type PreviewStageProps = {
  componentName: string;
  tone?: "card" | "detail";
};

export function PreviewStage({ componentName, tone = "card" }: PreviewStageProps) {
  const MotionComponent = getMotionComponent(componentName);

  return (
    <div
      className={
        tone === "detail"
          ? "flex min-h-80 items-center justify-center rounded-[32px] border border-white/[0.08] bg-black/28 px-5 py-10"
          : "flex min-h-28 items-center justify-center rounded-[24px] border border-white/[0.06] bg-black/25 px-4 py-7"
      }
    >
      <MotionComponent />
    </div>
  );
}
