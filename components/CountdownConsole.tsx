"use client";

import { useCountdown } from "@/lib/useCountdown";
import {
  buildICS,
  downloadICS,
  pad,
  type CountdownTarget,
} from "@/lib/countdown";
import { FlipDigit } from "./FlipDigit";

type CountdownVariant = "standard" | "feature" | "compact";

const ACCENTS = {
  cyan: {
    text: "text-cyan",
    glow: "shadow-neon-cyan",
    dot: "bg-cyan",
    border: "border-cyan/30",
    hex: "#16E0FF",
  },
  pink: {
    text: "text-pink",
    glow: "shadow-neon-pink",
    dot: "bg-pink",
    border: "border-pink/30",
    hex: "#FF2E97",
  },
} as const;

function DigitGroup({
  value,
  label,
  variant,
}: {
  value: string;
  label: string;
  variant: CountdownVariant;
}) {
  const digitSize =
    variant === "feature"
      ? "text-[clamp(1.35rem,6.2vw,3rem)]"
      : variant === "compact"
        ? "text-[clamp(1.05rem,4.8vw,1.8rem)]"
        : "text-[clamp(1.3rem,4.6vw,2.15rem)]";

  return (
    <div className="flex min-w-0 flex-col items-center gap-1.5">
      <div className={`flex gap-[2px] leading-none ${digitSize}`}>
        {value.split("").map((d, i) => (
          <FlipDigit key={i} value={d} />
        ))}
      </div>
      <span className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-paper/55 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

function Separator({ variant }: { variant: CountdownVariant }) {
  return (
    <span
      aria-hidden
      className={`mono hidden self-start pt-[0.35em] font-bold text-paper/25 sm:block ${
        variant === "feature"
          ? "text-[clamp(1.7rem,5vw,3.6rem)]"
          : variant === "compact"
            ? "text-[clamp(1.1rem,4vw,1.9rem)]"
            : "text-[clamp(1.4rem,5vw,2.6rem)]"
      }`}
    >
      :
    </span>
  );
}

export function CountdownConsole({
  target,
  variant = "standard",
}: {
  target: CountdownTarget;
  variant?: CountdownVariant;
}) {
  const parts = useCountdown(target.targetMs);
  const a = ACCENTS[target.accent];
  const done = parts?.done ?? false;

  function handleCalendar() {
    const ics = buildICS({
      uid: `gtavi-${target.key}@leonida-countdown`,
      title:
        target.key === "preorder"
          ? "GTA VI - Pre-Orders Open"
          : "GTA VI - Launch Day",
      description:
        target.key === "preorder"
          ? "Grand Theft Auto VI pre-orders open. Reserve your trip to Leonida."
          : "Grand Theft Auto VI releases. Welcome to Leonida.",
      startMs: target.targetMs,
    });
    downloadICS(`gtavi-${target.key}.ics`, ics);
  }

  const srLabel = parts
    ? done
      ? `${target.title}: live now`
      : `${target.title}: ${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes, ${parts.seconds} seconds remaining`
    : `${target.title}: loading countdown`;

  const shell =
    variant === "feature"
      ? `relative w-full max-w-3xl overflow-hidden rounded-lg border border-white/15
         bg-ink/50 p-4 shadow-[0_0_70px_rgba(255,46,151,0.28),0_0_90px_rgba(22,224,255,0.14)]
         ring-1 ring-white/10 backdrop-blur-2xl sm:p-5`
      : variant === "compact"
        ? `relative w-full max-w-lg overflow-hidden rounded-lg border ${a.border}
           bg-white/[0.07] p-4 backdrop-blur-xl ${a.glow} sm:p-5`
        : `relative w-full max-w-md overflow-hidden rounded-lg border ${a.border}
           bg-white/[0.06] p-5 backdrop-blur-xl ${a.glow} sm:p-6`;

  const titleSize =
    variant === "feature"
      ? "text-3xl sm:text-4xl lg:text-5xl"
      : "text-2xl sm:text-3xl";

  const digitGap = variant === "feature" ? "gap-1.5 sm:gap-2.5" : "gap-1";

  return (
    <div className={shell}>
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            variant === "feature"
              ? `radial-gradient(circle at 20% 0%, ${a.hex}45, transparent 34%), radial-gradient(circle at 86% 110%, #FF2E9745, transparent 34%)`
              : `radial-gradient(circle at 15% 0%, ${a.hex}28, transparent 42%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      <div className="relative mb-4 flex items-center justify-between gap-2">
        <div>
          <div
            className={`flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.25em] ${a.text}`}
          >
            <span className={`inline-block h-2 w-2 rounded-full ${a.dot} animate-pulse-glow`} />
            {target.kicker}
          </div>
          <h3 className={`font-display uppercase leading-none tracking-wide text-paper ${titleSize}`}>
            {target.title}
          </h3>
        </div>
      </div>

      <div aria-live="polite" className="sr-only">
        {srLabel}
      </div>

      {!parts ? (
        <div className="h-[88px] animate-pulse rounded-lg bg-white/5" aria-hidden />
      ) : done ? (
        <div className="relative py-3 text-center" role="status">
          <div className={`font-display text-3xl uppercase tracking-wide ${a.text} sm:text-4xl`}>
            {target.liveTitle}
          </div>
          <p className="mx-auto mt-2 max-w-xs text-sm text-paper/70">{target.liveBlurb}</p>
        </div>
      ) : (
        <div className={`relative flex items-start justify-center ${digitGap}`} aria-hidden>
          <DigitGroup value={pad(parts.days, parts.days > 99 ? 3 : 2)} label="Days" variant={variant} />
          <Separator variant={variant} />
          <DigitGroup value={pad(parts.hours)} label="Hrs" variant={variant} />
          <Separator variant={variant} />
          <DigitGroup value={pad(parts.minutes)} label="Min" variant={variant} />
          <Separator variant={variant} />
          <DigitGroup value={pad(parts.seconds)} label="Sec" variant={variant} />
        </div>
      )}

      <div className="relative mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
        <span className="text-xs font-medium text-paper/60">{target.whenLabel}</span>
        <button
          type="button"
          onClick={handleCalendar}
          className={`group inline-flex items-center gap-1.5 rounded-full border ${a.border}
                      bg-white/5 px-3.5 py-1.5 text-xs font-semibold ${a.text}
                      transition hover:bg-white/10`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Add to calendar
        </button>
      </div>
    </div>
  );
}
