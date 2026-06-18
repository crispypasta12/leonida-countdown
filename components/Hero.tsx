import { TARGETS } from "@/lib/countdown";
import { CountdownConsole } from "./CountdownConsole";
import { ShareRow } from "./ShareRow";

export function Hero() {
  const preorder = TARGETS[0];
  const release = TARGETS[1];

  return (
    <section className="relative min-h-[92svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <picture className="block h-full w-full">
          <source media="(min-width: 640px)" srcSet="/art/hero/hero-03-land.jpg" />
          <img
            src="/art/hero/hero-03-port.jpg"
            alt=""
            fetchPriority="high"
            className="h-full w-full animate-hero-drift object-cover"
          />
        </picture>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/28 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,rgba(255,46,151,0.28),transparent_34%),radial-gradient(ellipse_at_18%_70%,rgba(22,224,255,0.18),transparent_38%)]" />
      <div className="hero-light-sweep absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-6xl flex-col items-center justify-center px-4 pb-12 pt-16 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.42em] text-cyan sm:text-sm">
          Welcome to Leonida
        </p>

        <h1 className="font-display text-glow-pink text-[clamp(2.45rem,8.5vw,5.6rem)] font-normal uppercase leading-[0.82]">
          <span className="bg-gradient-to-b from-paper to-paper/72 bg-clip-text text-transparent">
            Grand Theft
          </span>
          <br />
          <span className="bg-gradient-to-r from-pink via-sunset to-cyan bg-clip-text text-transparent">
            Auto VI
          </span>
        </h1>

        <p className="mt-3 max-w-2xl text-balance text-base font-medium text-paper/82 sm:text-lg">
          The clock is live. Pre-orders are almost here. Leonida is waiting.
        </p>

        <div className="mt-3 grid w-full max-w-5xl items-end gap-4 lg:grid-cols-[0.72fr_1.28fr]">
          <CountdownConsole target={preorder} variant="compact" />
          <CountdownConsole target={release} variant="feature" />
        </div>

        <ShareRow className="mt-5" />
      </div>

      <a
        href="#cover"
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-paper/55 transition hover:text-paper"
        aria-label="Scroll to official cover art"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="animate-bounce">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
