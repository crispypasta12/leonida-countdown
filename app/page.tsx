import { Hero } from "@/components/Hero";
import { CoverReveal } from "@/components/CoverReveal";
import { Postcards } from "@/components/Postcards";
import { Scenes } from "@/components/Scenes";
import { CinematicDivider } from "@/components/CinematicDivider";
import { Cast } from "@/components/Cast";
import { Footer } from "@/components/Footer";
import { FinalTransmission } from "@/components/FinalTransmission";
import { LeonidaRouteMap } from "@/components/LeonidaRouteMap";
import { SectionBreak } from "@/components/SectionBreak";
import { StickyCountdownNav } from "@/components/StickyCountdownNav";
import { RevealOnView } from "@/components/RevealOnView";

export default function Home() {
  return (
    <main id="top" className="relative">
      {/* Skip link for keyboard users */}
      <a
        href="#cover"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70]
                   focus:rounded-lg focus:bg-pink focus:px-4 focus:py-2 focus:font-bold focus:text-white"
      >
        Skip to content
      </a>
      <StickyCountdownNav />

      <Hero />
      <SectionBreak tone="pink" />
      <RevealOnView>
        <Cast />
      </RevealOnView>
      <SectionBreak tone="cyan" />
      <RevealOnView>
        <CoverReveal />
      </RevealOnView>
      <RevealOnView>
        <LeonidaRouteMap />
      </RevealOnView>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 -top-32 h-64"
          style={{
            background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(123,63,228,0.25), transparent 70%)",
          }}
        />
        <RevealOnView>
          <Postcards />
        </RevealOnView>
      </div>

      <SectionBreak tone="sunset" />
      <RevealOnView>
        <Scenes />
      </RevealOnView>
      <RevealOnView>
        <CinematicDivider />
      </RevealOnView>
      <RevealOnView>
        <FinalTransmission />
      </RevealOnView>
      <Footer />
    </main>
  );
}
