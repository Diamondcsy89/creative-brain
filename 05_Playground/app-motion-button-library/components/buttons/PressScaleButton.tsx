"use client";

import { motion } from "motion/react";

export function PressScaleButton() {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.94, y: 2 }}
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 520, damping: 34 }}
      className="h-12 rounded-full bg-white px-6 text-sm font-medium text-zinc-950 shadow-[0_18px_40px_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.16)] outline-none ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-white/50"
    >
      Continue
    </motion.button>
  );
}
