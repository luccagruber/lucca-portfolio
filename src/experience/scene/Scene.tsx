"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { palette } from "@/lib/palette";
import { CAMERA, FRAMINGS } from "./layout";
import { CameraRig } from "./CameraRig";
import { Lighting } from "./Lighting";
import { Workspace } from "./Workspace";

/**
 * Rendering root. `frameloop="demand"` keeps the GPU idle whenever the
 * scene is static — every animation invalidates explicitly, so frames are
 * only produced while something actually moves (animations are discrete
 * events, never scroll-driven).
 */
export default function Scene() {
  return (
    <Canvas
      frameloop="demand"
      shadows="soft"
      dpr={[1, 2]}
      camera={{
        fov: CAMERA.fov,
        near: CAMERA.near,
        far: CAMERA.far,
        position: FRAMINGS.overview.position,
      }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={[palette.stage]} />
      <CameraRig />
      <Lighting />
      <Workspace />
      <ContactShadows
        position={[0, 0.0002, 0.15]}
        scale={6.5}
        resolution={1024}
        far={1.3}
        blur={2.4}
        opacity={0.42}
        color="#3a3936"
      />
    </Canvas>
  );
}
