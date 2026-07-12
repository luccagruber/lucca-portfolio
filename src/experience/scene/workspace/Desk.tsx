"use client";

import { RoundedBox } from "@react-three/drei";
import { palette } from "@/lib/palette";

/** Desk surface height — props sit at this Y (desk-local). */
export const DESK_TOP_Y = 0.74;

const TOP = { w: 1.5, t: 0.035, d: 0.75 };

/**
 * A plain corporate office desk: white worktop on two side panels with a
 * modesty panel. Rounded edges, matte finish.
 */
export function Desk() {
  return (
    <group>
      <RoundedBox
        args={[TOP.w, TOP.t, TOP.d]}
        radius={0.012}
        smoothness={4}
        position={[0, DESK_TOP_Y - TOP.t / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={palette.deskTop} roughness={0.9} metalness={0} />
      </RoundedBox>

      {/* Side panels */}
      {[-1, 1].map((side) => (
        <RoundedBox
          key={side}
          args={[0.035, DESK_TOP_Y - TOP.t, 0.66]}
          radius={0.008}
          smoothness={4}
          position={[side * (TOP.w / 2 - 0.05), (DESK_TOP_Y - TOP.t) / 2, -0.02]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={palette.deskFrame} roughness={0.9} metalness={0} />
        </RoundedBox>
      ))}

      {/* Modesty panel */}
      <RoundedBox
        args={[TOP.w - 0.13, 0.3, 0.022]}
        radius={0.008}
        smoothness={4}
        position={[0, 0.54, -0.3]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={palette.deskFrame} roughness={0.9} metalness={0} />
      </RoundedBox>
    </group>
  );
}
