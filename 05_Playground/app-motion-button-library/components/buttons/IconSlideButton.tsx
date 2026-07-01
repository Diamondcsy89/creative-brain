"use client";

import { motion } from "motion/react";
import { ArrowRightIcon } from "@/lib/icons";

export function IconSlideButton() {
  return (
    <motion.button
      type="button"
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      className="group relative h-12 overflow-hidden rounded-full bg-[#ece7dd] px-6 text-sm font-medium text-zinc-950 outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <motion.span
        variants={{
          rest: { x: 0 },
          hover: { x: -8 }
        }}
        transition={{ type: "spring", stiffness: 360, damping: 28 }}
        className="inline-block"
      >
        Next Step
      </motion.span>
      <motion.span
        variants={{
          rest: { x: 18, opacity: 0 },
          hover: { x: 0, opacity: 1 }
        }}
        transition={{ type: "spring", stiffness: 360, damping: 28 }}
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        <ArrowRightIcon className="size-4" />
      </motion.span>
    </motion.button>
  );
}
