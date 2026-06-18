"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A single glowing flip-tile. When the digit changes, the new face flips in
 * from the top while the old face flips out — a classic split-flap roll.
 * Honors prefers-reduced-motion by simply swapping the value with no motion.
 */
export function FlipDigit({ value }: { value: string }) {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (value === current) return;
    if (reduced.current) {
      setCurrent(value);
      return;
    }
    setPrevious(current);
    setCurrent(value);
    setFlipping(true);
    const t = setTimeout(() => setFlipping(false), 360);
    return () => clearTimeout(t);
  }, [value, current]);

  return (
    <span className="flip-perspective relative inline-block">
      <span
        aria-hidden
        className="tabular relative z-10 grid place-items-center rounded-lg
                   bg-gradient-to-b from-white/[0.14] to-white/[0.03]
                   px-[0.15em] py-[0.08em] font-mono font-bold
                   text-paper ring-1 ring-white/15
                   shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-8px_18px_rgba(0,0,0,0.55)]"
        style={{ backfaceVisibility: "hidden" }}
      >
        {/* Center seam line of the split-flap */}
        <span className="pointer-events-none absolute left-0 right-0 top-1/2 z-20 h-px -translate-y-1/2 bg-black/40" />
        <span
          key={current}
          className={flipping ? "block animate-flip-in" : "block"}
          style={{ transformOrigin: "center" }}
        >
          {current}
        </span>
      </span>
    </span>
  );
}
