import { ShareRow } from "./ShareRow";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-3 py-14 sm:px-4 sm:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,46,151,0.13),transparent_32%)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="font-display text-[clamp(1.8rem,6vw,3.4rem)] uppercase leading-none tracking-normal">
          <span className="bg-gradient-to-r from-cyan via-paper to-pink bg-clip-text text-transparent">
            See you in Leonida
          </span>
        </div>
        <p className="mx-auto mt-3 max-w-md text-sm text-paper/60">
          Set your reminders. Charge your controller. Clear November 19th.
        </p>

        <ShareRow className="mt-8" />

        <p className="mx-auto mt-10 max-w-2xl text-pretty text-[0.7rem] leading-relaxed text-paper/40 sm:mt-12">
          Unofficial fan-made countdown. Not affiliated with, endorsed by, or sponsored
          by Rockstar Games or Take-Two Interactive. Grand Theft Auto, GTA VI, and all
          related artwork are trademarks and property of their respective owners, used
          here for non-commercial fan celebration. Dates per Rockstar announcements.
        </p>

        <p className="mt-6 text-[0.62rem] uppercase tracking-[0.22em] text-paper/30 sm:tracking-[0.3em]">
          A fan project - Built with neon and nostalgia
        </p>
      </div>
    </footer>
  );
}
