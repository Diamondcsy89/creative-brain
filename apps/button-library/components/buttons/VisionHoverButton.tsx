"use client";

import { motion } from "motion/react";

export function VisionHoverButton() {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -4, scale: 1.015 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="relative h-12 overflow-hidden rounded-full border border-white/14 bg-white/[0.07] px-6 text-sm font-medium text-white shadow-[0_24px_70px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.12)] outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent"
        animate={{ opacity: [0.22, 0.7, 0.22] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative z-10">Open Spatial View</span>
    </motion.button>
  );
}
