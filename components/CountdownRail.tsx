"use client";

import { useCountdown } from "@/lib/useCountdown";
import { buildICS, downloadICS, pad, type CountdownTarget } from "@/lib/countdown";

const STORE_LINKS = [
  {
    label: "PlayStation Store",
    href: "https://store.playstation.com/en-us/concept/10000730",
    Logo: PlayStationStoreLogo,
    className: "border-[#2d7dff]/40 text-[#cfe1ff] hover:border-[#2d7dff]/70 hover:bg-[#0b5cff]/18",
  },
  {
    label: "Xbox Store",
    href: "https://www.xbox.com/en-US/games/store/grand-theft-auto-vi/9NL3WWNZLZZN",
    Logo: XboxStoreLogo,
    className: "border-[#6bf56b]/35 text-[#dcffdc] hover:border-[#6bf56b]/60 hover:bg-[#107c10]/18",
  },
] as const;

function PlayStationStoreLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" aria-hidden>
      <path
        d="M10.3 5.2c0-.72.6-1.28 1.32-1.18l4.84.7c2.54.36 4.24 1.96 4.24 4.34 0 2.44-1.5 3.96-4.08 4.42l-1.42.25v-2.68l.86-.16c1.05-.2 1.62-.7 1.62-1.46 0-.82-.56-1.3-1.66-1.46l-2.28-.33v14.7l-3.44-1.08V5.2Z"
        fill="currentColor"
      />
      <path
        d="M15.2 16.08 20 14.5c2.76-.9 5.24-.5 5.68.9.46 1.48-1.36 3.1-4.16 4.02l-6.32 2.08v-2.36l5.18-1.7c.72-.24 1.16-.58 1.05-.86-.11-.3-.72-.32-1.5-.06l-4.73 1.55v-1.99ZM9.52 17.94l-2.8.92c-.78.26-1.22.62-1.1.9.11.28.72.3 1.5.04l2.4-.78v2.2l-1.8.6c-2.78.9-5.25.48-5.7-.92-.45-1.48 1.37-3.1 4.16-4.02l3.34-1.1v2.16Z"
        fill="currentColor"
      />
    </svg>
  );
}

function XboxStoreLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" aria-hidden>
      <circle cx="14" cy="14" r="11" fill="currentColor" opacity="0.22" />
      <path
        d="M7.95 7.48A10.06 10.06 0 0 1 14 5.35c2.29 0 4.4.76 6.08 2.05-1.67.34-3.92 1.57-6.09 3.43-2.14-1.82-4.38-3.03-6.04-3.35Z"
        fill="currentColor"
      />
      <path
        d="M6.2 9.58c1.45.22 3.68 1.48 5.88 3.38-2.23 2.27-4.08 4.94-4.74 7.1A9.64 9.64 0 0 1 4.35 14c0-1.61.4-3.12 1.12-4.45.15.01.4.01.73.03ZM21.82 9.58c.31-.02.56-.02.72-.03A9.57 9.57 0 0 1 23.65 14c0 2.33-.83 4.48-2.22 6.15-.65-2.18-2.54-4.9-4.82-7.2 2.2-1.89 4.02-3.15 5.21-3.37Z"
        fill="currentColor"
      />
      <path
        d="M14.34 15.02c2.42 2.35 4.46 5.03 5.06 6.78A9.6 9.6 0 0 1 14 23.65a9.6 9.6 0 0 1-5.33-1.8c.58-1.75 2.58-4.44 4.98-6.8l.34-.33.35.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CountdownRail({ target }: { target: CountdownTarget }) {
  const parts = useCountdown(target.targetMs);
  const done = parts?.done ?? false;

  function handleCalendar() {
    const ics = buildICS({
      uid: `gtavi-${target.key}@gta-vi-countdown`,
      title: target.key === "preorder" ? "GTA VI - Pre-Orders Open" : "GTA VI - Launch Day",
      description:
        target.key === "preorder"
          ? "Grand Theft Auto VI pre-orders open. Reserve your trip to Leonida."
          : "Grand Theft Auto VI releases. Welcome to Leonida.",
      startMs: target.targetMs,
    });
    downloadICS(`gtavi-${target.key}.ics`, ics);
  }

  const value = parts
    ? done
      ? target.liveTitle
      : `${pad(parts.days, parts.days > 99 ? 3 : 2)}d ${pad(parts.hours)}h ${pad(parts.minutes)}m`
    : "--d --h --m";

  return (
    <aside className="relative min-w-0 overflow-hidden rounded-md border border-cyan/20 bg-white/[0.055] p-3 shadow-[0_18px_54px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl sm:p-4">
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.08),transparent_42%,rgba(22,224,255,0.09))]" />
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-stretch">
        <div className="min-w-0">
          <p className="mb-1 flex items-center gap-2 text-[0.56rem] font-black uppercase tracking-[0.16em] text-cyan sm:text-[0.62rem] sm:tracking-[0.2em]">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_12px_rgba(22,224,255,0.7)]" />
            {target.kicker}
          </p>
          <h3 className="font-display text-[1.55rem] uppercase leading-none tracking-wide text-paper sm:text-3xl">
            {target.title}
          </h3>
        </div>

        <div className="grid grid-cols-[1fr_auto] items-end gap-3 sm:min-w-[16rem] lg:min-w-0">
          <div>
            <p className="font-mono text-xl font-black uppercase tabular text-paper sm:text-2xl">{value}</p>
            <p className="mt-1 text-[0.68rem] font-medium text-paper/58 sm:text-xs">{target.whenLabel}</p>
          </div>
          <button
            type="button"
            onClick={handleCalendar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-cyan/35 bg-ink/35 text-cyan transition hover:bg-white/10"
            aria-label={`Add ${target.title} to calendar`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative mt-3 grid grid-cols-2 gap-2 sm:mt-4 lg:grid-cols-1 xl:grid-cols-2">
        {STORE_LINKS.map(({ label, href, Logo, className }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${label} page for Grand Theft Auto VI`}
            className={`group/store relative isolate inline-flex min-h-11 min-w-0 items-center justify-center gap-2 overflow-hidden rounded-md border bg-ink/42 px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition hover:text-paper active:scale-[0.98] ${className}`}
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.17)_46%,transparent_62%)] opacity-0 transition duration-700 group-hover/store:translate-x-full group-hover/store:opacity-100" />
            <Logo className="relative h-5 w-5 shrink-0" />
            <span className="relative min-w-0 text-center text-[0.68rem] font-black uppercase leading-tight tracking-[0.07em]">
              {label}
            </span>
          </a>
        ))}
      </div>
    </aside>
  );
}
