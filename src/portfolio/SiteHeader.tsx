"use client";

import { useEffect, useState } from "react";
import { useExperience } from "@/experience/state/store";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/locale";
import { LanguagePill } from "./LanguagePill";

/**
 * True once the contact rail has come into view — the visitor has left
 * the workspace and reached the foot of the page.
 *
 * The header is chrome for the scene. Over the foot it is not just
 * redundant (a Contact button pointing at the thing you are reading), it
 * is in the way: the page ends a fixed distance from the bottom of the
 * screen, so on a phone the last screenful puts the contact rows exactly
 * under the floating pill. Rather than tune spacers against a viewport
 * height that varies by device, the chrome simply stands down when the
 * content it floats over stops being a 3D stage.
 */
function useAtFoot(): boolean {
  const [atFoot, setAtFoot] = useState(false);

  useEffect(() => {
    const rail = document.getElementById("contact");
    if (!rail) return;
    const observer = new IntersectionObserver(
      ([entry]) => setAtFoot(entry.isIntersecting),
      // A little early, so the pill is gone before the rail is under it.
      { rootMargin: "80px 0px 0px 0px" },
    );
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  return atFoot;
}

/**
 * The only permanent chrome on the page. The workspace is a guided scene —
 * things happen because you find them — so the one thing a visitor must
 * never have to hunt for gets a fixed signpost: Contact, top right, always
 * there, jumping straight to the rail at the foot of the page. The language
 * pill sits dead centre for the same reason, one rank more urgent: someone
 * who cannot read the page cannot find anything else on it.
 *
 * On a phone the Contact button is gone (user's call, 2026-07-26). Two
 * floating pills on a 375 px bar is one too many for a scene whose whole
 * argument is that it is uncluttered, and the button buys much less here:
 * the phone page is short, and scrolling past the desk lands on the
 * contact rail within a flick. So the phone keeps the language pill —
 * which is the one control a visitor cannot recover by scrolling — and
 * gives it the whole bar, centred.
 *
 * The pill stays a segmented control rather than collapsing into a
 * floating action button, for the reason it exists at all: a Brazilian has
 * to SEE the word "Português" sitting there. A FAB hides the answer behind
 * a tap and asks to be discovered first.
 *
 * It steps aside while a print or a project file is open: nothing floats
 * over the thing you are reading.
 */
export function SiteHeader() {
  const t = ui[useLocale()];
  const viewer = useExperience((s) => s.viewer);
  const about = useExperience((s) => s.about);
  const atFoot = useAtFoot();
  const busy = viewer !== "closed" || about !== "closed" || atFoot;

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
      <div className="mx-auto grid max-w-[100rem] grid-cols-[1fr_auto_1fr] items-start px-5 py-5 sm:px-10">
        <span aria-hidden />
        <div className={busy ? "pointer-events-none" : ""}>
          <LanguagePill />
        </div>
        <div className="flex justify-end">
          <a
            href="#contact"
            className={`hidden rounded-full border border-line/80 bg-paper/70 px-5 py-2 font-sans text-[11px] font-semibold tracking-[0.2em] text-ink-soft uppercase backdrop-blur-sm transition-colors duration-200 hover:border-line hover:text-ink sm:block ${
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
