"use client";

import { palette } from "@/lib/palette";

/**
 * The intentionally ignored room: a floor to catch the desk's shadow and
 * a quiet wall to hold the background. Nothing here asks for attention.
 */
export function Room() {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.001, 1.5]} receiveShadow>
        <planeGeometry args={[16, 12]} />
        <meshStandardMaterial color={palette.floor} roughness={0.96} metalness={0} />
      </mesh>
      <mesh position={[0, 2.4, -1.2]} receiveShadow>
        <planeGeometry args={[16, 5]} />
        <meshStandardMaterial color={palette.wall} roughness={0.97} metalness={0} />
      </mesh>
    </group>
  );
}
