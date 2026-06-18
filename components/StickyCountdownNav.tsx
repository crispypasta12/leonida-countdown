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
      className="group inline-flex min-h-9 items-center gap-2 whitespace-nowrap rounded-md border border-white/[0.14] bg-white/[0.045] px-3 text-[0.65rem] font-black uppercase tracking-[0.14em] text-paper/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:border-white/25 hover:bg-white/[0.075] focus-visible:bg-white/10 sm:text-xs"
      aria-label={`${target.title}: ${value}`}
    >
      <span className={`h-2 w-2 rounded-full ${dot} animate-pulse-glow`} />
      <span className={accent}>{target.key === "release" ? "Launch" : "Pre"}</span>
      <span className="font-mono tabular tracking-normal text-paper group-hover:text-white">{value}</span>
    </a>
  );
}

export function StickyCountdownNav() {
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [activeHref, setActiveHref] = useState("#top");

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);

    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.62);

      const current = NAV_LINKS.reduce(
        (active, link) => {
          const section = document.querySelector(link.href);
          if (!section) return active;
          const top = section.getBoundingClientRect().top;
          return top <= window.innerHeight * 0.42 ? link.href : active;
        },
        "#top"
      );
      setActiveHref(current);
    };

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
      <div className="mx-auto flex max-w-full items-center gap-2 overflow-x-auto rounded-md border border-white/[0.14] bg-ink/78 p-1.5 shadow-[0_18px_70px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/[0.08] backdrop-blur-2xl sm:max-w-fit">
        <a
          href="#top"
          aria-current={activeHref === "#top" ? "page" : undefined}
          className={`hidden min-h-9 whitespace-nowrap rounded-sm border-l-2 px-2.5 py-2 text-[0.68rem] font-black uppercase tracking-[0.18em] transition sm:inline-flex ${
            activeHref === "#top"
              ? "border-pink bg-white/[0.08] text-paper"
              : "border-white/20 text-paper/50 hover:bg-white/[0.06] hover:text-paper"
          }`}
        >
          VI
        </a>
        <div className="flex items-center gap-1.5 pr-1">
          <MiniTarget target={TARGETS[1]} />
          <MiniTarget target={TARGETS[0]} />
        </div>
        <div className="hidden h-8 w-px bg-white/10 sm:block" />
        <div className="flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = activeHref === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`min-h-9 whitespace-nowrap rounded-sm border-l-2 px-2.5 py-2 text-[0.68rem] font-black uppercase tracking-[0.14em] transition focus-visible:bg-white/10 focus-visible:text-paper sm:text-xs ${
                  active
                    ? "border-cyan bg-white/[0.08] text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "border-transparent text-paper/54 hover:border-white/20 hover:bg-white/[0.055] hover:text-paper"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
