import Image from "next/image";
import { DimensionSchematic } from "@/components/DimensionSchematic";
import { ThicknessSchematic } from "@/components/ThicknessSchematic";
import type { InnerPackage, PackageDimension, PackagingSubmission, ReviewStatus } from "@/data/submissions";

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

function InnerTraySection({ submission, items }: { submission: PackagingSubmission; items: InnerPackage[] }) {
  return (
    <article className="border border-[#CFCFCF] bg-white">
      <div className="border-b border-[#D8D8D8] px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FF6900]">Inner Tray</p>
        <h3 className="mt-1 text-lg font-semibold text-[#111111]">{submission.innerTray.title}</h3>
      </div>

      {submission.innerTray.hasImage ? (
        <div className="border-b border-[#D8D8D8] bg-white p-5">
          <div className="relative">
            <Image src={submission.innerTray.image} alt={submission.innerTray.title} width={1600} height={1000} className="w-full object-contain" />
            <div className="absolute left-4 top-4 flex gap-2">
              {items.map((item) => (
                <span key={item.id} className="grid size-8 place-items-center rounded-[4px] bg-[#FF6900] text-sm font-semibold text-white">
                  {item.marker}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[420px] items-center justify-center border-b border-[#D8D8D8] bg-[#F7F7F5] p-8">
          <div className="w-full max-w-3xl border border-dashed border-[#BDBDBD] bg-white px-6 py-16 text-center">
            <p className="text-xl font-semibold text-[#111111]">{submission.innerTray.placeholder}</p>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#666666]">{submission.innerTray.note}</p>
          </div>
        </div>
      )}

      <div className="grid gap-px bg-[#D8D8D8] md:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4">
            <p className="text-xs font-semibold text-[#FF6900]">{item.marker} / {item.position}</p>
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
        <h3 className="mt-1 flex items-center gap-2 text-base font-semibold text-[#111111]">
          <span className="grid size-6 place-items-center rounded-[4px] bg-[#FF6900] text-xs font-semibold text-white">{item.marker}</span>
          {item.name}
        </h3>
        <p className="mt-3 text-sm text-[#666666]">{formatSize(item)}</p>
      </div>
      <ThicknessSchematic item={item} />
    </article>
  );
}

export function SubmissionDetail({ submission }: { submission: PackagingSubmission }) {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-6 py-6 text-[#111111] lg:px-10">
      <div className="mx-auto max-w-[1360px]">
        <header className="mb-5 flex flex-col justify-between gap-3 border border-[#CFCFCF] bg-white px-4 py-3 text-sm md:flex-row md:items-center">
          <span className="font-semibold">Xiaomi Packaging Submission</span>
          <div className="flex items-center gap-3 text-[#666666]">
            <span>{submission.documentTitle}</span>
            <span>{submission.version}</span>
            <StatusBadge status={submission.reviewStatus} label={submission.heroStatus} />
          </div>
        </header>

        <section className="grid border border-[#CFCFCF] bg-white lg:grid-cols-[0.78fr_1.22fr]">
          <div className="border-b border-[#D8D8D8] p-8 lg:border-b-0 lg:border-r">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF6900]">00 Overview</p>
            <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[1.04] tracking-[-0.035em]">{submission.productName}</h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#666666]">{submission.submissionNote}</p>
            <div className="mt-8">
              <InfoLine label="类型" value={submission.projectType} />
              <InfoLine label="版本" value={submission.version} />
              <InfoLine label="状态" value={submission.heroStatus} />
              <InfoLine label="外盒尺寸" value={submission.outerBoxSize} />
            </div>
          </div>

          <div className="bg-white p-5">
            <div className="border border-[#D8D8D8]">
              <div className="flex min-h-[470px] items-center justify-center border-b border-[#D8D8D8] bg-white p-4">
                <Image
                  src={submission.assets.heroOverview}
                  alt={`${submission.productName}摆放拆解效果图`}
                  width={1600}
                  height={1000}
                  priority
                  className="max-h-[450px] w-full object-contain"
                />
              </div>
              <div className="bg-[#F7F7F5] px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FF6900]">Overview Image</p>
                <p className="mt-2 text-sm leading-6 text-[#555555]">{submission.heroOverviewNote}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <SectionHeader index="01" title="外包装展示" description={submission.sectionNotes.outerPackage} />
          <div className="grid gap-5 lg:grid-cols-2">
            {submission.outerDimensions.map((item) => (
              <OuterPackageCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="py-4">
          <SectionHeader index="02" title="尺寸示意图 / Dimension Schematic" description={submission.sectionNotes.dimensions} />
          <p className="mb-5 border-l-2 border-[#FF6900] bg-white px-4 py-3 text-sm font-medium text-[#555555]">
            {submission.sectionNotes.dimensionSchematic}
          </p>
          <div className="grid gap-5 lg:grid-cols-2">
            {[...submission.outerDimensions, ...submission.innerItems].map((item) => (
              <DimensionSchematic key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="py-4">
          <SectionHeader index="03" title="内托平面布局" description={submission.sectionNotes.innerTray} />
          <InnerTraySection submission={submission} items={submission.innerItems} />
        </section>

        <section className="py-14">
          <SectionHeader index="04" title="内部物料" description={submission.sectionNotes.materials} />
          <div className="grid gap-5 lg:grid-cols-3">
            {submission.innerItems.map((item) => (
              <MaterialCard key={item.id} item={item} />
            ))}
          </div>
          <p className="mt-4 border-l-2 border-[#FF6900] bg-white px-4 py-3 text-sm font-medium text-[#555555]">
            {submission.sectionNotes.thicknessSchematic}
          </p>
        </section>

        <section className="pb-16">
          <SectionHeader index="05" title="提交信息 / Submission Info" />
          <div className="grid border border-[#CFCFCF] bg-white md:grid-cols-5">
            {submission.reviewNotes.map((note) => (
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
