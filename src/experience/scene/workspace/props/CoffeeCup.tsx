"use client";

import type { ThreeElements } from "@react-three/fiber";
import { palette } from "@/lib/palette";

type GroupProps = ThreeElements["group"];

/** White paper cup with a kraft sleeve (vision palette). */
export function CoffeeCup(props: GroupProps) {
  return (
    <group {...props}>
      <mesh position={[0, 0.055, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.036, 0.029, 0.11, 32]} />
        <meshStandardMaterial color={palette.cupPaper} roughness={0.7} metalness={0} />
      </mesh>
      <mesh position={[0, 0.052, 0]} castShadow>
        <cylinderGeometry args={[0.0378, 0.0338, 0.044, 32, 1, true]} />
        <meshStandardMaterial color={palette.kraft} roughness={0.95} metalness={0} />
      </mesh>
      {/* Lid rim */}
      <mesh position={[0, 0.112, 0]}>
        <cylinderGeometry args={[0.0365, 0.0365, 0.006, 32]} />
        <meshStandardMaterial color={palette.cupPaper} roughness={0.6} metalness={0} />
      </mesh>
    </group>
  );
}
