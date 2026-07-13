import Image from "next/image";
import { packaging } from "@/data/packaging";

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
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-600/70">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-stone-950 sm:text-4xl">{title}</h2>
      </div>
      {description ? <p className="max-w-md text-sm leading-6 text-stone-500">{description}</p> : null}
    </div>
  );
}

function DimensionGuide({
  label,
  width,
  height,
  variant,
}: {
  label: string;
  width: string;
  height: string;
  variant: "front" | "side";
}) {
  return (
    <div className="relative rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_24px_70px_rgba(40,32,20,0.08)]">
      <div
        className={
          variant === "front"
            ? "relative mx-auto aspect-square w-full max-w-sm rounded-[24px] border border-stone-300 bg-[#f6f1e8]"
            : "relative mx-auto h-28 w-full max-w-sm rounded-[18px] border border-stone-300 bg-[#f6f1e8]"
        }
      >
        <div className="absolute inset-4 rounded-[18px] border border-dashed border-stone-300" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-stone-500">
          {label}
        </span>

        <div className="absolute -bottom-10 left-0 right-0 flex items-center gap-2">
          <span className="h-px flex-1 bg-stone-400" />
          <span className="text-xs font-medium text-stone-600">宽 {width}</span>
          <span className="h-px flex-1 bg-stone-400" />
        </div>

        <div className="absolute -right-12 bottom-0 top-0 flex flex-col items-center gap-2">
          <span className="w-px flex-1 bg-stone-400" />
          <span className="origin-center rotate-90 whitespace-nowrap text-xs font-medium text-stone-600">高 {height}</span>
          <span className="w-px flex-1 bg-stone-400" />
        </div>
      </div>
    </div>
  );
}

export default function PackagingPilotPage() {
  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 flex items-center justify-between rounded-full border border-stone-200 bg-white/80 px-4 py-3 text-sm text-stone-500 shadow-[0_14px_40px_rgba(40,32,20,0.06)]">
          <span className="font-medium text-stone-950">Packaging Pilot</span>
          <span>{packaging.version}</span>
        </header>

        <section className="overflow-hidden rounded-[36px] border border-stone-200 bg-white shadow-[0_34px_100px_rgba(40,32,20,0.1)]">
          <div className="grid min-h-[620px] lg:grid-cols-[0.92fr_1.08fr]">
            <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-600/70">Xiaomi Member Limited Gift Box</p>
                <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-stone-950 sm:text-7xl">
                  {packaging.productName}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-8 text-stone-500">{packaging.subtitle}</p>
              </div>
              <div className="mt-12 grid gap-3 text-sm text-stone-500 sm:grid-cols-3">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">白底审核稿</div>
                <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">外盒 / 内盒</div>
                <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">尺寸标注</div>
              </div>
            </div>

            <div className="relative min-h-[520px] bg-[#f2eee5] p-8">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
              <div className="relative mx-auto flex h-full max-w-[560px] items-center justify-center">
                <Image
                  src={packaging.assets.outerCover}
                  alt="小米商城会员限定随行礼盒外包装封面"
                  width={1400}
                  height={1400}
                  priority
                  className="w-full rounded-[28px] object-cover shadow-[0_38px_90px_rgba(70,52,30,0.18)]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <SectionHeader
            eyebrow="Outer Package"
            title="外包装展示"
            description="正面封面用于平台审核主视觉，侧面视图以同一视觉系统模拟盒体厚度与陈列角度。"
          />
          <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
            <article className="rounded-[32px] border border-stone-200 bg-white p-5 shadow-[0_24px_70px_rgba(40,32,20,0.08)]">
              <Image
                src={packaging.assets.outerCover}
                alt="外包装正面效果图"
                width={1200}
                height={1200}
                className="aspect-square w-full rounded-[24px] object-cover"
              />
              <p className="mt-4 text-sm font-medium text-stone-700">正面效果图</p>
            </article>
            <article className="flex flex-col justify-center rounded-[32px] border border-stone-200 bg-white p-6 shadow-[0_24px_70px_rgba(40,32,20,0.08)]">
              <div className="rounded-[22px] border border-stone-200 bg-[#f5efe6] p-5">
                <Image
                  src={packaging.assets.outerCover}
                  alt="外包装侧面效果图"
                  width={900}
                  height={900}
                  className="h-28 w-full rounded-[16px] object-cover object-left shadow-[0_18px_40px_rgba(40,32,20,0.12)]"
                />
                <div className="mt-4 h-8 rounded-b-[18px] bg-[#d8cec0]" />
              </div>
              <p className="mt-4 text-sm font-medium text-stone-700">侧面效果图</p>
            </article>
          </div>
        </section>

        <section className="py-10">
          <SectionHeader
            eyebrow="Dimensions"
            title="尺寸标注展示"
            description="尺寸线由 CSS 绘制，避免生成额外图片，便于后续审核稿快速调整。"
          />
          <div className="grid gap-16 lg:grid-cols-2">
            <DimensionGuide label="外盒正面" width="30cm" height="30cm" variant="front" />
            <DimensionGuide label="外盒侧面" width="30cm" height="8cm" variant="side" />
          </div>
        </section>

        <section className="py-24">
          <SectionHeader
            eyebrow="Inner Tray"
            title="内盒结构模拟"
            description="以内盒分区方式展示三个内部小包装位置，帮助审核内容物布局与包装层级。"
          />
          <div className="rounded-[36px] border border-stone-200 bg-white p-5 shadow-[0_28px_80px_rgba(40,32,20,0.08)] sm:p-8">
            <div className="grid gap-4 rounded-[28px] bg-[#eee7dc] p-4 lg:grid-cols-[0.8fr_1.2fr_0.72fr]">
              {packaging.innerItems.map((item) => (
                <div key={item.name} className="flex min-h-72 flex-col justify-between rounded-[24px] border border-stone-300/70 bg-white/70 p-4">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-stone-400">{item.position}</span>
                  <Image src={item.image} alt={item.name} width={700} height={500} className="max-h-44 w-full rounded-[18px] object-contain" />
                  <p className="text-sm font-medium text-stone-800">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10">
          <SectionHeader eyebrow="Materials" title="内部物料展示" />
          <div className="grid gap-5 lg:grid-cols-3">
            {packaging.innerItems.map((item) => (
              <article key={item.name} className="rounded-[30px] border border-stone-200 bg-white p-5 shadow-[0_22px_60px_rgba(40,32,20,0.07)]">
                <Image src={item.image} alt={item.name} width={900} height={700} className="aspect-[4/3] w-full rounded-[22px] object-contain" />
                <p className="mt-5 text-base font-semibold text-stone-950">{item.name}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[34px] border border-stone-200 bg-white p-6 shadow-[0_24px_70px_rgba(40,32,20,0.08)] sm:p-8">
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

          <article className="rounded-[34px] border border-stone-200 bg-[#1d1b18] p-6 text-white shadow-[0_24px_70px_rgba(40,32,20,0.14)] sm:p-8">
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
