"use client";

import { RoundedBox } from "@react-three/drei";
import { palette } from "@/lib/palette";
import { LAYOUT } from "../layout";

const HEIGHT = 1.46;

function Panel({ width, x }: { width: number; x: number }) {
  return (
    <group position={[x, HEIGHT / 2, LAYOUT.partition.z]}>
      <RoundedBox args={[width, HEIGHT, 0.05]} radius={0.012} smoothness={4} receiveShadow>
        <meshStandardMaterial color={palette.partitionFrame} roughness={0.95} metalness={0} />
      </RoundedBox>
      {/* Fabric inset */}
      <RoundedBox
        args={[width - 0.07, HEIGHT - 0.1, 0.018]}
        radius={0.01}
        smoothness={4}
        position={[0, 0, 0.022]}
        receiveShadow
      >
        <meshStandardMaterial color={palette.partition} roughness={1} metalness={0} />
      </RoundedBox>
    </group>
  );
}

/**
 * Two cubicle partition panels behind the workspace — enough to say
 * "corporate cubicle" while the room itself stays intentionally ignored.
 */
export function Partition() {
  return (
    <group>
      <Panel width={1.74} x={-0.52} />
      <Panel width={1.06} x={0.93} />
    </group>
  );
}
