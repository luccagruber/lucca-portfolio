"use client";

import { useExperience } from "@/experience/state/store";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/locale";
import { LanguagePill } from "./LanguagePill";

/**
 * The only permanent chrome on the page. The workspace is a guided scene —
 * things happen because you find them — so the one thing a visitor must
 * never have to hunt for gets a fixed signpost: Contact, top right, always
 * there, jumping straight to the rail at the foot of the page. The language
 * pill sits dead centre for the same reason, one rank more urgent: someone
 * who cannot read the page cannot find anything else on it.
 *
 * It steps aside while a print or a project file is open: nothing floats
 * over the thing you are reading.
 */
export function SiteHeader() {
  const t = ui[useLocale()];
  const viewer = useExperience((s) => s.viewer);
  const about = useExperience((s) => s.about);
  const busy = viewer !== "closed" || about !== "closed";

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-40 transition-opacity duration-300 ${
        busy ? "opacity-0" : "opacity-100"
      }`}
    >
      {/*
       * Three columns rather than a flex row with a spacer: the language
       * pill has to sit on the page's centre line, not the centre of
       * whatever is left over beside the Contact button — and it must not
       * shift when the pill grows or a translated Contact label changes
       * width. The outer columns are equal-width, so the middle one is
       * always the true centre.
       */}
      <div className="mx-auto grid max-w-[100rem] grid-cols-[1fr_auto_1fr] items-start px-6 py-5 sm:px-10">
        <span aria-hidden />
        <div className={busy ? "pointer-events-none" : ""}>
          <LanguagePill />
        </div>
        <div className="flex justify-end">
          <a
            href="#contact"
            className={`rounded-full border border-line/80 bg-paper/70 px-5 py-2 font-sans text-[11px] font-semibold tracking-[0.2em] text-ink-soft uppercase backdrop-blur-sm transition-colors duration-200 hover:border-line hover:text-ink ${
              busy ? "" : "pointer-events-auto"
            }`}
          >
            {t.contact}
          </a>
        </div>
      </div>
    </header>
  );
}
