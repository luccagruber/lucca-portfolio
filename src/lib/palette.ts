/**
 * Workspace material palette — the single source of color truth for the
 * 3D scene. The DOM tokens in `src/app/globals.css` mirror a subset of
 * these values; keep both in sync when tuning.
 *
 * Vision rules encoded here:
 * - neutral, quiet, corporate — no saturated color in the workspace
 * - project identity colors exist ONLY inside opened project files
 *   (they live in `src/content/projects.ts`, never here)
 */
export const palette = {
  /** Canvas clear color and page background — the intentionally ignored room. */
  stage: "#E9E7E2",

  // The room behind the desk — quiet, receives the key-light shadows.
  floor: "#D8D4CC",
  wall: "#E3E0DA",

  // Folders
  manila: "#D9C89E", // Warm Cream (vision)
  manilaDeep: "#CDBA8C",
  manilaInside: "#E3D6B2", // inside faces of the covers
  tabInk: "#41403B",

  // Props
  paper: "#FBFAF7",
  cupPaper: "#F6F4EF",
  kraft: "#C29A6B", // kraft sleeve
  coffee: "#3B2E26",
  matteBlack: "#26262A", // pen holder, picture frame, nameplate (vision)
  engraving: "#DCDAD4", // nameplate lettering
  photoMatte: "#E9E4D9",
  pen: "#3A3A3E",
  penAccent: "#6E7178",
} as const;
