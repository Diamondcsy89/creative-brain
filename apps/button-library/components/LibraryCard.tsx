import Link from "next/link";
import type { MotionItem } from "@/data/motions";
import { PreviewStage } from "@/components/PreviewStage";

type LibraryCardProps = {
  item: MotionItem;
  index: number;
};

export function LibraryCard({ item, index }: LibraryCardProps) {
  return (
    <Link
      href={`/buttons/${item.slug}`}
      className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.045] p-4 shadow-soft-button transition duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.065] sm:p-5"
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="flex min-h-[336px] flex-col justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/34">
              {String(index + 1).padStart(2, "0")}
            </p>
            <span className="rounded-full border border-white/[0.08] bg-black/20 px-2.5 py-1 text-[11px] text-white/46">
              {item.category}
            </span>
          </div>
          <div>
            <h2 className="text-lg font-medium tracking-[-0.02em] text-white">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-white/52">{item.description}</p>
          </div>
        </div>

        <PreviewStage componentName={item.componentName} />

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/42">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-white/38">
            <span>{item.platform}</span>
            <span className="transition group-hover:text-white/70">View details</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
