"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useExperience } from "./state/store";

// The WebGL scene is client-only; the placeholder matches the canvas
// clear color so there is no flash while the chunk loads.
const Scene = dynamic(() => import("./scene/Scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-stage" />,
});

export function ExperienceCanvas() {
  const setWebglFallback = useExperience((s) => s.setWebglFallback);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = (canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
      if (!gl) {
        setWebglFallback(true);
        return;
      }
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "";
        const lower = renderer.toLowerCase();
        if (
          lower.includes("swiftshader") ||
          lower.includes("software rasterizer") ||
          lower.includes("llvmpipe") ||
          lower.includes("mesa offscreen")
        ) {
          console.warn("Software WebGL renderer detected. Falling back to DOM workspace.");
          setWebglFallback(true);
        }
      }
    } catch (e) {
      console.error("WebGL support check failed, falling back.", e);
      setWebglFallback(true);
    }
  }, [setWebglFallback]);

  return (
    <div className="absolute inset-0" aria-hidden>
      <Scene />
    </div>
  );
}
