"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { CheckIcon, DownloadIcon } from "@/lib/icons";

export function DownloadProgressButton() {
  const [progress, setProgress] = useState(0);
  const isActive = progress > 0 && progress < 100;
  const isDone = progress === 100;

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const timer = window.setInterval(() => {
      setProgress((current) => Math.min(current + 4, 100));
    }, 84);

    return () => window.clearInterval(timer);
  }, [isActive]);

  useEffect(() => {
    if (!isDone) {
      return;
    }

    const timer = window.setTimeout(() => setProgress(0), 1500);
    return () => window.clearTimeout(timer);
  }, [isDone]);

  function startDownload() {
    if (progress === 0) {
      setProgress(4);
    }
  }

  return (
    <button
      type="button"
      onClick={startDownload}
      className="relative h-12 min-w-40 overflow-hidden rounded-full border border-white/10 bg-zinc-950 px-5 text-sm font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <motion.span
        className="absolute inset-y-0 left-0 bg-white/14"
        animate={{ width: `${progress}%` }}
        transition={{ ease: "easeOut", duration: 0.18 }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        <AnimatePresence mode="wait" initial={false}>
          {isDone ? (
            <motion.span
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2"
            >
              <CheckIcon className="size-4" />
              Saved
            </motion.span>
          ) : isActive ? (
            <motion.span
              key="progress"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {progress}%
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2"
            >
              <DownloadIcon className="size-4" />
              Download
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}
