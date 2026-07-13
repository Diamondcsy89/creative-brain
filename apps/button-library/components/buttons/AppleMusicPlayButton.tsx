"use client";

import { motion } from "motion/react";

export function AppleMusicPlayButton() {
  return (
    <motion.button
      type="button"
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
      className="flex h-12 items-center gap-3 rounded-full border border-white/10 bg-[#141414] px-4 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <motion.span
        variants={{
          hover: { scale: 1.08 },
        }}
        transition={{ type: "spring", stiffness: 360, damping: 22 }}
        className="grid size-8 place-items-center rounded-full bg-white text-zinc-950"
      >
        <motion.span
          variants={{
            hover: { x: 1 },
          }}
          className="ml-0.5 block size-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-current"
        />
      </motion.span>
      Play Preview
    </motion.button>
  );
}
