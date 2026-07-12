"use client";

import { Environment, Lightformer } from "@react-three/drei";

/**
 * Studio-soft lighting for the stylized product-render look: one soft key
 * with gentle shadows, cool fill, and a small procedural environment (no
 * external HDR — the Lightformers are baked once at mount).
 */
export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.32} />
      <directionalLight
        position={[2.4, 3.8, 2.6]}
        intensity={1.85}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-2.2}
        shadow-camera-right={2.2}
        shadow-camera-top={2.4}
        shadow-camera-bottom={-1}
        shadow-camera-near={1}
        shadow-camera-far={9}
        shadow-bias={-0.0001}
        shadow-normalBias={0.02}
      />
      <directionalLight position={[-2.6, 2.2, 1.4]} intensity={0.5} />
      <Environment resolution={64} frames={1}>
        <Lightformer
          intensity={0.85}
          rotation-x={Math.PI / 2}
          position={[0, 4, 0]}
          scale={[9, 9, 1]}
        />
        <Lightformer
          intensity={0.45}
          rotation-y={Math.PI}
          position={[0, 1.4, 4]}
          scale={[7, 3, 1]}
        />
        <Lightformer
          intensity={0.3}
          rotation-y={Math.PI / 2}
          position={[-4, 1.6, 0]}
          scale={[5, 3, 1]}
        />
      </Environment>
    </>
  );
}
