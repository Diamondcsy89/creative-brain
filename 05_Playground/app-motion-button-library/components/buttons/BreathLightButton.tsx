"use client";

import { motion } from "motion/react";

export function BreathLightButton() {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      className="relative h-12 rounded-full bg-zinc-950 px-6 text-sm font-medium text-white outline-none ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-[-2px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),rgba(125,211,252,0.16)_42%,transparent_70%)] blur-md"
        animate={{ opacity: [0.18, 0.55, 0.18], scale: [0.96, 1.06, 0.96] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative z-10">Listening</span>
    </motion.button>
  );
}
