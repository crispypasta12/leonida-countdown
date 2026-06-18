import Image from "next/image";

export function CinematicDivider() {
  return (
    <section className="relative min-h-[58svh] overflow-hidden sm:min-h-[68svh]">
      <Image
        src="/art/divider/jason-lucia-motel.jpg"
        alt="Jason and Lucia in a sunlit motel room"
        fill
        sizes="100vw"
        className="image-grade-warm object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/42 to-ink/16" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_38%,rgba(255,138,61,0.28),transparent_34%)]" />

      <div className="relative z-10 mx-auto flex min-h-[58svh] max-w-6xl items-center px-3 py-14 sm:min-h-[68svh] sm:px-4 sm:py-16">
        <div className="max-w-2xl">
          <p className="mb-3 text-[0.65rem] font-black uppercase tracking-[0.18em] text-sunset sm:text-sm sm:tracking-[0.24em]">
            One score changes everything
          </p>
          <h2 className="font-display text-[clamp(2.3rem,13vw,6rem)] uppercase leading-[0.84] tracking-normal text-paper sm:text-[clamp(2.4rem,8vw,6rem)]">
            Trust is the only way out
          </h2>
          <p className="mt-4 max-w-xl text-balance text-sm font-medium leading-relaxed text-paper/74 sm:mt-5 sm:text-lg">
            The brightest place in America still casts a long shadow.
          </p>
        </div>
      </div>
    </section>
  );
}
