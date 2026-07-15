"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RoundedBox, Text, useCursor } from "@react-three/drei";
import { useThree, type ThreeEvent } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Color, MeshStandardMaterial, Vector3, type Group } from "three";
import type { ProjectReport } from "@/content/types";
import { palette } from "@/lib/palette";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { DUR, EASE } from "@/experience/motion";
import { folderPhaseFor, useExperience } from "@/experience/state/store";
import {
  APEX,
  CAMERA,
  FOLDER,
  FOLDER_FULL_H,
  FOLDER_POSE,
  apexDistance,
  type FolderSlot,
} from "../layout";
import { FONT_SANS_3D } from "../fonts";

const { width: W, height: H, coverT: T, gap: GAP, tabWidth: TAB_W, tabHeight: TAB_H } = FOLDER;
/** Front cover is cut a touch lower — the classic folder profile. */
const FRONT_H = H - 0.008;
const HOVER_RAISE = 0.0028; // 2–3 mm, per spec
const DIM = 0.82;

/**
 * One manila project folder, generated in R3F: back cover carrying the
 * labeled tab, a paper block, and a front cover that is a separate mesh
 * hinged at the spine. Local origin at the bottom-center of the spine.
 *
 * The folder system owns only its own motion: the hover breath, the
 * selection flight to the camera apex (ending in the DOM hand-off), and
 * the return home. The reveal travel belongs to the drawer, which
 * animates this folder's parent anchor.
 */
export function Folder({ report, slot }: { report: ProjectReport; slot: FolderSlot }) {
  const rootRef = useRef<Group>(null);
  const coverRef = useRef<Group>(null);
  const invalidate = useThree((s) => s.invalidate);
  const camera = useThree((s) => s.camera);

  const phase = useExperience((s) => folderPhaseFor(s, report.id));
  const viewer = useExperience((s) => s.viewer);
  const dimmed = useExperience(
    (s) => s.hoveredFolder !== null && s.hoveredFolder !== report.id,
  );

  const [hovered, setHovered] = useState(false);
  const interactive = phase === "revealed" && viewer === "closed";
  useCursor(hovered && interactive);

  const mats = useMemo(
    () => ({
      manila: new MeshStandardMaterial({ color: palette.manila, roughness: 0.92 }),
      deep: new MeshStandardMaterial({ color: palette.manilaDeep, roughness: 0.92 }),
      paper: new MeshStandardMaterial({ color: palette.paper, roughness: 0.96 }),
      base: {
        manila: new Color(palette.manila),
        deep: new Color(palette.manilaDeep),
        paper: new Color(palette.paper),
      },
    }),
    [],
  );
  useEffect(() => {
    return () => {
      mats.manila.dispose();
      mats.deep.dispose();
      mats.paper.dispose();
    };
  }, [mats]);

  // The unhovered folder steps back — attention has a single subject.
  useGSAP(
    () => {
      const k = dimmed ? DIM : 1;
      for (const name of ["manila", "deep", "paper"] as const) {
        const c = mats.base[name];
        gsap.to(mats[name].color, {
          r: c.r * k,
          g: c.g * k,
          b: c.b * k,
          duration: DUR.hover,
          ease: EASE.soft,
          overwrite: "auto",
          onUpdate: invalidate,
        });
      }
    },
    { dependencies: [dimmed, mats, invalidate] },
  );

  // Selection flight / return / static snaps.
  useGSAP(
    () => {
      const root = rootRef.current;
      const cover = coverRef.current;
      if (!root || !cover) return;
      const d = (x: number) => (prefersReducedMotion() ? 0 : x);

      if (phase === "selected" && viewer === "folder-lifting") {
        const anchor = root.parent;
        if (!anchor) return;
        anchor.updateWorldMatrix(true, false);

        // Present the folder centered on the camera's (pitched) view
        // axis, its plane parallel to the image plane, filling
        // APEX.heightFraction of the viewport (see layout.apexDistance).
        const fov = "fov" in camera ? (camera.fov as number) : 42;
        const forward = new Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
        // The folder tilts back to match the camera pitch; its local up
        // in world space after that tilt:
        const folderUp = new Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
        const worldTarget = camera.position
          .clone()
          .addScaledVector(forward, apexDistance(fov))
          .addScaledVector(folderUp, -FOLDER_FULL_H / 2);
        const local = anchor.worldToLocal(worldTarget.clone());
        // World-rotation targets, expressed against the anchor's pose.
        const targetRotX = CAMERA.pitch - FOLDER_POSE.revealed.rotX;

        const tl = gsap.timeline({
          onUpdate: invalidate,
          onComplete: () => {
            // Measure the settled folder's screen quad and hand the DOM
            // folder its exact frame, then step out of the picture. The
            // folder's plane is parallel to the image plane, so its
            // height runs along folderUp, not world Y.
            const origin = root.getWorldPosition(new Vector3());
            const top = origin.clone().addScaledVector(folderUp, FOLDER_FULL_H);
            const o = origin.project(camera);
            const t = top.project(camera);
            useExperience.getState().folderLifted({
              x: ((o.x + t.x) / 2 + 1) * 50,
              y: (1 - (o.y + t.y) / 2) * 50,
              h: Math.abs(t.y - o.y) * 50,
            });
            root.visible = false;
            invalidate();
          },
        });
        // Out of the drawer first, then the glide to the apex.
        tl.to(root.position, { y: `+=${APEX.liftY}`, duration: d(0.26), ease: "power2.out" }, 0)
          .to(
            root.position,
            { y: local.y, duration: d(DUR.folderFly - 0.3), ease: EASE.glide },
            d(0.3),
          )
          .to(
            root.position,
            { x: local.x, z: local.z, duration: d(DUR.folderFly - 0.22), ease: EASE.glide },
            d(0.22),
          )
          .to(
            root.rotation,
            {
              x: targetRotX,
              y: -slot.rotY,
              duration: d(DUR.folderFly - 0.2),
              ease: EASE.glide,
            },
            d(0.18),
          )
          // The cover breathes open a few degrees — it wants to be read.
          .to(cover.rotation, { y: -0.1, duration: d(0.32), ease: "power1.out" }, d(0.3))
          .to(cover.rotation, { y: -0.03, duration: d(0.3), ease: "power1.inOut" }, d(0.62));
      } else if (phase === "returning") {
        root.visible = true;
        const tl = gsap.timeline({
          onUpdate: invalidate,
          onComplete: () => useExperience.getState().folderReturned(),
        });
        tl.to(cover.rotation, { y: 0, duration: d(0.25), ease: EASE.soft }, 0)
          .to(root.rotation, { x: 0, y: 0, z: 0, duration: d(DUR.folderReturn * 0.8), ease: EASE.glide }, 0)
          .to(root.position, { x: 0, z: 0, duration: d(DUR.folderReturn * 0.85), ease: EASE.glide }, 0)
          .to(root.position, { y: APEX.liftY * 0.8, duration: d(DUR.folderReturn * 0.5), ease: EASE.glide }, 0)
          .to(root.position, { y: 0, duration: d(0.32), ease: EASE.settle }, d(DUR.folderReturn * 0.52));
      } else if (phase === "hidden" || phase === "revealed") {
        gsap.set(root.position, { x: 0, y: 0, z: 0 });
        gsap.set(root.rotation, { x: 0, y: 0, z: 0 });
        gsap.set(cover.rotation, { y: 0 });
        root.visible = true;
        invalidate();
      } else {
        // "selected" while the report is open: stay out of the picture.
        root.visible = false;
        invalidate();
      }
    },
    { dependencies: [phase, viewer, invalidate] },
  );

  const breathe = (up: boolean) => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    gsap.to(root.position, {
      y: up ? HOVER_RAISE : 0,
      duration: DUR.hover,
      ease: EASE.settle,
      overwrite: "auto",
      onUpdate: invalidate,
    });
  };

  const onPointerOver = (e: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    setHovered(true);
    useExperience.getState().setHoveredFolder(report.id);
    breathe(true);
  };
  const onPointerOut = () => {
    setHovered(false);
    if (useExperience.getState().hoveredFolder === report.id) {
      useExperience.getState().setHoveredFolder(null);
    }
    if (interactive) breathe(false);
  };
  const onClick = (e: ThreeEvent<MouseEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    setHovered(false);
    useExperience.getState().selectProject(report.id);
  };

  const backZ = -(GAP + T) / 2;
  const frontZ = (GAP + T) / 2;

  return (
    <group ref={rootRef}>
      {/* Generous invisible hit area — usability over realism */}
      <mesh
        position={[0, (H + TAB_H) / 2, 0]}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={onClick}
      >
        <boxGeometry args={[W + 0.03, H + TAB_H + 0.05, 0.07]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Back cover + labeled tab */}
      <RoundedBox
        args={[W, H, T]}
        radius={0.0015}
        smoothness={2}
        position={[0, H / 2, backZ]}
        material={mats.manila}
        castShadow
        receiveShadow
      />
      <RoundedBox
        args={[TAB_W, TAB_H + 0.01, T]}
        radius={0.003}
        smoothness={2}
        position={[slot.tabX, H + TAB_H / 2 - 0.005, backZ]}
        material={mats.manila}
        castShadow
      />
      <Text
        font={FONT_SANS_3D}
        fontSize={0.0095}
        letterSpacing={0.06}
        color={palette.tabInk}
        anchorX="center"
        anchorY="middle"
        position={[slot.tabX, H + TAB_H / 2 - 0.004, backZ + T / 2 + 0.0008]}
        onSync={() => invalidate()}
      >
        {report.fileLabel}
      </Text>

      {/* The report inside, peeking above the front cover */}
      <mesh position={[0, (H - 0.006) / 2 + 0.002, 0]} material={mats.paper} castShadow>
        <boxGeometry args={[W - 0.016, H - 0.006, GAP - 0.005]} />
      </mesh>

      {/* Front cover — separate mesh on a spine hinge, rotates open */}
      <group ref={coverRef} position={[-W / 2, 0, frontZ]}>
        <RoundedBox
          args={[W, FRONT_H, T]}
          radius={0.0015}
          smoothness={2}
          position={[W / 2, FRONT_H / 2, 0]}
          material={mats.manila}
          castShadow
          receiveShadow
        />
      </group>

      {/* The fold itself */}
      <mesh position={[-W / 2 + 0.001, FRONT_H / 2, 0]} material={mats.deep}>
        <boxGeometry args={[0.004, FRONT_H, GAP + T * 2]} />
      </mesh>
    </group>
  );
}
