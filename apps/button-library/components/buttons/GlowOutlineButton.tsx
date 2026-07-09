"use client";

import { motion } from "motion/react";
import { SparkIcon } from "@/lib/icons";

export function GlowOutlineButton() {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      whileHover="hover"
      initial="rest"
      className="relative h-12 overflow-hidden rounded-full p-px outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <motion.span
        variants={{
          rest: { rotate: 0 },
          hover: { rotate: 180 }
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-[-40%] bg-[conic-gradient(from_90deg,transparent_0deg,rgba(255,255,255,0.18)_70deg,rgba(186,230,253,0.52)_118deg,rgba(250,204,21,0.34)_160deg,transparent_230deg)]"
      />
      <span className="relative flex h-full items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <SparkIcon className="size-4 text-sky-100" />
        Generate
      </span>
    </motion.button>
  );
}
