import type { Locale } from "@/lib/locale";
import type { ProjectId, ProjectReport } from "../types";
import { en } from "./en";
import { pt } from "./pt";
import { nl } from "./nl";

/**
 * The drawer's two files, in every language. Every locale carries the same
 * two projects, in the same order, with the same ids — the scene builds its
 * folders and anchors from that structure, so it must not vary by language.
 * Only the words change.
 */
export const projectsByLocale: Record<Locale, readonly ProjectReport[]> = { en, pt, nl };

/**
 * Structure only — order, ids, folder tab labels. Anything that reads
 * *copy* must go through `reportsFor(locale)` instead, or it will be stuck
 * in English.
 */
export const projectReports = en;

export function reportsFor(locale: Locale): readonly ProjectReport[] {
  return projectsByLocale[locale] ?? en;
}

export function reportById(id: ProjectId, locale: Locale = "en"): ProjectReport {
  const report = reportsFor(locale).find((r) => r.id === id);
  if (!report) throw new Error(`Unknown project id: ${id}`);
  return report;
}
