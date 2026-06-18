# Leonida Countdown — GTA VI Fan Hype Page

An unofficial, fan-made single-page countdown to **Grand Theft Auto VI**. Neon
synthwave / Vice City aesthetic, live dual countdowns, postcard gallery, and cast.

> **Disclaimer:** Unofficial fan project. Not affiliated with, endorsed by, or
> sponsored by Rockstar Games or Take-Two Interactive. All artwork is the property
> of its respective owners, used here for non-commercial fan celebration.

## Stack

- **Next.js 14 (App Router) + TypeScript** — first-class image optimization,
  metadata/OG API, zero-config Vercel deploys.
- **Tailwind CSS** — design tokens straight from the cover-art palette.
- `next/image` serves AVIF/WebP at responsive sizes so the heavy key art stays fast.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## The two countdowns

Both targets are **fixed absolute UTC instants** — every visitor sees the same
number regardless of timezone. They live as named constants at the top of
[`lib/countdown.ts`](lib/countdown.ts):

| Target     | Local (ET)                 | UTC instant            | epoch ms        |
| ---------- | -------------------------- | ---------------------- | --------------- |
| Pre-orders | Jun 25, 2026 · 9:00 AM EDT | `2026-06-25T13:00:00Z` | `1782392400000` |
| Release    | Nov 19, 2026 · 12:00 AM EST| `2026-11-19T05:00:00Z` | `1795064400000` |

DST is intentional: Eastern is **EDT (UTC−4)** in June but **EST (UTC−5)** in
November (DST ends Nov 1, 2026). The 9:00 AM pre-order time is an assumption —
edit the constants to change every timer on the page.

## Features

- Live flip-tile countdowns (tabular numerals, per-second tick, "It's live" state).
- Downloadable `.ics` calendar files for both dates.
- Share: native Web Share API on mobile, X intent + copy-link on desktop.
- Open Graph + Twitter card meta (uses the official cover art as `og:image`).
- Fully responsive to ~360px, `prefers-reduced-motion` honored, keyboard-accessible.

## Deploy to Vercel

Import the repo (root directory `web/`) into Vercel — it builds out of the box.
Optionally set `NEXT_PUBLIC_SITE_URL` to your production domain so OG URLs are absolute.
