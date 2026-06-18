"use client";

import Image from "next/image";
import { useState } from "react";
import { POSTCARDS } from "@/lib/content";

const ROUTE_POINTS = [
  { name: "Mount Kalaga", x: 35, y: 18, code: "MK-01", status: "Signal weak" },
  { name: "Vice City", x: 75, y: 27, code: "VC-02", status: "Heat rising" },
  { name: "Ambrosia", x: 29, y: 43, code: "AM-03", status: "Low profile" },
  { name: "Grassrivers", x: 45, y: 62, code: "GR-04", status: "No dry exits" },
  { name: "Port Gellhorn", x: 18, y: 73, code: "PG-05", status: "Night shift" },
  { name: "Leonida Keys", x: 80, y: 79, code: "LK-06", status: "Boat ready" },
] as const;

const DISTRICTS = [
  { label: "Kalaga Ridge", x: 22, y: 19 },
  { label: "Vice Coast", x: 70, y: 18 },
  { label: "Central Cane", x: 22, y: 46 },
  { label: "Grassrivers", x: 50, y: 70 },
  { label: "The Keys", x: 75, y: 90 },
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(22,224,255,0.1),transparent_32%),radial-gradient(circle_at_14%_72%,rgba(255,46,151,0.11),transparent_36%)]" />
      <div className="absolute inset-0 opacity-[0.045] travel-grid" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <header className="mb-8 grid gap-4 lg:grid-cols-[0.74fr_0.26fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-sunset sm:text-sm sm:tracking-[0.24em]">
              Leonida route board
            </p>
            <h2 className="font-display text-[clamp(2rem,12vw,4.8rem)] uppercase leading-none tracking-normal text-paper sm:text-[clamp(2rem,7vw,4.8rem)]">
              One state. Too many exits.
            </h2>
            <p className="mt-3 max-w-2xl text-balance text-sm leading-relaxed text-paper/68 sm:mt-4 sm:text-base">
              Follow the neon trail from Vice City glass to wetland backroads,
              coastal hideouts, and mountain static.
            </p>
          </div>

          <div className="hidden border-l-2 border-cyan/50 bg-white/[0.028] px-4 py-3 text-right lg:block">
            <p className="font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-paper/44">
              Active stop
            </p>
            <p className="mt-1 font-display text-3xl uppercase leading-none text-paper">
              {activePoint.code}
            </p>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[0.34fr_0.66fr]">
          <aside className="relative overflow-hidden rounded-md border border-white/[0.11] bg-white/[0.035] shadow-[0_24px_80px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="relative aspect-[16/10] overflow-hidden bg-ink">
              <Image
                key={activePostcard.src}
                src={activePostcard.src}
                alt={`${activePoint.name} route preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="image-grade object-cover transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/24 to-transparent" />
              <div
                className="absolute inset-0 mix-blend-screen opacity-28"
                style={{
                  background: `radial-gradient(circle at 50% 100%, ${activePostcard.glow}, transparent 58%)`,
                }}
              />
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-paper/42">
                    {activePoint.code}
                  </p>
                  <h3 className="mt-1 font-display text-[clamp(2.1rem,8vw,3.6rem)] uppercase leading-none text-paper lg:text-[3.1rem]">
                    {activePoint.name}
                  </h3>
                </div>
                <span
                  className="mt-1 border-l-2 bg-white/[0.05] px-2.5 py-1 font-mono text-[0.58rem] font-black uppercase tracking-[0.14em]"
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
                      className={`min-h-12 border border-white/[0.11] border-l-[3px] bg-white/[0.03] px-2.5 py-2 text-left transition hover:bg-white/[0.07] focus-visible:bg-white/[0.07] ${
                        active ? "text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" : "text-paper/56"
                      }`}
                      style={{ borderLeftColor: active ? postcard?.glow : "rgba(253,246,238,0.16)" }}
                      aria-pressed={active}
                    >
                      <span className="block font-mono text-[0.55rem] font-black uppercase tracking-[0.14em]">
                        Stop {index + 1}
                      </span>
                      <span className="mt-1 block truncate text-xs font-bold uppercase tracking-[0.06em]">
                        {point.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="relative overflow-hidden rounded-md border border-white/[0.12] bg-white/[0.03] p-3 shadow-[0_24px_90px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-5">
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(253,246,238,0.05),transparent_32%,rgba(22,224,255,0.06)_68%,transparent)]" />
            <div className="relative min-h-[31rem] overflow-hidden rounded-sm bg-ink/74 sm:min-h-[38rem]">
              <div className="absolute inset-0 opacity-[0.09] travel-grid" aria-hidden />

              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="land" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(253,246,238,0.13)" />
                    <stop offset="100%" stopColor="rgba(22,224,255,0.045)" />
                  </linearGradient>
                  <filter id="soft-glow">
                    <feGaussianBlur stdDeviation="1.4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path
                  d="M29 6 C42 6, 57 8, 72 18 C86 28, 91 45, 87 62 C84 74, 76 83, 64 88 C50 94, 35 88, 23 78 C12 69, 7 55, 10 39 C13 23, 18 11, 29 6Z"
                  fill="url(#land)"
                  stroke="rgba(253,246,238,0.18)"
                  strokeWidth="0.72"
                />
                <path
                  d="M75 66 C83 70, 88 78, 91 90 M72 72 C80 76, 84 84, 86 96 M66 77 C72 82, 76 89, 78 99"
                  fill="none"
                  stroke="rgba(22,224,255,0.18)"
                  strokeWidth="0.42"
                  strokeLinecap="round"
                />
                <path
                  d="M12 40 C24 44, 32 42, 44 50 C57 58, 67 58, 86 50"
                  fill="none"
                  stroke="rgba(253,246,238,0.13)"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                />
                <path
                  d="M34 12 C45 24, 42 34, 30 44 C20 52, 18 62, 18 74"
                  fill="none"
                  stroke="rgba(255,138,61,0.2)"
                  strokeWidth="0.42"
                  strokeDasharray="1.6 1.6"
                />
                <path
                  d="M35 18 C50 22, 63 20, 75 27 C85 34, 90 48, 82 61 C73 76, 58 75, 45 62 C36 53, 30 48, 29 43 C26 54, 24 64, 18 73"
                  fill="none"
                  stroke="rgba(253,246,238,0.28)"
                  strokeWidth="0.92"
                  strokeLinecap="round"
                  strokeDasharray="2.4 2.2"
                />
                <path
                  className="route-pulse"
                  d="M35 18 C50 22, 63 20, 75 27 C85 34, 90 48, 82 61 C73 76, 58 75, 45 62 C36 53, 30 48, 29 43 C26 54, 24 64, 18 73"
                  fill="none"
                  stroke={activePostcard.glow}
                  strokeWidth="0.72"
                  strokeLinecap="round"
                  filter="url(#soft-glow)"
                />
              </svg>

              {DISTRICTS.map((district) => (
                <div
                  key={district.label}
                  className="pointer-events-none absolute hidden -translate-x-1/2 -translate-y-1/2 font-mono text-[0.52rem] font-black uppercase tracking-[0.18em] text-paper/28 sm:block"
                  style={{ left: `${district.x}%`, top: `${district.y}%` }}
                >
                  {district.label}
                </div>
              ))}

              <div
                className="pointer-events-none absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition duration-500"
                style={{
                  left: `${activePoint.x}%`,
                  top: `${activePoint.y}%`,
                  backgroundColor: `${activePostcard.glow}42`,
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
                      className={`grid h-11 w-11 place-items-center rounded-sm border bg-ink/84 font-mono text-[0.68rem] font-black text-paper shadow-[0_18px_40px_rgba(0,0,0,0.36)] backdrop-blur-sm transition ${
                        active
                          ? "scale-110 border-white/42"
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
                      <span className="block font-mono text-[0.55rem] font-black uppercase tracking-[0.14em] text-paper/48">
                        {point.status}
                      </span>
                      <span className="mt-1 block whitespace-nowrap font-display text-xl uppercase leading-none text-paper">
                        {point.name}
                      </span>
                    </span>
                  </button>
                );
              })}

              <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between border-t border-white/[0.1] pt-3 font-mono text-[0.56rem] font-black uppercase tracking-[0.14em] text-paper/36 sm:inset-x-5">
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
