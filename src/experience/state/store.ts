import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { ProjectId } from "@/content/types";

/**
 * The experience state machine.
 *
 * Architecture rules (docs/Experience Architecture.md):
 * - React owns state; GSAP owns animations; R3F owns rendering.
 * - Systems communicate only through these explicit state changes.
 * - Every `*ing` phase is entered by a user event and exited by the
 *   owning system's animation calling its completion action.
 *
 * Phase ownership:
 * - drawer  — animated by the Drawer system.
 * - viewer  — "folder-lifting" / "folder-returning" are animated by the
 *   Folder system; "opening" / "closing" by the Project Viewer.
 * - Folder phases (hidden / revealed / selected / returning) are derived —
 *   see `folderPhaseFor` — so there is exactly one source of truth.
 */

export type DrawerPhase = "closed" | "opening" | "open" | "closing";

export type ViewerPhase =
  | "closed"
  | "folder-lifting" // folder rises out of the drawer toward the camera
  | "opening" // report overlay enters
  | "viewing" // click-navigated reading; page scroll is locked
  | "closing" // report overlay exits
  | "folder-returning"; // folder settles back into the drawer

export type FolderPhase = "hidden" | "revealed" | "selected" | "returning";

/** Viewport-relative point (0–100%) where the lifted folder settled. */
export interface ApexPoint {
  x: number;
  y: number;
}

interface ExperienceState {
  drawer: DrawerPhase;
  viewer: ViewerPhase;
  activeProject: ProjectId | null;
  /** Current report page index while viewing. */
  page: number;
  /**
   * When true, the transition just entered should render its end state
   * immediately (scroll restoration on load, reduced motion).
   */
  instant: boolean;
  /** Hand-off origin for the report overlay entrance. */
  apex: ApexPoint | null;

  // Drawer events
  openDrawer(opts?: { instant?: boolean }): void;
  drawerOpened(): void;
  closeDrawer(opts?: { instant?: boolean }): void;
  drawerClosed(): void;

  // Folder / viewer events
  selectProject(id: ProjectId): void;
  folderLifted(apex: ApexPoint | null): void;
  viewerOpened(): void;
  closeProject(): void;
  viewerDismissed(): void;
  folderReturned(): void;

  // Report navigation (clicks only — never scroll)
  goToPage(page: number): void;
}

export const useExperience = create<ExperienceState>()(
  subscribeWithSelector((set, get) => ({
    drawer: "closed",
    viewer: "closed",
    activeProject: null,
    page: 0,
    instant: false,
    apex: null,

    openDrawer(opts) {
      if (get().drawer !== "closed") return;
      set({ drawer: "opening", instant: opts?.instant ?? false });
    },
    drawerOpened() {
      if (get().drawer !== "opening") return;
      set({ drawer: "open", instant: false });
    },
    closeDrawer(opts) {
      const s = get();
      if (s.drawer !== "open" || s.viewer !== "closed") return;
      set({ drawer: "closing", instant: opts?.instant ?? false });
    },
    drawerClosed() {
      if (get().drawer !== "closing") return;
      set({ drawer: "closed", instant: false });
    },

    selectProject(id) {
      const s = get();
      if (s.drawer !== "open" || s.viewer !== "closed") return;
      set({ activeProject: id, viewer: "folder-lifting", page: 0 });
    },
    folderLifted(apex) {
      if (get().viewer !== "folder-lifting") return;
      set({ viewer: "opening", apex });
    },
    viewerOpened() {
      if (get().viewer !== "opening") return;
      set({ viewer: "viewing" });
    },
    closeProject() {
      const v = get().viewer;
      // Closable once the report is entering or fully open.
      if (v !== "viewing" && v !== "opening") return;
      set({ viewer: "closing" });
    },
    viewerDismissed() {
      if (get().viewer !== "closing") return;
      set({ viewer: "folder-returning" });
    },
    folderReturned() {
      if (get().viewer !== "folder-returning") return;
      set({ viewer: "closed", activeProject: null, apex: null, page: 0 });
    },

    goToPage(page) {
      if (get().viewer !== "viewing") return;
      // Upper bound is enforced by the viewer, which knows the page count.
      set({ page: Math.max(0, page) });
    },
  })),
);

/**
 * Derived folder phase — the Folder System's four states without a second
 * source of truth. During "opening"/"closing" the drawer timeline is what
 * physically reveals or hides the folders; the phase names the target.
 */
export function folderPhaseFor(
  state: Pick<ExperienceState, "drawer" | "viewer" | "activeProject">,
  id: ProjectId,
): FolderPhase {
  if (state.activeProject === id) {
    if (state.viewer === "folder-returning") return "returning";
    if (state.viewer !== "closed") return "selected";
  }
  return state.drawer === "open" || state.drawer === "opening"
    ? "revealed"
    : "hidden";
}
