"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { CheckIcon } from "@/lib/icons";

export function SuccessStateButton() {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) {
      return;
    }

    const timer = window.setTimeout(() => setSaved(false), 1500);
    return () => window.clearTimeout(timer);
  }, [saved]);

  return (
    <motion.button
      type="button"
      onClick={() => setSaved(true)}
      whileTap={{ scale: 0.96 }}
      className="h-12 min-w-32 overflow-hidden rounded-full bg-white px-5 text-sm font-medium text-zinc-950 outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <AnimatePresence mode="wait" initial={false}>
        {saved ? (
          <motion.span
            key="saved"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex items-center justify-center gap-2 text-emerald-950"
          >
            <CheckIcon className="size-4" />
            Done
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            Save
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
