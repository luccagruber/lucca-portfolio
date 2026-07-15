"use client";

import { RoundedBox, useTexture } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { SRGBColorSpace } from "three";
import { palette } from "@/lib/palette";

type GroupProps = ThreeElements["group"];

/**
 * Thin black picture frame standing upright, off-white mat, and a real
 * printed photo. The print is whatever lives at /images/portrait.jpg —
 * currently a quiet placeholder; drop in Lucca's actual photo (portrait
 * orientation, ~4:5) at that path and it appears here.
 */
export function PictureFrame(props: GroupProps) {
  const photo = useTexture("/images/portrait.jpg", (t) => {
    t.colorSpace = SRGBColorSpace;
  });
  return (
    <group {...props}>
      <group rotation-x={-0.09}>
        {/* Frame */}
        <RoundedBox
          args={[0.115, 0.148, 0.008]}
          radius={0.002}
          smoothness={2}
          position={[0, 0.074, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={palette.matteBlack} roughness={0.5} metalness={0.12} />
        </RoundedBox>
        {/* Off-white mat */}
        <mesh position={[0, 0.074, 0.0045]}>
          <planeGeometry args={[0.094, 0.126]} />
          <meshStandardMaterial color={palette.photoMatte} roughness={0.9} metalness={0} />
        </mesh>
        {/* Print */}
        <mesh position={[0, 0.072, 0.005]}>
          <planeGeometry args={[0.064, 0.082]} />
          <meshStandardMaterial map={photo} roughness={0.85} metalness={0} />
        </mesh>
        {/* Easel leg */}
        <mesh position={[0, 0.045, -0.028]} rotation-x={0.5} castShadow>
          <boxGeometry args={[0.012, 0.105, 0.004]} />
          <meshStandardMaterial color={palette.matteBlack} roughness={0.5} metalness={0.12} />
        </mesh>
      </group>
    </group>
  );
}
