import { TARGETS } from "@/lib/countdown";
import { CountdownConsole } from "./CountdownConsole";
import { CountdownRail } from "./CountdownRail";
import { ShareRow } from "./ShareRow";

export function Hero() {
  const preorder = TARGETS[0];
  const release = TARGETS[1];

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0 hero-depth-back">
        <picture className="block h-full w-full">
          <source media="(min-width: 640px)" srcSet="/art/hero/hero-03-land.jpg" />
          <img
            src="/art/hero/hero-03-port.jpg"
            alt=""
            fetchPriority="high"
            className="h-full w-full animate-hero-drift object-cover object-[61%_top] sm:object-center"
          />
        </picture>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,6,20,0.94)_0%,rgba(11,6,20,0.68)_34%,rgba(11,6,20,0.12)_64%,rgba(11,6,20,0.38)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/26 via-transparent to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_30%,rgba(255,46,151,0.11),transparent_36%),radial-gradient(ellipse_at_18%_78%,rgba(22,224,255,0.09),transparent_38%)]" />
      <div className="hero-light-sweep absolute inset-0" aria-hidden />
      <div className="hero-neon-grid absolute inset-x-0 bottom-0 h-[34%]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink via-ink/82 to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl grid-rows-[1fr_auto] px-4 pb-6 pt-16 sm:px-6 sm:pb-9 sm:pt-24 lg:px-8">
        <div className="flex items-end pb-5 sm:pb-8 lg:pb-10">
          <div className="max-w-[42rem] text-left">
            <p className="hero-depth-mid mb-3 inline-flex border-l-2 border-cyan/70 bg-ink/24 py-1 pl-3 pr-4 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-cyan backdrop-blur-sm sm:text-xs sm:tracking-[0.26em]">
              Welcome to Leonida
            </p>

            <h1 className="hero-depth-front font-display text-glow-pink text-[clamp(3rem,14vw,8.8rem)] font-normal uppercase leading-[0.8] sm:text-[clamp(4.2rem,10vw,9.4rem)]">
              <span className="block bg-gradient-to-b from-paper to-paper/76 bg-clip-text text-transparent">
                Grand Theft
              </span>
              <span className="block bg-gradient-to-r from-pink via-sunset to-cyan bg-clip-text text-transparent">
                Auto VI
              </span>
            </h1>

            <p className="hero-depth-mid mt-4 max-w-xl text-balance text-base font-medium leading-relaxed text-paper/78 sm:text-xl">
              A live launch board for Vice City, Leonida, and every bad decision
              between now and release day.
            </p>
          </div>
        </div>

        <div className="hero-depth-front min-w-0">
          <div className="grid min-w-0 w-full grid-cols-1 items-end gap-3 sm:gap-4 lg:grid-cols-[1.42fr_0.58fr]">
            <CountdownConsole target={release} variant="feature" />
            <CountdownRail target={preorder} />
          </div>
          <ShareRow align="start" className="hero-depth-mid mt-4 sm:mt-5" />
        </div>
      </div>

      <a
        href="#cover"
        className="absolute bottom-3 right-4 z-10 hidden text-paper/50 transition hover:text-paper sm:block"
        aria-label="Scroll to official cover art"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="animate-bounce">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
