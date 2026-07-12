"use client";

import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Group } from "three";
import { palette } from "@/lib/palette";
import { DUR, EASE, SEQ } from "@/experience/motion";
import { useExperience } from "@/experience/state/store";
import { LAYOUT } from "../layout";
import { ProjectFolders } from "../folders/ProjectFolders";
import { DrawerFront } from "./DrawerFront";

/**
 * The drawer system: opening, closing, and revealing the folders — those
 * three motions and nothing else (architecture rule). Its timeline is the
 * authority for the drawer machine: completions call `drawerOpened` /
 * `drawerClosed`; the camera eases independently and gates nothing.
 */
export function Drawer() {
  const drawerRef = useRef<Group>(null);
  const foldersRef = useRef<Group>(null);
  const invalidate = useThree((s) => s.invalidate);
  const phase = useExperience((s) => s.drawer);

  useGSAP(
    () => {
      const drawerEl = drawerRef.current;
      const foldersEl = foldersRef.current;
      if (!drawerEl || !foldersEl) return;

      if (phase === "opening") {
        const tl = gsap.timeline({
          onUpdate: invalidate,
          onComplete: () => useExperience.getState().drawerOpened(),
        });
        tl.to(drawerEl.position, {
          z: LAYOUT.drawerTravel,
          duration: DUR.drawerSlide,
          ease: EASE.glide,
        }).to(
          foldersEl.position,
          { y: LAYOUT.folderRevealY, duration: DUR.folderRise, ease: EASE.settle },
          DUR.drawerSlide - SEQ.folderRiseOverlap,
        );
        if (useExperience.getState().instant) tl.progress(1);
      } else if (phase === "closing") {
        const tl = gsap.timeline({
          onUpdate: invalidate,
          onComplete: () => useExperience.getState().drawerClosed(),
        });
        tl.to(foldersEl.position, {
          y: LAYOUT.folderHiddenY,
          duration: DUR.folderSink,
          ease: EASE.exit,
        }).to(
          drawerEl.position,
          { z: 0, duration: DUR.drawerReturn, ease: EASE.glide },
          DUR.folderSink - 0.25,
        );
        if (useExperience.getState().instant) tl.progress(1);
      } else {
        // Idempotent snap for static phases (mount, restored state).
        const open = phase === "open";
        gsap.set(drawerEl.position, { z: open ? LAYOUT.drawerTravel : 0 });
        gsap.set(foldersEl.position, {
          y: open ? LAYOUT.folderRevealY : LAYOUT.folderHiddenY,
        });
        invalidate();
      }
    },
    { dependencies: [phase, invalidate] },
  );

  return (
    <group ref={drawerRef}>
      <DrawerFront label="PROJECTS" />

      {/* Drawer body — interior in the slightly darker neutral (vision) */}
      <group position={[0, 0, 0.04]}>
        <mesh position={[0, -0.108, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.014, 0.5]} />
          <meshStandardMaterial color={palette.drawerInterior} roughness={0.9} metalness={0} />
        </mesh>
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * 0.15, -0.012, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.013, 0.2, 0.5]} />
            <meshStandardMaterial color={palette.drawerInterior} roughness={0.9} metalness={0} />
          </mesh>
        ))}
        <mesh position={[0, -0.012, -0.245]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.2, 0.013]} />
          <meshStandardMaterial color={palette.drawerInterior} roughness={0.9} metalness={0} />
        </mesh>
      </group>

      {/* Folder anchor — the drawer owns the reveal travel of this group;
          each folder owns only its own hover/lift/return motion. */}
      <group ref={foldersRef} position={[0, LAYOUT.folderHiddenY, 0.04]}>
        <ProjectFolders />
      </group>
    </group>
  );
}
