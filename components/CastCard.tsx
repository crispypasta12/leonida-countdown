"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CastMember } from "@/lib/content";

/**
 * A single cast tile. Shows the portrait poster, then plays the character's
 * Cloudinary clip when the card is hovered/focused (pointer devices) or scrolled
 * into view (touch devices). Sources are attached lazily — nothing downloads
 * until the card nears the viewport — so eight 4K masters never hit first load.
 *
 * The couple's tile carries two clips and cross-fades between Jason and Lucia.
 */
export function CastCard({ member, featured }: { member: CastMember; featured?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [near, setNear] = useState(false); // close enough to attach src
  const [active, setActive] = useState(false); // should be playing
  const [ready, setReady] = useState(false); // first frame painted
  const [face, setFace] = useState(0); // which clip is visible (cross-fade)
  const dual = member.videos.length > 1;

  const reducedRef = useRef(false);
  const coarseRef = useRef(false);
  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    coarseRef.current = window.matchMedia("(hover: none)").matches;
  }, []);

  // Attach sources when within ~one screen of the viewport.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          // On touch devices, auto-activate when the card is well in view.
          if (coarseRef.current && !reducedRef.current && e.intersectionRatio > 0.6) {
            setActive(true);
          } else if (coarseRef.current && e.intersectionRatio <= 0.6) {
            setActive(false);
          }
        }
      },
      { rootMargin: "100% 0px", threshold: [0, 0.6, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Drive play/pause from `active`.
  useEffect(() => {
    const vids = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
    if (active && near) {
      vids.forEach((v) => {
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      });
    } else {
      vids.forEach((v) => v.pause());
    }
  }, [active, near]);

  // Cross-fade the couple's two clips on a gentle interval.
  useEffect(() => {
    if (!dual || !active) return;
    const id = setInterval(() => setFace((f) => (f === 0 ? 1 : 0)), 3600);
    return () => clearInterval(id);
  }, [dual, active]);

  const enter = useCallback(() => {
    if (reducedRef.current || coarseRef.current) return;
    setNear(true);
    setActive(true);
  }, []);
  const leave = useCallback(() => {
    if (coarseRef.current) return;
    setActive(false);
  }, []);

  return (
    <div
      ref={rootRef}
      className="group relative h-full w-full"
      onPointerEnter={enter}
      onPointerLeave={leave}
      onFocus={enter}
      onBlur={leave}
      tabIndex={0}
      role="group"
      aria-label={`${member.name} — ${member.role}`}
    >
      <article className="relative h-full min-h-[22rem] overflow-hidden rounded-lg">
        {/* Poster */}
        <Image
          src={member.src}
          alt={`${member.name} - ${member.role}`}
          fill
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          }
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Video layer(s) */}
        {near &&
          member.videos.map((url, idx) => (
            <video
              key={url}
              ref={(el) => {
                videoRefs.current[idx] = el;
              }}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
              style={{
                opacity: ready && active && (!dual || face === idx) ? 1 : 0,
              }}
              src={url}
              muted
              loop={!dual}
              playsInline
              preload="none"
              aria-hidden
              onLoadedData={() => setReady(true)}
              onEnded={
                dual
                  ? () => setFace((f) => (f === 0 ? 1 : 0))
                  : undefined
              }
            />
          ))}

        {/* Legibility + accent treatments */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/24 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/35 via-transparent to-transparent opacity-80" />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 2px ${member.accent}, inset 0 -90px 90px -38px ${member.accent}A0` }}
        />
        <div className="light-scan pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {/* Scanline veil only while the clip is playing */}
        <div
          className="cast-scan pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{ opacity: ready && active ? 0.5 : 0 }}
        />

        {/* REC badge while playing */}
        <div
          className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 backdrop-blur-sm transition-all duration-300"
          style={{ opacity: ready && active ? 1 : 0, transform: ready && active ? "translateY(0)" : "translateY(-6px)" }}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-[#FF2E97] animate-pulse-glow" />
          <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-paper">Rec</span>
        </div>

        {/* Play hint (shown when idle on pointer devices) */}
        <div
          className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0 [@media(hover:hover)]:opacity-100"
          style={{ opacity: active ? 0 : undefined }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-paper" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.18em] text-paper/90">Hover</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.22em]" style={{ color: member.accent }}>
            {member.role}
          </span>
          <h3
            className={`font-display uppercase leading-none tracking-wide text-paper ${
              featured ? "text-4xl sm:text-5xl" : "text-2xl"
            }`}
          >
            {member.name}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/82 sm:text-xs">{member.blurb}</p>
        </div>
      </article>
    </div>
  );
}
