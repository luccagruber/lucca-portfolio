"use client";

import type { ThreeElements } from "@react-three/fiber";
import { palette } from "@/lib/palette";

type GroupProps = ThreeElements["group"];

// SWAPPABLE: replace with GLB later
/** White paper cup with a warm kraft sleeve. Someone works here. */
export function CoffeeCup(props: GroupProps) {
  return (
    <group {...props}>
      {/* Cup body — gentle paper taper */}
      <mesh position={[0, 0.0575, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.041, 0.032, 0.115, 40]} />
        <meshStandardMaterial color={palette.cupPaper} roughness={0.58} metalness={0} />
      </mesh>
      {/* Rolled lip */}
      <mesh position={[0, 0.114, 0]} rotation-x={Math.PI / 2} castShadow>
        <torusGeometry args={[0.0405, 0.0022, 10, 40]} />
        <meshStandardMaterial color={palette.cupPaper} roughness={0.58} metalness={0} />
      </mesh>
      {/* Coffee */}
      <mesh position={[0, 0.108, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.0378, 32]} />
        <meshStandardMaterial color={palette.coffee} roughness={0.25} metalness={0} />
      </mesh>
      {/* Kraft sleeve */}
      <mesh position={[0, 0.052, 0]} castShadow>
        <cylinderGeometry args={[0.0392, 0.0362, 0.04, 40, 1, true]} />
        <meshStandardMaterial color={palette.kraft} roughness={0.85} metalness={0} />
      </mesh>
    </group>
  );
}
