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

  // Desk
  deskTop: "#F4F4F2", // Matte Office White (vision)
  deskFrame: "#E0DFDA",

  // Filing cabinet
  cabinet: "#A8ADB3", // Soft Office Gray (vision)
  cabinetFace: "#9FA4AA",
  drawerInterior: "#84898F", // slightly darker neutral gray (vision)
  handle: "#5E636A",
  labelPlate: "#E7E6E2",

  // Cubicle partition
  partition: "#DBD9D3",
  partitionFrame: "#C6C4BD",

  // Folders
  manila: "#D9C89E", // Warm Cream (vision)
  manilaDeep: "#CDBA8C",
  tabInk: "#41403B",

  // Props
  paper: "#FBFAF7",
  cupPaper: "#F6F4EF",
  kraft: "#C29A6B", // kraft sleeve
  matteBlack: "#26262A", // pen holder, picture frame, nameplate (vision)
  engraving: "#DCDAD4", // nameplate lettering
  photoMatte: "#DCD7CC",
  photoPrint: "#AFA99B",
  pen: "#3A3A3E",
} as const;
