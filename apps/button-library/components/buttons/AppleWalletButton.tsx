"use client";

import { motion } from "motion/react";

export function AppleWalletButton() {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.965, y: 1 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      className="relative h-12 overflow-hidden rounded-full bg-[#f4efe6] px-5 text-sm font-semibold text-zinc-950 shadow-[0_18px_44px_rgba(244,239,230,0.14),inset_0_-1px_0_rgba(0,0,0,0.12)] outline-none ring-1 ring-white/15 focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-12 bg-white/55 blur-xl"
        animate={{ x: [-54, 132] }}
        transition={{ duration: 3.6, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
      />
      <span className="relative z-10 flex items-center gap-2">
        <span className="grid size-5 place-items-center rounded-md bg-black text-[9px] text-white">W</span>
        Add to Wallet
      </span>
    </motion.button>
  );
}
