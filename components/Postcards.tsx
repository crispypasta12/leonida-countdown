import Image from "next/image";
import type { CSSProperties } from "react";
import { POSTCARDS } from "@/lib/content";

export function Postcards() {
  return (
    <section id="postcards" className="relative overflow-hidden px-3 py-16 sm:px-4 sm:py-28">
      <div className="absolute inset-0 opacity-[0.08] travel-grid" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-9 grid gap-4 sm:mb-12 lg:grid-cols-[0.68fr_0.32fr] lg:items-end">
          <div>
            <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-sunset sm:text-sm sm:tracking-[0.35em]">
              Wish you were here
            </p>
            <h2 className="font-display text-[clamp(2rem,12vw,5rem)] uppercase leading-none tracking-normal text-paper sm:text-[clamp(2rem,7vw,5rem)]">
              Postcards from the Sunshine State
            </h2>
            <p className="mt-3 max-w-2xl text-balance text-sm leading-relaxed text-paper/65 sm:mt-4 sm:text-base">
              Six stops across the state of Leonida. Pack light, leave fast, and don't
              forget to wave at the cameras.
            </p>
          </div>

          <div className="hidden border-l-2 border-sunset bg-white/[0.035] px-4 py-3 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] lg:block">
            <p className="font-mono text-[0.62rem] font-black uppercase tracking-[0.24em] text-paper/42">
              Tourist file
            </p>
            <p className="mt-1 font-display text-3xl uppercase leading-none text-paper">
              06 stops
            </p>
          </div>
        </header>

        <ul className="mobile-snap -mx-3 flex gap-4 overflow-x-auto px-3 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-7 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {POSTCARDS.map((p, index) => (
            <li
              key={p.name}
              className={`group min-w-[82vw] snap-center [perspective:1000px] min-[420px]:min-w-[72vw] sm:min-w-0 ${
                index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <figure
                className="relative h-full overflow-hidden rounded-md bg-paper p-2 shadow-2xl ring-1 ring-white/10 transition duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-[1.02]"
                style={{
                  "--postcard-tilt": `${p.tilt}deg`,
                  boxShadow: `0 24px 70px -24px ${p.glow}A0`,
                } as CSSProperties}
              >
                <span className="absolute left-1/2 top-1 z-20 h-7 w-24 -translate-x-1/2 -rotate-2 bg-white/55 shadow-sm backdrop-blur-sm" />
                <span
                  className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border-2 border-dashed text-[0.55rem] font-black uppercase tracking-widest opacity-80"
                  style={{ color: p.glow, borderColor: p.glow }}
                >
                  VI
                </span>

                <div
                  className={`relative w-full overflow-hidden rounded-sm bg-ink ${
                    index === 0
                      ? "aspect-[4/3] lg:h-full lg:min-h-[30rem]"
                      : "aspect-[16/9] lg:h-full lg:min-h-[14rem]"
                  }`}
                >
                  <Image
                    src={p.src}
                    alt={`${p.name} postcard - Visit Leonida`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/10 to-transparent" />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-70"
                    style={{ background: `radial-gradient(circle at 50% 120%, ${p.glow}, transparent 60%)` }}
                  />
                </div>

                <figcaption className="absolute inset-x-0 bottom-0 z-10 p-5">
                  <h3 className="font-display text-[1.7rem] uppercase leading-none tracking-wide text-paper sm:text-3xl">
                    {p.name}
                  </h3>
                  <p className="mt-1 max-w-[18rem] text-xs font-medium text-paper/78">{p.tagline}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
