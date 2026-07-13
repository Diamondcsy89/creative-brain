"use client";

import { motion } from "motion/react";
import { DownloadIcon } from "@/lib/icons";

export function AppStoreDownloadButton() {
  return (
    <motion.button
      type="button"
      whileHover="hover"
      whileTap={{ scale: 0.965 }}
      className="relative h-12 overflow-hidden rounded-full bg-[#f7f7f2] px-5 text-sm font-semibold text-zinc-950 shadow-[0_18px_40px_rgba(255,255,255,0.1)] outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <motion.span
        variants={{
          hover: { width: "100%" },
        }}
        initial={{ width: "0%" }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 left-0 bg-black/[0.06]"
      />
      <span className="relative z-10 flex items-center gap-2">
        <DownloadIcon className="size-4" />
        Download
      </span>
    </motion.button>
  );
}
