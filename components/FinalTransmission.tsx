import Image from "next/image";
import { TARGETS } from "@/lib/countdown";
import { CountdownConsole } from "./CountdownConsole";
import { ShareRow } from "./ShareRow";

const CHECKLIST = [
  "Pre-order window locked",
  "Launch reminder armed",
  "Leonida route reviewed",
  "Crew feed monitored",
];

export function FinalTransmission() {
  const preorder = TARGETS[0];
  const release = TARGETS[1];

  return (
    <section id="final" className="relative overflow-hidden border-t border-white/10 bg-ink px-3 py-16 sm:px-4 sm:py-24">
      <Image
        src="/art/hero/hero-02-land.jpg"
        alt=""
        fill
        sizes="100vw"
        className="image-grade-cool object-cover opacity-[0.26]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,6,20,0.96)_0%,rgba(11,6,20,0.82)_46%,rgba(11,6,20,0.56)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,46,151,0.14),transparent_34%),radial-gradient(circle_at_82%_74%,rgba(22,224,255,0.12),transparent_36%)]" />
      <div className="absolute inset-0 opacity-[0.045] travel-grid" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div>
          <p className="mb-3 border-l-2 border-pink pl-3 text-[0.65rem] font-black uppercase tracking-[0.18em] text-pink sm:text-sm sm:tracking-[0.24em]">
            Final transmission
          </p>
          <h2 className="max-w-[40rem] font-display text-[clamp(2.6rem,12vw,4.8rem)] uppercase leading-[0.9] tracking-normal text-paper sm:text-[clamp(3.4rem,5.4vw,4.8rem)]">
            <span className="block">Lock the dates.</span>
            <span className="block">Pass the signal.</span>
          </h2>
          <p className="mt-4 max-w-xl text-balance text-sm font-medium leading-relaxed text-paper/70 sm:mt-5 sm:text-lg">
            The page is your launch board. Save the reminders, share the countdown,
            and keep one eye on Leonida.
          </p>

          <ShareRow align="start" className="mt-7" />

          <div className="mt-9 grid max-w-xl grid-cols-2 gap-3 border-y border-white/10 py-4 sm:grid-cols-4">
            {CHECKLIST.map((item, index) => (
              <div key={item} className="min-w-0">
                <p className="font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-cyan/70">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-xs font-bold uppercase leading-snug tracking-[0.08em] text-paper/62">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
          <CountdownConsole target={release} variant="compact" />
          <CountdownConsole target={preorder} variant="compact" />
        </div>
      </div>
    </section>
  );
}
