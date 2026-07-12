"use client";

import { Text } from "@react-three/drei";
import { useThree, type ThreeElements } from "@react-three/fiber";
import { palette } from "@/lib/palette";
import { profile } from "@/content/profile";
import { FONT_SANS_3D } from "../../fonts";

type GroupProps = ThreeElements["group"];

const TILT = -0.32;

/**
 * Desk nameplate — the one diegetic object that says whose workspace this
 * is (there is no hero section to do it).
 */
export function Nameplate(props: GroupProps) {
  const invalidate = useThree((s) => s.invalidate);
  return (
    <group {...props}>
      <group position={[0, 0.026, 0]} rotation-x={TILT}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.052, 0.016]} />
          <meshStandardMaterial color={palette.matteBlack} roughness={0.6} metalness={0.05} />
        </mesh>
        <Text
          font={FONT_SANS_3D}
          fontSize={0.0155}
          letterSpacing={0.12}
          color={palette.engraving}
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0.0085]}
          onSync={() => invalidate()}
        >
          {profile.nameplate}
        </Text>
      </group>
    </group>
  );
}
