import Image from "next/image";
import { packaging, type InnerPackage, type PackageDimension, type ReviewStatus } from "@/data/packaging";

function formatSize(item: PackageDimension) {
  const base = `${item.widthCm}cm × ${item.heightCm}cm`;
  return item.depthCm ? `${base} × ${item.depthCm}cm` : base;
}

const statusClassName: Record<ReviewStatus, string> = {
  Confirmed: "border-[#9BC6A6] bg-[#F4FAF5] text-[#207A3E]",
  Pending: "border-[#F2B56B] bg-[#FFF8EF] text-[#9A5200]",
  "Need Review": "border-[#FF6900] bg-[#FFF3EA] text-[#B84900]",
};

function StatusBadge({ status, label }: { status: ReviewStatus; label?: string }) {
  return <span className={`rounded-[4px] border px-2 py-1 text-xs font-semibold ${statusClassName[status]}`}>{label ?? status}</span>;
}

function SectionHeader({ index, title, description }: { index: string; title: string; description?: string }) {
  return (
    <div className="mb-5 border-b border-[#D8D8D8] pb-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF6900]">{index}</p>
      <div className="mt-2 flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#111111]">{title}</h2>
        {description ? <p className="max-w-2xl text-sm leading-6 text-[#666666]">{description}</p> : null}
      </div>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-[#E5E5E5] py-3 first:border-t-0">
      <p className="text-xs text-[#777777]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[#111111]">{value}</p>
    </div>
  );
}

function OuterPackageCard({ item }: { item: PackageDimension }) {
  return (
    <article className="border border-[#CFCFCF] bg-white">
      <div className="flex min-h-[420px] items-center justify-center border-b border-[#D8D8D8] bg-white p-6">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            width={1200}
            height={1200}
            className={item.id === "outer-front" ? "max-h-[360px] w-auto object-cover" : "max-h-[170px] w-full object-cover"}
          />
        ) : null}
      </div>
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-[#777777]">{item.fileName}</p>
            <h3 className="mt-1 text-base font-semibold text-[#111111]">{item.name}</h3>
          </div>
          <StatusBadge status={item.status} />
        </div>
        <InfoLine label="用途" value={item.usage} />
        <InfoLine label="尺寸" value={formatSize(item)} />
        <InfoLine label="版本" value={item.version} />
        <InfoLine label="状态" value={item.status} />
      </div>
    </article>
  );
}

function InnerTraySection({ items }: { items: InnerPackage[] }) {
  return (
    <article className="border border-[#CFCFCF] bg-white">
      <div className="border-b border-[#D8D8D8] px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FF6900]">Inner Tray</p>
        <h3 className="mt-1 text-lg font-semibold text-[#111111]">{packaging.innerTray.title}</h3>
      </div>

      {packaging.innerTray.hasImage ? (
        <div className="border-b border-[#D8D8D8] bg-white p-5">
          <Image src={packaging.innerTray.image} alt={packaging.innerTray.title} width={1600} height={1000} className="w-full object-contain" />
        </div>
      ) : (
        <div className="flex min-h-[420px] items-center justify-center border-b border-[#D8D8D8] bg-[#F7F7F5] p-8">
          <div className="w-full max-w-3xl border border-dashed border-[#BDBDBD] bg-white px-6 py-16 text-center">
            <p className="text-xl font-semibold text-[#111111]">{packaging.innerTray.placeholder}</p>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#666666]">{packaging.innerTray.note}</p>
          </div>
        </div>
      )}

      <div className="grid gap-px bg-[#D8D8D8] md:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4">
            <p className="text-xs text-[#777777]">{item.position}</p>
            <p className="mt-1 text-sm font-semibold text-[#111111]">{item.name}</p>
            <p className="mt-2 text-sm text-[#666666]">{formatSize(item)}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function MaterialCard({ item }: { item: InnerPackage }) {
  return (
    <article className="flex min-h-[360px] flex-col border border-[#CFCFCF] bg-white">
      <div className="flex flex-1 items-center justify-center border-b border-[#D8D8D8] p-5">
        {item.image ? <Image src={item.image} alt={item.name} width={900} height={700} className="max-h-52 w-full object-contain" /> : null}
      </div>
      <div className="p-4">
        <p className="text-xs text-[#777777]">{item.fileName}</p>
        <h3 className="mt-1 text-base font-semibold text-[#111111]">{item.name}</h3>
        <p className="mt-3 text-sm text-[#666666]">{formatSize(item)}</p>
      </div>
    </article>
  );
}

export default function PackagingPilotPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-6 py-6 text-[#111111] lg:px-10">
      <div className="mx-auto max-w-[1360px]">
        <header className="mb-5 flex flex-col justify-between gap-3 border border-[#CFCFCF] bg-white px-4 py-3 text-sm md:flex-row md:items-center">
          <span className="font-semibold">Xiaomi Packaging Submission</span>
          <div className="flex items-center gap-3 text-[#666666]">
            <span>{packaging.documentTitle}</span>
            <span>{packaging.version}</span>
            <StatusBadge status={packaging.reviewStatus} label={packaging.heroStatus} />
          </div>
        </header>

        <section className="grid border border-[#CFCFCF] bg-white lg:grid-cols-[0.78fr_1.22fr]">
          <div className="border-b border-[#D8D8D8] p-8 lg:border-b-0 lg:border-r">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF6900]">Packaging Submission</p>
            <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[1.04] tracking-[-0.035em]">{packaging.productName}</h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#666666]">{packaging.submissionNote}</p>
            <div className="mt-8">
              <InfoLine label="类型" value={packaging.projectType} />
              <InfoLine label="版本" value={packaging.version} />
              <InfoLine label="状态" value={packaging.heroStatus} />
              <InfoLine label="外盒尺寸" value={packaging.outerBoxSize} />
            </div>
          </div>

          <div className="grid gap-px bg-[#D8D8D8] p-px md:grid-cols-[1fr_0.75fr]">
            <div className="flex min-h-[520px] items-center justify-center bg-white p-6">
              <Image
                src={packaging.assets.outerCover}
                alt="小米商城会员限定随行礼盒外包装封面"
                width={1400}
                height={1400}
                priority
                className="max-h-[460px] w-auto object-cover"
              />
            </div>
            <div className="flex min-h-[520px] items-center justify-center bg-white p-6">
              <Image
                src={packaging.assets.outerSide}
                alt="小米商城会员限定随行礼盒外包装侧面"
                width={1200}
                height={320}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-14">
          <SectionHeader index="01" title="外包装展示" description="正面与侧面以图片为主，保留包装提交所需的基础信息。" />
          <div className="grid gap-5 lg:grid-cols-2">
            {packaging.outerDimensions.map((item) => (
              <OuterPackageCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="py-4">
          <SectionHeader index="02" title="内托平面布局" description="此处用于展示盒子打开后的内部排列；未提供真实图时仅显示占位，不模拟真实结构。" />
          <InnerTraySection items={packaging.innerItems} />
        </section>

        <section className="py-14">
          <SectionHeader index="03" title="内部物料" description="三件内部小包装按规格板式展示，仅保留图片、名称与尺寸。" />
          <div className="grid gap-5 lg:grid-cols-3">
            {packaging.innerItems.map((item) => (
              <MaterialCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="pb-16">
          <SectionHeader index="04" title="版本备注" />
          <div className="grid border border-[#CFCFCF] bg-white md:grid-cols-4">
            {packaging.reviewNotes.map((note) => (
              <div key={note.label} className="border-b border-r border-[#D8D8D8] p-4 last:border-r-0 md:border-b-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#777777]">{note.label}</p>
                <p className="mt-3 text-base font-semibold text-[#111111]">{note.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
