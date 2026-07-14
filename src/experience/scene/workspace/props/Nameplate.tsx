"use client";

import { RoundedBox, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import { profile } from "@/content/profile";
import { palette } from "@/lib/palette";
import { FONT_SANS_3D } from "../../fonts";

type GroupProps = ThreeElements["group"];

// SWAPPABLE: replace with GLB later
/**
 * Flat black desk plaque, leaning back a few degrees, name engraved.
 * There is no hero section — this is how the workspace says whose it is.
 */
export function Nameplate(props: GroupProps) {
  const invalidate = useThree((s) => s.invalidate);
  return (
    <group {...props}>
      {/* Base bar */}
      <RoundedBox
        args={[0.245, 0.009, 0.055]}
        radius={0.0025}
        smoothness={2}
        position={[0, 0.0045, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={palette.matteBlack} roughness={0.55} metalness={0.15} />
      </RoundedBox>
      {/* Plaque face */}
      <group position={[0, 0.009, 0]} rotation-x={-0.13}>
        <RoundedBox
          args={[0.235, 0.062, 0.011]}
          radius={0.003}
          smoothness={2}
          position={[0, 0.031, 0]}
          castShadow
        >
          <meshStandardMaterial color={palette.matteBlack} roughness={0.62} metalness={0.1} />
        </RoundedBox>
        <Text
          font={FONT_SANS_3D}
          fontSize={0.0146}
          letterSpacing={0.08}
          color={palette.engraving}
          anchorX="center"
          anchorY="middle"
          position={[0, 0.031, 0.0062]}
          onSync={() => invalidate()}
        >
          {profile.nameplate}
        </Text>
      </group>
    </group>
  );
}
