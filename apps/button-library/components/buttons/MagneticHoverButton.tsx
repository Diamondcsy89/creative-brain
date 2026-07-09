"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { MouseEvent } from "react";

export function MagneticHoverButton() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function handlePointerMove(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    x.set(offsetX * 0.18);
    y.set(offsetY * 0.24);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      type="button"
      style={{ x: springX, y: springY }}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      whileTap={{ scale: 0.96 }}
      className="h-12 rounded-full bg-[#f4eee4] px-6 text-sm font-medium text-stone-950 shadow-[0_16px_42px_rgba(244,238,228,0.12)] outline-none ring-1 ring-white/15 focus-visible:ring-2 focus-visible:ring-white/50"
    >
      Get the App
    </motion.button>
  );
}
