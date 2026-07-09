"use client";

import { motion } from "motion/react";

export function LiquidFillButton() {
  return (
    <motion.button
      type="button"
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className="relative h-12 overflow-hidden rounded-full border border-white/10 bg-zinc-950 px-6 text-sm font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <motion.span
        variants={{
          rest: { y: "108%" },
          hover: { y: "24%" },
          tap: { y: "4%" }
        }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        className="absolute inset-x-[-10%] bottom-[-28%] h-20 rounded-[46%] bg-[#d8f6ef]"
      />
      <motion.span
        variants={{
          rest: { color: "#ffffff" },
          hover: { color: "#0c1412" },
          tap: { color: "#0c1412" }
        }}
        className="relative z-10"
      >
        Start Flow
      </motion.span>
    </motion.button>
  );
}
