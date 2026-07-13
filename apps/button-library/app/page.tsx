import { LibraryCard } from "@/components/LibraryCard";
import { categories, motionItems } from "@/data/motions";

const featuredStats = [
  { label: "Motion patterns", value: "12" },
  { label: "Categories", value: "04" },
  { label: "Runtime", value: "Motion" },
];

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="relative overflow-hidden rounded-[34px] border border-white/[0.08] bg-white/[0.045] px-5 py-8 shadow-soft-button sm:px-8 sm:py-10 lg:px-10">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/24 to-transparent" />
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-4xl">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/38">Csyformiq / App Motion Library 1.0</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white sm:text-7xl">
                Premium motion patterns for app interfaces.
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/56 sm:text-base">
                A curated library of refined button interactions for AI products, mobile apps, commerce flows, and experimental interface systems.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
              {featuredStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/[0.08] bg-black/20 px-4 py-3">
                  <p className="text-lg font-semibold tracking-[-0.03em] text-white">{stat.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/34">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="rounded-[30px] border border-white/[0.08] bg-white/[0.04] p-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/34">Static filter surface</p>
            <div className="mt-5 rounded-full border border-white/[0.08] bg-black/24 px-4 py-3 text-sm text-white/42">
              Search by motion name, platform, tag...
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span key={category} className="rounded-full border border-white/[0.08] bg-white/[0.045] px-3 py-2 text-xs text-white/58">
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {categories.map((category) => {
              const count = motionItems.filter((item) => item.category === category).length;

              return (
                <div key={category} className="rounded-[30px] border border-white/[0.08] bg-[#111111] p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold tracking-[-0.03em] text-white">{category}</h2>
                    <span className="text-xs text-white/34">{count} patterns</span>
                  </div>
                  <p className="mt-8 text-sm leading-6 text-white/46">
                    {category === "Apple"
                      ? "Quiet, tactile, native-feeling actions inspired by Apple product surfaces."
                      : category === "System"
                        ? "Reusable interface feedback for everyday app operations."
                        : category === "Commerce"
                          ? "Conversion-safe motion for purchase, download, and save flows."
                          : "Exploratory behaviors for new interaction models and product labs."}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/34">Button card grid</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white">Browse the motion system.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/44">
              Each card opens a detail page with preview, usage notes, motion parameters, and a code placeholder.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {motionItems.map((item, index) => (
              <LibraryCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
