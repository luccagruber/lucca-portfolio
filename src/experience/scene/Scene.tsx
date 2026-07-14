"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useExperience } from "@/experience/state/store";
import { palette } from "@/lib/palette";
import { CAMERA, FRAMINGS } from "./layout";
import { CameraRig } from "./CameraRig";
import { Lighting } from "./Lighting";
import { Workspace } from "./Workspace";

/**
 * Rendering root. `frameloop="demand"` keeps the GPU idle whenever the
 * scene is static — every animation invalidates explicitly, so frames are
 * only produced while something actually moves (animations are discrete
 * events, never scroll- or pointer-driven). Shadows are PCFSoft.
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
        position: FRAMINGS.idle,
      }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        const canvasEl = gl.domElement;
        const handleContextLost = (e: Event) => {
          e.preventDefault();
          console.warn("WebGL context lost. Falling back to DOM workspace.");
          useExperience.getState().setWebglFallback(true);
        };
        canvasEl.addEventListener("webglcontextlost", handleContextLost);
      }}
    >
      <color attach="background" args={[palette.stage]} />
      <CameraRig />
      <Lighting />
      <Suspense fallback={null}>
        <Workspace />
      </Suspense>
    </Canvas>
  );
}
