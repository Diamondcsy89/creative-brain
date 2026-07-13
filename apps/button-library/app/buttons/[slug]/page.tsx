import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyCodeBlock } from "@/components/CopyCodeBlock";
import { PreviewStage } from "@/components/PreviewStage";
import { getMotionItem, motionItems } from "@/data/motions";

type ButtonDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return motionItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: ButtonDetailPageProps) {
  const { slug } = await params;
  const item = getMotionItem(slug);

  return {
    title: item ? `${item.title} - App Motion Library` : "Button Detail",
  };
}

export default async function ButtonDetailPage({ params }: ButtonDetailPageProps) {
  const { slug } = await params;
  const item = getMotionItem(slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Link href="/" className="text-sm text-white/46 transition hover:text-white">
          Back to library
        </Link>

        <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[34px] border border-white/[0.08] bg-white/[0.045] p-6 shadow-soft-button sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/34">{item.category}</p>
            <h1 className="mt-5 text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl">
              {item.title}
            </h1>
            <p className="mt-5 text-sm leading-7 text-white/54 sm:text-base">{item.description}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1.5 text-xs text-white/48">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <PreviewStage componentName={item.componentName} tone="detail" />
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-[28px] border border-white/[0.08] bg-white/[0.04] p-5">
            <h2 className="text-lg font-medium text-white">Usage</h2>
            <p className="mt-4 text-sm leading-7 text-white/50">
              Use this interaction when the action benefits from immediate tactile feedback without taking visual attention away from the surrounding interface.
            </p>
            <div className="mt-5 text-xs text-white/36">
              Platform: <span className="text-white/58">{item.platform}</span>
            </div>
          </article>

          <article className="rounded-[28px] border border-white/[0.08] bg-white/[0.04] p-5">
            <h2 className="text-lg font-medium text-white">Motion parameters</h2>
            <dl className="mt-4 space-y-3 text-sm text-white/50">
              <div className="flex justify-between gap-4">
                <dt>Interaction</dt>
                <dd className="text-right text-white/64">{item.motion.interaction}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Hover</dt>
                <dd className="text-right text-white/64">{item.motion.hover}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Press</dt>
                <dd className="text-right text-white/64">{item.motion.press}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Spring</dt>
                <dd className="text-right text-white/64">{item.motion.spring}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Duration</dt>
                <dd className="text-right text-white/64">{item.motion.duration}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Easing</dt>
                <dd className="text-right text-white/64">{item.motion.easing}</dd>
              </div>
            </dl>
          </article>

          <article className="rounded-[28px] border border-white/[0.08] bg-white/[0.04] p-5">
            <h2 className="text-lg font-medium text-white">Code</h2>
            <CopyCodeBlock code={item.code} />
            <p className="mt-4 text-sm leading-6 text-white/42">
              Production API and token extraction will be added in a later package pass.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
