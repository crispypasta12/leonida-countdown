"use client";

import Image from "next/image";
import { useState } from "react";
import { POSTCARDS } from "@/lib/content";

const ROUTE_POINTS = [
  { name: "Mount Kalaga", x: 36, y: 16, code: "MK-01", status: "Signal weak" },
  { name: "Vice City", x: 72, y: 26, code: "VC-02", status: "Heat rising" },
  { name: "Ambrosia", x: 28, y: 42, code: "AM-03", status: "Low profile" },
  { name: "Grassrivers", x: 43, y: 60, code: "GR-04", status: "No dry exits" },
  { name: "Port Gellhorn", x: 18, y: 72, code: "PG-05", status: "Night shift" },
  { name: "Leonida Keys", x: 80, y: 76, code: "LK-06", status: "Boat ready" },
] as const;

export function LeonidaRouteMap() {
  const postcards = new Map(POSTCARDS.map((item) => [item.name, item]));
  const [activeName, setActiveName] = useState<(typeof ROUTE_POINTS)[number]["name"]>("Vice City");
  const activePoint = ROUTE_POINTS.find((point) => point.name === activeName) ?? ROUTE_POINTS[1];
  const activePostcard = postcards.get(activePoint.name) ?? POSTCARDS[0];

  return (
    <section
      id="route-map"
      className="relative overflow-hidden border-y border-white/10 bg-[#080713] px-3 py-16 sm:px-4 sm:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(22,224,255,0.13),transparent_30%),radial-gradient(circle_at_14%_72%,rgba(255,46,151,0.14),transparent_34%)]" />
      <div className="absolute inset-0 opacity-[0.055] travel-grid" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <header className="mb-8 grid gap-4 lg:grid-cols-[0.74fr_0.26fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-sunset sm:text-sm sm:tracking-[0.35em]">
              Leonida route board
            </p>
            <h2 className="font-display text-[clamp(2rem,12vw,4.8rem)] uppercase leading-none tracking-normal text-paper sm:text-[clamp(2rem,7vw,4.8rem)]">
              One state. Too many exits.
            </h2>
            <p className="mt-3 max-w-2xl text-balance text-sm leading-relaxed text-paper/65 sm:mt-4 sm:text-base">
              Follow the neon trail from Vice City glass to wetland backroads,
              coastal hideouts, and mountain static.
            </p>
          </div>

          <div className="hidden border-l-2 border-cyan/50 bg-white/[0.035] px-4 py-3 text-right lg:block">
            <p className="font-mono text-[0.62rem] font-black uppercase tracking-[0.24em] text-paper/44">
              Active stop
            </p>
            <p className="mt-1 font-display text-3xl uppercase leading-none text-paper">
              {activePoint.code}
            </p>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-[0.36fr_0.64fr]">
          <aside className="relative overflow-hidden rounded-md border border-white/[0.12] bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="relative aspect-[16/10] overflow-hidden bg-ink">
              <Image
                key={activePostcard.src}
                src={activePostcard.src}
                alt={`${activePoint.name} route preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 36vw"
                loading="eager"
                className="object-cover transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/28 to-transparent" />
              <div
                className="absolute inset-0 mix-blend-screen opacity-35"
                style={{
                  background: `radial-gradient(circle at 50% 100%, ${activePostcard.glow}, transparent 58%)`,
                }}
              />
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[0.62rem] font-black uppercase tracking-[0.22em] text-paper/42">
                    {activePoint.code}
                  </p>
                  <h3 className="mt-1 font-display text-[clamp(2.1rem,8vw,3.6rem)] uppercase leading-none text-paper lg:text-[3.1rem]">
                    {activePoint.name}
                  </h3>
                </div>
                <span
                  className="mt-1 border-l-2 bg-white/[0.055] px-2.5 py-1 font-mono text-[0.58rem] font-black uppercase tracking-[0.18em]"
                  style={{ borderLeftColor: activePostcard.glow, color: activePostcard.glow }}
                >
                  Live
                </span>
              </div>

              <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper/70">
                {activePostcard.tagline}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {ROUTE_POINTS.map((point, index) => {
                  const postcard = postcards.get(point.name);
                  const active = activeName === point.name;

                  return (
                    <button
                      key={point.name}
                      type="button"
                      onClick={() => setActiveName(point.name)}
                      onMouseEnter={() => setActiveName(point.name)}
                      className={`min-h-12 border border-white/[0.12] border-l-[3px] bg-white/[0.035] px-2.5 py-2 text-left transition hover:bg-white/[0.075] focus-visible:bg-white/[0.075] ${
                        active ? "text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" : "text-paper/56"
                      }`}
                      style={{ borderLeftColor: active ? postcard?.glow : "rgba(253,246,238,0.16)" }}
                      aria-pressed={active}
                    >
                      <span className="block font-mono text-[0.55rem] font-black uppercase tracking-[0.18em]">
                        Stop {index + 1}
                      </span>
                      <span className="mt-1 block truncate text-xs font-bold uppercase tracking-[0.08em]">
                        {point.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="relative overflow-hidden rounded-md border border-white/[0.12] bg-white/[0.035] p-3 shadow-[0_24px_90px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-5">
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(253,246,238,0.06),transparent_32%,rgba(22,224,255,0.08)_68%,transparent)]" />
            <div className="relative min-h-[31rem] overflow-hidden rounded-sm bg-ink/72 sm:min-h-[38rem]">
              <div className="absolute inset-0 opacity-[0.11] travel-grid" aria-hidden />
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M28 6 C44 9, 62 8, 76 18 C91 29, 92 48, 86 66 C80 83, 62 91, 43 86 C25 81, 10 68, 8 51 C6 34, 13 15, 28 6Z"
                  fill="rgba(253,246,238,0.035)"
                  stroke="rgba(253,246,238,0.12)"
                  strokeWidth="0.5"
                />
                <path
                  d="M53 10 C49 22, 53 34, 45 43 C38 51, 37 61, 44 72 C50 81, 48 88, 43 96"
                  fill="none"
                  stroke="rgba(22,224,255,0.12)"
                  strokeWidth="0.45"
                  strokeDasharray="1.8 1.8"
                />
                <path
                  d="M36 16 C48 22, 62 18, 72 26 S86 56, 80 76 C62 76, 55 64, 43 60 S24 62, 18 72 C18 58, 22 48, 28 42 S32 24, 36 16"
                  fill="none"
                  stroke="rgba(253,246,238,0.2)"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                />
                <path
                  className="route-pulse"
                  d="M36 16 C48 22, 62 18, 72 26 S86 56, 80 76 C62 76, 55 64, 43 60 S24 62, 18 72 C18 58, 22 48, 28 42 S32 24, 36 16"
                  fill="none"
                  stroke={activePostcard.glow}
                  strokeWidth="0.68"
                  strokeLinecap="round"
                />
              </svg>

              <div
                className="pointer-events-none absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition duration-500"
                style={{
                  left: `${activePoint.x}%`,
                  top: `${activePoint.y}%`,
                  backgroundColor: `${activePostcard.glow}4D`,
                }}
              />

              {ROUTE_POINTS.map((point, index) => {
                const postcard = postcards.get(point.name);
                if (!postcard) return null;
                const active = activeName === point.name;

                return (
                  <button
                    key={point.name}
                    type="button"
                    onClick={() => setActiveName(point.name)}
                    onMouseEnter={() => setActiveName(point.name)}
                    onFocus={() => setActiveName(point.name)}
                    className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 text-left"
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    aria-pressed={active}
                    aria-label={`Show route stop ${index + 1}: ${point.name}`}
                  >
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-sm border bg-ink/82 font-mono text-[0.68rem] font-black text-paper shadow-[0_18px_40px_rgba(0,0,0,0.36)] backdrop-blur-sm transition ${
                        active
                          ? "scale-110 border-white/40"
                          : "border-white/[0.16] group-hover:scale-105 group-hover:border-white/30"
                      }`}
                      style={{
                        boxShadow: active
                          ? `0 0 0 1px ${postcard.glow}, 0 20px 52px -22px ${postcard.glow}`
                          : undefined,
                      }}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={`pointer-events-none absolute left-1/2 top-12 hidden min-w-[9rem] -translate-x-1/2 border border-white/[0.14] border-l-[3px] bg-ink/88 px-3 py-2 shadow-[0_18px_50px_rgba(0,0,0,0.36)] backdrop-blur-xl transition sm:block ${
                        active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                      style={{ borderLeftColor: postcard.glow }}
                    >
                      <span className="block font-mono text-[0.55rem] font-black uppercase tracking-[0.18em] text-paper/48">
                        {point.status}
                      </span>
                      <span className="mt-1 block whitespace-nowrap font-display text-xl uppercase leading-none text-paper">
                        {point.name}
                      </span>
                    </span>
                  </button>
                );
              })}

              <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between border-t border-white/[0.1] pt-3 font-mono text-[0.56rem] font-black uppercase tracking-[0.18em] text-paper/36 sm:inset-x-5">
                <span>Leonida transit layer</span>
                <span>{activePoint.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
