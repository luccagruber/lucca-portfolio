/**
 * Spatial composition of the workspace — placements of the major systems
 * and the camera's named framings. Units are meters, ground plane at y=0,
 * camera looks toward -z. Internal dimensions of each object live inside
 * its component; only cross-system geometry belongs here.
 */

export type Vec3 = [number, number, number];

export const LAYOUT = {
  desk: { position: [-0.58, 0, 0] as Vec3 },
  cabinet: { position: [0.66, 0, 0.1] as Vec3 },
  partition: { z: -0.56 },

  /** How far the top drawer slides out toward the camera. */
  drawerTravel: 0.36,

  /**
   * Folder anchor Y (drawer-local): resting on the drawer floor (file tops
   * just visible inside the cavity, as in a real drawer) → risen into view
   * above the cabinet, bottoms still concealed below the drawer rim.
   */
  folderHiddenY: -0.115,
  folderRevealY: 0.06,

  /** Local-space travel of a selected folder lifting out of the drawer. */
  folderLift: { y: 0.42, z: 0.5, tiltX: -0.12 },
} as const;

/**
 * Named camera framings (world space). The rig eases between them in
 * response to experience state; it never drives that state.
 */
export const FRAMINGS = {
  /** Arrival — desk and cabinet composed together, cabinet weighted right. */
  overview: { position: [0.4, 1.32, 3.05] as Vec3, target: [0.0, 0.72, 0.0] as Vec3 },
  /** Drawer open — subtle move toward the cabinet (vision: "subtly eases"). */
  cabinet: { position: [0.56, 1.28, 2.52] as Vec3, target: [0.44, 0.82, 0.1] as Vec3 },
  /** Folder selected — a touch closer while the report takes over. */
  project: { position: [0.56, 1.28, 2.1] as Vec3, target: [0.56, 0.92, 0.1] as Vec3 },
} as const;

export type FramingName = keyof typeof FRAMINGS;

export const CAMERA = {
  fov: 33,
  near: 0.1,
  far: 30,
  /**
   * Portrait screens pull the camera back along its view axis so the
   * composition survives narrow aspects (mobile preserves the concept).
   */
  portraitDistanceBoost: (aspect: number) =>
    Math.min(Math.max(1.3 / Math.max(aspect, 0.01), 1), 2.1),
  /** Pointer parallax amplitude (world units) — calm, barely-there. */
  parallax: { x: 0.055, y: 0.03 },
} as const;
