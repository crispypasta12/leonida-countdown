"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { CastMember } from "@/lib/content";

type CastSpotlightProps = {
  member: CastMember;
};

export function CastSpotlight({ member }: CastSpotlightProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  const [face, setFace] = useState(0);
  const [reduced, setReduced] = useState(false);
  const dual = member.videos.length > 1;

  useEffect(() => {
    videoRefs.current = [];
    setReady(false);
    setFace(0);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, [member.name]);

  useEffect(() => {
    const vids = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
    if (reduced) {
      vids.forEach((video) => video.pause());
      return;
    }

    vids.forEach((video) => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    });
  }, [member.name, reduced]);

  useEffect(() => {
    if (!dual || reduced) return;
    const id = setInterval(() => setFace((value) => (value === 0 ? 1 : 0)), 3400);
    return () => clearInterval(id);
  }, [dual, member.name, reduced]);

  const style = {
    "--accent": member.accent,
  } as CSSProperties;

  return (
    <div
      className="relative mb-5 overflow-hidden rounded-lg bg-white/[0.04] ring-1 ring-white/10 lg:hidden"
      style={style}
    >
      <div className="relative min-h-[28rem]">
        <Image
          src={member.src}
          alt={`${member.name} - ${member.role}`}
          fill
          sizes="100vw"
          priority={false}
          className="object-cover transition duration-500"
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
              muted
              loop={!dual}
              playsInline
              preload="metadata"
              aria-hidden
              onLoadedData={() => setReady(true)}
              onEnded={
                dual
                  ? () => setFace((value) => (value === 0 ? 1 : 0))
                  : undefined
              }
            />
          ))}

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/45 via-transparent to-transparent" />
        <div
          className="signal-flicker pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{ opacity: ready && !reduced ? 0.34 : 0 }}
        />
        <div
          className="signal-acquire pointer-events-none absolute inset-x-0 top-0 h-full transition-opacity duration-300"
          style={{ opacity: ready && !reduced ? 0.45 : 0 }}
        />
        <div
          className="cast-scan pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{ opacity: ready && !reduced ? 0.45 : 0 }}
        />
        <div className="pointer-events-none absolute inset-3 rounded-md ring-1 ring-[var(--accent)]/60" />

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 backdrop-blur-sm">
          <span
            className="h-2 w-2 rounded-full animate-pulse-glow"
            style={{ backgroundColor: member.accent, boxShadow: `0 0 14px ${member.accent}` }}
          />
          <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.22em] text-paper">
            Rec
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.22em]" style={{ color: member.accent }}>
            {member.role}
          </span>
          <h3 className="font-display text-5xl uppercase leading-none tracking-wide text-paper">
            {member.name}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/82">
            {member.blurb}
          </p>
        </div>
      </div>
    </div>
  );
}
