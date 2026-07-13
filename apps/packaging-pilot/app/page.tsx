import Image from "next/image";
import { packaging, type InnerPackage, type PackageDimension, type ReviewStatus } from "@/data/packaging";

function formatSize(item: PackageDimension) {
  const base = `${item.widthCm}cm × ${item.heightCm}cm`;
  return item.depthCm ? `${base} × ${item.depthCm}cm` : base;
}

const statusClassName: Record<ReviewStatus, string> = {
  Confirmed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  "Need Review": "border-orange-200 bg-orange-50 text-orange-700",
};

function StatusBadge({ status }: { status: ReviewStatus }) {
  return (
    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusClassName[status]}`}>
      {status}
    </span>
  );
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
  const previewWidth = Math.min(Math.max(item.widthCm * 8, 128), 270);
  const previewHeight = Math.min(Math.max(item.heightCm * 8, 76), 270);

  return (
    <article className="rounded-[22px] border border-stone-200 bg-white p-5 shadow-[0_16px_44px_rgba(40,32,20,0.055)]">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm font-semibold text-stone-950">{item.name}</p>
          <p className="mt-1 text-xs text-stone-500">{item.note}</p>
        </div>
        <StatusBadge status={item.status} />
      </div>

      <div className="mt-6 flex min-h-80 items-center justify-center overflow-hidden rounded-[18px] border border-stone-200 bg-[#f7f4ee] px-14 py-12">
        <div
          className="relative rounded-[12px] border border-stone-500/80 bg-white shadow-[0_14px_28px_rgba(40,32,20,0.08)]"
          style={{ width: previewWidth, height: previewHeight }}
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              width={900}
              height={900}
              className={isSquare ? "h-full w-full rounded-[11px] object-cover" : "h-full w-full rounded-[11px] object-cover"}
            />
          ) : null}
          <div className="absolute -bottom-9 left-0 right-0 flex items-center gap-2">
            <span className="h-3 w-px bg-stone-600" />
            <span className="h-px flex-1 bg-stone-600" />
            <span className="rounded-full border border-stone-300 bg-white px-2 py-0.5 text-[11px] font-semibold text-stone-700">
              {item.widthCm}cm
            </span>
            <span className="h-px flex-1 bg-stone-600" />
            <span className="h-3 w-px bg-stone-600" />
          </div>
          <div className="absolute -right-12 bottom-0 top-0 flex flex-col items-center gap-2">
            <span className="h-px w-3 bg-stone-600" />
            <span className="w-px flex-1 bg-stone-600" />
            <span className="origin-center rotate-90 rounded-full border border-stone-300 bg-white px-2 py-0.5 text-[11px] font-semibold text-stone-700">
              {item.heightCm}cm
            </span>
            <span className="w-px flex-1 bg-stone-600" />
            <span className="h-px w-3 bg-stone-600" />
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2">
          <p className="text-stone-400">Size</p>
          <p className="mt-1 font-semibold text-stone-800">{formatSize(item)}</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2">
          <p className="text-stone-400">Version</p>
          <p className="mt-1 font-semibold text-stone-800">{item.version}</p>
        </div>
      </div>
    </article>
  );
}

function InnerTrayLayout({ items }: { items: InnerPackage[] }) {
  const [eyeMask, neckPillow, xiaomiTag] = items;

  return (
    <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_22px_70px_rgba(40,32,20,0.07)]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-stone-950">Inner tray engineering layout</p>
          <p className="mt-1 text-xs text-stone-500">
            {packaging.safetyZone.label} / {packaging.safetyZone.marginCm}cm / {packaging.safetyZone.note}
          </p>
        </div>
        <StatusBadge status={packaging.safetyZone.status} />
      </div>
      <div className="relative rounded-[24px] border border-stone-300 bg-[#eee8dc] p-8">
        <div className="pointer-events-none absolute inset-4 rounded-[18px] border border-dashed border-red-400/60" />
        <div className="pointer-events-none absolute left-8 top-4 rounded-full bg-[#eee8dc] px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-600">
          Safety margin
        </div>
        <div className="relative grid min-h-[520px] grid-cols-[1.45fr_0.9fr_0.58fr] gap-5">
          <TraySlot item={eyeMask} emphasis="primary" />
          <TraySlot item={neckPillow} emphasis="secondary" />
          <TraySlot item={xiaomiTag} emphasis="compact" />
        </div>
      </div>
    </div>
  );
}

function TraySlot({
  item,
  emphasis,
}: {
  item: InnerPackage;
  emphasis: "primary" | "secondary" | "compact";
}) {
  const imageClassName =
    emphasis === "primary"
      ? "max-h-[250px]"
      : emphasis === "secondary"
        ? "max-h-[180px]"
        : "max-h-[130px]";

  return (
    <div className="relative flex min-h-[480px] flex-col justify-between overflow-hidden rounded-[18px] border border-stone-300 bg-[#f8f5ee] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400">{item.position}</p>
          <h3 className="mt-2 text-base font-semibold text-stone-950">{item.name}</h3>
        </div>
        <StatusBadge status={item.status} />
      </div>
      <div className="my-5 flex flex-1 items-center justify-center rounded-[14px] border border-stone-200 bg-white p-4">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            width={700}
            height={500}
            className={`${imageClassName} w-full object-contain`}
          />
        ) : null}
      </div>
      <div className="grid gap-2 text-xs">
        <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-3 py-2">
          <span className="text-stone-500">尺寸</span>
          <span className="font-semibold text-stone-900">{formatSize(item)}</span>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-3 py-2">
          <span className="text-stone-500">状态</span>
          <span className="font-semibold text-stone-900">{item.status}</span>
        </div>
      </div>
      <span className="absolute left-3 top-3 size-4 border-l border-t border-red-500/70" />
      <span className="absolute right-3 top-3 size-4 border-r border-t border-red-500/70" />
      <span className="absolute bottom-3 left-3 size-4 border-b border-l border-red-500/70" />
      <span className="absolute bottom-3 right-3 size-4 border-b border-r border-red-500/70" />
    </div>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2">
      <p className="text-xs text-stone-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-stone-900">{value}</p>
    </div>
  );
}

export default function PackagingPilotPage() {
  return (
    <main className="min-h-screen px-6 py-6 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-6 grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-full border border-stone-200 bg-white px-5 py-3 text-sm shadow-[0_14px_40px_rgba(40,32,20,0.06)]">
          <span className="font-semibold text-stone-950">Packaging Review Pilot</span>
          <span className="hidden text-stone-500 md:inline">
            {packaging.documentTitle} / {packaging.version}
          </span>
          <StatusBadge status={packaging.reviewStatus} />
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
                {packaging.reviewNotes.map((note) => (
                  <div key={note.label} className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                    <span>{note.label}</span>
                    <span className="font-medium text-stone-950">{note.value}</span>
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
          <div className="grid items-stretch gap-5 lg:grid-cols-2">
            {packaging.outerDimensions.map((item) => (
              <article
                key={item.id}
                className="flex h-full flex-col rounded-[28px] border border-stone-200 bg-white p-5 shadow-[0_22px_64px_rgba(40,32,20,0.075)]"
              >
                <div className="flex min-h-[420px] flex-1 items-center justify-center rounded-[22px] border border-stone-200 bg-[#f7f4ee] p-6">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={1200}
                      height={1200}
                      className={
                        item.id === "outer-front"
                          ? "max-h-[360px] w-auto rounded-[16px] object-cover shadow-[0_18px_44px_rgba(40,32,20,0.10)]"
                          : "max-h-[170px] w-full rounded-[16px] object-cover shadow-[0_18px_44px_rgba(40,32,20,0.10)]"
                      }
                    />
                  ) : null}
                </div>
                <div className="mt-5 grid gap-3 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-stone-950">{item.name}</p>
                    <StatusBadge status={item.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <MetaCell label="图片用途" value={item.usage} />
                    <MetaCell label="尺寸" value={formatSize(item)} />
                    <MetaCell label="版本" value={item.version} />
                    <MetaCell label="审核状态" value={item.status} />
                  </div>
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
          <article className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_24px_70px_rgba(40,32,20,0.08)] lg:col-span-2">
            <SectionHeader eyebrow="Checklist" title="正式审核表格" />
            <div className="overflow-hidden rounded-[18px] border border-stone-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-stone-100 text-xs uppercase tracking-[0.16em] text-stone-500">
                  <tr>
                    <th className="w-[18%] px-4 py-4 font-semibold">审核项</th>
                    <th className="w-[34%] px-4 py-4 font-semibold">检查内容</th>
                    <th className="w-[16%] px-4 py-4 font-semibold">状态</th>
                    <th className="px-4 py-4 font-semibold">备注</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  {packaging.checklist.map((row) => (
                    <tr key={row.item}>
                      <td className="px-4 py-4 font-semibold text-stone-950">{row.item}</td>
                      <td className="px-4 py-4 leading-6 text-stone-600">{row.content}</td>
                      <td className="px-4 py-4">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-4 py-4 leading-6 text-stone-500">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-[28px] border border-stone-200 bg-white p-8 shadow-[0_24px_70px_rgba(40,32,20,0.08)] lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-600/70">Review Notes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-stone-950">审核备注区</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {packaging.reviewNotes.map((note) => (
                <div key={note.label} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-400">{note.label}</p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-stone-900">{note.value}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
