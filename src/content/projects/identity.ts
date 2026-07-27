import type { ProjectIdentity } from "../types";

/**
 * A project's visual language is a property of the project, not of the
 * language it is read in — so the colours live here once and every
 * translation imports them. Per the vision they apply only inside an
 * opened folder; the workspace itself stays neutral.
 */

export const acculIdentity: ProjectIdentity = {
  background: "#0B0B0B",
  ink: "#EAE8E1",
  inkSoft: "#9C9A92",
  accent: "#4A6741",
  accentBright: "#8FAF83",
  rule: "#242622",
};

export const gruberIdentity: ProjectIdentity = {
  background: "#F5F5F5",
  ink: "#00303F",
  inkSoft: "#4A6572",
  accent: "#A93226",
  accentBright: "#A93226",
  rule: "#D9DCDD",
};

/** Where the live copy of the Gruber Goal operations platform is served. */
export const GRUBER_PLATFORM_URL = "https://copia-gesta-grubergoal.duckdns.org";

/** Accul Reburg's public listing — live on the Chrome Web Store since 27 July 2026. */
export const ACCUL_STORE_URL =
  "https://chromewebstore.google.com/detail/efiokhkpcjkbbfccnfgocflcnkbhjipf";
