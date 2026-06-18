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
      className="relative overflow-hidden px-4 py-16 sm:py-20"
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
        <header className="mb-8 text-center sm:mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-cyan sm:text-sm">
            Live character feeds
          </p>
          <h2 className="font-display text-[clamp(2rem,7vw,4.6rem)] uppercase leading-none tracking-normal text-paper">
            The Cast
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-paper/65">
            Lovers, hustlers, moguls and operators. Everyone in Leonida is chasing
            something - and most of them won't stop to ask why.
          </p>
        </header>

        <CastSpotlight member={activeMember} />

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[19rem] lg:grid-cols-4">
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
