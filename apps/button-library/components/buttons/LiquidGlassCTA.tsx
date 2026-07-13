"use client";

import { motion } from "motion/react";

export function LiquidGlassCTA() {
  return (
    <motion.button
      type="button"
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className="relative h-12 overflow-hidden rounded-full border border-white/12 bg-[#171717] px-6 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <motion.span
        aria-hidden="true"
        variants={{
          rest: { y: "72%", opacity: 0.45 },
          hover: { y: "38%", opacity: 0.72 },
          tap: { y: "22%", opacity: 0.82 },
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="absolute inset-x-[-16%] bottom-[-56%] h-20 rounded-[48%] bg-[#e9e1d6]"
      />
      <motion.span
        variants={{
          rest: { color: "#ffffff" },
          hover: { color: "#161616" },
          tap: { color: "#161616" },
        }}
        className="relative z-10"
      >
        Continue
      </motion.span>
    </motion.button>
  );
}
