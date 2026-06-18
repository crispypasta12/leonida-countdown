"use client";

import { useEffect, useRef, useState } from "react";
import { diffToParts, type TimeParts } from "./countdown";

/**
 * Reusable countdown hook. Ticks once per second, self-corrects against the
 * wall clock (so background-tab throttling never drifts), and reports `done`
 * the instant the target passes.
 *
 * Returns `null` until mounted to avoid SSR/client hydration mismatches — the
 * server has no idea what second it is on the client.
 */
export function useCountdown(targetMs: number): TimeParts | null {
  const [parts, setParts] = useState<TimeParts | null>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const now = Date.now();
      setParts(diffToParts(targetMs, now));
      // Align the next tick to the top of the next second.
      const drift = now % 1000;
      timeout = setTimeout(tick, 1000 - drift);
    };

    tick();
    return () => {
      clearTimeout(timeout);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [targetMs]);

  return parts;
}
