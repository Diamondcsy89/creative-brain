"use client";

import { AnimatePresence, motion } from "motion/react";
import { MouseEvent, useState } from "react";

type Ripple = {
  id: number;
  x: number;
  y: number;
};

export function RippleFeedbackButton() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const ripple = {
      id: Date.now(),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    setRipples((current) => [...current, ripple]);
    window.setTimeout(() => {
      setRipples((current) => current.filter((item) => item.id !== ripple.id));
    }, 620);
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      className="relative h-12 overflow-hidden rounded-full border border-white/10 bg-zinc-900 px-6 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <span className="relative z-10">Tap Action</span>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.28 }}
            animate={{ scale: 3.4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="absolute size-16 rounded-full bg-white"
            style={{ left: ripple.x - 32, top: ripple.y - 32 }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}
