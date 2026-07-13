import Image from "next/image";
import { packaging, type InnerPackage, type PackageDimension } from "@/data/packaging";

function formatSize(item: PackageDimension) {
  const base = `${item.widthCm}cm × ${item.heightCm}cm`;
  return item.depthCm ? `${base} × ${item.depthCm}cm` : base;
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-7 flex items-end justify-between gap-8 border-b border-stone-200 pb-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-600/70">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-stone-950">{title}</h2>
      </div>
      {description ? <p className="hidden max-w-lg text-sm leading-6 text-stone-500 lg:block">{description}</p> : null}
    </div>
  );
}

function DimensionCard({ item }: { item: PackageDimension }) {
  const isSquare = item.widthCm === item.heightCm;
  const previewWidth = Math.min(Math.max(item.widthCm * 9, 120), 280);
  const previewHeight = Math.min(Math.max(item.heightCm * 9, 72), 280);

  return (
    <article className="rounded-[26px] border border-stone-200 bg-white p-5 shadow-[0_18px_50px_rgba(40,32,20,0.06)]">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm font-semibold text-stone-950">{item.name}</p>
          <p className="mt-1 text-xs text-stone-500">{item.note}</p>
        </div>
        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">{formatSize(item)}</span>
      </div>

      <div className="mt-8 flex min-h-80 items-center justify-center overflow-hidden rounded-[22px] bg-[#f6f1e8] p-10">
        <div
          className="relative rounded-[18px] border border-stone-400/70 bg-white shadow-[0_18px_36px_rgba(40,32,20,0.08)]"
          style={{ width: previewWidth, height: previewHeight }}
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              width={900}
              height={900}
              className={isSquare ? "h-full w-full rounded-[17px] object-cover" : "h-full w-full rounded-[17px] object-cover"}
            />
          ) : null}
          <div className="absolute -bottom-8 left-0 right-0 flex items-center gap-2">
            <span className="h-px flex-1 bg-stone-500" />
            <span className="whitespace-nowrap text-[11px] font-medium text-stone-600">{item.widthCm}cm</span>
            <span className="h-px flex-1 bg-stone-500" />
          </div>
          <div className="absolute -right-10 bottom-0 top-0 flex flex-col items-center gap-2">
            <span className="w-px flex-1 bg-stone-500" />
            <span className="origin-center rotate-90 whitespace-nowrap text-[11px] font-medium text-stone-600">{item.heightCm}cm</span>
            <span className="w-px flex-1 bg-stone-500" />
          </div>
        </div>
      </div>
    </article>
  );
}

function InnerTrayLayout({ items }: { items: InnerPackage[] }) {
  const maxWidth = Math.max(...items.map((item) => item.widthCm));
  const maxHeight = Math.max(...items.map((item) => item.heightCm));

  return (
    <div className="rounded-[34px] border border-stone-200 bg-white p-6 shadow-[0_22px_70px_rgba(40,32,20,0.07)]">
      <div className="rounded-[28px] bg-[#eee7dc] p-5">
        <div className="grid h-[460px] grid-cols-[1.15fr_0.78fr] gap-5">
          <div className="grid grid-rows-[1fr_0.55fr] gap-5">
            <TraySlot item={items[0]} maxWidth={maxWidth} maxHeight={maxHeight} />
            <TraySlot item={items[1]} maxWidth={maxWidth} maxHeight={maxHeight} />
          </div>
          <TraySlot item={items[2]} maxWidth={maxWidth} maxHeight={maxHeight} />
        </div>
      </div>
    </div>
  );
}

function TraySlot({
  item,
  maxWidth,
  maxHeight,
}: {
  item: InnerPackage;
  maxWidth: number;
  maxHeight: number;
}) {
  const widthPercent = 58 + (item.widthCm / maxWidth) * 34;
  const heightPercent = 42 + (item.heightCm / maxHeight) * 38;

  return (
    <div className="relative flex items-center justify-center rounded-[26px] border border-stone-300/70 bg-white/70 p-4">
      <span className="absolute left-4 top-4 text-xs font-medium uppercase tracking-[0.18em] text-stone-400">{item.position}</span>
      <div
        className="flex flex-col justify-between rounded-[20px] border border-stone-300 bg-white p-3 shadow-[0_16px_36px_rgba(40,32,20,0.08)]"
        style={{ width: `${widthPercent}%`, height: `${heightPercent}%` }}
      >
        {item.image ? (
          <Image src={item.image} alt={item.name} width={700} height={500} className="min-h-0 flex-1 rounded-[14px] object-contain" />
        ) : null}
        <div className="pt-2">
          <p className="text-sm font-semibold text-stone-900">{item.name}</p>
          <p className="mt-1 text-xs text-stone-500">{formatSize(item)}</p>
        </div>
      </div>
    </div>
  );
}

export default function PackagingPilotPage() {
  return (
    <main className="min-h-screen px-6 py-6 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-6 grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-full border border-stone-200 bg-white px-5 py-3 text-sm shadow-[0_14px_40px_rgba(40,32,20,0.06)]">
          <span className="font-semibold text-stone-950">Packaging Review Pilot</span>
          <span className="hidden text-stone-500 md:inline">{packaging.version}</span>
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">{packaging.reviewStatus}</span>
        </header>

        <section className="overflow-hidden rounded-[36px] border border-stone-200 bg-white shadow-[0_34px_100px_rgba(40,32,20,0.1)]">
          <div className="grid min-h-[680px] grid-cols-[0.86fr_1.14fr]">
            <div className="flex flex-col justify-between p-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-600/70">Xiaomi Member Limited Gift Box</p>
                <h1 className="mt-6 max-w-2xl text-6xl font-semibold leading-[0.96] tracking-[-0.05em] text-stone-950">
                  {packaging.productName}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-8 text-stone-500">{packaging.subtitle}</p>
              </div>
              <div className="grid gap-3 text-sm text-stone-600">
                {packaging.outerDimensions.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                    <span>{item.name}</span>
                    <span className="font-medium text-stone-950">{formatSize(item)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-rows-[1fr_160px] gap-4 bg-[#f2eee5] p-8">
              <div className="flex items-center justify-center">
                <Image
                  src={packaging.assets.outerCover}
                  alt="小米商城会员限定随行礼盒外包装封面"
                  width={1400}
                  height={1400}
                  priority
                  className="max-h-[480px] w-auto rounded-[30px] object-cover shadow-[0_38px_90px_rgba(70,52,30,0.18)]"
                />
              </div>
              <div className="flex items-center justify-center rounded-[24px] border border-stone-200 bg-white/60 p-5">
                <Image
                  src={packaging.assets.outerSide}
                  alt="小米商城会员限定随行礼盒外包装侧面"
                  width={1200}
                  height={320}
                  className="h-full w-full rounded-[18px] object-cover shadow-[0_18px_44px_rgba(70,52,30,0.12)]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <SectionHeader
            eyebrow="Outer Package"
            title="外包装真实视图"
            description="使用真实正面与真实侧面素材，用于平台审核包装完整性和版面一致性。"
          />
          <div className="grid grid-cols-[1fr_0.86fr] gap-5">
            {packaging.outerDimensions.map((item) => (
              <article key={item.id} className="rounded-[32px] border border-stone-200 bg-white p-5 shadow-[0_24px_70px_rgba(40,32,20,0.08)]">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={1200}
                    height={1200}
                    className={item.id === "outer-front" ? "aspect-square w-full rounded-[24px] object-cover" : "h-[220px] w-full rounded-[24px] object-cover"}
                  />
                ) : null}
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm font-medium text-stone-700">{item.name}</p>
                  <p className="text-sm text-stone-500">{formatSize(item)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-8">
          <SectionHeader
            eyebrow="Dimensions"
            title="尺寸标注总览"
            description="外盒与内部小盒尺寸均来自 data/packaging.ts，页面仅负责可视化。"
          />
          <div className="grid gap-5 xl:grid-cols-2">
            {packaging.outerDimensions.map((item) => (
              <DimensionCard key={item.id} item={item} />
            ))}
            {packaging.innerItems.map((item) => (
              <DimensionCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="py-20">
          <SectionHeader
            eyebrow="Inner Tray"
            title="内盒比例化结构"
            description="根据三个内部小盒的宽高厚数据进行比例化排布，突出大小关系与内托分区逻辑。"
          />
          <InnerTrayLayout items={packaging.innerItems} />
        </section>

        <section className="py-8">
          <SectionHeader eyebrow="Materials" title="内部物料与真实尺寸" />
          <div className="grid gap-5 lg:grid-cols-3">
            {packaging.innerItems.map((item) => (
              <article key={item.id} className="rounded-[30px] border border-stone-200 bg-white p-5 shadow-[0_22px_60px_rgba(40,32,20,0.07)]">
                {item.image ? <Image src={item.image} alt={item.name} width={900} height={700} className="aspect-[4/3] w-full rounded-[22px] object-contain" /> : null}
                <p className="mt-5 text-base font-semibold text-stone-950">{item.name}</p>
                <p className="mt-2 text-sm text-stone-500">{formatSize(item)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[34px] border border-stone-200 bg-white p-8 shadow-[0_24px_70px_rgba(40,32,20,0.08)]">
            <SectionHeader eyebrow="Checklist" title="审核 checklist" />
            <div className="grid gap-3 sm:grid-cols-2">
              {packaging.checklist.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                  <span className="size-2 rounded-full bg-orange-500" />
                  <span className="text-sm font-medium text-stone-700">{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[34px] border border-stone-200 bg-[#1d1b18] p-8 text-white shadow-[0_24px_70px_rgba(40,32,20,0.14)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-300/70">Review Notes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em]">审核备注区</h2>
            <div className="mt-8 space-y-4">
              {packaging.reviewNotes.map((note) => (
                <div key={note.label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/38">{note.label}</p>
                  <p className="mt-3 text-sm leading-6 text-white/72">{note.value}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
