"use client";

import { useLayoutEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { DUR, EASE, SEQ } from "@/experience/motion";
import { useExperience } from "@/experience/state/store";
import { CAMERA, framingFor, type FramingName } from "./layout";

/**
 * The camera system: framing and subtle easing — and nothing else
 * (architecture rule). The scene is completely static except intentional
 * GSAP moments: the camera's orientation is permanently the fixed
 * CAMERA.pitch (a gentle look-down; zero yaw, zero roll), pointer
 * movement is ignored entirely, and the only narrative move is a
 * barely-there dolly when the drawer opens. It reacts to experience
 * state but never drives it.
 */
export function CameraRig() {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const invalidate = useThree((s) => s.invalidate);

  const drawer = useExperience((s) => s.drawer);
  const lastFraming = useRef<FramingName | null>(null);

  const framing: FramingName =
    drawer === "opening" || drawer === "open" ? "drawer" : "idle";

  // Ease to the framing for the current state; snap on first mount,
  // restore, reduced motion, and plain viewport resizes. Layout effect so
  // the very first paint is already composed for the actual viewport.
  useLayoutEffect(() => {
    camera.rotation.set(CAMERA.pitch, 0, 0); // fixed gentle look-down, permanently
    const aspect = size.width / Math.max(size.height, 1);
    const [x, y, z] = framingFor(framing, aspect);
    const isFirst = lastFraming.current === null;
    const isReframe = lastFraming.current === framing; // same shot, new viewport
    lastFraming.current = framing;

    if (isFirst || prefersReducedMotion() || useExperience.getState().instant) {
      gsap.killTweensOf(camera.position);
      camera.position.set(x, y, z);
      invalidate();
      return;
    }

    gsap.to(camera.position, {
      x,
      y,
      z,
      duration: isReframe ? DUR.cameraReframe : DUR.cameraDolly,
      delay: !isReframe && framing === "drawer" ? SEQ.cameraDelayIn : 0,
      ease: EASE.glide,
      overwrite: "auto",
      onUpdate: invalidate,
    });
  }, [framing, camera, size.width, size.height, invalidate]);

  return null;
}
