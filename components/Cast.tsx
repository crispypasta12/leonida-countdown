import Image from "next/image";
import { CAST } from "@/lib/content";

export function Cast() {
  return (
    <section id="cast" className="relative overflow-hidden px-4 py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_8%,rgba(22,224,255,0.12),transparent_28%),radial-gradient(circle_at_12%_82%,rgba(255,46,151,0.12),transparent_30%)]" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-cyan sm:text-sm">
            Meet the players
          </p>
          <h2 className="font-display text-[clamp(2rem,7vw,4.6rem)] uppercase leading-none tracking-normal text-paper">
            The Cast
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-paper/65">
            Lovers, hustlers, moguls and operators. Everyone in Leonida is chasing
            something - and most of them won't stop to ask why.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[18rem] lg:grid-cols-4">
          {CAST.map((c, i) => (
            <li
              key={c.name}
              className={`group relative overflow-hidden rounded-lg bg-white/[0.03] ring-1 ring-white/10 transition duration-500 hover:-translate-y-2 ${
                i === 0 ? "sm:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <article className="relative h-full min-h-[22rem]">
                <Image
                  src={c.src}
                  alt={`${c.name} - ${c.role}`}
                  fill
                  sizes={
                    i === 0
                      ? "(max-width: 1024px) 100vw, 50vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  }
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/24 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/35 via-transparent to-transparent opacity-80" />
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 0 2px ${c.accent}, inset 0 -90px 90px -38px ${c.accent}A0` }}
                />
                <div className="light-scan pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span
                    className="text-[0.62rem] font-bold uppercase tracking-[0.22em]"
                    style={{ color: c.accent }}
                  >
                    {c.role}
                  </span>
                  <h3
                    className={`font-display uppercase leading-none tracking-wide text-paper ${
                      i === 0 ? "text-4xl sm:text-5xl" : "text-2xl"
                    }`}
                  >
                    {c.name}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/82 sm:text-xs">
                    {c.blurb}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
