"use client";

import type { ThreeElements } from "@react-three/fiber";
import { palette } from "@/lib/palette";

type GroupProps = ThreeElements["group"];

// SWAPPABLE: replace with GLB later
/** A few A4 sheets, slightly offset — work in progress, kept tidy. */
export function PaperStack(props: GroupProps) {
  const sheets: { x: number; z: number; rotY: number }[] = [
    { x: 0.003, z: -0.002, rotY: -0.022 },
    { x: -0.004, z: 0.003, rotY: 0.03 },
    { x: 0.002, z: -0.004, rotY: -0.008 },
    { x: -0.001, z: 0.002, rotY: 0.016 },
  ];
  return (
    <group {...props}>
      {sheets.map((sheet, i) => (
        <mesh
          key={i}
          position={[sheet.x, 0.0012 + i * 0.0021, sheet.z]}
          rotation-y={sheet.rotY}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.21, 0.0018, 0.297]} />
          <meshStandardMaterial color={palette.paper} roughness={0.95} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}
