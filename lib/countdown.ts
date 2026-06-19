export const PREORDER_UTC_MS = Date.UTC(2026, 5, 25, 13, 0, 0);
export const RELEASE_UTC_MS = Date.UTC(2026, 10, 19, 5, 0, 0);

export type CountdownTarget = {
  key: "preorder" | "release";
  kicker: string;
  title: string;
  whenLabel: string;
  targetMs: number;
  liveTitle: string;
  liveBlurb: string;
  accent: "cyan" | "pink";
};

export const TARGETS: CountdownTarget[] = [
  {
    key: "preorder",
    kicker: "Lock it in",
    title: "Pre-Orders Open",
    whenLabel: "June 25, 2026 - 9:00 AM ET",
    targetMs: PREORDER_UTC_MS,
    liveTitle: "Pre-Orders Are Live",
    liveBlurb: "Reserve your ticket to Leonida. Go, go, go.",
    accent: "cyan",
  },
  {
    key: "release",
    kicker: "The big one",
    title: "Launch Day",
    whenLabel: "November 19, 2026 - 12:00 AM ET",
    targetMs: RELEASE_UTC_MS,
    liveTitle: "Welcome to Leonida",
    liveBlurb: "Grand Theft Auto VI is here. The Sunshine State never sleeps.",
    accent: "pink",
  },
];

export type TimeParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

const MS_SEC = 1000;
const MS_MIN = MS_SEC * 60;
const MS_HOUR = MS_MIN * 60;
const MS_DAY = MS_HOUR * 24;

export function diffToParts(targetMs: number, nowMs: number): TimeParts {
  const remaining = Math.max(0, targetMs - nowMs);
  return {
    days: Math.floor(remaining / MS_DAY),
    hours: Math.floor((remaining % MS_DAY) / MS_HOUR),
    minutes: Math.floor((remaining % MS_HOUR) / MS_MIN),
    seconds: Math.floor((remaining % MS_MIN) / MS_SEC),
    done: remaining <= 0,
  };
}

export function pad(n: number, len = 2): string {
  return String(n).padStart(len, "0");
}

function toICSDate(ms: number): string {
  return new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function buildICS(opts: {
  uid: string;
  title: string;
  description: string;
  startMs: number;
  durationMinutes?: number;
}): string {
  const { uid, title, description, startMs, durationMinutes = 60 } = opts;
  const endMs = startMs + durationMinutes * 60 * 1000;
  const stamp = toICSDate(Date.now());
  const esc = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GTA VI countdown//Fan Made//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toICSDate(startMs)}`,
    `DTEND:${toICSDate(endMs)}`,
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc(description)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT60M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${esc(title)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadICS(filename: string, ics: string): void {
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
