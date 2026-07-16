/**
 * Spatial composition of the workspace — measured facts of the desk GLB,
 * prop placement, folder choreography anchors, and the camera's named
 * framings. Units are meters, ground plane at y=0, camera looks straight
 * toward -z. Internal dimensions of generated props live inside their
 * components; only cross-system geometry belongs here.
 */

export type Vec3 = [number, number, number];

/** Optimized copy of `lucca-portifolio-3d-assets/office_desk_140x60.glb`. */
export const DESK_GLB = "/models/office-desk.glb";

/**
 * Node names inside the desk GLB. The drawer and door are children of the
 * scene root with plain translations; the drawer box slides along +z
 * (toward the camera) and the door hinges at its own origin.
 */
export const DESK_NODES = {
  body: "#TBL0003_Desk_140x60_Gray_0",
  drawer: "#TBL0003_Drawer_1",
  door: "#TBL0003_Door_2",
} as const;

/**
 * Measured geometry of the desk asset (world space, desk at origin):
 * body x ∈ [-0.700, 0.700], top at y = 0.757, front face at z = 0.286.
 * The drawer node origin (0.500, 0.543, 0.265) is the center of the
 * drawer box: interior ≈ 0.37 w × 0.135 h × 0.42 d.
 */
export const DESK = {
  topY: 0.757,
  frontZ: 0.286,
  /** Drawer box interior, drawer-node-local. */
  drawer: {
    /** Slide-out distance — keeps a third of the box on its rails. */
    travel: 0.335,
    floorY: -0.062,
    rimY: 0.0785,
  },
} as const;

/**
 * Manila folder body — portrait letter file. Local origin at the
 * bottom-center of the spine, faces +z.
 */
export const FOLDER = {
  width: 0.164,
  height: 0.205,
  tabWidth: 0.088,
  tabHeight: 0.03,
  coverT: 0.0035,
  /** Paper cavity between the covers. */
  gap: 0.012,
} as const;

/** Full silhouette height including the tab (apex sizing, DOM hand-off). */
export const FOLDER_FULL_H = FOLDER.height + FOLDER.tabHeight;

export interface FolderSlot {
  /** Drawer-local anchor. */
  x: number;
  z: number;
  rotY: number;
  /** Tab offset along the folder's top edge. */
  tabX: number;
}

/**
 * Two folders side by side in the drawer, both faces readable from the
 * straight-on camera; tabs staggered outward like a real pair of files.
 * Slight rotations — believable imperfection.
 */
export const FOLDER_SLOTS: Record<"accul-reburg" | "gruber-goal", FolderSlot> = {
  "accul-reburg": { x: -0.093, z: -0.1, rotY: -0.03, tabX: -0.034 },
  "gruber-goal": { x: 0.093, z: -0.148, rotY: 0.028, tabX: 0.034 },
};

/**
 * Folder poses inside the drawer (applied to the per-folder anchor the
 * drawer system animates). Hidden: lying back inside the box so nothing
 * pokes above the rim while the drawer travels through the desk front.
 * Revealed: standing in the drawer, bottoms concealed by the drawer front.
 */
export const FOLDER_POSE = {
  hidden: { y: DESK.drawer.floorY + 0.004, rotX: -1.08 },
  revealed: { y: 0.024, rotX: -0.055 },
} as const;

/**
 * Picture frame — generated in R3F (see props/PictureFrame). Origin at the
 * bottom-center of the frame, standing upright, print facing +z. Only the
 * silhouette lives here: it sizes the apex flight and the DOM hand-off.
 */
export const FRAME = {
  width: 0.115,
  height: 0.148,
  /** Resting lean-back of the frame on its easel leg. */
  tilt: -0.09,
} as const;

/** Selected-folder / lifted-frame presentation in front of the camera. */
export const APEX = {
  /** Fraction of the viewport height the folder fills at rest. */
  heightFraction: 0.56,
  /** Arc height of the initial lift out of the drawer. */
  liftY: 0.1,
} as const;

export const CAMERA = {
  fov: 42,
  near: 0.08,
  far: 20,
  /**
   * Fixed downward pitch (radians). The camera sits above desk level and
   * looks gently down — a high three-quarter front view that makes the
   * desk top a readable plane (depth between props, folders visible
   * inside the open drawer). Never yaws, never rolls, never follows the
   * pointer; this one constant is the camera's entire orientation.
   */
  pitch: -0.19,
} as const;

/**
 * Named framings. The camera's orientation is the fixed CAMERA.pitch, so
 * a framing is a position only. Eyes above the desk top, seated directly
 * in front of it, drawer naturally in frame.
 */
export const FRAMINGS = {
  /** Arrival — the whole desk centered and fully in frame. */
  idle: [0, 1.08, 1.62] as Vec3,
  /** Drawer open — a gentle lean toward the drawer so both standing
   * folders sit fully in frame, without abandoning the centered desk. */
  drawer: [0.18, 1.04, 1.52] as Vec3,
} as const;

export type FramingName = keyof typeof FRAMINGS;

/**
 * Aspect compensation: the camera stays centered on the desk and narrow
 * viewports pull straight back (never rotating, never sliding) so the
 * full desk width stays in frame. Wide viewports use the framing as
 * authored.
 */
export function framingFor(name: FramingName, aspect: number): Vec3 {
  const [x, y, z] = FRAMINGS[name];
  const deficit = Math.max(0, 1.7 - Math.max(aspect, 0.35));
  return [x, y, z + deficit * 0.62];
}

/**
 * How far in front of the camera an object of silhouette height `fullH`
 * must settle to fill `fraction` of the viewport height.
 */
export function apexDistanceFor(
  fovDeg: number,
  fullH: number,
  fraction: number = APEX.heightFraction,
): number {
  return fullH / (2 * fraction * Math.tan((fovDeg * Math.PI) / 360));
}

/** Apex distance for a lifted folder. */
export function apexDistance(fovDeg: number): number {
  return apexDistanceFor(fovDeg, FOLDER_FULL_H);
}
