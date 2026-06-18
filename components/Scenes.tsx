import Image from "next/image";
import { SCENES } from "@/lib/content";

export function Scenes() {
  const [feature, ...supporting] = SCENES;

  return (
    <section id="scenes" className="relative overflow-hidden border-y border-white/10 bg-[#090812] px-3 py-16 sm:px-4 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(22,224,255,0.13),transparent_34%),radial-gradient(circle_at_84%_88%,rgba(255,46,151,0.14),transparent_36%)]" />
      <div className="absolute inset-0 opacity-[0.06] travel-grid" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-8 grid gap-4 sm:mb-10 lg:grid-cols-[0.7fr_0.3fr] lg:items-end">
          <div>
            <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-cyan sm:text-sm sm:tracking-[0.35em]">
              Field reports
            </p>
            <h2 className="font-display text-[clamp(2rem,12vw,5rem)] uppercase leading-none tracking-normal text-paper sm:text-[clamp(2rem,7vw,5rem)]">
              Scenes from Leonida
            </h2>
            <p className="mt-3 max-w-2xl text-balance text-sm leading-relaxed text-paper/65 sm:mt-4 sm:text-base">
              The postcards sell the dream. These are the dispatches from the ground.
            </p>
          </div>

          <div className="hidden border-l-2 border-cyan/60 bg-white/[0.035] px-4 py-3 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] lg:block">
            <p className="font-mono text-[0.62rem] font-black uppercase tracking-[0.24em] text-paper/42">
              Dispatch wall
            </p>
            <p className="mt-1 font-display text-3xl uppercase leading-none text-paper">
              {SCENES.length} reports
            </p>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <figure className="group relative min-h-[24rem] overflow-hidden rounded-md bg-white/[0.04] ring-1 ring-white/10 sm:min-h-[30rem]">
            <Image
              src={feature.src}
              alt={`${feature.place} - ${feature.title}`}
              fill
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="object-cover transition duration-700 group-hover:scale-[1.035]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/18 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
            <div className="absolute left-4 top-4 border border-white/[0.14] border-l-[3px] bg-ink/70 px-3 py-2 font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-paper/72 backdrop-blur-sm" style={{ borderLeftColor: feature.tone }}>
              Report 01
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <span
                className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.22em]"
                style={{ color: feature.tone }}
              >
                {feature.place}
              </span>
              <h3 className="mt-1 font-display text-3xl uppercase leading-none tracking-wide text-paper sm:text-6xl">
                {feature.title}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-paper/78 sm:text-base">
                {feature.caption}
              </p>
            </figcaption>
          </figure>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {supporting.map((scene, index) => (
              <figure
                key={scene.place}
                className="group relative min-h-[12.5rem] overflow-hidden rounded-md border border-white/[0.1] border-l-[3px] bg-white/[0.04] ring-1 ring-white/10 sm:min-h-[14rem]"
                style={{ borderLeftColor: scene.tone }}
              >
                <Image
                  src={scene.src}
                  alt={`${scene.place} - ${scene.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 38vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/28 to-transparent" />
                <div className="absolute left-4 top-4 font-mono text-[0.54rem] font-black uppercase tracking-[0.18em] text-paper/45">
                  Report {String(index + 2).padStart(2, "0")}
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                  <span
                    className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em]"
                    style={{ color: scene.tone }}
                  >
                    {scene.place}
                  </span>
                  <h3 className="font-display text-2xl uppercase leading-none tracking-wide text-paper">
                    {scene.title}
                  </h3>
                  <p className="mt-1 max-w-sm text-xs leading-relaxed text-paper/72">{scene.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
