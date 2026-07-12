"use client";

import dynamic from "next/dynamic";

// The WebGL scene is client-only; the placeholder matches the canvas
// clear color so there is no flash while the chunk loads.
const Scene = dynamic(() => import("./scene/Scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-stage" />,
});

export function ExperienceCanvas() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Scene />
    </div>
  );
}
