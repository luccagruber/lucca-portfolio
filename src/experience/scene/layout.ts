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
 * Centre line of the drawer pedestal (the drawer node's own x). The desk
 * is not symmetrical — the pedestal is the right-hand third — so this is
 * the axis the portrait camera stands on and the axis the portrait props
 * are composed around. On a phone the pedestal IS the desk.
 */
export const PEDESTAL_X = 0.5;

/**
 * The card holder on the drawer front (see desk/DrawerLabel). Positioned in
 * DRAWER-NODE space, so it travels with the drawer: the node origin is the
 * centre of the drawer box, the box is ~0.42 deep, so its front panel sits
 * near z = +0.21. The card stands just proud of that panel and low on it,
 * where a real one is screwed on — above the handle, not over it.
 */
/**
 * The card holder on the drawer front (see desk/DrawerLabel).
 *
 * These are read off the GLB's actual vertices, not tuned against a
 * render. In DRAWER-NODE space the drawer's front panel is a flat quad at
 * **z = 0** spanning x ±0.1968 and y ±0.0785, and the pull handle is the
 * only thing that stands proud of it: it reaches z = 0.021 across
 * x ±0.09, between y = 0.05 and y = 0.06.
 *
 * Everything here follows from that:
 *
 * - `x = 0` — the panel's true centre, which is also the handle's centre,
 *   so card and handle share one axis.
 * - `y` — dead centre of the space BELOW the handle (the panel's bottom
 *   edge is -0.0785, the handle's underside is 0.05), so the card is
 *   neither tucked under the grip nor sliding into the cabinet door.
 * - `z = 0.002` — half the holder's 4 mm depth, which puts its BACK face
 *   flush on the panel. It used to be 0.215, floating the card nearly
 *   20 cm in front of the drawer; standing still that read as a decal,
 *   but the moment the drawer slid the parallax gave it away and the card
 *   appeared to fly on its own (user, 2026-07-26).
 */
export const DRAWER_LABEL = {
  /*
   * Sized against the handle above it (0.18 wide), which is the only
   * other feature on the panel. The card was drawn when it was floating
   * far in front of the drawer and looked big for the wrong reason;
   * standing on the panel at true depth it needed the extra millimetres
   * to stay a sign rather than a sticker.
   */
  width: 0.138,
  height: 0.033,
  x: 0,
  y: -0.014,
  z: 0.002,
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

/** One prop's place on the desk top (desk-top-local coordinates). */
export interface PropPose {
  position: Vec3;
  rotY: number;
}

/**
 * Which props are on the desk and where. A prop left out is not rendered
 * at all — on a phone the camera is close enough that anything outside
 * the shot is pure cost, and the vision's rule ("every visible object has
 * a reason to exist") is easier to keep by removing than by hiding.
 */
export interface PropArrangement {
  frame: PropPose;
  notebook: PropPose;
  glasses: PropPose;
  nameplate?: PropPose;
  macbook?: PropPose;
  cup?: PropPose;
}

/**
 * Desk-top-local (x ∈ [-0.7, 0.7], z ∈ [-0.314, 0.286]), deliberately
 * staggered in depth — nothing sits on one line.
 *
 * Landscape is the authored desktop composition (the frame's spot and the
 * MacBook's equal gaps are user-approved, 2026-07-16).
 *
 * Portrait is a different set, not a rearrangement of the same one. The
 * phone camera stands close over the drawer pedestal (PEDESTAL_X), so the
 * desk it can see is a strip about 0.6 m wide — room for exactly two
 * things. They are the two that earn it: the picture frame, because it is
 * the door to About, and the notebook with the glasses on it, because the
 * desk has to look worked at rather than staged. The nameplate, the
 * MacBook and the cup are dropped (user's call, 2026-07-26): on a phone
 * they would either crowd the two that matter or be cropped in half.
 */
export const PROP_ARRANGEMENTS: Record<"landscape" | "portrait", PropArrangement> = {
  landscape: {
    frame: { position: [-0.38, 0, -0.08], rotY: 0.3 },
    nameplate: { position: [-0.52, 0, 0.14], rotY: 0.45 },
    macbook: { position: [-0.03, 0, -0.02], rotY: 0 },
    notebook: { position: [0.34, 0, 0.03], rotY: -0.2 },
    glasses: { position: [0.34, 0.013, 0.02], rotY: 0.5 },
    cup: { position: [0.55, 0, -0.14], rotY: 0 },
  },
  portrait: {
    // Left of the pedestal's centre line and the nearest thing to the
    // desk's front edge — closer to it than the notebook (user,
    // 2026-07-26). It is the one prop that is also a door, so it stands
    // where a photograph you are meant to pick up would stand.
    frame: { position: [PEDESTAL_X - 0.115, 0, 0.12], rotY: 0.26 },
    // Right of it and further back — the two never share a line.
    notebook: { position: [PEDESTAL_X + 0.105, 0, 0.0], rotY: -0.24 },
    glasses: { position: [PEDESTAL_X + 0.1, 0.013, -0.01], rotY: 0.5 },
  },
};

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
  /**
   * Portrait lens — a phone held upright. Wider than the desktop lens so
   * the visible band of desk doesn't force the camera across the room,
   * which would shrink the folders and the frame into untappable specks.
   */
  portraitFov: 58,
  /**
   * Portrait pitch — a steeper look-down than the desktop shot.
   *
   * A portrait viewport sees roughly 2.2× as much height as width, so
   * framing tightly on the pedestal's width buys a very tall shot whether
   * we want one or not. Where that height lands is the only real choice:
   * at the desktop pitch it lands on blank wall above the desk. Tipping
   * the camera down spends it on the desk plane instead — the surface
   * opens up, the two props on it separate in screen space, and the
   * drawer front still faces the lens squarely enough to read its card.
   */
  portraitPitch: -0.36,
} as const;

/**
 * A portrait viewport is a different theatre, not a thinner window on the
 * same one (vision: mobile preserves the concept, not the implementation).
 * Below this width:height ratio the scene recomposes: portrait framings,
 * the portrait lens, and the portrait prop arrangement.
 */
export const PORTRAIT_ASPECT = 0.95;

export function isPortraitAspect(aspect: number): boolean {
  return aspect < PORTRAIT_ASPECT;
}

/** The lens for the current viewport shape. */
export function fovFor(aspect: number): number {
  return isPortraitAspect(aspect) ? CAMERA.portraitFov : CAMERA.fov;
}

/** The camera's fixed orientation for the current viewport shape. */
export function pitchFor(aspect: number): number {
  return isPortraitAspect(aspect) ? CAMERA.portraitPitch : CAMERA.pitch;
}

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

/**
 * Portrait framings are authored as x/y plus the strip of desk the shot
 * must span; z is derived from the lens so every phone — whatever its
 * exact aspect — sees the same composition instead of a luckier or
 * unluckier crop of it.
 *
 * Both shots stand on the pedestal's centre line: the phone never sees
 * the whole desk, it stands right at the drawer, which is the only thing
 * on this desk a visitor has to find.
 */
const PORTRAIT_FRAMINGS = {
  /** Arrival — the pedestal and the strip of desk over it, carrying the
   * picture frame and the notebook. */
  idle: { x: PEDESTAL_X, y: 1.06, halfWidth: 0.27, atZ: DESK.frontZ },
  /**
   * Drawer open. The span is held at the OPEN drawer's plane rather than
   * the desk front, which pulls the camera back by most of the travel —
   * without it the drawer slides 0.335 m toward a lens that is already
   * close and the folders burst out of frame. What is left of the travel
   * still reads as the drawer coming to you.
   */
  drawer: {
    x: PEDESTAL_X,
    y: 1.05,
    halfWidth: 0.265,
    atZ: DESK.frontZ + DESK.drawer.travel * 0.82,
  },
} as const;

export type FramingName = keyof typeof FRAMINGS;

/**
 * Aspect compensation. Landscape: the camera stays centered on the desk
 * and narrow viewports pull straight back (never rotating, never sliding)
 * so the full desk width stays in frame. Portrait: the framing names the
 * strip of desk it needs and the distance follows from the lens.
 */
export function framingFor(name: FramingName, aspect: number): Vec3 {
  if (isPortraitAspect(aspect)) {
    const { x, y, halfWidth, atZ } = PORTRAIT_FRAMINGS[name];
    const halfFovY = (fovFor(aspect) * Math.PI) / 360;
    const halfFovX = Math.atan(Math.tan(halfFovY) * Math.max(aspect, 0.35));
    return [x, y, atZ + halfWidth / Math.tan(halfFovX)];
  }
  const [x, y, z] = FRAMINGS[name];
  const deficit = Math.max(0, 1.7 - aspect);
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
