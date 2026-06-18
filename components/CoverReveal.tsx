import Image from "next/image";

export function CoverReveal() {
  return (
    <section id="cover" className="relative overflow-hidden border-y border-white/10 bg-paper text-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,46,151,0.24),transparent_34%),radial-gradient(circle_at_88%_68%,rgba(22,224,255,0.22),transparent_36%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-3 py-14 sm:px-4 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <p className="mb-3 text-[0.65rem] font-black uppercase tracking-[0.26em] text-pink sm:text-sm sm:tracking-[0.34em]">
            Official cover art
          </p>
          <h2 className="font-display text-[clamp(2.3rem,13vw,6.5rem)] uppercase leading-[0.82] tracking-normal sm:text-[clamp(2.5rem,8vw,6.5rem)]">
            The wait has a face now
          </h2>
          <p className="mt-4 max-w-xl text-balance text-sm font-semibold leading-relaxed text-ink/70 sm:mt-5 sm:text-lg">
            A full-state collage of speedboats, skyline heat, chrome, trouble, and the
            duo at the center of it all.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
            <span className="border-l-2 border-pink bg-ink px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.16em] text-paper shadow-[0_14px_34px_rgba(11,6,20,0.16)] sm:px-4 sm:text-xs sm:tracking-[0.22em]">
              Pre-order June 25
            </span>
            <span className="border border-ink/20 border-l-2 border-l-cyan bg-white/72 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.16em] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] sm:px-4 sm:text-xs sm:tracking-[0.22em]">
              PS5
            </span>
            <span className="border border-ink/20 border-l-2 border-l-sunset bg-white/72 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.16em] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] sm:px-4 sm:text-xs sm:tracking-[0.22em]">
              Xbox Series X|S
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl">
          <div className="absolute -inset-4 bg-gradient-to-br from-pink/40 via-sunset/20 to-cyan/35 blur-2xl" />
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-[0_28px_90px_rgba(11,6,20,0.36)] ring-1 ring-ink/10">
            <Image
              src="/art/og/cover.jpg"
              alt="Grand Theft Auto VI official cover art"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
