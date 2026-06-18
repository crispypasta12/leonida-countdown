import type { Metadata, Viewport } from "next";
import { Anton, Outfit, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://leonida-countdown.vercel.app";
const TITLE = "Leonida Countdown - Grand Theft Auto VI";
const DESCRIPTION =
  "The unofficial countdown to Grand Theft Auto VI. Pre-orders June 25, launch November 19, 2026. Welcome back to Vice City - welcome to Leonida.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "GTA VI",
    "GTA 6",
    "Grand Theft Auto VI",
    "countdown",
    "Vice City",
    "Leonida",
    "release date",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Leonida Countdown",
    images: [
      {
        url: "/art/og/cover.jpg",
        width: 2400,
        height: 1350,
        alt: "Grand Theft Auto VI official cover art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/art/og/cover.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0614",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="grain scanlines font-body antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
