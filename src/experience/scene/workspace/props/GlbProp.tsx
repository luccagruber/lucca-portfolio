"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { Box3, Mesh, Vector3 } from "three";

type GroupProps = ThreeElements["group"];

interface GlbPropProps extends GroupProps {
  url: string;
  /** World height in meters — the model's bounding box is normalized to it. */
  height: number;
}

/**
 * A desk prop sourced from a real GLB. Source models arrive at wildly
 * different scales and origins, so the clone is normalized here: bounding
 * box centered on x/z, base resting on y=0, uniformly scaled to `height`.
 * Position/rotation compose on the outer group like any generated prop.
 */
export function GlbProp({ url, height, ...props }: GlbPropProps) {
  const { scene } = useGLTF(url);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const box = new Box3().setFromObject(clone);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const s = height / size.y;
    clone.scale.setScalar(s);
    clone.position.set(-center.x * s, -box.min.y * s, -center.z * s);
    clone.traverse((obj) => {
      if (obj instanceof Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
    return clone;
  }, [scene, height]);

  return (
    <group {...props}>
      <primitive object={model} />
    </group>
  );
}
