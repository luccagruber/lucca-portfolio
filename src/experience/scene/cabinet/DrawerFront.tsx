"use client";

import { RoundedBox, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { palette } from "@/lib/palette";
import { FONT_MONO_3D } from "../fonts";

export const FRONT = { w: 0.36, h: 0.272, t: 0.024, z: 0.31 } as const;

/**
 * One classic cabinet drawer face: panel, recessed pull, label holder.
 * Used by the two static bays (blank label) and the working drawer
 * ("PROJECTS" — a diegetic cue, not an instruction).
 */
export function DrawerFront({ label }: { label?: string }) {
  const invalidate = useThree((s) => s.invalidate);
  return (
    <group position={[0, 0, FRONT.z]}>
      <RoundedBox
        args={[FRONT.w, FRONT.h, FRONT.t]}
        radius={0.006}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={palette.cabinetFace} roughness={0.85} metalness={0.02} />
      </RoundedBox>

      {/* Recessed pull */}
      <mesh position={[0, 0.048, FRONT.t / 2 + 0.004]} castShadow>
        <boxGeometry args={[0.15, 0.026, 0.012]} />
        <meshStandardMaterial color={palette.handle} roughness={0.55} metalness={0.25} />
      </mesh>

      {/* Label holder */}
      <mesh position={[0, 0.098, FRONT.t / 2 + 0.002]}>
        <boxGeometry args={[0.088, 0.038, 0.006]} />
        <meshStandardMaterial color={palette.labelPlate} roughness={0.7} metalness={0} />
      </mesh>
      {label ? (
        <Text
          font={FONT_MONO_3D}
          fontSize={0.0125}
          letterSpacing={0.14}
          color={palette.tabInk}
          anchorX="center"
          anchorY="middle"
          position={[0, 0.098, FRONT.t / 2 + 0.0055]}
          onSync={() => invalidate()}
        >
          {label}
        </Text>
      ) : null}
    </group>
  );
}
