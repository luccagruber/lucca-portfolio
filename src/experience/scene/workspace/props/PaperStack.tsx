"use client";

import type { ThreeElements } from "@react-three/fiber";
import { palette } from "@/lib/palette";

type GroupProps = ThreeElements["group"];

const SHEETS = [
  { y: 0.001, rot: 0.0 },
  { y: 0.0032, rot: -0.03 },
  { y: 0.0054, rot: 0.045 },
  { y: 0.0076, rot: 0.012 },
];

/** A small, slightly fanned stack of loose paper. */
export function PaperStack(props: GroupProps) {
  return (
    <group {...props}>
      {SHEETS.map((sheet, i) => (
        <mesh key={i} position={[0, sheet.y, 0]} rotation-y={sheet.rot} castShadow receiveShadow>
          <boxGeometry args={[0.21, 0.0018, 0.297]} />
          <meshStandardMaterial color={palette.paper} roughness={0.95} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}
