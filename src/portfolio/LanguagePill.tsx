"use client";

import { useEffect } from "react";
import { LOCALES, LOCALE_NAMES, useLocaleStore } from "@/lib/locale";
import { ui } from "@/content/ui";

/**
 * The language switcher, top centre. All three languages are on screen at
 * once, side by side — the point is not to *offer* a choice to whoever goes
 * looking for it, it is that a Brazilian sees the word "Português" sitting
 * there and knows, before reading anything else, that this site speaks to
 * them. A collapsed pill showing only the current language cannot do that:
 * it asks to be discovered first.
 *
 * So it is a segmented control, not a menu. The selected language keeps a
 * soft filled capsule that slides between the three (each segment animates
 * its own background, which needs no measuring and cannot desync), and the
 * shape stays one object the whole time.
 */
export function LanguagePill() {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const hydrate = useLocaleStore((s) => s.hydrate);

  // Restore the remembered choice once, on the client.
  useEffect(() => hydrate(), [hydrate]);

  return (
    <div
      role="group"
      aria-label={ui[locale].language}
      className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-line/70 bg-paper/80 p-1 shadow-[0_8px_28px_-16px_rgba(28,22,10,0.5)] backdrop-blur-md"
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            lang={code === "pt" ? "pt-BR" : code}
            className={`rounded-full px-3 py-1.5 font-sans text-[11px] whitespace-nowrap transition-colors duration-300 sm:px-4 sm:text-[12px] ${
              active
                ? "bg-ink/8 font-semibold text-ink"
                : "font-medium text-ink-soft hover:bg-ink/4 hover:text-ink"
            }`}
          >
            {LOCALE_NAMES[code]}
          </button>
        );
      })}
    </div>
  );
}
