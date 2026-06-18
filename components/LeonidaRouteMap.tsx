import Image from "next/image";
import { POSTCARDS } from "@/lib/content";

const ROUTE_POINTS = [
  { name: "Vice City", x: 72, y: 26 },
  { name: "Leonida Keys", x: 80, y: 76 },
  { name: "Grassrivers", x: 43, y: 60 },
  { name: "Ambrosia", x: 28, y: 42 },
  { name: "Port Gellhorn", x: 18, y: 72 },
  { name: "Mount Kalaga", x: 36, y: 16 },
] as const;

export function LeonidaRouteMap() {
  const postcards = new Map(POSTCARDS.map((item) => [item.name, item]));

  return (
    <section id="route-map" className="relative overflow-hidden border-y border-white/10 bg-[#080713] px-3 py-16 sm:px-4 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(22,224,255,0.12),transparent_30%),radial-gradient(circle_at_14%_72%,rgba(255,46,151,0.13),transparent_34%)]" />
      <div className="absolute inset-0 opacity-[0.06] travel-grid" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-8 max-w-3xl sm:mb-10">
          <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-sunset sm:text-sm sm:tracking-[0.35em]">
            Leonida route board
          </p>
          <h2 className="font-display text-[clamp(2rem,12vw,4.8rem)] uppercase leading-none tracking-normal text-paper sm:text-[clamp(2rem,7vw,4.8rem)]">
            One state. Too many exits.
          </h2>
          <p className="mt-3 max-w-2xl text-balance text-sm leading-relaxed text-paper/65 sm:mt-4 sm:text-base">
            Follow the neon trail from Vice City glass to wetland backroads, coastal
            hideouts, and mountain static.
          </p>
        </header>

        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-3 shadow-[0_24px_90px_rgba(0,0,0,0.28)] sm:p-5">
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(253,246,238,0.07),transparent_32%,rgba(22,224,255,0.08)_68%,transparent)]" />
          <div className="relative min-h-[34rem] overflow-hidden rounded-md bg-ink/70 sm:min-h-[38rem]">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M36 16 C48 22, 62 18, 72 26 S86 56, 80 76 C62 76, 55 64, 43 60 S24 62, 18 72 C18 58, 22 48, 28 42 S32 24, 36 16"
                fill="none"
                stroke="rgba(253,246,238,0.18)"
                strokeWidth="0.7"
                strokeDasharray="2 2"
              />
              <path
                className="route-pulse"
                d="M36 16 C48 22, 62 18, 72 26 S86 56, 80 76 C62 76, 55 64, 43 60 S24 62, 18 72 C18 58, 22 48, 28 42 S32 24, 36 16"
                fill="none"
                stroke="rgba(255,46,151,0.72)"
                strokeWidth="0.55"
                strokeLinecap="round"
              />
            </svg>

            {ROUTE_POINTS.map((point, index) => {
              const postcard = postcards.get(point.name);
              if (!postcard) return null;

              return (
                <figure
                  key={point.name}
                  className="absolute w-[9.5rem] -translate-x-1/2 -translate-y-1/2 sm:w-[12rem]"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                >
                  <div className="group relative overflow-hidden rounded-lg bg-paper p-1.5 shadow-[0_18px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/10 transition duration-500 hover:-translate-y-1">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-ink">
                      <Image
                        src={postcard.src}
                        alt={`${point.name} route marker`}
                        fill
                        sizes="(max-width: 640px) 38vw, 12rem"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
                    </div>
                    <figcaption className="absolute inset-x-0 bottom-0 p-3">
                      <span className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.16em] text-paper/70">
                        Stop {index + 1}
                      </span>
                      <h3 className="font-display text-xl uppercase leading-none tracking-wide text-paper sm:text-2xl">
                        {point.name}
                      </h3>
                    </figcaption>
                  </div>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
