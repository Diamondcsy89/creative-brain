import type { ButtonDemo } from "@/data/buttons";

type ButtonShowcaseCardProps = {
  demo: ButtonDemo;
  index: number;
};

export function ButtonShowcaseCard({ demo, index }: ButtonShowcaseCardProps) {
  const DemoButton = demo.Component;

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.045] p-4 shadow-soft-button backdrop-blur-xl sm:p-5">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="flex min-h-[214px] flex-col justify-between gap-7">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/38">
              {String(index + 1).padStart(2, "0")}
            </p>
            <span className="rounded-full border border-white/[0.08] bg-black/20 px-2.5 py-1 text-[11px] text-white/44">
              App Motion
            </span>
          </div>
          <div>
            <h2 className="text-base font-medium text-white">{demo.title}</h2>
            <p className="mt-2 text-sm leading-6 text-white/56">{demo.description}</p>
          </div>
        </div>

        <div className="flex min-h-20 items-center justify-center rounded-3xl border border-white/[0.06] bg-black/25 px-4 py-7">
          <DemoButton />
        </div>

        <p className="text-xs leading-5 text-white/42">{demo.scene}</p>
      </div>
    </article>
  );
}
