import Image from "next/image";

export function CoverReveal() {
  return (
    <section id="cover" className="relative overflow-hidden border-y border-white/10 bg-paper text-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,46,151,0.18),transparent_34%),radial-gradient(circle_at_88%_68%,rgba(22,224,255,0.16),transparent_36%)]" />
      <div className="absolute inset-y-0 left-0 hidden w-10 border-r border-ink/10 bg-ink/[0.03] lg:block" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-3 py-16 sm:px-4 sm:py-24 lg:grid-cols-[0.82fr_1.18fr] lg:py-28 lg:pl-20">
        <div className="relative">
          <div className="absolute -left-10 top-1 hidden origin-top-left -rotate-90 font-mono text-[0.58rem] font-black uppercase tracking-[0.2em] text-ink/32 lg:block">
            Cover dossier
          </div>
          <p className="mb-3 text-[0.65rem] font-black uppercase tracking-[0.18em] text-pink sm:text-sm sm:tracking-[0.24em]">
            Official cover art
          </p>
          <h2 className="font-display text-[clamp(2.3rem,13vw,7rem)] uppercase leading-[0.82] tracking-normal sm:text-[clamp(2.5rem,8vw,7rem)]">
            The wait has a face now
          </h2>
          <p className="mt-4 max-w-xl text-balance text-sm font-semibold leading-relaxed text-ink/70 sm:mt-5 sm:text-lg">
            A full-state collage of speedboats, skyline heat, chrome, trouble, and the
            duo at the center of it all.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
            <span className="border-l-2 border-pink bg-ink px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.12em] text-paper shadow-[0_14px_34px_rgba(11,6,20,0.16)] sm:px-4 sm:text-xs sm:tracking-[0.16em]">
              Pre-order June 25
            </span>
            <span className="border border-ink/18 border-l-2 border-l-cyan bg-white/66 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.12em] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] sm:px-4 sm:text-xs sm:tracking-[0.16em]">
              PS5
            </span>
            <span className="border border-ink/18 border-l-2 border-l-sunset bg-white/66 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.12em] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] sm:px-4 sm:text-xs sm:tracking-[0.16em]">
              Xbox Series X|S
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-3xl">
          <div className="absolute -inset-4 bg-gradient-to-br from-pink/28 via-sunset/12 to-cyan/24 blur-2xl" />
          <div className="absolute -right-3 -top-3 z-10 hidden border border-ink/15 border-l-2 border-l-pink bg-paper/82 px-3 py-2 font-mono text-[0.58rem] font-black uppercase tracking-[0.14em] shadow-[0_18px_42px_rgba(11,6,20,0.16)] backdrop-blur sm:block">
            Art lockup 2400x1350
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-md shadow-[0_28px_90px_rgba(11,6,20,0.36)] ring-1 ring-ink/10">
            <Image
              src="/art/og/cover.jpg"
              alt="Grand Theft Auto VI official cover art"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="image-grade-warm object-cover"
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[0.55rem] font-black uppercase tracking-[0.12em] text-ink/42">
            <span className="border-t border-ink/20 pt-2">Chrome</span>
            <span className="border-t border-ink/20 pt-2">Speedboats</span>
            <span className="border-t border-ink/20 pt-2">Vice City heat</span>
          </div>
        </div>
      </div>
    </section>
  );
}
