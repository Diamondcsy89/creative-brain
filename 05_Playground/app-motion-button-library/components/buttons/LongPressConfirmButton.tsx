"use client";

import { motion, useAnimationControls } from "motion/react";
import { PointerEvent, useState } from "react";
import { CheckIcon } from "@/lib/icons";

export function LongPressConfirmButton() {
  const controls = useAnimationControls();
  const [confirmed, setConfirmed] = useState(false);

  async function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setConfirmed(false);
    await controls.start({
      scaleX: 1,
      transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] }
    });
    setConfirmed(true);
  }

  function handlePointerUp() {
    if (!confirmed) {
      controls.start({ scaleX: 0, transition: { duration: 0.22 } });
    }
  }

  function handlePointerLeave() {
    if (!confirmed) {
      controls.start({ scaleX: 0, transition: { duration: 0.22 } });
    }
  }

  return (
    <button
      type="button"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      className="relative h-12 min-w-40 overflow-hidden rounded-full border border-white/10 bg-zinc-950 px-5 text-sm font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <motion.span
        initial={{ scaleX: 0 }}
        animate={controls}
        className="absolute inset-y-0 left-0 w-full origin-left bg-[#f6e7bf]"
      />
      <span className="relative z-10 flex items-center justify-center gap-2 mix-blend-difference">
        {confirmed ? <CheckIcon className="size-4" /> : null}
        {confirmed ? "Confirmed" : "Hold to confirm"}
      </span>
    </button>
  );
}
