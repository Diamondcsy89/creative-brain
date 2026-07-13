"use client";

import { useMemo, useState } from "react";
import { LibraryCard } from "@/components/LibraryCard";
import type { MotionCategory, MotionItem } from "@/data/motions";

type LibraryExplorerProps = {
  categories: MotionCategory[];
  items: MotionItem[];
};

type ActiveCategory = "All" | MotionCategory;

export function LibraryExplorer({ categories, items }: LibraryExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("All");

  const visibleItems = useMemo(() => {
    if (activeCategory === "All") {
      return items;
    }

    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  const filterOptions: ActiveCategory[] = ["All", ...categories];

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/34">Button card grid</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white">Browse the motion system.</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-white/44">
          Each card opens a stable detail page with preview, usage notes, motion parameters, and copyable code.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filterOptions.map((category) => {
          const isActive = category === activeCategory;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={
                isActive
                  ? "rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition"
                  : "rounded-full border border-white/[0.08] bg-white/[0.045] px-4 py-2 text-xs font-medium text-white/52 transition hover:border-white/[0.16] hover:text-white"
              }
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visibleItems.map((item, index) => (
          <LibraryCard key={item.slug} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
