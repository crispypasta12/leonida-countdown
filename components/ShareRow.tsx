"use client";

import { useEffect, useRef, useState } from "react";

const SHARE_TEXT =
  "The countdown to Grand Theft Auto VI is on. Pre-orders June 25, launch November 19, 2026. Welcome to Leonida.";

export function ShareRow({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "https://leonida-countdown.vercel.app";

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Leonida Countdown - GTA VI", text: SHARE_TEXT, url: shareUrl });
        return;
      } catch {
        return;
      }
    }

    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      SHARE_TEXT
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(intent, "_blank", "noopener,noreferrer");
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink to-violet
                   px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white min-[420px]:w-auto
                   shadow-neon-pink transition hover:brightness-110 active:scale-95"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M18 8a3 3 0 10-2.83-4M6 12a3 3 0 100 0m12 4a3 3 0 10-2.83 4M8.6 13.5l6.8 3.5M15.4 7L8.6 10.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Share the hype
      </button>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-cyan/40 bg-white/5
                   px-4 py-2.5 text-sm font-semibold text-cyan transition hover:bg-white/10 min-[420px]:w-auto"
      >
        {copied ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M5 15V5a2 2 0 012-2h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Copy link
          </>
        )}
      </button>
    </div>
  );
}
