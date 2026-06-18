import Image from "next/image";
import { SCENES } from "@/lib/content";

export function Scenes() {
  const [feature, ...supporting] = SCENES;

  return (
    <section id="scenes" className="relative overflow-hidden border-y border-white/10 bg-[#090812] px-4 py-20 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(22,224,255,0.13),transparent_34%),radial-gradient(circle_at_84%_88%,rgba(255,46,151,0.14),transparent_36%)]" />
      <div className="absolute inset-0 opacity-[0.06] travel-grid" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-10 max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-cyan sm:text-sm">
            Field reports
          </p>
          <h2 className="font-display text-[clamp(2rem,7vw,4.8rem)] uppercase leading-none tracking-normal text-paper">
            Scenes from Leonida
          </h2>
          <p className="mt-4 max-w-2xl text-balance text-paper/65">
            The postcards sell the dream. These are the dispatches from the ground.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <figure className="group relative min-h-[30rem] overflow-hidden rounded-lg bg-white/[0.04] ring-1 ring-white/10">
            <Image
              src={feature.src}
              alt={`${feature.place} - ${feature.title}`}
              fill
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="object-cover transition duration-700 group-hover:scale-[1.035]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/18 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <span
                className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.22em]"
                style={{ color: feature.tone }}
              >
                {feature.place}
              </span>
              <h3 className="mt-1 font-display text-4xl uppercase leading-none tracking-wide text-paper sm:text-6xl">
                {feature.title}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-paper/78 sm:text-base">
                {feature.caption}
              </p>
            </figcaption>
          </figure>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {supporting.map((scene) => (
              <figure
                key={scene.place}
                className="group relative min-h-[14rem] overflow-hidden rounded-lg bg-white/[0.04] ring-1 ring-white/10"
              >
                <Image
                  src={scene.src}
                  alt={`${scene.place} - ${scene.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 38vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/28 to-transparent" />
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
