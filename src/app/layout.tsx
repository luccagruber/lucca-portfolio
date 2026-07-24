import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Newsreader } from "next/font/google";
import { profile, profileText } from "@/content/profile";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Report typography: Fraunces carries headings (warm, editorial, nothing
// like a system font), Newsreader carries running text (bookish, made
// for long-form reading on "paper").
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: profile.name,
  // Static export: one document is prerendered, so the crawlable
  // description is the English one. The language switch is a client
  // preference and does not change what a crawler is served.
  description: `${profileText.en.tagline} Portfolio of ${profile.name} — ${profile.location}.`,
};

export const viewport: Viewport = {
  themeColor: "#e9e7e2",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${newsreader.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
