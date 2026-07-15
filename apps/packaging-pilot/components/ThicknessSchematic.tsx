import type { InnerPackage } from "@/data/packaging";

function formatFrontSize(item: InnerPackage) {
  return `${item.widthCm}cm × ${item.heightCm}cm`;
}

export function ThicknessSchematic({ item, maxDepthCm }: { item: InnerPackage; maxDepthCm: number }) {
  const thicknessWidth = Math.max((item.depthCm ?? 0) / maxDepthCm, 0.18) * 96;

  return (
    <div className="border-t border-[#D8D8D8] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FF6900]">Side Thickness</p>
          <p className="mt-1 text-xs text-[#777777]">规格关系示意</p>
        </div>
        <span className="text-sm font-semibold text-[#111111]">{item.depthCm}cm</span>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_112px]">
        <div className="flex min-h-24 items-center justify-center border border-[#D8D8D8] bg-[#FAFAFA] p-4">
          <div className="relative flex h-16 w-full max-w-44 items-center justify-center border border-[#111111] bg-white">
            <span className="px-2 text-center text-xs font-semibold leading-5 text-[#111111]">正面 {formatFrontSize(item)}</span>
          </div>
        </div>

        <div className="flex min-h-24 flex-col justify-center border border-[#D8D8D8] bg-white p-3">
          <div className="h-8 border border-[#111111] bg-[#F7F7F5]" style={{ width: thicknessWidth }} />
          <p className="mt-2 text-xs font-semibold text-[#111111]">厚度 {item.depthCm}cm</p>
        </div>
      </div>
    </div>
  );
}
