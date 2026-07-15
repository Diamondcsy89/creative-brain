import type { InnerPackage } from "@/data/submissions";

function formatFrontSize(item: InnerPackage) {
  return `${item.widthCm}cm × ${item.heightCm}cm`;
}

function getScaledRect(widthCm: number, heightCm: number, maxWidthPx: number, maxHeightPx: number) {
  const scale = Math.min(maxWidthPx / widthCm, maxHeightPx / heightCm);

  return {
    width: Math.max(widthCm * scale, 8),
    height: Math.max(heightCm * scale, 8),
  };
}

export function ThicknessSchematic({ item }: { item: InnerPackage }) {
  const frontRect = getScaledRect(item.widthCm, item.heightCm, 168, 112);
  const sideRect = getScaledRect(item.depthCm ?? 0, item.heightCm, 96, 112);

  return (
    <div className="border-t border-[#D8D8D8] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FF6900]">Side Thickness</p>
          <p className="mt-1 text-xs text-[#777777]">规格关系示意</p>
        </div>
        <span className="text-sm font-semibold text-[#111111]">{item.depthCm}cm</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border border-[#D8D8D8] bg-[#FAFAFA] p-3">
          <p className="mb-3 text-xs font-semibold text-[#666666]">正面 {formatFrontSize(item)}</p>
          <div className="flex min-h-32 items-center justify-center">
            <div
              className="flex items-center justify-center border border-[#111111] bg-white"
              style={{ width: frontRect.width, height: frontRect.height }}
            >
              <span className="px-2 text-center text-xs font-semibold leading-5 text-[#111111]">W × H</span>
            </div>
          </div>
        </div>

        <div className="border border-[#D8D8D8] bg-white p-3">
          <p className="mb-3 text-xs font-semibold text-[#666666]">侧面 {item.depthCm}cm × {item.heightCm}cm</p>
          <div className="flex min-h-32 items-center justify-center">
            <div
              className="flex items-center justify-center border border-[#111111] bg-[#F7F7F5]"
              style={{ width: sideRect.width, height: sideRect.height }}
            >
              <span className="-rotate-90 whitespace-nowrap px-2 text-xs font-semibold text-[#111111]">D × H</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-[#777777]">
        示意图按 width × height × depth 的真实比例绘制，仅用于规格关系展示。
      </p>
    </div>
  );
}
