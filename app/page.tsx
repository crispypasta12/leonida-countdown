import { Hero } from "@/components/Hero";
import { CoverReveal } from "@/components/CoverReveal";
import { Postcards } from "@/components/Postcards";
import { Scenes } from "@/components/Scenes";
import { CinematicDivider } from "@/components/CinematicDivider";
import { Cast } from "@/components/Cast";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      {/* Skip link for keyboard users */}
      <a
        href="#cover"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70]
                   focus:rounded-lg focus:bg-pink focus:px-4 focus:py-2 focus:font-bold focus:text-white"
      >
        Skip to content
      </a>

      <Hero />
      <Cast />
      <CoverReveal />

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 -top-32 h-64"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(123,63,228,0.25), transparent 70%)",
          }}
        />
        <Postcards />
      </div>

      <Scenes />
      <CinematicDivider />
      <Footer />
    </main>
  );
}
