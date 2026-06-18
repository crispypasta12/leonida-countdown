"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import type { CastMember } from "@/lib/content";

/**
 * A single cast tile. Shows the portrait poster, then plays the character's
 * Cloudinary clip when the card is hovered/focused (pointer devices) or scrolled
 * into view (touch devices). Sources are attached lazily — nothing downloads
 * until the card nears the viewport — so eight 4K masters never hit first load.
 *
 * The couple's tile carries two clips and cross-fades between Jason and Lucia.
 */
type CastCardProps = {
  member: CastMember;
  featured?: boolean;
  compact?: boolean;
  spotlight?: boolean;
  onActivate?: () => void;
};

export function CastCard({ member, featured, compact = false, spotlight = false, onActivate }: CastCardProps) {
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

  const live = active || spotlight;

  // Drive play/pause from `live`.
  useEffect(() => {
    if (compact) return;
    const vids = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
    if (live && near) {
      vids.forEach((v) => {
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      });
    } else {
      vids.forEach((v) => v.pause());
    }
  }, [compact, live, near]);

  // Cross-fade the couple's two clips on a gentle interval.
  useEffect(() => {
    if (compact || !dual || !live) return;
    const id = setInterval(() => setFace((f) => (f === 0 ? 1 : 0)), 3600);
    return () => clearInterval(id);
  }, [compact, dual, live]);

  const enter = useCallback(() => {
    onActivate?.();
    if (reducedRef.current || coarseRef.current) return;
    setNear(true);
    setActive(true);
  }, [onActivate]);
  const leave = useCallback(() => {
    const el = rootRef.current;
    if (el) {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
      el.style.setProperty("--glow-x", "50%");
      el.style.setProperty("--glow-y", "50%");
    }
    if (coarseRef.current) return;
    setActive(false);
  }, []);
  const move = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (reducedRef.current || coarseRef.current) return;
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    el.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
    el.style.setProperty("--tilt-y", `${(x - 0.5) * 9}deg`);
    el.style.setProperty("--glow-x", `${x * 100}%`);
    el.style.setProperty("--glow-y", `${y * 100}%`);
  }, []);
  const toggle = useCallback(() => {
    if (reducedRef.current) return;
    onActivate?.();
    setNear(true);
    setActive((value) => (coarseRef.current ? !value : true));
  }, [onActivate]);
  const keyToggle = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    if (reducedRef.current) return;
    onActivate?.();
    setNear(true);
    setActive((value) => !value);
  }, [onActivate]);

  const rootStyle = {
    "--accent": member.accent,
    "--tilt-x": "0deg",
    "--tilt-y": "0deg",
    "--glow-x": "50%",
    "--glow-y": "50%",
  } as CSSProperties;
  const showMotion = !compact;
  const indicatorLive = compact ? spotlight : ready && live;

  return (
    <div
      ref={rootRef}
      className="group relative h-full w-full"
      style={rootStyle}
      onPointerEnter={enter}
      onPointerMove={move}
      onPointerLeave={leave}
      onFocus={enter}
      onBlur={leave}
      onClick={toggle}
      onKeyDown={keyToggle}
      tabIndex={0}
      role="button"
      aria-pressed={live}
      aria-label={`${member.name} — ${member.role}`}
    >
      <article
        className={`relative h-full overflow-hidden rounded-lg transition-transform duration-300 ease-out ${
          compact ? "aspect-[3/4] min-h-0" : "min-h-[14.5rem] sm:min-h-[22rem]"
        }
                   [transform:perspective(900px)_rotateX(var(--tilt-x))_rotateY(var(--tilt-y))]`}
      >
        {/* Poster */}
        <Image
          src={member.src}
          alt={`${member.name} - ${member.role}`}
          fill
          sizes={
            compact
              ? "(max-width: 1024px) 42vw, 12vw"
              : featured
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          }
          className={`${compact ? "object-cover" : "object-cover group-hover:scale-110 group-focus:scale-110"} transition duration-700`}
          style={{
            filter: live ? "saturate(1.16) contrast(1.06)" : "saturate(0.9) contrast(0.98)",
            objectPosition: compact ? member.thumbnailPosition ?? "50% 32%" : undefined,
          }}
        />

        {/* Video layer(s) */}
        {showMotion &&
          near &&
          member.videos.map((url, idx) => (
            <video
              key={url}
              ref={(el) => {
                videoRefs.current[idx] = el;
              }}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
              style={{
                opacity: ready && live && (!dual || face === idx) ? 1 : 0,
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
        <div className={`absolute inset-0 bg-gradient-to-t ${compact ? "from-ink/50 via-transparent to-ink/8" : "from-ink via-ink/24 to-transparent"}`} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/35 via-transparent to-transparent opacity-80" />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--glow-x) var(--glow-y), color-mix(in srgb, var(--accent) 42%, transparent), transparent 32%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100"
          style={{ boxShadow: `inset 0 0 0 2px ${member.accent}, inset 0 -90px 90px -38px ${member.accent}A0` }}
        />
        {showMotion ? (
          <div className="light-scan pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100" />
        ) : null}
        {showMotion ? (
          <>
            <div
              className="signal-flicker pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{ opacity: ready && live ? 0.26 : 0 }}
            />
            <div
              className="signal-acquire pointer-events-none absolute inset-x-0 top-0 h-full transition-opacity duration-300"
              style={{ opacity: ready && live ? 0.36 : 0 }}
            />
            <div
              className="cast-scan pointer-events-none absolute inset-0 transition-opacity duration-500"
              style={{ opacity: ready && live ? 0.5 : 0 }}
            />
          </>
        ) : null}

        {!compact ? (
          <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-white/15 bg-black/45 p-2 backdrop-blur-sm">
            <span
              className="block h-2 w-2 rounded-full"
              style={{
                backgroundColor: indicatorLive ? member.accent : "rgba(253,246,238,0.45)",
                boxShadow: indicatorLive ? `0 0 14px ${member.accent}` : undefined,
              }}
            />
          </div>
        ) : null}

        {compact ? (
          <div className="pointer-events-none absolute bottom-3 left-3 z-10 max-w-[calc(100%-1.5rem)] rounded-full border border-white/15 bg-black/60 px-2.5 py-1 backdrop-blur-sm">
            <span className="block truncate font-mono text-[0.58rem] font-bold uppercase tracking-[0.16em] text-paper">
              {member.name}
            </span>
          </div>
        ) : null}

        {!compact ? (
          <>
            <div className="pointer-events-none absolute left-3 top-14 z-10 h-14 w-px bg-gradient-to-b from-[var(--accent)] to-transparent opacity-70" />
            <div className="pointer-events-none absolute right-3 top-14 z-10 h-14 w-px bg-gradient-to-b from-[var(--accent)] to-transparent opacity-70" />
            <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-70" />
          </>
        ) : null}

        {showMotion ? (
          <div
            className="pointer-events-none absolute right-3 top-14 flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 backdrop-blur-sm transition-all duration-300"
            style={{ opacity: ready && live ? 1 : 0, transform: ready && live ? "translateY(0)" : "translateY(-6px)" }}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-[#FF2E97] animate-pulse-glow" />
            <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-paper">Rec</span>
          </div>
        ) : null}

        {!compact ? (
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <span className="text-[0.58rem] font-bold uppercase tracking-[0.18em] sm:text-[0.62rem] sm:tracking-[0.22em]" style={{ color: member.accent }}>
              {member.role}
            </span>
            <h3 className={`font-display uppercase leading-none tracking-wide text-paper ${featured ? "text-3xl sm:text-5xl" : "text-2xl"}`}>
              {member.name}
            </h3>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-paper/82 sm:mt-3">{member.blurb}</p>
          </div>
        ) : null}
      </article>
    </div>
  );
}
