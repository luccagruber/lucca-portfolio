"use client";

import type { ThreeElements } from "@react-three/fiber";
import { palette } from "@/lib/palette";

type GroupProps = ThreeElements["group"];

const PENS: { x: number; z: number; tiltX: number; tiltZ: number; color: string }[] = [
  { x: -0.008, z: 0.004, tiltX: 0.1, tiltZ: -0.12, color: palette.pen },
  { x: 0.01, z: -0.006, tiltX: -0.08, tiltZ: 0.1, color: "#55555a" },
  { x: 0.002, z: 0.012, tiltX: 0.05, tiltZ: 0.16, color: "#303034" },
];

/** Matte black pen holder with a few pens — subtle, believable imperfection. */
export function PenHolder(props: GroupProps) {
  return (
    <group {...props}>
      <mesh position={[0, 0.045, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.036, 0.033, 0.09, 32]} />
        <meshStandardMaterial color={palette.matteBlack} roughness={0.65} metalness={0.05} />
      </mesh>
      {PENS.map((pen, i) => (
        <mesh
          key={i}
          position={[pen.x, 0.1, pen.z]}
          rotation={[pen.tiltX, 0, pen.tiltZ]}
          castShadow
        >
          <cylinderGeometry args={[0.0035, 0.0035, 0.13, 12]} />
          <meshStandardMaterial color={pen.color} roughness={0.5} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}
