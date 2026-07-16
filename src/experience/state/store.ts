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
 * - about   — "frame-lifting" / "frame-returning" are animated by the
 *   Picture Frame system; "opening" / "closing" by the About viewer.
 * - Folder phases (hidden / revealed / selected / returning) are derived —
 *   see `folderPhaseFor` — so there is exactly one source of truth.
 *
 * `viewer` and `about` are the two doors out of the workspace and they are
 * mutually exclusive: each one's open guard requires the other closed.
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

/**
 * The About flip. Same shape as `viewer` — the picture frame flies to the
 * camera apex and hands its screen quad to the DOM frame, which turns the
 * photograph over: About is written on the back of the print.
 *
 * Phase ownership: "frame-lifting" / "frame-returning" are animated by the
 * Picture Frame system; "opening" / "closing" by the About viewer.
 */
export type AboutPhase =
  | "closed"
  | "frame-lifting"
  | "opening"
  | "viewing"
  | "closing"
  | "frame-returning";

/**
 * Screen-space quad (viewport-relative, 0–100) where the lifted 3D folder
 * settled: the DOM folder mounts exactly over it, so the hand-off frame is
 * invisible. `h` is the folder's projected height as % of viewport height.
 */
export interface ApexQuad {
  x: number;
  y: number;
  h: number;
}

interface ExperienceState {
  drawer: DrawerPhase;
  viewer: ViewerPhase;
  about: AboutPhase;
  activeProject: ProjectId | null;
  /** Folder under the pointer (drawer open, viewer closed) — the other one dims. */
  hoveredFolder: ProjectId | null;
  /** Current report page index while viewing. */
  page: number;
  /**
   * When true, the transition just entered should render its end state
   * immediately (scroll restoration on load, reduced motion).
   */
  instant: boolean;
  /** Hand-off quad for the DOM folder entrance. */
  apex: ApexQuad | null;
  /** Hand-off quad for the DOM picture frame entrance. */
  aboutApex: ApexQuad | null;
  /** When WebGL support fails or context is lost, fallback to DOM layout. */
  webglFallback: boolean;
  /** The desk asset is loaded and the first frame is composed. */
  sceneReady: boolean;

  setWebglFallback(value: boolean): void;
  setSceneReady(value: boolean): void;
  setHoveredFolder(id: ProjectId | null): void;

  // Drawer events
  openDrawer(opts?: { instant?: boolean }): void;
  drawerOpened(): void;
  closeDrawer(opts?: { instant?: boolean }): void;
  drawerClosed(): void;

  // Folder / viewer events
  selectProject(id: ProjectId): void;
  folderLifted(apex: ApexQuad | null): void;
  viewerOpened(): void;
  closeProject(): void;
  viewerDismissed(): void;
  folderReturned(): void;

  // About events (the picture frame turns over)
  openAbout(): void;
  aboutFrameLifted(apex: ApexQuad | null): void;
  aboutOpened(): void;
  closeAbout(): void;
  aboutDismissed(): void;
  aboutFrameReturned(): void;

  // Report navigation (clicks only — never scroll)
  goToPage(page: number): void;
}

export const useExperience = create<ExperienceState>()(
  subscribeWithSelector((set, get) => ({
    drawer: "closed",
    viewer: "closed",
    about: "closed",
    activeProject: null,
    hoveredFolder: null,
    page: 0,
    instant: false,
    apex: null,
    aboutApex: null,
    webglFallback: false,
    sceneReady: false,

    setWebglFallback(value) {
      set({ webglFallback: value });
    },
    setSceneReady(value) {
      set({ sceneReady: value });
    },
    setHoveredFolder(id) {
      set({ hoveredFolder: id });
    },

    openDrawer(opts) {
      const s = get();
      if (s.drawer !== "closed" || s.about !== "closed") return;
      set({ drawer: "opening", instant: opts?.instant ?? false });
    },
    drawerOpened() {
      if (get().drawer !== "opening") return;
      set({ drawer: "open", instant: false });
    },
    closeDrawer(opts) {
      const s = get();
      if (s.drawer !== "open" || s.viewer !== "closed" || s.about !== "closed") return;
      set({ drawer: "closing", instant: opts?.instant ?? false });
    },
    drawerClosed() {
      if (get().drawer !== "closing") return;
      set({ drawer: "closed", instant: false });
    },

    selectProject(id) {
      const s = get();
      if (s.about !== "closed") return;
      if (s.webglFallback) {
        set({ activeProject: id, viewer: "opening", page: 0, apex: null });
        return;
      }
      if (s.drawer !== "open" || s.viewer !== "closed") return;
      set({ activeProject: id, viewer: "folder-lifting", page: 0, hoveredFolder: null });
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
      if (get().webglFallback) {
        set({ viewer: "closed", activeProject: null, apex: null, page: 0 });
        return;
      }
      set({ viewer: "folder-returning" });
    },
    folderReturned() {
      if (get().viewer !== "folder-returning") return;
      set({ viewer: "closed", activeProject: null, apex: null, page: 0 });
    },

    openAbout() {
      const s = get();
      if (s.viewer !== "closed" || s.about !== "closed") return;
      if (s.webglFallback) {
        set({ about: "opening", aboutApex: null });
        return;
      }
      set({ about: "frame-lifting" });
    },
    aboutFrameLifted(apex) {
      if (get().about !== "frame-lifting") return;
      set({ about: "opening", aboutApex: apex });
    },
    aboutOpened() {
      if (get().about !== "opening") return;
      set({ about: "viewing" });
    },
    closeAbout() {
      const a = get().about;
      // Closable once the frame is turning or fully turned.
      if (a !== "viewing" && a !== "opening") return;
      set({ about: "closing" });
    },
    aboutDismissed() {
      if (get().about !== "closing") return;
      if (get().webglFallback) {
        set({ about: "closed", aboutApex: null });
        return;
      }
      set({ about: "frame-returning" });
    },
    aboutFrameReturned() {
      if (get().about !== "frame-returning") return;
      set({ about: "closed", aboutApex: null });
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
