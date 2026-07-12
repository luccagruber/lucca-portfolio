"use client";

import { useState } from "react";
import { RoundedBox, useCursor } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { palette } from "@/lib/palette";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { useExperience } from "@/experience/state/store";
import { LAYOUT } from "../layout";
import { Drawer } from "./Drawer";
import { DrawerFront } from "./DrawerFront";

const W = 0.42;
const H = 1.04;
const D = 0.6;
/** Bay boundaries (y): base top → underside of the cap. */
const BAY_CENTERS = [0.222, 0.535, 0.848] as const;
const RAIL_YS = [0.065, 0.378, 0.692, 1.005] as const;

function shellMaterial() {
  return <meshStandardMaterial color={palette.cabinet} roughness={0.85} metalness={0.02} />;
}

/**
 * The visual protagonist: a classic three-drawer office cabinet. The top
 * bay holds the working drawer; the lower two are set dressing. Clicking
 * the cabinet while closed opens the drawer — same event the scroll
 * trigger dispatches, so the machine stays the single path.
 */
export function FilingCabinet() {
  const [hovered, setHovered] = useState(false);
  const drawer = useExperience((s) => s.drawer);
  const openDrawer = useExperience((s) => s.openDrawer);
  const clickable = drawer === "closed";
  useCursor(hovered && clickable);

  const handleClick = clickable
    ? (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        openDrawer({ instant: prefersReducedMotion() });
      }
    : undefined;

  return (
    <group
      position={LAYOUT.cabinet.position}
      onClick={handleClick}
      onPointerOver={clickable ? () => setHovered(true) : undefined}
      onPointerOut={() => setHovered(false)}
    >
      {/* Shell — panels, leaving the top bay a real cavity */}
      {[-1, 1].map((side) => (
        <RoundedBox
          key={side}
          args={[0.03, H, D]}
          radius={0.008}
          smoothness={4}
          position={[side * (W / 2 - 0.015), H / 2, 0]}
          castShadow
          receiveShadow
        >
          {shellMaterial()}
        </RoundedBox>
      ))}
      <RoundedBox
        args={[W, 0.035, D]}
        radius={0.008}
        smoothness={4}
        position={[0, H - 0.0175, 0]}
        castShadow
        receiveShadow
      >
        {shellMaterial()}
      </RoundedBox>
      <mesh position={[0, H / 2, -D / 2 + 0.015]} castShadow receiveShadow>
        <boxGeometry args={[W - 0.06, H, 0.03]} />
        {shellMaterial()}
      </mesh>
      <mesh position={[0, 0.0325, 0]} castShadow receiveShadow>
        <boxGeometry args={[W - 0.06, 0.065, D - 0.04]} />
        {shellMaterial()}
      </mesh>
      {/* Rails between bays */}
      {RAIL_YS.map((y) => (
        <mesh key={y} position={[0, y, D / 2 - 0.02]} castShadow receiveShadow>
          <boxGeometry args={[W - 0.06, 0.024, 0.03]} />
          {shellMaterial()}
        </mesh>
      ))}

      {/* Static lower drawers */}
      <group position={[0, BAY_CENTERS[0], 0]}>
        <DrawerFront />
      </group>
      <group position={[0, BAY_CENTERS[1], 0]}>
        <DrawerFront />
      </group>

      {/* The working drawer */}
      <group position={[0, BAY_CENTERS[2], 0]}>
        <Drawer />
      </group>
    </group>
  );
}
