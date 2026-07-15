import Image from "next/image";
import type { PackageDimension } from "@/data/packaging";

function formatSize(item: PackageDimension) {
  const base = `${item.widthCm}cm × ${item.heightCm}cm`;
  return item.depthCm ? `${base} × ${item.depthCm}cm` : base;
}

function getSchematicSize(item: PackageDimension) {
  const maxWidth = 280;
  const maxHeight = 210;
  const scale = Math.min(maxWidth / item.widthCm, maxHeight / item.heightCm);

  return {
    width: Math.max(item.widthCm * scale, 72),
    height: Math.max(item.heightCm * scale, 56),
  };
}

export function DimensionSchematic({ item }: { item: PackageDimension }) {
  const size = getSchematicSize(item);

  return (
    <article className="border border-[#CFCFCF] bg-white">
      <div className="flex items-center justify-between gap-4 border-b border-[#D8D8D8] px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          {item.marker ? (
            <span className="grid size-7 shrink-0 place-items-center rounded-[4px] bg-[#FF6900] text-sm font-semibold text-white">
              {item.marker}
            </span>
          ) : null}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#111111]">{item.name}</p>
            <p className="mt-1 truncate text-xs text-[#777777]">{item.fileName ?? item.note}</p>
          </div>
        </div>
        <p className="shrink-0 text-sm font-semibold text-[#111111]">{formatSize(item)}</p>
      </div>

      <div className="flex min-h-[320px] items-center justify-center px-12 py-12">
        <div className="relative" style={{ width: size.width, height: size.height }}>
          <div className="absolute -top-7 left-0 right-0 flex items-center gap-2">
            <span className="h-3 w-px bg-[#555555]" />
            <span className="h-px flex-1 bg-[#555555]" />
            <span className="bg-white px-2 text-xs font-semibold text-[#111111]">W {item.widthCm}cm</span>
            <span className="h-px flex-1 bg-[#555555]" />
            <span className="h-3 w-px bg-[#555555]" />
          </div>

          <div className="absolute -right-9 bottom-0 top-0 flex flex-col items-center gap-2">
            <span className="h-px w-3 bg-[#555555]" />
            <span className="w-px flex-1 bg-[#555555]" />
            <span className="-rotate-90 bg-white px-2 text-xs font-semibold text-[#111111]">H {item.heightCm}cm</span>
            <span className="w-px flex-1 bg-[#555555]" />
            <span className="h-px w-3 bg-[#555555]" />
          </div>

          <div className="relative flex h-full w-full items-center justify-center border border-[#111111] bg-[#FAFAFA]">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                width={600}
                height={420}
                className="max-h-[72%] max-w-[72%] object-contain opacity-20"
              />
            ) : null}
            <div className="absolute inset-0 flex items-center justify-center px-3 text-center">
              <p className="text-xs font-semibold leading-5 text-[#111111]">{item.marker ? `${item.marker} / ` : ""}{item.name}</p>
            </div>
          </div>

          {item.depthCm ? (
            <div className="absolute -bottom-8 left-0 text-xs font-semibold text-[#666666]">D {item.depthCm}cm</div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
