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
      ? "text-[clamp(1.2rem,5.4vw,3.35rem)]"
      : variant === "compact"
        ? "text-[clamp(0.95rem,4.1vw,1.9rem)]"
        : "text-[clamp(1.3rem,4.5vw,2.2rem)]";

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
      <div className={`flex max-w-full gap-[3px] leading-none ${digitSize}`}>
        {value.split("").map((d, i) => (
          <FlipDigit key={i} value={d} />
        ))}
      </div>
      <span className="text-[0.55rem] font-bold uppercase tracking-[0.14em] text-paper/48 sm:text-xs sm:tracking-[0.18em]">
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
      ? `relative min-w-0 w-full overflow-hidden rounded-md border border-white/[0.14]
         bg-[linear-gradient(145deg,rgba(11,6,20,0.9),rgba(31,16,46,0.62))]
         p-3 shadow-[0_28px_90px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)]
         ring-1 ring-white/10 backdrop-blur-2xl sm:p-5`
      : variant === "compact"
        ? `relative min-w-0 w-full overflow-hidden rounded-md border border-white/[0.12]
           bg-[linear-gradient(150deg,rgba(253,246,238,0.08),rgba(253,246,238,0.025))]
           p-3 shadow-[0_22px_70px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)]
           backdrop-blur-xl sm:p-5`
        : `relative min-w-0 w-full max-w-md overflow-hidden rounded-md border ${a.border}
           bg-white/[0.055] p-5 backdrop-blur-xl ${a.glow} sm:p-6`;

  const titleSize =
    variant === "feature"
      ? "text-[1.65rem] sm:text-4xl lg:text-[3.25rem]"
      : "text-xl sm:text-[2rem]";

  const digitGap = variant === "feature" ? "gap-1.5 sm:gap-3" : "gap-1 sm:gap-1.5";

  return (
    <div className={shell}>
      <div
        className="pointer-events-none absolute inset-0 opacity-55"
        style={{
          background:
            variant === "feature"
              ? `linear-gradient(110deg, rgba(255,255,255,0.1), transparent 28%, transparent 72%, rgba(22,224,255,0.08)), radial-gradient(circle at 16% 0%, ${a.hex}36, transparent 34%)`
              : `linear-gradient(120deg, rgba(255,255,255,0.08), transparent 36%), radial-gradient(circle at 15% 0%, ${a.hex}22, transparent 42%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />

      <div className="relative mb-3 flex items-start justify-between gap-2 sm:mb-4">
        <div className="min-w-0">
          <div
            className={`mb-1 flex items-center gap-2 text-[0.58rem] font-black uppercase tracking-[0.16em] ${a.text} sm:text-[0.65rem] sm:tracking-[0.2em]`}
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
        <div className={`relative grid grid-cols-2 items-start justify-center ${digitGap} sm:flex`} aria-hidden>
          <DigitGroup value={pad(parts.days, parts.days > 99 ? 3 : 2)} label="Days" variant={variant} />
          <Separator variant={variant} />
          <DigitGroup value={pad(parts.hours)} label="Hrs" variant={variant} />
          <Separator variant={variant} />
          <DigitGroup value={pad(parts.minutes)} label="Min" variant={variant} />
          <Separator variant={variant} />
          <DigitGroup value={pad(parts.seconds)} label="Sec" variant={variant} />
        </div>
      )}

      <div className="relative mt-4 flex flex-col items-stretch justify-between gap-2 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:gap-3">
        <span className="text-center text-[0.7rem] font-medium text-paper/60 sm:text-left sm:text-xs">{target.whenLabel}</span>
        <button
          type="button"
          onClick={handleCalendar}
          className={`group inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-md border ${a.border}
                      bg-ink/30 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] ${a.text}
                      transition hover:bg-white/10 sm:w-auto`}
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
