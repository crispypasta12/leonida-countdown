import { CAST } from "@/lib/content";
import { CastCard } from "./CastCard";

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

        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-paper/40">
          Hover a card to roll the tape
        </p>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[18rem] lg:grid-cols-4">
          {CAST.map((c, i) => (
            <li
              key={c.name}
              className={`relative overflow-hidden rounded-lg bg-white/[0.03] ring-1 ring-white/10 transition duration-500 hover:-translate-y-2 ${
                i === 0 ? "sm:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <CastCard member={c} featured={i === 0} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
