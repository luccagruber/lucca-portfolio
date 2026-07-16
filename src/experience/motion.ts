/**
 * Motion vocabulary for the whole experience — every duration, ease and
 * scroll threshold lives here so sequences stay coherent when tuned.
 *
 * Architecture rule: animations are event-driven. Scroll positions below
 * only *trigger* transitions; nothing is scrubbed by scroll progress, and
 * mouse movement never moves the scene at all.
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
   *
   * Everything above 100 is hold: scrolling that keeps the desk on screen
   * with nothing new happening. Too much of it and the page reads as empty
   * between the desk and the contact rail; too little and the drawer opens
   * on top of the rail already sliding in. 180 leaves ~0.8 screens of
   * browsing room after the drawer trigger.
   */
  stageHeightSvh: 180,
} as const;

/** Durations in seconds. */
export const DUR = {
  // Drawer — a heavy steel box on rails: long glide, bumper kiss at the end.
  drawerSlide: 1.1,
  drawerSettle: 0.16,
  drawerReturn: 0.9,
  folderRise: 0.85,
  folderSink: 0.5,

  // Camera
  cameraDolly: 1.3,
  cameraReframe: 0.5, // viewport resizes, not narrative moves

  // Folder selection — the picture frame reuses this flight timing, so a
  // lifted object always has the same weight whatever it is.
  folderFly: 0.95,
  folderReturn: 0.8,

  // About — the print turning over on its vertical hinge. A shade slower
  // than a folder cover: one considered movement, not a mechanism.
  frameTurn: 0.72,

  // Viewer (DOM open-folder)
  coverOpen: 0.62,
  coverClose: 0.48,
  viewerGrow: 0.55,
  viewerShrink: 0.38,
  veilIn: 0.55,
  veilOut: 0.45,

  // Page turning — same hinge principle and weight as the cover opening.
  pageTurn: 0.62,

  hover: 0.16,
  hint: 0.4,
  stageFade: 0.7,
} as const;

export const EASE = {
  glide: "power2.inOut",
  heavy: "power3.inOut",
  settle: "power3.out",
  enter: "power3.out",
  exit: "power2.in",
  soft: "power1.inOut",
} as const;

/** Relative offsets inside multi-step sequences (seconds). */
export const SEQ = {
  /** Folders start rising while the drawer finishes its slide. */
  folderRiseAt: 0.68,
  /** Second folder trails the first — files never move in lockstep. */
  folderStagger: 0.14,
  /** Camera starts easing shortly after the drawer starts moving. */
  cameraDelayIn: 0.12,
  /** Cover starts opening while the folder is still growing. */
  coverOverlap: 0.12,
} as const;

/** Drawer slide overshoot before the bumper settles it back (meters). */
export const DRAWER_BUMP = 0.007;
