import Image from "next/image";
import type { ReactNode } from "react";
import { packaging, type InnerPackage, type PackageDimension, type ReviewStatus } from "@/data/packaging";

function formatSize(item: PackageDimension) {
  const base = `${item.widthCm}cm × ${item.heightCm}cm`;
  return item.depthCm ? `${base} × ${item.depthCm}cm` : base;
}

const statusClassName: Record<ReviewStatus, string> = {
  Confirmed: "border-[#93C5A4] bg-[#F1F8F3] text-[#1F7A3D]",
  Pending: "border-[#F6B35E] bg-[#FFF7EC] text-[#9A5200]",
  "Need Review": "border-[#FF6900] bg-[#FFF2E8] text-[#B84900]",
};

function StatusBadge({ status, label }: { status: ReviewStatus; label?: string }) {
  return (
    <span className={`inline-flex rounded-[4px] border px-2 py-1 text-[11px] font-semibold ${statusClassName[status]}`}>
      {label ?? status}
    </span>
  );
}

function SectionHeader({
  code,
  title,
  description,
}: {
  code: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5 grid gap-3 border-b border-[#D8D8D8] pb-4 lg:grid-cols-[220px_1fr]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF6900]">{code}</p>
      <div>
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#111111]">{title}</h2>
        {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-[#666666]">{description}</p> : null}
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[128px_1fr] border-b border-[#D8D8D8] text-sm last:border-b-0">
      <span className="border-r border-[#D8D8D8] bg-[#F7F7F5] px-3 py-2 text-[#666666]">{label}</span>
      <span className="px-3 py-2 font-medium text-[#111111]">{value}</span>
    </div>
  );
}

function GridPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`border border-[#CFCFCF] bg-white ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(#E9E9E7 1px, transparent 1px), linear-gradient(90deg, #E9E9E7 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {children}
    </div>
  );
}

function DrawingFrame({ item, children }: { item: PackageDimension; children: React.ReactNode }) {
  return (
    <article className="border border-[#CFCFCF] bg-white">
      <div className="flex items-center justify-between border-b border-[#D8D8D8] bg-[#F7F7F5] px-3 py-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#666666]">{item.fileName}</p>
          <p className="mt-1 text-sm font-semibold text-[#111111]">{item.name}</p>
        </div>
        <StatusBadge status={item.status} />
      </div>
      {children}
      <div className="grid border-t border-[#D8D8D8] md:grid-cols-4">
        <MetaRow label="用途" value={item.usage} />
        <MetaRow label="尺寸" value={formatSize(item)} />
        <MetaRow label="版本" value={item.version} />
        <MetaRow label="状态" value={item.status} />
      </div>
    </article>
  );
}

function DimensionDrawing({ item }: { item: PackageDimension }) {
  const width = Math.min(Math.max(item.widthCm * 10, 140), 330);
  const height = Math.min(Math.max(item.heightCm * 10, 80), 330);
  const isOuterFront = item.id === "outer-front";
  const isOuterSide = item.id === "outer-side";

  return (
    <article className="border border-[#CFCFCF] bg-white">
      <div className="flex items-center justify-between border-b border-[#D8D8D8] bg-[#F7F7F5] px-3 py-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FF6900]">Dimension Drawing</p>
          <h3 className="mt-1 text-base font-semibold text-[#111111]">{item.name}</h3>
        </div>
        <span className="text-sm font-semibold text-[#111111]">{formatSize(item)}</span>
      </div>

      <GridPanel className="flex min-h-[430px] items-center justify-center p-14">
        <div className="relative" style={{ width, height }}>
          <div className="absolute -top-8 left-0 right-0 flex items-center gap-2">
            <span className="h-4 w-px bg-[#111111]" />
            <span className="h-px flex-1 bg-[#111111]" />
            <span className="border border-[#111111] bg-white px-2 py-0.5 text-xs font-semibold text-[#111111]">
              W {item.widthCm}cm
            </span>
            <span className="h-px flex-1 bg-[#111111]" />
            <span className="h-4 w-px bg-[#111111]" />
          </div>
          <div className="absolute -bottom-8 left-0 right-0 flex items-center gap-2">
            <span className="h-4 w-px bg-[#111111]" />
            <span className="h-px flex-1 bg-[#111111]" />
            <span className="border border-[#111111] bg-white px-2 py-0.5 text-xs font-semibold text-[#111111]">
              W {item.widthCm}cm
            </span>
            <span className="h-px flex-1 bg-[#111111]" />
            <span className="h-4 w-px bg-[#111111]" />
          </div>
          <div className="absolute -left-10 bottom-0 top-0 flex flex-col items-center gap-2">
            <span className="h-px w-4 bg-[#111111]" />
            <span className="w-px flex-1 bg-[#111111]" />
            <span className="-rotate-90 border border-[#111111] bg-white px-2 py-0.5 text-xs font-semibold text-[#111111]">
              H {item.heightCm}cm
            </span>
            <span className="w-px flex-1 bg-[#111111]" />
            <span className="h-px w-4 bg-[#111111]" />
          </div>
          <div className="absolute -right-10 bottom-0 top-0 flex flex-col items-center gap-2">
            <span className="h-px w-4 bg-[#111111]" />
            <span className="w-px flex-1 bg-[#111111]" />
            <span className="-rotate-90 border border-[#111111] bg-white px-2 py-0.5 text-xs font-semibold text-[#111111]">
              H {item.heightCm}cm
            </span>
            <span className="w-px flex-1 bg-[#111111]" />
            <span className="h-px w-4 bg-[#111111]" />
          </div>

          <div className="relative h-full w-full border-2 border-[#111111] bg-white">
            {item.image ? (
              <Image src={item.image} alt={item.name} width={900} height={900} className="h-full w-full object-cover opacity-95" />
            ) : null}
            {isOuterFront ? (
              <>
                <div className="absolute left-[8%] right-[8%] top-[8%] h-[16%] border border-dashed border-[#FF6900] bg-white/45 px-2 py-1 text-xs font-semibold text-[#B84900]">
                  Logo safe area
                </div>
                <div className="absolute bottom-[10%] left-[10%] right-[10%] h-[14%] border border-dashed border-[#FF6900] bg-white/45 px-2 py-1 text-xs font-semibold text-[#B84900]">
                  Title safe area
                </div>
              </>
            ) : null}
            {isOuterSide ? (
              <div className="absolute inset-x-[8%] top-1/2 border-t border-dashed border-[#FF6900]">
                <span className="-mt-3 inline-block bg-white px-2 text-xs font-semibold text-[#B84900]">Side fold axis</span>
              </div>
            ) : null}
          </div>
        </div>
      </GridPanel>
    </article>
  );
}

function InnerTrayPlan({ items }: { items: InnerPackage[] }) {
  const totalWidth = items.reduce((sum, item) => sum + item.widthCm, 0);
  const columns = items.map((item) => `${Math.max((item.widthCm / totalWidth) * 100, 18)}fr`).join(" ");

  return (
    <article className="border border-[#CFCFCF] bg-white">
      <div className="flex items-center justify-between border-b border-[#D8D8D8] bg-[#F7F7F5] px-3 py-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FF6900]">Inner Tray Plan</p>
          <h3 className="mt-1 text-base font-semibold text-[#111111]">内托平面审核图</h3>
        </div>
        <StatusBadge status={packaging.safetyZone.status} />
      </div>

      <GridPanel className="p-8">
        <div className="relative border-2 border-[#111111] bg-[#F2F2F0] p-8">
          <div className="pointer-events-none absolute inset-4 border border-dashed border-[#FF6900]" />
          <div className="absolute left-6 top-3 bg-[#F2F2F0] px-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#B84900]">
            {packaging.safetyZone.label} / {packaging.safetyZone.marginCm}cm
          </div>
          <div className="absolute bottom-5 left-1/2 h-6 w-28 -translate-x-1/2 border border-dashed border-[#666666] bg-white/70 text-center text-[11px] font-semibold leading-6 text-[#666666]">
            Pull handle
          </div>
          <div className="grid min-h-[440px] gap-4" style={{ gridTemplateColumns: columns }}>
            {items.map((item) => (
              <TrayCell key={item.id} item={item} />
            ))}
          </div>
        </div>
      </GridPanel>
    </article>
  );
}

function TrayCell({ item }: { item: InnerPackage }) {
  return (
    <div className="relative flex flex-col justify-between border border-[#111111] bg-white p-3">
      <span className="absolute left-2 top-2 size-3 border-l-2 border-t-2 border-[#FF6900]" />
      <span className="absolute right-2 top-2 size-3 border-r-2 border-t-2 border-[#FF6900]" />
      <span className="absolute bottom-2 left-2 size-3 border-b-2 border-l-2 border-[#FF6900]" />
      <span className="absolute bottom-2 right-2 size-3 border-b-2 border-r-2 border-[#FF6900]" />

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#666666]">{item.position}</p>
        <h4 className="mt-2 text-base font-semibold leading-snug text-[#111111]">{item.name}</h4>
      </div>
      <div className="my-4 flex flex-1 items-center justify-center border border-[#D8D8D8] bg-[#F7F7F5] p-3">
        {item.image ? <Image src={item.image} alt={item.name} width={700} height={500} className="max-h-44 w-full object-contain" /> : null}
      </div>
      <div className="space-y-2 border-t border-[#D8D8D8] pt-3 text-sm">
        <div className="flex justify-between gap-3">
          <span className="text-[#666666]">尺寸</span>
          <span className="font-semibold text-[#111111]">{formatSize(item)}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-[#666666]">状态</span>
          <span className="font-semibold text-[#111111]">{item.status}</span>
        </div>
      </div>
    </div>
  );
}

function MaterialSpecCard({ item }: { item: InnerPackage }) {
  return (
    <article className="flex min-h-[430px] flex-col border border-[#CFCFCF] bg-white">
      <div className="border-b border-[#D8D8D8] bg-[#F7F7F5] px-3 py-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#666666]">{item.fileName}</p>
        <h3 className="mt-1 text-base font-semibold text-[#111111]">{item.name}</h3>
      </div>
      <div className="flex flex-1 items-center justify-center border-b border-[#D8D8D8] bg-white p-5">
        {item.image ? <Image src={item.image} alt={item.name} width={900} height={700} className="max-h-56 w-full object-contain" /> : null}
      </div>
      <MetaRow label="名称" value={item.name} />
      <MetaRow label="尺寸" value={formatSize(item)} />
      <MetaRow label="类型" value="Inner Pack" />
      <MetaRow label="状态" value={item.status} />
    </article>
  );
}

export default function PackagingPilotPage() {
  const [outerFront, outerSide] = packaging.outerDimensions;

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-6 py-6 text-[#111111] lg:px-10">
      <div className="mx-auto max-w-[1480px]">
        <header className="mb-5 grid grid-cols-[1fr_auto_auto] items-center gap-4 border border-[#CFCFCF] bg-white px-4 py-3 text-sm">
          <span className="font-semibold">Xiaomi Packaging Review</span>
          <span className="hidden text-[#666666] md:inline">
            {packaging.documentTitle} / {packaging.version}
          </span>
          <StatusBadge status={packaging.reviewStatus} label={packaging.heroStatus} />
        </header>

        <section className="grid border border-[#CFCFCF] bg-white lg:grid-cols-[0.86fr_1.14fr]">
          <div className="border-b border-[#CFCFCF] p-8 lg:border-b-0 lg:border-r">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF6900]">MI COMMERCE / PACKAGING SUBMISSION</p>
            <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-[#111111]">
              {packaging.productName}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#666666]">{packaging.subtitle}</p>

            <div className="mt-8 border border-[#D8D8D8]">
              <MetaRow label="项目名称" value={packaging.productName} />
              <MetaRow label="类型" value={packaging.projectType} />
              <MetaRow label="版本" value={packaging.version} />
              <MetaRow label="状态" value={packaging.heroStatus} />
              <MetaRow label="外盒尺寸" value={packaging.outerBoxSize} />
            </div>
          </div>

          <GridPanel className="grid gap-4 p-6 lg:grid-cols-[1fr_0.78fr]">
            <div className="flex min-h-[520px] items-center justify-center border border-[#111111] bg-white p-5">
              <Image
                src={packaging.assets.outerCover}
                alt="小米商城会员限定随行礼盒外包装封面"
                width={1400}
                height={1400}
                priority
                className="max-h-[460px] w-auto object-cover"
              />
            </div>
            <div className="flex flex-col justify-between gap-4">
              <div className="flex min-h-[220px] items-center justify-center border border-[#111111] bg-white p-4">
                <Image
                  src={packaging.assets.outerSide}
                  alt="小米商城会员限定随行礼盒外包装侧面"
                  width={1200}
                  height={320}
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="border border-[#D8D8D8] bg-white">
                <MetaRow label="Front" value={formatSize(outerFront)} />
                <MetaRow label="Side" value={formatSize(outerSide)} />
                <MetaRow label="Purpose" value={packaging.reviewPurpose} />
              </div>
            </div>
          </GridPanel>
        </section>

        <section className="py-16">
          <SectionHeader
            code="A / OUTER PACKAGE"
            title="外包装工程图框"
            description="正面与侧面以设计稿审核面板呈现，保留文件名、尺寸、版本和审核状态。"
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {packaging.outerDimensions.map((item) => (
              <DrawingFrame key={item.id} item={item}>
                <GridPanel className="flex min-h-[440px] items-center justify-center p-8">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={1200}
                      height={1200}
                      className={item.id === "outer-front" ? "max-h-[340px] w-auto border border-[#111111] object-cover" : "max-h-[150px] w-full border border-[#111111] object-cover"}
                    />
                  ) : null}
                </GridPanel>
              </DrawingFrame>
            ))}
          </div>
        </section>

        <section className="py-6">
          <SectionHeader
            code="B / DIMENSION"
            title="尺寸标注总览"
            description="统一使用工程标注样式，包含外盒正面、外盒侧面与三个内部小盒的宽高厚信息。"
          />
          <div className="grid gap-5 xl:grid-cols-2">
            {packaging.outerDimensions.map((item) => (
              <DimensionDrawing key={item.id} item={item} />
            ))}
            {packaging.innerItems.map((item) => (
              <DimensionDrawing key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="py-16">
          <SectionHeader
            code="C / INNER TRAY"
            title="内托平面结构"
            description="以浅灰底板和细线框表达三件套的比例关系、边距、安全区与开孔位置。"
          />
          <InnerTrayPlan items={packaging.innerItems} />
        </section>

        <section className="py-6">
          <SectionHeader code="D / INNER PACK" title="内部物料规格板" />
          <div className="grid gap-5 lg:grid-cols-3">
            {packaging.innerItems.map((item) => (
              <MaterialSpecCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="py-16">
          <SectionHeader code="E / CHECKLIST" title="平台审核表格" />
          <div className="overflow-hidden border border-[#CFCFCF] bg-white">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-[#F7F7F5] text-xs uppercase tracking-[0.14em] text-[#666666]">
                <tr>
                  <th className="w-[18%] border-b border-r border-[#D8D8D8] px-4 py-3 font-semibold">审核项</th>
                  <th className="w-[34%] border-b border-r border-[#D8D8D8] px-4 py-3 font-semibold">检查内容</th>
                  <th className="w-[16%] border-b border-r border-[#D8D8D8] px-4 py-3 font-semibold">状态</th>
                  <th className="border-b border-[#D8D8D8] px-4 py-3 font-semibold">备注</th>
                </tr>
              </thead>
              <tbody>
                {packaging.checklist.map((row) => (
                  <tr key={row.item}>
                    <td className="border-b border-r border-[#D8D8D8] px-4 py-3 font-semibold text-[#111111]">{row.item}</td>
                    <td className="border-b border-r border-[#D8D8D8] px-4 py-3 leading-6 text-[#666666]">{row.content}</td>
                    <td className="border-b border-r border-[#D8D8D8] px-4 py-3">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="border-b border-[#D8D8D8] px-4 py-3 leading-6 text-[#666666]">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="pb-16">
          <SectionHeader code="F / REVIEW NOTES" title="审核记录面板" />
          <div className="grid border border-[#CFCFCF] bg-white md:grid-cols-4">
            {packaging.reviewNotes.map((note) => (
              <div key={note.label} className="border-b border-r border-[#D8D8D8] p-4 last:border-r-0 md:border-b-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#666666]">{note.label}</p>
                <p className="mt-3 text-base font-semibold text-[#111111]">{note.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
