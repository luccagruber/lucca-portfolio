"use client";

import { RoundedBox } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { palette } from "@/lib/palette";

type GroupProps = ThreeElements["group"];

// SWAPPABLE: replace with GLB later
/** Matte black square pen cup, a few pens at staggered heights. */
export function PenHolder(props: GroupProps) {
  const pens: {
    length: number;
    x: number;
    z: number;
    tiltX: number;
    tiltZ: number;
    color: string;
  }[] = [
    { length: 0.135, x: -0.012, z: -0.008, tiltX: -0.1, tiltZ: -0.07, color: palette.pen },
    { length: 0.118, x: 0.013, z: 0.004, tiltX: 0.06, tiltZ: 0.11, color: palette.penAccent },
    { length: 0.104, x: -0.002, z: 0.014, tiltX: 0.12, tiltZ: -0.03, color: palette.pen },
  ];
  return (
    <group {...props}>
      <RoundedBox
        args={[0.058, 0.078, 0.058]}
        radius={0.004}
        smoothness={2}
        position={[0, 0.039, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={palette.matteBlack} roughness={0.65} metalness={0.06} />
      </RoundedBox>
      {pens.map((pen, i) => (
        <group key={i} position={[pen.x, 0.014, pen.z]} rotation={[pen.tiltX, 0, pen.tiltZ]}>
          <mesh position={[0, pen.length / 2, 0]} castShadow>
            <cylinderGeometry args={[0.0034, 0.0028, pen.length, 12]} />
            <meshStandardMaterial color={pen.color} roughness={0.45} metalness={0.15} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
