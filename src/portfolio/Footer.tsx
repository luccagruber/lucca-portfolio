"use client";

import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/locale";

/**
 * Transparent on purpose — the page's foot gradient is the background
 * (see page.tsx), and this sits at the cool end of it. The ink is the
 * same chocolate as the contact rail above: the rail and the footer are
 * one object, so they read as one.
 */
export function Footer() {
  const t = ui[useLocale()];
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-8 py-10 text-[11px] tracking-[0.08em] text-cocoa/55">
        {/*
         * The colophon. The site is itself a project, and visitors who
         * arrive without Lucca in the room must not mistake it for a
         * template — so this line is set in the display face at reading
         * size and full ink, deliberately louder than the small print
         * around it, with the receipts one click away.
         */}
        <p className="font-display text-[16px] font-medium tracking-normal text-cocoa sm:text-[17px]">
          {t.colophon} {profile.name}. {t.noTemplates}{" "}
          <a
            href="https://github.com/luccagruber/lucca-portifolio"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-cocoa/30 underline-offset-4 transition-colors hover:decoration-cocoa"
          >
            {/*
             * No trailing arrow. U+2197 has an emoji presentation, and
             * iOS picks it: on a phone this line ended in a blue arrow
             * sticker (user, 2026-07-26). The underline already says
             * "link" and the copy already says where it goes, so the
             * glyph was decoration that could only render wrong.
             */}
            {t.sourceOnGitHub}
          </a>
        </p>
        <div className="mt-8 flex items-center justify-between">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a href="#top" className="transition-colors hover:text-cocoa">
            {t.backToTop}
          </a>
        </div>
        <p className="mt-4 text-[10px] leading-relaxed tracking-[0.06em]">
          {t.models}{" "}
          <a
            href="https://sketchfab.com/3d-models/office-desk-140x60-9262f311271c4c4390341e526d3fe103"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-cocoa"
          >
            “Office Desk 140x60” by AleixoAlonso
          </a>
          {" · "}
          <a
            href="https://sketchfab.com/3d-models/macbook-pro-13-inch-2020-efab224280fd4c3993c808107f7c0b38"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-cocoa"
          >
            “MacBook Pro 13 inch 2020” by timblewee
          </a>
          {" · "}
          <a
            href="https://sketchfab.com/3d-models/glasses-007651a9450746a5b6c5a126d484cd52"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-cocoa"
          >
            “Glasses” by Marius.Eder
          </a>
          {" · "}
          <a
            href="https://sketchfab.com/3d-models/starbucks-coffee-paper-cup-c34893d7ef90490b8d65d87753aad8ad"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-cocoa"
          >
            “Starbucks Coffee Paper Cup” by Wittybacon
          </a>
        </p>
      </div>
    </footer>
  );
}
