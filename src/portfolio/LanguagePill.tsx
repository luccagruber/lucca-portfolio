"use client";

import { useEffect, useRef, useState } from "react";
import { LOCALES, LOCALE_NAMES, useLocaleStore, type Locale } from "@/lib/locale";
import { ui } from "@/content/ui";

/**
 * The language switcher, top centre — the one control on the whole site
 * that has to be found without looking for it, because a visitor who can't
 * read the page can't discover anything else either.
 *
 * It behaves like the iPhone's dynamic island: a small closed pill that
 * grows into the list of languages and shrinks back, one continuous shape
 * the whole way. The morph is a real spring (the pill overshoots slightly
 * on the way out and settles), which is what makes it read as one object
 * changing size rather than a menu appearing over a button. No GSAP here —
 * the whole animation is a width/height transition plus a per-row fade, so
 * it costs nothing and cannot desync from the scene's timelines.
 *
 * Each language is written in its own language: a Dutch visitor scans for
 * "Nederlands", never for "Dutch".
 */
export function LanguagePill() {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const hydrate = useLocaleStore((s) => s.hydrate);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Restore the remembered choice once, on the client.
  useEffect(() => hydrate(), [hydrate]);

  // Click-away and Escape close it. Pointerdown rather than click so the
  // pill closes on the press, not after the release.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (next: Locale) => {
    setLocale(next);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="pointer-events-auto relative">
      {/*
       * One element carries the shape, so there is nothing to cross-fade:
       * closed it is the height of a single row, open it is the height of
       * three. `grid-rows` animates because both ends are explicit.
       */}
      <div
        className={`overflow-hidden rounded-[1.4rem] border border-line/70 bg-paper/80 shadow-[0_8px_28px_-14px_rgba(28,22,10,0.5)] backdrop-blur-md transition-[width,height,border-radius] duration-[420ms] [transition-timing-function:cubic-bezier(0.34,1.4,0.5,1)] ${
          open ? "h-[8.25rem] w-[11rem]" : "h-9 w-[7.5rem]"
        }`}
      >
        {open ? (
          <ul className="flex flex-col py-1.5" role="listbox" aria-label={ui[locale].language}>
            {LOCALES.map((code, i) => (
              <li key={code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={code === locale}
                  onClick={() => choose(code)}
                  // Rows arrive staggered, so the list unfolds with the
                  // shape instead of landing inside it fully formed.
                  style={{ animationDelay: `${60 + i * 45}ms` }}
                  className={`flex w-full animate-[pill-row_260ms_both] items-center justify-between px-4 py-[0.4rem] text-left font-sans text-[13px] transition-colors ${
                    code === locale
                      ? "font-semibold text-ink"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {LOCALE_NAMES[code]}
                  {code === locale ? (
                    <span aria-hidden className="ml-3 block size-[5px] rounded-full bg-ink/70" />
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="listbox"
            aria-expanded={false}
            aria-label={ui[locale].language}
            className="flex size-full items-center justify-center gap-2 font-sans text-[12px] font-medium text-ink-soft transition-colors hover:text-ink"
          >
            {/* A globe, not a flag: languages are not countries, and
                Português would have to pick between two of them. */}
            <svg viewBox="0 0 24 24" aria-hidden className="size-[13px] shrink-0" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
              <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.6" />
              <path d="M3.5 9h17M3.5 15h17" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            {LOCALE_NAMES[locale]}
          </button>
        )}
      </div>
    </div>
  );
}
