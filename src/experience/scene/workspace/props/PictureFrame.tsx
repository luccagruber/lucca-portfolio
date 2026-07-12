"use client";

import type { ThreeElements } from "@react-three/fiber";
import { palette } from "@/lib/palette";

type GroupProps = ThreeElements["group"];

/**
 * Matte black picture frame, leaning slightly back. The print is an
 * abstract neutral — personal warmth without identifiable content.
 */
export function PictureFrame(props: GroupProps) {
  return (
    <group {...props}>
      <group position={[0, 0.085, 0]} rotation-x={-0.12}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.135, 0.17, 0.01]} />
          <meshStandardMaterial color={palette.matteBlack} roughness={0.7} metalness={0} />
        </mesh>
        <mesh position={[0, 0, 0.0055]}>
          <planeGeometry args={[0.107, 0.14]} />
          <meshStandardMaterial color={palette.photoMatte} roughness={0.9} metalness={0} />
        </mesh>
        <mesh position={[0, 0.004, 0.006]}>
          <planeGeometry args={[0.075, 0.096]} />
          <meshStandardMaterial color={palette.photoPrint} roughness={0.85} metalness={0} />
        </mesh>
        {/* Kickstand */}
        <mesh position={[0, -0.045, -0.035]} rotation-x={0.5}>
          <boxGeometry args={[0.05, 0.1, 0.006]} />
          <meshStandardMaterial color={palette.matteBlack} roughness={0.7} metalness={0} />
        </mesh>
      </group>
    </group>
  );
}
