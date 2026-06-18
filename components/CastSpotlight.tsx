"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { CastMember } from "@/lib/content";

type CastSpotlightProps = {
  member: CastMember;
  layout?: "mobile" | "desktop";
};

export function CastSpotlight({ member, layout = "mobile" }: CastSpotlightProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  const [face, setFace] = useState(0);
  const [reduced, setReduced] = useState(false);
  const dual = member.videos.length > 1;

  useEffect(() => {
    setReady(false);
    setFace(0);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, [member.name]);

  useEffect(() => {
    const startVideos = () => {
      const vids = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
      if (reduced) {
        vids.forEach((video) => video.pause());
        return;
      }

      vids.forEach((video) => {
        video.currentTime = 0;
        video.load();
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {});
        }
      });
    };

    const frame = window.requestAnimationFrame(startVideos);
    return () => window.cancelAnimationFrame(frame);
  }, [member.name, reduced]);

  useEffect(() => {
    if (!dual || reduced) return;
    const id = setInterval(() => setFace((value) => (value === 0 ? 1 : 0)), 3400);
    return () => clearInterval(id);
  }, [dual, member.name, reduced]);

  const style = {
    "--accent": member.accent,
  } as CSSProperties;
  const isDesktop = layout === "desktop";

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-white/[0.04] ring-1 ring-white/10 ${
        isDesktop ? "hidden lg:block" : "mb-5 lg:hidden"
      }`}
      style={style}
    >
      <div className={`relative ${isDesktop ? "min-h-[42rem]" : "min-h-[23rem] min-[390px]:min-h-[25rem] sm:min-h-[30rem]"}`}>
        <Image
          src={member.src}
          alt={`${member.name} - ${member.role}`}
          fill
          sizes={isDesktop ? "58vw" : "100vw"}
          priority={false}
          className="image-grade object-cover transition duration-500"
        />

        {!reduced &&
          member.videos.map((url, index) => (
            <video
              key={`${member.name}-${url}`}
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
              style={{
                opacity: ready && (!dual || face === index) ? 1 : 0,
              }}
              src={url}
              autoPlay
              muted
              loop={!dual}
              playsInline
              preload="metadata"
              aria-hidden
              onCanPlay={() => setReady(true)}
              onLoadedData={() => setReady(true)}
              onEnded={
                dual
                  ? () => setFace((value) => (value === 0 ? 1 : 0))
                  : undefined
              }
            />
          ))}

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/18 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/42 via-transparent to-transparent" />
        <div
          className="signal-flicker pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{ opacity: ready && !reduced ? 0.2 : 0 }}
        />
        <div
          className="signal-acquire pointer-events-none absolute inset-x-0 top-0 h-full transition-opacity duration-300"
          style={{ opacity: ready && !reduced ? 0.24 : 0 }}
        />
        <div
          className="cast-scan pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{ opacity: ready && !reduced ? 0.3 : 0 }}
        />
        <div className="pointer-events-none absolute inset-3 rounded-md ring-1 ring-[var(--accent)]/60" />

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-sm border border-white/[0.14] border-l-[3px] bg-black/58 px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm" style={{ borderLeftColor: member.accent }}>
          <span
            className="h-2 w-2 rounded-full animate-pulse-glow"
            style={{ backgroundColor: member.accent, boxShadow: `0 0 14px ${member.accent}` }}
          />
          <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.22em] text-paper">
            Rec
          </span>
        </div>

        <div className={`${isDesktop ? "absolute inset-x-0 bottom-0 p-7" : "absolute inset-x-0 bottom-0 p-4 sm:p-5"}`}>
          <span className="text-[0.58rem] font-bold uppercase tracking-[0.18em] sm:text-[0.62rem] sm:tracking-[0.22em]" style={{ color: member.accent }}>
            {member.role}
          </span>
          <h3
            className={`font-display uppercase leading-none tracking-wide text-paper ${
              isDesktop ? "text-7xl" : "text-[clamp(2.25rem,12vw,3.2rem)]"
            }`}
          >
            {member.name}
          </h3>
          <p className={`${isDesktop ? "mt-4 max-w-xl text-base" : "mt-2 max-w-md text-sm sm:mt-3"} leading-relaxed text-paper/82`}>
            {member.blurb}
          </p>
        </div>
      </div>
    </div>
  );
}
