"use client";

import { useExperience } from "@/experience/state/store";

/**
 * The only permanent chrome on the page. The workspace is a guided scene —
 * things happen because you find them — so the one thing a visitor must
 * never have to hunt for gets a fixed signpost: Contact, top right, always
 * there, jumping straight to the rail at the foot of the page.
 *
 * It steps aside while a print or a project file is open: nothing floats
 * over the thing you are reading.
 */
export function SiteHeader() {
  const viewer = useExperience((s) => s.viewer);
  const about = useExperience((s) => s.about);
  const busy = viewer !== "closed" || about !== "closed";

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-40 transition-opacity duration-300 ${
        busy ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="mx-auto flex max-w-[100rem] justify-end px-6 py-5 sm:px-10">
        <a
          href="#contact"
          className={`rounded-full border border-line/80 bg-paper/70 px-5 py-2 font-sans text-[11px] font-semibold tracking-[0.2em] text-ink-soft uppercase backdrop-blur-sm transition-colors duration-200 hover:border-line hover:text-ink ${
            busy ? "" : "pointer-events-auto"
          }`}
        >
          Contact
        </a>
      </div>
    </header>
  );
}
