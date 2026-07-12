/**
 * Motion vocabulary for the whole experience — every duration, ease and
 * scroll threshold lives here so sequences stay coherent when tuned.
 *
 * Architecture rule: animations are event-driven. Scroll positions below
 * only *trigger* transitions; nothing is scrubbed by scroll progress.
 */

export const SCROLL = {
  /** Vision: the first small downward scroll (~100–150px) starts the sequence. */
  openTriggerPx: 120,
  /** Vision: returning to the very top plays the reverse animation once. */
  closeTriggerPx: 8,
  /**
   * Height of the workspace section in svh. The stage is sticky inside it,
   * which guarantees the opening sequence is actually seen and the folders
   * can be browsed before the workspace scrolls away with the document
   * (vision: no pinned scrubbing, no cinematic transition — it simply leaves).
   */
  stageHeightSvh: 250,
} as const;

/** Durations in seconds. */
export const DUR = {
  drawerSlide: 1.05,
  folderRise: 1.0,
  folderSink: 0.55,
  drawerReturn: 0.9,
  cameraFraming: 1.35,
  cameraReframe: 0.5, // viewport resizes, not narrative moves
  folderLift: 0.65,
  folderReturn: 0.6,
  viewerIn: 0.45,
  viewerOut: 0.28,
  backdropIn: 0.5,
  backdropOut: 0.4,
  pageTurn: 0.3,
  hover: 0.22,
} as const;

export const EASE = {
  glide: "power2.inOut",
  settle: "power3.out",
  enter: "power3.out",
  exit: "power2.in",
  soft: "power1.inOut",
} as const;

/** Relative offsets inside multi-step sequences (seconds). */
export const SEQ = {
  /** Folders start rising while the drawer finishes its slide. */
  folderRiseOverlap: 0.45,
  /** Camera starts easing shortly after the drawer starts moving. */
  cameraDelayIn: 0.15,
} as const;
