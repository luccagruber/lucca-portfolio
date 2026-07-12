"use client";

import { useRef, useState } from "react";
import { RoundedBox, Text, useCursor } from "@react-three/drei";
import { useThree, type ThreeEvent } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Vector3, type Group } from "three";
import type { ProjectReport } from "@/content/types";
import { palette } from "@/lib/palette";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { DUR, EASE } from "@/experience/motion";
import { folderPhaseFor, useExperience } from "@/experience/state/store";
import { LAYOUT } from "../layout";
import { FONT_MONO_3D } from "../fonts";

export interface FolderHome {
  position: [number, number, number];
  rotationY: number;
  tabX: number;
}

// Classic manila folder, front panel cut lower than the back, paper
// sliver peeking between them, label tab on the back panel's top edge.
const W = 0.3;
const H = 0.24;
const PANEL_T = 0.006;
const GAP = 0.013;
const TAB_W = 0.16;
const TAB_H = 0.042;
const HOVER_RAISE = 0.03;

export function Folder({ report, home }: { report: ProjectReport; home: FolderHome }) {
  const rootRef = useRef<Group>(null);
  const invalidate = useThree((s) => s.invalidate);
  const camera = useThree((s) => s.camera);

  const phase = useExperience((s) => folderPhaseFor(s, report.id));
  const viewer = useExperience((s) => s.viewer);
  const selectProject = useExperience((s) => s.selectProject);

  const [hovered, setHovered] = useState(false);
  const interactive = phase === "revealed" && viewer === "closed";
  useCursor(hovered && interactive);

  // The folder system owns only its own motion: hover bump, the selection
  // lift toward the camera, and the return home. Completions feed the
  // machine (folderLifted / folderReturned); the reveal travel is the
  // drawer's job (it animates the parent anchor).
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const d = (x: number) => (prefersReducedMotion() ? 0 : x);

      if (phase === "selected" && viewer === "folder-lifting") {
        const tl = gsap.timeline({
          onUpdate: invalidate,
          onComplete: () => {
            // Hand the overlay its entrance origin: the folder's screen position.
            const world = root.getWorldPosition(new Vector3());
            world.y += H / 2;
            world.project(camera);
            useExperience.getState().folderLifted({
              x: ((world.x + 1) / 2) * 100,
              y: ((1 - world.y) / 2) * 100,
            });
          },
        });
        tl.to(
          root.position,
          {
            x: home.position[0],
            y: home.position[1] + LAYOUT.folderLift.y,
            z: home.position[2] + LAYOUT.folderLift.z,
            duration: d(DUR.folderLift),
            ease: EASE.settle,
            overwrite: "auto",
          },
          0,
        ).to(
          root.rotation,
          {
            x: LAYOUT.folderLift.tiltX,
            y: 0,
            duration: d(DUR.folderLift),
            ease: EASE.settle,
            overwrite: "auto",
          },
          0,
        );
      } else if (phase === "returning") {
        const tl = gsap.timeline({
          onUpdate: invalidate,
          onComplete: () => useExperience.getState().folderReturned(),
        });
        tl.to(
          root.position,
          {
            x: home.position[0],
            y: home.position[1],
            z: home.position[2],
            duration: d(DUR.folderReturn),
            ease: EASE.glide,
            overwrite: "auto",
          },
          0,
        ).to(
          root.rotation,
          { x: 0, y: home.rotationY, duration: d(DUR.folderReturn), ease: EASE.glide, overwrite: "auto" },
          0,
        );
      } else if (phase === "hidden" || phase === "revealed") {
        gsap.set(root.position, {
          x: home.position[0],
          y: home.position[1],
          z: home.position[2],
        });
        gsap.set(root.rotation, { x: 0, y: home.rotationY });
        invalidate();
      }
      // phase "selected" with viewer past "folder-lifting": hold the lifted
      // pose behind the report — nothing to animate.
    },
    { dependencies: [phase, viewer, invalidate] },
  );

  const bump = (up: boolean) => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    gsap.to(root.position, {
      y: home.position[1] + (up ? HOVER_RAISE : 0),
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
    bump(true);
  };
  const onPointerOut = () => {
    setHovered(false);
    if (interactive) bump(false);
  };
  const onClick = (e: ThreeEvent<MouseEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    setHovered(false);
    selectProject(report.id);
  };

  return (
    <group ref={rootRef} position={home.position} rotation-y={home.rotationY}>
      {/* Generous invisible hit area — usability over realism */}
      <mesh
        position={[0, (H + TAB_H) / 2, 0]}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={onClick}
      >
        <boxGeometry args={[W + 0.05, H + TAB_H + 0.06, 0.09]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Back panel + tab */}
      <group position={[0, 0, -GAP / 2]}>
        <RoundedBox
          args={[W, H, PANEL_T]}
          radius={0.002}
          smoothness={2}
          position={[0, H / 2, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={palette.manila} roughness={0.92} metalness={0} />
        </RoundedBox>
        <RoundedBox
          args={[TAB_W, TAB_H + 0.012, PANEL_T]}
          radius={0.005}
          smoothness={2}
          position={[home.tabX, H + TAB_H / 2 - 0.005, 0]}
          castShadow
        >
          <meshStandardMaterial color={palette.manila} roughness={0.92} metalness={0} />
        </RoundedBox>
        <Text
          font={FONT_MONO_3D}
          fontSize={0.018}
          letterSpacing={0.08}
          color={palette.tabInk}
          anchorX="center"
          anchorY="middle"
          position={[home.tabX, H + TAB_H / 2 - 0.003, PANEL_T / 2 + 0.0012]}
          onSync={() => invalidate()}
        >
          {report.fileLabel}
        </Text>
      </group>

      {/* Paper inside, peeking above the front panel */}
      <mesh position={[0, (H - 0.014) / 2, 0]} castShadow>
        <boxGeometry args={[W - 0.02, H - 0.014, 0.008]} />
        <meshStandardMaterial color={palette.paper} roughness={0.95} metalness={0} />
      </mesh>

      {/* Front panel — cut lower, classic folder profile */}
      <RoundedBox
        args={[W, H - 0.018, PANEL_T]}
        radius={0.002}
        smoothness={2}
        position={[0, (H - 0.018) / 2, GAP / 2]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={palette.manila} roughness={0.92} metalness={0} />
      </RoundedBox>

      {/* Spine */}
      <mesh position={[0, 0.004, 0]}>
        <boxGeometry args={[W, 0.008, GAP + PANEL_T * 2]} />
        <meshStandardMaterial color={palette.manilaDeep} roughness={0.92} metalness={0} />
      </mesh>
    </group>
  );
}
