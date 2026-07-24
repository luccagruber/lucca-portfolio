"use client";

import { create } from "zustand";

/**
 * The site's language. Three, and each one is named in its own language —
 * a Dutch visitor looks for "Nederlands", never for "Dutch".
 *
 * Deliberately its own tiny store rather than part of the experience
 * machine: language is a preference that outlives a visit, the drawer and
 * the viewer are a session. Nothing in the scene should be able to reset
 * it, and it should not re-render the machine when it changes.
 */
export const LOCALES = ["en", "pt", "nl"] as const;

export type Locale = (typeof LOCALES)[number];

/** Endonyms — the label a speaker of that language would recognise. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  pt: "Português",
  nl: "Nederlands",
};

/** What goes in <html lang>, which is not always the locale key. */
const HTML_LANG: Record<Locale, string> = {
  en: "en",
  pt: "pt-BR",
  nl: "nl",
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
