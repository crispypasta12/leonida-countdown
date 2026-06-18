"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { CAST } from "@/lib/content";
import { CastCard } from "./CastCard";
import { CastSpotlight } from "./CastSpotlight";

export function Cast() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMember = CAST[activeIndex] ?? CAST[0];

  const sectionStyle = {
    "--cast-accent": activeMember.accent,
  } as CSSProperties;

  return (
    <section
      id="cast"
      className="relative overflow-hidden px-3 py-14 sm:px-4 sm:py-24"
      style={sectionStyle}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div
        className="absolute inset-0 transition duration-700"
        style={{
          background:
            "radial-gradient(circle at 76% 10%, color-mix(in srgb, var(--cast-accent) 24%, transparent), transparent 30%), radial-gradient(circle at 13% 82%, rgba(22,224,255,0.11), transparent 32%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/70 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-8 grid gap-4 sm:mb-12 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
          <div>
            <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-cyan sm:text-sm sm:tracking-[0.24em]">
              Live character feeds
            </p>
            <h2 className="font-display text-[clamp(2rem,13vw,5.2rem)] uppercase leading-none tracking-normal text-paper sm:text-[clamp(2rem,7vw,5.2rem)]">
              The Cast
            </h2>
            <p className="mt-3 max-w-2xl text-balance text-sm leading-relaxed text-paper/68 sm:mt-4 sm:text-base">
              Lovers, hustlers, moguls and operators. Everyone in Leonida is chasing
              something - and most of them won't stop to ask why.
            </p>
          </div>

          <div className="hidden border-l-2 border-[var(--cast-accent)] bg-white/[0.028] px-4 py-3 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] lg:block">
            <p className="font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-paper/42">
              Active feed
            </p>
            <p className="mt-1 font-display text-3xl uppercase leading-none text-paper">
              {activeMember.name}
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-paper/48">
              {activeMember.role}
            </p>
          </div>
        </header>

        <CastSpotlight member={activeMember} />

        <div className="hidden gap-6 lg:grid lg:grid-cols-[1.34fr_0.84fr]">
          <div className="relative">
            <CastSpotlight member={activeMember} layout="desktop" />
            <div className="pointer-events-none absolute inset-4 rounded-md border border-white/10" />
          </div>

          <div className="grid max-h-[42rem] grid-cols-1 gap-3 overflow-y-auto pr-1">
            {CAST.map((c, i) => (
              <div
                key={c.name}
                className={`relative overflow-hidden rounded-lg bg-white/[0.03] ring-1 ring-white/10 transition duration-500 hover:opacity-100 focus-within:opacity-100 ${
                  i === activeIndex
                    ? "opacity-100 ring-[var(--cast-accent)] shadow-[0_0_0_1px_var(--cast-accent),0_20px_55px_-32px_var(--cast-accent)]"
                    : "opacity-62"
                }`}
              >
                <CastCard
                  member={c}
                  compact
                  spotlight={i === activeIndex}
                  onActivate={() => setActiveIndex(i)}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-ink/88 via-ink/55 to-transparent p-3">
                  <p className="truncate font-display text-2xl uppercase leading-none tracking-wide text-paper">
                    {c.name}
                  </p>
                  <p
                    className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.12em]"
                    style={{ color: c.accent }}
                  >
                    {c.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:hidden">
          {CAST.map((c, i) => (
            <li
              key={c.name}
              className={`relative overflow-hidden rounded-lg bg-white/[0.03] ring-1 ring-white/10 transition duration-500 hover:-translate-y-2 hover:opacity-100 focus-within:-translate-y-2 focus-within:opacity-100 ${
                i === 0 ? "sm:col-span-2 lg:row-span-2" : ""
              } ${
                i === activeIndex
                  ? "opacity-100 shadow-[0_24px_70px_-42px_var(--cast-accent)]"
                  : "opacity-65 lg:opacity-45"
              }`}
            >
              <CastCard
                member={c}
                featured={i === 0}
                spotlight={i === activeIndex}
                onActivate={() => setActiveIndex(i)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
