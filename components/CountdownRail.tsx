"use client";

import { useCountdown } from "@/lib/useCountdown";
import { buildICS, downloadICS, pad, type CountdownTarget } from "@/lib/countdown";

export function CountdownRail({ target }: { target: CountdownTarget }) {
  const parts = useCountdown(target.targetMs);
  const done = parts?.done ?? false;

  function handleCalendar() {
    const ics = buildICS({
      uid: `gtavi-${target.key}@leonida-countdown`,
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
    </aside>
  );
}
