"use client";

import { motion } from "motion/react";

export function DynamicIslandActionButton() {
  return (
    <motion.button
      type="button"
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className="relative h-12 overflow-hidden rounded-full bg-black px-5 text-sm font-medium text-white shadow-[0_18px_50px_rgba(0,0,0,0.42),inset_0_0_0_1px_rgba(255,255,255,0.12)] outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <span className="relative z-10 flex items-center gap-3">
        <motion.span
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.1 },
            tap: { scale: 0.92 },
          }}
          className="size-2.5 rounded-full bg-emerald-300"
        />
        <span>Live Action</span>
        <motion.span
          variants={{
            rest: { width: 0, opacity: 0 },
            hover: { width: 44, opacity: 1 },
          }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="overflow-hidden whitespace-nowrap text-xs text-white/48"
        >
          Active
        </motion.span>
      </span>
    </motion.button>
  );
}
