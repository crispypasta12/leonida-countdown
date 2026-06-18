"use client";

import { useEffect, useState } from "react";
import { TARGETS, pad, type CountdownTarget } from "@/lib/countdown";
import { useCountdown } from "@/lib/useCountdown";

const NAV_LINKS = [
  { href: "#cast", label: "Cast" },
  { href: "#cover", label: "Cover" },
  { href: "#postcards", label: "Locations" },
  { href: "#scenes", label: "Scenes" },
] as const;

function MiniTarget({ target }: { target: CountdownTarget }) {
  const parts = useCountdown(target.targetMs);
  const accent = target.accent === "pink" ? "text-pink" : "text-cyan";
  const dot = target.accent === "pink" ? "bg-pink" : "bg-cyan";
  const value = parts
    ? parts.done
      ? "Live"
      : `${pad(parts.days, parts.days > 99 ? 3 : 2)}d ${pad(parts.hours)}h`
    : "--d --h";

  return (
    <a
      href={target.key === "release" ? "#top" : "#cover"}
      className="inline-flex min-h-9 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.06] px-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-paper/80 transition hover:bg-white/10 focus-visible:bg-white/10 sm:text-xs"
      aria-label={`${target.title}: ${value}`}
    >
      <span className={`h-2 w-2 rounded-full ${dot} animate-pulse-glow`} />
      <span className={accent}>{target.key === "release" ? "Launch" : "Pre"}</span>
      <span className="font-mono tabular tracking-normal text-paper">{value}</span>
    </a>
  );
}

export function StickyCountdownNav() {
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);

    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.62);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-3 top-3 z-50 mx-auto max-w-5xl transition duration-500 sm:top-4 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
      } ${reduceMotion ? "transition-none" : ""}`}
      aria-label="Countdown and section navigation"
    >
      <div className="mx-auto flex max-w-fit items-center gap-2 overflow-x-auto rounded-lg border border-white/15 bg-ink/72 p-1.5 shadow-[0_18px_70px_rgba(0,0,0,0.34)] ring-1 ring-white/10 backdrop-blur-2xl">
        <div className="flex items-center gap-2 pr-1">
          <MiniTarget target={TARGETS[1]} />
          <MiniTarget target={TARGETS[0]} />
        </div>
        <div className="hidden h-8 w-px bg-white/10 sm:block" />
        <div className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="min-h-9 whitespace-nowrap rounded-md px-2.5 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-paper/58 transition hover:bg-white/10 hover:text-paper focus-visible:bg-white/10 focus-visible:text-paper sm:text-xs"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
