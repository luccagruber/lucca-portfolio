"use client";

import { create } from "zustand";

/**
 * The site's language. Each one is named in its own language — a Brazilian
 * looks for "Português", never for "Portuguese".
 *
 * Dutch was built and then removed (Lucca, 2026-07-24): he does not speak
 * it fluently enough to stand behind the writing, and the About print is a
 * claim about who he is. A language you cannot vouch for is worse than one
 * you do not offer. Adding a locale back is: a key here, a block in
 * `content/ui.ts`, an entry in `profileText`, and a file in
 * `content/projects/`.
 *
 * Deliberately its own tiny store rather than part of the experience
 * machine: language is a preference that outlives a visit, the drawer and
 * the viewer are a session. Nothing in the scene should be able to reset
 * it, and it should not re-render the machine when it changes.
 */
export const LOCALES = ["en", "pt"] as const;

export type Locale = (typeof LOCALES)[number];

/** Endonyms — the label a speaker of that language would recognise. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  pt: "Português",
};

/** What goes in <html lang>, which is not always the locale key. */
const HTML_LANG: Record<Locale, string> = {
  en: "en",
  pt: "pt-BR",
};

const STORAGE_KEY = "lucca-locale";

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Read the remembered choice. Client-only; call once on mount. */
  hydrate: () => void;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  // English until told otherwise. The site is statically exported, so
  // guessing from navigator.language would mean rendering English and then
  // visibly repainting in another language — worse than one honest default
  // with an obvious way to change it.
  locale: "en",

  setLocale(locale) {
    set({ locale });
    document.documentElement.lang = HTML_LANG[locale];
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // Private mode / blocked storage: the choice simply lasts one visit.
    }
  },

  hydrate() {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      return;
    }
    if (!isLocale(stored)) return;
    set({ locale: stored });
    document.documentElement.lang = HTML_LANG[stored];
  },
}));

/** The current language. */
export function useLocale(): Locale {
  return useLocaleStore((s) => s.locale);
}
